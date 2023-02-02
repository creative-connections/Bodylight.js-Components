import {Value} from './value';
import {bindable} from 'aurelia-templating';
export class TriggerOnIncrease extends Value {
  @bindable thresholdvalue;
  @bindable action;
  @bindable numerator;
  @bindable denominator;
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
    if (this.numerator) this.numerator = parseFloat(this.numerator); else this.numerator = 1;
    if (this.denominator) this.denominator = parseFloat(this.denominator); else this.denominator = 1;

  }

  /**
   * This should be overriden, is triggered when threshold is reached
   */
  trigger() {
    if (this.action) {
      /*eslint-env browser*/
      eval(this.action);
    } else console.warn('no trigger set');
    //not implemented
  }

  normalAction() {
    //console.log('normalAction not implemented');
    //usually do nothing, or some child may increase or implement some frame action
  }
}
