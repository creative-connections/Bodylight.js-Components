
import {bindable} from 'aurelia-templating';
import _ from 'lodash';

export class ValueStore {
  @bindable fromid;
  @bindable showcontrols = true
  data = [];
  timepoints = [];

  constructor() {
    //create lambda function which is added as listener later
    this.handleValueChange = e => {

      //e.detail do not reallocate - using same buffer, thus slicing to append to data array
      //let edata = e.detail.data.slice();

      //throttle update to reasonable frequency
      // _.throttle(()=> this.updateValue(e.detail.data[this.refindex]), this.throttle)();
      //call throttled function with args
      this.data.push(e.detail.data);
      this.timepoints.push(e.detail.time);
    };
    this.handleFMIAttached = e => {
      const fromel = document.getElementById(this.fromid);
      if (fromel) {
        fromel.addEventListener('fmidata', this.handleValueChange);
      } else {
        console.warn('fmi attached, but no element with id found:',this.fromid);
      }
    }
  }

  bind() {
    if (typeof this.showcontrols === 'string') this.showcontrols = (this.showcontrols === 'true');
  }

  attached() {
    //listening to custom event fmidata
    //listening to custom event fmidata and fmireset
    const fromel = document.getElementById(this.fromid);
    if (fromel) {
      fromel.addEventListener('fmidata', this.handleValueChange);
    } else {
      console.warn('chartjs, null fromid element, waiting to be attached');
      document.addEventListener('fmiattached',this.handleFMIAttached);
    }
  }

  detached() {
    if (document.getElementById(this.fromid)) document.getElementById(this.fromid).removeEventListener('fmidata', this.handleValueChange);
  }

  exportdata() {
    let mydata = {time:this.timepoints,data:this.data};
    let blob = new Blob([JSON.stringify(mydata)], {type: 'application/json;charset=utf-8;'});
    saveAs(blob, 'simulationdata.json');
  }

}
