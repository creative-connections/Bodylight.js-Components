import {Value} from './value';
import {bindable} from 'aurelia-templating';
export class BdlTriggerOnIncrease extends Value {
  @bindable thresholdvalue;
  constructor() {
    super();
    //create lambda function which is added as listener later
    this.handleValueChange = e => {
      this.value = e.detail.data[this.refindex] * this.numerator / this.denominator;
      if (this.value > this.thresholdvalue) {
        if (!this.triggered) {
          this.triggered = true;
          this.trigger();
        }
      } else {
        if (this.triggered) {this.triggered = false;}
      }
    };
  }


  attached() {
    console.log('audioonincrease attached');
    super.attached();
    if (typeof this.thresholdvalue === 'string') {
      this.thresholdvalue = parseFloat(this.thresholdvalue);
    }
  }

  /**
   * This should be overriden, is triggered when threshold is reached
   */
  trigger() {
    console.log('trigger not implemented');
    //not implemented
  }
}
