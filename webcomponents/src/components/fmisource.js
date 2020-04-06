import {bindable} from 'aurelia-framework';

export class Fmisource {
  @bindable src;

  constructor() {

  }

  bind() {
    //load JS specified in SRC
    console.log('fmi source bind src:', this.src);
    if (this.src) {
      //var js = ["scripts/jquery.dimensions.js", "scripts/shadedborder.js", "scripts/jqmodal.js", "scripts/main.js"];
      //for (var i = 0, l = js.length; i < l; i++) {
      document.getElementsByTagName('head')[0].innerHTML += ('<script src="' + this.src + '"></scr' + 'ipt>');
      //}
    }
  }
}
