"use strict";

exports.__esModule = true;
exports.SoundOnIncrease = void 0;

var _aureliaTemplating = require("aurelia-templating");

var _triggerOnIncrease = require("./trigger-on-increase");

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var SoundOnIncrease = (_class = /*#__PURE__*/function (_TriggerOnIncrease) {
  _inheritsLoose(SoundOnIncrease, _TriggerOnIncrease);

  function SoundOnIncrease() {
    var _this;

    _this = _TriggerOnIncrease.call(this) || this;

    _initializerDefineProperty(_this, "thresholdvalue", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "freq", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "volume", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "beepduration", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "showdialog", _descriptor5, _assertThisInitialized(_this));

    _this.soundon = true;
    return _this;
  }

  var _proto = SoundOnIncrease.prototype;

  _proto.bind = function bind() {
    if (typeof this.volume === 'string') this.volume = parseFloat(this.volume, 10);
    /* set volume of sound output */

    if (typeof this.beepduration === 'string') this.beepduration = parseFloat(this.beepduration, 10);
    /* set volume of sound output */

    if (typeof this.freq === 'string') this.freq = parseInt(this.freq, 10);
    /* set volume of sound output */

    if (typeof this.showdialog === 'string') this.showdialog = this.showdialog === 'true';
  };

  _proto.attached = function attached() {
    _TriggerOnIncrease.prototype.attached.call(this); // create web audio api context


    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)(); // create Oscillator node

    /*this.oscillator = this.audioCtx.createOscillator();
    this.oscillator.connect(this.audioCtx.destination);*/

    var ticks = Math.floor(this.freq * this.beepduration);
    this.durationtime = ticks / this.freq; //compute duration to be integer number of ticks;
  };

  _proto.switchsound = function switchsound() {
    this.soundon = !this.soundon;
  };

  _proto.trigger = function trigger() {
    if (this.soundon) {
      //inspired by the javascript audio api tutorial https://marcgg.com/blog/2016/11/01/javascript-audio/
      this.oscillator = this.audioCtx.createOscillator();
      var g = this.audioCtx.createGain();
      g.gain.value = this.volume;
      g.connect(this.audioCtx.destination);
      this.oscillator.frequency.value = this.freq;
      this.oscillator.connect(g);
      this.oscillator.start(); //stop after beepduration - but round to whole number of ticks (try to prevent zzz)

      this.oscillator.stop(this.audioCtx.currentTime + this.durationtime);
    } //console.log('soundonincrease trigger time:', this.audioCtx.currentTime);
    //fade out in 150ms, get rid of click

    /*setTimeout(function(that, g2) {
      //console.log('soundonincrease ramp down', that.audioCtx.currentTime);
      g2.gain.exponentialRampToValueAtTime(0.00001, that.audioCtx.currentTime + 0.1);
      //stop 0.01 after ramp down
      that.oscillator.stop(that.audioCtx.currentTime + 0.15);
    }, 150, this, g);*/
    //this.oscillator.stop(this.audioCtx.currentTime + 0.4); // stop at 0.4 seconds after the current time, in case of fadeout don't work
    //}

  };

  return SoundOnIncrease;
}(_triggerOnIncrease.TriggerOnIncrease), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "thresholdvalue", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "freq", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 440;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "volume", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.5;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "beepduration", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.3;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "showdialog", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
})), _class);
exports.SoundOnIncrease = SoundOnIncrease;
//# sourceMappingURL=sound-on-increase.js.map
