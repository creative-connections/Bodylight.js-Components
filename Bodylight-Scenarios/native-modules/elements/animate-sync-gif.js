"use strict";

exports.__esModule = true;
exports.AnimateSyncGif = void 0;

var _libgif = _interopRequireDefault(require("libgif"));

var _aureliaTemplating = require("aurelia-templating");

var _triggerOnIncrease = require("./trigger-on-increase");

var _class, _descriptor, _descriptor2, _descriptor3;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var AnimateSyncGif = (_class = /*#__PURE__*/function (_TriggerOnIncrease) {
  _inheritsLoose(AnimateSyncGif, _TriggerOnIncrease);

  function AnimateSyncGif() {
    var _this;

    _this = _TriggerOnIncrease.call(this) || this;

    _initializerDefineProperty(_this, "fromid", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "src", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "simulationstepsize", _descriptor3, _assertThisInitialized(_this));

    _this.loaded = false;
    _this.isstopped = true;

    _this.handleStart = function (e) {
      //console.log('AnimatedHeart start event');
      //this.gif.play();
      _this.gifframespersimframe = _this.gif.get_frames().length / (1 / _this.simulationstepsize);

      if (!_this.gif.get_loading()) {
        _this.gif.move_to(0); //console.log('handlestart simulationstepsize, frames:',this.simulationstepsize,this.gif.get_frames().length);

      }
    };

    _this.handleStop = function (e) {
      //console.log('AnimatedHeart stop event');
      //this.gif.move_relative(1);
      if (!_this.gif.get_loading()) _this.gif.pause();
    };

    return _this;
  } //handleStop(e) {}


  var _proto = AnimateSyncGif.prototype;

  _proto.attached = function attached() {
    _TriggerOnIncrease.prototype.attached.call(this); //this.imgel - is referenced from view (HTML)
    //console.log('animatedheart2 imgel', this.imgel);


    this.gif = new _libgif.default({
      gif: this.imgel,
      auto_play: false,
      rubbable: true
    }); //console.log('animatedheart2 gif', this.gif);

    this.gif.load();
    document.getElementById(this.fromid).addEventListener('fmistart', this.handleStart); //document.getElementById(this.fromid).addEventListener('fmidata', this.handleStart);

    document.getElementById(this.fromid).addEventListener('fmistop', this.handleStop);
    this.currentframereal = 0;
    if (typeof this.simulationstepsize === ' string') this.simulationstepsize = parseFloat(this.simulationstepsize);
  };

  _proto.normalAction = function normalAction() {
    this.currentframereal += this.gifframespersimframe; //increase gif frame - based on how many frames are ther per simulation frame

    this.currentframe = Math.round(this.currentframereal);
    if (!this.gif.get_loading()) this.gif.move_to(this.currentframe);
  };

  _proto.trigger = function trigger() {
    this.currentframereal = 0;
    if (!this.gif.get_loading()) this.gif.move_to(0); // set to frame 0
  };

  return AnimateSyncGif;
}(_triggerOnIncrease.TriggerOnIncrease), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "fromid", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "src", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "simulationstepsize", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.01;
  }
})), _class);
exports.AnimateSyncGif = AnimateSyncGif;
//# sourceMappingURL=animate-sync-gif.js.map
