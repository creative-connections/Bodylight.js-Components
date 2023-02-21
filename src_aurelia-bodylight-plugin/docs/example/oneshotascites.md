# Ascites simulator 1.15

<bdl-fmi id="idfmi" mode="oneshot" src="Lymphatics_Hemodynamics_Experiments_HVPGShuntsForSimulator.js" fminame="Lymphatics_Hemodynamics_Experiments_HVPGShuntsForSimulator" tolerance="0.000001" starttime="4" fstepsize="1" stoptime="30" guid="{dc5bd2c5-c5a0-40f2-9619-19c8c00e7fc1}" valuereferences="905969714,905969732,905969816,905969713,905969762,905969846,100663313,905969764,905969848,905969765,905969773,905969791" valuelabels="ascites_NoShunts.HVPG,ascites_Shunts.HVPG,ascites_ShuntDefault.HVPG,ascites_NoShunts.PPV,ascites_ShuntDefault.PPV,ascites_Shunts.PPV,ascites_NoShunts.Q_liver,ascites_ShuntDefault.Q_liver,ascites_Shunts.Q_liver,ascites_Shunts.Q_shunt,ascites_Shunts.shunt.d,phase"
inputs="id1,16777243,7.5006e-09,1,t;id2,16777270,1.6666666666667e-05,1,t;id3,16777276,1,1,t"
inputlabels="ascites_Shunts.shunt.Comp,Inflow,TipsOn" eventlisten="change"></bdl-fmi>

<bdl-animate-control
id="ida"
fromid="idfmi"
speedfactor="1"
segments="1;2;3;4;5"
segmentlabels="initial;first;second;third;fourth"
segmentcond="11,eq,1;11,eq,2;11,eq,3;11,eq,4;11,eq,5" ></bdl-animate-control>

<bdl-range id="id1" title="Remodeling sensitivity" min="0.1" max="5" default="1" step="0.1"></bdl-range>

<bdl-range id="id2" title="Inflow" min="0.7" max="1.3" default="1" step="0.02"></bdl-range>

<bdl-range id="id3" title="TIPS enabled " min="0" max="1" default="0" step="1"></bdl-range> (0 - NO, 1 - YES)

<div class="w3-half">
HVPG

<bdl-chartjs-time width="400" height="400" fromid="idfmi" labels="No shunts,Adjusted shunt,Default shunt" refindex="0" refvalues="3" ylabel="HVPG (mmHg)" xlabel="Liver resistance (mmHg.min/L)" showLine="false" convertors="1,133.32;1,133.32;1,133.32" min="0" max="35" sectionid="ida"></bdl-chartjs-time>

</div>
<div class="w3-half">
PPV

<bdl-chartjs-time width="400" height="400" fromid="idfmi" labels="No shunts,Adjusted,Default" refindex="3" refvalues="3" ylabel="PPV (mmHg)" xlabel="Liver resistance (mmHg.min/L)" convertors="1,133.32;1,133.32;1,133.32" min=0 max=70 sectionid="ida"></bdl-chartjs-time>

</div>
</div>

<div class="w3-row">
<div class="w3-half">
Flows

<bdl-chartjs-time width="400" height="400" fromid="idfmi" labels="Inflow,Liver flow adjusted shunt,Liver flow default shunt, Adjusted shunt flow" refindex="6" refvalues="4" ylabel="Flow (L/min)" xlabel="Liver resistance (mmHg.min/L)" showLine="false" convertors="6e4,1;6e4,1;6e4,1;6e4,1" min="0" max="1.3"></bdl-chartjs-time>

</div>
<div class="w3-half">
Shunt diameter

<bdl-chartjs-time width="400" height="400" fromid="idfmi"  refindex="10" refvalues="2" ylabel="Diameter(mm)" xlabel="Liver resistance (mmHg.min/L)" convertors="1000,1" min="0" max="6"></bdl-chartjs-time>

</div>
</div>

*Powered by [Bodylight.js](https://bodylight.physiome.cz/)*
