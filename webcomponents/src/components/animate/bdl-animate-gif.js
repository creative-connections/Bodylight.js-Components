import SuperGif from 'libgif'; //suing libgif https://github.com/buzzfeed/libgif-js
import {bindable} from 'aurelia-templating';

//animates gif, plays frame on each simulation tick, event fmidata
export class BdlAnimateGif {
  @bindable fromid;
  @bindable src;
  @bindable width=400;
  @bindable height=300;

  constructor() {
    this.isstopped = true;
    this.handleStart = e => {
      console.log('AnimatedHeart start event gif length:',this.gif.get_length());
      //this.gif.play();
      if (!this.gif.get_loading()) this.gif.move_to(0);
    };
    this.handleStep = e => {
      console.log('AnimatedHeart step event from frame', this.gif.get_current_frame());
      //this.gif.play();
      if (!this.gif.get_loading()) this.gif.move_relative(1);
    };

    this.handleStop = e => {
      console.log('AnimatedHeart stop event');
      //this.gif.move_relative(1);
      if (!this.gif.get_loading()) this.gif.pause();
    };
  }

  attached() {
    //this.imgel - is referenced from view (HTML)
    console.log('animatedheart2 imgel, width,height', this.imgel,this.width,this.height);
    this.gif = new SuperGif({gif: this.imgel, auto_play: false, rubbable: true, max_width: this.width});
    console.log('animatedheart2 gif', this.gif);
    this.gif.load();
    document.getElementById(this.fromid).addEventListener('fmistart', this.handleStart);
    document.getElementById(this.fromid).addEventListener('fmidata', this.handleStep);
    document.getElementById(this.fromid).addEventListener('fmistop', this.handleStop);

  }
}