import {bindable} from 'aurelia-templating';
import {BdlTriggerOnIncrease} from './bdl-trigger-on-increase';

export class BdlSoundOnIncrease extends BdlTriggerOnIncrease {
  @bindable thresholdvalue;
  @bindable freq=440;
  @bindable volume=0.5;
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
    //inspired by the javascript audio api tutorial https://marcgg.com/blog/2016/11/01/javascript-audio/
    this.oscillator = this.audioCtx.createOscillator();
    let  g = this.audioCtx.createGain();
    g.gain.value = typeof(this.volume) === 'string' ? parseFloat(this.volume, 10) : this.volume;/* set volume of sound output 0.5 = 50%*/
    g.connect(this.audioCtx.destination);
    this.oscillator.frequency.value = typeof(this.freq) === 'string' ? parseInt(this.freq, 10) : this.freq;
    this.oscillator.connect(g);
    this.oscillator.start();
    //console.log('soundonincrease trigger time:', this.audioCtx.currentTime);
    //fade out in 150ms, get rid of click
    setTimeout(function(that, g2) {
      //console.log('soundonincrease ramp down', that.audioCtx.currentTime);
      g2.gain.exponentialRampToValueAtTime(0.00001, that.audioCtx.currentTime + 0.1);
      //stop 0.01 after ramp down
      that.oscillator.stop(that.audioCtx.currentTime + 0.11);
    }, 150, this, g);

    //this.oscillator.stop(this.audioCtx.currentTime + 0.4); // stop at 0.4 seconds after the current time, in case of fadeout don't work
    //}
  }
}
