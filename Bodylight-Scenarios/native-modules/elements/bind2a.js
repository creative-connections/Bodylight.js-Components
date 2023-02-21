"use strict";

exports.__esModule = true;
exports.Bind2a = void 0;

var _aureliaTemplating = require("aurelia-templating");

var _bind2animation = require("./bind2animation");

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * component used to define binding between Adobe Animation object and FMU model simulation
 * value is directly converted to animation state using bind2animationb
 */
var Bind2a = (_class = /*#__PURE__*/function () {
  //id of animate - optionall, g
  //id of fmu component -optional
  //name of animation component in AA
  //index of variable in fmu array
  //minimal value in animate component
  //maximal value in animate component
  //optional minimal value of variable from fmu model
  //optional maximal value of variable from fmu model
  function Bind2a() {
    _initializerDefineProperty(this, "aid", _descriptor, this);

    _initializerDefineProperty(this, "fid", _descriptor2, this);

    _initializerDefineProperty(this, "aname", _descriptor3, this);

    _initializerDefineProperty(this, "findex", _descriptor4, this);

    _initializerDefineProperty(this, "amin", _descriptor5, this);

    _initializerDefineProperty(this, "amax", _descriptor6, this);

    _initializerDefineProperty(this, "fmin", _descriptor7, this);

    _initializerDefineProperty(this, "fmax", _descriptor8, this);

    _initializerDefineProperty(this, "convertor", _descriptor9, this);

    this.index = 0;
    this.autofmin = false;
    this.autofmax = false;
  } //it is called when all bindable properties are set to class instance;


  var _proto = Bind2a.prototype;

  _proto.bind = function bind() {
    this.amin = parseFloat(this.amin);
    this.amax = parseFloat(this.amax); //optional fmin,fmax - if not set then autofmin fmax is triggered

    if (this.fmin) this.fmin = parseFloat(this.fmin);else this.autofmin = true;
    if (this.fmax) this.fmax = parseFloat(this.fmax);else this.autofmax = true; //create bind2animation structure

    var operation = this.parseConvertors();
    var binding = new _bind2animation.Bind2animation(this.findex, this.aname, this.amin, this.amax, this.fmin, this.fmax, operation, this.autofmin, this.autofmax);
    this.addbinding(binding);
  };

  _proto.parseConvertors = function parseConvertors() {
    //configure convertors - used to convert units received from fmi
    if (this.convertor) {
      var convertvalues = this.convertor.split(';');

      var identity = function identity(x) {
        return x;
      };

      var operations = [];

      for (var i = 0; i < convertvalues.length; i++) {
        if (convertvalues[i].includes(',')) {
          //convert values are in form numerator,denominator,addend contains comma ','
          var convertitems = convertvalues[i].split(',');
          if (convertitems[0] === '1' && convertitems[1] === '1' && (convertitems.length <= 2 || convertitems[2] === '0')) operations.push(identity);else {
            (function () {
              var numerator = parseFloat(convertitems[0]);
              var denominator = parseFloat(convertitems[1]);
              var addend = convertitems.length > 2 ? parseFloat(convertitems[2]) : 0;
              operations.push(function (x) {
                return x * numerator / denominator + addend;
              });
            })();
          }
        } else {
          //convert values are in form of expression, do not contain comma
          if (convertvalues === '1/x') operations.push(function (x) {
            return 1 / x;
          });else {
            (function () {
              //filter only allowed characters: algebraic, digits, e, dot, modulo, parenthesis and 'x' is allowed
              var expression = convertvalues[i].replace(/[^-\d/*+.\^()%xeMathsincopw]/g, ''); //console.log('bind2a bind(), evaluating expression:' + convertvalues[i] + ' securely filtered to :' + expression);
              // eslint-disable-next-line no-eval

              operations.push(function (x) {
                return eval(expression);
              });
            })();
          }
        }
      } //only one onvertor is usable in this component - return first


      return operations[0];
    }

    return null;
  };

  _proto.addbinding = function addbinding(binding) {
    //create global bind2animation array - it is used then by animate-adobe instance
    if (!window.animatebindings) window.animatebindings = []; //keep index within the array, will be used when detaching

    this.index = window.animatebindings.push(binding) - 1;
  };

  _proto.unbind = function unbind() {
    //remove binding structure from global array - using index position
    window.animatebindings.splice(this.index, 1);
  };

  return Bind2a;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "aid", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "fid", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "aname", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "findex", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "amin", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "amax", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 100;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "fmin", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "fmax", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, "convertor", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class);
exports.Bind2a = Bind2a;
//# sourceMappingURL=bind2a.js.map
