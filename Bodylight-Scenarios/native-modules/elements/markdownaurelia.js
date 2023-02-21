"use strict";

exports.__esModule = true;
exports.Markdownaurelia = void 0;

var _markdownIt = _interopRequireDefault(require("markdown-it"));

var _markdownItBfootnote = require("./markdown-it-bfootnote");

var _markdownItKatexx = _interopRequireDefault(require("markdown-it-katexx"));

var _highlight = _interopRequireDefault(require("highlight.js"));

var _markdownItAbbr = _interopRequireDefault(require("markdown-it-abbr"));

var _markdownItBtoc = require("./markdown-it-btoc");

var _aureliaFramework = require("aurelia-framework");

var _aureliaFetchClient = require("aurelia-fetch-client");

var _aureliaEventAggregator = require("aurelia-event-aggregator");

var _aureliaI18n = require("aurelia-i18n");

var _messages = require("./messages");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var REGISTEREVENTTIMEOUT = 1000; //timout to sent register event for subsequent fmu to bind to inputs

/**
 * This is markdownaurelia component to be used in aurelia apps,
 * requires aurelia-dynamic-html plugin to be enabled,
 * in case of using as web-component, use mardkdown which inherits majority
 */

var Markdownaurelia = (_dec = (0, _aureliaFramework.inject)(_aureliaI18n.I18N, _aureliaFetchClient.HttpClient, _aureliaEventAggregator.EventAggregator), _dec(_class = (_class2 = /*#__PURE__*/function () {
  function Markdownaurelia(i18n, httpclient, ea) {
    var _this = this;

    _initializerDefineProperty(this, "src", _descriptor, this);

    _initializerDefineProperty(this, "watchhash", _descriptor2, this);

    _initializerDefineProperty(this, "base", _descriptor3, this);

    _initializerDefineProperty(this, "fromid", _descriptor4, this);

    _initializerDefineProperty(this, "toc", _descriptor5, this);

    _initializerDefineProperty(this, "content", _descriptor6, this);

    this.previoussrc = '';
    //this.i18n = i18n;
    this.client = httpclient;
    this.html = '';
    this.toc = '';
    this.ea = ea;
    this.i18n = i18n; //console.log('bdlmarkdownaurelia eventaggregator:', ea);
    //option function to be called when customevent retrieved

    this.handleContentChange = function (e) {
      _this.updateContent(e.detail.content, e.detail.keepanimation);
    };
  }

  var _proto = Markdownaurelia.prototype;

  _proto.bind = function bind() {
    //console.log('markdownaurelia bind() src', this.src);
    if (this.base && this.base.length > 0) window.bdlBaseHref = this.base; // define bdlbasehref only if not empty string

    if (this.src && this.src.length > 0 && this.md) this.readmd();
  };

  _proto.srcChanged = function srcChanged() {
    //console.log('markdownaurelia srcChanged() src', this.src);
    if (this.src && this.src.length > 0 && this.md) this.readmd();
  };

  _proto.attached = function attached() {
    var _this2 = this;

    //console.log('bdlmarkdownaurelia attached() src:', this.src);
    // eslint-disable-next-line new-cap
    //optionally, register customevent handler for 'contentupdate' when fromid is defined
    // eslint-disable-next-line new-cap
    this.md = (0, _markdownIt.default)({
      html: true,
      //enable html tags - this enables also custom elements of components/webcomponents
      linkify: true,
      typographer: false,
      highlight: function highlight(str, lang) {
        //highlight plugin
        if (lang && _highlight.default.getLanguage(lang)) {
          try {
            return '<pre class="hljs"><code>' + _highlight.default.highlight(lang, str, true).value + '</code></pre>'; // eslint-disable-next-line no-empty
          } catch (__) {}
        }

        return ''; // use external default escaping
      }
    }).use(_markdownItBfootnote.bodylightFootnotePlugin) //footnote - extension to MD - otherwise no link between [^1] and [^1]:
    //.use(MarkdownitAttrs)
    .use(_markdownItKatexx.default, {
      'throwOnError': true,
      'errorColor': ' #cc0000'
    }) //math-> katex - should be faster than mathjax and crossbrowser compatible when chrom do not support mathml
    .use(_markdownItAbbr.default) //.use(markdownItAnchor, { permalink: true, permalinkBefore: true, permalinkSymbol: '§' } )
    //.use(markdownItTocDoneRight);
    .use(_markdownItBtoc.markdownitbtoc);

    if (this.i18n.getLocale() === 'cs') {
      console.log('czech version');
    } else {
      console.log('english version');
    }

    if (this.src && this.src.length > 0 && this.md) this.readmd(); //console.log('bdlmarkdownaurelia eventaggregator2:', this.ea);
    //there seems some bug in ea dependency injection - checking subscribe as function or inner ea object
    //if (typeof this.ea.subscribe === 'function')

    this.ea.subscribe(_messages.ContentUpdate, function (msg) {
      return _this2.updateContent(msg.content);
    }); //else if (typeof this.ea.ea === 'object')
    //      this.ea.ea.subscribe(ContentUpdate, msg => this.updateContent(msg.content));

    if (this.fromid) {
      document.getElementById(this.fromid).addEventListener('contentupdate', this.handleContentChange);
    }
  };

  _proto.changesrc = function changesrc() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    //first is src, second is base
    console.log('mardownaurelia.changesrc called(), args:', args);
    if (args[1]) this.base = args[1];
    if (args[0] && args[0].length > 0) this.src = args[0];
    this.readmd();
  };

  _proto.readmd = function readmd() {
    var _this3 = this;

    //fetch md source from src attribute
    //relative url - set with base
    console.log('bdlmarkdownaurelia readmemd(), src:', this.src);
    if (!this.src || this.previoussrc === this.src) return;
    this.previoussrc = this.src;
    var url = this.src.startsWith('http') ? this.src : this.base + this.src;
    this.client.fetch(url).then(function (response) {
      return response.text();
    }).then(function (data) {
      //console.log('markdownaurelia fetched md:', data)
      _this3.text = data; //convert from md to html

      _this3.html = _this3.md.render(_this3.text);
      var tocregex = /<div[^<>]*id="toc"[^<>]*>(.*?)<\/div>/g;
      _this3.toc = _this3.md.render('@[toc] \n' + _this3.text).match(tocregex)[0]; //console.log('readmd toc:', this.toc);

      _this3.update();
    });
  };

  _proto.detached = function detached() {
    window.removeEventListener('hashchange', this.handleContentChange);
  };

  _proto.update = function update() {
    //console.log('markdownaurelia update');
    //if (this.mj)this.mj.typesetPromise();
    //if (window.MathJax) window.MathJax.typeset();
    //scroll to top of the page
    window.scrollTo(0, 0); //send fmiregister event for possible shared fmi component to bind to input components

    setTimeout(function () {
      var event = new CustomEvent('fmiregister');
      document.dispatchEvent(event);
    }, REGISTEREVENTTIMEOUT);
  };

  _proto.updateContent = function updateContent(content, keepanimation) {
    if (keepanimation === void 0) {
      keepanimation = false;
    }

    //console.log('markdownaurelia updatecontent:', content);
    //fix remove older animation objects
    if (!keepanimation && window.ani) {
      window.ani.detached(); //window.ani.destroyAdobe();

      window.animatebindings = [];
    } //fix remove global binding
    //continue with rendering


    this.text = content;
    this.html = this.md.render(this.text);
    this.update();
  };

  _proto.contentChanged = function contentChanged(newvalue, oldvalue) {
    //console.log('markdown2 update called by OOP polymorphism mydiv, html', this.mydiv, this.html);
    this.updateContent(newvalue);
  };

  return Markdownaurelia;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "src", [_aureliaFramework.bindable], {
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
exports.Markdownaurelia = Markdownaurelia;
//# sourceMappingURL=markdownaurelia.js.map
