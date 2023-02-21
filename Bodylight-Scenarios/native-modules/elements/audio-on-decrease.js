"use strict";

exports.__esModule = true;
exports.AudioOnDecreaseCustomElement = void 0;

var _aureliaTemplating = require("aurelia-templating");

var _audioOnIncrease = require("./audio-on-increase");

var _dec, _class, _class2, _descriptor, _descriptor2;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

//import {PLATFORM} from 'aurelia-pal';
//@customElement
//@useView(PLATFORM.moduleName('./audio-on-increase.html'))
var AudioOnDecreaseCustomElement = (_dec = (0, _aureliaTemplating.useView)('./audio-on-increase.html'), _dec(_class = (_class2 = /*#__PURE__*/function (_AudioOnIncrease) {
  _inheritsLoose(AudioOnDecreaseCustomElement, _AudioOnIncrease);

  function AudioOnDecreaseCustomElement() {
    var _this;

    _this = _AudioOnIncrease.call(this) || this; //create lambda function which is added as listener later

    _initializerDefineProperty(_this, "thresholdvalue", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "src", _descriptor2, _assertThisInitialized(_this));

    _this.handleValueChange = function (e) {
      _this.value = e.detail.data[_this.refindex] * _this.numerator / _this.denominator;

      if (_this.value < _this.thresholdvalue) {
        if (!_this.triggered) _this.trigger();
      } else {
        if (_this.triggered) {
          _this.triggered = false;
        }
      }
    };

    return _this;
  }

  return AudioOnDecreaseCustomElement;
}(_audioOnIncrease.AudioOnIncrease), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "thresholdvalue", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "src", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.AudioOnDecreaseCustomElement = AudioOnDecreaseCustomElement;
//# sourceMappingURL=audio-on-decrease.js.map
