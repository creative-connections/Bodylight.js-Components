/**
 * Main function for registering Bodylight components as Webcomponents
 *
 * @author Tomas Kulhanek <https://github.com/TomasKulhanek>
 * @since v2.0
 */
import { CustomElementRegistry } from 'aurelia-web-components';
import {PLATFORM} from 'aurelia-pal';
import * as environment from '../config/environment.json';

export function configure(aurelia) {
  aurelia.use
    .basicConfiguration()
  //.plugin(PLATFORM.moduleName('aurelia-html-import-template-loader'))
    .plugin(PLATFORM.moduleName('aurelia-history-browser'))
    .plugin(PLATFORM.moduleName('aurelia-templating-resources'))
    .plugin(PLATFORM.moduleName('aurelia-templating-router'))
    .plugin(PLATFORM.moduleName('aurelia-dynamic-html'))
    .plugin(PLATFORM.moduleName('bodylight-aurelia-plugin'))
    .feature(PLATFORM.moduleName('resources/index'))
    //use this routine to register component as web component
    .globalResources([
    PLATFORM.moduleName('bodylight-aurelia-plugin/elements/bdl-range.html'),

    PLATFORM.moduleName('bodylight-aurelia-plugin/elements/bdl-receptacle.html'),
    PLATFORM.moduleName('bodylight-aurelia-plugin/elements/bdl-bind2previous'),
    PLATFORM.moduleName('bodylight-aurelia-plugin/elements/bdl-dygraphchart'),
    PLATFORM.moduleName('bodylight-aurelia-plugin/elements/bdl-beaker.html'),
    PLATFORM.moduleName('bodylight-aurelia-plugin/elements/bdl-value'),
    PLATFORM.moduleName('bodylight-aurelia-plugin/elements/bdl-beakercontrols.html'),
    PLATFORM.moduleName('bodylight-aurelia-plugin/elements/bdl-markdown'),
    PLATFORM.moduleName('bodylight-aurelia-plugin/elements/bdl-markdownnav'),
    //.globalResources(PLATFORM.moduleName('components/composite/markdownaurelia')) //do not register mdaurelia is for internal au use with dynamic html
    PLATFORM.moduleName('bodylight-aurelia-plugin/elements/bdl-simplegif'),
    PLATFORM.moduleName('bodylight-aurelia-plugin/elements/bdl-capillary.html'),
    PLATFORM.moduleName('bodylight-aurelia-plugin/elements/bdl-ecg'),
    PLATFORM.moduleName('bodylight-aurelia-plugin/elements/bdl-chartjs'),
    PLATFORM.moduleName('bodylight-aurelia-plugin/elements/bdl-chartjs-time'),
    PLATFORM.moduleName('bodylight-aurelia-plugin/elements/bdl-chartjs-xy'),
    PLATFORM.moduleName('bodylight-aurelia-plugin/elements/bdl-cardiaccycle.html'),
    PLATFORM.moduleName('bodylight-aurelia-plugin/elements/bdl-animate-gif'),
    PLATFORM.moduleName('bodylight-aurelia-plugin/elements/bdl-animate-sync-gif'),
    PLATFORM.moduleName('bodylight-aurelia-plugin/elements/bdl-animate-control'),
    PLATFORM.moduleName('bodylight-aurelia-plugin/elements/bdl-quiz'),
    PLATFORM.moduleName('bodylight-aurelia-plugin/elements/bdl-audio-on-increase'),
    PLATFORM.moduleName('bodylight-aurelia-plugin/elements/bdl-audio-on-decrease'),
    PLATFORM.moduleName('bodylight-aurelia-plugin/elements/bdl-sound-on-increase'),
    PLATFORM.moduleName('bodylight-aurelia-plugin/elements/bdl-markdown-book'),
    PLATFORM.moduleName('bodylight-aurelia-plugin/elements/bdl-markdown-book-au'),
    PLATFORM.moduleName('bodylight-aurelia-plugin/elements/bdl-markdown-app.html'),
    //.globalResources(BdlAudioOnDecreaseCustomElement)
    PLATFORM.moduleName('bodylight-aurelia-plugin/elements/bdl-fmi')

  ]);

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');
  // here define start and register prefix bdl-
  aurelia.start().then(() => {
    const registry = aurelia.container.get(CustomElementRegistry);
    registry.fallbackPrefix = 'bdl-';
    registry.useGlobalElements();
  });
}
