// Handles simulation lifecycle: start, stop, step, shot, reset, etc.
export class FmiSimulationController {
  constructor(fmiInstance) {
    this.fmi = fmiInstance;
  }

  startSimulation() {
    this.fmi.animationstarted = true;
    this.fmi.fpsInterval = 1000 / (isNaN(this.fmi.fpslimit) ? parseFloat(this.fmi.fpslimit, 10) : this.fmi.fpslimit);
    this.fmi.then = window.performance.now();
    const performAnimation = (newtime) => {
      if (!this.fmi.animationstarted) return;
      this.fmi.request = requestAnimationFrame(performAnimation);
      if (this.fmi.doingstep) return;
      if (this.fmi.fpslimit && (this.fmi.fpslimit < 60)) {
        if (isNaN(this.fmi.fpslimit)) this.fmi.fpslimit = parseFloat(this.fmi.fpslimit, 10);
        this.fmi.now = newtime;
        this.fmi.elapsed = this.fmi.now - this.fmi.then;
        if (this.fmi.elapsed > this.fmi.fpsInterval) {
          this.fmi.then = this.fmi.now - (this.fmi.elapsed % this.fmi.fpsInterval);
          this.step();
        }
      } else {
        for (let i = 0; i < this.fmi.stepsperframe; i++) this.step();
      }
    };
    performAnimation();
  }

  stopSimulation() {
    this.fmi.animationstarted = false;
    cancelAnimationFrame(this.fmi.request);
  }

  step(e) {
    if (!this.fmi.doingstep) {
      this.fmi.doingstep = true;
      try {
        if (!this.fmi.instantiated) {
          this.fmi.instance.instantiate();
          this.fmi.instance.initialize();
        }
        this.fmi.stepi++;
        if (this.fmi.resetBeforeChange) {
          this.fmi.instance.setupExperiment();
          this.fmi.fmiReset(this.fmi.fmiinst);
          this.fmi.setInputVariables();
          this.fmi.instance.initialize();
          if (!this.fmi.isOnestep) this.fmi.fmiDoStep(this.fmi.fmiinst, this.fmi.starttime, this.fmi.stepTime, 1);
          else this.fmi.stepTime = this.fmi.starttime;
          this.fmi.resetBeforeChange = false;
        } else {

          if (!this.fmi.isOneshot) //oneshot keeps changes,no need to set it each step
            this.fmi.setInputVariables();
        }
        const res = this.fmi.fmiDoStep(this.fmi.fmiinst, this.fmi.stepTime, this.fmi.mystep, 1);
        this.fmi.stepTime = this.fmi.stepTime + this.fmi.mystep;
        this.fmi.mystep = this.fmi.stepSize;
        if (res === 1 || res === 2) {
          console.warn('step() returned state<>0, doing reset()', res);
          this.fmi.fmiReset(this.fmi.fmiinst);
          this.fmi.instance.initialize();
        }
        this.fmi.mydata = this.fmi.bufferManager.getReals(this.fmi.references);
        let event = new CustomEvent('fmidata', { detail: { time: this.fmi.round(this.fmi.stepTime, this.fmi.pow), data: this.fmi.mydata } });
        document.getElementById(this.fmi.id).dispatchEvent(event);
        if (this.fmi.showtime) this.fmi.simulationtime = this.fmi.secondsToTime(this.fmi.stepTime, this.fmi.showtimemultiply);
        if (this.fmi.measurefps) {
          if (this.fmi.fpstick === 0) {
            this.fmi.startfpstime = window.performance.now();
          }
          this.fmi.fpstick++;
          if (this.fmi.fpstick >= this.fmi.ticksToUpdate) {
            this.fmi.fpsInterval = 1000 / (isNaN(this.fmi.fpslimit) ? parseFloat(this.fmi.fpslimit, 10) : this.fmi.fpslimit);
            this.fmi.ticksToUpdate = Math.round(3000 / this.fmi.fpsInterval);
            if (this.fmi.stepSize < 1) {
              this.fmi.pow = -Math.ceil(-Math.log10(this.fmi.stepSize));
            } else {
              this.fmi.pow = Math.ceil(Math.log10(this.fmi.stepSize));
            }
            this.fmi.mystep = this.fmi.round(this.fmi.stepTime + this.fmi.stepSize, this.fmi.pow) - this.fmi.stepTime;
            this.fmi.fps = (1000 * this.fmi.ticksToUpdate / (window.performance.now() - this.fmi.startfpstime)).toPrecision(4);
            this.fmi.fpstick = 0;
          }
        }
        if (this.fmi.fmuspeed2 && !this.fmi.fmuspeedalreadychanged && (this.fmi.stepi > this.fmi.fmuspeed2after)) this.fmi.fmuspeedChanged(this.fmi.fmuspeed2);
        if (this.fmi.stoptime > 0 && this.fmi.animationstarted && this.fmi.stoptime < this.fmi.stepTime) {
          this.fmi.startstop();
        }
      } catch (err) {
        console.error('error catched during fmu step', err);
      } finally {
        this.fmi.doingstep = false;
      }
    }
  }

  shot(e) {
    if (this.shotInProgress) {
      console.warn('shot() already in progress, ignoring subsequent call');
      return;
    }
    this.shotInProgress = true;
    try {
      // ...existing shot logic...
      let needsReset = false;
      if (!this.fmi.inst) {
        if (window.fmiinst && window.fmiinst[this.fmi.fminame]) {
          console.warn('fmi shot() not instantiated, do it first time');
          this.fmi.instance.instantiate();
          this.fmi.instance.initialize();
          needsReset = true;
        } else {
          this.shotInProgress = false;
          return;
        }
      } else {
        needsReset = true;
      }
      if (needsReset) {
        console.log('fmi shot doing reset');
        this.reset();
      }
      do {
        this.step();
      } while (this.fmi.stoptime > this.fmi.stepTime);
    } finally {
      this.shotInProgress = false;
    }
  }

  reset() {
    console.log('doing reset()');
    this.fmi.stepTime = this.fmi.starttime;
    this.fmi.stepSize = this.fmi.fmuspeed * ((typeof (this.fmi.fstepsize) === 'string') ? parseFloat(this.fmi.fstepsize) : this.fmi.fstepsize);
    this.fmi.mystep = this.fmi.stepSize;
    //this.fmi.instance.setupExperiment(); swapped with fmiReset to avoid problems with some FMUs
    this.fmi.fmiReset(this.fmi.fmiinst);
    this.fmi.instance.setupExperiment();
    this.fmi.setInputVariables(false);
    this.fmi.instance.initialize();
    let event = new CustomEvent('fmireset');
    document.getElementById(this.fmi.id).dispatchEvent(event);
  }

  softreset() {
    this.fmi.stepTime = this.fmi.starttime;
    this.fmi.stepSize = this.fmi.fmuspeed * ((typeof (this.fmi.fstepsize) === 'string') ? parseFloat(this.fmi.fstepsize) : this.fmi.fstepsize);
    this.fmi.mystep = this.fmi.stepSize;
    this.fmi.setInputVariables();
    let event = new CustomEvent('fmireset');
    document.getElementById(this.fmi.id).dispatchEvent(event);
  }
}
