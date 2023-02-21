# Bodylight Web Components  

This is demos of web components - full documentation see at Bodylight-docs/referenceguide

Bodylight Web Components is a suite of custom elements enhancing HTML with following advanced features: 
* FMI component - to control simulation of modeul using FMI standard in browser. `Modelica` model can be exported by any Modelica tool into `FMU`. [Bodylight FMU Compiler](https://github.com/creative-connections/Bodylight.js-FMU-Compiler) can be used to export FMU into WebAssembly.
* Adobe-Animate and Gif-Animate component - to control animation exported from Adobe-Animate or animated GIF and bind them to variables of model simulation.
* ChartJS and DygraphJS components - to visualise model variables in different chart types.

This plugin is part of broader tools to enable in-browser simulation using modern web technologies: Web Assembly, HTML, Javascript (ECMAScript6).

## Usage
To build web simulator:
1) You need to export Modelica model into FMU with source codes including source codes for solver (Dymola exports CVODE, OpenModelica 1.14.x exports Euler and 1.16.x is declared to support CVODE export too).
2) Then you need to convert the FMU into WebAssembly - using [Bodylight FMU Compiler](https://github.com/creative-connections/Bodylight.js-FMU-Compiler) 
3) the exported ZIP contains JS file - to be reffered from `bdl-fmi` component, and `modelDescription.xml` - standard FMU description with variable references.
4) optional - export Adobe Animate animation into CreateJS library usable by `bdl-adobe` component.
5) use the Bodylight components, This plugin is distributed in 2 different way: 
   * **1. Standard web components**[^1] - follow [Bodylight.js-Components](https://github.com/creative-connections/Bodylight.js-Components) to create web simulator using HTML or Markdown - web framework agnostic way.  
   * **2. Aurelia web components**[^2] - follow [aurelia-bodylight-plugin](https://github.com/creative-connections/aurelia-bodylight-plugin) to create more interactive application using `Aurelia` framework.

## Comparison to previous version

Compared to Bodylight.js v1.0 
  * in order to create web simulator in Bodylight.js 1.0 you need Bodylight.js Composer v1.0 [^3]
  * in order to create web simulator in Bodylight.js 2.0 you need any text editor or you may use Bodylight Editor [^4].
  * features of Bodylight.js Composer v1.0 was split into several independent subsystems and new features were introduced - Components, Editor, Composer, VirtualBody (3D visualization)   
  * optional [Bodylight-Editor](https://bodylight.physiome.cz/Bodylight-Editor/) can be used to edit the web simulator - it supports live preview for Markdown, Bodylight.js-Components, animation from Adobe Animate
  * BJP files from version 1.0 are not usable in v 2.0.beta. 
  * v 1.0 HTML export can be used as iframes within v2.0.beta application
  * v 2.0.beta supports graphs using dygraph.js, chart.js and plotly.js libraries for charts
  * v 2.0 beta supports 3D graphics of virtualbody in WEBGL [Bodylight-Virtualbody](https://github.com/creative-connections/Bodylight-VirtualBody)  
 
## Bodylight.js-Components in HTML
 
Example usage of Bodylight components in HTML:
  * add script module `bodylight.bundle.js` into head or other location:
  ```html
  <script type="module" src="bodylight.bundle.js"></script>`
  ```
  * add atrribute `aurelia-app="webcomponents"` into div or body containing web components:
  ```html
  <body aurelia=app="webcomponents"> ... </body>
  ```
     
Use custom elements with prefix `bdl-`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Bodylight web component</title>
     <script type="module" src="bodylight.bundle.js"></script>
     <script type="module" src="modelfmi.js"></script>
  </head>
<body aurelia-app="webcomponents">
<!-- put HTML as well as web components inside -->
<bdl-range id="id1" min="40" max="180" step="1" default="60"></bdl-range>

<bdl-fmi id="id4" 
    fminame="MeursHemodynamics_Model_vanMeursHemodynamicsModel" 
    tolerance="0.001" 
    starttime="0" 
    guid="{1cd90fb1-006b-4957-b1f2-012702efe021}" 
    valuereferences="637534215,637534232" 
    inputs="id1,16777216" 
    otherinputs="id3"></bdl-fmi>

<bdl-dygraphchart 
    width="600" height="300" fromid="id4" inputs="time,aorta pressure,ventricle pressure"></bdl-dygraphchart>

</body>
</html>
```
Where
  * `bdl-range` render a range input
  * `bdl-fmi` render simulation buttons and controls model simulation using `FMI` interface
  * `bdl-dygraphchart` renders 2d chart of selected variables 

## Bodylight.js-Components in BdlMarkdown

Bodylight web components contain special markdown components to read external MD file with components: 

The file `home.html` will contain only one component:
```html
...
<bdl-markdown src="home.md"></bdl-markdown>
...
```

This `bdl-markdown` component reads content of the file `home.md`:
```markdown
# Changing Heart Rate
heart rate can be set here:
<bdl-range id="id1" min="40" max="180" step="1" default="60"></bdl-range>
```
Note:  Note that `home.md` should be accessible by browser, if hosted in different URL, it should be allowed by CORS to be read inside web application.

## Bodylight.js-Components in Moodle

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

## Bodylight.js-Components in Adobe Captivate

Adobe Captivate supports high level web content. Unfortunately not particular components can be added directly, however adding 
existing HTML or MD pages as Web Objects is possible.
  
Select `Objects -> Web` and type address of selected component page E.g. `https://bodylight.physiome.cz/Bodylight.js-Components/#index=doc/usersguide.md&shownav=false`
 This will disable navigation and shows only the content.

## Using application prepared in Bodylight Composer v1.0
  1. Export BJP into Application HTML (do not set 'minimize')
  2. Edit Application HTML
  3. find 'createModelRuntime' and set global variable instance, e.g.: 
  ```javascript
function createModelRuntime(Model, config, functions) {
...
            //add this row to set explicitly global variable 
            // BodylightModel to be accessed from outside
            window.BodylightModel = model;
...
  ```
  Now the `BodylightModel` is exposed. You can call API `model.setValue()` in Application HTML:
```html
<p>Added component, manipulating Bodylight web app from outside:</p>
<p>set heart rate:
<input id="myheartrateinput" 
       type="number" 
       min="40" 
       max="180" 
       onchange="setMyHeartRate(this.value)"></input> 
</p>
<script>
function setMyHeartRate(value){
  //global variable BodylightModel set explicitly in the code above
  //need to know value reference of heart rate in model 
  // - it is 16777216 in this case
  window.BodylightModel.setValue(16777216,value); 
}
</script>
```
...

[^1]: Web Components: https://developer.mozilla.org/en-US/docs/Web/Web_Components

[^2]: CORS: https://en.wikipedia.org/wiki/Cross-origin_resource_sharing

[^3]: Bodylight 1.0 and Bodylight Composer: https://bodylight.physiome.cz/composer/

[^4]: Bodylight 2.0 Editor - beta: https://bodylight.physiome.cz/Bodylight-Editor/ 
