import {bindable} from 'aurelia-templating';
import {BdlTriggerOnIncrease} from './bdl-trigger-on-increase';

export class BdlSoundOnIncrease extends BdlTriggerOnIncrease {
  @bindable thresholdvalue;
  @bindable freq=440;
  constructor() {
    super();
  }

  attached() {
    super.attached();
    // create web audio api context
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // create Oscillator node
    /*this.oscillator = this.audioCtx.createOscillator();
    this.oscillator.connect(this.audioCtx.destination);*/
  }

  trigger() {
    //console.log('soundonincrease trigger');
    //this.triggered = true;
    //if (!this.triggered) {
      //this.triggered = true;
      //console.log('soundonincrease generating sound');
      this.oscillator = this.audioCtx.createOscillator();
      let  g = this.audioCtx.createGain();
      this.oscillator.frequency.value = typeof(this.freq) === 'string' ? parseInt(this.freq, 10) : this.freq;
      this.oscillator.connect(g);
      this.oscillator.connect(this.audioCtx.destination);
      this.oscillator.start();
      this.oscillator.stop(this.audioCtx.currentTime + 0.2); // stop 0.2 seconds after the current time
      g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.1);
    //}
  }
}
