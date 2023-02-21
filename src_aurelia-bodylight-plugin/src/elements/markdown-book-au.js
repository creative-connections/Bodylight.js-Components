import {MarkdownBook} from './markdown-book';
import {bindable} from 'aurelia-framework';

export class MarkdownBookAu extends MarkdownBook {
  @bindable summary;
  @bindable index;
  @bindable base='';
  @bindable params;

  constructor() {
    console.log('bdlmarkdownbookau calling super');
    super();
  }
}
