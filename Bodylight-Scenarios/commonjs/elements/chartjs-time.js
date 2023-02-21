"use strict";

exports.__esModule = true;
exports.ChartjsTime = void 0;

var _aureliaTemplating = require("aurelia-templating");

var _chartjs = require("./chartjs");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

//import {PLATFORM} from 'aurelia-pal';
//@customElement
//@useView(PLATFORM.moduleName('./bdl-chartjs.html'))
var ChartjsTime = (_dec = (0, _aureliaTemplating.useView)('./chartjs.html'), _dec(_class = (_class2 = /*#__PURE__*/function (_Chartjs) {
  _inheritsLoose(ChartjsTime, _Chartjs);

  // starting  index - if moooor indices, separate by comma
  //number of values from refindex - only if one refindex is   defined
  function ChartjsTime() {
    var _this;

    _this = _Chartjs.call(this) || this; //this.type = 'line';

    _initializerDefineProperty(_this, "fromid", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "labels", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "refindex", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "refvalues", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "type", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "min", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "max", _descriptor7, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "minichart", _descriptor8, _assertThisInitialized(_this));

    _this.refindices = void 0;

    _this.handleValueChange = function (e) {
      //e.detail do not reallocate - using same buffer, thus slicing to append to data array
      //let datapoints =e.detail.data.slice(this.refindex, this.refendindex);
      var j = 0;

      function handleIndex(i) {
        {
          //adds data to datasets
          //if convert operation is defined as array then convert
          if (this.operation && this.operation[j]) this.chart.data.datasets[j].data.push(this.operation[j](e.detail.data[i])); //else push data directly
          else this.chart.data.datasets[j].data.push(e.detail.data[i]);

          if (this.chart.data.datasets[j].data.length > this.maxdata) {
            //console.log('shifting dataset chartjs-time', this.chart.data.datasets[j].data);
            this.chart.data.datasets[j].data.shift();
          }

          j++;
        }
      }

      if (_this.refindices) {
        for (var _iterator = _createForOfIteratorHelperLoose(_this.refindices), _step; !(_step = _iterator()).done;) {
          var i = _step.value;
          handleIndex.call(_assertThisInitialized(_this), i);
        }
      } else for (var _i = _this.refindex; _i < _this.refindex + _this.refvalues; _i++) {
        handleIndex.call(_assertThisInitialized(_this), _i);
      }

      _this.chart.data.labels.push(e.detail.time);

      if (_this.chart.data.labels.length > _this.maxdata) {
        _this.chart.data.labels.shift();

        if (_this.sectionid) {
          //shift sections
          if (_this.chart.config.options.section[0].index === 0) _this.chart.config.options.section.shift(); //decrement all indices in sections

          for (var _i2 = 0; _i2 < _this.chart.config.options.section.length; _i2++) {
            _this.chart.config.options.section[_i2].index -= 1;
          }
        }
      } //shift - remove first element if data is too big
      //console.log('chartjs handlevaluechange() chart.data.datasets[0].data', this.chart.data.datasets[0].data);


      _this.updatechart();
    };

    return _this;
  }
  /**
   * sets all tim-series specific options for chartjs
   */


  var _proto = ChartjsTime.prototype;

  _proto.bind = function bind() {
    _Chartjs.prototype.bind.call(this); //done in super
    //this.chlabels = this.labels.split(','); //labels for each dataset
    //this.colors = [];


    var datasets = [];
    var mydata1 = this.initialdata.split(';');

    for (var i = 0; i < this.refvalues + 1; i++) {
      //mydata[0] == timelabels in x axis, mydata[1..n] ar in y axis
      var mydata2 = mydata1[i] ? mydata1[i].split(',') : [];
      this.mydata[i] = mydata2.map(function (x) {
        return parseFloat(x);
      }); //console.log('chartjstime mydata i',this.mydata[i]);
    } //initialize colors for each dataset


    for (var _i3 = 0; _i3 < this.refvalues; _i3++) {
      //this.colors.push(this.selectColor(i));
      datasets.push({
        data: this.mydata[_i3 + 1],
        label: this.chlabels[_i3],
        backgroundColor: this.selectColor(_i3),
        borderColor: this.selectColor(_i3),
        borderWidth: 1,
        pointRadius: 1,
        fill: false
      }); //timelabels.push(i);
    }

    this.data = {
      labels: this.mydata[0],
      datasets: datasets
    };
    if (this.verticalline) this.type = 'LineWithLine';else this.type = 'line';
  };

  _proto.attached = function attached() {
    _Chartjs.prototype.attached.call(this);
  };

  _proto.detached = function detached() {
    _Chartjs.prototype.detached.call(this);
  };

  _proto.resetdata = function resetdata() {
    //super.resetdata();
    for (var j = 0; j < this.refvalues; j++) {
      this.chart.data.datasets[j].data = [];
    }

    this.chart.data.labels = [];
    this.updatechart();
  };

  return ChartjsTime;
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
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "minichart", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.ChartjsTime = ChartjsTime;
//# sourceMappingURL=chartjs-time.js.map
