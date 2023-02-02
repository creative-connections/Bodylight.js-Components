## bdl-chartjs-barplot

barplot chart with minimum/maximum and normal range
```xml
<bdl-chartjs-barplot
  id="id11"
  fromid="id4"
  refindex="2"
  extremelimits="4,8"
  normallimits="6.9,7.1"
  initialdata="7.01"
  convertors="60,1"
  twoway="true">
</bdl-chartjs-barplot>
```
test left/right label in barplot data
<bdl-chartjs-barplot
  id="id11"
  fromid="id4"
  refindex="2"
  extremelimits="0,1"
  normallimits="0.93,0.99"
  initialdata="0.995132"
  convertors="1,1"
  twoway="true">
</bdl-chartjs-barplot>
<bdl-chartjs-barplot
  id="id11"
  fromid="id4"
  refindex="2"
  extremelimits="0,1"
  normallimits="0.93,0.99"
  initialdata="0.972634"
  convertors="1,1"
  twoway="true">
</bdl-chartjs-barplot>
<bdl-chartjs-barplot
  id="id11"
  fromid="id4"
  refindex="2"
  extremelimits="0,1"
  normallimits="0.93,0.99"
  initialdata="0.9506563"
  convertors="1,1"
  twoway="true">
</bdl-chartjs-barplot>
<bdl-chartjs-barplot
  id="id11"
  fromid="id4"
  refindex="2"
  extremelimits="0,1"
  normallimits="0.93,0.99"
  initialdata="0.9313412526"
  convertors="1,1"
  twoway="true">
</bdl-chartjs-barplot>

test without normal limits:

<bdl-chartjs-barplot
  id="id11"
  fromid="id4"
  refindex="2"
  extremelimits="0,1"
  initialdata="0.972634"
  convertors="1,1"
  twoway="true">
</bdl-chartjs-barplot>



  * `id` unique id - to this component, mandatory if registered for fmi input
  * `fromid` id refering to fmu component
  * `refindex` index in fmu outputs array - the value at this position will be visualised in barplot
  * `extremelimits` minimum and maximum to be shown in chart
  * `normallimits` physiologically normal limits as ticks in chart should be between extremelimits
  * `convertors` - same as in chartjs e.g. in form `convertors="numerator,denominator"` or expression of`x` as value e.g.:`convertors="1/x"` 
  * `twoway` - default false, if true, then click on chart will transform click position to value and dispatch change event with that value, note that fmu component have register to listen events from this component e.g. `<bdl-fmi id="id4" ... inputs="id11,16777312,1,60">`
  * `responsive` - resize base on parent container.
   
Test4: responsive
<div class="w3-row">
<div class="w3-third">
<bdl-chartjs-barplot id="id11" fromid="id4"  refindex="2"  extremelimits="4,10"  normallimits="6.9,7.1" responsive="true" labels="ph"></bdl-chartjs-barplot>
<bdl-chartjs-barplot id="id11" fromid="id4"  refindex="2"  extremelimits="0,1"  normallimits="0.93,0.99" responsive="true" labels="sO2" initialdata="0.97"></bdl-chartjs-barplot>
</div>
<div class="w3-rest">
<bdl-chartjs-barplot id="id11" fromid="id4"  refindex="2"  extremelimits="4,10"  normallimits="6.9,7.1" responsive="true" labels="ph"></bdl-chartjs-barplot>
</div>
</div>