### bdl-ecg


```markdown
<bdl-ecg 
  id="id11" /*unique ID of this component*/
  fromid="id4" /*reference ID of controlling component, usually bdl-animation-control or bdl-fmi*/
  type="normal" /*type of ECG - currently implemented 'normal', other types: 1degreeAVblock,... TBD*/
  labels="ECG I (mV)" /* custom label - default is 'ECG I (mV)'*/ 
  width="300" /* width of chart */
  height="50" /* height of chart */
></bdl-ecg>
```

EKG:

<bdl-ecg 
  id="id11" 
  fromid="id4"
  labels="ECG I (mV)"
  width="300"
  height="50"></bdl-ecg>

Example animate control:
<bdl-animate-control 
id="id4" 
speedfactor="20" 
segments="3;5;14;17;29" 
segmentlabels="4b plnění atriální systola;1 systola komor - isovolumická kontrakce;2 systola komor - ejekce;3 isovolumická relaxace;4a plnění"></bdl-animate-control>

Example capilary
<bdl-capillary color="red" strokew=1 width=30 height=30></bdl-capillary>
