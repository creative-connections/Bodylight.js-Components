import {bindable} from 'aurelia-templating';
import {BdlTriggerOnIncrease} from './bdl-trigger-on-increase';
export class BdlAudioOnIncrease extends BdlTriggerOnIncrease {
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
