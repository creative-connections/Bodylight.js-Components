## ChartJS time with error band
<div class="w3-row">
  <div class="w3-half">

`<bdl-chartjs-time></bdl-chartjs-time>` time series in chartjs.

<bdl-chartjs-time-error  
  id="id10" 
  width="600" 
  height="300" 
  fromid="id2" 
  labels="x,,,xx,,"
  initialdata="0,1,2,3,4;2,2.1,2.2,2.3,2.4;2.1,2.15,2.3,2.35,2.5;1.9,1.95,2,2.1,2.15;1,1.1,1.2,3.3,1.4;1.1,1.15,1.3,3.35,1.5;0.9,0.95,1,3.1,1.15" 
  refindex="2"   
  refvalues="6" responsive="true"></bdl-chartjs-time-error>

  </div>
  <div class="w3-rest">
Example:

```xml
<bdl-chartjs-time-error  
  id="id10" 
  width="600" 
  height="300" 
  fromid="id2" 
  labels="x,,,xx,,"
  initialdata="0,1,2,3,4;2,2.1,2.2,2.3,2.4;2.1,2.15,2.3,2.35,2.5;1.9,1.95,2,2.1,2.15;1,1.1,1.2,3.3,1.4;1.1,1.15,1.3,3.35,1.5;0.9,0.95,1,3.1,1.15" 
  refindex="2"   
  refvalues="6" responsive="true"></bdl-chartjs-time-error>

```

## animation

<bdl-fmi id="id4" src="BurkhoffFMI.js" 
         fminame="Cardiovascular_Model_Burkhoff_HemodynamicsBurkhoff_0shallow"
         tolerance="0.000001" starttime="0" guid="{b5629132-3ba6-4153-87c2-f3ff108e1920}"
         valuereferences="33554435,637534265,637534241,637534290,16777312,33554435,33554433,33554436"
         valuelabels="Left Ventricle Volume,Pressure in Left Ventricle,Pressure in Aorta, Pressure in Left Atria, Heart Rate,lvv,cas.volume,la.volume"
         inputs="id1,16777312,1,60;ids1,16777312,1,60"></bdl-fmi>
Range:
<bdl-range id="id1" min="40" max="180" step="1" default="60" title="Srdeční tep:"></bdl-range>


<bdl-chartjs-time-error  
  id="id11" 
  width="600" 
  height="300" 
  fromid="id4" 
  labels="p,,"
  initialdata="0,1,2,3,4;2,2.1,2.2,2.3,2.4;2.1,2.15,2.3,2.35,2.5;1.9,1.95,2,2.1,2.15;1,1.1,1.2,3.3,1.4;1.1,1.15,1.3,3.35,1.5;0.9,0.95,1,3.1,1.15" 
  refindex="1"   
  refvalues="3" responsive="true"></bdl-chartjs-time-error>