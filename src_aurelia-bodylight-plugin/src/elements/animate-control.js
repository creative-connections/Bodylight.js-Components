import {bindable} from 'aurelia-framework';

/**
 * controls animation
 */
export class AnimateControl {
  @bindable id; //unique id of this component
  @bindable fromid; //id of fmi - to listen if segmentcond is specified
  @bindable speedfactor; //0-100
  @bindable segments;
  @bindable simsegments;
  @bindable segmentlabels;
  @bindable controlfmi=false;
  @bindable segmentcond;
  @bindable allowcontinuous=false;
  @bindable playafterstart=false;
  @bindable showstep=true;
  continuousanimation = false;
  animationstarted = false;
  firstframe=true;
  frame = 0;
  lastframe = 0;
  aframe = 0;
  currentsegment=0;
  animationframe=0;
  playsegments=false;
  currentsegmentlabel='';

  constructor() {
    this.handleValueChange = e => {
      //get data - what is
      //console.log('bdlanimatecontrol handleValuechange', e);
      let value = e.detail.data[this.segmentconditions[this.currentsegment].refid];
      this.processValue(value);
    };
    this.handleReset = e => {
      this.continuousanimation = false;
      this.animationstarted = false;
      this.firstframe=true;
      this.frame = 0;
      this.aframe = 0;
      this.currentsegment=0;
      this.animationframe=0;
    }
  }

  bind() {
    if (this.speedfactor) {
      if (typeof this.speedfactor === 'string') this.speedfactor = parseInt(this.speedfactor, 10);
      if (this.speedfactor <= 0 || this.speedfactor > 100) this.speedfactor = 100;
    }
    //segments are int delimited by ;
    if (this.segments) {
      this.playsegments = true;
      this.segmentitems = this.segments.split(';').map((yy) => {
        return parseInt(yy, 10);
      });
      if (this.simsegments) {
        this.simsegmentitems = this.simsegments.split(';').map((y2) =>{
          return parseInt(y2, 10);
        });
      }
    }
    if (this.segmentlabels) {
      this.segmentlabelarray = this.segmentlabels.split(';');
    }

    let isgreater = (a, b) => {return a > b;};
    let isequal = (a, b)=> {return a === b;};
    let islower = (a, b) => {return a < b;};
    //console.log('bdlanimatecontro segmentcond1:', this.segmentcond);    
    if (this.showstep && typeof this.showstep === 'string') this.showstep = this.showstep === 'true';
    if (this.controlfmi && typeof this.controlfmi === 'string') this.controlfmi = this.controlfmi === 'true';
    if (this.controlfmi) this.eventprefix = 'fmi'
    else this.eventprefix = 'animate';
    //segment condition is defined - then segments are determined by fmi data sent by 'fromid' component
    if (this.segmentcond) {
      this.eventprefix = 'fmi';
      this.segmentconditions = [];
      let scs = this.segmentcond.split(';');
      for (let sc of scs) {
        let scitem = sc.split(','); // [0] is refid, [1] is gt,lt,eq [2] is value in real
        let scf = islower;
        if (scitem[1] === 'gt') scf = isgreater;
        else if (scitem[1] === 'eq') scf = isequal;
        let scitem2 = {refid: scitem[0], relation: scf, value: parseFloat(scitem[2])};
        this.segmentconditions.push(scitem2);
      }
      //console.log('bdlanimatecontrol segmentcond', this.segmentconditions);
      //console.log('bdlanimatecontrol fromid', this.fromid);
    //  if (this.fromid) {document.getElementById(this.fromid).addEventListener('fmidata', this.handleValueChange);}
    }

    if (typeof this.allowcontinuous === 'string') {
      this.allowcontinuous = this.allowcontinuous === 'true';
    }
    if (typeof this.playafterstart === 'string') {
      this.playafterstart = this.playafterstart === 'true';
    }


  }

  attached() {
    //console.log('bdlanimatecontrol attached fromid', this.fromid);
    if (this.fromid) {document.getElementById(this.fromid).addEventListener('fmidata', this.handleValueChange);}
    if (this.fromid) {document.getElementById(this.fromid).addEventListener('fmireset', this.handleReset);}
    if (this.playafterstart) { //if animation is loaded 
      setTimeout(() =>{
        console.log('animate-control: automatic start',this)
        if (!this.animationstarted)
        this.startstop();
      },5000)
      /*if (window.ani) {
        window.ani.animationstarted = true;
        window.ani.playafterstart=true;
        this.animationstarted=true;
      } else {
        console.log('animate-control: start animation automatically');
        setTimeout(() =>{
          if (window.ani) {
            window.ani.animationstarted = true;
            window.ani.playafterstart=true;
            this.animationstarted=true;
          } else {
            console.warn('animate-control: cannot start animation automatically');
          }
        }, 10000)
      }*/
    }
  }

  detached() {
    if (this.fromid && document.getElementById(this.fromid)) document.getElementById(this.fromid).removeEventListener('fmidata', this.handleValueChange);
  }


  //fires fmistart/fmistop events and starts/stops continuous animation
  startstop() {
    this.animationstarted = !this.animationstarted;
    if (! this.animationstarted) {
      //stop animation
      //this.animationstarted = false;
      //console.log('Canceling animation, this, this.request:', this, this.request);
      cancelAnimationFrame(this.request);
      //create custom event
      let event = new CustomEvent(this.eventprefix + 'stop', {detail: {time: this.frame}});
      //dispatch event - it should be listened by some other component
      document.getElementById(this.id).dispatchEvent(event);
    } else {
      //this.animationstarted = true;
      //if (window.ani) window.ani.enableAnimation();
      let that = this;
      this.lastframe = this.frame; //will fire fmistart when lastframe = frame;
      //console.log('startstop() animate using requestAnimationFrame');
      //animate using requestAnimationFrame
      const performAnimation = () => {
        //send event to do animation
        //console.log('performAnimation()');
        that.step();
        //decide whether and how to schedule next animation frame
        if (that.playsegments && that.stopframe > 0 && that.frame > that.stopframe) that.stopsegment(that, performAnimation); else that.scheduleAnimation(that, performAnimation);
      };
      this.request = requestAnimationFrame(performAnimation);
    }
  }

  stopsegment(that, performAnimation) {
    that.animationstarted = false;
    that.currentsegment++;
    //if last segment reninit frame from begining
    if (that.currentsegment >= that.segmentitems.length) {
      that.currentsegment = 0;
      that.frame = 0;
    }
    if (that.continuousanimation) that.scheduleAnimation(that, performAnimation);
  }

  scheduleAnimation(that, performAnimation) {
    // speedfactor is defined - then requestAnimationFrame is scheduled for later
    if (that.animationstarted) {
      if (that.speedfactor) {
        //requestAnimationFrame is scheduled for later
        setTimeout(() => that.request = requestAnimationFrame(performAnimation), 1000 / (60 * that.speedfactor / 100)); //60fps is normal - calculated as 1000 ms / framespersecond
      } else {
        //requestAnimationFrame is scheduled immediately
        that.request = requestAnimationFrame(performAnimation);
      }
      //this.step();
    }
  }

  //creates customevent and sends time, relativetime: rt in segment, segment - number of segment
  step() {
    this.countrelativeframe(this.frame);
    //create custom event
    let event = this.frame === this.lastframe
      ? new CustomEvent(this.eventprefix + 'start', {detail: {time: this.frame, relativetime: this.relativeframe, segment: this.currentsegment}}) //send start signal on frame 0
      : new CustomEvent(this.eventprefix + 'data', {detail: {time: this.frame, relativetime: this.relativeframe, segment: this.currentsegment}}); //send data signal - i.e. continue after pause
    //dispatch event - it should be listened by some other component
    document.getElementById(this.id).dispatchEvent(event);
    this.frame++;
  }

  //plays only one segment of the animation
  segment() {
    if (!this.segmentcond) {
      //play from current position up to the frame on the next segment
      this.stopframe = this.segmentitems[this.currentsegment];
      //position in segment
      this.startrelativeframe(this.frame);
      this.countrelativeframe(this.frame);
      //console.log('AnimateControl segment() stopframe,currentsegment:', this.stopframe, this.currentsegment);
      this.currentsegmentlabel = this.segmentlabelarray[this.currentsegment];
      //this.currentsegment++; moved to startstop - animationframe
      //console.log('AnimateControl segment() nextsegment:', this.currentsegment);
      this.startstop();
    } else {
      //if segmentcond is set - play until the condition is met
      this.stopframe = this.segmentitems[this.currentsegment]; //do not know stopframe
      //register handler
      //send start signal to fmi
      this.startrelativeframe(this.aframe);
      this.countrelativeframe(this.aframe);
      this.currentsegmentlabel = this.segmentlabelarray[this.currentsegment];
      //console.log('bdlanimatecontrol segments with condition sending fmistart');
      //this.frame=0;
      //this.animationframe=0;
      //compute frame and animationframe step
      if (this.currentsegment === 0) {
        this.astep = this.segmentitems[this.currentsegment] / this.simsegmentitems[this.currentsegment];
      } else {
        let adif = this.segmentitems[this.currentsegment] - this.segmentitems[this.currentsegment - 1];
        let sdif = this.simsegmentitems[this.currentsegment] - this.simsegmentitems[this.currentsegment - 1];
        this.astep = adif / sdif;
      }
      //console.log('BdlAnimateControl segment() astep', this.astep);
      if (window.ani) window.ani.enableAnimation();
      let event = new CustomEvent(this.eventprefix + 'start', {detail: {time: this.frame}});
      document.getElementById(this.id).dispatchEvent(event);
    }
  }

  segmentcontinuous() {
    this.continuousanimation = ! this.continuousanimation;
    if (this.continuousanimation && ! this.animationstarted) this.segment();
  }

  startrelativeframe(frame) {
    this.startframe = frame;
    this.framesinsegment = (this.stopframe - this.startframe);
  }

  countrelativeframe(frame) {
    this.relativeframe = (frame - this.startframe) / this.framesinsegment;
    return this.relativeframe;
  }

  nonstopsegment() {

  }

  processValue(value) {
    //compare with current segment condition
    //do stop simulation if the condition in 'relation' is met - returns true
    let referencevalue = this.segmentconditions[this.currentsegment].value;
    if (this.segmentconditions[this.currentsegment].relation(value, referencevalue)) {
      //set aframe to the boundary frame;
      this.aframe = this.segmentitems[this.currentsegment];
      this.floor_aframe = Math.floor(this.aframe);
      let event = new CustomEvent('fmistop', {detail: {time: this.frame}});
      document.getElementById(this.id).dispatchEvent(event);
      this.countrelativeframe(this.aframe);
      //dispatch animate data
      event = new CustomEvent('animatedata', {detail: {time: this.aframe, relativetime: this.relativeframe, segment: this.currentsegment}}); //send data signal - i.e. continue after pause
      //dispatch event - it should be listened by some other component
      document.getElementById(this.id).dispatchEvent(event);
      //dispatch addsection event - if somebody listens - it should add new section/segment into it's visualisation
      this.currentsegment++;
      if (this.currentsegment >= this.segmentitems.length) {
        this.currentsegment = 0;
        this.frame = 0;
        this.aframe = 0;
      }
      this.startrelativeframe(this.aframe);
      let event2 = new CustomEvent('addsection', {detail: {time: this.frame, label: this.segmentlabelarray[this.currentsegment]}});
      document.getElementById(this.id).dispatchEvent(event2);
      //if continuous is enabled - start immediatelly another segment
      if (this.continuousanimation) this.segment();
    } else {
      if (this.firstframe) {
        this.firstframe=false;
        let event2 = new CustomEvent('addsection', {detail: {time: this.frame, label: this.segmentlabelarray[this.currentsegment]}});
        document.getElementById(this.id).dispatchEvent(event2);
      }
      //do step
      this.frame++;
      this.previous_aframe = this.floor_aframe;
      this.aframe += this.astep;
      this.floor_aframe = Math.floor(this.aframe);
      //if step - hits over a integer number
      if (this.floor_aframe > this.previous_aframe) {
        //fire animation event
        //console.log('bdlanimatecontrol step, frame, aframe, floor aframe, floor prevousframe', this.astep, this.frame, this.aframe, this.floor_aframe, this.previous_aframe);
        //do animation only if the aframe is lower than the prescribed boundary frame
        if (this.floor_aframe <= this.segmentitems[this.currentsegment]) {
          this.countrelativeframe(this.floor_aframe);
          let event = new CustomEvent('animatedata', {detail: {time: this.floor_aframe, relativetime: this.relativeframe, segment: this.currentsegment}}); //send data signal - i.e. continue after pause
          //dispatch event - it should be listened by some other component
          document.getElementById(this.id).dispatchEvent(event);
        }
      }
    }
    //console.log('bdlanimatecontrol processValue',value,referencevalue);
    //compute animation frames
  }
}
