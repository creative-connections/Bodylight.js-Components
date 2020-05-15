# Hemodynamika kardiovaskulárního systému

Tato kapitola představí fyziologii pulsujícího kardiovaskulárního systému
 a patofyziologii některých vybraných stavů.


## Úvodní test

Nastavte tepovou frekvenci srdce

<bdl-range id="id1" min="40" max="180" step="1" default="60" title="Heart rate"></bdl-range>

Nyní můžete pustit nebo zastavit simulaci

<bdl-fmi id="id4" src="MeursFMI2.js" fminame="Physiolibrary_Hydraulic_Examples_MeursModel2011_HemodynamicsMeurs_0flatNorm"
               tolerance="0.000001" starttime="0" guid="{b3a357a4-da8c-4f00-b159-28ec2ea45e26}"
               valuereferences="637534281,637534272,33554436, 33554437, 33554432, 33554436, 33554437, 33554433, 16777313"
               valuelabels="Pressure in Aorta,Pressure in Left Ventricle, Intrathoracic Artery Volume, Extrathoracic Arteries Volume, Pulmonary Arteries Volume, Intrathoracic Veins Volume, Extrathoracic Veins volume, Pulmonary Veins Volume,Heart Rate"
               inputs="id1,16777313,1,60"></bdl-fmi>
               
V grafu je vidět tlak v aortě a levé komoře.

<bdl-dygraphchart width="600" height="300" fromid="id4" inputs="time,aorta pressure,ventricle pressure" refindex="0" refvalues="2"></bdl-dygraphchart>
