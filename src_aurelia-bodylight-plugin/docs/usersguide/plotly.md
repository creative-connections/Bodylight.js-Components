## BdlPlotly

```xml
<bdl-plotly
  fromid="fmiid"
  refindex="0"
  refvalues="2"
  maxdata="255"
  width="600"
  height="300"
  convertors="x/133.32;1,60"></bdl-plotly>
```
Creates Plotly element (by default line chart) and inserts Plotly canvas handled by [PlotlyJS](https://plotly.com/javascript/) library
  * `fromid` reference to FMU or other control component
  * `refindex` index in array of bulk values sent by FMU to be visualized
  * `refvalues` number of values taken from the bulk values, default=1
  * `maxdata` maximum data to visualize in FIFO array
  * `width` pixels of chart width
  * `height` pixels of chart height
  * `convertors` - defines conversion rules 
    * either in form `numerator,denominator` where `visualizedvalue=x * numerator/denominator`
    * or in algebraic form e.g.:`1/x` - note only `x`, numeric, algebraic and parenthesis `+-*/^()` are allowed for security reason.

 
If you use plotly component - since version 2.0.44 Plotly must be referred externally e.g. by `<script src="https://cdn.plot.ly/plotly-2.6.3.min.js"></script>`

Example:
<bdl-plotly
  fromid="fmiid"
  refindex="0"
  refvalues="2"
  maxdata="255"
  width="600"
  height="300"
  convertors="x/133.32;1,60"></bdl-plotly>
