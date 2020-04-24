import {bindable} from 'aurelia-templating';
import {BdlAudioOnIncrease} from './bdl-audio-on-increase';
import {useView} from 'aurelia-templating';

//@customElement
@useView(PLATFORM.moduleName('./bdl-audio-on-increase.html'))
export class BdlAudioOnDecreaseCustomElement extends BdlAudioOnIncrease {
  @bindable thresholdvalue;
  @bindable src;
  constructor() {
    super();
    //create lambda function which is added as listener later
    this.handleValueChange = e => {
      this.value = e.detail.data[this.refindex] * this.numerator / this.denominator;
      if (this.value < this.thresholdvalue) {
        if (!this.triggered) this.trigger();
      } else {
        if (this.triggered) {this.triggered = false;}
      }
    };
  }
}
