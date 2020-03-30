---
id: index
title: Index
version:2.0
---

This section describes how to use and customize web components of Bodylight.js.

# Introduction

Web Components is a suite of different technologies allowing you to create reusable 
custom elements — with their functionality encapsulated away from the rest of your code.
More info at [1].

Web components of Bodylight library are exported as custom elements.
In pure HTML, use with `bdl-` prefix. In an already preloaded component of markdown, use it without prefix.
Available are these components:
* MD:`<receptacle></receptacle>` HTML:`<bdl-receptacle></bdl-receptacle>` Renders a receptacle graphics which is full or empty based on the values provided
* MD:`<range></range>` HTML: `<bdl-range></bdl-range>` Renders a range input which may trigger a value
* MD:`<bind2previous></bind2previous>` HTML:`<bdl-bind2previous></bdl-bind2previous>` Binds values of 2 components 
* MD:`<fmi></fmi>` HTML:`<bdl-fmi></bdl-fmi>` Creates control buttons in order to control simulation of the model
* MD:`<dygraph></dygraph>` HTML:`<bdl-dygraph></bdl-dygraph>` Creates a graph controlled by Dygraph library [2]

## Developer's guide 

Further webcomponents can be exported by ammending the `src/mainwebcomponent.js` and building the bodylight.bundle.js.

## User's guide 

### Adding web component into web page

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
<h1>Test</h1>
  <bdl-range id="id1" min="40" max="180" step="1" default="60"></bdl-range>

  <bdl-receptacle id="id2" hx="100" hy="100" px="50" py="50"></bdl-receptacle>

  <bdl-bind2previous fromid="id1" toid="id2"></bdl-bind2previous>

  <bdl-fmi id="id4" fminame="MeursHemodynamics_Model_vanMeursHemodynamicsModel" 
    tolerance="0.001" starttime="0" guid="{1cd90fb1-006b-4957-b1f2-012702efe021}" 
    valuereferences="637534215,637534232" inputs="id1,16777216" otherinputs="id3"></bdl-fmi>

  <bdl-dygraphchart width="600" height="300" fromid="id4" inputs="time,aorta pressure,ventricle pressure"></bdl-dygraphchart>
</body>
</html>
```

### Webcomponent details
Each of the following section contains detail description and attributes with example.
The examples are rendered in markdown component directly - otherwise normal MD do not render them.

# Range, bdl-range
`<range>` `<bdl-range>` Renders a range input which may trigger a value. With following attributes:
  * `id` unique id
  * `min`, `max` minimum and maximum range value (default 0,100)
  * `step`, step between the range values (default 1)
  * `default`, default value of the range component (default 50)

Example:
  * `<range id="id1" min="10" max="20" step="2" default="12"></range>` will render range from 10 to 20 with default value 12 and step 2.
  <range id="id1" min="10" max="20" step="2" default="12"></range>  

# Receptacle, bdl-receptacle
`<receptacle></receptacle>` `<bdl-receptacle id="id10" hx="100" hy="100" px="50" py="50"></bdl-receptacle>` Renders a range input which may trigger a value. With following attributes:
  * `id` unique id
  * `hx` maximum *x* point of the receptacle shape (default 100)
  * `hy` maximum *y* point of the receptacle shape (default 100)
  * `px` middle *x* point of the shape (default 50)
  * `py` middle *y* point of the shape (default 50)

Example:
  * `<receptacle id="id10" hx="100" hy="100" px="50" py="50" value="50"></receptacle>` Renders a range input which may trigger a value. With following attributes:
  <receptacle id="id2" hx="100" hy="100" px="50" py="50" value="50" value.bind="valueid3"></receptacle>


  
# Bind2previous, bdl-bind2previous
`<bind2previous></bind2previous>``<bdl-bind2previous fromid="id9" toid="id10" toattribute="hx"></bdl-bind2previous>` Binds values of 2 components. With following attributes:
  * `fromid` unique id of the source element, which events are to be listened
  * `toid` unique id of the target element, the `input` event are handled and value of the target element is set
  * `toattribute` (optional) name of the attribute to be set, if not defined 'value' is set.

Example 1 for webcomponents:
```html
   <bdl-range id="id3" min="10" max="100" step="2" default="50"></bdl-range> 
   <bdl-bind2previous fromid="id3" toid="id2"></bdl-bind2previous>
 ``` 
Binds value of range, to the receptacle above, sets the attribute 'value'. Works only in webcomponents.

Example 2 for MD components:

For components inside markdown use direct connection via shared variable name
 ```html
  <range id="id3" min="10" max="100" step="2" default="50" value.two-way="valueid3"></range>  
  <!--bind2previous fromid="id3" toid="id2"></bind2previous-->
``` 
<range id="id3" min="10" max="100" step="2" default="50" value.two-way="valueid3"></range>  
# FMI, bdl-fmi
`<bdl-fmi></bdl-fmi>` Creates control buttons in order to control simulation of the model. With these attributes:
  * `fminame` name of the model as it exactly appears in exported JS,WASM code
  * `tolerance` tolerance of the solver (default 0.001)
  * `starttime` start time of the simulation (default 0)
  * `guid` guid as it appears in FMU model description
  * `valuereferences` references to variables, custom event 'fmidata' with `event.detail` set to  `{time: number , data:[number,...]}` where time is timepoint of the current simulation step and data is array of values in same order as in 
  valuereferences
  * `inputs` ids of components and references of values to be set when event 'change' is triggered by the component
  * `otherinputs` ids of components which triggers custom event 'fmiinput', it is expected that in event.detail contains 
  this structure `{ valuereference: number, value: number }`
  
# Beaker, bdl-beaker, bdl-beakercontrols
`<bdl-beaker></bdl-beaker>` Creates a beaker with controllable width and height
  *    

# References

[1]:# Web Components: https://developer.mozilla.org/en-US/docs/Web/Web_Components

[2]:# Dygraph: https://dygraphs.com
