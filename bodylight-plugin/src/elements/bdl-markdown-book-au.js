import {BdlMarkdownBook} from "./bdl-markdown-book";
import {bindable} from "aurelia-framework";

export class BdlMarkdownBookAu extends BdlMarkdownBook {
  @bindable summary;
  @bindable index;
  @bindable base='';
  @bindable params;

  constructor() {
    super();
  }

}
