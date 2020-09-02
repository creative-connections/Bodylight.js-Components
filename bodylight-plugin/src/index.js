import {PLATFORM} from 'aurelia-pal';

export function configure(config) {
  config.globalResources([
    PLATFORM.moduleName('./elements/bdl-range.html'),
    PLATFORM.moduleName('./elements/bdl-receptacle.html'),
    PLATFORM.moduleName('./elements/bdl-bind2previous'),
      PLATFORM.moduleName('./elements/bdl-dygraphchart'),
      PLATFORM.moduleName('./elements/bdl-beaker.html'),
      PLATFORM.moduleName('./elements/bdl-value'),
      PLATFORM.moduleName('./elements/bdl-beakercontrols.html'),
      PLATFORM.moduleName('./elements/bdl-markdown'),
      PLATFORM.moduleName('./elements/bdl-markdownnav'),
      //.globalResources(PLATFORM.moduleName('components/composite/markdownaurelia')) //do not register mdaurelia is for internal au use with dynamic html
      PLATFORM.moduleName('./elements/bdl-simplegif'),
      PLATFORM.moduleName('./elements/bdl-capillary.html'),
      PLATFORM.moduleName('./elements/bdl-ecg'),
      PLATFORM.moduleName('./elements/bdl-chartjs'),
      PLATFORM.moduleName('./elements/bdl-chartjs-time'),
      PLATFORM.moduleName('./elements/bdl-chartjs-xy'),
      PLATFORM.moduleName('./elements/bdl-cardiaccycle.html'),
      PLATFORM.moduleName('./elements/bdl-animate-gif'),
      PLATFORM.moduleName('./elements/bdl-animate-sync-gif'),
      PLATFORM.moduleName('./elements/bdl-animate-control'),
      PLATFORM.moduleName('./elements/bdl-quiz'),
      PLATFORM.moduleName('./elements/bdl-audio-on-increase'),
      PLATFORM.moduleName('./elements/bdl-audio-on-decrease'),
      PLATFORM.moduleName('./elements/bdl-sound-on-increase'),
      PLATFORM.moduleName('./elements/bdl-markdown-book'),
    PLATFORM.moduleName('./elements/bdl-markdown-book-au'),
      PLATFORM.moduleName('./elements/bdl-markdown-app.html'),
      //.globalResources(BdlAudioOnDecreaseCustomElement)
      PLATFORM.moduleName('./elements/bdl-fmi')
  ]);
}
