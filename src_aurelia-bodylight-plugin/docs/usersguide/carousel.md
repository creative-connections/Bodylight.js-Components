# carousel

introduce slideshow with control icons

`<bdl-carousel images="1.jpg|2.jpg|3.jpg"></bdl-carousel>`

carousel also uses 'slot' to project content so using

`<bdl-carousel badges="3"><img src="1.jpg" /> <img src="2.jpg" /> <img src="3.jpg" /></bdl-carousel>`

Demo1:

<bdl-carousel images="Bodylight_loading2_amber.gif|Bodylight_loading2_black.gif|Bodylight_loading2_grey.gif" infos="this is amber| This is black.| This is grey." interval="5"></bdl-carousel>


# carousel-arc

Introduce list of links with 1 big and other small icons. The clicked is made big, opens the link in current window, so using # in link is recommended

`<bdl-carousel-arc images="1.jpg|2.jpg|3.jpg"></bdl-carousel-arc>`

carousel can contain link - a href is generated also uses 'slot' to project content so using

`<bdl-carousel-arc images="Bodylight_loading2_amber.gif|Bodylight_loading2_black.gif|Bodylight_loading2_grey.gif|Bodylight_loading2_amber.gif|Bodylight_loading2_black.gif|Bodylight_loading2_grey.gif" infos="this is amber| This is black.| This is grey. | 4 | 5 | 6 " interval="5" links="#1.md|#2.md|#3.md|#4.md|#5.md|#6.md" > </bdl-carousel-arc>`

Demo1:

<bdl-carousel-arc images="Bodylight_loading2_amber.gif|Bodylight_loading2_black.gif|Bodylight_loading2_grey.gif|Bodylight_loading2_amber.gif|Bodylight_loading2_black.gif|Bodylight_loading2_grey.gif" infos="this is amber| This is black.| This is grey. | 4 | 5 | 6 " interval="5" links="#1.md|#2.md|#3.md|#4.md|#5.md|#6.md" > </bdl-carousel-arc>

Demo2 in limited space:

<div class="w3-card-2 w3-margin" style="width:100px">
<bdl-carousel-arc images="Bodylight_loading2_amber.gif|Bodylight_loading2_black.gif|Bodylight_loading2_grey.gif|Bodylight_loading2_amber.gif|Bodylight_loading2_black.gif|Bodylight_loading2_grey.gif" infos="this is amber| This is black.| This is grey. | 4 | 5 | 6 " interval="5" links="#1.md|#2.md|#3.md|#4.md|#5.md|#6.md" > </bdl-carousel-arc>
</div>