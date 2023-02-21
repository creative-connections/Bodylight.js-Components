import SuperGif from 'libgif';
import {bindable} from 'aurelia-templating';
import {TriggerOnIncrease} from './trigger-on-increase';
export class AnimateSyncGif extends TriggerOnIncrease {
  @bindable fromid;
  @bindable src;
  @bindable simulationstepsize=0.01;
  loaded = false;

  constructor() {
    super();
    this.isstopped = true;
    this.handleStart = e => {
      //console.log('AnimatedHeart start event');
      //this.gif.play();
      this.gifframespersimframe = this.gif.get_frames().length / (1 / this.simulationstepsize);
      if (!this.gif.get_loading()) {
        this.gif.move_to(0);
        //console.log('handlestart simulationstepsize, frames:',this.simulationstepsize,this.gif.get_frames().length);
      }
    };
    this.handleStop = e => {
      //console.log('AnimatedHeart stop event');
      //this.gif.move_relative(1);
      if (!this.gif.get_loading())  this.gif.pause();
    };
  }

  //handleStop(e) {}

  attached() {
    super.attached();
    //this.imgel - is referenced from view (HTML)
    //console.log('animatedheart2 imgel', this.imgel);
    this.gif = new SuperGif({gif: this.imgel, auto_play: false, rubbable: true});
    //console.log('animatedheart2 gif', this.gif);

    this.gif.load();
    document.getElementById(this.fromid).addEventListener('fmistart', this.handleStart);
    //document.getElementById(this.fromid).addEventListener('fmidata', this.handleStart);
    document.getElementById(this.fromid).addEventListener('fmistop', this.handleStop);
    this.currentframereal = 0;
    if (typeof this.simulationstepsize === ' string') this.simulationstepsize = parseFloat(this.simulationstepsize);
  }

  normalAction() {
    this.currentframereal += this.gifframespersimframe; //increase gif frame - based on how many frames are ther per simulation frame
    this.currentframe = Math.round(this.currentframereal);
    if (!this.gif.get_loading()) this.gif.move_to(this.currentframe);
  }

  trigger() {
    this.currentframereal = 0;
    if (!this.gif.get_loading()) this.gif.move_to(0);// set to frame 0
  }
}
