import {bindable} from 'aurelia-framework';
import {Range} from './range';
//import _ from "lodash";

export class RangeSmooth2 extends Range {

@bindable min;
@bindable max;
@bindable default;
@bindable step = 1;
@bindable value;
@bindable title;
@bindable showicons = true;
@bindable globalanim = false;
//@bindable firedata = false; //'position'
@bindable fireevent = 'input'; //name of the event to be dispatched - should be same as fmi eventlisten
refinput;
refnumber;
@bindable listenkey; //true or false
@bindable activationkey; //if defined - then
actived = false;
@bindable ids; //optional comma separated id to send value change ,e.g. id1,id2,id3
@bindable convertors;//comma separated xpression with x as value e.g. (100-2-x)/3,(100-2-x)/3,(100-2-x)/3
//optional twoway settings - if set - fmudata may set the value of range
@bindable fromid; //id of fmu component
@bindable refindex; //index of variable to be listened
@bindable id;
@bindable throttle = 1000; //throttle update value from fromid, default every 1s
//@bindable smooth = false;
//@bindable smoothstep = 1;
@bindable desiredValue;

constructor() {
    super();
    this.handleValueChange = e => {
        //sets data to dataset
        //apply value convert among all data
        if (this.fromid) {
            if (this.refindex) {
                let rawdata = e.detail.data[this.refindex];
                this.value = this.operation[0](rawdata);
                //  else this.value = rawdata;
                //console.log('Range received rawdata '+rawdata+' converted value '+this.value);
                //console.log('this operation',this.operation)
                this.updatevalue(); //call function - it may be throttled 
            } 
            if (Math.abs(parseFloat(this.value)-parseFloat(this.desiredvalue))>=this.step ) {
                this.doValueStep();
            }
        }
    }
}

attached(){
    super.attached();
}

setDesiredDefault() {
    this.desiredvalue = this.default;
}

doValueStep(){
    let myvalue = parseFloat(this.value);
    let mydesiredvalue = parseFloat(this.desiredvalue);
    if (mydesiredvalue>this.max) { mydesiredvalue = this.max; this.desiredvalue = this.max.toString(); } //set desiredvalue to max to not to overflow 
    if (mydesiredvalue<this.min) { mydesiredvalue = this.min; this.desiredvalue = this.min.toString(); } //set desiredvalue to min to not to overflow 

    if (myvalue < mydesiredvalue) myvalue+=this.step; //note step needs to be >0
    else myvalue -=this.step;
    this.value = myvalue.toString();
}

}
   