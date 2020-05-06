import Markdownit from 'markdown-it';
import Markdownitfootnote from 'markdown-it-footnote'; //footnote in MD
import mk from '@traptitech/markdown-it-katex'; //math in md, iktakahiro version seems to be most updated - works with latest katex
//import mk from '@iktakahiro/markdown-it-katex'; //math in md, iktakahiro version seems to be most updated - works with latest katex
import hljs from 'highlight.js'; //highlights in MD source blocks
//npm install markdown-it-toc-done-right markdown-it-anchor
//import markdownitTocDoneRight from 'markdown-it-toc-done-right'; //TOC on top of the page
//import markdownitAnchor from 'markdown-it-anchor'; //MD anchors
import {parseHashParamString} from '../utils';
import {I18N} from 'aurelia-i18n';
import {bindable, inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(I18N, HttpClient)
export class Markdownaurelia {
  @bindable src;
  @bindable watchhash;

  constructor(i18n, httpclient) {
    this.i18n = i18n;
    this.client = httpclient;
    this.html = '';

    //event listener function needs to be declared this way - they have access to 'this'
    /*this.handleHashChange = e => {
      console.log('handleHashChange');
      let params = parseHashParamString(window.location.hash);
      let index = params['index'] ? params['index'] : params[0];//either get index param or first param
      if (index) {
        this.src = index;
        this.readmd();
      }
    };*/
  }

  attached() {
    //console.log('makdownit attached hljs:', hljs);
    // eslint-disable-next-line new-cap
    this.md = Markdownit({
      html: true, //enable html tags - this enables also custom elements of components/webcomponents
      linkify: true,
      typographer: false,
      highlight: function(str, lang) { //highlight plugin
        if (lang && hljs.getLanguage(lang)) {
          try {
            return '<pre class="hljs"><code>' +
              hljs.highlight(lang, str, true).value +
              '</code></pre>';
          } catch (__) {}
        }

        return ''; // use external default escaping
      }
    }).use(Markdownitfootnote) //footnote - extension to MD - otherwise no link between [^1] and [^1]:
      .use(mk, {'throwOnError': true, 'errorColor': ' #cc0000'}); //math-> katex - should be faster than mathjax and crossbrowser compatible when chrom do not support mathml
    //TODO make local TOC configurable
    //  .use( markdownitAnchor, { permalink: true, permalinkBefore: true, permalinkSymbol: '§' } )
    //  .use( markdownitTocDoneRight, {itemClass: 'nav-item', listType: 'ul'} );

    //if (this.i18n.getLocale() === 'cs') { //czech version} else {//english version}
    /*if (this.watchhash) {
      this.handleHashChange(null);
      window.addEventListener('hashchange', this.handleHashChange);
    }*/
    this.readmd();
  }

  changesrc(src) {
    this.src = src;
    this.readmd();
  }

  readmd() {
    //fetch md source from src attribute
    this.client.fetch(this.src)
      .then(response => response.text())
      .then(data => {
        //console.log('fetched md:', data)
        this.text = data;
        //convert from md to html
        this.html = this.md.render(this.text);
        this.update();
      });
  }

  detached() {
    window.removeEventListener('hashchange', this.handleHashChange);
  }

  update() {
    console.log('markdownaurelia update');
    //if (this.mj)this.mj.typesetPromise();
    //if (window.MathJax) window.MathJax.typeset();
  }
}
