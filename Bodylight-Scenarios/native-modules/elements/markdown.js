"use strict";

exports.__esModule = true;
exports.Markdown = void 0;

var _aureliaI18n = require("aurelia-i18n");

var _aureliaFramework = require("aurelia-framework");

var _aureliaFetchClient = require("aurelia-fetch-client");

var _markdownaurelia = require("./markdownaurelia");

var _aureliaEventAggregator = require("aurelia-event-aggregator");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

//import Mathjax from "mathjax";

/**
 * Enables markdown for web components - instead of updating dynamic html, updates directly the innerHTML
 * Inherits MD rendering from markdownaurelia component
 */
var Markdown = (_dec = (0, _aureliaFramework.inject)(_aureliaI18n.I18N, _aureliaFetchClient.HttpClient, _aureliaEventAggregator.EventAggregator), _dec(_class = (_class2 = /*#__PURE__*/function (_Markdownaurelia) {
  _inheritsLoose(Markdown, _Markdownaurelia);

  function Markdown(i18n, httpclient, ea) {
    var _this;

    _this = _Markdownaurelia.call(this, i18n, httpclient, ea) || this;

    _initializerDefineProperty(_this, "src", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "watchhash", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "base", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "fromid", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "toc", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "content", _descriptor6, _assertThisInitialized(_this));

    return _this;
  }

  var _proto = Markdown.prototype;

  _proto.bind = function bind() {
    //console.log('bdlmarkdown bind() src:', this.src);
    _Markdownaurelia.prototype.bind.call(this);
  };

  _proto.attached = function attached() {
    _Markdownaurelia.prototype.attached.call(this); //console.log('bdlmarkdown attached() src:', this.src);

  };

  _proto.update = function update() {
    //console.log('markdown2 update called by OOP polymorphism mydiv, html', this.mydiv, this.html);
    this.mydiv.innerHTML = this.html;

    _Markdownaurelia.prototype.update.call(this);
  };

  _proto.changesrc = function changesrc() {
    var _Markdownaurelia$prot;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    //console.log('bdlmarkdown changesrc:', args);
    (_Markdownaurelia$prot = _Markdownaurelia.prototype.changesrc).call.apply(_Markdownaurelia$prot, [this].concat(args));
  };

  return Markdown;
}(_markdownaurelia.Markdownaurelia), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "src", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "watchhash", [_aureliaFramework.bindable], {
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
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "fromid", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "toc", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "content", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.Markdown = Markdown;
//# sourceMappingURL=markdown.js.map
