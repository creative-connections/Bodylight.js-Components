"use strict";

exports.__esModule = true;
exports.Value = void 0;

var _aureliaTemplating = require("aurelia-templating");

var _lodash = _interopRequireDefault(require("lodash"));

var _aureliaFramework = require("aurelia-framework");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var Value = (_dec = (0, _aureliaFramework.inject)(Element), _dec(_class = (_class2 = /*#__PURE__*/function () {
  //constructor(){}
  function Value(element) {
    var _this = this;

    _initializerDefineProperty(this, "fromid", _descriptor, this);

    _initializerDefineProperty(this, "refindex", _descriptor2, this);

    _initializerDefineProperty(this, "convertor", _descriptor3, this);

    _initializerDefineProperty(this, "default", _descriptor4, this);

    _initializerDefineProperty(this, "precision", _descriptor5, this);

    _initializerDefineProperty(this, "throttle", _descriptor6, this);

    _initializerDefineProperty(this, "dataevent", _descriptor7, this);

    _initializerDefineProperty(this, "adobeid", _descriptor8, this);

    this.element = element; //create lambda function which is added as listener later

    this.handleValueChange = function (e) {
      //e.detail do not reallocate - using same buffer, thus slicing to append to data array
      //let edata = e.detail.data.slice();
      //throttle update to reasonable frequency
      // _.throttle(()=> this.updateValue(e.detail.data[this.refindex]), this.throttle)();
      //call throttled function with args
      _this.myupdatevalue(e.detail.data[_this.refindex]);
    };

    this.handleRawValueChange = function (e) {
      console.log('catched event from adobe', e); //this.updateValue(e.target.value)
    };

    this.handleFMIAttached = function (e) {
      var fromel = document.getElementById(_this.fromid);

      if (fromel) {
        fromel.addEventListener('fmidata', _this.handleValueChange);
      } else {
        console.warn('fmi attached, but no element with id found:', _this.fromid);
      }
    };
  }

  var _proto = Value.prototype;

  _proto.bind = function bind() {
    var _this2 = this;

    //register throttled update function    
    if (typeof this.throttle === 'string') this.throttle = parseInt(this.throttle, 10);
    if (typeof this.dataevent === 'string') this.dataevent = this.dataevent === 'true';
    if (typeof this.precision === 'string') this.precision = parseInt(this.precision, 10);
    this.myupdatevalue = _lodash.default.throttle(this.updateValue, this.throttle);
    if (this.default && typeof this.default === 'string') this.value = parseFloat(this.default); //configure convertors - used to convert units received from fmi

    if (this.convertor) {
      //used code from fmi component
      //TODO change to custom attribute
      var convertvalues = [this.convertor];

      var identity = function identity(x) {
        return x;
      };

      this.operation = [];

      for (var i = 0; i < convertvalues.length; i++) {
        if (convertvalues[i].includes(',')) {
          //convert values are in form numerator,denominator contains comma ','
          var convertitems = convertvalues[i].split(',');
          if (convertitems[0] === '1' && convertitems[1] === '1' && convertitems[2] === '0') this.operation.push(identity);else {
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
              var expression = convertvalues[i].replace(/[^-\d/*+.()%xeMathroundsic]/g, '');
              console.log('chartjs bind(), evaluating expression:' + convertvalues[i] + ' securely filtered to :' + expression); // eslint-disable-next-line no-eval

              _this2.operation.push(function (x) {
                return eval(expression);
              });
            })();
          }
        }
      }
    }
  };

  _proto.attached = function attached() {
    //listening to custom event fmidata
    //listening to custom event fmidata and fmireset
    var fromel = document.getElementById(this.fromid);

    if (fromel) {
      fromel.addEventListener('fmidata', this.handleValueChange);
    } else {
      console.warn('chartjs, null fromid element, waiting to be attached');
      document.addEventListener('fmiattached', this.handleFMIAttached);
    }

    if (this.adobeid) {
      var adobeel = document.getElementById(this.adobeid);

      if (adobeel) {
        console.log('listening to adobe events');
        adobeel.addEventListener('change', this.handleRawValueChange);
      } else {
        console.warn('no adobe element found to listen changes');
      }
    }
  };

  _proto.detached = function detached() {
    if (document.getElementById(this.fromid)) document.getElementById(this.fromid).removeEventListener('fmidata', this.handleValueChange);
    if (this.adobeid && document.getElementById(this.adobeid)) document.getElementById(this.adobeid).removeEventListener('change', this.handleRawValueChange);
  };

  _proto.updateValue = function updateValue(rawvalue) {
    if (rawvalue.toPrecision) {
      if (this.operation) this.value = this.operation[0](rawvalue).toPrecision(this.precision); // * this.numerator / this.denominator + this.addconst;
      else this.value = rawvalue.toPrecision(this.precision);
    } else this.value = rawvalue;

    if (this.dataevent) {
      var c = new CustomEvent('fmivalue', {
        detail: {
          value: this.value
        }
      });
      this.element.dispatchEvent(c);
    }
  };

  return Value;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "fromid", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "refindex", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "convertor", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "default", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "precision", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 4;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "throttle", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 500;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "dataevent", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "adobeid", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.Value = Value;
//# sourceMappingURL=value.js.map
