import {bindable} from 'aurelia-templating';

export class Base {
  @bindable href;
  attached() {
    window.bdlBaseHref = this.href; //sets global variable
  }
}
