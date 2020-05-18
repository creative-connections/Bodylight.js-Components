import {bindable} from 'aurelia-framework';
import {WatchHashCore} from './watch-hash-core';

export class BdlMarkdownBook extends WatchHashCore {
  @bindable summary;
  @bindable index;
  @bindable base='';
  @bindable params;
  constructor() {
    super();
  }

  bind() {
    //this.value=this.params;//'index,0;summary,1;shownav,2';
    this.shownav = true;
    super.bind();
  }
  /*attached() {
    this.disablenav = !((this.summary) && ((this.summary.length > 0) && (this.summary !== 'false')));
  }*/
  //is called if the watchhash attribute is used
  changesrc(index, name) {
    /*if (name === 'summary') this.summary = index;
    if (name === 'index') this.index = index;*/
    if (name === 'shownav') this.shownav = (index !== 'false');
  }
}
