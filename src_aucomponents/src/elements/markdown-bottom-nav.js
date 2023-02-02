//import {Markdownnav} from './markdownnav';
import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {parseHashParamString} from '../attributes/utils';
//import {WatchHashCore} from "../attributes/watch-hash-core";

@inject(EventAggregator)
export class MarkdownBottomNav {
    @bindable src;
    @bindable navstyle;
    @bindable base='';
    @bindable index='index.md';
    notinitread=true;
    previoustitle='';//Introduction';
    nexttitle='';//Hemodynamics in Left Ventricle'
    @bindable content;

    constructor(ea) {
      this.ea = ea;
      //super(i18n, httpclient);
    }

    attached() {
      this.ea.subscribe('navchange', navstruct => this.updatenav(navstruct));
      this.ea.subscribe('hashchange', hashstruct => this.changesrc(hashstruct));
    }

    bind() {
      //this.params = 'index,0';
      //        super.bind();
    }

    update() {

    }
    next() {
      console.log('markdown bottom nav next');
    }
    previous() {
      console.log('markdown bottom nav previous');
    }

    updatenav(navstruct) {
      this.links = navstruct.links;
      this.changesrc(parseHashParamString(window.location.hash));
      //console.log('top nav links:', this.links);
    }

    changesrc(args) {
      console.log('markdown-bottom-nav changesrc args:', args);
      //console.log('markdown-bottom-nav links:', this.links);
      //parse global window.markdownnav.links to get prev and next title
      //let prevtitle = '';
      if (window.markdownnav) {
        let currentlink = '#' + (args[0].length > 0 ? args[0] : this.index);
        let currentlinkindex = window.markdownnav.links.findIndex(x => x.url === currentlink);
        this.nexttitle = currentlinkindex > 0 ? window.markdownnav.links[currentlinkindex - 1].title : '';
        this.nextlink = currentlinkindex > 0 ? window.markdownnav.links[currentlinkindex - 1].url : '';
        this.previoustitle = currentlinkindex < (window.markdownnav.links.length - 1) ? window.markdownnav.links[currentlinkindex + 1].title : '';
        this.previouslink = currentlinkindex < (window.markdownnav.links.length - 1) ? window.markdownnav.links[currentlinkindex + 1].url : '';
      }
    }
    contentChanged(newv, oldv) {
      console.log('markdown-bottom-na contentchanged', oldv, newv);
      console.log('markdown-bottom-nav links:', window.markdownnav.links);
    }
}
