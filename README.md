# Bodylight.js-Components
[![stability-beta](https://img.shields.io/badge/stability-beta-33bbff.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#beta)
 [![Version](https://img.shields.io/npm/v/bodylight-components.svg)](https://www.npmjs.com/package/bodylight-components)
 [![Zenodo](https://zenodo.org/badge/doi/10.5281/zenodo.4575354.svg)](https://doi.org/10.5281/zenodo.4575354)
 [![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/owner/my-element)
[![Maintainability](https://api.codeclimate.com/v1/badges/dc0ab8b096ec5f22c586/maintainability)](https://codeclimate.com/github/creative-connections/Bodylight.js-Components/maintainability)
 [![Codacy Badge](https://app.codacy.com/project/badge/Grade/c20c72d78ce548599333538be94e1199)](https://www.codacy.com/gh/creative-connections/Bodylight.js-Components/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=creative-connections/Bodylight.js-Components&amp;utm_campaign=Badge_Grade)

Web components of the Bodylight library. For full documentation see https://bodylight.physiome.cz/Bodylight-docs/reference/. Project portal with links to samples at https://bodylight.physiome.cz/

Bodylight.js web components is a suite of custom elements enhancing HTML web documents with 
* FMU component able to be execute in browser. `Modelica` model is exported to `FMU` using FMI standard and [Bodylight FMU Compiler](https://github.com/creative-connections/Bodylight.js-FMU-Compiler) can convert FMU with source codes and solver into WebAssembly script.
* Adobe-Animate and Gif-Animate component able to control animation exported from Adobe-Animate or animated GIF and bind them to variables of model simulation.
* ChartJS and DygraphJS components to visualise model variables in different chart types.
* Following Web components standard.

All bodylight web components are registered with a bdl- prefix. Components are defined in source code without the prefix, which may be used to build application internally in an Aurelia framework https://aurelia.io 
This repository contains wrapper code for [aurelia-bodylight-plugin](https://github.com/creative-connections/aurelia-bodylight-plugin) registering all Aurelia[2] components as standard (framework agnostic) web components [1].


This plugin is part of broader tools to enable in-browser simulation using modern web technologies: Web Assembly, HTML, Javascript (ECMAScript6).

[^1]: Web Components: https://developer.mozilla.org/en-US/docs/Web/Web_Components

[^2]: Aurelia framework: https://aurelia.io



# Usage
To build web simulator:
1) You need to export Modelica model into FMU with source codes including source codes for solver (Dymola exports CVODE, OpenModelica 1.14.x exports Euler and 1.16.x is declared to support CVODE export too).
2) Then you need to convert the FMU into WebAssembly - using [Bodylight FMU Compiler](https://github.com/creative-connections/Bodylight.js-FMU-Compiler) 
3) the exported ZIP contains JS file - to be reffered from `bdl-fmi` component, and `modelDescription.xml` - standard FMU description with variable references.
4) optional - export Adobe Animate animation into CreateJS library usable by `bdl-adobe` component.
5) use the Bodylight components, This plugin is distributed in 2 different way: 1) as standard web components or 2) as aurelia components.
   * **1. Standard web components** - distribution recommended to build web simulator using enhanced HTML or Markdown. 
   * **2. Aurelia web components** - recommended for more complex web application
# Live demo and tutorial 

https://bodylight.physiome.cz/Bodylight-docs/tutorial/#basic.md

## 1. Standard web components

1) Use `bodylight.bundle.js` from : 
    * from jsdelivr CDN:
    ```html
      <script src="https://cdn.jsdelivr.net/npm/bodylight-components/dist/bodylight.bundle.js"></script>
    ```
    * OR install bundle by npm: `npm i bodylight-components`
    * OR download `bodylight.bundle.js` locally and refer it from your `<script>`:
    ```html
        <script src="bodylight.bundle.js"></script>
    ```  
   
2) Add attribute `aurelia-app="webcomponents"` to `div` or `body` where web components will be located (note that web-components are distinguished by the prefix `bdl-` from other HTML elements:
```html
index.html
...
<body aurelia-app="webcomponents">
  <bdl-range id="id1" min="40" max="180" default="60" title="Heart rate"></bdl-range>
  <bdl-fmi ...></bdl-fmi>
  <bdl-chartjs ...></bdl-chartjs>
</body>
```

3) (optional) you may use any of `bdl-markdown-*` components to refer MD documents where you may use Bodylight webcomponents as well.
E.g. `doc/index.md` contains main content and `summary.md` contains sidebar with links to other docs.
```html
index.html
...
<body aurelia-app="webcomponents">
    <bdl-markdown-book index="doc/index.md" summary="doc/summary.md">
      <img src="docs/loading.gif"/>
    </bdl-markdown-book>
</body>
```
```markdown
doc/index.md

# Introduction
Markdown syntax is interpretted. Syntax highlighting is enabled for source code. KATEX plugin is enabled to allow
basic equation e.g. $$e = m c^2$$

## bodylight web components
Use bodylight web components directly:
  <bdl-range id="id1" min="40" max="180" default="60" title="Heart rate"></bdl-range>
  <bdl-fmi ...></bdl-fmi>
  <bdl-chartjs ...></bdl-chartjs>
```

```markdown
summary.md
| EN | [CZ](#doc/index.cs.md&summary=doc/summary.cs.md) |   
  * [First Page](#doc/index.md)
  * [Second Page](#doc/index2.md)
    * [Sub page of second page](#doc/index22.md)
```

## Bodylight webcomponents in Moodle

1. edit moodle page in HTML - use HTML source, click <i class="fa fa-level-down"></i> and then siwtch code - click <i class="fa fa-code"></i>
2. add the bodylight script
   ```html
   <script type="module" src="https://bodylight.physiome.cz/Bodylight.js-Components/bodylight.bundle.js"></script>
   <div aurelia-app="webcomponents"><br>
   ```
3. add bodylight component, note that markdown component needs base to be specified
so relative links are rendered correctly inside Moodle. 
For resources in github repo use `cdn.jsdelivr.net/gh/` which is returning correct MIME Type.
   ```html
   <bdl-markdown 
      src="https://cdn.jsdelivr.net/gh/creative-connections/Bodylight-Scenarios@master/hemodynamics/index.cs.md" 
      base="https://cdn.jsdelivr.net/gh/creative-connections/Bodylight-Scenarios@master/">
   bdl-markdown not supported
   </bdl-markdown>
   ```
   This allows FMI scripts and MD content to be loaded correctly. 

## Bodylight webcomponents in Adobe Captivate

Bodylight Web Components cannot be inserted directly into Adobe Captivate, however, content created in HTML or MD and hosted in some domain can be added
using direct URL as `Web Object`. You may use the `showmenu=false` URL parameter, e.g.: https://bodylight.physiome.cz/Bodylight-Scenarios/#hemodynamics/hemo2.cs.md&showmenu=false

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
# Developer's Guide

Download source code
* `git clone https://github.com/creative-connections/aurelia-bodylight-plugin.git`
* `git clone https://github.com/creative-connections/Bodylight.js-Components.git`

To develop
* components sources at
* `cd aurelia-bodylight-plugin`
* `npm i`
* `au build` - builds the plugin
* `build-all.sh` - builds plugin and ../Bodylight.js-Components at once

To test
* Either manually copy `bodylight.bundle.js` to `/test` directory
* OR `npm run build` - this will copy bundle into `/test` dir
* THEN serve http from `/test` folder

To publish
* `npm login` - logs into npmjs
* `sudo npm i np -g` - installs `np` tool globally
* `np` - UI to publish `bodylight-components` into npm as package
