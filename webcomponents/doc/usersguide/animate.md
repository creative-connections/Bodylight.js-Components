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
