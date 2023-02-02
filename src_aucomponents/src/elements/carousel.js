import {bindable} from 'aurelia-framework';

export class Carousel {
  slideIndex = 0;
  @bindable images;
  @bindable badges;
  @bindable infos;
  items = [];
  imgs = [];
  infoarray = [];
  currentinfo = '';
  @bindable interval;
  timeoutinterval = 15000; //default is 15000 ms

  //showDivs(slideIndex);

  bind() {
    //either badges are defined - images in slot, or images are defined
    //badges = 5, defines number of dots/badges generated
    //create items array - numbers from 0 to 'badges -1'
    if (this.badges) {
      let numbadges = parseInt(this.badges, 10);
      for (let i = 0; i < numbadges; i++) {
        this.items.push({index: i, show: (i === 0)});
      }
    } else {
      //images='i1.jpg|i2.jpg' if defined then <img> are generated
      //split by |, and add it to imgs array
      if (this.images) {
        let imagesarray = this.images.split('|'); //split by pipe or comma
        for (let i = 0; i < imagesarray.length; i++) {
          this.imgs.push({src: imagesarray[i], show: (i === 0)});
          this.items.push({index: i, show: (i === 0)});
        }
      }
    }
    if (this.infos) {
      this.infoarray = this.infos.split('|');
      this.currentinfo = this.infoarray[0];
    }
    //if defined, then recount timeoutinterval to ms based on interval attribute
    if (this.interval) {
      let is = parseInt(this.interval, 10);
      this.timeoutinterval = is * 1000;
    }
  }

  attached() {
    let carouselobj = this;
    if (this.timeoutinterval > 0) this.timeoutvar = setTimeout(() => {carouselobj.carousel();}, carouselobj.timeoutinterval);
  }

  carousel() {
    //increment slideindex and schedule next increment
    this.plusDivs(1);
    // keep this instance as local var
    let carouselobj = this;
    //schedule next slideshow in timeoutinterval (5s)
    if (this.timeoutinterval > 0) this.timeoutvar = setTimeout(() => {carouselobj.carousel();}, carouselobj.timeoutinterval);
  }

  plusDivs(n) {
    this.showDivs(this.slideIndex += n);
  }
  plusDivsC(n) {
    //cancel timeout - based on button click
    if (this.timeoutvar) {
      clearTimeout(this.timeoutvar);
      this.timeoutvar = null;
    }
    //call plusdivs
    this.plusDivs(n);
  }
  currentDiv(nitem) {
    //cancel timeout
    if (this.timeoutvar) {
      clearTimeout(this.timeoutvar);
      this.timeoutvar = null;
    }
    //show the requested div
    let n = nitem.index;
    this.showDivs(this.slideIndex = n);
  }

  showDivs(n) {
    let i;
    //let x = document.getElementsByClassName('mySlides');
    //let x;
    //let dots = document.getElementsByClassName('demo');
    if (n >= this.items.length) {this.slideIndex = 0;}
    if (n < 0) {this.slideIndex = this.items.length - 1;}
    for (i = 0; i < this.items.length; i++) {
      this.imgs[i].show = false;
      this.items[i].show = false;
    }
    this.imgs[this.slideIndex].show = true;
    this.items[this.slideIndex].show = true;
    if (this.infoarray.length > this.slideIndex) this.currentinfo = this.infoarray[this.slideIndex];
  }

  detached() {
    if (this.timeoutvar) {
      clearTimeout(this.timeoutvar);
      this.timeoutvar = null;
    }
  }
}
