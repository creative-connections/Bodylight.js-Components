# Manequin

<bdl-remote-value remoteurl="http://192.168.2.101:5000/lungsim" interval="500" id="lungsim" inputs="rate;muscle_pressure;blend_duration;compliance;peep;resistance;run"></bdl-remote-value>
<bdl-remote-value remoteurl="http://192.168.2.101:5000/cardiohelp" interval="2000" id="cardiohelp" inputs="p_art;p_ven;temp"></bdl-remote-value>
<bdl-remote-value remoteurl="http://192.168.2.101:5000/manequin" interval="2000" id="manequin"></bdl-remote-value>

<div class="w3-row">
<div class="w3-half">

<div class="w3-row">
<div class="w3-twothird">

![body](img/body.png)

</div>
<div class="w3-third w3-tiny">

Human simulator <bdl-checkbox id="run" default="true" titlemin="STOPPED" titlemax="RUNNING"></bdl-checkbox><br/>
<bdl-range id="rate" min="0" max="100" default="7" step="0.5" title="breath rate [1/min]"></bdl-range>
<bdl-range id="blend_duration" min="1" max="10" default="4" step="1" title="how many breaths to change value [1]"></bdl-range>
<bdl-range id="compliance" min="0.5" max="250" default="50" step="0.5" title="Compliance [ml/cmH2O]"></bdl-range>
<bdl-range id="muscle_pressure" min="0" max="100" default="11" title="Muscle Pressure [cmH2O]"></bdl-range>
<bdl-range id="peep" min="4" max="8" default="5" title="Initial pressure [cmH2O]"></bdl-range>
<bdl-range id="resistance" min="8" max="150" default="35" title="Resistance [cmH2O/(l.s)]"></bdl-range>

</div>
</div>

<bdl-chartjs-time id="id11" width="600" height="150" fromid="lungsim" refindex="7" refvalues="1" labels="tidal volume"></bdl-chartjs-time>

</div>
<div class="w3-half">

<div class="w3-row">
<div class="w3-third">

![cardiohelp](img/cardiohelp.jpg)
</div>
<div class="w3-twothird w3-tiny">

bubble_connected:<bdl-value fromid="cardiohelp" refindex="0" throttle="0"></bdl-value><br/>
dot_v:<bdl-value fromid="cardiohelp" refindex="1" throttle="0"></bdl-value><br/>
oxi_connected:<bdl-value fromid="cardiohelp" refindex="2" throttle="0"></bdl-value><br/>
<bdl-range id="p_art" min="0" max="160" default="100" step="1" title="p_art [mmHg]"></bdl-range><br/>
<bdl-value fromid="cardiohelp" refindex="3" throttle="0"></bdl-value><br/>
<bdl-range id="p_ven" min="0" max="160" default="20" step="1" title="p_ven [mmHg]"></bdl-range><br/>
<bdl-value fromid="cardiohelp" refindex="4" throttle="0"></bdl-value><br/>
rpm: <bdl-value fromid="cardiohelp" refindex="5" throttle="0"></bdl-value><br/>
<bdl-range id="temp" min="20" max="42" default="37" step="0.1" title="temp [deg C]"></bdl-range><br/>
<bdl-value fromid="cardiohelp" refindex="6" throttle="0"></bdl-value><br/>
canula_connected:<bdl-value fromid="manequin" refindex="0" throttle="0"></bdl-value><br/>
ecmo_connected:<bdl-value fromid="manequin" refindex="1" throttle="0"></bdl-value><br/>
o2_connected:<bdl-value fromid="manequin" refindex="2" throttle="0"></bdl-value><br/>
</div>
</div>

<bdl-chartjs-time id="id12" width="600" height="150" fromid="cardiohelp" refindex="5" refvalues="1" labels="RPM" maxdata="86400"></bdl-chartjs-time>
<bdl-chartjs-time id="id12" width="600" height="150" fromid="cardiohelp" refindex="3" refvalues="2" labels="arterial pressure,venous pressure" maxdata="86400"></bdl-chartjs-time>

</div>
</div>
</div>


