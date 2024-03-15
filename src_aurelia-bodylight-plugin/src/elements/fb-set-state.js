import {inject, bindable} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class FbSetState {
    @bindable title;
    @bindable value;
    @bindable messagetype = 'fb-send-message';
    constructor(ea) {this.ea=ea;}

    bind() {
        console.log('FBSetState.bind() title:'+this.title)
    }

    setState(){        
        this.ea.publish(this.messagetype,this.value);
    }
}