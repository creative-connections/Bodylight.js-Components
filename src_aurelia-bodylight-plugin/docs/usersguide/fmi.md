
### FMI, bdl-fmi
`<bdl-fmi></bdl-fmi>` Creates control buttons in order to control simulation of the model. With these attributes:
  * `fminame` name of the model as it exactly appears in exported JS,WASM code
  * `src` (optional) specifies script with FMU JS to be loaded.  If not specified, it is expected that some `<script src='bdl-fmi.js'>` is already included in HTML head. FMU JS is output of FMU compiler.
  * `tolerance` tolerance of the solver (default 0.001)
  * `starttime` start time of the simulation (default 0)
  * `stoptime` if defined, then simulation stops after the time is reached
  * `stepsperframe`(default 1), to achieve better performance, you may increase number of steps per frame, otherwise 1 step is performed, maximum 60FPS are offered by browser.
  * `guid` guid as it appears in FMU model description
  * `valuereferences` references to variables, custom event 'fmidata' with `event.detail` set to  `{time: number , data:[number,...]}` where time is timepoint of the current simulation step and data is array of values in same order as in 
  valuereferences
  * `inputs` id of component, value reference, optional nominator,denominator,addend to normalize `value * nominator / denominator + addend` all delimited by coma`,`, other inputs delimited by semicolon `;` e.g. `inputs="id1,1677323,1,60;id2,16725364"` cause that the value from id1 will be converted `x= valueid1 *1/60` and value from id2 `x = valueid2*1/1` ;
  * `eventlisten` event to listen on input elements - default "input" event - change is fired hen e.g. cursor is moved. You may change it to "change" - it is fired only when user drops the vlaue/ confirms the change. 
  * `otherinputs` ids of components which triggers custom event 'fmiinput', it is expected that in event.detail contains 
  this structure `{ valuereference: number, value: number }`
  * `showcontrols` - default `true`, shows/hides basic control buttons to start/stop/restart simulation
  * `fpslimit` - 1-60, default 60 = unlimited (default FPS allowed by browser). This attribute will limit the frames per second
  * `mode` - if set to `oneshot` then controls are not shown and simulation step is performed after load and after a value is changed, default `continuous` mode means control buttons start stop simulation 

  and for values <60 will introduce some artificial delay to reduce framerate to the desired value. The limiting range is also available in UI.  

Example:
```xml
<bdl-fmi id="id4" src="MeursFMI2.js" fminame="Physiolibrary_Hydraulic_Examples_MeursModel2011_HemodynamicsMeurs_0flatNorm"
               tolerance="0.000001" starttime="0" guid="{b3a357a4-da8c-4f00-b159-28ec2ea45e26}"
               valuereferences="637534281,637534272,33554436, 33554437, 33554432, 33554436, 33554437, 33554433, 16777313"
               valuelabels="Pressure in Aorta,Pressure in Left Ventricle, Intrathoracic Artery Volume, Extrathoracic Arteries Volume, Pulmonary Arteries Volume, Intrathoracic Veins Volume, Extrathoracic Veins volume, Pulmonary Veins Volume,Heart Rate"
               inputs="id1,16777313,1,60"></bdl-fmi>
```
<bdl-fmi id="id4" src="MeursFMI2.js" fminame="Physiolibrary_Hydraulic_Examples_MeursModel2011_HemodynamicsMeurs_0flatNorm"
               tolerance="0.000001" starttime="0" guid="{b3a357a4-da8c-4f00-b159-28ec2ea45e26}"
               valuereferences="637534281,637534272,33554436, 33554437, 33554432, 33554436, 33554437, 33554433, 16777313"
               valuelabels="Pressure in Aorta,Pressure in Left Ventricle, Intrathoracic Artery Volume, Extrathoracic Arteries Volume, Pulmonary Arteries Volume, Intrathoracic Veins Volume, Extrathoracic Veins volume, Pulmonary Veins Volume,Heart Rate"
               inputs="id1,16777313,1,60"></bdl-fmi>
  
