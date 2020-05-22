# Hemodynamika 
<sup>podle modelu Burkhoffa a spol.</sup>

Hemodynamika popisuje proudění krve jakožto vazké tekutiny 
z fyzikálního hlediska, což je vzhledem ke složitosti krevního oběhu 
a neustálým změnám tlaku velmi složitá úloha. 
Oběhový systém je řízen mechanismy homeostázy podobně jako hydraulický systém.
Model dle Burkhoffa zjednodušuje krevní oběh na uzavřenou nevětvící se smyčku hydraulických 
komponent, jenž mají elastické a odporové vlastnosti. Oproti modelu dle Meurse je 
jiný matematický popis proměnné elasticity srdečních síní a komor. 

Tlačítky můžete pustit a zastavit simulaci, krokovat simulaci a resetovat simulátor:   
<bdl-fmi id="id4" src="BurkhoffFMI.js" 
         fminame="Cardiovascular_Model_Burkhoff_HemodynamicsBurkhoff_0shallow"
         tolerance="0.000001" starttime="0" guid="{b5629132-3ba6-4153-87c2-f3ff108e1920}"
         valuereferences="637534241,637534265,16777312"
         valuelabels="Pressure in Aorta,Pressure in Left Ventricle,Heart Rate"
         inputs="id1,16777312,1,60"></bdl-fmi>

Můžete nastavit tepovou frekvenci srdce:
<bdl-range id="id1" min="40" max="180" step="1" default="60" title="Heart rate"></bdl-range>
               
V grafu je vidět tlak v aortě a levé komoře:
<bdl-dygraphchart width="600" height="300" fromid="id4" inputs="time,aorta pressure,ventricle pressure" refindex="0" refvalues="2"></bdl-dygraphchart>
