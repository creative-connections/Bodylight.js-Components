## User's guide 

These webcomponents are available:

* `<bdl-range></bdl-range>` Renders a range input which may trigger a value
* `<bdl-value></bdl-value>` Renders value of attribute `value` into DOM, it can be bind as output from FMI.
* `<bdl-bind2previous></bdl-bind2previous>` Binds values of 2 components 
* `<bdl-fmi></bdl-fmi>` Creates control buttons in order to control simulation of the model
* `<bdl-receptacle></bdl-receptacle>` Renders a receptacle graphics which is full or empty based on the values provided
* `<bdl-dygraph></bdl-dygraph>` Creates a graph controlled by Dygraph library [^2]
* `<bdl-chartjs></bdl-chartjs>` Creates a chartjs element controlled by Chartjs library.


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
<body aurelia-app="webcomponents">
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

### Value, bdl-value
`<bdl-value>` renders numerical value 
  * `fromid='id4'` ID of component which will be listened for events `fmidata`
  * `refindex=8` reference index of value sent by `fmidata` event
  * `numerator=1` numerator to normalize value
  * `denominator=1` denominator to normalize value `x=value*numerator/denominator`
Example: 
`<bdl-value fromid="id4" refindex="8"></bdl-value>`

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
  * `src` (optional) specifies script with FMU JS to be loaded.  If not specified, it is expected that some `<script src='fmi.js'>` is already included in HTML head. FMU JS is output of FMU compiler.
  * `tolerance` tolerance of the solver (default 0.001)
  * `starttime` start time of the simulation (default 0)
  * `guid` guid as it appears in FMU model description
  * `valuereferences` references to variables, custom event 'fmidata' with `event.detail` set to  `{time: number , data:[number,...]}` where time is timepoint of the current simulation step and data is array of values in same order as in 
  valuereferences
  * `inputs` id of component, value reference, optional nominator,denominator to normalize `value * nominator / denominator` all delimited by coma`,`, other inputs delimited by semicolon `;` e.g. `inputs="id1,1677323,1,60;id2,16725364"` cause that the value from id1 will be converted `x= valueid1 *1/60` and value from id2 `x = valueid2*1/1` ; 
  * `otherinputs` ids of components which triggers custom event 'fmiinput', it is expected that in event.detail contains 
  this structure `{ valuereference: number, value: number }`
  
### Beaker, bdl-beaker, bdl-beakercontrols
`<bdl-beaker></bdl-beaker>` Creates a beaker with controllable width and height
  * `bwidht` - width of the beaker in pixels, number 
  * `bheight` - height of the beaker in pixels, number
  * `width` -  width of the canvas view, number
  * `height` -  height of the canvas view, number
  * `color` - color, can be text or css style color

Example:

`<bdl-beaker bwidth="10" bheight="50" id="id8" color="pink" width="100" height="100"></bdl-beaker>`

<bdl-beaker bwidth="10" bheight="50" id="id8" color="pink" width="100" height="100"></bdl-beaker>

`<bdl-beakercontrols></bdl-beakercontrols>` creates ranges for beaker width and height
  * `bwidht` - width of the beaker in pixels, number
  * `bwidhtmin` - minimum width of the beaker in pixels, number
  * `bwidhtmax` - maximum width of the beaker in pixels, number 
  * `bheight` - height of the beaker in pixels, number
  * `bheightmin` - minimum height of the beaker in pixels, number
  * `bheightmax` - maximum height of the beaker in pixels, number
  * `width` -  width of the canvas view, number
  * `height` -  height of the canvas view, number
  * `color` - color, can be text or css style color
  
Example:

`<bdl-beakercontrols bwidth="10" bwidthmin="5" bwidthmax="100" bheight="50" bheightmin="10" bheightmax="100" id="id8" color="pink"  width="100" height="100"></bdl-beakercontrols>`

<bdl-beakercontrols bwidth="10" bwidthmin="5" bwidthmax="100" bheight="50" bheightmin="10" bheightmax="100" id="id8" color="pink" width="100" height="100"></bdl-beakercontrols>  
  
### Capillary, bdl-capillary
`<bdl-capillary></bdl-capillary>` Creates a capillary component with adjustable stoke

<bdl-capillary width="200" height="100" color="red" strokew="3"></bdl-capillary>
    
### Simplegif, bdl-simplegif
`<bdl-simplegif src="[filename.gif]" fromid="[id_to_listen]">` creates animated gif which is stopped by default and playing is enabled/disabled when an custom event 'fmistart'/'fmistop' are received from an element with id 'fromid'.

### Dygraph
`<bdl-dygraph></bdl-dygraph>` Creates a graph controlled by Dygraph library [^2]

### ChartJS
`<bdl-chartjs></bdl-chartjs>` Creates a chartjs element controlled by Chartjs library.


### Markdownnav
`<bdl-markdownnav src=""></bdl-markdownnav>"` renders navigation menu based on MD list. MD should contain only list.
All links should

### Markdown
`<bdl-markdown src="[filename.md]" watchhash="true|false"></bdl-markdown>` renders markdown - which may contain all the above webcomponents.
* `watchhash` if specified, then parameter in URL after hash is scanned and taken loaded instead `src`. The changes in hash are listened and document is replaced on change.

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
* markdown-it-katex to render math formula between `$` or multiline `$$` using KaTEX and HTML.

Example:
```markdown
  Pythagoran theorem is $a^2 + b^2 = c^2$.
  
  
```
is rendered as:

Inline pythagoran theorem is $a^2 + b^2 = c^2$.
Pythagoran theorem is 
$$a^2 + b^2 = c^2$$

### markdown nav
`<bdl-markdownnav>` renders navigation

### markdown book, markdown app
`<bdl-markdown-book>` renders vertical navigation sidebar on the left,
  * `index` - index MD to be shown as content
  * `summary` - navigation MD - navigation sidebar is rendered per list in it

`<bdl-markdown-app>` renders horizontal navigation menu on top
  * `index` - index MD to be shown as content
  * `summary` - navigation MD - navigation sidebar is rendered per list in it

### Audio on increase or decrease, bdl-audio-on-increase, bdl-audio-on-decrease
`<bdl-audio-on-increase>` plays MP3 sound when a selected model variable value increases and achieves a threshold. When the threshold is achieved the sound is played once until the value falls bellow threshold again.
`<bdl-audio-on-decrease>` plays MP3 sound when a selected model variable value decreases and achieves a threshold. When the threshold is achieved the sound is played once until the value raises above threshold again.
Attributes:
  * same as `<bdl-value>`
  * `src` url to MP3 file to be played
  * `threshold` value to be achieved, triggers sound play

`<bdl-sound-on-increase>` plays MP3 sound when a selected model variable value decreases and achieves a threshold. When the threshold is achieved the sound is played once until the value raises above threshold again.
Attributes:
  * same as `<bdl-audio-on-increase>`
  * `freq` frequency in Hz - set integer
  * `volume` set volume between 0-1. Default 0.5
  
Example
```html

<bdl-audio-on-increase src="doc/monitor-beep.mp3" thresholdvalue="1e+7" fromid="id4" refindex="8">
  audio-on-increase not supported
</bdl-audio-on-increase>


<bdl-audio-on-decrease src="doc/monitor-beep.mp3" thresholdvalue="1e+7" fromid="id4" refindex="8">
  audio-on-decrease not supported
</bdl-audio-on-decrease>

<bdl-sound-on-increase 
  thresholdvalue="1e+7" fromid="id4" refindex="8" freq="440" volume="0.3">
  sound-on-decrease not supported
</bdl-audio-on-increase> 

```
 
