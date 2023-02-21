"use strict";

exports.__esModule = true;
exports.MarkdownBookAu = void 0;

var _markdownBook = require("./markdown-book");

var _aureliaFramework = require("aurelia-framework");

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var MarkdownBookAu = (_class = /*#__PURE__*/function (_MarkdownBook) {
  _inheritsLoose(MarkdownBookAu, _MarkdownBook);

  function MarkdownBookAu() {
    var _this;

    console.log('bdlmarkdownbookau calling super');
    _this = _MarkdownBook.call(this) || this;

    _initializerDefineProperty(_this, "summary", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "index", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "base", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "params", _descriptor4, _assertThisInitialized(_this));

    return _this;
  }

  return MarkdownBookAu;
}(_markdownBook.MarkdownBook), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "summary", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "index", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "base", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "params", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class);
exports.MarkdownBookAu = MarkdownBookAu;
//# sourceMappingURL=markdown-book-au.js.map
