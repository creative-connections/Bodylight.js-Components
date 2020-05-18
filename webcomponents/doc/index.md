# Bodylight.js-Components

Reusable components for composing interactive web simulators 
  * based on `Modelica` models, 
    * exported to FMU
    * FMU converted by [Bodylight FMU Compiler](https://github.com/creative-connections/Bodylight.js-FMU-Compiler) into JS code.
  * supporting basic HTML inputs and outputs
  * supporting dygraphs, chart.js charts outputs
  * enhanced markdown rendering with these components
  * ...

## Bodylight.js-Components in HTML
 
In order to add Bodylight support to HTML do following:
  * add script module `bodylight.bundle.js` into head or other location:
  ```html
  <script type="module" src="bodylight.bundle.js"></script>`
  ```
  * add atrribute `aurelia-app="webcomponents"` into div or body containing web components:
  ```html
  <body aurelia=app="webcomponents"> ... </body>
  ```
     
Bodylight Web Components introduce custom elements which are all prefixed with `bdl-` to prevent ambuiguity and 
follow [Web Components standards](https://www.webcomponents.org/) supported by all major web browsers.

The bundle `bodylight.bundle.js` contains all definition of custom-elements.

The following example contains additional script `modelfmi.js` (Model exported as FMU and then as JS by Bodylight Compiler).
Then custom-elements with prefix `<bdl-` can be used alongside other standard HTML.
`<bdl-fmi>` renders as control buttons (play,pause,step) to start stop simulation in FMI.
In the background, variables of model are bind as output to dygraph chart in `<bdl-dygraphchart>`
and as input from `<bdl-range>`. 

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

## Bodylight.js-Components in Markdown

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
  

[^1]: Web Components: https://developer.mozilla.org/en-US/docs/Web/Web_Components
[^2]: CORS
For further details, see User's guide at `doc/usersguide.md` or at [bodylight.physiome.cz/Bodylight.js-Components/](https://bodylight.physiome.cz/Bodylight.js-Components/#index=doc/usersguide.md) 
