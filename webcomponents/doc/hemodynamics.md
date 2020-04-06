# Hemodynamika kardiovaskulárního systému

Tato kapitola představí fyziologii pulsujícího kardiovaskulárního systému
 a patofyziologii některých vybraných stavů.


## Úvodní test

Nastavte tepovou frekvenci srdce

<bdl-range id="id1" min="40" max="180" step="1" default="60" title="Heart rate"></bdl-range><!-- slidervalue.bind="${myvalue}" ly.bind="${myvalue}"-->
<bdl-receptacle id="id2" hx="100" hy="100" px="50" py="50"></bdl-receptacle>
<bdl-bind2previous fromid="id1" toid="id2"></bdl-bind2previous>

Nyní můžete pustit nebo zastavit simulaci
`<bdl-fmisource src="MeursFMI.js"></bdl-fmisource>`

<bdl-fmi id="id4" fminame="MeursHemodynamics_Model_vanMeursHemodynamicsModel"
               tolerance="0.001" starttime="0" guid="{1cd90fb1-006b-4957-b1f2-012702efe021}"
               valuereferences="637534215,637534232,33554436,33554438,33554442,33554440,33554441,33554443"
               valuelabels="Pressure in Aorta,Pressure in Left Ventricle, Intrathoracic Artery Volume, Extrathoracic Arteries Volume, Pulmonary Arteries Volume, Intrathoracic Veins Volume, Extrathoracic Veins volume, Pulmonary Veins Volume,"
               inputs="id1,16777216"></bdl-fmi>

V grafu je vidět tlak v aortě a levé komoře.

<bdl-dygraphchart width="600" height="300" fromid="id4" inputs="time,aorta pressure,ventricle pressure" refindex="0" refvalues="2"></bdl-dygraphchart>

V grafu je vidět proporcionální rozložení objemu v krve v různých částech kardoivaskulárního systému.

<bdl-chartjs id="id9" width="100" height="100" fromid="id4" type="doughnut" labels="Intrathoracic Arteries,ExtraThoracic Arteries, Pulmonary Arteries, Intrathoracic Veins, Extrathoracic veins, Pulmonary Veins" refindex="2" refvalues="6"></bdl-chartjs>
 
