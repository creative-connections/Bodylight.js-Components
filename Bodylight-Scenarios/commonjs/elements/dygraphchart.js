"use strict";

exports.__esModule = true;
exports.Dygraphchart = void 0;

var _dygraph = require("../utils/dygraph");

var _aureliaFramework = require("aurelia-framework");

var _fileSaver = require("file-saver");

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var Dygraphchart = (_class = /*#__PURE__*/function () {
  //time to throttle chart update, if it is too much at once
  function Dygraphchart() {
    var _this = this;

    _initializerDefineProperty(this, "inputs", _descriptor, this);

    _initializerDefineProperty(this, "fromid", _descriptor2, this);

    _initializerDefineProperty(this, "maxdata", _descriptor3, this);

    _initializerDefineProperty(this, "refindex", _descriptor4, this);

    _initializerDefineProperty(this, "refvalues", _descriptor5, this);

    _initializerDefineProperty(this, "throttle", _descriptor6, this);

    _initializerDefineProperty(this, "convertors", _descriptor7, this);

    this.initialdata = true;
    this.refindices = null;
    this.xy = false;
    this.operation = null;
    //this.data = [[0, 0, 0]];
    //this.data=[[1, 5], [2, 5], [3, 4.9], [4, 4.8], [5, 5.2]];
    //create lambda function which is added as listener later
    console.log('dygraph chart constructor');

    this.handleValueChange = function (e) {
      var datapoint = [];
      if (!_this.xy) datapoint.push(e.detail.time); //e.detail do not reallocate - using same buffer, thus slicing to append to data array

      var edata = e.detail.data.slice();
      var opindex = 0;

      if (_this.refindices) {
        for (var _iterator = _createForOfIteratorHelperLoose(_this.refindices), _step; !(_step = _iterator()).done;) {
          var myindex = _step.value;

          if (_this.operation) {
            datapoint.push(_this.operation[opindex](edata[myindex]));
            opindex++;
          } else datapoint.push(edata[myindex]);
        }
      } else {
        for (var i = _this.refindex; i < _this.refindex + _this.refvalues; i++) {
          if (_this.operation) {
            datapoint.push(_this.operation[opindex](edata[i]));
            opindex++;
          } else datapoint.push(edata[i]);
        }
      }

      if (_this.initialdata) {
        _this.data = [];
        _this.initialdata = false;
      } //datapoint


      _this.data.push(datapoint); //shift - remove first element if data is too big


      if (_this.data.length > _this.maxdata) _this.data.shift(); //console.log('Dygraphchar data', this.data);

      _this.updatechart(); //this.dygraph.updateOptions( { 'file': this.data } );

    };

    this.handleReset = function (e) {
      _this.resetdata();

      _this.updatechart(); //this.dygraph.updateOptions( { 'file': this.data } );

    };
  }

  var _proto = Dygraphchart.prototype;

  _proto.updatechartfn = function updatechartfn() {
    this.dygraph.updateOptions({
      'file': this.data
    });
  };

  _proto.resetdata = function resetdata() {
    this.data = [];
    var initdatapoint = Array(parseInt(this.refvalues, 10) + 1).fill(0);
    this.data.push(initdatapoint);
    this.initialdata = true;
  };

  _proto.attached = function attached() {
    var _this2 = this;

    //listening to custom event fmidata
    console.log('dygraph attached');
    if (this.refindex && this.refindex.indexOf(',') > 0) this.refindices = this.refindex.split(',');
    var fmielement = document.getElementById(this.fromid);

    if (fmielement) {
      fmielement.addEventListener('fmidata', this.handleValueChange);
      fmielement.addEventListener('fmireset', this.handleReset);
    } //labels are separated by , in attribute inputs
    //console.log('BdlDygraphchart attached inputs', this.inputs);


    this.labels = this.inputs ? this.inputs.split(',') : []; //console.log('BdlDygraphchart attached labels', labels);
    //create dygraph

    this.resetdata(); //console.log('BdlDygraphchart attached initial data init data', initdatapoint, ' data:', this.data);

    this.initdygraph();
    /*data.push([x, y]);
    g.updateOptions( { 'file': data } );*/
    //register throttled update function

    if (typeof this.throttle === 'string') this.throttle = parseInt(this.throttle, 10);

    if (this.throttle > 0) {
      //throttle
      this.updatechart = _.throttle(this.updatechartfn.bind(this), this.throttle);
    } else {
      //directly call chart update
      this.updatechart = this.updatechartfn.bind(this);
    } //configure convertors - used to convert units received from fmi


    if (this.convertors) {
      var convertvalues = this.convertors.split(';');

      var identity = function identity(x) {
        return x;
      };

      this.operation = [];

      for (var i = 0; i < convertvalues.length; i++) {
        if (convertvalues[i].includes(',')) {
          //convert values are in form numerator,denominator contains comma ','
          var convertitems = convertvalues[i].split(',');
          if (convertitems[0] === '1' && convertitems[1] === '1') this.operation.push(identity);else {
            (function () {
              var numerator = parseFloat(convertitems[0]);
              var denominator = parseFloat(convertitems[1]);
              var addend = convertitems.length > 2 ? parseFloat(convertitems[2]) : 0;

              _this2.operation.push(function (x) {
                return x * numerator / denominator + addend;
              });
            })();
          }
        } else {
          //convert values are in form of expression, do not contain comma
          if (convertvalues === '1/x') this.operation.push(function (x) {
            return 1 / x;
          });else {
            (function () {
              // for eval() security filter only allowed characters:
              // algebraic, digits, e, dot, modulo, parenthesis and 'x' and 'e' is allowed
              var expression = convertvalues[i].replace(/[^-\d/*+.()%xe]/g, '');
              console.log('chartjs bind(), evaluating expression:' + convertvalues[i] + ' securely filtered to :' + expression); // eslint-disable-next-line no-eval

              _this2.operation.push(function (x) {
                return eval(expression);
              });
            })();
          }
        }
      }
    }
  };

  _proto.initdygraph = function initdygraph() {
    //console.log('initdygraph:',Dygraph);
    this.dygraph = new _dygraph.Dygraph(this.dygraphcanvas, this.data, {
      //Draw a small dot at each point
      drawPoints: true,
      //rolling average period text box to be show
      //showRoller: true,
      //customBars if series is low;middle;high where range between low and high is visualised
      //customBars: true,
      //range selector
      //showRangeSelector: true,
      labels: this.labels
    });
  };

  _proto.detached = function detached() {
    if (document.getElementById(this.fromid)) document.getElementById(this.fromid).removeEventListener('fmidata', this.handleValueChange);
    if (document.getElementById(this.fromid)) document.getElementById(this.fromid).removeEventListener('fmireset', this.handleReset);
  };

  _proto.download = function download() {
    var filename = prompt('File name (*.csv):', 'data.csv');

    if (filename) {
      if (!filename.endsWith('.csv')) filename = filename.concat('.csv');
      var content = this.inputs + '\n' + this.data.map(function (e) {
        return e.join(',');
      }).join('\n');
      var blob = new Blob([content], {
        type: 'text/csv;charset=utf-8;'
      });
      (0, _fileSaver.saveAs)(blob, filename);
    }
  };

  _proto.preview = function preview() {
    var content = this.inputs + '\n' + this.data.map(function (e) {
      return e.join(',');
    }).join('\n');
    var blob = new Blob([content], {
      type: 'text/csv;charset=utf-8;'
    });
    var url = URL.createObjectURL(blob);
    this.popup = window.open(url, 'BodylightPreview', 'width=800,height=600,menubar=no,status=no,titlebar=no,toolbar=no');
  };

  return Dygraphchart;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "inputs", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "fromid", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "maxdata", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 300;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "refindex", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "refvalues", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "throttle", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 200;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "convertors", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class);
exports.Dygraphchart = Dygraphchart;
//# sourceMappingURL=dygraphchart.js.map
