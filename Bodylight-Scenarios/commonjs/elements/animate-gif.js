"use strict";

exports.__esModule = true;
exports.AnimateGif = void 0;

var _libgif = _interopRequireDefault(require("libgif"));

var _aureliaTemplating = require("aurelia-templating");

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

//animates gif, plays frame on each simulation tick, event fmidata
var AnimateGif = (_class = /*#__PURE__*/function () {
  function AnimateGif() {
    var _this = this;

    _initializerDefineProperty(this, "fromid", _descriptor, this);

    _initializerDefineProperty(this, "src", _descriptor2, this);

    _initializerDefineProperty(this, "width", _descriptor3, this);

    _initializerDefineProperty(this, "height", _descriptor4, this);

    this.isstopped = true;

    this.handleStart = function (e) {
      //console.log('AnimatedHeart start event gif length:', this.gif.get_length());
      //this.gif.play();
      if (!_this.gif.get_loading()) _this.gif.move_to(0);
    };

    this.handleStep = function (e) {
      //console.log('BdlAnimateGif step event from frame ' + this.gif.get_current_frame() + ' to frame ' + e.detail.time);
      //this.gif.play();
      if (!_this.gif.get_loading()) {
        //move to frame
        if (e.detail.time < _this.gif.get_length()) _this.gif.move_to(e.detail.time); //outside - move relative
        else _this.gif.move_relative(1);
      }
    };

    this.handleStop = function (e) {
      //console.log('AnimatedHeart stop event');
      //this.gif.move_relative(1);
      if (!_this.gif.get_loading()) _this.gif.pause();
    };
  }

  var _proto = AnimateGif.prototype;

  _proto.attached = function attached() {
    //this.imgel - is referenced from view (HTML)
    //console.log('animatedheart2 imgel, width,height', this.imgel, this.width, this.height);
    this.gif = new _libgif.default({
      gif: this.imgel,
      auto_play: false,
      rubbable: true,
      max_width: this.width
    }); //console.log('animatedheart2 gif', this.gif);

    this.gif.load();
    document.getElementById(this.fromid).addEventListener('animatestart', this.handleStart);
    document.getElementById(this.fromid).addEventListener('animatedata', this.handleStep);
    document.getElementById(this.fromid).addEventListener('animatestop', this.handleStop);
  };

  return AnimateGif;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "fromid", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "src", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "width", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 400;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "height", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 300;
  }
})), _class);
exports.AnimateGif = AnimateGif;
//# sourceMappingURL=animate-gif.js.map
