range
<bdl-range id="id1" min="40" max="180" step="1" default="60" title="Srdeční tep:"></bdl-range>
barplot: Srdeční tep 2
<bdl-chartjs-barplot id="id2" extremelimits="20,220" normallimits="40,180" nominal="1" initialdata="60"
fromid="id4"
refindex="4"
convertors="60,1"></bdl-chartjs-barplot>

Animace

<bdl-animate-adobe
src="Faze_srdce.js"
width="335"
height="480"
name="Faze_srdce"
fromid="id4" 
responsive="false"></bdl-animate-adobe>

<bdl-bind2a findex="0" aname="ventricles.ventriclesTotal.VentricleLeft_anim" amin="100" amax="0" fmin="0.00007" fmax="0.00015"></bdl-bind2a>
<bdl-bind2a findex="6" aname="ValveMV_anim" amin="99" amax="0" fmin="0" fmax="1"></bdl-bind2a>
<bdl-bind2a findex="7" aname="ValveAOV_anim" amin="0" amax="99" fmin="0" fmax="1"></bdl-bind2a>
<bdl-bind2a findex="14" aname="ValveTV_anim" amin="99" amax="0" fmin="0" fmax="1"></bdl-bind2a>
<bdl-bind2a findex="15" aname="ValvePV_anim" amin="0" amax="99" fmin="0" fmax="1"></bdl-bind2a>
