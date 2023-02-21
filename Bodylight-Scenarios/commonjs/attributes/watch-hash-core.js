"use strict";

exports.__esModule = true;
exports.WatchHashCore = void 0;

var _utils = require("./utils");

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var WatchHashCore = /*#__PURE__*/function () {
  function WatchHashCore() {
    var _this = this;

    this.params = '';
    console.log('WatchhashCore'); //event listener function needs to be declared this way - they have access to 'this'

    this.handleHashChange = function (e) {
      console.log('WatchHashCore HandleHashChange e:', e);
      var params = (0, _utils.parseHashParamString)(window.location.hash);
      var args = [];
      var index;

      for (var i = 0; i < _this.paramname.length; i++) {
        if (_this.paramindex[i]) index = params[_this.paramname[i]] ? params[_this.paramname[i]] : params[_this.paramindex[i]];else index = params[_this.paramname[i]];

        if (index) {
          //this.elementVM.changesrc(index, this.paramname[i]);
          args.push(index); //this.changesrc(index, this.paramname[i]);
        }
      }

      if (args.length > 0) _this.changesrc.apply(_this, args);
    };
  } //params atribute is used to define param name and optional index e.g. summary,1;index,2;base,3


  var _proto = WatchHashCore.prototype;

  _proto.bind = function bind() {
    this.paramname = [];
    this.paramindex = [];
    if (!this.params) return;
    console.log('watchhashcore.bind() params:', this.params);
    var paramconfs = this.params.split(';');

    for (var _iterator = _createForOfIteratorHelperLoose(paramconfs), _step; !(_step = _iterator()).done;) {
      var paramitem = _step.value;

      if (paramitem && paramitem.includes(',')) {
        var paramconf = paramitem.split(',');
        this.paramname.push(paramconf[0]);
        this.paramindex.push(paramconf[1]);
      } else {
        this.paramname.push(paramitem);
        this.paramindex.push(null);
      }
    } //register only if the customelement is readmd - contains specific function
    //handle when hash has already some params to override default


    this.handleHashChange(null); //register event listener

    window.addEventListener('hashchange', this.handleHashChange);
  };

  _proto.changesrc = function changesrc() {//console.log('watchhashcore.changesrc()');
  };

  return WatchHashCore;
}();

exports.WatchHashCore = WatchHashCore;
//# sourceMappingURL=watch-hash-core.js.map
