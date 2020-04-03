import Markdownit from 'markdown-it';

import {bindable, inject} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';
import {HttpClient} from 'aurelia-fetch-client';

@inject(I18N, HttpClient)
export class Markdownnav {
  @bindable src;

  constructor(i18n, httpclient) {
    this.i18n = i18n;
    this.client = httpclient;
    this.html = '';
  }

  attached() {
    this.mdtoc = Markdownit({});
    //adds rule to add a class to li item
    this.mdtoc.renderer.rules.list_item_open= function () { return '<li class="navitem">'; };
    //fetch md source from src attribute
    this.client.fetch(this.src)
      .then(response => response.text())
      .then(data => {
        //console.log('fetched md:', data)
        this.text = data;
        //convert from md to html
        this.html = this.mdtoc.render(this.text);
        this.update();
      });
  }
  update() {
    this.mynav.innerHTML = this.html;
  }
}
