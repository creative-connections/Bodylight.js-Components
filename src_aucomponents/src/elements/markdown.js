//import Mathjax from 'mathjax';
import {I18N} from 'aurelia-i18n';
import {bindable, inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Markdownaurelia} from './markdownaurelia';
import {EventAggregator} from 'aurelia-event-aggregator';
//import Mathjax from "mathjax";

/**
 * Enables markdown for web components - instead of updating dynamic html, updates directly the innerHTML
 * Inherits MD rendering from markdownaurelia component
 */

@inject(I18N, HttpClient, EventAggregator)
export class Markdown extends Markdownaurelia {
  @bindable src;
  @bindable watchhash;
  @bindable base='';
  @bindable fromid;
  @bindable toc;
  @bindable content;

  constructor(i18n, httpclient, ea) {
    super(i18n, httpclient, ea);
  }

  bind() {
    //console.log('bdlmarkdown bind() src:', this.src);
    super.bind();
  }

  attached() {
    super.attached();
    //console.log('bdlmarkdown attached() src:', this.src);
  }

  update() {
    //console.log('markdown2 update called by OOP polymorphism mydiv, html', this.mydiv, this.html);
    this.mydiv.innerHTML = this.html;
    super.update();
  }

  changesrc(...args) {
    //console.log('bdlmarkdown changesrc:', args);
    super.changesrc(...args);
  }
}
