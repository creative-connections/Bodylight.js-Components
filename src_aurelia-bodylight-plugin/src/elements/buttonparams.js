import {bindable,bindingMode} from 'aurelia-framework';
export class Buttonparams {
    //@bindable value;
    @bindable title;
    @bindable ids;
    @bindable values; /*({
      name:'values',
      attribute:'values',
      changeHandler:'valuesChanged',
      defaultBindingMode: bindingMode.twoWay,
      defaultValue: undefined
    })*/
    @bindable resetvalues;
    @bindable ticks2reset = 1;
    @bindable fromid;
    @bindable refindex;
    @bindable thresholdvalue; //value from ind refindex should be equal and triggers the action of buttonparams - like it would be clicked manually
    @bindable fireevent='input'; //name of the event to be fired
    //@bindable findex; //optional index of variables which will be set to values array fmu-index
    //@bindable convertors; //optional convertor?? value-convertor
    showinputs=false; //debug to show inputs true, otherwise false
    values2send=[];
    ids2send=[];
    resetvalues2send=[];
    currenttick = 0;
    //previousvalue = null;

    triggered = false;

    constructor() {
      this.handleTick = e => {
        this.currenttick++;
        if (this.currenttick >= this.ticks2reset) {
          //do reset values
          if (this.ids2send.length !== this.resetvalues2send.length) {
            console.warn('warning ids and values contain different number of items.', this.ids2send, this.resetvalues2send);
            return;
          }
          //set reset values
          for (let i = 0; i < this.ids2send.length; i++) {
            let inputel = document.getElementById(this.ids2send[i]);
            inputel.value = this.resetvalues2send[i];
            let event = new Event('change');
            inputel.dispatchEvent(event);
          }
          //remove event listener - do not need to listen the event anymore
          const fromel = document.getElementById(this.fromid);
          if (fromel) {
            fromel.removeEventListener('fmidata', this.handleTick);
          }
        }
      };

      this.handleValueChange = e => {
        //sets data to dataset
        //apply value convert among all data
        if (this.fromid) {
            if (this.refindex) {
                //let rawdata = e.detail.data[this.refindex];
                this.value = e.detail.data[this.refindex];
                //  else this.value = rawdata;
                //console.log('Range received rawdata '+rawdata+' converted value '+this.value);
                //console.log('this operation',this.operation)
                this.updatevalue(); //call function - it may be throttled 
            } else {
                if (this.smooth) {
                    //do smooth step 
                }
            }
        }
    };
    }

    bind() {
      //console.log('button.bind()');
      this.ids2send = this.ids.split(',');
      this.createids = [];
      //create those ids not yet in HTML DOM and put them to createids array
      for (let myid of this.ids2send) {if (! document.getElementById(myid)) this.createids.push(myid);}
      this.values2send = this.values.split(',');
      //reset value - after some time period or after some event
      if (this.resetvalues) {
        this.resetvalues2send = this.resetvalues.split(',');
      }
      //get ticks2reset value - parse into number (int),default 1
      if (typeof this.ticks2reset === 'string') {
        this.ticks2reset = parseInt(this.ticks2reset, 10);
        if (isNaN(this.ticks2reset)) this.ticks2reset = 1;
      }
      if (this.fromid) {

      }
    }

    attached() {
      //in this stage, view creates the virtual inputs as in createids array, the inputs are then consumed by fmu component
      //console.log('button.attached() ids2send, values2send', this.ids2send, this.values2send);
      if (this.fromid) {
        const fromel = document.getElementById(this.fromid);
        if (fromel) {
          fromel.addEventListener('fmidata', this.handleValueChange);
        }    
      }
    }

    detached() {
      if (this.fromid) {
        if (document.getElementById(this.fromid)) {
          document.getElementById(this.fromid).removeEventListener('fmidata', this.handleValueChange);
        }
      }
    }

    /*
    this is fired when the button is pressed, it sets values to the defined state
    dispatch the event and if resetvalues is set - then listen fmidata event
     */
    switchvalues() {
      if (this.ids2send.length !== this.values2send.length) {console.warn('warning ids and values contain different number of items.',this.ids2send, this.values2send); return;}
      for (let i = 0; i < this.ids2send.length; i++) {
        let inputel = document.getElementById(this.ids2send[i]);
        inputel.value = this.values2send[i];
        let event = new Event(this.fireevent);
        inputel.dispatchEvent(event);
      }

      //if resetvalues are set, listen to ticks - fmidata event and after defined ticks2reset the values are set to resetvalues
      if (this.resetvalues) {
        this.currenttick = 0;
        const fromel = document.getElementById(this.fromid);
        if (fromel) {
          fromel.addEventListener('fmidata', this.handleTick);
        }
      }
    }

    valuesChanged() {
      this.values2send = this.values.split(',');
    }

    //a value comes from external id - if change compare and trigger event if match
    updatevalue() {
      if (this.value == this.thresholdvalue) {  //convert and compare - string "2" == 2
        if (!this.triggered) {
          this.triggered = true;
          this.trigger();
        } else {
          this.normalAction();
        }
      } else {
        if (this.triggered) {this.triggered = false;}
        this.normalAction();
      }  
    }

    //do action if not triggered
    normalAction() {}

    trigger() {
      this.switchvalues();
    }


}
