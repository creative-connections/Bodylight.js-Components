import {inject,DOM} from 'aurelia-framework';
//@customAttribute('fmu-index')
@inject(DOM.Element)
export class GradualinputCustomAttribute {
  value;

  constructor(element) {
    this.element = element;
  }

  bind(){
    let options = this.value.split(',');
    this.numsteps = options[0];
    this.timeinterval = options[1];
  }


}
