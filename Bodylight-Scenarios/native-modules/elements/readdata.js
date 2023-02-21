"use strict";

exports.__esModule = true;
exports.readdata = void 0;

var _aureliaFramework = require("aurelia-framework");

var _aureliaFetchClient = require("aurelia-fetch-client");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

//import {HttpClient} from 'aurelia-http-client';

/**
 * reads data from remote url - periodically
 */
var readdata = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = (_class2 = /*#__PURE__*/function () {
  function readdata(client) {
    _initializerDefineProperty(this, "display", _descriptor, this);

    _initializerDefineProperty(this, "url", _descriptor2, this);

    _initializerDefineProperty(this, "timeout", _descriptor3, this);

    _initializerDefineProperty(this, "ids", _descriptor4, this);

    this.showinputs = false;
    this.previousvalue = 0;
    this.fireevent = 'input';
    this.httpclient = client;
    this.continue = true;
  }

  var _proto = readdata.prototype;

  _proto.bind = function bind() {
    this.display = this.display && this.display === 'true';
    if (this.timeout) this.timeout = parseInt(this.timeout, 10);else this.timeout = 0; //id of input elements

    this.ids2send = this.ids.split(',');
    this.createids = []; //create those ids not yet in HTML DOM and put them to createids array

    for (var _iterator = _createForOfIteratorHelperLoose(this.ids2send), _step; !(_step = _iterator()).done;) {
      var myid = _step.value;
      if (!document.getElementById(myid)) this.createids.push(myid);
    }
  };

  _proto.attached = function attached() {
    if (!this.url) {
      console.error('expected url attribute in readdata component');
    } else {
      //first update
      this.update(this); //set periodic update
      //let that = this;

      console.log('readdata.attached with fetch api', this.timeout); //
    }
  };

  _proto.update = function update(that) {
    //this.httpclient.fetch(this.url)
    that.httpclient.fetch(that.url).then(function (response) {
      return response.text();
    }).then(function (text) {
      //set data that was fetched
      that.value = text; //dispatch event if value differs from previous

      if (that.previousvalue !== that.value) {
        //if (this.ids2send.length !== this.values2send.length) {console.log('warning ids and values contain different number of items.', this.ids2send, this.values2send); return;}
        for (var i = 0; i < that.ids2send.length; i++) {
          var inputel = document.getElementById(that.ids2send[i]); //console.log('readdata.update() debugging that', that);
          //console.log('readdata.update() debugging inputel', inputel);

          inputel.value = that.value;
          var event = new Event(that.fireevent);
          inputel.dispatchEvent(event);
        }
      }

      that.previousvalue = that.value; //console.log('readdata.update', that.data);
      //schedule next call
      //let that = this;

      if (that.timeout > 0) that.timerid = setTimeout(that.update, that.timeout, that);
    });
  };

  _proto.detached = function detached() {
    this.continue = false;
    if (this.timerid) clearInterval(this.timerid);
    console.log('readdate.detached');
  };

  return readdata;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "display", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "url", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "timeout", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "ids", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.readdata = readdata;
//# sourceMappingURL=readdata.js.map
