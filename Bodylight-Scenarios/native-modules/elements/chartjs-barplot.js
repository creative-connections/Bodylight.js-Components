"use strict";

exports.__esModule = true;
exports.ChartjsBarplot = void 0;

var _chartjs = require("./chartjs");

var _chartjsPluginDatalabels = _interopRequireDefault(require("chartjs-plugin-datalabels"));

var _aureliaTemplating = require("aurelia-templating");

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

//import {PLATFORM} from 'aurelia-pal';
//@useView(PLATFORM.moduleName('./bdl-chartjs.html'))
//@useView('./chartjs.html')
var ChartjsBarplot = (_class = /*#__PURE__*/function (_Chartjs) {
  _inheritsLoose(ChartjsBarplot, _Chartjs);

  //csv limits of chart min and max
  //='';//0.25,0.75'; //csv normal limits inside chart
  //sets precision to floor/round
  //whether click will create event 'change'
  function ChartjsBarplot() {
    var _this;

    _this = _Chartjs.call(this) || this;

    _initializerDefineProperty(_this, "id", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "fromid", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "labels", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "refindex", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "refvalues", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "extremelimits", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "normallimits", _descriptor7, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "initialdata", _descriptor8, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "width", _descriptor9, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "height", _descriptor10, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "nominal", _descriptor11, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "twoway", _descriptor12, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "responsive", _descriptor13, _assertThisInitialized(_this));

    _this.handleValueChange = function (e) {
      //sets data to dataset
      //apply value convert among all data
      var rawdata = e.detail.data.slice(_this.refindex, _this.refendindex); //if convert operation is defined as array

      if (_this.operation) {
        for (var i = 0; i < rawdata.length; i++) {
          //if particular operation is defined
          if (_this.operation[i]) rawdata[i] = _this.operation[i](rawdata[i]);
        }
      }

      _this.chart.data.datasets[0].data = rawdata; //now decide whether datalabel is right or left

      if ((_this.elimits[1] - rawdata) / (_this.elimits[1] - _this.elimits[0]) < 0.05) {
        _this.options.plugins.datalabels.align = 'left';
        _this.options.plugins.datalabels.color = 'white';
      } else {
        _this.options.plugins.datalabels.align = 'right';
        _this.options.plugins.datalabels.color = 'black';
      }

      _this.updatechart();
    };

    return _this;
  }

  var _proto = ChartjsBarplot.prototype;

  _proto.bind = function bind() {
    _Chartjs.prototype.bind.call(this);

    this.plugins = [_chartjsPluginDatalabels.default];

    if (this.extremelimits) {
      this.elimits = this.extremelimits.split(','); //split by comma

      for (var i = 0; i < this.elimits.length; i++) {
        this.elimits[i] = parseFloat(this.elimits[i]);
      }
    }

    if (this.normallimits) {
      this.nlimits = this.normallimits.split(',');

      for (var _i = 0; _i < this.nlimits.length; _i++) {
        this.nlimits[_i] = parseFloat(this.nlimits[_i]);
      }
    }

    if (this.nominal) {
      if (typeof this.nominal === 'string') this.nominal = parseFloat(this.nominal);
      this.options.nominal = this.nominal;
    }

    if (this.twoway && typeof this.twoway === 'string') {
      this.twoway = this.twoway === 'true';
    } //chartjs type horizontal bar


    this.type = 'horizontalBar'; // no legend and no labels
    //this.chlabels = [];

    this.options.legend.display = false; //sets xaxis limits to extremelimits

    if (!this.options.scales.xAxes) this.options.scales.xAxes = [{}];
    this.options.scales.xAxes[0].ticks = {
      autoSkip: true,
      min: this.elimits[0],
      max: this.elimits[1],
      fontSize: 8,
      callback: function callback(value, index, values) {
        //count relative distance to last tick value
        var reldistance = (values[3] - value) / (values[3] - values[0]); // do not display tick label if too close to extreme limit (<5% of length)

        if (index === 2 && reldistance < 0.05) return '';
        return value;
      }
    }; //set ticks to extreme and normal limits only

    var myticks = this.normallimits ? [this.elimits[0], this.nlimits[0], this.nlimits[1], this.elimits[1]] : [this.elimits[0], this.elimits[1]]; //console.log('charjs barplot myticks', myticks);

    this.options.scales.xAxes[0].afterBuildTicks = function (scale) {
      scale.ticks = myticks;
      return;
    };

    this.options.scales.xAxes[0].beforeUpdate = function (oScale) {
      return;
    }; //datalabel plugin shows value right of the bar


    this.options.plugins = {
      datalabels: {
        align: 'right',
        anchor: 'end',
        formatter: function formatter(value, context) {
          return value.toPrecision(3);
        },
        font: {
          size: 8
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 1
        }
      }
    }; //now decide whether datalabel is right or left
    //TODO eliminate duplicate in handlevaluechange

    if ((this.elimits[1] - parseFloat(this.initialdata)) / (this.elimits[1] - this.elimits[0]) < 0.05) {
      this.options.plugins.datalabels.align = 'left';
      this.options.plugins.datalabels.color = 'white';
    } else {
      this.options.plugins.datalabels.align = 'right';
      this.options.plugins.datalabels.color = 'black';
    } //if the component is twoway - on click shows second bar with desired value and triggers 'change' event


    if (this.twoway) {
      //sets options for chart
      this.options.events = ['click'];
      this.options.parentId = this.id; //this.options.parentvm = this;

      this.options.onClick = function (c, i) {
        //note this - refers now to chart, not to webcomponent - shared properties are via options.nominal and options.parentid
        //console.log('chartjs barplot click,', c, i, 'this:', this);
        //let scaler = this.chart.scales['y-axis-0'];
        var xscaler = this.chart.scales['x-axis-0']; //let y = c.clientY - this.canvas.getBoundingClientRect().top - scaler.top;

        var x = c.clientX - this.canvas.getBoundingClientRect().left - xscaler.left; //let yval = scaler.max - y / scaler.height * (scaler.max - scaler.min);

        var xval = xscaler.min + x / xscaler.width * (xscaler.max - xscaler.min);

        if (this.options.nominal) {
          //nominal is defined - floor xval to nominal
          xval = Math.floor(xval / this.options.nominal) * this.options.nominal;
        } //console.log('value clicked: %o, ypx: %o', yval, y);
        //console.log('value clicked: %o, xpx: %o', xval, x);
        //this.trigger('onTickerXClick', xval);


        if (this.data.datasets.length < 2) {
          this.data.datasets.push({
            data: [xval],
            backgroundColor: '#ff0000',
            label: 'new value'
          });
        } else this.data.datasets[1].data = [xval];

        this.update(); //create and dispatch change event

        var event = new CustomEvent('change', {
          detail: {
            value: xval,
            id: this.options.parentId
          }
        }); //dispatch event - it should be listened by some other component

        document.getElementById(this.options.parentId).dispatchEvent(event); //this.parentvm.valueChanged(xval);
      };
    }

    this.options.tooltips = {
      enabled: false
    };
    this.tooltips = [];
    /*if (!this.options.scales.yAxes) this.options.scales.yAxes = [{}];
    this.options.scales.yAxes[0].ticks = {
      max: 5,
      min: 0,
      stepSize: 0.5
    };*/
  };

  _proto.valueChanged = function valueChanged(value) {
    console.log('chartjs barplot valuechanged:', value);
  };

  return ChartjsBarplot;
}(_chartjs.Chartjs), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "id", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "fromid", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "labels", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "refindex", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "refvalues", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "extremelimits", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '0,1';
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "normallimits", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "initialdata", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '7.5';
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, "width", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '500';
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, "height", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '50';
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, "nominal", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.01;
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class.prototype, "twoway", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class.prototype, "responsive", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class);
exports.ChartjsBarplot = ChartjsBarplot;
//# sourceMappingURL=chartjs-barplot.js.map
