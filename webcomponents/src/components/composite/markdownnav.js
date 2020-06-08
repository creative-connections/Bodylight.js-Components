import Markdownit from 'markdown-it';
import MarkdownItForInline from 'markdown-it-for-inline';
import {bindable, inject} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';
import {HttpClient} from 'aurelia-fetch-client';

@inject(I18N, HttpClient)
export class Markdownnav {
  @bindable src;
  @bindable navstyle;
  @bindable base='';

  constructor(i18n, httpclient) {
    this.i18n = i18n;
    this.client = httpclient;
    this.html = '';
    this.navclass = '';
    this.links = [];
    this.currentlink = 'N/A';
  }

  attached() {
    window.markdownnav = this;
    let iterator = MarkdownItForInline;
    this.mdtoc = Markdownit({html: true})
      .use(iterator, 'url', 'link_open', function(tokens, idx) {
        let aIndex = tokens[idx].attrIndex('href');
        if (aIndex < 0) {
          //tokens[idx].attrPush(['target', '_blank']);
          //no href
        } else {
          let link = tokens[idx].attrs[aIndex][1];
          window.markdownnav.links.push(link);
        }
      });
    this.navclass = (this.navstyle && this.navstyle.length > 0) ? this.navstyle : 'horizontal';
    //adds rule to add a class to li item
    this.mdtoc.renderer.rules.list_item_open = function(tokens, idx, options, env, slf) { return '<li class="navitem">'; };
    //fetch md source from src attribute
    this.fetchMDSrc();
  }

  fetchMDSrc() {
    let url = (this.src.startsWith('http')) ? this.src : this.base + this.src;
    console.log('fetchmd src:',this.src);
    this.client.fetch(url)
      .then(response => response.text())
      .then(data => {
        //console.log('fetched md:', data)
        this.text = data;
        //convert from md to html
        this.links = [];
        this.html = this.mdtoc.render(this.text);
        console.log('markdownnow fetchmd src links:', this.links);
        this.update();
      });
  }

  update() {
    this.mynav.innerHTML = this.html;
  }

  changesrc(...args) {
    console.log('markdownnav.changesrc() args:', args);
    if (args[1]) this.base = args[1];
    this.src = args[0];
    this.fetchMDSrc();
  }

}
