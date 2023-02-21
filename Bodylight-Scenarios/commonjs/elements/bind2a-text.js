"use strict";

exports.__esModule = true;
exports.Bind2aText = void 0;

var _bind2a = require("./bind2a");

var _aureliaTemplating = require("aurelia-templating");

var _bind2animtext = require("./bind2animtext");

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * component used to define binding between Adobe Animation object and FMU model simulation
 * value is converted to text which is shown, using bind2animtext
 */
var Bind2aText = (_class = /*#__PURE__*/function (_Bind2a) {
  _inheritsLoose(Bind2aText, _Bind2a);

  //name of animation component in AA
  //index of variable in fmu array
  function Bind2aText() {
    var _this;

    _this = _Bind2a.call(this) || this;

    _initializerDefineProperty(_this, "aname", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "findex", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "convertor", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "precision", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "fixed", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "suffix", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "prefix", _descriptor7, _assertThisInitialized(_this));

    return _this;
  } //it is called when all bindable properties are set to class instance;


  var _proto = Bind2aText.prototype;

  _proto.bind = function bind() {
    //create bind2animation structure
    var binding = new _bind2animtext.Bind2animtext(this.findex, this.aname, this.parseConvertors(), this.precision ? parseInt(this.precision, 10) : 0, this.fixed ? parseInt(this.fixed, 10) : 1, this.suffix ? this.suffix : '', this.prefix ? this.prefix : '');
    this.addbinding(binding);
  };

  return Bind2aText;
}(_bind2a.Bind2a), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "aname", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "findex", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "convertor", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "precision", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "fixed", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "suffix", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "prefix", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class);
exports.Bind2aText = Bind2aText;
//# sourceMappingURL=bind2a-text.js.map
