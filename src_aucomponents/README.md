# Aurelia plugin with Bodylight web components 
[![Build Status](https://travis-ci.com/creative-connections/aurelia-bodylight-plugin.svg?branch=master)](https://app.travis-ci.com/github/creative-connections/aurelia-bodylight-plugin/builds)
[![stability-beta](https://img.shields.io/badge/stability-beta-33bbff.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#beta)
[![Version](https://img.shields.io/npm/v/aurelia-bodylight-plugin.svg)](https://www.npmjs.com/package/aurelia-bodylight-plugin)
[![Maintainability](https://api.codeclimate.com/v1/badges/3b493506de72a23d92b7/maintainability)](https://codeclimate.com/github/creative-connections/aurelia-bodylight-plugin/maintainability)



Web components of the Bodylight library is a suite of custom elements enhancing HTML.
It is distributed either as  
* **1. Aurelia web components** - follow this instruction further, framework dependent distribution. Follow instructions further
* **2. Standard web components** - framework agnostic distibution with 1 independent JS file. Follow [Bodylight.js-Components](https://github.com/creative-connections/Bodylight.js-Components) to create web simulator using HTML or Markdown or mor complex application using different framework.

Web components contains:
* FMU component able to be execute in browser. `Modelica` model is exported to `FMU` using FMI standard and [Bodylight FMU Compiler](https://github.com/creative-connections/Bodylight.js-FMU-Compiler) can convert FMU with source codes and solver into WebAssembly script.
* Adobe-Animate and Gif-Animate component able to control animation exported from Adobe-Animate or animated GIF and bind them to variables of model simulation.
* ChartJS, DygraphJS, PlotlyJS components to visualise model variables in different chart types and libraries.
* Following Web components standard to be broadly compatible with any web application.


# Usage
This plugin is part of broader tools to enable in-browser simulation using modern web technologies: Web Assembly, HTML, Javascript (ECMAScript6).
In order to build web simulator:
1) You need to export Modelica model into FMU with source codes including source codes for solver (Dymola exports CVODE, OpenModelica 1.14.x exports Euler and 1.16.x is declared to support CVODE export too).
2) Then you need to convert the FMU into WebAssembly - using [Bodylight FMU Compiler](https://github.com/creative-connections/Bodylight.js-FMU-Compiler) 
3) the exported ZIP contains JS file - to be reffered from `bdl-fmi` component, and `modelDescription.xml` - standard FMU description with variable references.
4) optional - export Adobe Animate animation into CreateJS library usable by `bdl-adobe` component.
5) use the Bodylight components, This plugin is distributed in 2 different way: 1) as standard web components or 2) as aurelia components.
   * **1. Aurelia web components** - we recommend this distribution in order to build more complex interactive application with [Aurelia](https://aurelia.io) framework.   
   * **2. Standard web components** - we recommend this distribution in order to build web simulator with text, graphics and visualisation in enhanced HTML or Markdown, without need to touch Javscript or other APIs.
    Follow [Bodylight.js-Components](https://github.com/creative-connections/Bodylight.js-Components)  

## 2. Aurelia web components

We recommend to use [aurelia](https://aurelia.io) framework to build web application with Bodylight Web components.
Follow Aurelia doc's how to prepare your project and  install `aurelia-bodylight-plugin` by `npm` command-line:
```bash
npm i aurelia-bodylight-plugin
```

In your `main.js` file enable the plugin by `aurelia.use.plugin(PLATFORM.moduleName('aurelia-bodylight-plugin'))`, so it may look like:
```javascript
//main.js
import {PLATFORM} from 'aurelia-pal';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-bodylight-plugin'))

  aurelia.start().then(() => {
    aurelia.setRoot(PLATFORM.moduleName('app'));
  });
}
```
Bodylight web components are available in any template, use them without `bdl-` prefix:
```html
<template>
  <range id="id1" min="40" max="180" default="60" title="Heart rate"></range>
  <fmi ...></fmi>
  <chartjs ...></chartjs>
...
</template>
```
## Reference manual
For further doc refer `docs/` 

## Developer's guide

To Build and test
* `au build-plugin` - builds plugin - outpu to `dist`
* `au build` - builds dev-app with documentation - output to `/script`
* `au test` - execute unit tests

To publish NPM package version [NPM aurelia-bodylight-plugin](https://www.npmjs.com/package/aurelia-bodylight-plugin)
* `npm login` - logs into NPM - need to be contributor for  
* `np` - UI for release the new version (will ask for patch,minor or major version)

### Add new component
To add a new web component:
* create a component definition in src/components, either only HTML or HTML and JS
* register the component as a web component in src/webcomponents.js adding a row
```javascript
export function configure(aurelia) {
  aurelia.use
  ...
  //use this routine to register HTML only component as web component
  .globalResources(PLATFORM.moduleName('components/mycomponent.html'))
  //use this routine to register component (JS and HTML) as web component
  .globalResources(PLATFORM.moduleName('components/mycomponent'))
  ...
```

* create documentation in `docs`
* create unit test in `test` 
* build plugin `au build-plugin` and build dev-app with docs using `au build` and see `docs/index.html` 

## Release history
### release notes since 2.0.0
* follow https://github.com/creative-connections/aurelia-bodylight-plugin/releases 
* follow https://github.com/creative-connections/Bodylight.js-Components/releases
* compiled JS distributed as `NPM` packages aurelia plugin: `npm i aurelia-bodylight-plugin` standard web components: `npm i bodylight-components` 
### release notes 1.0.2
* consolidated docs and tests
### release notes 0.3
* removed unused packages
* created npm package aurelia-bodylight-plugin - can be installed using 
```
npm -i aurelia-bodylight-plugin
```
### release notes 0.2
* aurelia templating left as is
* all elements renamed, do not have bdl- prefix or Bdl* in name,
* aurelia-web-components patched with 'forcePrefix' option to have consistent prefix for all web components
### release notes 0.1
* aurelia-templating throws 'behaviorInstruction' is undefined - need to patch from `\patch` directory
* bdl-markdown-book index and summary attributes are not reflected

