### Animate objects exported from Adobe Animate 
This objects uses createJS library in order to control animation

**`bdl-animate-adobe`** renders the exporeted animation into the place

```xml
<bdl-animate-adobe 
    src="ZelezoCelek.js" 
    width="800"
    height="600"
    name="ZelezoCelek"
    fromid="id4" ></bdl-animate-adobe> 
``` 
* `src` - exported JS file from Adobe Animate
* `width` - width of the canvas (default 800px)
* `height` - height of the canvas (default 600px)
* `name` - name of the object exported in JS 
* `fromid` - component giving the data to animate.

**`bdl-animate-adobe-control`** displays play/stop and step button in order to control reffered animation.
Sends custom events `animatestart` and `animatestop`. The target elements should listen these events, usually by specifying `fromid`.
```xml
<bdl-animate-adobe-control
   id="id4"></bdl-animate-adobe-control>
   
```
** `bdl-bind2a` ** defines binding between FMU simulation variable and animation object value
* `findex` index of variable in fmu array
* `aname` name of animation component in AA (can go deep using dot `.` notation, see example bellow)
* `amin` (default = 0) minimal value in animate component
* `amax` (default = 100) maximal value in animate component
* `fmin` (optional) minimal value of variable from fmu model to be animated
* `fmax` (optional) maximal value of variable from fmu model to be animated
* `coeff` (optional default = 2) coefficient to set automatic fmin and fmax as 1/2 and 2x of first value which comes to animation
* `autoupdate` (optional default= 'false') if set to true - the fmin and fmax are updated if lower or higher value comes to animation.
* `convertor` optional convertor - in form of 'numerator,denominator' or '1/x' or 'some algebraic expression with x' (e.g.'x^2' or '365-1/x')
The conversion is made as linear approximation between amin and amax as following:
* $x<f_{min} \Rightarrow a_{min}$ 
* $f_{min} < x < f_{max} \Rightarrow a_{min} + \frac{(x-f_{min})(a_{max}-a_{min}}{f_{max}-f_{min}}$
* $f_{max} < x \Rightarrow a_{max}$

```
<bdl-bind2a findex="0" aname="ventricles.ventriclesTotal.VentricleLeft_anim" amin="100" amax="0" fmin="0.00007" fmax="0.00015"></bdl-bind2a>
<bdl-bind2a findex="6" aname="ValveMV_anim" amin="99" amax="0" fmin="0" fmax="1"></bdl-bind2a>
<bdl-bind2a findex="7" aname="ValveAOV_anim" amin="0" amax="99" fmin="0" fmax="1"></bdl-bind2a>
<bdl-bind2a findex="14" aname="ValveTV_anim" amin="99" amax="0" fmin="0" fmax="1"></bdl-bind2a>
<bdl-bind2a findex="15" aname="ValvePV_anim" amin="0" amax="99" fmin="0" fmax="1"></bdl-bind2a>

```

Example in grid 1/3 and 2/3:
<div class="w3-row">
  <div class="w3-third">
<bdl-animate-adobe-control id="id4"></bdl-animate-adobe-control>
  </div>
  <div class="w3-twothird">
<bdl-animate-adobe 
    src="ZelezoCelek.js" 
    width="1080"
    height="1080"
    name="ZelezoCelek"
    fromid="id4" ></bdl-animate-adobe>
  </div>
</div>
    
**`bdl-bind2a-text`** defines binding between FMU simulation variable and animation object value
* `findex` index of variable in fmu array
* `aname` name of animation component in AA (can go deep using dot `.` notation, see example bellow)
* `convertor` optional convertor - in form of 'numerator,denominator' or '1/x' or 'some algebraic expression with x' (e.g.'x^2' or '365-1/x'), displayed is converted value

```
<bdl-bind2a-text findex="8" aname="Hodnota5_text" convertor="1,0.237"></bdl-bind2a-text>
<bdl-bind2a-text findex="7" aname="Hodnota2Cerveny_text" convertor="1,3.612"></bdl-bind2a-text>
<bdl-bind2a-text findex="4" aname="Hodnota4_text" convertor="1,0.7428"></bdl-bind2a-text>
<bdl-bind2a-text findex="5" aname="Hodnota3_text" convertor="1,2.228"></bdl-bind2a-text>
<bdl-bind2a-text findex="18" aname="Hodnota9_text" convertor="1,1.51"></bdl-bind2a-text>   
```

**`bdl-bind2a-play`** defines binding between FMU simulation variable and playable animation object value
* `findex` index of variable in fmu array
* `aname` name of animation component in AA (can go deep using dot `.` notation, see example bellow)
* `limit` default `1e-12` - if the value of FMU variable goes over this limit, then animation is started - otherwise animation is stopped. 

```
<bdl-bind2a-play findex="8" aname="circle1"></bdl-bind2a-play>
<bdl-bind2a-play findex="7" aname="circle2" limit="1.5"></bdl-bind2a-play>
```
