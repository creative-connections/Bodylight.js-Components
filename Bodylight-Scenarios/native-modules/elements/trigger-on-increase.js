"use strict";

exports.__esModule = true;
exports.TriggerOnIncrease = void 0;

var _value = require("./value");

var _aureliaTemplating = require("aurelia-templating");

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var TriggerOnIncrease = (_class = /*#__PURE__*/function (_Value) {
  _inheritsLoose(TriggerOnIncrease, _Value);

  function TriggerOnIncrease() {
    var _this;

    _this = _Value.call(this) || this; //create lambda function which is added as listener later

    _initializerDefineProperty(_this, "thresholdvalue", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "action", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "numerator", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "denominator", _descriptor4, _assertThisInitialized(_this));

    _this.handleValueChange = function (e) {
      _this.value = e.detail.data[_this.refindex] * _this.numerator / _this.denominator;

      if (_this.value > _this.thresholdvalue) {
        if (!_this.triggered) {
          _this.triggered = true;

          _this.trigger();
        } else {
          _this.normalAction();
        }
      } else {
        if (_this.triggered) {
          _this.triggered = false;
        }

        _this.normalAction();
      }
    };

    return _this;
  }

  var _proto = TriggerOnIncrease.prototype;

  _proto.attached = function attached() {
    console.log('audioonincrease attached');

    _Value.prototype.attached.call(this);

    if (typeof this.thresholdvalue === 'string') {
      this.thresholdvalue = parseFloat(this.thresholdvalue);
    }

    if (this.numerator) this.numerator = parseFloat(this.numerator);else this.numerator = 1;
    if (this.denominator) this.denominator = parseFloat(this.denominator);else this.denominator = 1;
  }
  /**
   * This should be overriden, is triggered when threshold is reached
   */
  ;

  _proto.trigger = function trigger() {
    if (this.action) {
      /*eslint-env browser*/
      eval(this.action);
    } else console.warn('no trigger set'); //not implemented

  };

  _proto.normalAction = function normalAction() {//console.log('normalAction not implemented');
    //usually do nothing, or some child may increase or implement some frame action
  };

  return TriggerOnIncrease;
}(_value.Value), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "thresholdvalue", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "action", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "numerator", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "denominator", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class);
exports.TriggerOnIncrease = TriggerOnIncrease;
//# sourceMappingURL=trigger-on-increase.js.map
