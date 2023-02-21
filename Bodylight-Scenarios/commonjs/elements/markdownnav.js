"use strict";

exports.__esModule = true;
exports.Markdownnav = void 0;

var _markdownIt = _interopRequireDefault(require("markdown-it"));

var _markdownItForInline = _interopRequireDefault(require("markdown-it-for-inline"));

var _markdownItKatexx = _interopRequireDefault(require("markdown-it-katexx"));

var _aureliaFramework = require("aurelia-framework");

var _aureliaI18n = require("aurelia-i18n");

var _aureliaFetchClient = require("aurelia-fetch-client");

var _aureliaEventAggregator = require("aurelia-event-aggregator");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

//global function to operate on translated markdown in navigation panel
//adds + or - and shows hides list under it
// obj expects to be element of span, nextsibling is <ul> and first child is <i>
// e.g. <a></a><span><i></i></span><ul></ul>
window.bodylightnavopenhide = function (obj) {
  //set show/hide to
  //console.log('openhide()', obj);
  if (obj.nextSibling.className === 'w3-hide') {
    obj.nextSibling.className = 'w3-animate-opacity';
    obj.firstChild.className = 'fa fa-chevron-down';
  } else {
    obj.nextSibling.className = 'w3-hide';
    obj.firstChild.className = 'fa fa-chevron-right';
  }
};

var Markdownnav = (_dec = (0, _aureliaFramework.inject)(_aureliaI18n.I18N, _aureliaFetchClient.HttpClient, _aureliaEventAggregator.EventAggregator), _dec(_class = (_class2 = /*#__PURE__*/function () {
  function Markdownnav(i18n, httpclient, ea) {
    _initializerDefineProperty(this, "src", _descriptor, this);

    _initializerDefineProperty(this, "navstyle", _descriptor2, this);

    _initializerDefineProperty(this, "base", _descriptor3, this);

    this.notinitread = true;
    this.i18n = i18n;
    this.client = httpclient;
    this.html = '';
    this.navclass = '';
    this.links = [];
    this.currentlink = 'N/A';
    this.ea = ea;
  }

  var _proto = Markdownnav.prototype;

  _proto.bind = function bind() {
    //console.log('bdlmarkdownnav src:', this.src);
    if (this.notinitread && this.src && this.src.length > 0 && this.mdtoc) this.fetchMDSrc(); //bind navigation first - get src before content - to solve navigation hide open issue at the beginning
    //console.log('bdlmakrdownnav src:', this.src);

    window.markdownnav = this;
    var iterator = _markdownItForInline.default; // eslint-disable-next-line new-cap

    this.mdtoc = (0, _markdownIt.default)({
      html: true
    }).use(_markdownItKatexx.default, {
      'throwOnError': true,
      'errorColor': ' #cc0000'
    }).use(iterator, 'url', 'link_open', function (tokens, idx) {
      //detect links in list and create array of links used by other components
      var aIndex = tokens[idx].attrIndex('href');

      if (aIndex < 0) {//tokens[idx].attrPush(['target', '_blank']);
        //no href
      } else {
        //save detected link into global links array
        var link = tokens[idx].attrs[aIndex][1];
        var linktext = tokens[idx + 1].content; //console.log('nav token open + 2:', tokens[idx], tokens[idx+1],tokens[idx+2]);

        window.markdownnav.links.push({
          url: link,
          title: linktext
        });
      }
    });
    this.navclass = this.navstyle && this.navstyle.length > 0 ? this.navstyle : 'horizontal'; //adds rule to add a class to li item

    this.mdtoc.renderer.rules.list_item_open = function (tokens, idx, options, env, slf) {
      //console.log('markdownnav list item open tokens[idx], options:', tokens, idx);
      //use link as id
      var link = null;

      try {
        link = tokens[idx + 2].children[0].attrs[0][1];
      } catch (e) {//ignore
      }

      if (link) return '<li class="navitem" id="' + link + '">';
      return '<li class="navitem">';
    };

    this.mdtoc.renderer.rules.bullet_list_open = function (tokens, idx, options, env, slf) {
      if (window.markdownnavdepth) window.markdownnavdepth++;else window.markdownnavdepth = 1;
      if (window.markdownnavdepth && window.markdownnavdepth === 2) return '<span class="w3-small" onclick="bodylightnavopenhide(this)" ><i class="fa fa-chevron-right"></i></span><ul class="w3-hide">';
      return '<ul>';
    };

    this.mdtoc.renderer.rules.bullet_list_close = function (tokens, idx, options, env, slf) {
      if (window.markdownnavdepth) window.markdownnavdepth--;
      return '</ul>';
    }; //fetch md source from src attribute


    this.fetchMDSrc();
  };

  _proto.attached = function attached() {};

  _proto.fetchMDSrc = function fetchMDSrc() {
    var _this = this;

    var url = this.src.startsWith('http') ? this.src : this.base + this.src; //console.log('fetchmd src:', this.src);
    //src not empty - then fetch src

    if (this.src && this.src.length > 0) {
      this.notinitread = false;
      this.client.fetch(url).then(function (response) {
        return response.text();
      }).then(function (data) {
        //console.log('fetched md:', data)
        _this.text = data; //convert from md to html

        _this.links = [];
        _this.html = _this.mdtoc.render(_this.text); //console.log('markdownnow fetchmd src links:', this.html);

        _this.update();

        _this.ea.publish('navchange', {
          links: _this.links,
          text: _this.text,
          html: _this.html
        });
      });
    }
  };

  _proto.update = function update() {
    this.mynav.innerHTML = this.html;
  };

  _proto.openhide = function openhide() {}
  /*changesrc(...args) {
    //console.log('markdownnav.changesrc() args:', args);
    if (args[1]) this.base = args[1];
    if (args[0] && args[0].length > 0) this.src = args[0];
    this.fetchMDSrc();
  }*/
  ;

  return Markdownnav;
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
})), _class2)) || _class);
exports.Markdownnav = Markdownnav;
//# sourceMappingURL=markdownnav.js.map
