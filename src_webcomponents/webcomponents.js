import * as environment from '../config/environment.json';
import { CustomElementRegistry } from 'aurelia-web-components';
import {PLATFORM} from 'aurelia-pal';
export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        //all components from src (resources/index) will be registered as web component
        .plugin(PLATFORM.moduleName('aurelia-bodylight-plugin'));
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
