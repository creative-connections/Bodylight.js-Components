import Markdownit from 'markdown-it';
import Markdownitfootnote from 'markdown-it-footnote';
import hljs from 'highlightjs';
import {I18N} from 'aurelia-i18n';
import {bindable, inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(I18N, HttpClient)
export class Markdownaurelia {
  @bindable src;

  constructor(i18n, httpclient) {
    this.i18n = i18n;
    this.client = httpclient;
    this.html = '';
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
    }).use(Markdownitfootnote); //footnote - extension to MD - otherwise no link between [^1] and [^1]:
    //if (this.i18n.getLocale() === 'cs') { //czech version} else {//english version}
    //fetch md source from src attribute
    this.client.fetch(this.src)
      .then(response => response.text())
      .then(data => {
        console.log('fetched md:', data)
        this.text = data;
        //convert from md to html
        this.html = this.md.render(this.text);
        this.update();
      });
  }
  update() {}
}
