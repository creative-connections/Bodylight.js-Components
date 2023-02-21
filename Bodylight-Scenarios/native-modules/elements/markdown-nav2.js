"use strict";

exports.__esModule = true;
exports.MarkdownNav2 = void 0;

var _aureliaFramework = require("aurelia-framework");

var _aureliaI18n = require("aurelia-i18n");

var _aureliaFetchClient = require("aurelia-fetch-client");

var _markdownnav = require("./markdownnav");

var _aureliaEventAggregator = require("aurelia-event-aggregator");

var _aureliaTemplating = require("aurelia-templating");

var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var MarkdownNav2 = (_dec = (0, _aureliaFramework.inject)(_aureliaI18n.I18N, _aureliaFetchClient.HttpClient, _aureliaEventAggregator.EventAggregator), _dec2 = (0, _aureliaTemplating.useView)('./markdownnav.html'), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Markdownnav) {
  _inheritsLoose(MarkdownNav2, _Markdownnav);

  function MarkdownNav2(i18n, httpclient, ea) {
    var _this;

    _this = _Markdownnav.call(this, i18n, httpclient, ea) || this;

    _initializerDefineProperty(_this, "src", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "navstyle", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "base", _descriptor3, _assertThisInitialized(_this));

    _this.notinitread = true;
    return _this;
  }

  return MarkdownNav2;
}(_markdownnav.Markdownnav), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "src", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "navstyle", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "base", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
})), _class2)) || _class) || _class);
exports.MarkdownNav2 = MarkdownNav2;
//# sourceMappingURL=markdown-nav2.js.map
