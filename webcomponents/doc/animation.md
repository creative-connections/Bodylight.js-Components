# Animace

rychlost:
<bdl-range id="id1" min="1" max="100"></bdl-range>

propojení:
<bdl-bind2previous fromid="id1" toid="id4" toattribute="speedfactor"></bdl-bind2previous>

tlačítka:
<bdl-animate-control id="id4" speedfactor="50"></bdl-animate-control>

animace:
<bdl-animate-gif fromid="id4" src="doc/heart.gif"></bdl-animate-gif>
