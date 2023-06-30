//import {Markdownnav} from './markdownnav';
import {bindable, inject} from 'aurelia-framework';
//import {I18N} from 'aurelia-i18n';
//import {HttpClient} from 'aurelia-fetch-client';
import {EventAggregator} from 'aurelia-event-aggregator';
import {parseHashParamString} from '../attributes/utils';

//@inject(I18N, HttpClient)
@inject(EventAggregator)
export class MarkdownTopNav {
    @bindable src;
    @bindable navstyle;
    @bindable base='';
    @bindable nav=false;
    @bindable index;
    @bindable toc=false;
    notinitread=true;
    previoustitle='';//Introduction';
    nexttitle='';//Hemodynamics in Left Ventricle'
    navtitle='';//Hemodynamics in Left Atria';
    currentlink='';
    

    constructor(ea) {
      //super(i18n, httpclient);
      this.ea = ea;
    }

    attached() {
      this.ea.subscribe('navchange', navstruct => this.updatenav(navstruct));
      this.ea.subscribe('hashchange', hashstruct => this.updatetitles(hashstruct));
    }

    updatenav(navstruct) {
      this.links = navstruct.links;
      this.updatetitles(parseHashParamString(window.location.hash));
      console.log('top nav links:', this.links);
    }

  /**
   * Update titles, opens parent nav if it is not opened
   * @param hashstruct
   */
  updatetitles(hashstruct) {
      //this.currentlink
      console.log('top nav hash:', hashstruct);
      if (window.markdownnav) {
        let currentlink = '#' + (hashstruct[0].length > 0 ? hashstruct[0] : this.index);
        let currentlinkindex = window.markdownnav.links.findIndex(x => x.url === currentlink);
        this.navtitle = (currentlinkindex > 0) && (currentlinkindex < window.markdownnav.links.length)
          ? window.markdownnav.links[currentlinkindex].title
          : '';
        //erase activenavitem class
        let activenavitems = window.document.getElementsByClassName('activenavitem');
        for (let item of activenavitems) { item.classList.remove('activenavitem'); }
        //make current link as class activenavitem
        let currentnavitem = window.document.getElementById(currentlink);
        if (currentnavitem) {
          //set class - so it will have different color
          currentnavitem.firstChild.classList.add('activenavitem');
          //show children ul if hidden
          if (currentnavitem.lastChild.className === 'w3-hide') {
            if (window.bodylightnavopenhide) window.bodylightnavopenhide(currentnavitem.lastChild.previousSibling);
          }
          //show parent ul if hidden
          if (currentnavitem.parentNode.className === 'w3-hide') {
            //do open parent as defined in markdownnav
            if (window.bodylightnavopenhide) window.bodylightnavopenhide(currentnavitem.parentNode.previousSibling);
          } else {
            //do open parent of parent
            if (currentnavitem.parentNode.parentNode && currentnavitem.parentNode.parentNode.className === 'w3-hide') {
              if (window.bodylightnavopenhide) window.bodylightnavopenhide(currentnavitem.parentNode.parentNode.previousSibling);
            } else {
              //do open parent of parent of parent
              if (currentnavitem.parentNode.parentNode && currentnavitem.parentNode.parentNode.parentNode && currentnavitem.parentNode.parentNode.parentNode.className === 'w3-hide')
                if (window.bodylightnavopenhide) window.bodylightnavopenhide(currentnavitem.parentNode.parentNode.parentNode.previousSibling);
            }
          }
        }
      }
    }

    showhidefull() {
      this.nav = ! this.nav;
      if (! this.nav) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
          document.documentElement.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
          document.webkitExitFullscreen();
        }
      }
    }

  showhidenav() {
    this.nav = ! this.nav;
  }

  showhidetoc() {
    this.toc = ! this.toc;
  }

  changesrc(...args) {
      console.log('markdown-top-nav changesrc args:', args);
      //console.log('markdown-bottom-nav links:', this.links);
      //parse global window.markdownnav.links to get prev and next title
      if (window.markdownnav) {
        let currentlink = '#' + (args[0].length > 0 ? args[0] : this.index);
        let currentlinkindex = window.markdownnav.links.findIndex(x => x.url === currentlink);
        this.navtitle = (currentlinkindex > 0) && (currentlinkindex < window.markdownnav.links.length)
          ? window.markdownnav.links[currentlinkindex].title
          : '';
      }
  }
}
