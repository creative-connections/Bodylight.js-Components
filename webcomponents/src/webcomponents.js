/**
 * Main function for registering Bodylight components as Webcomponents
 *
 * @author Tomas Kulhanek <https://github.com/TomasKulhanek>
 * @since v2.0
 */

//import 'core-js/stable';
//import 'regenerator-runtime/runtime';
import { CustomElementRegistry } from 'aurelia-web-components';
import {PLATFORM} from 'aurelia-pal';
import * as environment from '../config/environment.json';
//import {BdlAudioOnDecreaseCustomElement} from './components/bdl-audio-on-decrease';

export function configure(aurelia) {
  aurelia.use
    .basicConfiguration()
  //.plugin(PLATFORM.moduleName('aurelia-html-import-template-loader'))
    .plugin(PLATFORM.moduleName('aurelia-history-browser'))
    .plugin(PLATFORM.moduleName('aurelia-templating-resources'))
    .plugin(PLATFORM.moduleName('aurelia-templating-router'))
    .plugin(PLATFORM.moduleName('aurelia-dynamic-html'))
    .feature(PLATFORM.moduleName('resources/index'))
    //use this routine to register component as web component
    .globalResources(PLATFORM.moduleName('components/range.html'))
    .globalResources(PLATFORM.moduleName('components/receptacle.html'))
    .globalResources(PLATFORM.moduleName('components/bind2previous'))
    .globalResources(PLATFORM.moduleName('components/dygraphchart'))
    .globalResources(PLATFORM.moduleName('components/beaker.html'))
    .globalResources(PLATFORM.moduleName('components/value'))
    .globalResources(PLATFORM.moduleName('components/composite/beakercontrols.html'))
    .globalResources(PLATFORM.moduleName('components/composite/markdown'))
    .globalResources(PLATFORM.moduleName('components/composite/markdownnav'))
    //.globalResources(PLATFORM.moduleName('components/composite/markdownaurelia')) //do not register mdaurelia is for internal au use with dynamic html
    .globalResources(PLATFORM.moduleName('components/composite/simplegif'))
    .globalResources(PLATFORM.moduleName('components/physiology/capillary.html'))
    .globalResources(PLATFORM.moduleName('components/chartjs'))
    .globalResources(PLATFORM.moduleName('components/physiology/cardiaccycle1.html'))
    .globalResources(PLATFORM.moduleName('components/physiology/animatedheart'))
    .globalResources(PLATFORM.moduleName('components/quiz.html'))
    .globalResources(PLATFORM.moduleName('components/bdl-audio-on-increase'))
    .globalResources(PLATFORM.moduleName('components/bdl-audio-on-decrease'))
    .globalResources(PLATFORM.moduleName('components/bdl-sound-on-increase'))
    .globalResources(PLATFORM.moduleName('components/composite/bdl-markdown-book'))
    .globalResources(PLATFORM.moduleName('components/composite/bdl-markdown-app.html'))
    
    //.globalResources(BdlAudioOnDecreaseCustomElement)
    .globalResources(PLATFORM.moduleName('components/fmi'));


  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');
  // here define start and register prefix bdl-
  aurelia.start().then(() => {
    const registry = aurelia.container.get(CustomElementRegistry);
    registry.fallbackPrefix = 'bdl-';
    registry.useGlobalElements();
  });
}
