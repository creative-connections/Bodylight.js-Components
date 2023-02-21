import {inject,DOM} from 'aurelia-framework';
//@customAttribute('fmu-index')
@inject(DOM.Element)
export class FmuIndexCustomAttribute {

  constructor(element) {
    this.element = element;
    this.handleValueChange = e => {
      this.elementVM.handleValueChange(e);
    }
    this.handleReset = e => {
      this.elementVM.handleReset(e);
    }
    this.handleFMIAttached = e => {
      //this.elementVM.handleValueChange(e);
      this.fromel = document.getElementById(fromid);
      if (this.fromel) {
        this.fromel.addEventListener('fmidata', this.handleValueChange);
        this.fromel.addEventListener('fmireset', this.handleReset);
      } else {
        console.warn('fmi attached, but no element with id found:',this.fromid);
      }
    }
  }

  bind() {
    let fmureferences = this.value.split(','); //split by ,
    this.fromid = fmureferences[0];
    let findex = fmureferences[1];

    this.fromel = document.getElementById(fromid);
    if (this.fromel) {
      this.fromel.addEventListener('fmidata', this.handleValueChange);
      this.fromel.addEventListener('fmireset', this.handleReset);
    } else {
      console.warn('chartjs, null fromid element, waiting to be attached');
      document.addEventListener('fmiattached',this.handleFMIAttached);
    }

    if (this.element && this.element.au && this.element.au.controller && typeof (this.element.au.controller) === 'object' && this.element.au.controller.viewModel && typeof (this.element.au.controller.viewModel) === 'object') {
        this.elementVM = this.element.au.controller.viewModel;
        //check whether this.elementVM has changesrc function - to be called in event listener
        //this.isReadMDCustomElement = (typeof this.elementVM.changesrc === 'function');
    } else {console.warn('element viewmodel object doesnot exists, cant be called by handleXXX methods')}
  }

  unbind() {
    if (this.fromel) {
      this.fromel.removeEventListener('fmidata', this.handleValueChange);
      this.fromel.removeEventListener('fmireset',this.handleReset);
      this.fromel.removeEventListener('fmiattached', this.handleFMIAttached);
    }
  }

  valueChanged(newValue,oldValue) { }

}
