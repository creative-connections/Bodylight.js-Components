# Oneshot mode

Performs simulation from starttime to stoptime if the input parameters change `<bdl-fmi ... mode="oneshot" starttime="0" stoptime="2" fstepsize="0.01">`

<bdl-fmi id="id4" src="BurkhoffFMI.js"
fminame="Cardiovascular_Model_Burkhoff_HemodynamicsBurkhoff_0shallow"
tolerance="0.0000001" guid="{b5629132-3ba6-4153-87c2-f3ff108e1920}"
valuereferences="33554435,637534265,637534241,637534290,16777312"
valuelabels="Left Ventricle Volume,Pressure in Left Ventricle,Pressure in Aorta, Pressure in Left Atria, Heart Rate"
inputs="id1,16777312,1,60;idlve,16777310,2.053e+8,100,t;idlve,16777306,3.333e+7,100,t;idlve,16777302,5.066e+7,100,t;idlve,16777298,2.666e+7,100,t" mode="oneshot" starttime="0" stoptime="10" fstepsize="0.05"></bdl-fmi>

<bdl-range id="id1" min="40" max="180" step="1" default="60" title="Srdeční tep:"></bdl-range>

Cardiac inotropy:<bdl-range id="idlve" title="(%)" min="50" max="200" default="100" step="0.1"></bdl-range>


<div class="w3-row">
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
chartjs-fixed
<bdl-chartjs-fixed
  id="id11"
  width="700"
  height="400"
  fromid="id4"
  refindex="1"
  refvalues="3"
  maxdata="40"
></bdl-chartjs-fixed>

</div>
</div>
