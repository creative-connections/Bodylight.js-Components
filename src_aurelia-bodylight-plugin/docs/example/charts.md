# Grafy
<sup>Příklady grafů</sup>
<bdl-fmi id="id4" src="BurkhoffFMI.js" 
         fminame="Cardiovascular_Model_Burkhoff_HemodynamicsBurkhoff_0shallow"
         tolerance="0.000001" starttime="0" guid="{b5629132-3ba6-4153-87c2-f3ff108e1920}"
         valuereferences="33554435,637534265,637534241,637534290,16777312,33554435,33554433,33554436"
         valuelabels="Left Ventricle Volume,Pressure in Left Ventricle,Pressure in Aorta, Pressure in Left Atria, Heart Rate,lvv,cas.volume,la.volume"
         inputs="id1,16777312,1,60;ids1,16777312,1,60"></bdl-fmi>
Range:
<bdl-range id="id1" min="40" max="180" step="1" default="60" title="Srdeční tep:"></bdl-range>
Smooth range:
<bdl-range-smooth2 id="ids1" min="40" max="180" step="1" default="60" title="Srdeční tep:" fromid="id4"></bdl-range-smooth2>

<div class="w3-row">

<div class="w3-quarter">

chartjs-stacked

<bdl-chartjs-stacked  id="id11"  width="300"  height="200"  fromid="id4"  refindex="1"  refvalues="3" stacks="anionty,anionty,kationty"
  labels="Na+,K+,CL-"> </bdl-chartjs-stacked>

chartjs-xy with borders 

<bdl-chartjs-xy id="id10" width="300" height="200" fromid="id4" labels="Pressure in Left Ventricle, Left Ventricle Volume,Horní limit,Dolní limit" 
  initialdata=";;0,0.00015;0,28000;0,0.00015;0,1400" refindex="0" refvalues="2" throttle="0"></bdl-chartjs-xy>

chartjs-fixed colorindex=1

<bdl-chartjs-fixed id="id11" width="300" height="200" fromid="id4" refindex="1" refvalues="3" 
maxdata="40" colorindex="1" refpointindex="2" > </bdl-chartjs-fixed>

chartjs-fixed-xy colorindex=1

<bdl-chartjs-fixed-xy id="id11" width="300" height="200" fromid="id4" refindex="1" refvalues="3"
maxdata="40" colorindex="1" xrefindex="5" xrefvalues="3" refpointindex="2" xrefpointindex="6" xtofixed="5" > </bdl-chartjs-fixed>

chartjs-fixed-xy colorindex=1 2 datasets

<bdl-chartjs-fixed-xy id="id11" width="300" height="200" fromid="id4" refindex="1" refvalues="3" refindex2="2" refvalues2="3"
maxdata="40" colorindex="1" xrefindex="5" xrefvalues="3" refpointindex="2" xrefpointindex="6" xtofixed="5" > </bdl-chartjs-fixed>

</div>

<div class="w3-quarter"> 
  value
<bdl-value fromid="id4" refindex="1" convertors="0.00750062,1,0"></bdl-value>
  chartjs-time without throttle
<bdl-chartjs-time   
  id="id10"  
  width="300"  
  height="400"  
  fromid="id4"  
  labels="Pressure in Aorta,Pressure in Left Ventricle,Pressure in Left Atria" 
  initialdata="0,1,2,3,4;2,2,2,2;3,2,4;1,5,3;2,2,3,2"  
  refindex="1"  
  refvalues="3" 
  ylabel="tlak (mmHg)"
  xlabel="čas (s)"
  convertors="0.00750062,1;0.00750062,1;0.00750062,1"
  throttle="0"></bdl-chartjs-time> 
chartjs-fixed
<bdl-chartjs-fixed
  id="id11" 
  width="300" 
  height="200" 
  fromid="id4" 
  refindex="1" 
  refvalues="3"
  maxdata="40"
></bdl-chartjs-fixed>

chartjs-fixed colorindex=2

<bdl-chartjs-fixed id="id12" width="300" height="200" fromid="id4" refindex="1" refvalues="3" 
maxdata="40" colorindex="2"></bdl-chartjs-fixed>


</div>
<div class="w3-quarter">
chartjs-fixed colorindex=3

<bdl-chartjs-fixed id="id12" width="300" height="200" fromid="id4" refindex="1" refvalues="3"
maxdata="40" colorindex="3"></bdl-chartjs-fixed>
chartjs-fixed colorindex=4

<bdl-chartjs-fixed id="id12" width="300" height="200" fromid="id4" refindex="1" refvalues="3"
maxdata="40" colorindex="4"></bdl-chartjs-fixed>
chartjs-fixed colorindex=5

<bdl-chartjs-fixed id="id12" width="300" height="200" fromid="id4" refindex="1" refvalues="3"
maxdata="40" colorindex="5"></bdl-chartjs-fixed>

</div>
<div class="w3-quarter">
chartjs-fixed colorindex=6 no throttle

<bdl-chartjs-fixed id="id12" width="300" height="200" fromid="id4" refindex="1" refvalues="3"
maxdata="40" colorindex="6"></bdl-chartjs-fixed>
chartjs-fixed colorindex=7 no throttle

<bdl-chartjs-fixed id="id12" width="300" height="200" fromid="id4" refindex="1" refvalues="3"
maxdata="40" colorindex="7"></bdl-chartjs-fixed>
chartjs-fixed colorindex=8 no throttle

<bdl-chartjs-fixed id="id12" width="300" height="200" fromid="id4" refindex="1" refvalues="3"
maxdata="40" colorindex="8"></bdl-chartjs-fixed>
</div>
</div>
