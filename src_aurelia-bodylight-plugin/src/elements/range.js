import { bindable } from 'aurelia-framework';
import _ from "lodash";

export class Range {
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
        this.handleValueChange = e => {
            //sets data to dataset
            //apply value convert among all data
            if (this.fromid) {
                if (this.refindex) {
                    if (this.refconditionvar) {
                        console.log('range handleValueChange() conditionvar ' + this.refconditionvar + ' conditionvalue ' + this.refconditionvalue + ' actual value:' + e.detail.data[this.refconditionvar]);
                        if (e.detail.data[this.refconditionvar] != this.refconditionvalue) {
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

    bind() {
        if (typeof (this.smooth) === 'string') this.smooth = this.smooth === 'true';
        if (typeof (this.step) === 'string') this.step = parseFloat(this.step);
        if (typeof (this.showicons) === 'string') this.showicons = this.showicons === 'true';
        if (typeof (this.globalanim) === 'string') this.globalanim = this.globalanim === 'true';
        if (this.listenkey && this.listenkey === 'true') {
            if (this.activationkey && this.activationkey === 'A') this.actived = true; //first activationkey 'A' is by default actived
            document.onkeypress = function (e) {
                //e = e || window.event;// use e.keyCode
                //if (window.listenrange)
                if (this.activationkey && e.charCode >= 65 && e.charCode <= 90) { //'A' ..'Z' is pressed
                    this.actived = (e.key === this.activationkey);
                }
                if (!(this.activationkey) || (this.actived)) { //activationkey not defined or actived - 'A' or
                    let number = e.charCode - 97; //0..9
                    let mappedvalue = parseInt(this.min);
                    if (number > 0) { //a..j interpolates to values between min and max
                        if (number < 9) mappedvalue = parseInt(this.min) + (parseInt(this.max) - parseInt(this.min)) * number / 10;
                        else mappedvalue = parseInt(this.max);
                    }
                    this.setValue(mappedvalue);
                }
            }
        }
        if (this.ids) this.ids2send = this.ids.split(',');
        //configure convertors - used to convert units received from fmi
        this.operation = [];
        if (this.convertors) {
            let convertvalues = this.convertors.split(';');
            let identity = x => x;
            for (let i = 0; i < convertvalues.length; i++) {
                if (convertvalues[i].includes(',')) {
                    //convert values are in form numerator,denominator contains comma ','
                    let convertitems = convertvalues[i].split(',');
                    if (convertitems[0] === '1' && convertitems[1] === '1') this.operation.push(identity);
                    else {
                        let numerator = parseFloat(convertitems[0]);
                        let denominator = parseFloat(convertitems[1]);
                        let addend = (convertitems.length > 2) ? parseFloat(convertitems[2]) : 0;
                        this.operation.push(x => ((x * numerator / denominator) + addend));
                    }
                } else {
                    //convert values are in form of expression, do not contain comma
                    if (convertvalues === '1/x') this.operation.push(x => 1 / x);

                    else {
                        // for eval() security filter only allowed characters:
                        // algebraic, digits, e, dot, modulo, parenthesis and 'x' and 'e' is allowed
                        let expression = convertvalues[i].replace(/[^-\d/*+.()%xe]/g, '');
                        console.log('chartjs bind(), evaluating expression:' + convertvalues[i] + ' securely filtered to :' + expression);
                        // eslint-disable-next-line no-eval
                        this.operation.push(x => eval(expression));
                    }
                }
            }
        }
        //register throttled update function
        if ((typeof this.throttle) === 'string') this.throttle = parseInt(this.throttle, 10);
        if (this.throttle > 0) {//throttle
            this.updatevalue = _.throttle(this.setCurrentValue.bind(this), this.throttle);
        } else {//directly call update
            this.updatevalue = this.setCurrentValue.bind(this);
        }
        if (typeof this.initdefault === 'string') this.initdefault = this.initdefault === 'true';
        // In bind()
        this.debouncedDispatch = _.debounce(() => {
            if (this.refinput) {
                this.refinput.dispatchEvent(new Event(this.fireevent, {
                    bubbles: true,
                    cancelable: true
                }));
            }
        }, 100); // 100ms debounce        
    }

    attached() {
        let maxlength = 4 + this.max.length + ((this.step && this.step.toString().includes('.')) ? this.step.toString().length : 1);
        this.refnumber.style = 'width:' + maxlength + 'ch';
        if (this.fromid) {
            if (this.operation.length == 0) {
                console.warn('fromid defined, identity convertor added.');
                let identity = x => x;
                this.operation.push(identity)
            }
            //add event listener
            const fromidel = document.getElementById(this.fromid)
            if (fromidel) fromidel.addEventListener('fmidata', this.handleValueChange)
            else console.warn('range fromid element not found with id:', this.fromid);

        }
        //send event about default value        
        if (this.initdefault) this.checkSetDefault();
    }

    checkSetDefault() {
        if (window.thisfmi) this.setDefault();
        else {
            if (this.counterToInit-- > 0) _.debounce(this.checkSetDefault.bind(this), 1000); //try after 1 s but only 5 times
        }
    }

    setDefault() {
        this.setValue(this.default);
    }

    setValue(value) {
        if (this.refnumber) this.refnumber.value = value;
        if (this.refinput) {
            this.refinput.value = value;
            this.debouncedDispatch();
        }
    }

    setCurrentValue() {
        this.setValue(this.value);
    }

    valueChanged(newValue, oldValue) {
        console.log('range valueChanged() newValue,oldValue:', newValue, oldValue);
        if (newValue === oldValue) return; // Only act on real changes  
        //TODO check if it works in all cases - range is sometimes updated from outside
        //if (oldValue !== newValue)
        if (this.ids) {
            //semaphore only one change in time is allowed
            if (!window.rangebinding) {
                window.rangebinding = true;
                //sending value converted to other ids
                //if (this.ids2send.length !== this.values2send.length) {console.log('warning ids and values contain different number of items.', this.ids2send, this.values2send); return;}
                for (let i = 0; i < this.ids2send.length; i++) {
                    let inputel = document.getElementById(this.ids2send[i]);
                    if (inputel) {
                        inputel.value = this.operation[i](newValue);
                        console.log('range valuechange id,converted value:', this.ids2send[i], inputel.value);
                        let event = new Event(this.fireevent);
                        inputel.dispatchEvent(event);
                    } else { console.warn('inputel not found for id', this, ids2send[i]) }
                }
                window.rangebinding = false;
            }
        } else {
            //single value is change e.g. externally
            this.setValue(newValue);
            if (this.globalanim) {
                if (this.animobj) {
                    //animate local object
                    if (!window.ani.animationstarted) window.ani.enableAnimation();

                    if (window.ani) window.ani.setAnimationValue(this.animobj, newValue);
                }
                else {
                    //animate globally
                    if (window.ani && window.ani.exportRoot) {
                        for (animchild of window.ani.exportRoot.children) {
                            if (typeof animchild.gotoAndStop === 'function')
                                animchild.gotoAndStop(newValue);
                        }
                    }
                }
            }
        }
    }
}

