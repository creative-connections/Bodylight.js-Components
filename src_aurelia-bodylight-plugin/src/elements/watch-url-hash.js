import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {parseHashParamString} from '../attributes/utils';

@inject(EventAggregator)
export class WatchUrlHash {
  constructor(ea) {
    this.ea = ea;
    this.params = '';

    //event listener function needs to be declared this way - they have access to 'this'
    this.handleHashChange = e => {
      console.log('WatchHashCore HandleHashChange e:', e);
      let params = parseHashParamString(window.location.hash);
      /*let args = [];
            let index;
            for (let i = 0; i < this.paramname.length; i++) {
                if (this.paramindex[i]) index = params[this.paramname[i]] ? params[this.paramname[i]] : params[this.paramindex[i]];
                else index = params[this.paramname[i]];
                if (index) {
                    //this.elementVM.changesrc(index, this.paramname[i]);
                    args.push(index);
                    //this.changesrc(index, this.paramname[i]);
                }
            }
            if (args.length > 0) this.changesrc(...args);
             */
      this.ea.publish('hashchange', params);
    };
  }

  attached() {
    window.addEventListener('hashchange', this.handleHashChange);
  }
}
