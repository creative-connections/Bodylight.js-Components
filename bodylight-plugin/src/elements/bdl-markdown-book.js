import {bindable} from 'aurelia-framework';
import {WatchHashCore} from './watch-hash-core';

export class BdlMarkdownBook extends WatchHashCore {
  @bindable summary;
  @bindable index;
  @bindable base='';
  @bindable params;
  constructor() {
    super();
    this.params = 'showmenu,2;base,3';
  }

  bind() {
    //this.value=this.params;//'index,0;summary,1;shownav,2';
    this.shownav = true;
    this.showmenu = true;
    super.bind();
    this.previoustitle="previous chapter";
    this.previoustitleshort="prev ...";
    this.nexttitle="next chapter";
    this.nexttitleshort="next ...";
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
    console.log('bdlmarkdownbook changesrc', args);
    //TODO - hack - first arg is showmenu
    if (args[0]) this.showmenu = (args[0] !== 'false');
    //console.log('bdlmarkdownbook changesrc shownav', this.shownav);
  }

  openclosenav() {
    this.shownav = ! this.shownav;
  }
}
