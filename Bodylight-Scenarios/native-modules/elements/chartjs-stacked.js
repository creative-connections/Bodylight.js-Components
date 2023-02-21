"use strict";

exports.__esModule = true;
exports.ChartjsStacked = void 0;

var _aureliaTemplating = require("aurelia-templating");

var _chartjs = require("./chartjs");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * shows stacked box -
 * on X is group stack 0 or stack 1
 * on Y is values from FMU variables from refindexes
 */
var ChartjsStacked = (_dec = (0, _aureliaTemplating.useView)('./chartjs.html'), _dec(_class = (_class2 = /*#__PURE__*/function (_Chartjs) {
  _inheritsLoose(ChartjsStacked, _Chartjs);

  function ChartjsStacked() {
    var _this;

    _this = _Chartjs.call(this) || this; //stacked box contains data, each box in different dataset, group is

    _initializerDefineProperty(_this, "fromid", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "labels", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "refindex", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "refvalues", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "type", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "min", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "max", _descriptor7, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "maxdata", _descriptor8, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "stacks", _descriptor9, _assertThisInitialized(_this));

    _this.handleValueChange = function (e) {
      for (var j = 0; j < _this.refindices.length; j++) {
        var mydata = e.detail.data[_this.refindices[j]]; //do conversion if operation is defined

        if (_this.operation && _this.operation[j]) mydata = _this.operation[j](mydata);

        if (!_this.chart.data.datasets[j]) {
          //do initialize dataset first
          _this.chart.data.datasets.push({
            data: [mydata],
            //data is array
            label: _this.chlabels[j],
            backgroundColor: _this.selectColor(j),
            stack: _this.stack[j]
          });
        } else {
          _this.chart.data.datasets[j].data[0] = mydata; //data is array 0 item
        }
      }

      _this.updatechart();
    };

    return _this;
  }

  var _proto = ChartjsStacked.prototype;

  _proto.bind = function bind() {
    _Chartjs.prototype.bind.call(this);

    this.type = "bar";
    this.options.scales.xAxes = [{
      stacked: true
    }];
    this.options.scales.yAxes = [{
      stacked: true
    }]; //reset labels

    this.data.labels = ["data"]; //allows refindices to be defined in refindex separated by comma ,

    if (Array.isArray(this.refindex)) {
      this.refindices = this.refindex; //define stack array for groups, contains descriptive string for group
    } else {
      //or refindices will be refindex, refindex+1, ...
      this.refindices = [];

      for (var i = 0; i < this.refvalues; i++) {
        this.refindices.push(this.refindex + i);
      }
    }

    if (this.stacks) {
      this.stack = this.stacks.split(',');
    } else {
      this.stack = new Array(this.refindices.length).fill('stack 0');
    } //init dataset data and labels = 0


    this.data.datasets = [];

    for (var j = 0; j < this.refindices.length; j++) {
      //do initialize dataset first
      this.data.datasets.push({
        data: [0],
        //data is array
        label: this.chlabels[j],
        backgroundColor: this.selectColor(j),
        stack: this.stack[j]
      });
    }
  };

  _proto.attached = function attached() {
    _Chartjs.prototype.attached.call(this);
  };

  return ChartjsStacked;
}(_chartjs.Chartjs), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "fromid", [_aureliaTemplating.bindable], {
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
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "type", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "min", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "max", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "maxdata", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 3;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "stacks", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.ChartjsStacked = ChartjsStacked;
//# sourceMappingURL=chartjs-stacked.js.map
