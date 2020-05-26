import {parseHashParamString} from '../utils';

export class WatchHashCore {
  constructor() {
    this.params = '';
    console.log('WatchhashCore');
    //event listener function needs to be declared this way - they have access to 'this'
    this.handleHashChange = e => {
      console.log('handleHashChange');
      let params = parseHashParamString(window.location.hash);
      let args = [];
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
    };
  }

//params atribute is used to define param name and optional index e.g. summary,1;index,2;base,3
  bind() {
    this.paramname = [];
    this.paramindex = [];
    if (!this.params) return;
    console.log('wtachhashcore.bind() params:', this.params);
    let paramconfs = this.params.split(';');
    for (let paramitem of paramconfs) {
      if (paramitem && paramitem.includes(',')) {
        let paramconf = paramitem.split(',');
        this.paramname.push(paramconf[0]);
        this.paramindex.push(paramconf[1]);
      } else {
        this.paramname.push(paramitem);
        this.paramindex.push(null);
      }
    }
    //register only if the customelement is readmd - contains specific function
    //handle when hash has already some params to override default
    this.handleHashChange(null);
    //register event listener
    window.addEventListener('hashchange', this.handleHashChange);
  }

  changesrc(...args) {
    console.log('watchhashcore.changesrc()');
  }

}
