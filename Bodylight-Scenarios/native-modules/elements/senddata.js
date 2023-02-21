"use strict";

exports.__esModule = true;
exports.Senddata = void 0;

var _aureliaFramework = require("aurelia-framework");

var _aureliaFetchClient = require("aurelia-fetch-client");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

//import {HttpClient} from 'aurelia-http-client';

/**
 * writes data to remote url - from fmu with fromid
 */
var Senddata = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = (_class2 = /*#__PURE__*/function () {
  function Senddata(client) {
    var _this = this;

    _initializerDefineProperty(this, "fromid", _descriptor, this);

    _initializerDefineProperty(this, "refindex", _descriptor2, this);

    _initializerDefineProperty(this, "numerator", _descriptor3, this);

    _initializerDefineProperty(this, "denominator", _descriptor4, this);

    _initializerDefineProperty(this, "addconst", _descriptor5, this);

    _initializerDefineProperty(this, "url", _descriptor6, this);

    this.httpclient = client; //create lambda function which is added as listener later

    this.handleValueChange = function (e) {
      //e.detail do not reallocate - using same buffer, thus slicing to append to data array
      //let edata = e.detail.data.slice();
      _this.value = e.detail.data[_this.refindex] * _this.numerator / _this.denominator + _this.addconst;

      if (!_this.url) {
        console.error('expected url attribute in readdata component');
      } else {
        _this.update();
      }
    };
  }

  var _proto = Senddata.prototype;

  _proto.attached = function attached() {
    //listening to custom event fmidata
    document.getElementById(this.fromid).addEventListener('fmidata', this.handleValueChange);
  };

  _proto.detached = function detached() {
    if (document.getElementById(this.fromid)) document.getElementById(this.fromid).removeEventListener('fmidata', this.handleValueChange);
  };

  _proto.update = function update() {
    this.httpclient.fetch(this.url, {
      method: 'post',
      body: this.value
    });
  };

  return Senddata;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "fromid", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "refindex", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "numerator", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "denominator", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "addconst", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "url", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.Senddata = Senddata;
//# sourceMappingURL=senddata.js.map
