"use strict";

exports.__esModule = true;
exports.AudioOnIncrease = void 0;

var _aureliaTemplating = require("aurelia-templating");

var _triggerOnIncrease = require("./trigger-on-increase");

var _class, _descriptor, _descriptor2, _descriptor3;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var AudioOnIncrease = (_class = /*#__PURE__*/function (_TriggerOnIncrease) {
  _inheritsLoose(AudioOnIncrease, _TriggerOnIncrease);

  function AudioOnIncrease() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _TriggerOnIncrease.call.apply(_TriggerOnIncrease, [this].concat(args)) || this;

    _initializerDefineProperty(_this, "thresholdvalue", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "src", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "controls", _descriptor3, _assertThisInitialized(_this));

    return _this;
  }

  var _proto = AudioOnIncrease.prototype;

  _proto.attached = function attached() {
    _TriggerOnIncrease.prototype.attached.call(this);

    console.log('audioonincrease attached');
    this.played = false;
  };

  _proto.trigger = function trigger() {
    //console.log('triggered');
    //this.triggered = true;
    if (!this.played || this.audioctl.ended) {
      this.audioctl.play();
      this.played = true;
    }
  };

  return AudioOnIncrease;
}(_triggerOnIncrease.TriggerOnIncrease), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "thresholdvalue", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "src", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "controls", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
})), _class);
exports.AudioOnIncrease = AudioOnIncrease;
//# sourceMappingURL=audio-on-increase.js.map
