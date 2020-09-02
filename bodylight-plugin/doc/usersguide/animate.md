### bdl-animate-gif
```xml
<bdl-animate-gif src="doc/heart.gif" fromid="id4" ></bdl-animatedheart> 
```

Animates gif, starts and stops animation per events fmistart and fmistop from DOM id defined in attribute`fromid`.
 

```xml
<bdl-animate-sync-gif src="doc/heart.gif" fromid="id4" 
thresholdvalue="1e+7" refindex="8" ></bdl-animatedheart> 
```
Animates gif like previous, but synchronizes the animation loop with simulation loop.
I.e. all animation frames are equally distributed among simulation cycle - start is determined by 
refindex and thresholdvalue, and length is determined by simulationframes per cycle.

```xml
<bdl-animate-control 
id="id5" 
fromid="id4" 
speedfactor="20" 
segments="3;5;14;17;29" 
segmentlabels="4b plnění atriální systola;1 systola komor - isovolumická kontrakce;2 systola komor - ejekce;3 isovolumická relaxace;4a plnění" 
segmentcond="6,eq,0;7,eq,1;7,eq,0;6,eq,1;5,gt,0.001">

</bdl-animate-control>
```

Controls animation, defines segments - frames where animation changes state
labels which are presented and condition when met, simulation or animation is stopped.

