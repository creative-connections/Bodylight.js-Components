## Chartjs Chartjs-time Chartjs-xy

### ChartJS
```xml
<bdl-chartjs 
  id="id9" 
  width="300" 
  height="500" 
  fromid="id4" 
  type="doughnut" 
  labels="Intrathoracic Arteries,ExtraThoracic Arteries, Pulmonary Arteries, Intrathoracic Veins, Extrathoracic veins, Pulmonary Veins"
  initialdata="0,4,2,3" 
  refindex="2" 
  refvalues="6"
  animation="true"
  convertors="numerator1,denominator1;numerator2,denominator2"></bdl-chartjs>
``` 
Creates a chartjs element controlled by Chartjs library.
<bdl-chartjs 
  id="id9" 
  width="300" 
  height="500" 
  fromid="id4" 
  type="doughnut" 
  labels="Intrathoracic Arteries,ExtraThoracic Arteries, Pulmonary Arteries, Intrathoracic Veins, Extrathoracic veins, Pulmonary Veins"
  initialdata="0,4,2,3" 
  refindex="2" 
  refvalues="6"></bdl-chartjs>

If `convertors` are defined - then raw data obtained from fmi - via refvalues are converted as x=x*numerator/denominator;
By default - no convertors - raw data (usually in SI) are presented in chart.
  * `animate` - if `true`, smooth animation (by 500 ms) when data is updated. Default `false`.
  * `sectionid` - if set, then listens the component with this id for 'addsection' event, bind it to `bdl-animatecontrol` component
### ChartJS time
`<bdl-chartjs-time></bdl-chartjs-time>` time series in chartjs

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
  refvalues="6"></bdl-chartjs-time>

```
<bdl-chartjs-time  
  id="id10" 
  width="300" 
  height="500" 
  fromid="id4" 
  labels="Pressure in Aorta,Pressure in Left Ventricle, Intrathoracic Artery Volume, Extrathoracic Arteries Volume, Pulmonary Arteries Volume, Intrathoracic Veins Volume"
  initialdata="0,1,2,3,4;2,2,2,2;3,2,4;1,5,3;2,2,3,2" 
  refindex="2"   
  refvalues="6"></bdl-chartjs-time>

### Chartjs-xy
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
