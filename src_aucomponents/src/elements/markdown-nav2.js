import {bindable, inject} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';
import {HttpClient} from 'aurelia-fetch-client';
import {Markdownnav} from './markdownnav';
import {EventAggregator} from 'aurelia-event-aggregator';
import {useView} from 'aurelia-templating';

@inject(I18N, HttpClient, EventAggregator)
@useView('./markdownnav.html')
export class MarkdownNav2 extends Markdownnav {
    @bindable src;
    @bindable navstyle;
    @bindable base='';
    notinitread=true;

    constructor(i18n, httpclient, ea) {
      super(i18n, httpclient, ea);
    }
}
