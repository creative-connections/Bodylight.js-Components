//import Mathjax from 'mathjax';
import {I18N} from 'aurelia-i18n';
import {bindable, inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Markdownaurelia} from './markdownaurelia';
//import Mathjax from "mathjax";

/**
 * Enables markdown for web components - instead of updating dynamic html, updates directly the innerHTML
 * Inherits MD rendering from markdownaurelia component
 */

@inject(I18N, HttpClient)
export class Markdown extends Markdownaurelia {
  @bindable src;
  @bindable watchhash;
  @bindable base ='';
  constructor(i18n, httpclient) {
    super(i18n, httpclient);
  }

  update() {
    //console.log('markdown2 update called by OOP polymorphism mydiv, html', this.mydiv,this.html);
    this.mydiv.innerHTML = this.html;
    super.update();
  }

  changesrc(...args) {
    super.changesrc(...args);
  }
}
