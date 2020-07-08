# Animace se segmenty

rychlost:
<bdl-range id="id1" min="1" max="100"></bdl-range>

propojení:
<bdl-bind2previous fromid="id1" toid="id4" toattribute="speedfactor"></bdl-bind2previous>

Stiskněte tlačítko pro animaci systoly a diastoly:
<bdl-animate-control id="id4" speedfactor="20" segments="3;5;14;17;29" segmentlabels="4b plnění atriální systola;1 systola komor - isovolumická kontrakce;2 systola komor - ejekce;3 isovolumická relaxace;4a plnění"></bdl-animate-control>

animace:
<bdl-animate-gif fromid="id4" src="doc/heart.gif"></bdl-animate-gif>

