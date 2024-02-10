import {inject, bindable} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class FbSetState {
    @bindable title;
    @bindable value;
    constructor(ea) {this.ea=ea;}

    bind() {
        console.log('FBSetState.bind() title:'+this.title)
    }

    setState(){        
        this.ea.publish('fb-send-message',this.value);
    }
}