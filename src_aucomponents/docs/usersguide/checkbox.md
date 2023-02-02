# Checkbox

attributes:
  * id - unique id - referenced by fmi component
  * default - default value
  * title - defautl title for all options (if titlemin and titlemax is not defined)
  * titlemin - title to be displayed when is unchecked
  * titlemax - title to be displayed when is checked
  
Example:  
```
<bdl-checkbox id="id1" default="true" titlemin="normal heart rate 60" titlemax="abnormal heart rate 180" min="60" max="180"></bdl-checkbox>
<bdl-checkbox id="id2" default="false" title="gene knockout"></bdl-checkbox>
<bdl-checkbox id="id3" title="gene knockout no-default"></bdl-checkbox>
```
<bdl-fmi id="id4" src="MeursFMI2.js" fminame="Physiolibrary_Hydraulic_Examples_MeursModel2011_HemodynamicsMeurs_0flatNorm"
               tolerance="0.000001" starttime="0" guid="{b3a357a4-da8c-4f00-b159-28ec2ea45e26}"
               valuereferences="637534281,637534272,33554436, 33554437, 33554432, 33554436, 33554437, 33554433, 16777313"
               valuelabels="Pressure in Aorta,Pressure in Left Ventricle, Intrathoracic Artery Volume, Extrathoracic Arteries Volume, Pulmonary Arteries Volume, Intrathoracic Veins Volume, Extrathoracic Veins volume, Pulmonary Veins Volume,Heart Rate"
               inputs="id1,16777313,60,1;id2,16777313,60,1;id3,16777313,60,1"></bdl-fmi>

<bdl-checkbox id="id1" default="true" titlemin="normal heart rate 60" titlemax="abnormal heart rate 180" min="60" max="180"></bdl-checkbox>
<bdl-checkbox id="id2" default="false" title="gene knockout"></bdl-checkbox>
<bdl-checkbox id="id3" title="gene knockout no-default"></bdl-checkbox>
