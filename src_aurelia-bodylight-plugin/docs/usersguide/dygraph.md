### Dygraph
`<bdl-dygraphchart></bdl-dygraphchart>` Creates a graph controlled by Dygraph library [^2]

`<bdl-dygraphchart width="600" height="200" fromid="id4" inputs="time,aorta pressure,ventricle pressure" refindex="0" refvalues="2"></bdl-dygraphchart>`
<bdl-dygraphchart width="600" height="200" fromid="id4" inputs="time,aorta pressure,ventricle pressure" refindex="0" refvalues="2" initialdata="0,120,121;0.1,119,120"></bdl-dygraphchart>

### Sigaard Andersen Chart - nomogram

`<bdl-sachart minichart="false" fromid="id4" inputs="pH,pCO2" refindex="0" refvalues="2" p-H='6' p-c-o2='40'></bdl-sachart>` creates Sigaard Andersen Nomogram - implemented in Dygraph library.

<bdl-sachart minichart="false" fromid="id4" inputs="pH,pCO2" refindex="0" refvalues="2" p-H='6' p-c-o2='40'></bdl-sachart>

<div class="w3-black">
</div>

### Siggaard Andersen Chart nomogram 

`<bdl-chartjs-xy-sachart initialdata='7.4,40;7.42,45'></bdl-chartjs-xy-sachart>` creates Sigaard Andersen Nomogram - implemented in Chartjs library.

<bdl-chartjs-xy-sachart initialdata='7.4,40;7.42,45'></bdl-chartjs-xy-sachart>