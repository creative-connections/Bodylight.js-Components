# Grafy
<sup>Příklady grafů</sup>
<bdl-fmi id="id4" src="BurkhoffFMI.js" 
         fminame="Cardiovascular_Model_Burkhoff_HemodynamicsBurkhoff_0shallow"
         tolerance="0.000001" starttime="0" guid="{b5629132-3ba6-4153-87c2-f3ff108e1920}"
         valuereferences="33554435,637534265,637534241,16777312"
         valuelabels="Left Ventricle Volume,Pressure in Left Ventricle,Pressure in Aorta, Heart Rate"
         inputs="id1,16777312,1,60"></bdl-fmi>

<bdl-range id="id1" min="40" max="180" step="1" default="60" title="Srdeční tep:"></bdl-range>

## Chartjs xy
```xml
<bdl-chartjs-xy id="id10" 
                  width="300" 
                  height="100" 
                  fromid="id4" 
                  labels="Pressure in Left Ventricle, Left Ventricle Volume"
                  initialdata="0,1,2,3,4,3,2,1;2,2,2,3,5,8,6,4" 
                  refindex="0"   
                  refvalues="2"></bdl-chartjs-xy>
```
<bdl-chartjs-xy id="id10" 
                  width="300" 
                  height="100" 
                  fromid="id4" 
                  labels="Pressure in Left Ventricle, Left Ventricle Volume"
                  initialdata="0;0"                   
                  refindex="0"   
                  refvalues="2"></bdl-chartjs-xy>
## Chartjs time                  
```xml
<bdl-chartjs-time id="id10" width="300" height="100" fromid="id4" 
  labels="Pressure in Aorta,Pressure in Left Ventricle, Left Ventricle Volume"
  initialdata="0,1,2,3,4;2,2,2,2;3,2,4;1,5,3;2,2,3,2" 
  refindex="0" refvalues="3"></bdl-chartjs-time>
```

<bdl-chartjs-time  
  id="id10" 
  width="300" 
  height="100" 
  fromid="id4" 
  labels="Pressure in Aorta,Pressure in Left Ventricle, Left Ventricle Volume"
  initialdata="0,1,2,3,4;2,2,2,2;3,2,4;1,5,3;2,2,3,2" 
  refindex="1"   
  refvalues="2"></bdl-chartjs-time>
