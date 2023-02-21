"use strict";

exports.__esModule = true;
exports.ChartjsXyPoints = void 0;

var _chartjsXy = require("./chartjs-xy");

var _aureliaTemplating = require("aurelia-templating");

var _chart = _interopRequireDefault(require("chart.js"));

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var ChartjsXyPoints = (_dec = (0, _aureliaTemplating.useView)('./chartjs-xy-points.html'), _dec(_class = (_class2 = /*#__PURE__*/function (_ChartjsXy) {
  _inheritsLoose(ChartjsXyPoints, _ChartjsXy);

  function ChartjsXyPoints() {
    var _this;

    _this = _ChartjsXy.call(this) || this;

    _initializerDefineProperty(_this, "fromid", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "labels", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "refindex", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "refvalues", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "min", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "max", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "xmin", _descriptor7, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "xmax", _descriptor8, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "atitle", _descriptor9, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "rtitle", _descriptor10, _assertThisInitialized(_this));

    _this.showlines = false;

    _initializerDefineProperty(_this, "convertors", _descriptor11, _assertThisInitialized(_this));

    _this.index = 0;

    _this.handleValueChange = function (e) {
      //e.detail do not reallocate - using same buffer, thus slicing to append to data array
      var rawdata = e.detail.data.slice(_this.refindex, _this.refendindex); //do value conversion based on convertors

      if (_this.operation) {
        for (var i = 0; i < rawdata.length; i++) {
          //if particular operation is defined
          if (_this.operation[i]) rawdata[i] = _this.operation[i](rawdata[i]);
        }
      }

      var j = 0; //put each first value on x axis, second on y axis

      for (var _i = 1; _i < _this.refvalues; _i = _i + 2) {
        //remember only current x,y value - on the index
        _this.chart.data.datasets[j].data[_this.index] = {
          x: rawdata[_i - 1],
          y: rawdata[_i]
        }; //increment dataset - if more dataset are available

        j++;
      }

      _this.updatechart();
    };

    return _this;
  }

  var _proto = ChartjsXyPoints.prototype;

  _proto.bind = function bind() {
    _ChartjsXy.prototype.bind.call(this);

    console.log('chartjs xy point bind()');

    if (this.xmin) {
      //sets yscale min
      if (!this.options) this.options = {};
      if (!this.options.scales) this.options.scales = {};
      if (!this.options.scales.xAxes) this.options.scales.xAxes = [{}]; //chartjs 2.9.4

      if (!this.options.scales.xAxes[0].ticks) this.options.scales.xAxes[0].ticks = {}; //chartjs 2.9.4

      this.options.scales.xAxes[0].ticks.min = parseFloat(this.xmin);
    }

    if (this.xmax) {
      //sets yscale max
      if (!this.options) this.options = {};
      if (!this.options.scales) this.options.scales = {};
      if (!this.options.scales.xAxes) this.options.scales.xAxes = [{}]; //chartjs 2.9.4

      if (!this.options.scales.xAxes[0].ticks) this.options.scales.xAxes[0].ticks = {}; //chartjs 2.9.4

      this.options.scales.xAxes[0].ticks.max = parseFloat(this.xmax); //if (this.min) this.options.scales.yAxes[0].ticks.stepSize = (this.options.scales.yAxes[0].ticks.max - this.options.scales.yAxes[0].ticks.min) / 10;
    } //customize tooltip display


    this.options.tooltips.callbacks = {
      label: function label(tooltipItem, data) {
        var label = data.datasets[tooltipItem.datasetIndex].label || '';

        if (label) {
          label += ': ';
        }

        label += '(' + tooltipItem.xLabel.toPrecision(3) + ',' + tooltipItem.yLabel.toPrecision(3) + ')';
        return label;
      },
      footer: function footer(tooltipItem, data) {
        if (data.datasets.length < 2) return tooltipItem[0].yLabel;
        var label = []; //label.push('| ' + data.datasets[0].data[tooltipItem[0].index].y.toPrecision(3) + ' - ' + data.datasets[1].data[tooltipItem[0].index].y.toPrecision(3) + ' |');

        label.push('Δ ' + Math.abs(data.datasets[0].data[tooltipItem[0].index].y - data.datasets[1].data[tooltipItem[0].index].y).toPrecision(3));
        return label;
      }
    };
    this.type = 'scatter';
    this.plugins = null;
    this.options.XYPlugin = true;
  };

  _proto.attached = function attached() {
    //register horizontal line drawing, shows difference line between appropriate points from dataset0 and dataset1
    _chart.default.pluginService.register({
      beforeDraw: function beforeDraw(chart, ease) {
        if (chart.config.options.XYPlugin && chart.tooltip._active && chart.tooltip._active.length) {
          var activePoint = chart.tooltip._active[0]; //console.log('chart horizontal line debug chart activepoint:', activePoint);

          var ctx = chart.ctx;
          var y = activePoint.tooltipPosition().y; //let topY = this.chart.legend.bottom;

          var leftX = chart.chartArea.left; //let bottomY = this.chart.chartArea.bottom;

          var rightX = chart.chartArea.right; // draw line

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(leftX, y);
          ctx.lineTo(rightX, y);
          ctx.lineWidth = 1;
          ctx.strokeStyle = '#ff9c9c';
          ctx.stroke();
          var meta1 = chart.getDatasetMeta(0);
          var meta2 = chart.getDatasetMeta(1);

          if (meta1) {
            //draw second line
            //console.log('plugin meta', chart, meta);
            var secondy2 = meta1.data[activePoint._index]._model.y;
            var secondy = secondy2 !== y ? secondy2 : meta2.data[activePoint._index]._model.y; //let stop  = meta.data[chart.config.options.section[i].index]._model.x;

            ctx.beginPath();
            ctx.moveTo(leftX, secondy);
            ctx.lineTo(rightX, secondy);
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#ff9c9c';
            ctx.stroke();
            var x = activePoint.tooltipPosition().x;
            ctx.beginPath();
            ctx.moveTo(x, y);
            var sy = y > secondy ? 3 : -3; //small arrow up

            ctx.lineTo(x - sy, y - sy);
            ctx.lineTo(x + sy, y - sy); //line

            ctx.lineTo(x, y);
            ctx.lineTo(x, secondy); //small arrow down

            ctx.lineTo(x - sy, secondy + sy);
            ctx.lineTo(x + sy, secondy + sy);
            ctx.lineTo(x, secondy);
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#7b7bff';
            ctx.stroke();
          }

          ctx.restore();
        }
      }
    });

    _ChartjsXy.prototype.attached.call(this);
  };

  _proto.addpoint = function addpoint() {
    this.index++;
  };

  _proto.removepoint = function removepoint() {
    if (this.index > 0) this.index--;
  };

  return ChartjsXyPoints;
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
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "min", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "max", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "xmin", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "xmax", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "atitle", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 'Add Point';
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "rtitle", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 'Remove Point';
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "convertors", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.ChartjsXyPoints = ChartjsXyPoints;
//# sourceMappingURL=chartjs-xy-points.js.map
