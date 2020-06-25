# Grafy
<sup>Příklady grafů</sup>


<bdl-fmi id="id4" src="BurkhoffFMI.js" 
         fminame="Cardiovascular_Model_Burkhoff_HemodynamicsBurkhoff_0shallow"
         tolerance="0.000001" starttime="0" guid="{b5629132-3ba6-4153-87c2-f3ff108e1920}"
         valuereferences="33554435,637534265,637534241,637534290,16777312,637534466,637534294,637534268"
         valuelabels="Left Ventricle Volume,Pressure in Left Ventricle,Pressure in Aorta, Pressure in Left Atria, Heart Rate, LA elastance,MV open, AOV open"
         inputs="id1,16777312,1,60"
         controlid="id5"></bdl-fmi>

<bdl-range id="id1" min="40" max="180" step="1" default="60" title="Srdeční tep:"></bdl-range>

| Chartjs xy with borders | Chartjs time-series |
| ---------- | ------------ |
| <bdl-chartjs-xy id="id10" width="400" height="400" fromid="id4" labels="Pressure in Left Ventricle, Left Ventricle Volume" initialdata=";;0,0.00015;0,28000;0,0.00015;0,1400" refindex="0" refvalues="2"></bdl-chartjs-xy> | <bdl-chartjs-time   id="id11"  width="700"  height="400"  fromid="id4"  labels="Pressure in Aorta,Pressure in Left Ventricle, Left Ventricle Volume" refindex="1"  refvalues="3"></bdl-chartjs-time> | 
| <bdl-chartjs-time id="12" width="400" fromid="id4" labels="LA elastance" refindex="5" refvalues="1"></bdl-chartjs-time> | <bdl-animate-gif fromid="id5" src="doc/heart.gif"></bdl-animate-gif> |  
<bdl-animate-control id="id5" fromid="id4" speedfactor="20" segments="3;5;14;17;29" segmentlabels="4b plnění atriální systola;1 systola komor - isovolumická kontrakce;2 systola komor - ejekce;3 isovolumická relaxace;4a plnění" segmentcond="6,eq,0;7,eq,1;7,eq,0;6,eq,1;5,gt,100000" simsegments="14;24;35;52;76"></bdl-animate-control>


