"use strict";

exports.__esModule = true;
exports.OptionValue = void 0;

var _aureliaFramework = require("aurelia-framework");

var _class, _descriptor, _descriptor2;

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * <bdl-option-value value="some default value" ids="id1,attr1;id2,attr2"></bdl-option-value>
 * value is deafult value - it can be changed in input field
 * ids is ';' and ',' separated values of id and attributes to be changed when value is changed in inputfield
 */
var OptionValue = (_class = /*#__PURE__*/function () {
  function OptionValue() {
    _initializerDefineProperty(this, "value", _descriptor, this);

    _initializerDefineProperty(this, "ids", _descriptor2, this);

    this.regex = /http:\/\/[^\/]*/i;
    this.myids = void 0;
  }

  var _proto = OptionValue.prototype;

  _proto.bind = function bind() {
    var iddef = this.ids.split(';'); // id1,attr1;id2,attr2

    this.myids = iddef.map(function (x) {
      return x.split(',');
    });
  };

  _proto.valueChanged = function valueChanged(newValue, oldValue) {
    for (var _iterator = _createForOfIteratorHelperLoose(this.myids), _step; !(_step = _iterator()).done;) {
      var myid = _step.value;
      var myattrvalue = document.getElementById(myid[0]).getAttribute(myid[1]);
      myattrvalue.replace(this.regex, newValue);
      document.getElementById(myid[0]).setAttribute(myid[1], myattrvalue);
    }
  };

  return OptionValue;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "value", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "ids", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class);
exports.OptionValue = OptionValue;
//# sourceMappingURL=option-value.js.map
