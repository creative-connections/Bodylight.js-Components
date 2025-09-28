import {bindable} from 'aurelia-framework';
import _ from "lodash";
import {Range} from './range';

export class Range2 extends Range {
    @bindable min;
    @bindable max;
    @bindable default;
    @bindable step;
    @bindable value;
    @bindable title;
    @bindable showicons = true;
    @bindable globalanim = false;
    @bindable animobj;
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
    @bindable smooth = false;
    @bindable smoothstep = 1;
    @bindable initdefault = false;
    @bindable refconditionvar; //condition variable from fromid
    @bindable refconditionvalue; //condition value the variable is tested to be equal //if defined then handlevalueChanged is processed ="patient_state" refconditionvalue ="3"
    counterToInit = 5;

    constructor() {
        super()
        this.handleValueChange = e => {
            //sets data to dataset
            //apply value convert among all data
            if (this.fromid) {
                if (this.refindex) {
                    if (this.refconditionvar) {
                        console.log('range handleValueChange() conditionvar '+this.refconditionvar+' conditionvalue '+this.refconditionvalue+' actual value:'+e.detail.data[this.refconditionvar]);
                        if (e.detail.data[this.refconditionvar]  != this.refconditionvalue) {
                            console.log('range condition not met');
                            return;
                        }
                    }
                    let rawdata = e.detail.data[this.refindex];                    
                    this.value = this.operation[0](rawdata);
                    //  else this.value = rawdata;
                    //console.log('Range received rawdata '+rawdata+' converted value '+this.value);
                    //console.log('this operation',this.operation)
                    //if (this.refconditionvar && (e.detail.data[this.refconditionvar]  !== this.refconditionvalue)) return; //refconditionvar is defined and its value is not equal to predefined then no update
                    this.updatevalue(); //call function - it may be throttled 
                } else {
                    if (this.smooth) {
                        //TODO do smooth step 
                    }
                }
            }
        }
    }    
    //setDefault() {     super.setDefault()    }    
    stepInc() {
        const newValue = parseFloat(this.value)+this.step;
        if ((newValue>=this.min) && (newValue<=this.max)) this.setValue(newValue);
    }
    stepDec() {
        const newValue = parseFloat(this.value)-this.step;
        if ((newValue>=this.min) && (newValue<=this.max)) this.setValue(newValue);
    }

    //setValue(){super.setValue()}
}
