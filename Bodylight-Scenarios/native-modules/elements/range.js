"use strict";

exports.__esModule = true;
exports.Range = void 0;

var _aureliaFramework = require("aurelia-framework");

var _lodash = _interopRequireDefault(require("lodash"));

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var Range = (_class = /*#__PURE__*/function () {
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
  function Range() {
    var _this = this;

    _initializerDefineProperty(this, "min", _descriptor, this);

    _initializerDefineProperty(this, "max", _descriptor2, this);

    _initializerDefineProperty(this, "default", _descriptor3, this);

    _initializerDefineProperty(this, "step", _descriptor4, this);

    _initializerDefineProperty(this, "value", _descriptor5, this);

    _initializerDefineProperty(this, "title", _descriptor6, this);

    _initializerDefineProperty(this, "showicons", _descriptor7, this);

    _initializerDefineProperty(this, "globalanim", _descriptor8, this);

    _initializerDefineProperty(this, "fireevent", _descriptor9, this);

    this.refinput = void 0;
    this.refnumber = void 0;

    _initializerDefineProperty(this, "listenkey", _descriptor10, this);

    _initializerDefineProperty(this, "activationkey", _descriptor11, this);

    this.actived = false;

    _initializerDefineProperty(this, "ids", _descriptor12, this);

    _initializerDefineProperty(this, "convertors", _descriptor13, this);

    _initializerDefineProperty(this, "fromid", _descriptor14, this);

    _initializerDefineProperty(this, "refindex", _descriptor15, this);

    _initializerDefineProperty(this, "id", _descriptor16, this);

    _initializerDefineProperty(this, "throttle", _descriptor17, this);

    _initializerDefineProperty(this, "smooth", _descriptor18, this);

    _initializerDefineProperty(this, "smoothstep", _descriptor19, this);

    this.handleValueChange = function (e) {
      //sets data to dataset
      //apply value convert among all data
      if (_this.fromid) {
        if (_this.refindex) {
          var rawdata = e.detail.data[_this.refindex];
          _this.value = _this.operation[0](rawdata); //  else this.value = rawdata;
          //console.log('Range received rawdata '+rawdata+' converted value '+this.value);
          //console.log('this operation',this.operation)

          _this.updatevalue(); //call function - it may be throttled 

        } else {
          if (_this.smooth) {//do smooth step 
          }
        }
      }
    };
  }

  var _proto = Range.prototype;

  _proto.bind = function bind() {
    var _this2 = this;

    if (typeof this.smooth === 'string') this.smooth = this.smooth === 'true';
    if (typeof this.step === 'string') this.step = parseFloat(this.step);
    if (typeof this.showicons === 'string') this.showicons = this.showicons === 'true';
    if (typeof this.globalanim === 'string') this.globalanim = this.globalanim === 'true';

    if (this.listenkey && this.listenkey === 'true') {
      if (this.activationkey && this.activationkey === 'A') this.actived = true; //first activationkey 'A' is by default actived

      document.onkeypress = function (e) {
        //e = e || window.event;// use e.keyCode
        //if (window.listenrange)
        if (this.activationkey && e.charCode >= 65 && e.charCode <= 90) {
          //'A' ..'Z' is pressed
          this.actived = e.key === this.activationkey;
        }

        if (!this.activationkey || this.actived) {
          //activationkey not defined or actived - 'A' or
          var number = e.charCode - 97; //0..9

          var mappedvalue = parseInt(this.min);

          if (number > 0) {
            //a..j interpolates to values between min and max
            if (number < 9) mappedvalue = parseInt(this.min) + (parseInt(this.max) - parseInt(this.min)) * number / 10;else mappedvalue = parseInt(this.max);
          }

          this.setValue(mappedvalue);
        }
      };
    }

    if (this.ids) this.ids2send = this.ids.split(','); //configure convertors - used to convert units received from fmi

    this.operation = [];

    if (this.convertors) {
      var convertvalues = this.convertors.split(';');

      var identity = function identity(x) {
        return x;
      };

      for (var i = 0; i < convertvalues.length; i++) {
        if (convertvalues[i].includes(',')) {
          //convert values are in form numerator,denominator contains comma ','
          var convertitems = convertvalues[i].split(',');
          if (convertitems[0] === '1' && convertitems[1] === '1') this.operation.push(identity);else {
            (function () {
              var numerator = parseFloat(convertitems[0]);
              var denominator = parseFloat(convertitems[1]);
              var addend = convertitems.length > 2 ? parseFloat(convertitems[2]) : 0;

              _this2.operation.push(function (x) {
                return x * numerator / denominator + addend;
              });
            })();
          }
        } else {
          //convert values are in form of expression, do not contain comma
          if (convertvalues === '1/x') this.operation.push(function (x) {
            return 1 / x;
          });else {
            (function () {
              // for eval() security filter only allowed characters:
              // algebraic, digits, e, dot, modulo, parenthesis and 'x' and 'e' is allowed
              var expression = convertvalues[i].replace(/[^-\d/*+.()%xe]/g, '');
              console.log('chartjs bind(), evaluating expression:' + convertvalues[i] + ' securely filtered to :' + expression); // eslint-disable-next-line no-eval

              _this2.operation.push(function (x) {
                return eval(expression);
              });
            })();
          }
        }
      }
    } //register throttled update function


    if (typeof this.throttle === 'string') this.throttle = parseInt(this.throttle, 10);

    if (this.throttle > 0) {
      //throttle
      this.updatevalue = _lodash.default.throttle(this.setCurrentValue.bind(this), this.throttle);
    } else {
      //directly call update
      this.updatevalue = this.setCurrentValue.bind(this);
    }
  };

  _proto.attached = function attached() {
    var maxlength = 4 + this.max.length + (this.step && this.step.toString().includes('.') ? this.step.toString().length : 1);
    this.refnumber.style = 'width:' + maxlength + 'ch';

    if (this.fromid) {
      if (this.operation.length == 0) {
        console.warn('fromid defined, identity convertor added.');

        var identity = function identity(x) {
          return x;
        };

        this.operation.push(identity);
      } //add event listener


      var fromidel = document.getElementById(this.fromid);
      if (fromidel) fromidel.addEventListener('fmidata', this.handleValueChange);else console.warn('range fromid element not found with id:', this.fromid);
    }
  };

  _proto.setDefault = function setDefault() {
    this.setValue(this.default);
  };

  _proto.setValue = function setValue(value) {
    if (this.refnumber) this.refnumber.value = value;

    if (this.refinput) {
      this.refinput.value = value;
      this.refinput.dispatchEvent(new Event(this.fireevent, {
        bubbles: true,
        cancelable: true
      }));
    }
  };

  _proto.setCurrentValue = function setCurrentValue() {
    this.setValue(this.value);
  };

  _proto.valueChanged = function valueChanged(newValue, oldValue) {
    //if (oldValue !== newValue)
    if (this.ids) {
      //semaphore only one change in time is allowed
      if (!window.rangebinding) {
        window.rangebinding = true; //sending value converted to other ids
        //if (this.ids2send.length !== this.values2send.length) {console.log('warning ids and values contain different number of items.', this.ids2send, this.values2send); return;}

        for (var i = 0; i < this.ids2send.length; i++) {
          var inputel = document.getElementById(this.ids2send[i]);

          if (inputel) {
            inputel.value = this.operation[i](newValue);
            console.log('range valuechange id,converted value:', this.ids2send[i], inputel.value);
            var event = new Event(this.fireevent);
            inputel.dispatchEvent(event);
          } else {
            console.warn('inputel not found for id', this, ids2send[i]);
          }
        }

        window.rangebinding = false;
      }
    } else {
      //single value is change e.g. externally
      this.setValue(newValue);

      if (this.globalanim) {
        if (window.ani && window.ani.exportRoot) window.ani.exportRoot.children[0].gotoAndStop(newValue);
      }
    }
  };

  return Range;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "min", [_aureliaFramework.bindable], {
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
  initializer: null
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
}), _descriptor18 = _applyDecoratedDescriptor(_class.prototype, "smooth", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor19 = _applyDecoratedDescriptor(_class.prototype, "smoothstep", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
})), _class);
exports.Range = Range;
//# sourceMappingURL=range.js.map
