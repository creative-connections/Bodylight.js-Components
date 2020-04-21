import {Value} from './value';
import {bindable} from 'aurelia-templating';
export class Soundon extends Value {
  @bindable thresholdvalue;
  @bindable src1;
  constructor() {
    super();
    //create lambda function which is added as listener later
    this.handleValueChange = e => {
      //e.detail do not reallocate - using same buffer, thus slicing to append to data array
      //let edata = e.detail.data.slice();
      this.value = e.detail.data[this.refindex] * this.numerator / this.denominator;
      if (this.value > this.thresholdvalue) {
        //console.log('value reached threshold:',this.value,this.thresholdvalue);
        //trigger only once when above the threshold
        if (!this.triggered) this.trigger();
      } else {
        //console.log('value bellow threshold',this.value,this.thresholdvalue);
        //reset triggered - as it is bellow threshold
        if (this.triggered) {this.triggered = false;}
      }
    };
  }

  attached() {
    super.attached();
    if (typeof this.thresholdvalue === 'string'){
      this.thresholdvalue = parseFloat(this.thresholdvalue);
    }
    this.played = false;
  }

  trigger() {
    //console.log('triggered');
    this.triggered = true;
    if (!this.played || this.audioctl.ended) {
      this.audioctl.play();
      this.played = true;
    }
  }
}
