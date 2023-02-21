"use strict";

exports.__esModule = true;
exports.ValueStore = void 0;

var _aureliaTemplating = require("aurelia-templating");

var _lodash = _interopRequireDefault(require("lodash"));

var _class, _descriptor, _descriptor2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var ValueStore = (_class = /*#__PURE__*/function () {
  function ValueStore() {
    var _this = this;

    _initializerDefineProperty(this, "fromid", _descriptor, this);

    _initializerDefineProperty(this, "showcontrols", _descriptor2, this);

    this.data = [];
    this.timepoints = [];

    //create lambda function which is added as listener later
    this.handleValueChange = function (e) {
      //e.detail do not reallocate - using same buffer, thus slicing to append to data array
      //let edata = e.detail.data.slice();
      //throttle update to reasonable frequency
      // _.throttle(()=> this.updateValue(e.detail.data[this.refindex]), this.throttle)();
      //call throttled function with args
      _this.data.push(e.detail.data);

      _this.timepoints.push(e.detail.time);
    };

    this.handleFMIAttached = function (e) {
      var fromel = document.getElementById(_this.fromid);

      if (fromel) {
        fromel.addEventListener('fmidata', _this.handleValueChange);
      } else {
        console.warn('fmi attached, but no element with id found:', _this.fromid);
      }
    };
  }

  var _proto = ValueStore.prototype;

  _proto.bind = function bind() {
    if (typeof this.showcontrols === 'string') this.showcontrols = this.showcontrols === 'true';
  };

  _proto.attached = function attached() {
    //listening to custom event fmidata
    //listening to custom event fmidata and fmireset
    var fromel = document.getElementById(this.fromid);

    if (fromel) {
      fromel.addEventListener('fmidata', this.handleValueChange);
    } else {
      console.warn('chartjs, null fromid element, waiting to be attached');
      document.addEventListener('fmiattached', this.handleFMIAttached);
    }
  };

  _proto.detached = function detached() {
    if (document.getElementById(this.fromid)) document.getElementById(this.fromid).removeEventListener('fmidata', this.handleValueChange);
  };

  _proto.exportdata = function exportdata() {
    var mydata = {
      time: this.timepoints,
      data: this.data
    };
    var blob = new Blob([JSON.stringify(mydata)], {
      type: 'application/json;charset=utf-8;'
    });
    saveAs(blob, 'simulationdata.json');
  };

  return ValueStore;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "fromid", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "showcontrols", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
})), _class);
exports.ValueStore = ValueStore;
//# sourceMappingURL=value-store.js.map
