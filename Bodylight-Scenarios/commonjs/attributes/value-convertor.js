"use strict";

exports.__esModule = true;
exports.ValueConvertorCustomAttribute = void 0;

var _aureliaFramework = require("aurelia-framework");

var _dec, _class;

//@customAttribute('value-convertor')

/**
 * EITHER
 * value-convertor = "nominator1,denominator1,addend1;nominator2,denominator2,addend2;..."
 * OR
 * value-convertor = "expression1(x);expression2(x);..." where 'x' holds value to be converted
 */
var ValueConvertorCustomAttribute = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.DOM.Element), _dec(_class = /*#__PURE__*/function () {
  function ValueConvertorCustomAttribute(element) {
    this.element = element;
  } //binds operation array into parent element view-model operation.


  var _proto = ValueConvertorCustomAttribute.prototype;

  _proto.bind = function bind() {
    var _this = this;

    //
    var convertvalues = this.value.split(';');

    var identity = function identity(x) {
      return x;
    };

    this.operation = [];

    for (var i = 0; i < convertvalues.length; i++) {
      if (convertvalues[i].includes(',')) {
        //convert values are in form numerator,denominator contains comma ','
        var convertitems = convertvalues[i].split(',');

        if (convertitems[0] === '1' && convertitems[1] === '1') {
          this.operation.push(identity);
        } else {
          (function () {
            var numerator = parseFloat(convertitems[0]);
            var denominator = parseFloat(convertitems[1]);

            _this.operation.push(function (x) {
              return x * numerator / denominator;
            });
          })();
        }
      } else {
        //convert values are in form of expression, do not contain comma
        if (convertvalues === '1/x') {
          this.operation.push(function (x) {
            return 1 / x;
          });
        } else {
          (function () {
            // for eval() security filter only allowed characters:
            // algebraic, digits, e, dot, modulo, parenthesis and 'x' and 'e' is allowed
            var expression = convertvalues[i].replace(/[^-\d/*+.()%xe]/g, '');
            console.log('chartjs bind(), evaluating expression:' + convertvalues[i] + ' securely filtered to :' + expression); // eslint-disable-next-line no-eval

            _this.operation.push(function (x) {
              return eval(expression);
            });
          })();
        }
      }
    }

    if (this.element && this.element.au && this.element.au.controller && typeof this.element.au.controller === 'object' && this.element.au.controller.viewModel && typeof this.element.au.controller.viewModel === 'object') {
      this.elementVM = this.element.au.controller.viewModel;
      this.elementVM.operation = this.operation;
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

  return ValueConvertorCustomAttribute;
}()) || _class);
exports.ValueConvertorCustomAttribute = ValueConvertorCustomAttribute;
//# sourceMappingURL=value-convertor.js.map
