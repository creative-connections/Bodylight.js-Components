# Hemodynamika 
<sup>podle modelu Meurse a spol.</sup>

Hemodynamika popisuje proudění krve jakožto vazké tekutiny 
z fyzikálního hlediska, což je vzhledem ke složitosti krevního oběhu 
a neustálým změnám tlaku velmi složitá úloha. 
Oběhový systém je řízen mechanismy homeostázy podobně jako hydraulický systém.
Model dle Meurse zjednodušuje krevní oběh na uzavřenou nevětvící se smyčku hydraulických 
komponent, jenž mají elastické a odporové vlastnosti.

Tlačítky můžete pustit a zastavit simulaci, krokovat simulaci a resetovat simulátor:   
<bdl-fmi id="id4" src="MeursFMI2.js" fminame="Physiolibrary_Hydraulic_Examples_MeursModel2011_HemodynamicsMeurs_0flatNorm"
               tolerance="0.000001" starttime="0" guid="{b3a357a4-da8c-4f00-b159-28ec2ea45e26}"
               valuereferences="637534281,637534272,33554436, 33554437, 33554432, 33554436, 33554437, 33554433, 16777313"
               valuelabels="Pressure in Aorta,Pressure in Left Ventricle, Intrathoracic Artery Volume, Extrathoracic Arteries Volume, Pulmonary Arteries Volume, Intrathoracic Veins Volume, Extrathoracic Veins volume, Pulmonary Veins Volume,Heart Rate"
               inputs="id1,16777313,1,60"></bdl-fmi>

Můžete nastavit tepovou frekvenci srdce:
<bdl-range id="id1" min="40" max="180" step="1" default="60" title=""></bdl-range>
               
V grafu je vidět tlak v aortě a levé komoře.
<div class="w3-row">
<div class="w3-third">
dygraph:
<bdl-dygraphchart width="300" height="100" fromid="id4" inputs="time,aorta pressure,ventricle pressure" refindex="0" refvalues="2"></bdl-dygraphchart>
</div>
<div class="w3-third">
chartjs mmHg:
<!--bdl-chartjs-time width="300" height="100" fromid="id4" refindex="0" refvalues="2" convertors="1,133.322368;x*0.0075006183"></bdl-chartjs-time-->
<bdl-chartjs-time width="300" height="100" fromid="id4" refindex="0" refvalues="2" convertors="1,133.322368;1,133.322368"></bdl-chartjs-time>

chartjs scatter:
<bdl-chartjs-xy-points atitle="Přidat body" rtitle="Odebrat body" min="0" max="20000" xmin="0" xmax="20000" width="300" height="100" fromid="id4" refindex="0" refvalues="3" convertors="1,133.322368;1,133.322368"></bdl-chartjs>

</div>
<div class="w3-third">
plotly
<bdl-plotly fromid="id4" refindex="0" refvalues="2" width="500"></bdl-plotly>
</div></div>





