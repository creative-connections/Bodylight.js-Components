# ReadData

```
<bdl-readdata 
  ids="id11" 
  url="http://localhost:5000/devicedata" 
  display="true" 
  timeout="1000">
</bdl-readdata>
```

Reads data from `url` every `timeout` milliseconds, displays data in a view if `display="true"` otherwise the view is hidden and the value might be used 
as an input for fmi component as input element with id's `ids` separated by comma.
The endpoint should have CORS enabled - return HTTP headers 'Access-Control-Allow-Origin = '*' and 'Access-Control-Allow-Methods' = 'GET'

# SendData
```xml
<bdl-senddata
  fromid="id4"
  refindex="1"
  numerator="1"
  denominator="1"
  addconst="0"
  url="http://localhost:5000/simulatordata">
</bdl-senddata>
```

Sends data obtained from fmu - at index `refindex` to the url using HTTP POST method. It provides basic value conversion `y = x * numerator/denominator + addconst`
and sends it as floating number as string 
The endpoint should have CORS enabled - return HTTP headers 'Access-Control-Allow-Origin = '*' and 'Access-Control-Allow-Methods' = 'POST'

# Demo:
```xml
<bdl-readdata ids="id1" url="http://localhost:5000/devicedata" display="true" timeout="5000"></bdl-readdata>
```
<bdl-readdata ids="id1" url="http://localhost:5000/devicedata" display="true" timeout="5000"></bdl-readdata>

```xml
<bdl-senddata fromid="id4" url="http://localhost:5000/simulatordata" refindex="1"></bdl-senddata>
```
<bdl-senddata fromid="id4" url="http://localhost:5000/simulatordata" refindex="1"></bdl-senddata>


```xml
<bdl-chartjs-barplot id="id2" extremelimits="20,220" normallimits="40,180" nominal="1" initialdata="60"
fromid="id4"
refindex="4"
convertors="60,1"
twoway="false"></bdl-chartjs-barplot>
```
<bdl-chartjs-barplot id="id2" extremelimits="20,220" normallimits="40,180" nominal="1" initialdata="60"
fromid="id4"
refindex="4"
convertors="60,1"
twoway="false"></bdl-chartjs-barplot>


```xml
<bdl-fmi id="id4" src="BurkhoffFMI.js"
fminame="Cardiovascular_Model_Burkhoff_HemodynamicsBurkhoff_0shallow"
tolerance="0.000001" starttime="0" guid="{b5629132-3ba6-4153-87c2-f3ff108e1920}"
valuereferences="33554435,637534265,637534241,637534290,16777312"
valuelabels="Left Ventricle Volume,Pressure in Left Ventricle,Pressure in Aorta, Pressure in Left Atria, Heart Rate"
inputs="id1,16777312,1,10,2"></bdl-fmi>
```

<bdl-fmi id="id4" src="BurkhoffFMI.js"
fminame="Cardiovascular_Model_Burkhoff_HemodynamicsBurkhoff_0shallow"
tolerance="0.000001" starttime="0" guid="{b5629132-3ba6-4153-87c2-f3ff108e1920}"
valuereferences="33554435,637534265,637534241,637534290,16777312"
valuelabels="Left Ventricle Volume,Pressure in Left Ventricle,Pressure in Aorta, Pressure in Left Atria, Heart Rate"
inputs="id1,16777312,1,10,2"></bdl-fmi>

<div class="w3-row">
<div class="w3-half">
chartjs-xy with borders 
<bdl-chartjs-xy id="id10" width="400" 
  height="400" 
  fromid="id4" 
  labels="Pressure in Left Ventricle, Left Ventricle Volume,Horní limit,Dolní limit" 
  initialdata=";;0,0.00015;0,28000;0,0.00015;0,1400" 
  refindex="0" 
  refvalues="2"></bdl-chartjs-xy>
  </div>
  <div class="w3-half"> 
  chartjs-time
<bdl-chartjs-time   
  id="id11"  
  width="700"  
  height="400"  
  fromid="id4"  
  labels="Pressure in Aorta,Pressure in Left Ventricle,Pressure in Left Atria" 
  initialdata=""  
  refindex="1"  
  refvalues="3" 
  ylabel="tlak (mmHg)"
  xlabel="čas (s)"
  convertors="0.00750062,1;0.00750062,1;0.00750062,1"></bdl-chartjs-time>
</div>
</div>
