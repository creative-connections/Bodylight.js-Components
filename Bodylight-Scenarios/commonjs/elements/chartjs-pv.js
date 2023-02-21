"use strict";

exports.__esModule = true;
exports.ChartjsPv = void 0;

var _chartjsXy = require("./chartjs-xy");

var _aureliaTemplating = require("aurelia-templating");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

//import {PLATFORM} from 'aurelia-pal';
//@useView(PLATFORM.moduleName('./bdl-chartjs.html'))
var ChartjsPv = (_dec = (0, _aureliaTemplating.useView)('./chartjs.html'), _dec(_class = (_class2 = /*#__PURE__*/function (_ChartjsXy) {
  _inheritsLoose(ChartjsPv, _ChartjsXy);

  function ChartjsPv() {
    var _this;

    _this = _ChartjsXy.call(this) || this;

    _initializerDefineProperty(_this, "fromid", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "labels", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "refindex", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "refvalues", _descriptor4, _assertThisInitialized(_this));

    _this.handleValueChange = function (e) {
      //e.detail do not reallocate - using same buffer, thus slicing to append to data array
      //let datapoints =e.detail.data.slice(this.refindex, this.refendindex);
      var j = 0; //put first value on x axis, others on y axis other values

      for (var i = _this.refindex + 1; i < _this.refindex + _this.refvalues; i++) {
        _this.chart.data.datasets[j].data.push({
          x: e.detail.data[_this.refindex],
          y: e.detail.data[i]
        }); //console.log('adding from data[], i, data[i]', e.detail.data, i, e.detail.data[i]);


        if (_this.chart.data.datasets[j].data.length > _this.maxdata) {
          //console.log('shifting dataset chartjs-xy', this.chart.data.datasets[j].data);
          _this.chart.data.datasets[j].data.shift();
        }

        j++;
      } //console.log('chartjs-xy handlevaluechange datasets, e.detail.data',this.chart.data.datasets, e.detail.data);


      _this.updatechart();
    };

    return _this;
  }

  var _proto = ChartjsPv.prototype;

  _proto.bind = function bind() {
    _ChartjsXy.prototype.bind.call(this);
  };

  return ChartjsPv;
}(_chartjsXy.ChartjsXy), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "fromid", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "labels", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "refindex", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "refvalues", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.ChartjsPv = ChartjsPv;
//# sourceMappingURL=chartjs-pv.js.map
