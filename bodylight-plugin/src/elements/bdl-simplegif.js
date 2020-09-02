import {bindable} from 'aurelia-templating';
import Gifffer from 'gifffer';

export class BdlSimplegif {
  @bindable fromid;
  @bindable src;

  constructor() {
    this.isstopped = true;
    this.handleStart = e => {
      //console.log('AnimatedHeart start event');
      this.start();
    };
    this.handleStop = e => {
      //console.log('AnimatedHeart stop event');
      this.stop();
    };
  }

  attached() {
    // eslint-disable-next-line new-cap
    this.gifs = Gifffer();
    console.log('animated heart gifs:', this.gifs);
    document.getElementById(this.fromid).addEventListener('fmistart', this.handleStart);
    document.getElementById(this.fromid).addEventListener('fmistop', this.handleStop);
  }

  stop() {
    this.isstopped = true;
    this.gifs[0].click();
  }
  start() {
    this.isstopped = false;
    this.gifs[0].click();
  }
}
