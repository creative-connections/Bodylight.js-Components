"use strict";

exports.__esModule = true;
exports.Tabs = void 0;

var _aureliaTemplating = require("aurelia-templating");

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4;

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/*
 listen changetabs event
 */
var Tabs = (_class = /*#__PURE__*/function () {
  function Tabs() {
    var _this = this;

    _initializerDefineProperty(this, "idlist", _descriptor, this);

    _initializerDefineProperty(this, "titlelist", _descriptor2, this);

    this.ids = [];

    _initializerDefineProperty(this, "w3class", _descriptor3, this);

    _initializerDefineProperty(this, "listen", _descriptor4, this);

    this.activeclasstemplate = 'w3-button w3-white w3-border-top w3-border-left w3-border-right';
    this.inactiveclasstemplate = 'w3-button w3-border-bottom w3-theme-l5';

    //this is to register listener function - per aurelia docs -this needs to be done this way
    this.handleChange = function (e) {
      if (e.detail && e.detail.id) {
        //detail.id is name, need to match in idlist
        var myid = _this.ids.find(function (x) {
          return x.name === e.detail.id;
        });

        if (myid) _this.open(myid);
      }
    };
  }

  var _proto = Tabs.prototype;

  _proto.bind = function bind() {
    var _this2 = this;

    if (this.w3class) {
      this.activeclass = this.w3class + ' ' + this.activeclasstemplate;
      this.inactiveclass = this.w3class + ' ' + this.inactiveclasstemplate;
    } else {
      this.activeclass = this.activeclasstemplate;
      this.inactiveclass = this.inactiveclasstemplate;
    }

    if (this.idlist) {
      //convert comma separated list of ids to array [{id:'id1',title:'id1'}]
      this.ids = this.idlist.split(',').map(function (x) {
        return {
          name: x,
          title: x,
          cls: _this2.inactiveclass
        };
      });

      if (this.titlelist) {
        var titles = this.titlelist.split(','); //if titles are defined, replace title in the ids array [{id:'id1',title:'title1'}]

        for (var i = 0; i < titles.length; i++) {
          if (this.ids[i]) this.ids[i].title = titles[i];
        }
      }
    }
  };

  _proto.attached = function attached() {
    console.log('tabs component', this); //open first, hide all no-active

    this.open(this.ids[0]);

    if (this.listen) {
      //ref to DOM element
      console.log('tabs component listening custom event with name:', this.listen);
      document.addEventListener(this.listen, this.handleChange); //else console.warn('no DOM element with id found:',this.controlid);
    }
  };

  _proto.open = function open(newid) {
    if (this.active) {
      this.setinactive(this.active);
      this.setactive(newid);
      this.active = newid;
    } else {
      for (var _iterator = _createForOfIteratorHelperLoose(this.ids), _step; !(_step = _iterator()).done;) {
        var id = _step.value;

        if (id !== this.active) {
          this.setinactive(id);
        }
      }

      this.setactive(newid);
      this.active = newid;
    }
  };

  _proto.setactive = function setactive(id) {
    var el = document.getElementById(id.name);

    if (el) {
      el.style.display = 'block';
      id.cls = this.activeclass;
    }
  };

  _proto.setinactive = function setinactive(id) {
    var el = document.getElementById(id.name);

    if (el) {
      el.style.display = 'none';
      id.cls = this.inactiveclass;
    }
  };

  return Tabs;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "idlist", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "titlelist", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "w3class", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 'w3-bar-item';
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "listen", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class);
exports.Tabs = Tabs;
//# sourceMappingURL=tabs.js.map
