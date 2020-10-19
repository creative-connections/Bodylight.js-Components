# Bodylight.js-Components
 [![Project stage: Development][project-stage-badge: Development]][project-stage-page]

[project-stage-badge: Development]: https://img.shields.io/badge/Project%20Stage-Development-yellowgreen.svg
[project-stage-page]: https://blog.pother.ca/project-stages/

Web components of the Bodylight library is a suite of custom elements enhancing HTML web documents with 
* FMU component able to be execute in browser. `Modelica` model is exported to `FMU` using FMI standard and [Bodylight FMU Compiler](https://github.com/creative-connections/Bodylight.js-FMU-Compiler) can convert FMU with source codes and solver into WebAssembly script.
* Adobe-Animate and Gif-Animate component able to control animation exported from Adobe-Animate or animated GIF and bind them to variables of model simulation.
* ChartJS and DygraphJS components to visualise model variables in different chart types.
* Following Web components standard at [1].

All bodylight web components are registered with a bdl- prefix. Components are defined in source code without the prefix, which may be used to build application internally in an Aurelia framework [2]. However, web components way is framework agnostic standard way.

This plugin is part of broader tools to enable in-browser simulation using modern web technologies: Web Assembly, HTML, Javascript (ECMAScript6).

# Usage
To build web simulator:
1) You need to export Modelica model into FMU with source codes including source codes for solver (Dymola exports CVODE, OpenModelica 1.14.x exports Euler and 1.16.x is declared to support CVODE export too).
2) Then you need to convert the FMU into WebAssembly - using [Bodylight FMU Compiler](https://github.com/creative-connections/Bodylight.js-FMU-Compiler) 
3) the exported ZIP contains JS file - to be reffered from `bdl-fmi` component, and `modelDescription.xml` - standard FMU description with variable references.
4) optional - export Adobe Animate animation into CreateJS library usable by `bdl-adobe` component.
5) use the Bodylight components, This plugin is distributed in 2 different way: 1) as standard web components or 2) as aurelia components.
   * **1. Standard web components** - follow this section to create web simulator using HTML or Markdown. 
   * **2. Aurelia web components** - follow instruction at [aurelia-bodylight-plugin at GITHUB](https://github.com/creative-connections/aurelia-bodylight-plugin)   


## 1. Standard web components

1) Use `bodylight.bundle.js` from : 
    * EITHER install bundle by npm: `npm i bodylight-components`
    * OR download `bodylight.bundle.js` locally and refer it from your `<script>`:
    ```html
        <script type="module" src="bodylight.bundle.js"></script>
    ```  
    * OR refer bundle directly from CDN:
    ```html
      <script type="module" src="https://cdn.jsdelivr.net/gh/creative-connections/Bodylight.js-Components/dist/bodylight.bundle.js"></script>
    ```
   
2) Set `div` or `body` where web components by adding `aurelia-app="webcomponents"` attribute, all webcomponents are prefixed by `bdl-` prefix:
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

[^1]: Web Components: https://developer.mozilla.org/en-US/docs/Web/Web_Components

[^2]: Aurelia framework: https://aurelia.io

# Developer's Guide

Download source code
* `git clone https://github.com/creative-connections/Bodylight.js-Components.git`
* `cd Bodylight.js-Components`

To build
* `npm i` - install depended packages
* `npm run build` - builds production version to `/dist/bodylight.bundle.js`
* `npm run build:dev` - build developers version to `/dist/bodylight.bundle.js`

To test
* Either manually copy `bodylight.bundle.js` to `/test` directory
* OR `npm run build` - this will copy bundle into `/test` dir
* THEN serve http from `/test` folder

To publish
* `npm login` - logs into npmjs
* `sudo npm i np -g` - installs `np` tool globally
* `np` - UI to publish `bodylight-components` into npm as package
