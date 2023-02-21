"use strict";

exports.__esModule = true;
exports.Bind2animtext = void 0;

var _bind2animation = require("./bind2animation");

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Bind2animtext = /*#__PURE__*/function (_Bind2animation) {
  _inheritsLoose(Bind2animtext, _Bind2animation);

  function Bind2animtext(_findex, _aname, _operation, precision, fixed, suffix, prefix) {
    var _this;

    if (precision === void 0) {
      precision = 0;
    }

    if (fixed === void 0) {
      fixed = 2;
    }

    if (suffix === void 0) {
      suffix = '';
    }

    if (prefix === void 0) {
      prefix = '';
    }

    _this = _Bind2animation.call(this, _findex, _aname, 0, 0, 0, 0, _operation) || this;
    _this.findex = _findex;
    _this.aname = _aname;
    _this.precision = precision;
    _this.fixed = fixed;
    _this.suffix = suffix;
    _this.prefix = prefix;
    return _this;
  }

  var _proto = Bind2animtext.prototype;

  _proto.convertf2a = function convertf2a(x) {
    if (this.operation) x = this.operation(x); //let xstr = x.toPrecision(4);
    //return x.toPrecision(4);

    return this.prefix + (this.precision > 0 ? x.toPrecision(this.precision) : x.toFixed(this.fixed)) + this.suffix;
  } //animobj is type of animate-adobe
  ;

  _proto.handleValue = function handleValue(animobj, value) {
    animobj.setText(this.aname, this.convertf2a(value)); //this.setText(binding.aname, convertedvalue);
  };

  return Bind2animtext;
}(_bind2animation.Bind2animation);

exports.Bind2animtext = Bind2animtext;
//# sourceMappingURL=bind2animtext.js.map
