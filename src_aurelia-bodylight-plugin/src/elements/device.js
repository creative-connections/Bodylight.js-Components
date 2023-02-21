import {bindable} from 'aurelia-framework';

export class Device {
@bindable href;
bind() {
  if (this.href) {
    //register
  }
}
}
