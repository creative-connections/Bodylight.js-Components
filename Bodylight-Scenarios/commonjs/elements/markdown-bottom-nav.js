"use strict";

exports.__esModule = true;
exports.MarkdownBottomNav = void 0;

var _aureliaFramework = require("aurelia-framework");

var _aureliaEventAggregator = require("aurelia-event-aggregator");

var _utils = require("../attributes/utils");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

//import {WatchHashCore} from "../attributes/watch-hash-core";
var MarkdownBottomNav = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = (_class2 = /*#__PURE__*/function () {
  //Introduction';
  //Hemodynamics in Left Ventricle'
  function MarkdownBottomNav(ea) {
    _initializerDefineProperty(this, "src", _descriptor, this);

    _initializerDefineProperty(this, "navstyle", _descriptor2, this);

    _initializerDefineProperty(this, "base", _descriptor3, this);

    _initializerDefineProperty(this, "index", _descriptor4, this);

    this.notinitread = true;
    this.previoustitle = '';
    this.nexttitle = '';

    _initializerDefineProperty(this, "content", _descriptor5, this);

    this.ea = ea; //super(i18n, httpclient);
  }

  var _proto = MarkdownBottomNav.prototype;

  _proto.attached = function attached() {
    var _this = this;

    this.ea.subscribe('navchange', function (navstruct) {
      return _this.updatenav(navstruct);
    });
    this.ea.subscribe('hashchange', function (hashstruct) {
      return _this.changesrc(hashstruct);
    });
  };

  _proto.bind = function bind() {//this.params = 'index,0';
    //        super.bind();
  };

  _proto.update = function update() {};

  _proto.next = function next() {
    console.log('markdown bottom nav next');
  };

  _proto.previous = function previous() {
    console.log('markdown bottom nav previous');
  };

  _proto.updatenav = function updatenav(navstruct) {
    this.links = navstruct.links;
    this.changesrc((0, _utils.parseHashParamString)(window.location.hash)); //console.log('top nav links:', this.links);
  };

  _proto.changesrc = function changesrc(args) {
    console.log('markdown-bottom-nav changesrc args:', args); //console.log('markdown-bottom-nav links:', this.links);
    //parse global window.markdownnav.links to get prev and next title
    //let prevtitle = '';

    if (window.markdownnav) {
      var currentlink = '#' + (args[0].length > 0 ? args[0] : this.index);
      var currentlinkindex = window.markdownnav.links.findIndex(function (x) {
        return x.url === currentlink;
      });
      this.nexttitle = currentlinkindex > 0 ? window.markdownnav.links[currentlinkindex - 1].title : '';
      this.nextlink = currentlinkindex > 0 ? window.markdownnav.links[currentlinkindex - 1].url : '';
      this.previoustitle = currentlinkindex < window.markdownnav.links.length - 1 ? window.markdownnav.links[currentlinkindex + 1].title : '';
      this.previouslink = currentlinkindex < window.markdownnav.links.length - 1 ? window.markdownnav.links[currentlinkindex + 1].url : '';
    }
  };

  _proto.contentChanged = function contentChanged(newv, oldv) {
    console.log('markdown-bottom-na contentchanged', oldv, newv);
    console.log('markdown-bottom-nav links:', window.markdownnav.links);
  };

  return MarkdownBottomNav;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "src", [_aureliaFramework.bindable], {
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
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "index", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 'index.md';
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "content", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.MarkdownBottomNav = MarkdownBottomNav;
//# sourceMappingURL=markdown-bottom-nav.js.map
