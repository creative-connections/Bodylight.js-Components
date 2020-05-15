# Bodylight.js-Components

Reusable components for composing interactive web simulators 
  * based on `Modelica` models, 
    * exported to FMU
    * FMU converted by [Bodylight FMU Compiler](https://github.com/creative-connections/Bodylight.js-FMU-Compiler) into JS code.
  * supporting basic HTML inputs and outputs
  * supporting dygraphs, chart.js charts outputs
  * enhanced markdown rendering with these components
  * ...

# Bodylight web components in HTML
 
Script bundle `bodylight.bundle.js` adds Bodylight Web Components support
into any web application or web page. It follows [Web Components standards](https://www.webcomponents.org/) supported by all major web browsers.

Bodylight Web Components introduce custom elements which are all prefixed with `bdl-` to prevent ambuiguity.

The following HTML snippet loads first the `bodylight.bundle.js` script alongside `modelfmi.js` (Model exported as FMU and then as JS by Bodylight Compiler).
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

# Bodylight Web Components in Markdown

Bodylight web components contain special markdown components to read external MD file with components: 

The file `home.html`:
```html
...
<bdl-markdown src="home.md"></bdl-markdown>
...
```

The file `home.md`:
```markdown
# Changing Heart Rate
heart rate can be set here:
<bdl-range id="id1" min="40" max="180" step="1" default="60"></bdl-range>
```

Bodylight web components can be into HTML based systems Moodle (TBD) and Adobe Captivate (TBD).

[^1]: Web Components: https://developer.mozilla.org/en-US/docs/Web/Web_Components

For further details, see User's guide at `doc/usersguide.md` or at [bodylight.physiome.cz/Bodylight.js-Components/](https://bodylight.physiome.cz/Bodylight.js-Components/#index=doc/usersguide.md) 
