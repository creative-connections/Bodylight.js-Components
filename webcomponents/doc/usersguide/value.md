### Value, bdl-value
`<bdl-value>` renders numerical value 
  * `fromid='id4'` ID of component which will be listened for events `fmidata`
  * `refindex=8` reference index of value sent by `fmidata` event
  * `numerator=1` numerator to normalize value
  * `denominator=1` denominator to normalize value `x=value*numerator/denominator`
Example: 
`<bdl-value fromid="id4" refindex="8"></bdl-value>`
