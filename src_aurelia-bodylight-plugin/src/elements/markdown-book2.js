import {MarkdownBook} from './markdown-book';
import {bindable, observable} from 'aurelia-framework';

export class MarkdownBook2 extends MarkdownBook {
    @bindable summary;
    @bindable index;
    @bindable base='';
    @bindable params;
    @observable toc = '<p>some toc</p>'
    @bindable model;
    @bindable icon;
    @bindable shownav; //=true;


    constructor() {
      super();
      this.params = 'shownav,1;showtoc,2;showmenu,3;base,4';
      //this.shownav = true;
      this.showtoc = false;
    }

    bind() {
      super.bind();
      if (this.shownav && this.shownav == 'false') this.shownav = false;
      else this.shownav = true;
      //console.log('markdownbook bind shownav', this.shownav);
    }

    attached() {
      console.log('markdown book2 attached() toc', this.toc);
      //super.attached();
      //console.log('markdownbook attached shownav', this.shownav);
    }

    tocChanged(newValue, oldValue) {
      this.mytoc.innerHTML = newValue;
    }

    scrollto(id) {
      let el = document.getElementById(id);
      console.log('markdownbook2 scrollto() id,el', id, el);
      el.scrollIntoView();
      //        document.getElementById(id).scrollIntoView();
    }

    changesrc(...args) {
      //super.changesrc(...args);
      if (args[0]) this.shownav = (args[0] !== 'false');
      if (args['shownav'])this.shownav = (args['shownav'] !== 'false');
      if (args[1]) this.showtoc = (args[1] !== 'false');
      if (args['showtoc'])this.showtoc = (args['showtoc'] !== 'false');
      if (args[2]) this.showmenu = (args[2] !== 'false');
      if (args['showmenu'])this.showmenu = (args['showmenu'] !== 'false');
      //console.log('bdlmarkdownbook changesrc shownav', this.shownav);
    }
}
