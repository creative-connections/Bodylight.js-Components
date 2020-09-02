# Hemodynamika 
<sup>podle modelu Burkhoffa a spol.</sup>

Hemodynamika popisuje proudění krve jakožto vazké tekutiny 
z fyzikálního hlediska. Vzhledem ke složitosti krevního oběhu 
a neustálým změnám tlaku v důsledku tepajícího srdce je fyzikální a 
matematický popis docela složitá úloha. 
Oběhový systém je řízen mechanismy homeostázy podobně jako hydraulický systém.
Model dle Burkhoffa zjednodušuje krevní oběh na uzavřenou nevětvící se smyčku hydraulických 
komponent, jenž mají elastické a odporové vlastnosti.  

Tlačítky můžete pustit a zastavit simulaci, krokovat simulaci a resetovat simulátor:
<bdl-fmi id="id4" src="BurkhoffFMI.js" 
         fminame="Cardiovascular_Model_Burkhoff_HemodynamicsBurkhoff_0shallow"
         tolerance="0.000001" starttime="0" guid="{b5629132-3ba6-4153-87c2-f3ff108e1920}"
         valuereferences="33554435,637534265,637534241,16777312"
         valuelabels="Left Ventricle Volume,Pressure in Left Ventricle,Pressure in Aorta, Heart Rate"
         inputs="id1,16777312,1,60"></bdl-fmi>

<bdl-range id="id1" min="40" max="180" step="1" default="60" title="Srdeční tep:"></bdl-range>

| PV diagram | Tlaky v komoře a aortě |
| ---------- | ------------ |
| <bdl-chartjs-xy id="id10" width="400" height="400" fromid="id4" labels="Pressure in Left Ventricle, Left Ventricle Volume" initialdata=";;0,0.00015;0,28000;0,0.00015;0,1400" refindex="0" refvalues="2"></bdl-chartjs-xy> | <bdl-chartjs-time   id="id10"  width="700"  height="400"  fromid="id4"  labels="Pressure in Aorta,Pressure in Left Ventricle, Left Ventricle Volume" refindex="1"  refvalues="2"></bdl-chartjs-time> |
