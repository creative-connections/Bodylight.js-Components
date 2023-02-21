"use strict";

exports.__esModule = true;
exports.MarkdownBook = void 0;

var _aureliaFramework = require("aurelia-framework");

var _watchHashCore = require("../attributes/watch-hash-core");

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var MarkdownBook = (_class = /*#__PURE__*/function (_WatchHashCore) {
  _inheritsLoose(MarkdownBook, _WatchHashCore);

  function MarkdownBook() {
    var _this;

    _this = _WatchHashCore.call(this) || this;

    _initializerDefineProperty(_this, "summary", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "index", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "base", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "params", _descriptor4, _assertThisInitialized(_this));

    _this.params = 'shownav,2;showmenu,3;base,4';
    _this.shownav = true;
    _this.showmenu = true;
    return _this;
  }

  var _proto = MarkdownBook.prototype;

  _proto.bind = function bind() {
    //this.value=this.params;//'index,0;summary,1;shownav,2';
    console.log('bdlmarkdownbook index:', this.index, 'summary:', this.summary);

    _WatchHashCore.prototype.bind.call(this);

    this.previoustitle = 'previous chapter';
    this.previoustitleshort = 'prev ...';
    this.nexttitle = 'next chapter';
    this.nexttitleshort = 'next ...';
  }
  /*attached() {
    this.disablenav = !((this.summary) && ((this.summary.length > 0) && (this.summary !== 'false')));
  }*/
  //is called if the watchhash attribute is used
  ;

  _proto.changesrc = function changesrc() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    /*if (name === 'summary') this.summary = index;
    if (name === 'index') this.index = index;*/
    //if (name === 'shownav') this.shownav = (index !== 'false');
    //if (name === 'base') this.base = index;
    console.log('bdlmarkdownbook changesrc called, args:', args); //TODO - hack - first arg is showmenu

    if (args[0]) this.shownav = args[0] !== 'false';
    if (args['shownav']) this.shownav = args['shownav'] !== 'false';
    if (args[1]) this.showmenu = args[1] !== 'false';
    if (args['showmenu']) this.showmenu = args['showmenu'] !== 'false'; //console.log('bdlmarkdownbook changesrc shownav', this.shownav);
  };

  _proto.openclosenav = function openclosenav() {
    this.shownav = !this.shownav;
  };

  return MarkdownBook;
}(_watchHashCore.WatchHashCore), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "summary", [_aureliaFramework.bindable], {
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
exports.MarkdownBook = MarkdownBook;
//# sourceMappingURL=markdown-book.js.map
