import SuperGif from 'libgif';
import {bindable} from 'aurelia-templating';
export class BdlAnimateGif {
  @bindable fromid;
  @bindable src;

  constructor() {
    this.isstopped = true;
    this.handleStart = e => {
      console.log('AnimatedHeart start event');
      //this.gif.play();
      this.gif.move_relative(1);
    };
    this.handleStop = e => {
      console.log('AnimatedHeart stop event');
      //this.gif.move_relative(1);
      this.gif.pause();
    };
  }

  attached() {
    //this.imgel - is referenced from view (HTML)
    console.log('animatedheart2 imgel', this.imgel);
    this.gif = new SuperGif({gif: this.imgel, auto_play: false, rubbable: true});
    console.log('animatedheart2 gif', this.gif);
    this.gif.load();
    document.getElementById(this.fromid).addEventListener('fmistart', this.handleStart);
    document.getElementById(this.fromid).addEventListener('fmidata', this.handleStart);
    document.getElementById(this.fromid).addEventListener('fmistop', this.handleStop);

  }
}
