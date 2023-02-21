import {bindable} from 'aurelia-framework';
import {WatchHashCore} from '../attributes/watch-hash-core';

export class MarkdownBook extends WatchHashCore {
  @bindable summary;
  @bindable index;
  @bindable base='';
  @bindable params;

  constructor() {
    super();
    this.params = 'shownav,2;showmenu,3;base,4';
    this.shownav = true;
    this.showmenu = true;
  }

  bind() {
    //this.value=this.params;//'index,0;summary,1;shownav,2';
    console.log('bdlmarkdownbook index:', this.index, 'summary:', this.summary);
    super.bind();
    this.previoustitle = 'previous chapter';
    this.previoustitleshort = 'prev ...';
    this.nexttitle = 'next chapter';
    this.nexttitleshort = 'next ...';
  }
  /*attached() {
    this.disablenav = !((this.summary) && ((this.summary.length > 0) && (this.summary !== 'false')));
  }*/

  //is called if the watchhash attribute is used
  changesrc(...args) {
    /*if (name === 'summary') this.summary = index;
    if (name === 'index') this.index = index;*/
    //if (name === 'shownav') this.shownav = (index !== 'false');
    //if (name === 'base') this.base = index;
    console.log('bdlmarkdownbook changesrc called, args:', args);
    //TODO - hack - first arg is showmenu
    if (args[0]) this.shownav = (args[0] !== 'false');
    if (args['shownav'])this.shownav = (args['shownav'] !== 'false');
    if (args[1]) this.showmenu = (args[1] !== 'false');
    if (args['showmenu'])this.showmenu = (args['showmenu'] !== 'false');
    //console.log('bdlmarkdownbook changesrc shownav', this.shownav);
  }

  openclosenav() {
    this.shownav = ! this.shownav;
  }
}
