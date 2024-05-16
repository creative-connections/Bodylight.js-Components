import {MarkdownBook} from './markdown-book';
import {bindable, observable,inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class MarkdownBook2 extends MarkdownBook {
    @bindable summary;
    @bindable index;
    @bindable base='';
    @bindable params;
    @observable toc = '<p>some toc</p>'
    @bindable model;
    @bindable icon;
    @bindable shownav; //=true;
    expand=false;

    constructor(ea) {
      super();
      this.params = 'shownav,1;showtoc,2;showmenu,3;base,4';
      //this.shownav = true;
      this.showtoc = false;
      this.ea = ea;
    }

    bind() {
      super.bind();
      if (this.shownav && this.shownav == 'false') this.shownav = false;
      else this.shownav = true;
      this.ea.subscribe('expandnav', x => this.expandcollapse() )
      //console.log('markdownbook bind shownav', this.shownav);
    }

    attached() {
      console.log('markdown book2 attached() toc', this.toc);
      //super.attached();
      //console.log('markdownbook attached shownav', this.shownav);
      let myhash = window.location.hash.split('&');
      if (myhash.length>1) this.changesrc(...myhash.slice(1));
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

  expandcollapse() {
    this.expand = ! this.expand;
  }

}
