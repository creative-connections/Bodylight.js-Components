"use strict";

exports.__esModule = true;
exports.Carousel = void 0;

var _aureliaFramework = require("aurelia-framework");

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var Carousel = (_class = /*#__PURE__*/function () {
  function Carousel() {
    this.slideIndex = 0;

    _initializerDefineProperty(this, "images", _descriptor, this);

    _initializerDefineProperty(this, "badges", _descriptor2, this);

    _initializerDefineProperty(this, "infos", _descriptor3, this);

    this.items = [];
    this.imgs = [];
    this.infoarray = [];
    this.currentinfo = '';

    _initializerDefineProperty(this, "interval", _descriptor4, this);

    this.timeoutinterval = 15000;
  }

  var _proto = Carousel.prototype;

  //default is 15000 ms
  //showDivs(slideIndex);
  _proto.bind = function bind() {
    //either badges are defined - images in slot, or images are defined
    //badges = 5, defines number of dots/badges generated
    //create items array - numbers from 0 to 'badges -1'
    if (this.badges) {
      var numbadges = parseInt(this.badges, 10);

      for (var i = 0; i < numbadges; i++) {
        this.items.push({
          index: i,
          show: i === 0
        });
      }
    } else {
      //images='i1.jpg|i2.jpg' if defined then <img> are generated
      //split by |, and add it to imgs array
      if (this.images) {
        var imagesarray = this.images.split('|'); //split by pipe or comma

        for (var _i = 0; _i < imagesarray.length; _i++) {
          this.imgs.push({
            src: imagesarray[_i],
            show: _i === 0
          });
          this.items.push({
            index: _i,
            show: _i === 0
          });
        }
      }
    }

    if (this.infos) {
      this.infoarray = this.infos.split('|');
      this.currentinfo = this.infoarray[0];
    } //if defined, then recount timeoutinterval to ms based on interval attribute


    if (this.interval) {
      var is = parseInt(this.interval, 10);
      this.timeoutinterval = is * 1000;
    }
  };

  _proto.attached = function attached() {
    var carouselobj = this;
    if (this.timeoutinterval > 0) this.timeoutvar = setTimeout(function () {
      carouselobj.carousel();
    }, carouselobj.timeoutinterval);
  };

  _proto.carousel = function carousel() {
    //increment slideindex and schedule next increment
    this.plusDivs(1); // keep this instance as local var

    var carouselobj = this; //schedule next slideshow in timeoutinterval (5s)

    if (this.timeoutinterval > 0) this.timeoutvar = setTimeout(function () {
      carouselobj.carousel();
    }, carouselobj.timeoutinterval);
  };

  _proto.plusDivs = function plusDivs(n) {
    this.showDivs(this.slideIndex += n);
  };

  _proto.plusDivsC = function plusDivsC(n) {
    //cancel timeout - based on button click
    if (this.timeoutvar) {
      clearTimeout(this.timeoutvar);
      this.timeoutvar = null;
    } //call plusdivs


    this.plusDivs(n);
  };

  _proto.currentDiv = function currentDiv(nitem) {
    //cancel timeout
    if (this.timeoutvar) {
      clearTimeout(this.timeoutvar);
      this.timeoutvar = null;
    } //show the requested div


    var n = nitem.index;
    this.showDivs(this.slideIndex = n);
  };

  _proto.showDivs = function showDivs(n) {
    var i; //let x = document.getElementsByClassName('mySlides');
    //let x;
    //let dots = document.getElementsByClassName('demo');

    if (n >= this.items.length) {
      this.slideIndex = 0;
    }

    if (n < 0) {
      this.slideIndex = this.items.length - 1;
    }

    for (i = 0; i < this.items.length; i++) {
      this.imgs[i].show = false;
      this.items[i].show = false;
    }

    this.imgs[this.slideIndex].show = true;
    this.items[this.slideIndex].show = true;
    if (this.infoarray.length > this.slideIndex) this.currentinfo = this.infoarray[this.slideIndex];
  };

  _proto.detached = function detached() {
    if (this.timeoutvar) {
      clearTimeout(this.timeoutvar);
      this.timeoutvar = null;
    }
  };

  return Carousel;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "images", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "badges", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "infos", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "interval", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class);
exports.Carousel = Carousel;
//# sourceMappingURL=carousel.js.map
