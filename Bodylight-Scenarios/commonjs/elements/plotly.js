"use strict";

exports.__esModule = true;
exports.Plotly = void 0;

var _aureliaFramework = require("aurelia-framework");

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var Plotly = (_class = /*#__PURE__*/function () {
  function Plotly() {
    var _this = this;

    _initializerDefineProperty(this, "fromid", _descriptor, this);

    _initializerDefineProperty(this, "labels", _descriptor2, this);

    _initializerDefineProperty(this, "refindex", _descriptor3, this);

    _initializerDefineProperty(this, "refvalues", _descriptor4, this);

    _initializerDefineProperty(this, "maxdata", _descriptor5, this);

    _initializerDefineProperty(this, "width", _descriptor6, this);

    _initializerDefineProperty(this, "height", _descriptor7, this);

    _initializerDefineProperty(this, "convertors", _descriptor8, this);

    this.handleValueChange = function (e) {
      _this.updateData(e);
    };

    this.handleReset = function (e) {
      _this.resetData(e);
    };
  }
  /**
   * process all attributes of <bdl-chart> component and sets appropriate settings of subesquent chartjs
   */


  var _proto = Plotly.prototype;

  _proto.bind = function bind() {
    var _this2 = this;

    this.refindex = parseInt(this.refindex, 10);
    this.refvalues = parseInt(this.refvalues, 10);
    this.refendindex = this.refindex + this.refvalues; //configure convertors - used to convert units received from fmi

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

              _this2.operation.push(function (x) {
                return x * numerator / denominator;
              });
            })();
          }
        } else {
          //convert values are in form of expression, do not contain comma
          if (convertvalues === '1/x') this.operation.push(function (x) {
            return 1 / x;
          });else {
            (function () {
              //filter only allowed characters: algebraic, digits, e, dot, modulo, parenthesis and 'x' is allowed
              var expression = convertvalues[i].replace(/[^-\d/*+.()%xe]/g, '');
              console.log('chartjs bind(), evaluating expression:' + convertvalues[i] + ' securely filtered to :' + expression); // eslint-disable-next-line no-eval

              _this2.operation.push(function (x) {
                return eval(expression);
              });
            })();
          }
        }
      }
    } //sets color of each dataset as different as possible
    //and set initial data in chart
    //set labels - separated by comma


    if (this.labels) this.chlabels = this.labels.split(','); //else generate labels as 'variable 1' ...
    else {
      this.chlabels = [].concat(Array(this.refvalues)).map(function (_, i) {
        return "variable " + i;
      });
    }
  };

  _proto.attached = function attached() {
    //console.log('plotlyjs:', Plotly);
    this.xdata = []; //this.xdata = [0, 1, 2, 3, 4];
    //empty ydata as array of datasets with length refvalues

    this.ydata = [];
    this.data = [];

    for (var i = 0; i < this.refvalues; i++) {
      this.ydata.push([]); //this.ydata = [[1, 2, 4, 8, 16], [0, 2, 4, 6, 8]];

      this.data.push({
        x: this.xdata,
        y: this.ydata[i],
        line: {
          //color: 'rgb(128, 0, 128)',
          width: 1
        }
      });
    }

    this.layout = {
      autosize: true,
      margin: {
        t: 0
      },
      width: this.width,
      height: this.height
    };

    if (window.Plotly) {
      this.chart = window.Plotly.newPlot(this.plotlydiv, this.data, this.layout); //listening to custom event fmidata and fmireset

      var fromel = document.getElementById(this.fromid);

      if (fromel) {
        fromel.addEventListener('fmidata', this.handleValueChange);
        fromel.addEventListener('fmireset', this.handleReset);
      } else {
        console.warn('plotly element WARNING, null fromid element');
      }
    } else console.warn('plotly.js needs to be loaded externally');
  };

  _proto.detached = function detached() {
    var fromel = document.getElementById(this.fromid);

    if (fromel) {
      fromel.removeEventListener('fmidata', this.handleValueChange);
      fromel.removeEventListener('fmireset', this.handleReset);
    } else {
      console.log('chartjs WARNING, null fromid element');
    }
  };

  _proto.updateData = function updateData(e) {
    var j = 0;

    for (var i = this.refindex; i < this.refindex + this.refvalues; i++) {
      //adds data to datasets
      //if convert operation is defined as array then convert
      if (this.operation && this.operation[j]) this.ydata[j].push(this.operation[j](e.detail.data[i])); //else push data directly
      else this.ydata[j].push(e.detail.data[i]);

      if (this.ydata[j].length > this.maxdata) {
        //console.log('shifting dataset chartjs-time', this.chart.data.datasets[j].data);
        this.ydata[j].shift();
      }

      j++;
    }

    this.xdata.push(e.detail.time); //limit data

    if (this.xdata.length > this.maxdata) this.xdata.shift(); //redraw
    //console.log('plotly redraw');

    Plotlyjs.redraw(this.plotlydiv);
  };

  _proto.resetData = function resetData(e) {
    console.log('plotly resetdata()');
    this.xdata.length = 0; // = [];
    //this.ydata = [];

    for (var i = 0; i < this.refvalues; i++) {
      this.ydata[i].length = 0;
    } //=[];//.push([]);


    Plotlyjs.redraw(this.plotlydiv);
  };

  return Plotly;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "fromid", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "labels", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "refindex", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "refvalues", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "maxdata", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 255;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "width", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 600;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "height", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 300;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "convertors", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class);
exports.Plotly = Plotly;
//# sourceMappingURL=plotly.js.map
