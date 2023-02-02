import {bindable} from 'aurelia-templating';
import {AudioOnIncrease} from './audio-on-increase';
import {useView} from 'aurelia-templating';
//import {PLATFORM} from 'aurelia-pal';
//@customElement
//@useView(PLATFORM.moduleName('./audio-on-increase.html'))
@useView('./audio-on-increase.html')
export class AudioOnDecreaseCustomElement extends AudioOnIncrease {
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
