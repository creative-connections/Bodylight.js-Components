# PV tool

Markdown with Bodylight Components v.2

`<bdl-pvtool></bdl-pvtool>`

- [x] cursor1 and cursor2 switching
- [x] arrows under cursor1 and cursor2
- [x] graph, default or from fmi
- [x] start/stop will emulate data and sigmoid curve pv for 20s
  - [x] stops listening fmi
  - [x] starts listening custom data
  - [x] send custom data every 0.5s from min pv to max pv and then back to min pv
  - [ ] again pressing the button will start listening fmi
  - [ ] NICE, start will fire event to decrease breath rate to 3 per minute
- [x] cursors will show x,y value from graph  
  - [x] cursor 1, left right arrow move cursor on graph
  - [x] cursor 2, left right arrow move 2nd cursor on graph
  - [x] moving cursor will update data in table
  - [x] compliance is recalculated for each cursor move

# pvtool
```
<bdl-pvtool
fromid="id4"
refindex="0"
refvalues="2"
></bdl-pvtool>
```

Attributes:
- `fromid` chart are filled with data from fmu with id
- `refindex` index of reference variable from array sent by fmu
- `refvalues` how many reference variables are taken from array



bdl:
<bdl-pvtool fromid="id4" refindex="0" refvalues="2"></bdl-pvtool>
