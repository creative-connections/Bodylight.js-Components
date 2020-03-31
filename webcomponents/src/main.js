// regenerator-runtime is to support async/await syntax in ESNext.
// If you don't use async/await, you can remove regenerator-runtime.
import 'regenerator-runtime/runtime';
//import 'bootstrap';
import {I18N, TCustomAttribute} from 'aurelia-i18n';
import Backend from 'i18next-xhr-backend';
//import environment from './environment';
import {PLATFORM} from 'aurelia-pal';
import resBundle from 'i18next-resource-store-loader!./locales/index.js';
import * as environment from '../config/environment.json';
import { CustomElementRegistry } from 'aurelia-web-components';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'))
    .plugin(PLATFORM.moduleName('aurelia-animator-css'))

    .plugin(PLATFORM.moduleName('aurelia-dynamic-html'))
    .plugin(PLATFORM.moduleName('aurelia-i18n'), (instance) => {
      let aliases = ['t', 'i18n'];
      TCustomAttribute.configureAliases(aliases);
      instance.i18next.use(Backend);
      return instance.setup({
        resources: resBundle, //<-- configure aurelia-i18n to use your bundled translations
        backend: {
          loadPath: 'locales/{{lng}}/{{ns}}.json'
        },
        attributes: aliases,
        lng: 'cs',
        fallbackLng: 'en',
        debug: true,

        skipTranslationOnMissingKey: true
      });
    })

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');
  //aurelia.use.developmentLogging('debug');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  //if the css animator is enabled, add swap-order="after" to all router-view elements

  //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-html-import-template-loader'));

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
  //include webcomponents js to bundle them in bodylight.bundle.js
  PLATFORM.moduleName('webcomponents');
}
