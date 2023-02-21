"use strict";

exports.__esModule = true;
exports.ChartjsFixedXy = void 0;

var _aureliaTemplating = require("aurelia-templating");

var _chartjsFixed = require("./chartjs-fixed");

var _chartjs = require("./chartjs");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * shows fixed curve at time -
 * on X isvalues from FMU variables from xrefindex to xrefvalues
 * on Y is values from FMU variables from refindex to refvalues
 * convertors for x and y axis separated by ;
 * refindex, refvalues for y values
 * refindex2, refvalues2 for second curve in y values;
 * xrefindex,xrefvalues for x values
 * refpointindex
 */
var ChartjsFixedXy = (_dec = (0, _aureliaTemplating.useView)('./chartjs.html'), _dec(_class = (_class2 = /*#__PURE__*/function (_ChartjsFixed) {
  _inheritsLoose(ChartjsFixedXy, _ChartjsFixed);

  //@bindable cachesize;
  function ChartjsFixedXy() {
    var _this;

    _this = _ChartjsFixed.call(this) || this;

    _initializerDefineProperty(_this, "fromid", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "labels", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "refindex", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "refvalues", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "refindex2", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "refvalues2", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "type", _descriptor7, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "min", _descriptor8, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "max", _descriptor9, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "maxdata", _descriptor10, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "xrefindex", _descriptor11, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "xrefvalues", _descriptor12, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "xtofixed", _descriptor13, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "refpointindex", _descriptor14, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "xrefpointindex", _descriptor15, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "showline", _descriptor16, _assertThisInitialized(_this));

    _this.currentdataset = 0;

    _this.handleValueChange = function (e) {
      //let j = this.currentdataset;
      //all values from refindex to one dataset - as one curve
      var ydata = e.detail.data.slice(_this.refindex, _this.refindex + _this.refvalues);
      var y2data = [];
      var xdata = e.detail.data.slice(_this.xrefindex, _this.xrefindex + _this.xrefvalues);
      var xpoint = 0;
      var ypoint = 0;
      var y2point = 0; //point to highlight

      if (_this.refpointindex) {
        xpoint = e.detail.data[_this.xrefpointindex];
        ypoint = e.detail.data[_this.refpointindex];
      } //convertors


      if (_this.operation && _this.operation[0] && _this.operation[1]) {
        xdata = xdata.map(function (x) {
          return _this.operation[0](x);
        });
        ydata = ydata.map(function (y) {
          return _this.operation[1](y);
        });

        if (_this.refpointindex) {
          xpoint = _this.operation[0](xpoint);
          ypoint = _this.operation[1](ypoint);
        }
      }

      var data = [];

      for (var i = 0; i < ydata.length; i++) {
        data.push({
          x: xdata[i],
          y: ydata[i]
        });
      }

      var data2 = [{
        x: xpoint,
        y: ypoint
      }]; //set labels to x axis

      if (_this.xtofixed >= 0) {
        var labeldata = xdata.map(function (x) {
          return x.toFixed(_this.xtofixed);
        });
        _this.chart.data.labels = labeldata; //console.log('')
      } //set data xy to chart struct
      //do initialize dataset first


      var newdataset = {
        data: data,
        label: "",
        backgroundColor: _this.currentcolor,
        borderColor: _this.currentcolor,
        borderWidth: 1,
        pointRadius: 1,
        fill: false,
        showLine: _this.showline
      };
      var colorindex = 1;

      if (_this.refpointindex) {
        var newpointdataset = {
          data: data2,
          label: "",
          backgroundColor: _this.currentcolor,
          borderColor: _this.currentcolor,
          borderWidth: 1,
          pointRadius: 2,
          fill: false
        };
        _this.chart.data.datasets[0] = newdataset;

        _this.chart.data.datasets.unshift(newpointdataset);
      } else {
        _this.chart.data.datasets.unshift(newdataset);
      }

      if (_this.chart.data.datasets[colorindex]) {
        _this.chart.data.datasets[colorindex].backgroundColor = _this.previouscolor;
        _this.chart.data.datasets[colorindex].borderColor = _this.previouscolor;
      }

      if (_this.chart.data.datasets[colorindex + 1]) {
        _this.chart.data.datasets[colorindex + 1].backgroundColor = _this.previouscolor2;
        _this.chart.data.datasets[colorindex + 1].borderColor = _this.previouscolor2;
      }

      if (_this.chart.data.datasets.length > _this.maxdata) {
        _this.chart.data.datasets.pop();
      }

      if (_this.refindex2) {
        y2data = e.detail.data.slice(_this.refindex2, _this.refindex2 + _this.refvalues2); //if (this.refpointindex2) y2point = e.detail.data[this.ref2pointindex];

        if (_this.operation) {
          y2data = y2data.map(function (y) {
            return _this.operation[1](y);
          }); //if (this.refpointindex2) y2point = this.operation[1](y2point);
        } //operation[1] or operation[2]?


        var datab = [];

        for (var _i = 0; _i < y2data.length; _i++) {
          datab.push({
            x: xdata[_i],
            y: y2data[_i]
          });
        }

        var datab2 = [{
          x: xpoint,
          y: y2point
        }];
        var datasetb = {
          data: datab,
          label: "",
          backgroundColor: _this.currentcolorb,
          borderColor: _this.currentcolorb,
          borderWidth: 1,
          pointRadius: 1,
          fill: false,
          showLine: _this.showline
        };

        _this.chart.data.datasets.splice(_this.refpointindex ? 2 : 1, 0, datasetb);

        if (_this.chart.data.datasets[colorindex + 3]) {
          _this.chart.data.datasets[colorindex + 3].backgroundColor = _this.previouscolorb2;
          _this.chart.data.datasets[colorindex + 3].borderColor = _this.previouscolorb2;
        }

        if (_this.chart.data.datasets.length > _this.maxdata) _this.chart.data.datasets.pop();
      }

      _this.updatechart();
    };

    return _this;
  }

  var _proto = ChartjsFixedXy.prototype;

  _proto.bind = function bind() {
    _ChartjsFixed.prototype.bind.call(this);

    this.type = 'scatter';
    this.data.labels = [];
    this.xrefindex = parseInt(this.xrefindex, 10);
    if (typeof this.maxdata === 'string') this.maxdata = parseInt(this.maxdata);
    if (!this.xrefindex) console.warn('xrefindex is not specified');
    this.xrefvalues = parseInt(this.xrefvalues, 10);
    if (this.xrefvalues !== this.refvalues) console.warn('the value of "xrefvalues" must be equal to "refvalues"');
    this.xrefpointindex = parseInt(this.xrefpointindex, 10);

    if (typeof this.showline === 'string') {
      this.showline = this.showline === 'true';
    }

    if (this.refindex2) {
      this.refindex2 = (0, _chartjs.myParseInt)(this.refindex2, 10);
      if (this.refvalues2) this.refvalues2 = parseInt(this.refvalues2, 10);else {
        console.warn('chartjs-fixed-xy refvalues2 not defined');
        this.refindex2 = null;
      }
    }
  };

  _proto.attached = function attached() {
    _ChartjsFixed.prototype.attached.call(this);
  };

  return ChartjsFixedXy;
}(_chartjsFixed.ChartjsFixed), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "fromid", [_aureliaTemplating.bindable], {
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
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "refindex2", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "refvalues2", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "type", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "min", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "max", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "maxdata", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 8;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "xrefindex", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "xrefvalues", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "xtofixed", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "refpointindex", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "xrefpointindex", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "showline", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
})), _class2)) || _class);
exports.ChartjsFixedXy = ChartjsFixedXy;
//# sourceMappingURL=chartjs-fixed-xy.js.map
