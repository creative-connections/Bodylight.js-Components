"use strict";

exports.__esModule = true;
exports.MarkdownTopNav = void 0;

var _aureliaFramework = require("aurelia-framework");

var _aureliaEventAggregator = require("aurelia-event-aggregator");

var _utils = require("../attributes/utils");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

//@inject(I18N, HttpClient)
var MarkdownTopNav = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = (_class2 = /*#__PURE__*/function () {
  //Introduction';
  //Hemodynamics in Left Ventricle'
  //Hemodynamics in Left Atria';
  function MarkdownTopNav(ea) {
    _initializerDefineProperty(this, "src", _descriptor, this);

    _initializerDefineProperty(this, "navstyle", _descriptor2, this);

    _initializerDefineProperty(this, "base", _descriptor3, this);

    _initializerDefineProperty(this, "nav", _descriptor4, this);

    _initializerDefineProperty(this, "index", _descriptor5, this);

    _initializerDefineProperty(this, "toc", _descriptor6, this);

    this.notinitread = true;
    this.previoustitle = '';
    this.nexttitle = '';
    this.navtitle = '';
    this.currentlink = '';
    //super(i18n, httpclient);
    this.ea = ea;
  }

  var _proto = MarkdownTopNav.prototype;

  _proto.attached = function attached() {
    var _this = this;

    this.ea.subscribe('navchange', function (navstruct) {
      return _this.updatenav(navstruct);
    });
    this.ea.subscribe('hashchange', function (hashstruct) {
      return _this.updatetitles(hashstruct);
    });
  };

  _proto.updatenav = function updatenav(navstruct) {
    this.links = navstruct.links;
    this.updatetitles((0, _utils.parseHashParamString)(window.location.hash));
    console.log('top nav links:', this.links);
  }
  /**
   * Update titles, opens parent nav if it is not opened
   * @param hashstruct
   */
  ;

  _proto.updatetitles = function updatetitles(hashstruct) {
    //this.currentlink
    console.log('top nav hash:', hashstruct);

    if (window.markdownnav) {
      var currentlink = '#' + (hashstruct[0].length > 0 ? hashstruct[0] : this.index);
      var currentlinkindex = window.markdownnav.links.findIndex(function (x) {
        return x.url === currentlink;
      });
      this.navtitle = currentlinkindex > 0 && currentlinkindex < window.markdownnav.links.length ? window.markdownnav.links[currentlinkindex].title : ''; //erase activenavitem class

      var activenavitems = window.document.getElementsByClassName('activenavitem');

      for (var _iterator = _createForOfIteratorHelperLoose(activenavitems), _step; !(_step = _iterator()).done;) {
        var item = _step.value;
        item.classList.remove('activenavitem');
      } //make current link as class activenavitem


      var currentnavitem = window.document.getElementById(currentlink);

      if (currentnavitem) {
        //set class - so it will have different color
        currentnavitem.firstChild.classList.add('activenavitem'); //show children ul if hidden

        if (currentnavitem.lastChild.className === 'w3-hide') {
          if (window.bodylightnavopenhide) window.bodylightnavopenhide(currentnavitem.lastChild.previousSibling);
        } //show parent ul if hidden


        if (currentnavitem.parentNode.className === 'w3-hide') {
          //do open parent as defined in markdownnav
          if (window.bodylightnavopenhide) window.bodylightnavopenhide(currentnavitem.parentNode.previousSibling);
        } else {
          //do open parent of parent
          if (currentnavitem.parentNode.parentNode && currentnavitem.parentNode.parentNode.className === 'w3-hide') {
            if (window.bodylightnavopenhide) window.bodylightnavopenhide(currentnavitem.parentNode.parentNode.previousSibling);
          } else {
            //do open parent of parent of parent
            if (currentnavitem.parentNode.parentNode && currentnavitem.parentNode.parentNode.parentNode && currentnavitem.parentNode.parentNode.parentNode.className === 'w3-hide') if (window.bodylightnavopenhide) window.bodylightnavopenhide(currentnavitem.parentNode.parentNode.parentNode.previousSibling);
          }
        }
      }
    }
  };

  _proto.showhidefull = function showhidefull() {
    this.nav = !this.nav;

    if (!this.nav) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        /* Safari */
        document.documentElement.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
      }
    }
  };

  _proto.showhidenav = function showhidenav() {
    this.nav = !this.nav;
  };

  _proto.showhidetoc = function showhidetoc() {
    this.toc = !this.toc;
  };

  _proto.changesrc = function changesrc() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    console.log('markdown-top-nav changesrc args:', args); //console.log('markdown-bottom-nav links:', this.links);
    //parse global window.markdownnav.links to get prev and next title

    if (window.markdownnav) {
      var currentlink = '#' + (args[0].length > 0 ? args[0] : this.index);
      var currentlinkindex = window.markdownnav.links.findIndex(function (x) {
        return x.url === currentlink;
      });
      this.navtitle = currentlinkindex > 0 && currentlinkindex < window.markdownnav.links.length ? window.markdownnav.links[currentlinkindex].title : '';
    }
  };

  return MarkdownTopNav;
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
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "nav", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "index", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "toc", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
})), _class2)) || _class);
exports.MarkdownTopNav = MarkdownTopNav;
//# sourceMappingURL=markdown-top-nav.js.map
