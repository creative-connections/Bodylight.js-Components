import {bindable} from 'aurelia-templating';
import {TriggerOnIncrease} from './trigger-on-increase';

//@customElement
export class TriggerOnDecreaseCustomElement extends TriggerOnIncrease {
  @bindable thresholdvalue;
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
