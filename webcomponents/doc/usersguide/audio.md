
### Audio on increase or decrease, bdl-audio-on-increase, bdl-audio-on-decrease
`<bdl-audio-on-increase>` plays MP3 sound when a selected model variable value increases and achieves a threshold. When the threshold is achieved the sound is played once until the value falls bellow threshold again.
`<bdl-audio-on-decrease>` plays MP3 sound when a selected model variable value decreases and achieves a threshold. When the threshold is achieved the sound is played once until the value raises above threshold again.
Attributes:
  * same as `<bdl-value>`
  * `src` url to MP3 file to be played
  * `threshold` value to be achieved, triggers sound play

`<bdl-sound-on-increase>` plays MP3 sound when a selected model variable value decreases and achieves a threshold. When the threshold is achieved the sound is played once until the value raises above threshold again.
Attributes:
  * same as `<bdl-audio-on-increase>`
  * `freq` frequency in Hz - set integer
  * `volume` set volume between 0-1. Default 0.5
  
Example
```html

<bdl-audio-on-increase src="doc/monitor-beep.mp3" thresholdvalue="1e+7" fromid="id4" refindex="8">
  audio-on-increase not supported
</bdl-audio-on-increase>


<bdl-audio-on-decrease src="doc/monitor-beep.mp3" thresholdvalue="1e+7" fromid="id4" refindex="8">
  audio-on-decrease not supported
</bdl-audio-on-decrease>

<bdl-sound-on-increase 
  thresholdvalue="1e+7" fromid="id4" refindex="8" freq="440" volume="0.3">
  sound-on-decrease not supported
</bdl-audio-on-increase> 
