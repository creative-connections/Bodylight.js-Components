"use strict";

exports.__esModule = true;
exports.GradualinputCustomAttribute = void 0;

var _aureliaFramework = require("aurelia-framework");

var _dec, _class;

//@customAttribute('fmu-index')
var GradualinputCustomAttribute = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.DOM.Element), _dec(_class = /*#__PURE__*/function () {
  function GradualinputCustomAttribute(element) {
    this.value = void 0;
    this.element = element;
  }

  var _proto = GradualinputCustomAttribute.prototype;

  _proto.bind = function bind() {
    var options = this.value.split(',');
    this.numsteps = options[0];
    this.timeinterval = options[1];
  };

  return GradualinputCustomAttribute;
}()) || _class);
exports.GradualinputCustomAttribute = GradualinputCustomAttribute;
//# sourceMappingURL=gradualinput.js.map
