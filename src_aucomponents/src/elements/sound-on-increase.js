import {bindable} from 'aurelia-templating';
import {TriggerOnIncrease} from './trigger-on-increase';

export class SoundOnIncrease extends TriggerOnIncrease {
  @bindable thresholdvalue;
  @bindable freq=440;
  @bindable volume=0.5;
  @bindable beepduration = 0.3;
  @bindable showdialog = true;
  soundon = true;
  constructor() {
    super();
  }

  bind() {
    if (typeof(this.volume) === 'string') this.volume = parseFloat(this.volume, 10); /* set volume of sound output */
    if (typeof(this.beepduration) === 'string') this.beepduration = parseFloat(this.beepduration, 10); /* set volume of sound output */
    if (typeof(this.freq) === 'string') this.freq = parseInt(this.freq, 10); /* set volume of sound output */
    if (typeof(this.showdialog) === 'string') this.showdialog = this.showdialog === 'true';
  }

  attached() {
    super.attached();
    // create web audio api context
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // create Oscillator node
    /*this.oscillator = this.audioCtx.createOscillator();
    this.oscillator.connect(this.audioCtx.destination);*/
    let ticks = Math.floor(this.freq * this.beepduration);
    this.durationtime = ticks / this.freq; //compute duration to be integer number of ticks;
  }

  switchsound(){ this.soundon = ! this.soundon}

  trigger() {
    if (this.soundon) {
      //inspired by the javascript audio api tutorial https://marcgg.com/blog/2016/11/01/javascript-audio/
      this.oscillator = this.audioCtx.createOscillator();
      let g = this.audioCtx.createGain();
      g.gain.value = this.volume;
      g.connect(this.audioCtx.destination);
      this.oscillator.frequency.value = this.freq;
      this.oscillator.connect(g);
      this.oscillator.start();
      //stop after beepduration - but round to whole number of ticks (try to prevent zzz)
      this.oscillator.stop(this.audioCtx.currentTime + this.durationtime);
    }
    //console.log('soundonincrease trigger time:', this.audioCtx.currentTime);
    //fade out in 150ms, get rid of click
    /*setTimeout(function(that, g2) {
      //console.log('soundonincrease ramp down', that.audioCtx.currentTime);
      g2.gain.exponentialRampToValueAtTime(0.00001, that.audioCtx.currentTime + 0.1);
      //stop 0.01 after ramp down
      that.oscillator.stop(that.audioCtx.currentTime + 0.15);
    }, 150, this, g);*/

    //this.oscillator.stop(this.audioCtx.currentTime + 0.4); // stop at 0.4 seconds after the current time, in case of fadeout don't work
    //}
  }
}
