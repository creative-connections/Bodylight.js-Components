import {BdlValue} from './bdl-value';
import {bindable} from 'aurelia-templating';
export class BdlTriggerOnIncrease extends BdlValue {
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
        } else {
          this.normalAction();
        }
      } else {
        if (this.triggered) {this.triggered = false;}
        this.normalAction();
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

  normalAction() {
    //console.log('normalAction not implemented');
    //usually do nothing, or some child may increase or implement some frame action
  }
}
