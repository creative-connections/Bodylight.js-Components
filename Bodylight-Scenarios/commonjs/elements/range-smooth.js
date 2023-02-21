"use strict";

exports.__esModule = true;
exports.RangeSmooth = void 0;

var _range = require("./range");

var _aureliaFramework = require("aurelia-framework");

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * when user clicks or change the input rapidly - it will generate 'number' of events between current and target values to be sent
 * with 'time' in ms between each event
 */
var RangeSmooth = (_class = /*#__PURE__*/function (_Range) {
  _inheritsLoose(RangeSmooth, _Range);

  //name of the event to be dispatched - should be same as fmi eventlisten
  //true or false
  //if defined - then
  //optional comma separated id to send value change ,e.g. id1,id2,id3
  //comma separated xpression with x as value e.g. (100-2-x)/3,(100-2-x)/3,(100-2-x)/3
  //optional twoway settings - if set - fmudata may set the value of range
  //id of fmu component
  //index of variable to be listened
  function RangeSmooth() {
    var _this;

    _this = _Range.call(this) || this;

    _initializerDefineProperty(_this, "number", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "time", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "min", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "max", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "default", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "step", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "value", _descriptor7, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "title", _descriptor8, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "fireevent", _descriptor9, _assertThisInitialized(_this));

    _this.refinput = void 0;
    _this.refnumber = void 0;

    _initializerDefineProperty(_this, "listenkey", _descriptor10, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "activationkey", _descriptor11, _assertThisInitialized(_this));

    _this.actived = false;

    _initializerDefineProperty(_this, "ids", _descriptor12, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "convertors", _descriptor13, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "fromid", _descriptor14, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "refindex", _descriptor15, _assertThisInitialized(_this));

    _this.myvalue = void 0;
    _this.smoothing = false;

    _this.handleValueChange = function (e) {
      _this.smoothValue(e);

      e.stopPropagation();
    };

    return _this;
  }

  var _proto = RangeSmooth.prototype;

  _proto.bind = function bind() {
    _Range.prototype.bind.call(this);

    this.myvalue = this.default;

    if (typeof this.number === 'string') {
      this.number = parseInt(this.number);
    }

    if (typeof this.time === 'string') {
      this.time = parseInt(this.time);
    }
  };

  _proto.attached = function attached() {
    _Range.prototype.attached.call(this); //catch event from range or number - smooth it


    this.refinput.addEventListener('input', this.handleValueChange);
    this.refnumber.addEventListener('input', this.handleValueChange);
    this.value = parseFloat(this.myvalue);
  };

  _proto.detached = function detached() {
    //super.de
    this.refinput.removeEventListener('input', this.handleValueChange);
    this.refnumber.removeEventListener('input', this.handleValueChange);
  };

  _proto.smoothValue = function smoothValue(e) {
    var _this2 = this;

    //check if it is not smoothing another value
    if (!this.smoothing) {
      this.smoothing = true;
      this.targetvalue = parseFloat(e.target.value);
      this.currentvalue = this.value;
      console.log('smoothing from ' + this.value + ' to target ' + this.targetvalue);
      this.valuestep = this.step;
      var i = 0;
      var mystep = Math.sign(this.targetvalue - this.value) * this.step;
      var howmanysteps = Math.abs(this.targetvalue - this.currentvalue) / this.step; //schedule smooth steps

      var newvalue = this.value;

      var _loop = function _loop(_i) {
        newvalue = _this2.value + mystep * _i;
        var myvalue = newvalue;
        console.log('creating event with new value in hidden input listened by others ' + newvalue);
        setTimeout(function () {
          //this.value += this.step;
          var event = new Event('input', {
            bubbles: true
          });
          _this2.refsmooth.value = myvalue;

          _this2.refsmooth.dispatchEvent(event); //console.log('sending value:', this.refsmooth.value);

        }, _this2.time * _i);
      };

      for (var _i = 0; _i < howmanysteps; _i++) {
        _loop(_i);
      } //schedule smoothing to be stopped;


      this.smoothing = false;
      this.value = this.targetvalue;
      /*
      for (let i = 1; i < this.number; i++) {
          setTimeout(() => {
              this.value += this.valuestep;
              let event = new Event('input', {bubbles:true});
              this.refsmooth.value = this.value;
              this.refsmooth.dispatchEvent(event);
              console.log('sending value:', this.value);
          }, this.time * i);
      }
      setTimeout(() => {
          this.value = this.targetvalue;
          let event = new Event('input', {bubbles:true});
          this.refsmooth.value = this.value;
          this.refsmooth.dispatchEvent(event);
          this.smoothing = false;
          console.log('sending value:', this.value);
      }, this.time * this.number);
      */
    } else {
      //only set target value
      this.targetvalue = parseFloat(e.target.value); //this.valuestep = (this.targetvalue - this.value) / this.number;
    }
  };

  return RangeSmooth;
}(_range.Range), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "number", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 5;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "time", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 200;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "min", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "max", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "default", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "step", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "value", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "title", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, "fireevent", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 'input';
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, "listenkey", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, "activationkey", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class.prototype, "ids", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class.prototype, "convertors", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class.prototype, "fromid", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class.prototype, "refindex", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class);
exports.RangeSmooth = RangeSmooth;
//# sourceMappingURL=range-smooth.js.map
