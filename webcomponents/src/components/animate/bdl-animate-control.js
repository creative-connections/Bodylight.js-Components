import {bindable} from 'aurelia-framework';


export class BdlAnimateControl {
  @bindable id; //unique id of this component
  @bindable fromid; //id of fmi - to listen if segmentcond is specified
  @bindable speedfactor; //0-100
  @bindable segments;
  @bindable segmentlabels;
  @bindable controlfmi=false;
  @bindable segmentcond;
  animationstarted = false;
  frame = 0;
  currentsegment=0;
  playsegments=false;
  currentsegmentlabel='';

  constructor() {
    this.handleValueChange = e => {
      //get data - what is
      console.log('bdlanimatecontrol handleValuechange', e);
      let value = e.detail.data[this.segmentconditions[this.currentsegment].refid];
      this.processValue(value);
    };
  }

  bind() {
    if (this.speedfactor) {
      if (typeof this.speedfactor === 'string') this.speedfactor = parseInt(this.speedfactor, 10);
      if (this.speedfactor <= 0 || this.speedfactor > 100) this.speedfactor = 100;
    }
    //segments are int delimited by ;
    if (this.segments) {
      this.playsegments = true;
      let segmentstrs = this.segments.split(';');
      this.segmentitems = segmentstrs.map((yy) => {
        return parseInt(yy, 10);
      });
    }
    if (this.segmentlabels) {
      this.segmentlabelarray = this.segmentlabels.split(';');
    }

    let isgreater = (a, b) => {return a > b;};
    let isequal = (a, b)=> {return a === b;};
    let islower = (a, b) => {return a < b;};
    console.log('bdlanimatecontro segmentcond1:', this.segmentcond);
    if (this.segmentcond) {
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
      console.log('bdlanimatecontrol segmentcond', this.segmentconditions);
      //console.log('bdlanimatecontrol fromid', this.fromid);
    //  if (this.fromid) {document.getElementById(this.fromid).addEventListener('fmidata', this.handleValueChange);}
    }
  }

  attached() {
    console.log('bdlanimatecontrol attached fromid', this.fromid);
    if (this.fromid) {document.getElementById(this.fromid).addEventListener('fmidata', this.handleValueChange);}
  }

  detached() {
    if (this.fromid && document.getElementById(this.fromid)) document.getElementById(this.fromid).removeEventListener('fmidata', this.handleValueChange);
  }


  //fires fmistart/fmistop events
  startstop() {
    this.animationstarted = !this.animationstarted;
    if (! this.animationstarted) {
      //stop animation
      //this.animationstarted = false;
      console.log('Canceling animation, this, this.request:', this, this.request);
      cancelAnimationFrame(this.request);
      //create custom event
      let event = new CustomEvent('fmistop', {detail: {time: this.frame}});
      //dispatch event - it should be listened by some other component
      document.getElementById(this.id).dispatchEvent(event);
    } else {
      //this.animationstarted = true;
      let that = this;
      //animate using requestAnimationFrame
      const performAnimation = () => {
        //send event to do animation
        this.step();
        //decide whether and how to schedule next animation frame
        if (this.playsegments && this.stopframe > 0 && this.frame > this.stopframe) {
          this.animationstarted = false;
          //if last segment reninit frame from begining
          if (this.currentsegment >= this.segmentitems.length) { this.currentsegment = 0; this.frame = 0;}
        } else {
          // speedfactor is defined - then timeout slowdown
          if (this.animationstarted) {
            if (this.speedfactor) {
              setTimeout(() => that.request = requestAnimationFrame(performAnimation), 1000 / (60 * that.speedfactor / 100)); //60fps is normal - calculated as 1000 ms / framespersecond
            } else that.request = requestAnimationFrame(performAnimation);
            //this.step();
          }
        }
      };
      requestAnimationFrame(performAnimation);
    }
  }

  step() {
    //create custom event
    let event = this.frame === 0
      ? new CustomEvent('fmistart', {detail: {time: this.frame}}) //send start signal on frame 0
      : new CustomEvent('fmidata', {detail: {time: this.frame}}); //send data signal - i.e. continue after pause
    //dispatch event - it should be listened by some other component
    document.getElementById(this.id).dispatchEvent(event);
    this.frame++;
  }

  segment() {
    if (!this.segmentcond) {
      //play from current position up to the frame on the next segment
      this.stopframe = this.segmentitems[this.currentsegment];
      console.log('AnimateControl segment() stopframe,currentsegment:', this.stopframe, this.currentsegment);
      this.currentsegmentlabel = this.segmentlabelarray[this.currentsegment];
      this.currentsegment++;
      console.log('AnimateControl segment() nextsegment:', this.currentsegment);
      this.startstop();
    } else {
      //if segmentcond is set - play until the condition is met
      //this.stopframe= this.currentsegment+1; //do not know stopframe
      //register handler
      //send start signal to fmi
      console.log('bdlanimatecontrol segments with condition sending fmistart');
      let event = new CustomEvent('fmistart', {detail: {time: this.frame}});
      document.getElementById(this.id).dispatchEvent(event);
    }
  }

  nonstopsegment() {

  }

  processValue(value) {
    //compare with current segment condition

    let referencevalue = this.segmentconditions[this.currentsegment].value;
    console.log('bdlanimatecontrol processValue',value,referencevalue);
    //do stop simulation if the condition in 'relation' is met - returns true
    if (this.segmentconditions[this.currentsegment].relation(value,referencevalue)){
      let event = new CustomEvent('fmistop', {detail: {time: this.frame}});
      document.getElementById(this.id).dispatchEvent(event);
      this.currentsegment++;
      if (this.currentsegment >= this.segmentitems.length) { this.currentsegment = 0; this.frame = 0;}
    }

  }
}
