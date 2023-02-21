"use strict";

exports.__esModule = true;
exports.ChartjsXy = void 0;

var _chartjsTime = require("./chartjs-time");

var _aureliaTemplating = require("aurelia-templating");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

//import {PLATFORM} from 'aurelia-pal';
//@useView(PLATFORM.moduleName('./bdl-chartjs.html'))
var ChartjsXy = (_dec = (0, _aureliaTemplating.useView)('./chartjs.html'), _dec(_class = (_class2 = /*#__PURE__*/function (_ChartjsTime) {
  _inheritsLoose(ChartjsXy, _ChartjsTime);

  function ChartjsXy() {
    var _this;

    _this = _ChartjsTime.call(this) || this;

    _initializerDefineProperty(_this, "fromid", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "labels", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "refindex", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "refvalues", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "type", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "labelx", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "labely", _descriptor7, _assertThisInitialized(_this));

    _this.showlines = true;

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

  var _proto = ChartjsXy.prototype;

  _proto.bind = function bind() {
    var _this2 = this;

    _ChartjsTime.prototype.bind.call(this);

    var datasets = [];
    var mydata1 = this.initialdata.split(';'); //initialize x and y, x is first dataset, y is al the rest

    this.mydata = [];

    for (var i = 0; i < this.refvalues; i++) {
      var mydata2 = mydata1[i] ? mydata1[i].split(',') : [];

      if (i === 0) {
        //parse x
        this.mydata[0] = mydata2.map(function (x, index) {
          return parseFloat(x);
        });
      } else {
        //parse all y
        this.mydata[i] = mydata2.map(function (yy, index) {
          return {
            x: _this2.mydata[0][index],
            y: parseFloat(yy)
          };
        });
      }
    } //this.colors already set in super()


    for (var _i = 1; _i < this.refvalues; _i++) {
      datasets.push({
        data: this.mydata[_i],
        label: this.chlabels[_i],
        backgroundColor: this.colors[_i - 1],
        borderColor: this.colors[_i - 1],
        fill: false,
        showLine: this.showlines,
        borderWidth: 1,
        refvalues: this.refvalues
      });
    } //add additional data, all after ; is taken as x values separated by , of initial curve,
    // after ; is y values of initial curve separated by ,
    // if more curves then another ;. E.g. initialdata=";;0,0.00015;0,28000;0,0.00015;0,1400"
    // -> line from 0 0 to 0.0015 28000 and from 0 0 to 00015 1400


    if (mydata1.length > this.refvalues) {
      var j = this.refvalues;

      var _loop = function _loop(_i2) {
        var mydata2 = mydata1[_i2].split(',');

        var mydata3 = mydata1[_i2 + 1].split(',');

        _this2.mydata[j] = mydata3.map(function (yy, index) {
          return {
            x: parseFloat(mydata2[index]),
            y: parseFloat(yy)
          };
        });
        datasets.push({
          data: _this2.mydata[j],
          backgroundColor: _this2.selectColor(_i2),
          borderColor: _this2.selectColor(_i2),
          fill: false,
          showLine: _this2.showlines
        });
        j++;
      };

      for (var _i2 = this.refvalues; _i2 < mydata1.length; _i2 += 2) {
        _loop(_i2);
      }
    }

    this.data = {
      datasets: datasets
    };
    this.type = 'scatter';
    this.options.tooltips.mode = 'nearest';
    this.options.elements = {
      point: {
        radius: this.customRadius,
        display: true
      }
    };
  };

  _proto.customRadius = function customRadius(context) {
    var last = context.dataIndex === context.dataset.data.length - 1;
    var inrefvalues = context.datasetIndex < context.dataset.refvalues; //dataset is in refvalues - changed by simulator

    if (inrefvalues) return last ? 3 : 1;
    return 1; //dataset is fixed - background borders
  };

  _proto.resetdata = function resetdata() {
    var j = 0;

    for (var i = this.refindex + 1; i < this.refindex + this.refvalues; i++) {
      this.chart.data.datasets[j].data = [];
      j++;
    }
  };

  return ChartjsXy;
}(_chartjsTime.ChartjsTime), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "fromid", [_aureliaTemplating.bindable], {
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
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "labelx", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "labely", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.ChartjsXy = ChartjsXy;
//# sourceMappingURL=chartjs-xy.js.map
