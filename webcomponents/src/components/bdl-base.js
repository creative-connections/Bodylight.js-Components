import {bindable} from 'aurelia-templating';

export class BdlBase {
  @bindable href;
  attached() {
    window.bdlBaseHref = this.href; //sets global variable
  }
}
