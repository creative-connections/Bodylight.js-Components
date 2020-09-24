# Index
Demo:
# Hemodynamika
<div class="w3-row">
<div class="w3-half"> 
<sup>podle modelu Burkhoffa a spol.</sup>

Hemodynamika popisuje proudění krve jakožto vazké tekutiny 
z fyzikálního hlediska. Vzhledem ke složitosti krevního oběhu 
a neustálým změnám tlaku v důsledku tepajícího srdce je fyzikální a 
matematický popis docela složitá úloha. 
Oběhový systém je řízen mechanismy homeostázy podobně jako hydraulický systém.
Model dle Burkhoffa zjednodušuje krevní oběh na uzavřenou nevětvící se smyčku hydraulických 
komponent, jenž mají elastické a odporové vlastnosti.  
$$P = \frac{C}{V}$$

Tlačítky můžete pustit a zastavit simulaci, krokovat simulaci a resetovat simulátor:
<bdl-fmi id="id4" src="BurkhoffFMI.js" 
         fminame="Cardiovascular_Model_Burkhoff_HemodynamicsBurkhoff_0shallow"
         tolerance="0.000001" starttime="0" guid="{b5629132-3ba6-4153-87c2-f3ff108e1920}"
         valuereferences="33554435,637534265,637534241,637534290,16777312,637534466,637534294,637534268,33554438,637534345,33554436,637534290,33554437,637534323,637534348,637534374"
         valuelabels="Left Ventricle Volume,Pressure in Left Ventricle,Pressure in Aorta, Pressure in Left Atria, Heart Rate, LA elastance,MV open, AOV open, RV volume,RV pressure,LA volume, LA pressure, RA volume,RA pressure,TV open,PV open"         
         inputs="id1,16777312,1,60"></bdl-fmi>

<bdl-range id="id1" min="40" max="180" step="1" default="60" title="Srdeční tep:"></bdl-range>

Animace 

<bdl-animate-adobe 
    src="Faze_srdce.js" 
    width="335"
    height="480"
    name="Faze_srdce"
    fromid="id4" ></bdl-animate-adobe>
    
<bdl-bind2a findex="0" aname="ventricles.ventriclesTotal.VentricleLeft_anim" amin="100" amax="0" fmin="0.00007" fmax="0.00015"></bdl-bind2a>
<bdl-bind2a findex="6" aname="ValveMV_anim" amin="99" amax="0" fmin="0" fmax="1"></bdl-bind2a>
<bdl-bind2a findex="7" aname="ValveAOV_anim" amin="0" amax="99" fmin="0" fmax="1"></bdl-bind2a>
<bdl-bind2a findex="14" aname="ValveTV_anim" amin="99" amax="0" fmin="0" fmax="1"></bdl-bind2a>
<bdl-bind2a findex="15" aname="ValvePV_anim" amin="0" amax="99" fmin="0" fmax="1"></bdl-bind2a>
</div>
<div class="w3-half">
<bdl-chartjs-xy 
    id="id10" 
    width="400" 
    height="400" 
    fromid="id4" 
    labels="Left Ventricle Volume, Pressure in Left Ventricle" 
    initialdata=";;0,0.00015;0,28000;0,0.00015;0,1400" 
    refindex="0" 
    refvalues="2"></bdl-chartjs-xy>
<bdl-chartjs-time   
    id="id10"  
    width="700"  
    height="400"  
    fromid="id4"  
    labels="Pressure in Aorta,Pressure in Left Ventricle, Left Ventricle Volume" 
    refindex="1"  
    refvalues="3"></bdl-chartjs-time> 

</div>
</div>