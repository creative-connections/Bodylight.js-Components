import {inject, bindable} from 'aurelia-framework';
//import {bindable} from 'aurelia-templating';
import {HttpClient} from 'aurelia-fetch-client';
//import {HttpClient} from 'aurelia-http-client';
/**
 * writes data to remote url - from fmu with fromid
 */
@inject(HttpClient)
export class Senddata {
  @bindable fromid;
  @bindable refindex;
  @bindable numerator=1;
  @bindable denominator=1;
  @bindable addconst=0;
  @bindable url

  constructor(client) {
    this.httpclient = client;
    //create lambda function which is added as listener later
    this.handleValueChange = e => {
      //e.detail do not reallocate - using same buffer, thus slicing to append to data array
      //let edata = e.detail.data.slice();
      this.value = e.detail.data[this.refindex] * this.numerator / this.denominator + this.addconst;
      if (!this.url) { console.error('expected url attribute in readdata component'); } else {
        this.update();
      }
    };
  }
  attached() {
    //listening to custom event fmidata
    document.getElementById(this.fromid).addEventListener('fmidata', this.handleValueChange);
  }

  detached() {
    if (document.getElementById(this.fromid)) document.getElementById(this.fromid).removeEventListener('fmidata', this.handleValueChange);
  }

  update() {
    this.httpclient.fetch(this.url, {
      method: 'post',
      body: this.value
    });
  }
}
