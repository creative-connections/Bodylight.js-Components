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
