import {Converter} from 'showdown';
import {I18N} from 'aurelia-i18n';
import {bindable, inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(I18N, HttpClient)
export class Markdown {
  @bindable src;

  constructor(i18n, httpclient) {
    this.i18n = i18n;
    this.client = httpclient;
    this.html = '';
  }

  attached() {
    this.converted = new Converter();
    //if (this.i18n.getLocale() === 'cs') { //czech version} else {//english version}
    //fetch md source from src attribute
    this.client.fetch(this.src)
      .then(response => response.text())
      .then(data => {
        this.text = data;
        //convert from md to html
        this.html = this.converted.makeHtml(this.text);
      });
  }
}
