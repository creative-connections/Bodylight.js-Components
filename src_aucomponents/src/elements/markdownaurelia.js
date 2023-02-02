import Markdownit from 'markdown-it';
//import Markdownitfootnote from 'markdown-it-footnote'; //footnote in MD
import {bodylightFootnotePlugin} from './markdown-it-bfootnote';
//import MarkdownitAttrs from 'markdown-it-attrs'; //replaced by regex in btoc - will parse ## 2. title 2
//import mk from '@liradb2000/markdown-it-katex'; //math in md, iktakahiro version seems to be most updated - works with latest katex
import mk from 'markdown-it-katexx'; //math in md, iktakahiro version seems to be most updated - works with latest katex
import hljs from 'highlight.js'; //highlights in MD source blocks
import mka from 'markdown-it-abbr';
import {markdownitbtoc} from './markdown-it-btoc';
import {bindable, inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {EventAggregator} from 'aurelia-event-aggregator';
import {I18N} from 'aurelia-i18n';
import {ContentUpdate} from './messages';

const REGISTEREVENTTIMEOUT = 1000; //timout to sent register event for subsequent fmu to bind to inputs
/**
 * This is markdownaurelia component to be used in aurelia apps,
 * requires aurelia-dynamic-html plugin to be enabled,
 * in case of using as web-component, use mardkdown which inherits majority
 */
@inject(I18N, HttpClient, EventAggregator )
export class Markdownaurelia {
  @bindable src;
  @bindable watchhash;
  @bindable base='';
  @bindable fromid;
  @bindable toc;
  @bindable content;
  previoussrc='';
  constructor(i18n, httpclient, ea) {
    //this.i18n = i18n;
    this.client = httpclient;
    this.html = '';
    this.toc = '';
    this.ea = ea;
    this.i18n = i18n;
    //console.log('bdlmarkdownaurelia eventaggregator:', ea);
    //option function to be called when customevent retrieved
    this.handleContentChange = e => {
      this.updateContent(e.detail.content,e.detail.keepanimation);
    };
  }

  bind() {
    //console.log('markdownaurelia bind() src', this.src);
    if (this.base && this.base.length > 0) window.bdlBaseHref = this.base; // define bdlbasehref only if not empty string
    if (this.src && this.src.length > 0 && this.md) this.readmd();
  }

  srcChanged() {
    //console.log('markdownaurelia srcChanged() src', this.src);
    if (this.src && this.src.length > 0 && this.md) this.readmd();
  }


  attached() {
    //console.log('bdlmarkdownaurelia attached() src:', this.src);
    // eslint-disable-next-line new-cap
    //optionally, register customevent handler for 'contentupdate' when fromid is defined
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
            // eslint-disable-next-line no-empty
          } catch (__) {}
        }

        return ''; // use external default escaping
      }
    }).use(bodylightFootnotePlugin) //footnote - extension to MD - otherwise no link between [^1] and [^1]:
      //.use(MarkdownitAttrs)
      .use(mk, {'throwOnError': true, 'errorColor': ' #cc0000'}) //math-> katex - should be faster than mathjax and crossbrowser compatible when chrom do not support mathml
      .use(mka)
      //.use(markdownItAnchor, { permalink: true, permalinkBefore: true, permalinkSymbol: '§' } )
      //.use(markdownItTocDoneRight);
      .use(markdownitbtoc);
    if (this.i18n.getLocale() === 'cs') {
      console.log('czech version');
    } else {
      console.log('english version');
    }
    if (this.src && this.src.length > 0 && this.md) this.readmd();
    //console.log('bdlmarkdownaurelia eventaggregator2:', this.ea);
    //there seems some bug in ea dependency injection - checking subscribe as function or inner ea object
    //if (typeof this.ea.subscribe === 'function')
    this.ea.subscribe(ContentUpdate, msg => this.updateContent(msg.content));
    //else if (typeof this.ea.ea === 'object')
    //      this.ea.ea.subscribe(ContentUpdate, msg => this.updateContent(msg.content));
    if (this.fromid) {document.getElementById(this.fromid).addEventListener('contentupdate', this.handleContentChange);}

  }

  changesrc(...args) { //first is src, second is base
    console.log('mardownaurelia.changesrc called(), args:', args);
    if (args[1]) this.base = args[1];
    if (args[0] && args[0].length > 0) this.src = args[0];
    this.readmd();
  }

  readmd() {
    //fetch md source from src attribute
    //relative url - set with base
    console.log('bdlmarkdownaurelia readmemd(), src:', this.src);
    if (! this.src || (this.previoussrc === this.src)) return;
    this.previoussrc = this.src;
    let url = (this.src.startsWith('http')) ? this.src : this.base + this.src;
    this.client.fetch(url)
      .then(response => response.text())
      .then(data => {
        //console.log('markdownaurelia fetched md:', data)
        this.text = data;
        //convert from md to html
        this.html = this.md.render(this.text);
        let tocregex = /<div[^<>]*id="toc"[^<>]*>(.*?)<\/div>/g;
        this.toc = this.md.render('@[toc] \n' + this.text).match(tocregex)[0];
        //console.log('readmd toc:', this.toc);
        this.update();
      });
  }

  detached() {
    window.removeEventListener('hashchange', this.handleContentChange);
  }

  update() {
    //console.log('markdownaurelia update');
    //if (this.mj)this.mj.typesetPromise();
    //if (window.MathJax) window.MathJax.typeset();
    //scroll to top of the page
    window.scrollTo(0, 0);
    //send fmiregister event for possible shared fmi component to bind to input components
    setTimeout(() => {
      let event = new CustomEvent('fmiregister');
      document.dispatchEvent(event);
    },REGISTEREVENTTIMEOUT);

  }

  updateContent(content, keepanimation = false) {
    //console.log('markdownaurelia updatecontent:', content);
    //fix remove older animation objects
    if (!keepanimation && window.ani) {
      window.ani.detached();
      //window.ani.destroyAdobe();
      window.animatebindings = [];
    }
    //fix remove global binding
    //continue with rendering
    this.text = content;
    this.html = this.md.render(this.text);
    this.update();
  }

  contentChanged(newvalue, oldvalue) {
    //console.log('markdown2 update called by OOP polymorphism mydiv, html', this.mydiv, this.html);
    this.updateContent(newvalue);
  }
}
