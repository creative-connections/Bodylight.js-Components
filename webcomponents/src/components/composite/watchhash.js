import {parseHashParamString} from '../utils';

export class WatchhashCustomAttribute {
  static inject = [Element];
  constructor(element) {
    this.element = element;
    if ( typeof(element.au.controller) === 'object' && typeof(element.au.controller.viewModel) === 'object') {
      this.elementVM = element.au.controller.viewModel;
      //check whether elementVM has changesrc function - to be called in event listener
      if (typeof this.elementVM.changesrc === 'function') {
        this.isReadMDCustomElement = true;
      }
    }
    console.log('WatchhashCustomAttribute');
    //event listener function needs to be declared this way - they have access to 'this'
    this.handleHashChange = e => {
      console.log('handleHashChange');
      let params = parseHashParamString(window.location.hash);
      let index;
      if (this.paramindex) index = params[this.paramname] ? params[this.paramname] : params[this.paramindex];
      else index = params[this.paramname];

      if (index) {
        //this.src = index;
        this.elementVM.changesrc(index);
      }
    };
  }

  bind() {
    //console.log('customa')
    if (this.value && this.value.includes(',')) {
      let paramconf = this.value.split(',');
      this.paramname = paramconf[0];
      this.paramindex = paramconf[1];
    } else {
      this.paramname = this.value;
      this.paramindex = null;
    }
    if (this.isReadMDCustomElement) {
      //call this at the beginning
      this.handleHashChange(null);
      window.addEventListener('hashchange', this.handleHashChange);
    }
  }
}
