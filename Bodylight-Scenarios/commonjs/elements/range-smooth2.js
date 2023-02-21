"use strict";

exports.__esModule = true;
exports.RangeSmooth2 = void 0;

var _aureliaFramework = require("aurelia-framework");

var _range = require("./range");

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

//import _ from "lodash";
var RangeSmooth2 = (_class = /*#__PURE__*/function (_Range) {
  _inheritsLoose(RangeSmooth2, _Range);

  //@bindable firedata = false; //'position'
  //name of the event to be dispatched - should be same as fmi eventlisten
  //true or false
  //if defined - then
  //optional comma separated id to send value change ,e.g. id1,id2,id3
  //comma separated xpression with x as value e.g. (100-2-x)/3,(100-2-x)/3,(100-2-x)/3
  //optional twoway settings - if set - fmudata may set the value of range
  //id of fmu component
  //index of variable to be listened
  //throttle update value from fromid, default every 1s
  //@bindable smooth = false;
  //@bindable smoothstep = 1;
  function RangeSmooth2() {
    var _this;

    _this = _Range.call(this) || this;

    _initializerDefineProperty(_this, "min", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "max", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "default", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "step", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "value", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "title", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "showicons", _descriptor7, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "globalanim", _descriptor8, _assertThisInitialized(_this));

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

    _initializerDefineProperty(_this, "id", _descriptor16, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "throttle", _descriptor17, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "desiredValue", _descriptor18, _assertThisInitialized(_this));

    _this.handleValueChange = function (e) {
      //sets data to dataset
      //apply value convert among all data
      if (_this.fromid) {
        if (_this.refindex) {
          var rawdata = e.detail.data[_this.refindex];
          _this.value = _this.operation[0](rawdata); //  else this.value = rawdata;
          //console.log('Range received rawdata '+rawdata+' converted value '+this.value);
          //console.log('this operation',this.operation)

          _this.updatevalue(); //call function - it may be throttled 

        }

        if (Math.abs(parseFloat(_this.value) - parseFloat(_this.desiredvalue)) >= _this.step) {
          _this.doValueStep();
        }
      }
    };

    return _this;
  }

  var _proto = RangeSmooth2.prototype;

  _proto.attached = function attached() {
    _Range.prototype.attached.call(this);
  };

  _proto.setDesiredDefault = function setDesiredDefault() {
    this.desiredvalue = this.default;
  };

  _proto.doValueStep = function doValueStep() {
    var myvalue = parseFloat(this.value);
    var mydesiredvalue = parseFloat(this.desiredvalue);

    if (mydesiredvalue > this.max) {
      mydesiredvalue = this.max;
      this.desiredvalue = this.max.toString();
    } //set desiredvalue to max to not to overflow 


    if (mydesiredvalue < this.min) {
      mydesiredvalue = this.min;
      this.desiredvalue = this.min.toString();
    } //set desiredvalue to min to not to overflow 


    if (myvalue < mydesiredvalue) myvalue += this.step; //note step needs to be >0
    else myvalue -= this.step;
    this.value = myvalue.toString();
  };

  return RangeSmooth2;
}(_range.Range), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "min", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "max", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "default", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "step", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "value", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "title", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "showicons", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "globalanim", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
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
}), _descriptor16 = _applyDecoratedDescriptor(_class.prototype, "id", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor17 = _applyDecoratedDescriptor(_class.prototype, "throttle", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1000;
  }
}), _descriptor18 = _applyDecoratedDescriptor(_class.prototype, "desiredValue", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class);
exports.RangeSmooth2 = RangeSmooth2;
//# sourceMappingURL=range-smooth2.js.map
