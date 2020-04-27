### Adding web component into HTML web page

Web components are supported by modern browsers. 
Script with bundle `bodylight.bundle.js` can be used to add bodylight web components into any web application or web page.

The following HTML snippet loads first the `bodylight.bundle.js` script and use custom-elements `<bdl-fmi>` with attributes
`fminame=""` and `targetsource=""` to specify target for annotation. There is additionally button to hide the `<div>` containing the custom element.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Bodylight web component</title>
     <script type="module" src="bodylight.bundle.js"></script>
     <script type="module" src="modelfmi.js"></script>
  </head>
<body aurelia-app="mainwebcomponent">
<!-- put HTML as well as web components inside -->
<!-- example
  <bdl-range id="id1" min="40" max="180" step="1" default="60"></bdl-range>

  <bdl-receptacle id="id2" hx="100" hy="100" px="50" py="50"></bdl-receptacle>

  <bdl-bind2previous fromid="id1" toid="id2"></bdl-bind2previous>

  <bdl-fmi id="id4" fminame="MeursHemodynamics_Model_vanMeursHemodynamicsModel" 
    tolerance="0.001" starttime="0" guid="{1cd90fb1-006b-4957-b1f2-012702efe021}" 
    valuereferences="637534215,637534232" inputs="id1,16777216" otherinputs="id3"></bdl-fmi>

  <bdl-dygraphchart width="600" height="300" fromid="id4" inputs="time,aorta pressure,ventricle pressure"></bdl-dygraphchart>
-->
</body>
</html>
```

