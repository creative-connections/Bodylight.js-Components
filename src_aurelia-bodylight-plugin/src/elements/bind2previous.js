import {bindable} from 'aurelia-framework';

/**
 * Bind2Previous binds two components identified by "fromid" and "toid" it changes the 'value' attribute of the 'toid' element
 * <bind2previous fromid="id1" toid="id2"></bind2previous>
 *
 * <bdl-fmi id="id4" inputs="id4,id1,id6,..."></bdl-fmi> fmi component registers event listener and change the value on behalf of it
 *
 */
export class Bind2previous {
  @bindable fromid; //one or multiple ids separated by ,
  @bindable event = 'input'; //name of event default 'input' or could be fmi-data
  @bindable toid; //id of DOM to send value,values
  @bindable toattribute; //attribute to se, if not set 'value' is set

  constructor() {
    //document.getElementById("id${window.ids - 2}").addEventListener("change", myfun${window.ids});
    /*function myfun${window.ids}(event){
        document.getElementById("id${window.ids - 1}").value = event.target.value;
   }*/
    this.handleValueChange = e => {
      //console.log('handleValueChange, e,fromid,toid', e);
      let value = e.detail ? e.detail.value : e.target.value;
      //set concrete attribute
      if (this.toattribute) {
        let el = document.getElementById(this.toid);
        //multiple values or single value
        if (this.multiple) {
          //multiple values - first read existing
          if (!el) {console.warn('bind2previous didnt find target element with id'+this.toid); return;}
          let elvalues = el.getAttribute(this.toattribute).split(',');
          //identify index which to modify
          let myindex = this.fromids.indexOf(e.target.id);
          //set - modify in appropriate place in array
          elvalues[myindex] = value;
          //convert back to csv
          let value2send = elvalues.join(',');
          //set to DOM
          el.setAttribute(this.toattribute, value2send);
          console.log('bind2previous setting values to DOM element',value2send,el);
        } else {
          el.setAttribute(this.toattribute, value);
          //fix setting depended input attributes -e.g. in <range>
          let inputs = el.getElementsByTagName('input');
          if (inputs.length > 0) {
            for (let input of inputs) input.setAttribute(this.toattribute,value);
          }
        }
      }
      //set value attribute
      else document.getElementById(this.toid).value = value;
    };
  }

  attached() {
    this.multiple = this.fromid.includes(',');
    if (this.multiple) {
      //this.multiple = true;
      this.fromids = this.fromid.split(',');
      for (let id of this.fromids) document.getElementById(id).addEventListener(this.event, this.handleValueChange);
    } else //single fromid
    document.getElementById(this.fromid).addEventListener(this.event, this.handleValueChange);
  }
  detached() {
    if (this.multiple) {
      for (let id of this.fromids) document.getElementById(id).removeEventListener(this.event, this.handleValueChange);
    }
    else
    if (document.getElementById(this.fromid)) document.getElementById(this.fromid).removeEventListener(this.event, this.handleValueChange);
  }
}
