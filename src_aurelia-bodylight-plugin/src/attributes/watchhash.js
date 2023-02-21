//import {parseHashParamString} from './utils';
import {WatchHashCore} from './watch-hash-core';

/**
 * Custom Attribute
 * if added to an element, cause that param name of param1 or index of param2 send in hash parameters are interpretted
 * to change SRC of parent element - this.elementVM.changesrc(newindex) is called
 */
export class WatchhashCustomAttribute extends WatchHashCore {
  static inject = [Element];
  constructor(element) {
    super();
    this.element = element;
    this.isReadMDCustomElement = false;
  }

  bind() {
    console.log('watchhash check au controller');
    if (this.element && this.element.au && this.element.au.controller) {
      console.log('watchhash check au controller type:', typeof (this.element.au.controller));
      if (typeof (this.element.au.controller) === 'object') console.log('watchhash check au controller viewmodel:', this.element.au.controller.viewModel);

      if (typeof (this.element.au.controller) === 'object' && this.element.au.controller.viewModel && typeof (this.element.au.controller.viewModel) === 'object') {
        this.elementVM = this.element.au.controller.viewModel;
        //check whether this.elementVM has changesrc function - to be called in event listener
        this.isReadMDCustomElement = (typeof this.elementVM.changesrc === 'function');
      }
    }
    this.params = this.value;
    super.bind();
  }
  changesrc(...args) {
    console.log('watchhash.changesrc()');
    if (this.isReadMDCustomElement) this.elementVM.changesrc(...args);
  }
}
