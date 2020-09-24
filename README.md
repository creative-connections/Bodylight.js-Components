# Bodylight.js-Components
 [![Project stage: Development][project-stage-badge: Development]][project-stage-page]

[project-stage-badge: Development]: https://img.shields.io/badge/Project%20Stage-Development-yellowgreen.svg
[project-stage-page]: https://blog.pother.ca/project-stages/

Reusable components to build web-based simulator 
  * based on `Modelica` models, 
    * exported to FMU
    * FMU converted by [Bodylight FMU Compiler](https://github.com/creative-connections/Bodylight.js-FMU-Compiler) into JS code.
  * supporting basic HTML inputs and outputs
  * supporting dygraphs, chart.js charts outputs
  * supporting Adobe-Animate (exported as CreateJS/EaselJS) visualisation
  * enhanced markdown rendering with these components

# Usage

This plugin is distributed in 2 different way: 1) as standard web components or 2) as aurelia components.
* **1. Standard web components** - follow this section to create web simulator using HTML or Markdown. 
* **2. Aurelia web components** - follow instruction at [aurelia-bodylight-plugin at GITHUB](https://github.com/creative-connections/aurelia-bodylight-plugin)   

## 1. Standard web components

1) Use `bodylight.bundle.js` from : 
    * download `bodylight.bundle.js` locally and refer it from your `<script>`:
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

# Developer's Guide

To build
* `npm i` - install depended packages
* `npm run build` - builds production version to `/dist/bodylight.bundle.js`
* `npm run build:dev` - build developers version to `/dist/bodylight.bundle.js`

To test
* Either manually copy `bodylight.bundle.js` to `/test` directory
* OR `npm run build` - this will copy bundle into `/test` dir
* THEN serve http from `/test` folder
