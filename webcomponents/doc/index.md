This section describes how to use and customize web components of Bodylight.js.

# Introduction

Web Components is a suite of different technologies allowing you to create reusable 
custom elements — with their functionality encapsulated away from the rest of your code.
More info at [^1].

Web components of Bodylight library are exported as custom elements.
All bodylight webcomponents are registered with `bdl-` prefix. Components are defined in source code without the prefix, which might be used
to build application internally in aurelia framework. However, web components way is prefferd standard way. 


## Developer's guide 

To add a new webcomponent:
 1. create component definition in `src/components`, either only HTML or HTML and JS
 2. register component as webcomponent in `src/webcomponents.js` adding a row
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
 3. build the bodylight.bundle.js using `au build`
 4. add documentation section about new component into User's guide

## User's guide 

These webcomponents are available:

* `<bdl-receptacle></bdl-receptacle>` Renders a receptacle graphics which is full or empty based on the values provided
* `<bdl-range></bdl-range>` Renders a range input which may trigger a value
* `<bdl-bind2previous></bdl-bind2previous>` Binds values of 2 components 
* `<bdl-fmi></bdl-fmi>` Creates control buttons in order to control simulation of the model
* `<bdl-dygraph></bdl-dygraph>` Creates a graph controlled by Dygraph library [^2]

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

### Adding web component into Markdown web page
Markdown component `<bdl-markdown></bdl-markdown>` can be used to create interactive web content with web components.

HTML `index.html`:
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
  <bdl-markdown src="index.md"></bdl-markdown>
</body>
</html>
```

any HTML and custom elements are interpretted:

MARKDOWN `index.md`:
```markdown
# This chapter describes usage of web components
select value from range: <bdl-range id="id1" min="40" max="180" step="1" default="60"></bdl-range>
```

### Webcomponent details
Each of the following section contains detail description and attributes with example.
The examples are rendered in markdown component directly - otherwise normal MD do not render them.

### Range, bdl-range
`<bdl-range>` Renders a range input which may trigger a value. With following attributes:
  * `id` unique id
  * `min`, `max` minimum and maximum range value (default 0,100)
  * `step`, step between the range values (default 1)
  * `default`, default value of the range component (default 50)

Example:
  * `<bdl-range id="id1" min="10" max="20" step="2" default="12"></bdl-range>` will render range from 10 to 20 with default value 12 and step 2.
  <bdl-range id="id1" min="10" max="20" step="2" default="12"></bdl-range>  

### Receptacle, bdl-receptacle
`<bdl-receptacle id="id10" hx="100" hy="100" px="50" py="50"></bdl-receptacle>` Renders a range input which may trigger a value. With following attributes:
  * `id` unique id
  * `hx` maximum *x* point of the receptacle shape (default 100)
  * `hy` maximum *y* point of the receptacle shape (default 100)
  * `px` middle *x* point of the shape (default 50)
  * `py` middle *y* point of the shape (default 50)

Example:
  * `<bdl-receptacle id="id10" hx="100" hy="100" px="50" py="50" value="50"></bdl-receptacle>` Renders a range input which may trigger a value. With following attributes:
  <bdl-receptacle id="id2" hx="100" hy="100" px="50" py="50" value="50" value.bind="valueid3"></bdl-receptacle>
  
### Bind2previous, bdl-bind2previous
`<bdl-bind2previous fromid="id9" toid="id10" toattribute="hx"></bdl-bind2previous>` Binds values of 2 components. With following attributes:
  * `fromid` unique id of the source element, which events are to be listened
  * `toid` unique id of the target element, the `input` event are handled and value of the target element is set
  * `toattribute` (optional) name of the attribute to be set, if not defined 'value' is set.

Example 1 for webcomponents:
```html
   <bdl-range id="id3" min="10" max="100" step="2" default="50"></bdl-range> 
   <bdl-bind2previous fromid="id3" toid="id2"></bdl-bind2previous>
 ``` 
Binds value of range, to the receptacle above, sets the attribute 'value'. Works only in webcomponents.

   <bdl-range id="id3" min="10" max="100" step="2" default="50"></bdl-range> 
   <bdl-bind2previous fromid="id3" toid="id2"></bdl-bind2previous>

### FMI, bdl-fmi
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
  
### Beaker, bdl-beaker, bdl-beakercontrols
`<bdl-beaker></bdl-beaker>` Creates a beaker with controllable width and height

### Capillary, bdl-capillary
`<bdl-capillary></bdl-capillary>` Creates a capillary component with adjustable stoke

<bdl-capillary width="200" height="100" color="red" strokew="3"></bdl-capillary>
    
### Simplegif, bdl-simplegif
`<bdl-simplegif src="[filename.gif]" fromid="[id_to_listen]">` creates animated gif which is stopped by default and playing is enabled/disabled when an custom event 'fmistart'/'fmistop' are received from an element with id 'fromid'.

### Markdown
`<bdl-markdown src="[filename.md]"></bdl-markdown>` renders markdown - which may contain all the above webcomponents.
Markdown-it is used to render markdown with following plugins enabled: 
* highlight.js to highlight source code specifying language, e.g. Python 
 ```markdown
    ```javascript
     // some javascript code
    ``` 
```

```markdown
    ```python
    //some python code
    ```
```
* markdown-it-math to render math formula between `$$` or multiline `$$$` into MathML W3C standard.

Example:
```markdown
  Pythagoran theorem is $$a^2 + b^2 = c^2$$.
  
  Bayes theorem:

  $$$
  P(A | B) = (P(B | A)P(A)) / P(B)
  $$$
```
is rendered as:
Pythagoran theorem is $$a^2 + b^2 = c^2$$.

Bayes theorem:

$$$
P(A | B) = (P(B | A)P(A)) / P(B)
$$$

# References

[^1]: Web Components: https://developer.mozilla.org/en-US/docs/Web/Web_Components

[^2]: Dygraph: https://dygraphs.com
