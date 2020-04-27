import {bindable} from 'aurelia-templating';

export class Value {
  @bindable fromid;
  @bindable refindex;
  @bindable numerator=1;
  @bindable denominator=1;
  constructor() {
    //create lambda function which is added as listener later
    this.handleValueChange = e => {
      //e.detail do not reallocate - using same buffer, thus slicing to append to data array
      //let edata = e.detail.data.slice();
      this.value = e.detail.data[this.refindex] * this.numerator / this.denominator;
    };
  }
  attached() {
    //listening to custom event fmidata
    document.getElementById(this.fromid).addEventListener('fmidata', this.handleValueChange);
  }

  detached() {
    if (document.getElementById(this.fromid)) document.getElementById(this.fromid).removeEventListener('fmidata', this.handleValueChange);
  }
}
