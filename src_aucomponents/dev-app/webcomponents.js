/**
 * This dev-app/webcomponents shows how to register all plugin components as standadr WEB COMPONENTS.
 * The forcePrefix=true sets prefix `bdl-` for all components, not only for that without hyphen `-`
 * https://github.com/aurelia/web-components/pull/26
 */
import environment from './environment';
import { CustomElementRegistry } from 'aurelia-web-components';
import {PLATFORM} from 'aurelia-pal';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
  //all components from src (resources/index) will be registered as web component
    .feature(PLATFORM.moduleName('resources/index'));
  //.feature('resources/index');
  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');
  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }
  // here define start and register prefix bdl-
  aurelia.start().then(() => {
    const registry = aurelia.container.get(CustomElementRegistry);
    registry.fallbackPrefix = 'bdl-';
    registry.forcePrefix = true;
    registry.useGlobalElements();
  });
}
