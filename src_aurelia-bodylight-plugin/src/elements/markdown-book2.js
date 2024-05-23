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
    @bindable type;    
    expand=false;
    sidebarclass='bdl-sidebar bdl-narrowbar'
    defaultclass='bdl-sidebar bdl-narrow'
    narrowclass='bdl-sidebar bdl-narrow'
    wideclass='bdl-sidebar bdl-wide'
    fixednclass='bdl-sidebar bdl-narrowbar'
    fixedwclass='bdl-sidebar bdl-widebar'

    constructor(ea) {
      super();
      this.params = 'shownav,1;showtoc,2;showmenu,3;base,4';
      //this.shownav = true;
      this.showtoc = false;
      this.ea = ea;
    }

    bind() {
      super.bind();
      if (this.type && this.type.startsWith('on.')) {
        this.expand = true;
        this.type = this.type.substring(3)
      }
      if (this.type && this.type.startsWith('results.')) {
        window.bdlshowresults = true;
        this.type = this.type.substring(8)
      }
      switch (this.type) {
        case 'narrow':
          this.sidebarclass = this.narrowclass;
          break;
        case 'wide':
          this.sidebarclass = this.wideclass;
          break;
        case 'narrowbar':
          this.sidebarclass = this.fixednclass;
          break;
        case 'widebar':
          this.sidebarclass = this.fixedwclass;
          break;
        default:
          // Optionally handle unknown types
          break;
      }

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
