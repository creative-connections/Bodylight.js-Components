import environment from './environment';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin("aurelia-dynamic-html") //needed by markdownaurelia
    // load the plugin ../src
    // The "resources" is mapped to "../src" in aurelia.json "paths"
    .feature('resources');

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
