# 1. BdlValue, bdl-value 

`<bdl-value>` renders numerical value 
  * `fromid='id4'` ID of component which will be listened for events `fmidata`
  * `refindex=8` reference index of value sent by `fmidata` event
  * `convertors="1,1,0"` conversion to count visible value in form numerator,denominator,addend x*num/den+add, or in form of 
algebraic expression with `x` determine value to be recounted: e.g.:`x*265+Math.sin(x)`
  * `precision=4` precision the value is presented, e.g. value from model `1.23456789` is presented as `1.234`.

## Example 
`<bdl-value fromid="id4" refindex="8"></bdl-value>`
<bdl-value fromid="id4" refindex="8"></bdl-value>
