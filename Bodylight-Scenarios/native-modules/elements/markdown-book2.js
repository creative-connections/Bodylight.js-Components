"use strict";

exports.__esModule = true;
exports.MarkdownBook2 = void 0;

var _markdownBook = require("./markdown-book");

var _aureliaFramework = require("aurelia-framework");

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var MarkdownBook2 = (_class = /*#__PURE__*/function (_MarkdownBook) {
  _inheritsLoose(MarkdownBook2, _MarkdownBook);

  //shownav=true;
  function MarkdownBook2() {
    var _this;

    _this = _MarkdownBook.call(this) || this;

    _initializerDefineProperty(_this, "summary", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "index", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "base", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "params", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "toc", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "model", _descriptor6, _assertThisInitialized(_this));

    _this.params = 'shownav,1;showtoc,2;showmenu,3;base,4';
    _this.shownav = true;
    _this.showtoc = true;
    return _this;
  }

  var _proto = MarkdownBook2.prototype;

  _proto.bind = function bind() {
    _MarkdownBook.prototype.bind.call(this); //console.log('markdownbook bind shownav', this.shownav);

  };

  _proto.attached = function attached() {
    console.log('markdown book2 attached() toc', this.toc); //super.attached();
    //console.log('markdownbook attached shownav', this.shownav);
  };

  _proto.tocChanged = function tocChanged(newValue, oldValue) {
    this.mytoc.innerHTML = newValue;
  };

  _proto.scrollto = function scrollto(id) {
    var el = document.getElementById(id);
    console.log('markdownbook2 scrollto() id,el', id, el);
    el.scrollIntoView(); //        document.getElementById(id).scrollIntoView();
  };

  _proto.changesrc = function changesrc() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    //super.changesrc(...args);
    if (args[0]) this.shownav = args[0] !== 'false';
    if (args['shownav']) this.shownav = args['shownav'] !== 'false';
    if (args[1]) this.showtoc = args[1] !== 'false';
    if (args['showtoc']) this.showtoc = args['showtoc'] !== 'false';
    if (args[2]) this.showmenu = args[2] !== 'false';
    if (args['showmenu']) this.showmenu = args['showmenu'] !== 'false'; //console.log('bdlmarkdownbook changesrc shownav', this.shownav);
  };

  return MarkdownBook2;
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
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "toc", [_aureliaFramework.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '<p>some toc</p>';
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "model", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class);
exports.MarkdownBook2 = MarkdownBook2;
//# sourceMappingURL=markdown-book2.js.map
