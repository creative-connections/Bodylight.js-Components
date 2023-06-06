import {Carousel} from './carousel';
import {bindable} from 'aurelia-framework';
export class CarouselArc extends Carousel { 
    slideIndex = 0;
    @bindable images;
    @bindable badges;
    @bindable infos;
    @bindable links;
    items = [];
    imgs = [];
    infoarray = [];
    linkarray = [];
    currentinfo = '';
    @bindable interval;
    timeoutinterval = 15000; //default is 15000 ms
    attached() {
        let carouselobj = this;
        //if (this.timeoutinterval > 0) this.timeoutvar = setTimeout(() => {carouselobj.carousel();}, carouselobj.timeoutinterval);
      }
    
    carousel() {
        //increment slideindex and schedule next increment
        //this.plusDivs(1);
        // keep this instance as local var
        //let carouselobj = this;
        //schedule next slideshow in timeoutinterval (5s)
        //if (this.timeoutinterval > 0) this.timeoutvar = setTimeout(() => {carouselobj.carousel();}, carouselobj.timeoutinterval);
    }    

    goTo(img) {
        let n = this.imgs.indexOf(img);
        this.showDivs(this.slideIndex = n);
        window.open(img.link, '_self');
    }

}