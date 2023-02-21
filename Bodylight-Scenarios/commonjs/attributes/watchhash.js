"use strict";

exports.__esModule = true;
exports.WatchhashCustomAttribute = void 0;

var _watchHashCore = require("./watch-hash-core");

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Custom Attribute
 * if added to an element, cause that param name of param1 or index of param2 send in hash parameters are interpretted
 * to change SRC of parent element - this.elementVM.changesrc(newindex) is called
 */
var WatchhashCustomAttribute = /*#__PURE__*/function (_WatchHashCore) {
  _inheritsLoose(WatchhashCustomAttribute, _WatchHashCore);

  function WatchhashCustomAttribute(element) {
    var _this;

    _this = _WatchHashCore.call(this) || this;
    _this.element = element;
    _this.isReadMDCustomElement = false;
    return _this;
  }

  var _proto = WatchhashCustomAttribute.prototype;

  _proto.bind = function bind() {
    console.log('watchhash check au controller');

    if (this.element && this.element.au && this.element.au.controller) {
      console.log('watchhash check au controller type:', typeof this.element.au.controller);
      if (typeof this.element.au.controller === 'object') console.log('watchhash check au controller viewmodel:', this.element.au.controller.viewModel);

      if (typeof this.element.au.controller === 'object' && this.element.au.controller.viewModel && typeof this.element.au.controller.viewModel === 'object') {
        this.elementVM = this.element.au.controller.viewModel; //check whether this.elementVM has changesrc function - to be called in event listener

        this.isReadMDCustomElement = typeof this.elementVM.changesrc === 'function';
      }
    }

    this.params = this.value;

    _WatchHashCore.prototype.bind.call(this);
  };

  _proto.changesrc = function changesrc() {
    var _this$elementVM;

    console.log('watchhash.changesrc()');
    if (this.isReadMDCustomElement) (_this$elementVM = this.elementVM).changesrc.apply(_this$elementVM, arguments);
  };

  return WatchhashCustomAttribute;
}(_watchHashCore.WatchHashCore);

exports.WatchhashCustomAttribute = WatchhashCustomAttribute;
WatchhashCustomAttribute.inject = [Element];
//# sourceMappingURL=watchhash.js.map
