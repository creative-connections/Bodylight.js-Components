"use strict";

exports.__esModule = true;
exports.ChartjsFixed = void 0;

var _aureliaTemplating = require("aurelia-templating");

var _chartjs = require("./chartjs");

var _lodash = _interopRequireDefault(require("lodash"));

var _chart = _interopRequireDefault(require("chart.js"));

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * shows fixed curve at time -
 * on X is 0,1,2,3,4,5,6,7,8,9
 * on Y is values from FMU variables from refindex to refvalues
 */
var ChartjsFixed = (_dec = (0, _aureliaTemplating.useView)('./chartjs.html'), _dec(_class = (_class2 = /*#__PURE__*/function (_Chartjs) {
  _inheritsLoose(ChartjsFixed, _Chartjs);

  //DOM id of FMU component to listen fmu-data event
  //labels of datasets
  //variable index in fmu data
  //how many variables to show from fmu data
  //type of chart - is overwritten to 'line'
  //if defined chartjs y axis from min
  //if defined chartjs y axis to max
  //howmany datasets to remember
  //from whic colorindex to start, 0 blue, 1 red, 2 green,...
  //extra dataset with only one point is drawn
  //@bindable cachesize;
  function ChartjsFixed() {
    var _this;

    _this = _Chartjs.call(this) || this;

    _initializerDefineProperty(_this, "fromid", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "labels", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "refindex", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "refvalues", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "type", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "min", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "max", _descriptor7, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "maxdata", _descriptor8, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "colorindex", _descriptor9, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "highlightindex", _descriptor10, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "refpointindex", _descriptor11, _assertThisInitialized(_this));

    _this.currentcolor = void 0;
    _this.previouscolor = void 0;
    _this.previouscolor2 = void 0;
    _this.currentcolorb = void 0;
    _this.previouscolorb = void 0;
    _this.previouscolorb2 = void 0;
    _this.currentdataset = 0;

    _this.handleValueChange = function (e) {
      //let j = this.currentdataset;
      //all values from refindex to one dataset - as one curve
      //if (!this.chart.data.datasets[j]) {
      //do initialize dataset first
      var newdataset = {
        data: e.detail.data.slice(_this.refindex, _this.refindex + _this.refvalues),
        label: "",
        backgroundColor: _this.currentcolor,
        borderColor: _this.currentcolor,
        borderWidth: 1,
        pointRadius: 1,
        fill: false
      }; //index to blure color

      var colorindex = 1; //decide whether to add point

      if (_this.refpointindex) {
        var newpointdataset = {
          data: [e.detail.data[_this.refpointindex]],
          label: "",
          backgroundColor: _this.currentcolor,
          borderColor: _this.currentcolor,
          borderWidth: 1,
          pointRadius: 0,
          fill: false
        };
        _this.chart.data.datasets[0] = newdataset;

        _this.chart.data.datasets.unshift(newpointdataset); //blur color from inde 2, [0] is point [1] is dataset


        colorindex = 2;
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
      } //do apply operation on each element of array


      if (_this.operation && _this.operation[0]) {
        _this.chart.data.datasets[0].data.map(function (item) {
          return _this.operation[0](item);
        });

        if (_this.refpointindex) {
          //do conversion on [1] too
          _this.chart.data.datasets[1].data.map(function (item) {
            return _this.operation[0](item);
          });
        }
      }

      if (_this.chart.data.datasets.length > _this.maxdata) {
        _this.chart.data.datasets.pop();
      }

      _this.updatechart();
    };

    return _this;
  }

  var _proto = ChartjsFixed.prototype;

  _proto.bind = function bind() {
    _Chartjs.prototype.bind.call(this);

    this.type = 'line';
    this.options.legend.display = false;
    var dataset = [];
    dataset.push({
      data: [],
      label: "",
      backgroundColor: this.selectColor(0),
      borderColor: this.selectColor(0),
      borderWidth: 1,
      pointRadius: 1,
      fill: false
    });
    this.data = {
      labels: Array.from(Array(this.refvalues), function (_, x) {
        return x + 1;
      }),
      //returns [1,2,3,..,refvalues]
      datasets: dataset
    };
    if (typeof this.colorindex === 'string') this.colorindex = parseInt(this.colorindex, 10); //initialize colors for each dataset

    this.currentcolor = this.selectColor(this.colorindex, 65);
    this.previouscolor = this.selectColor(this.colorindex, 65, 75);
    this.previouscolor2 = this.selectColor(this.colorindex, 65, 95);
    this.currentcolorb = this.selectColor(this.colorindex + 1, 65);
    this.previouscolorb = this.selectColor(this.colorindex + 1, 65, 75);
    this.previouscolorb2 = this.selectColor(this.colorindex + 1, 65, 95);
    this.refpointindex = parseInt(this.refpointindex, 10);

    if (this.refpointindex) {
      this.options.refpointplugin = {
        index: this.refpointindex - this.refindex
      };
    }
  };

  _proto.attached = function attached() {
    if (this.refpointindex) {
      _chart.default.pluginService.register({
        id: 'custom_lines to ref point',
        afterDraw: function afterDraw(chart) {
          if (chart.config.options.refpointplugin) {
            var ctx = chart.canvas.getContext('2d');
            ctx.save(); // draw line

            var meta1 = chart.getDatasetMeta(0); //let meta2 = chart.getDatasetMeta(1);

            if (meta1) {
              ctx.beginPath();

              try {
                //expect that data[0] contains point data[1] lines
                var x = meta1.data[0]._model.x;
                var y = meta1.data[0]._model.y;
                var value = chart.data.datasets[0].data[0];

                if (isNaN(value)) {
                  //value is object x, y
                  ctx.moveTo(0, y);
                  ctx.lineTo(x, y);
                  ctx.lineTo(x, chart.height);
                  ctx.lineWidth = 1;
                  ctx.strokeStyle = '#ff9c9c';
                  ctx.stroke();
                  ctx.font = "10px Arial";
                  if (value.y) ctx.fillText(value.y.toPrecision(4), x, y);
                } else {
                  //only y value is there, draw line
                  ctx.moveTo(0, y);
                  ctx.lineTo(chart.width, y);
                  ctx.lineWidth = 1;
                  ctx.strokeStyle = '#ff9c9c';
                  ctx.stroke();
                  ctx.font = "10px Arial";
                  ctx.fillStyle = "black";
                  ctx.fillText(value.toPrecision(4), x, y);
                }
              } catch (e) {//console.warn('error, meta1:',meta1);
              }

              ctx.restore();
            }
          }
        }
      });
    }

    _Chartjs.prototype.attached.call(this);

    if (this.refpointindex) console.log('chartjs fixed debug: chart:', this.chart);
  };

  return ChartjsFixed;
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
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "colorindex", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "highlightindex", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "refpointindex", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.ChartjsFixed = ChartjsFixed;
//# sourceMappingURL=chartjs-fixed.js.map
