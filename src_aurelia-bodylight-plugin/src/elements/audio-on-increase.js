import {bindable} from 'aurelia-templating';
import {TriggerOnIncrease} from './trigger-on-increase';
export class AudioOnIncrease extends TriggerOnIncrease {
  @bindable thresholdvalue;
  @bindable src;
  @bindable controls=false;

  attached() {
    super.attached();
    console.log('audioonincrease attached');
    this.played = false;
  }

  trigger() {
    //console.log('triggered');
    //this.triggered = true;
    if (!this.played || this.audioctl.ended) {
      this.audioctl.play();
      this.played = true;
    }
  }
}
