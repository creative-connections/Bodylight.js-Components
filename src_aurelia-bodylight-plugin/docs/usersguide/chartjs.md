# BdlChartjs BdlChartjs-time BdlChartjs-xy

<bdl-chartjs
id="id9"
width="300"
height="500"
responsive="false"  
fromid="id4"
type="doughnut"
labels="Intrathoracic Arteries,ExtraThoracic Arteries, Pulmonary Arteries, Intrathoracic Veins, Extrathoracic veins, Pulmonary Veins"
initialdata="0,4,2,3"
refindex="2"
refvalues="6"
animation="true"
convertors="numerator1,denominator1;numerator2,denominator2"></bdl-chartjs>
<bdl-chartjs
id="id9"
width="300"
height="500"
responsive="false"  
fromid="id4"
type="line"
labels="Intrathoracic Arteries,ExtraThoracic Arteries, Pulmonary Arteries, Intrathoracic Veins, Extrathoracic veins, Pulmonary Veins"
initialdata="0,4,2,3"
refindex="2"
refvalues="6"
animation="true"
convertors="numerator1,denominator1;numerator2,denominator2"></bdl-chartjs>
<bdl-chartjs
id="id9"
width="300"
height="500"
responsive="false"  
fromid="id4"
type="bar"
labels="Intrathoracic Arteries,ExtraThoracic Arteries, Pulmonary Arteries, Intrathoracic Veins, Extrathoracic veins, Pulmonary Veins"
initialdata="0,4,2,3"
refindex="2"
refvalues="6"
animation="true"
convertors="numerator1,denominator1;numerator2,denominator2"></bdl-chartjs>  
<bdl-chartjs
id="id9"
width="300"
height="500"
responsive="false"  
fromid="id4"
type="radar"
labels="Intrathoracic Arteries,ExtraThoracic Arteries, Pulmonary Arteries, Intrathoracic Veins, Extrathoracic veins, Pulmonary Veins"
initialdata="0,4,2,3"
refindex="2"
refvalues="6"
animation="true"
convertors="numerator1,denominator1;numerator2,denominator2"></bdl-chartjs>
<bdl-chartjs
id="id9"
width="300"
height="500"
responsive="false"  
fromid="id4"
type="pie"
labels="Intrathoracic Arteries,ExtraThoracic Arteries, Pulmonary Arteries, Intrathoracic Veins, Extrathoracic veins, Pulmonary Veins"
initialdata="0,4,2,3"
refindex="2"
refvalues="6"
animation="true"
convertors="numerator1,denominator1;numerator2,denominator2"></bdl-chartjs>
<bdl-chartjs
id="id9"
width="300"
height="500"
responsive="false"  
fromid="id4"
type="polarArea"
labels="Intrathoracic Arteries,ExtraThoracic Arteries, Pulmonary Arteries, Intrathoracic Veins, Extrathoracic veins, Pulmonary Veins"
initialdata="0,4,2,3"
refindex="2"
refvalues="6"
animation="true"
convertors="numerator1,denominator1;numerator2,denominator2"></bdl-chartjs>


## ChartJS

<div class="w3-row">
<div class="w3-quarter">


Creates a chartjs element controlled by BdlChartjs library.
<bdl-chartjs 
  id="id9" 
  width="300" 
  height="500" 
  fromid="id4" 
  type="doughnut" 
  labels="Intrathoracic Arteries,ExtraThoracic Arteries, Pulmonary Arteries, Intrathoracic Veins, Extrathoracic veins, Pulmonary Veins"
  initialdata="0.51234161,4.3425161234,2.73739567,3.9334217907" 
  refindex="2" 
  refvalues="6"
  xlabel="x axis label"
  ylabel="y axis label"></bdl-chartjs>
</div>
<div class="w3-rest">

```xml
<bdl-chartjs 
  id="id9" 
  width="300" 
  height="500"
  responsive="false"  
  fromid="id4" 
  type="doughnut" 
  labels="Intrathoracic Arteries,ExtraThoracic Arteries, Pulmonary Arteries, Intrathoracic Veins, Extrathoracic veins, Pulmonary Veins"
  initialdata="0,4,2,3" 
  refindex="2" 
  refvalues="6"
  animation="true"
  convertors="numerator1,denominator1;numerator2,denominator2"></bdl-chartjs>
``` 
  * `width,height` initial size of canvas to draw chart
  * `responsive` by default is `false`, if `true` then chart is rescaled by the current size of the browser window
`convertors` are separated by semicolon ';' per each variable. 
 If convertors are defined then raw data obtained from fmi - via refvalues are converted 
as follows: 
  * `convertors = "numerator,denominator"`, then `y=x*numerator/denominator`
  * `convertors = "expression with x"`, then `y=expression with x`
  
By default - no convertors - raw data (usually in SI) are presented in chart.
  * `animate` - if `true`, smooth animation (by 500 ms) when data is updated. Default `false`.
  * `sectionid` - if set, then listens the component with this id for 'addsection' event, bind it to `bdl-animatecontrol` component
  * xlabel
  * ylabel 
  </div>
  </div>
  
## ChartJS time
<div class="w3-row">
  <div class="w3-quarter">

`<bdl-chartjs-time></bdl-chartjs-time>` time series in chartjs.

<bdl-chartjs-time  
  id="id10" 
  width="300" 
  height="500" 
  fromid="id4" 
  labels="Pressure in Aorta,Pressure in Left Ventricle, Intrathoracic Artery Volume, Extrathoracic Arteries Volume, Pulmonary Arteries Volume, Intrathoracic Veins Volume"
  initialdata="0,1,2,3,4;2,2,2,2;3,2,4;1,5,3;2,2,3,2" 
  refindex="2"   
  refvalues="6"></bdl-chartjs-time>

  </div>
  <div class="w3-rest">
Example:

```xml
<bdl-chartjs-time  
  id="id10" 
  width="300" 
  height="500" 
  fromid="id4" 
  labels="Pressure in Aorta,Pressure in Left Ventricle, Intrathoracic Artery Volume, Extrathoracic Arteries Volume, Pulmonary Arteries Volume, Intrathoracic Veins Volume"
  initialdata="0,1,2,3,4;2,2,2,2;3,2,4;1,5,3;2,2,3,2" 
  refindex="2"   
  refvalues="6"
  min="0"
  max="3.14"></bdl-chartjs-time>

```

Another example

<bdl-chartjs-time  
  id="id10" 
  width="300" 
  height="500" 
  fromid="id4" 
  labels="Pressure in Aorta,Pressure in Left Ventricle, Intrathoracic Artery Volume, Extrathoracic Arteries Volume, Pulmonary Arteries Volume, Intrathoracic Veins Volume"
  initialdata="0,1,2,3,4;2,2,2,2;3,2,4;1,5,3;2,2,3,2" 
  refindex="2"   
  refvalues="6"
  min="0"
  max="3.14"
  displayxticks="false"></bdl-chartjs-time>

  </div>
  <div class="w3-rest">
Example:

```xml
<bdl-chartjs-time  
  id="id10" 
  width="300" 
  height="500" 
  fromid="id4" 
  labels="Pressure in Aorta,Pressure in Left Ventricle, Intrathoracic Artery Volume, Extrathoracic Arteries Volume, Pulmonary Arteries Volume, Intrathoracic Veins Volume"
  initialdata="0,1,2,3,4;2,2,2,2;3,2,4;1,5,3;2,2,3,2" 
  refindex="2"   
  refvalues="6"
  min="0"
  max="3.14"
  displayxticks="false"></bdl-chartjs-time>

```

  </div>
</div>
* min/max sets 

## BdlChartjs-xy

XY chart from data

```xml
<bdl-chartjs-xy id="id10" width="400" height="400" fromid="id4" 
labels="Pressure in Left Ventricle, Left Ventricle Volume" 
initialdata=";;0,0.00015;0,28000;0,0.00015;0,1400" 
refindex="0" refvalues="2"></bdl-chartjs-xy>
``` 

where `initialdata` may contain additional static curves after first values 
delimite by `;` there might be x values delimited by `,` followed by y values delimited by `,`
and so on. 

## bdl-chartjs-barplot

barplot chart with minimum/maximum and normal range
```xml
<bdl-chartjs-barplot
  id="id11"
  fromid="id4"
  refindex="2"
  extremelimits="0,1"
  normallimits="6.9,7.1">
</bdl-chartjs-barplot>
```
<bdl-chartjs-barplot
  id="id11"
  fromid="id4"
  refindex="2"
  extremelimits="4,8"
  normallimits="6.9,7.1"
  initialdata="7">
</bdl-chartjs-barplot>

### bdl-chartjs scatter
1. chartjs
<bdl-chartjs 
  id="id9" 
  width="300" 
  height="500" 
  fromid="id4" 
  type="scatter" 
  labels="Intrathoracic Arteries,ExtraThoracic Arteries, Pulmonary Arteries, Intrathoracic Veins, Extrathoracic veins, Pulmonary Veins"
  initialdata="1,2,3,4;1,2,3,4;4,3,2,1" 
  refindex="2" 
  refvalues="6"
  xlabel="x axis label"
  ylabel="y axis label"></bdl-chartjs>
  
2.  chartjs-xy-points

<bdl-chartjs-xy-points 
  id="id9" 
  width="300" 
  height="500" 
  fromid="id4"    
  labels="Intrathoracic Arteries,ExtraThoracic Arteries, Pulmonary Arteries, Intrathoracic Veins, Extrathoracic veins, Pulmonary Veins"
  initialdata="1,2,3,4;1,4,1,3;2,2,2,5"  
  refindex="2" 
  refvalues="6"
  xlabel="x axis label"
  ylabel="y axis label"></bdl-chartjs-xy-points>

## chartjs canvasobj

Render canvas into different object
* `<bdl-chartjs canvasobj='3dtexturecanvas' ...></bdl-chartjs>` the global variable 3dtexturecanvas is context of canvas,
e.g. from webgl or babylonjs 

## chartjs-fixed

Renders line chart from array of points, on x axis is position on y axis is data.

chartjs-fixed
<bdl-chartjs-fixed
  id="id11"
  width="700"
  height="400"
  fromid="id4"
  refindex="1"
  refvalues="3"
  maxdata="40"></bdl-chartjs-fixed>


