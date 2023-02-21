"use strict";

exports.__esModule = true;
exports.FmuIndexCustomAttribute = void 0;

var _aureliaFramework = require("aurelia-framework");

var _dec, _class;

//@customAttribute('fmu-index')
var FmuIndexCustomAttribute = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.DOM.Element), _dec(_class = /*#__PURE__*/function () {
  function FmuIndexCustomAttribute(element) {
    var _this = this;

    this.element = element;

    this.handleValueChange = function (e) {
      _this.elementVM.handleValueChange(e);
    };

    this.handleReset = function (e) {
      _this.elementVM.handleReset(e);
    };

    this.handleFMIAttached = function (e) {
      //this.elementVM.handleValueChange(e);
      _this.fromel = document.getElementById(fromid);

      if (_this.fromel) {
        _this.fromel.addEventListener('fmidata', _this.handleValueChange);

        _this.fromel.addEventListener('fmireset', _this.handleReset);
      } else {
        console.warn('fmi attached, but no element with id found:', _this.fromid);
      }
    };
  }

  var _proto = FmuIndexCustomAttribute.prototype;

  _proto.bind = function bind() {
    var fmureferences = this.value.split(','); //split by ,

    this.fromid = fmureferences[0];
    var findex = fmureferences[1];
    this.fromel = document.getElementById(fromid);

    if (this.fromel) {
      this.fromel.addEventListener('fmidata', this.handleValueChange);
      this.fromel.addEventListener('fmireset', this.handleReset);
    } else {
      console.warn('chartjs, null fromid element, waiting to be attached');
      document.addEventListener('fmiattached', this.handleFMIAttached);
    }

    if (this.element && this.element.au && this.element.au.controller && typeof this.element.au.controller === 'object' && this.element.au.controller.viewModel && typeof this.element.au.controller.viewModel === 'object') {
      this.elementVM = this.element.au.controller.viewModel; //check whether this.elementVM has changesrc function - to be called in event listener
      //this.isReadMDCustomElement = (typeof this.elementVM.changesrc === 'function');
    } else {
      console.warn('element viewmodel object doesnot exists, cant be called by handleXXX methods');
    }
  };

  _proto.unbind = function unbind() {
    if (this.fromel) {
      this.fromel.removeEventListener('fmidata', this.handleValueChange);
      this.fromel.removeEventListener('fmireset', this.handleReset);
      this.fromel.removeEventListener('fmiattached', this.handleFMIAttached);
    }
  };

  _proto.valueChanged = function valueChanged(newValue, oldValue) {};

  return FmuIndexCustomAttribute;
}()) || _class);
exports.FmuIndexCustomAttribute = FmuIndexCustomAttribute;
//# sourceMappingURL=fmu-index.js.map
