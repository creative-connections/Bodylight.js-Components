import {Range} from './range';
import {bindable} from 'aurelia-framework';

/**
 * when user clicks or change the input rapidly - it will generate 'number' of events between current and target values to be sent
 * with 'time' in ms between each event
 */
export class RangeSmooth extends Range {
    @bindable number=5;
    @bindable time=200;

    @bindable min;
    @bindable max;
    @bindable default;
    @bindable step;
    @bindable value;
    @bindable title;
    @bindable fireevent='input'; //name of the event to be dispatched - should be same as fmi eventlisten
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
    myvalue;
    smoothing=false;
    constructor() {
        super();
        this.handleValueChange = e => {
            this.smoothValue(e);
            e.stopPropagation();
        }
    }

    bind(){
        super.bind();
        this.myvalue = this.default;
        if (typeof this.number === 'string') {
            this.number = parseInt(this.number);
        }
        if (typeof this.time === 'string') {
            this.time = parseInt(this.time);
        }
    }

    attached(){
        super.attached();
        //catch event from range or number - smooth it
        this.refinput.addEventListener('input',this.handleValueChange);
        this.refnumber.addEventListener('input',this.handleValueChange);
        this.value = parseFloat(this.myvalue);
    }

    detached(){
        //super.de
        this.refinput.removeEventListener('input',this.handleValueChange);
        this.refnumber.removeEventListener('input',this.handleValueChange);
    }

    smoothValue(e){
        //check if it is not smoothing another value
        if (!this.smoothing) {
            this.smoothing = true;
            this.targetvalue = parseFloat(e.target.value);
            this.currentvalue = this.value;
            console.log('smoothing from '+this.value+' to target '+this.targetvalue);
            this.valuestep = this.step;
            let i = 0;
            let mystep = Math.sign(this.targetvalue-this.value)*this.step;
            let howmanysteps = Math.abs(this.targetvalue-this.currentvalue)/this.step;
            //schedule smooth steps
            let newvalue = this.value;
            for (let i =0;i<howmanysteps;i++) {
                newvalue = this.value+mystep*i;
                let myvalue = newvalue;
                console.log('creating event with new value in hidden input listened by others '+newvalue);
                setTimeout(() => {
                    //this.value += this.step;
                    let event = new Event('input', {bubbles:true});
                    this.refsmooth.value = myvalue;
                    this.refsmooth.dispatchEvent(event);
                    //console.log('sending value:', this.refsmooth.value);
                }, this.time * i);
            }
            //schedule smoothing to be stopped;
            this.smoothing = false;
            this.value=this.targetvalue;
            /*
            for (let i = 1; i < this.number; i++) {
                setTimeout(() => {
                    this.value += this.valuestep;
                    let event = new Event('input', {bubbles:true});
                    this.refsmooth.value = this.value;
                    this.refsmooth.dispatchEvent(event);
                    console.log('sending value:', this.value);
                }, this.time * i);
            }
            setTimeout(() => {
                this.value = this.targetvalue;
                let event = new Event('input', {bubbles:true});
                this.refsmooth.value = this.value;
                this.refsmooth.dispatchEvent(event);
                this.smoothing = false;
                console.log('sending value:', this.value);
            }, this.time * this.number);
            */
        } else {
            //only set target value
            this.targetvalue = parseFloat(e.target.value);
            //this.valuestep = (this.targetvalue - this.value) / this.number;
        }
    }

}
