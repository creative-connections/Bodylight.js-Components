import * as environment from '../config/environment.json';
import { CustomElementRegistry } from 'aurelia-web-components';
import {PLATFORM} from 'aurelia-pal';

import { I18N,TCustomAttribute } from 'aurelia-i18n';
import Backend from 'i18next-xhr-backend';

export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        //all components from src (resources/index) will be registered as web component
        .plugin(PLATFORM.moduleName('aurelia-bodylight-plugin'))
        .plugin(PLATFORM.moduleName('aurelia-resize'))
        .plugin(PLATFORM.moduleName('aurelia-i18n'),(instance) =>{
            let aliases = ['t','i18n'];
            TCustomAttribute.configureAliases(aliases);
            instance.i18next.use(Backend);
            return instance.setup({
              //resources: resBundle, locales/{en|cz}/translation.json
              backend:{
                loadPath: 'locales/{{lng}}/{{ns}}.json'
              },
              attributes: aliases,
              lng: 'en',
              fallbackLng: 'en',
              debug:true,
              skipTranslationOnMissingKey: true
            })
          })
    aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');
    if (environment.testing) {
        aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
    }
    // here define start and register prefix bdl-
    aurelia.start().then(() => {
        const registry = aurelia.container.get(CustomElementRegistry);
        registry.fallbackPrefix = 'bdl-';
        registry.forcePrefix = true;
        registry.useGlobalElements();
        //registry.register(Range);
    });
}
