import {inject} from 'aurelia-framework';
import {bindable} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
//import {HttpClient} from 'aurelia-http-client';
/**
 * reads data from remote url - periodically
 */
@inject(HttpClient)
export class readdata {
  @bindable display;
  @bindable url;
  @bindable timeout;
  @bindable ids;
  showinputs = false;
  previousvalue=0;
  fireevent = 'input'

  constructor(client) {
    this.httpclient = client;
    this.continue = true;
  }
  bind() {
    this.display = this.display && (this.display === 'true');
    if (this.timeout) this.timeout = parseInt(this.timeout, 10); else this.timeout = 0;
    //id of input elements
    this.ids2send = this.ids.split(',');
    this.createids = [];
    //create those ids not yet in HTML DOM and put them to createids array
    for (let myid of this.ids2send) {if (! document.getElementById(myid)) this.createids.push(myid);}
  }

  attached() {
    if (!this.url) { console.error('expected url attribute in readdata component'); } else {
      //first update
      this.update(this);
      //set periodic update
      //let that = this;
      console.log('readdata.attached with fetch api', this.timeout);
      //
    }
  }

  update(that) {
    //this.httpclient.fetch(this.url)
    that.httpclient.fetch(that.url)
      .then(response => response.text())
      .then(text => {
        //set data that was fetched
        that.value = text;
        //dispatch event if value differs from previous
        if (that.previousvalue !== that.value) {
          //if (this.ids2send.length !== this.values2send.length) {console.log('warning ids and values contain different number of items.', this.ids2send, this.values2send); return;}
          for (let i = 0; i < that.ids2send.length; i++) {
            let inputel = document.getElementById(that.ids2send[i]);
            //console.log('readdata.update() debugging that', that);
            //console.log('readdata.update() debugging inputel', inputel);
            inputel.value = that.value;
            let event = new Event(that.fireevent);
            inputel.dispatchEvent(event);
          }
        }
        that.previousvalue = that.value;
        //console.log('readdata.update', that.data);
        //schedule next call
        //let that = this;
        if (that.timeout > 0) that.timerid = setTimeout(that.update, that.timeout, that);
      });
  }

  detached() {
    this.continue = false;
    if (this.timerid) clearInterval(this.timerid);
    console.log('readdate.detached');
  }
}
