import {inject, bindable} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
@inject(EventAggregator)
export class FbGetState {
    @bindable tohash = false;
    value =''
    previousvalue ='';
    constructor(ea) {this.ea=ea;}
    bind(){
        if (typeof this.tohash === 'string') this.tohash = this.tohash === 'true';
    }

    attached(){        
        this.ea.subscribe('fb-get-message', payload => {
            //this.sendMessage(payload)            
            this.value = payload;
            console.log('message was taken:',this.value)
            if (this.tohash) {
                if (this.previousvalue != this.value) {  //change only if it differs from previous value
                  this.previousvalue = this.value;
                  if (this.value.length>0 && this.value[0] === '#') window.location.hash = this.value;
                  else window.location.hash = '#'+this.value; //add hash if it is missing in the string value
                }
              }
        });
    }


}