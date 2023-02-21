"use strict";

exports.__esModule = true;
exports.WatchhashchangeCustomAttribute = void 0;

var _aureliaFramework = require("aurelia-framework");

var _aureliaEventAggregator = require("aurelia-event-aggregator");

var _dec, _class;

/**
 * Custom Attribute
 * if added to an element, cause that param name of param1 or index of param2 send in hash parameters are interpretted
 * to change SRC of parent element - this.elementVM.changesrc(newindex) is called
 */
var WatchhashchangeCustomAttribute = (_dec = (0, _aureliaFramework.inject)(Element, _aureliaEventAggregator.EventAggregator), _dec(_class = /*#__PURE__*/function () {
  //static inject = [Element];
  function WatchhashchangeCustomAttribute(element, ea) {
    //super();
    this.element = element;
    this.isReadMDCustomElement = false;
    console.log('watchhash check au controller');

    if (element && element.au && element.au.controller) {
      console.log('watchhash check au controller type:', typeof element.au.controller);
      if (typeof element.au.controller === 'object') console.log('watchhash check au controller viewmodel:', element.au.controller.viewModel);

      if (typeof element.au.controller === 'object' && element.au.controller.viewModel && typeof element.au.controller.viewModel === 'object') {
        this.elementVM = element.au.controller.viewModel; //check whether elementVM has changesrc function - to be called in event listener

        this.isReadMDCustomElement = typeof this.elementVM.changesrc === 'function';
      }
    }

    this.ea = ea;
  }

  var _proto = WatchhashchangeCustomAttribute.prototype;

  _proto.attached = function attached() {
    console.log('watchhash attribute attached from element', this.element);
  };

  _proto.bind = function bind() {
    var _this = this;

    this.params = this.value; //super.bind();

    this.ea.subscribe('hashchange', function (hashstruct) {
      _this.handleHash(hashstruct);
    });
  };

  _proto.handleHash = function handleHash(hashstruct) {
    console.log('watchhash attribute handlehash()', hashstruct);
  };

  return WatchhashchangeCustomAttribute;
}()) || _class);
exports.WatchhashchangeCustomAttribute = WatchhashchangeCustomAttribute;
//# sourceMappingURL=watchhashchange.js.map
