# Grafy
<sup>Příklady grafů</sup>
<bdl-fmi id="id4" src="BurkhoffFMI.js" 
         fminame="Cardiovascular_Model_Burkhoff_HemodynamicsBurkhoff_0shallow"
         tolerance="0.000001" starttime="0" guid="{b5629132-3ba6-4153-87c2-f3ff108e1920}"
         valuereferences="33554435,637534265,637534241,637534290,16777312"
         valuelabels="Left Ventricle Volume,Pressure in Left Ventricle,Pressure in Aorta, Pressure in Left Atria, Heart Rate"
         inputs="id1,16777312,1,60"></bdl-fmi>

<bdl-range id="id1" min="40" max="180" step="1" default="60" title="Srdeční tep:"></bdl-range>


<div class="w3-row">
<div class="w3-half">
chartjs-xy with borders 
<bdl-chartjs-xy id="id10" width="400" 
  height="400" 
  fromid="id4" 
  labels="Pressure in Left Ventricle, Left Ventricle Volume,Horní limit,Dolní limit" 
  initialdata=";;0,0.00015;0,28000;0,0.00015;0,1400" 
  refindex="0" 
  refvalues="2"></bdl-chartjs-xy>
  </div>
  <div class="w3-half"> 
  chartjs-time
<bdl-chartjs-time   
  id="id10"  
  width="700"  
  height="400"  
  fromid="id4"  
  labels="Pressure in Aorta,Pressure in Left Ventricle,Pressure in Left Atria" 
  initialdata="0,1,2,3,4;2,2,2,2;3,2,4;1,5,3;2,2,3,2"  
  refindex="1"  
  refvalues="3" 
  ylabel="tlak (mmHg)"
  xlabel="čas (s)"
  convertors="0.00750062,1;0.00750062,1;0.00750062,1"></bdl-chartjs-time> 

</div>
</div>
