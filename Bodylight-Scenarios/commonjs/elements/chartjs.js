"use strict";

exports.__esModule = true;
exports.Chartjs = void 0;
exports.myParseInt = myParseInt;

var _chart = _interopRequireDefault(require("chart.js"));

var _chartjsPluginDatalabels = _interopRequireDefault(require("chartjs-plugin-datalabels"));

var _aureliaFramework = require("aurelia-framework");

var _lodash = _interopRequireDefault(require("lodash"));

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

//returns array of numbers if contains comma, or number - int
function myParseInt(str, raddix) {
  if (typeof str !== "string") return str;
  if (str.lastIndexOf(',') > 0) return str.split(',').map(function (x) {
    return parseInt(x, raddix);
  });else return parseInt(str, raddix);
}

var Chartjs = (_class = /*#__PURE__*/function () {
  //id to listen addsection event
  //false - to keep width and height, true - to rescale
  //time to throttle chart update, if it is too much at once
  //min for y axis - if chart has this axis
  //max for y axis - if chart has this axis
  //whether to integrate with 3d babylonjs
  //canvas obj name -
  //index to shift the color
  //index to shift the color
  //may be configured by subclasses

  /**
   * initializes handlers for event processing - this is recommended way
   */
  function Chartjs() {
    var _this = this;

    _initializerDefineProperty(this, "fromid", _descriptor, this);

    _initializerDefineProperty(this, "labels", _descriptor2, this);

    _initializerDefineProperty(this, "refindex", _descriptor3, this);

    _initializerDefineProperty(this, "refvalues", _descriptor4, this);

    _initializerDefineProperty(this, "type", _descriptor5, this);

    _initializerDefineProperty(this, "maxdata", _descriptor6, this);

    _initializerDefineProperty(this, "initialdata", _descriptor7, this);

    _initializerDefineProperty(this, "width", _descriptor8, this);

    _initializerDefineProperty(this, "height", _descriptor9, this);

    _initializerDefineProperty(this, "animate", _descriptor10, this);

    _initializerDefineProperty(this, "id", _descriptor11, this);

    _initializerDefineProperty(this, "ylabel", _descriptor12, this);

    _initializerDefineProperty(this, "xlabel", _descriptor13, this);

    _initializerDefineProperty(this, "convertors", _descriptor14, this);

    _initializerDefineProperty(this, "verticalline", _descriptor15, this);

    _initializerDefineProperty(this, "generatelabels", _descriptor16, this);

    _initializerDefineProperty(this, "sectionid", _descriptor17, this);

    _initializerDefineProperty(this, "responsive", _descriptor18, this);

    _initializerDefineProperty(this, "throttle", _descriptor19, this);

    _initializerDefineProperty(this, "precision", _descriptor20, this);

    _initializerDefineProperty(this, "min", _descriptor21, this);

    _initializerDefineProperty(this, "max", _descriptor22, this);

    _initializerDefineProperty(this, "babylonjs", _descriptor23, this);

    _initializerDefineProperty(this, "canvasobj", _descriptor24, this);

    _initializerDefineProperty(this, "colorsegmentindex", _descriptor25, this);

    _initializerDefineProperty(this, "colorindex", _descriptor26, this);

    _initializerDefineProperty(this, "minichart", _descriptor27, this);

    this.indexsection = 0;
    this.datalabels = false;
    this.refindices = void 0;

    this.handleValueChange = function (e) {
      //sets data to dataset
      //apply value convert among all data
      var rawdata;

      if (_this.refindices) {
        rawdata = _this.refindices.map(function (x) {
          return e.detail.data[x];
        });
      } else rawdata = e.detail.data.slice(_this.refindex, _this.refendindex); //if convert operation is defined as array


      if (_this.operation) {
        for (var i = 0; i < rawdata.length; i++) {
          //if particular operation is defined
          if (_this.operation[i]) rawdata[i] = _this.operation[i](rawdata[i]);
        }
      }

      _this.chart.data.datasets[0].data = rawdata;

      _this.updatechart();
    };

    this.handleReset = function (e) {
      console.log('handlereset2()');

      if (_this.chart.data.datasets) {
        for (var _iterator = _createForOfIteratorHelperLoose(_this.chart.data.datasets), _step; !(_step = _iterator()).done;) {
          var dataset = _step.value;
          if (dataset && dataset.data) dataset.data = [];
        }
      }

      if (_this.chart.data.labels.length > 0) _this.chart.data.labels = [];

      if (_this.sectionid) {
        _this.chart.config.options.section = [];
        _this.indexsection = 0;
      }

      _this.updatechart(); //this.chart.config.options.section = [];

    };

    this.handleAddSection = function (e) {
      _this.addSection(e.detail.label);
    };

    this.handleFMIAttached = function (e) {
      var fromel = document.getElementById(_this.fromid);

      if (fromel) {
        fromel.addEventListener('fmidata', _this.handleValueChange);
        fromel.addEventListener('fmireset', _this.handleReset);
      } else {
        console.warn('fmi attached, but no element with id found:', _this.fromid);
      }
    };
  }
  /**
   * Returns unique color per index- neighbouring colors are different using golden angle approximation
   * @param index
   * @returns {string} usable by CSS or DOM elements
   */
  //  const hue = (i - 1) * 137.508; // use golden angle approximation
  //  var color = `hsl(${hue},85%,91%)`;


  var _proto = Chartjs.prototype;

  _proto.selectColor = function selectColor(index, saturation, lightness) {
    if (saturation === void 0) {
      saturation = 55;
    }

    if (lightness === void 0) {
      lightness = 55;
    }

    var hue = (index - 1) * 137.508; // use golden angle approximation

    return "hsl(" + hue + "," + saturation + "%," + lightness + "%)";
  }
  /**
   * process all attributes of <bdl-chart> component and sets appropriate settings of subesquent chartjs
   */
  ;

  _proto.bind = function bind() {
    var _this2 = this;

    //console.log('chartjs bind');
    if (typeof this.refindex == 'string' && this.refindex.indexOf(',') > 0) {
      this.refindices = this.refindex.split(',');
    } else {
      this.refindex = myParseInt(this.refindex, 10);
      this.refvalues = parseInt(this.refvalues, 10);
      this.refendindex = this.refindex + this.refvalues;
    } //empty plugins by default


    this.plugins = []; //configure convertors - used to convert units received from fmi

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
    } //sets boolean value - if verticalline attribute is set


    if (typeof this.generatelabels === 'string') {
      this.generatelabels = this.generatelabels === 'true';
    }

    if (typeof this.minichart === 'string') this.minichart = this.minichart === 'true'; //sets color of each dataset as different as possible
    //and set initial data in chart
    //set labels - separated by comma

    if (this.labels) this.chlabels = this.labels.split(','); //else generate labels as 'variable 1' ...
    else {
      //this.chlabels = [...Array(this.refvalues)].map((_, i) => this.generatelabels ? `variable ${i}` : '');
      //this seems not to be correctly transpilled to ES5, therefore following generator ->
      this.chlabels = [];

      for (var _i = 0; _i < this.refvalues; _i++) {
        var ilabel = this.generatelabels ? 'variable ' + _i : '';
        this.chlabels.push(ilabel);
      }
    }
    this.colors = [];
    var mydatastr = this.initialdata.split(',');
    this.mydata = mydatastr.map(function (x) {
      return parseFloat(x);
    });
    if (this.refindices) this.refvalues = this.refindices.length;

    for (var _i2 = 0; _i2 < this.refvalues; _i2++) {
      if (!this.mydata[_i2]) {//this.mydata.push(0);
        //console.log('chartjs no data');
      }

      this.colors.push(this.selectColor(_i2 + this.colorindex));
    }

    var datasets = [{
      data: this.mydata,
      backgroundColor: this.colors
    }];
    this.data = {
      labels: this.chlabels,
      datasets: datasets
    }; //bind - string value to boolean

    if (typeof this.animate === 'string') {
      this.animate = this.animate === 'true';
    }

    if (typeof this.responsive === 'string') {
      this.responsive = this.responsive === 'true';
    } //set animation options


    var animopts1 = {
      animateScale: true,
      animateRotate: true,
      duration: 500
    };
    var animopts2 = {
      duration: 0
    }; //select options based on attribute value - whether to animate or not

    var animopts = this.animate ? animopts1 : animopts2; //set labels for axes in chartjs opts

    var axisopts = {};

    if (this.ylabel) {
      axisopts.yAxes = [{
        scaleLabel: {
          display: true,
          labelString: this.ylabel
        }
      }];
    }

    if (this.xlabel) {
      axisopts.xAxes = [{
        scaleLabel: {
          display: true,
          labelString: this.xlabel
        }
      }];
    }

    if (this.minichart) {
      if (axisopts.xAxes) axisopts.xAxes[0].display = false;else axisopts.xAxes = [{
        display: false
      }];
      if (axisopts.yAxes) axisopts.yAxes[0].display = false;else axisopts.yAxes = [{
        display: false
      }];
    } //initialize options - used later by chartjs instance


    this.options = {
      live: true,
      responsive: this.responsive,
      //true - rescale, false - will keep canvas width and height
      legend: {
        display: !this.minichart,
        position: 'top'
      },
      animation: animopts,
      tooltips: {
        position: 'nearest',
        mode: 'index',
        intersect: false,
        titleFontFamily: 'Open Sans',
        backgroundColor: 'rgba(0,0,0,0.3)',
        //titleFontColor: 'red',
        caretSize: 5,
        cornerRadius: 4,
        xPadding: 3,
        yPadding: 3,
        callbacks: {
          label: function label(tooltipItem, data) {
            //let label = data.labels[tooltipItem.index];
            var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]; //console.log('chartjs tooltip, value',tooltipItem,value);

            if (typeof value === 'object') return value.x.toPrecision(4) + ':' + value.y.toPrecision(4);
            if (typeof value === 'number') return value.toPrecision(4); //TODO this.precision is not accessible from here

            return value;
          }
        }
      },
      hover: {
        animationDuration: 0,
        //disable animation on hover - e.g. for tooltips
        intersect: false
      },
      scales: axisopts,
      babylondynamictexture: "" // name of global dynamictextureobj to call update()

    }; //sets boolean value - if verticalline attribute is set

    if (typeof this.verticalline === 'string') {
      this.verticalline = this.verticalline === 'true';
    }

    if (typeof this.maxdata === 'string') {
      this.maxdata = parseInt(this.maxdata, 10);
    } //if sections are requested - define chartjs plugin to draw it in background


    if (this.sectionid) {
      this.options.section = [];
    }

    if (this.min) {
      //sets yscale min
      if (!this.options) this.options = {};
      if (!this.options.scales) this.options.scales = {};
      if (!this.options.scales.yAxes) this.options.scales.yAxes = [{}]; //chartjs 2.9.4

      if (!this.options.scales.yAxes[0].ticks) this.options.scales.yAxes[0].ticks = {}; //chartjs 2.9.4

      this.options.scales.yAxes[0].ticks.min = parseFloat(this.min);
    }

    if (this.max) {
      //sets yscale max
      if (!this.options) this.options = {};
      if (!this.options.scales) this.options.scales = {};
      if (!this.options.scales.yAxes) this.options.scales.yAxes = [{}]; //chartjs 2.9.4

      if (!this.options.scales.yAxes[0].ticks) this.options.scales.yAxes[0].ticks = {}; //chartjs 2.9.4

      this.options.scales.yAxes[0].ticks.max = parseFloat(this.max); //if (this.min) this.options.scales.yAxes[0].ticks.stepSize = (this.options.scales.yAxes[0].ticks.max - this.options.scales.yAxes[0].ticks.min) / 10;
    }

    this.tooltips = ['mousemove', 'touchstart', 'touchmove', 'click'];

    if (typeof this.colorindex === 'string') {
      this.colorindex = parseInt(this.colorindex, 10);
    }

    if (typeof this.colorsegmentindex === 'string') {
      this.colorsegmentindex = parseInt(this.colorsegmentindex, 10);
    }
    /*if (this.minichart) {
      this.options.plugins.legend.display = false
    }*/

  }
  /**
   * this is called when the DOM is attached to view - instantiate the chartjs and sets all necesary binding
   */
  ;

  _proto.attached = function attached() {
    //console.log('chartjs attached');
    //listening to custom event fmidata and fmireset
    var fromel = document.getElementById(this.fromid);

    if (fromel) {
      fromel.addEventListener('fmidata', this.handleValueChange);
      fromel.addEventListener('fmireset', this.handleReset);
    } else {
      console.warn('chartjs, null fromid element, waiting to be attached');
      document.addEventListener('fmiattached', this.handleFMIAttached);
    }

    if (this.sectionid) {
      var sectionel = document.getElementById(this.sectionid);
      if (sectionel) sectionel.addEventListener('addsection', this.handleAddSection);else console.log('chartjs WARNING, null sectionid element');
    } //unregister


    _chart.default.plugins.unregister(_chartjsPluginDatalabels.default); //for verticalline option - register controller for BdlChartjs


    if (this.verticalline) {
      _chart.default.defaults.LineWithLine = _chart.default.defaults.line;
      _chart.default.controllers.LineWithLine = _chart.default.controllers.line.extend({
        draw: function draw(ease) {
          _chart.default.controllers.line.prototype.draw.call(this, ease);

          if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
            var activePoint = this.chart.tooltip._active[0];
            var _ctx = this.chart.ctx;
            var x = activePoint.tooltipPosition().x;
            var topY = this.chart.legend.bottom;
            var bottomY = this.chart.chartArea.bottom; // draw line

            _ctx.save();

            _ctx.beginPath();

            _ctx.moveTo(x, topY);

            _ctx.lineTo(x, bottomY);

            _ctx.lineWidth = 1;
            _ctx.strokeStyle = '#555';

            _ctx.stroke();

            _ctx.restore();
          }
        }
      });
    } //for sections register chartjs plugin


    if (this.sectionid) {
      _chart.default.pluginService.register({
        beforeDraw: function beforeDraw(chart, easing) {
          if (chart.config.options.section && chart.config.options.section.length > 0) {
            var _ctx2 = chart.chart.ctx;
            var chartArea = chart.chartArea;
            var meta = chart.getDatasetMeta(0);
            var i;

            _ctx2.save(); //console.log('chartjs sections', chart.config.options.section);


            if (meta.data.length == 0) return; //first section

            for (i = 1; i < chart.config.options.section.length; i++) {
              //console.log('chartjs sectionplugin:i, section[i-1], section[1],start,stop)', i, chart.config.options.section[i - 1],chart.config.options.section[i]);
              var startindex = chart.config.options.section[i - 1].index;
              var stopindex = chart.config.options.section[i].index;
              if (startindex >= meta.data.length) continue;
              if (stopindex >= meta.data.length) continue;
              var start = meta.data[startindex]._model.x;
              var stop = meta.data[stopindex]._model.x;
              /*const hue = (i - 1) * 137.508; // use golden angle approximation
              ctx.fillStyle = `hsl(${hue},85%,91%)`;
               */
              //bar

              _ctx2.fillStyle = chart.config.options.section[i - 1].color;

              _ctx2.fillRect(start, chartArea.top, stop - start, chartArea.bottom - chartArea.top); //label
              //ctx.translate(start, chartArea.top);
              //ctx.rotate(Math.PI / 2);


              _ctx2.save();

              _ctx2.translate(start, chartArea.top);

              _ctx2.rotate(90 * Math.PI / 180);

              _ctx2.fillStyle = '#aaa';
              _ctx2.font = '12px Helvetica';

              _ctx2.fillText(chart.config.options.section[i - 1].label, 5, -5); //start, chartArea.top);


              _ctx2.restore();
            }

            _ctx2.restore(); //console.log('last i',i);
            //last section


            i = chart.config.options.section.length;

            if (i > 1 && chart.config.options.section[i - 1].index < meta.data.length - 1 && chart.config.options.section[i - 1].index < meta.data.length) {
              //draw last section
              var _start = meta.data[chart.config.options.section[i - 1].index]._model.x;
              var _stop = meta.data[meta.data.length - 1]._model.x; //console.log (start,stop);

              /*
              const hue = (i - 1) * 137.508; // use golden angle approximation
              var color = `hsl(${hue},85%,91%)`;
               */

              _ctx2.fillStyle = chart.config.options.section[i - 1].color; //console.log (chartArea);

              _ctx2.fillRect(_start, chartArea.top, _stop - _start, chartArea.bottom - chartArea.top);

              _ctx2.save();

              _ctx2.translate(_start, chartArea.top);

              _ctx2.rotate(90 * Math.PI / 180);

              _ctx2.fillStyle = '#aaa';
              _ctx2.font = '12px Helvetica';

              _ctx2.fillText(chart.config.options.section[i - 1].label, 5, -5); //start, chartArea.top);


              _ctx2.restore();
            }
          }
        }
      });
    }

    if (this.datalabels) {
      console.log('datalabels true ,setting plugin', this.datalabels);
      console.log('datalabels true ,setting plugin', this.datalabels);

      _chart.default.pluginService.register({
        afterDatasetsDraw: function afterDatasetsDraw(chartInstance, easing) {
          // To only draw at the end of animation, check for easing === 1
          //if (dataset && dataset.datalabels) {
          var ctx = chartInstance.chart.ctx;
          chartInstance.data.datasets.forEach(function (dataset, i) {
            if (dataset && dataset.datalabels) {
              var meta = chartInstance.getDatasetMeta(i);

              if (!meta.hidden) {
                meta.data.forEach(function (element, index) {
                  if (dataset.datalabels[index].length > 0) {
                    // Draw the text in black, with the specified font
                    ctx.fillStyle = '#aaa';
                    ctx.font = '12px Helvetica'; // Just naively convert to string for now

                    var dataString = dataset.datalabels[index]; // Make sure alignment settings are correct

                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    var padding = 5;
                    var position = element.tooltipPosition();
                    ctx.fillText(dataString, position.x, position.y - 12 / 2 - padding);
                  }
                });
              }
            }
          });
        }
      });
    } //babylonjs bind

    /*if (typeof this.babylonjs === 'string') {
      //this.babylonjs = this.babylonjs === 'true';
    } else this.babylonjs = false;*/


    if (this.babylonjs) {
      this.options.babylondynamictexture = this.babylonjs;

      _chart.default.plugins.register({
        beforeDraw: function beforeDraw(chartInstance) {
          var ctx = chartInstance.chart.ctx; //console.log('ctx before draw:')

          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
        },
        afterDraw: function afterDraw(chartInstance) {
          var ctx = chartInstance.chart.ctx; //console.log('ctx after draw:')

          if (window[chartInstance.options.babylondynamictexture]) window[chartInstance.options.babylondynamictexture].update();
        }
      });
    } //canvasobj - if defined then use this object name to get canvas object -  otherwise the one from template


    var ctx = this.canvasobj ? window[this.canvasobj] : this.chartcanvas.getContext('2d'); //ctx may be null if canvasobj is not yet initialized.

    if (ctx) this.initChart(ctx); //init chart only if ctx is ready
    else {
      //add myself to lazyinitchart array
      if (!window.lazyInitChart) window.lazyInitChart = [];
      window.lazyInitChart.push(this);
    }
    /*
        //do lazy init of charts after third party canvas initialization
        if (window.lazyInitChart) {
            for (let obj in window.lazyInitChart) obj.initChart().bind(obj);
        }
     */
  };

  _proto.initChart = function (_initChart) {
    function initChart() {
      return _initChart.apply(this, arguments);
    }

    initChart.toString = function () {
      return _initChart.toString();
    };

    return initChart;
  }(function () {
    var ctx = this.canvasobj ? window[this.canvasobj] : this.chartcanvas.getContext('2d');
    initChart(ctx);
  });

  _proto.initChart = function initChart(ctx) {
    /*let that = this;
    if (window.lazyInitChart) {let that = window.lazyInitChart;}*/
    this.chart = new _chart.default(ctx, {
      plugins: this.plugins,
      type: this.type,
      data: this.data,
      options: this.options,
      tooltipEvents: this.tooltips
    }); //register throttled update function

    if (typeof this.throttle === 'string') this.throttle = parseInt(this.throttle, 10);

    if (this.throttle > 0) {
      //throttle
      this.updatechart = _lodash.default.throttle(this.chart.update.bind(this.chart), this.throttle);
    } else {
      //directly call chart update
      this.updatechart = this.chart.update.bind(this.chart);
    } // console.log('chartjs data', this.data);

    /*    //now delay tooltip
        let originalShowTooltip = that.chart.showTooltip;
        //let that.timeout;
        that.timeout=0;
        that.chart.showTooltip = function (activeElements) {
          let delay = (activeElements.length === 0) ? 2000 : 0;
          clearTimeout(that.timeout);
          that.timeout = setTimeout(function () {
            originalShowTooltip.call(that.chart, activeElements);
          }, delay);
        }
    
     */

  }
  /**
   * called when component is detached from view - remove event listeners - no need to update chart
   */
  ;

  _proto.detached = function detached() {
    if (document.getElementById(this.fromid)) {
      document.getElementById(this.fromid).removeEventListener('fmidata', this.handleValueChange);
      document.getElementById(this.fromid).removeEventListener('fmireset', this.handleReset);
    } else {
      console.log('chartjs WARNING, null fromid element,removing from global');
      document.removeEventListener('fmidata', this.handleValueChange);
      document.removeEventListener('fmireset', this.handleReset);
    }

    if (this.sectionid) {
      document.getElementById(this.sectionid).removeEventListener('addsection', this.handleAddSection);
    }

    document.removeEventListener('fmiattached', this.handleFMIAttached);
  }
  /**
   * asks for filename and creates blob with CSV data from chart which initiates web browser download dialog.
   * CSV -  time point per row
   */
  ;

  _proto.download = function download() {
    //ask for filename
    var filename = prompt('File name (*.csv):', 'data.csv');

    if (filename) {
      //adds csv as extension
      if (!filename.endsWith('.csv')) filename = filename.concat('.csv'); //labels first row

      var content = 'Time,' + this.labels + '\n'; //transpose each row = variable in specific time

      for (var i = 0; i < this.chart.data.labels.length; i++) {
        var row = this.chart.data.labels[i];

        for (var j = 0; j < this.chart.data.datasets.length; j++) {
          row += ',' + this.chart.data.datasets[j].data[i];
        }

        content += row + '\n';
      }

      var blob = new Blob([content], {
        type: 'text/csv;charset=utf-8;'
      });
      saveAs(blob, filename);
    }
  }
  /**
   * asks for filename and creates blob with CSV data from chart which initiates web browser download dialog
   * CSV - variable values per row
   */
  ;

  _proto.downloadflat = function downloadflat() {
    //ask for filename
    var filename = prompt('File name (*.csv):', 'data.csv');

    if (filename) {
      //adds csv as extension
      if (!filename.endsWith('.csv')) filename = filename.concat('.csv'); //labels first row - each row is then all data per variable - transposition might be needed

      var content = 'variable name,values ...' + '\n';
      var labels = this.labels.split(','); // variable per row
      //chart labels - usually time

      content = content + 'Time,' + this.chart.data.labels.join(',') + '\n'; //dataset data on other rows

      for (var i = 0; i < this.chart.data.datasets.length; i++) {
        content = content + labels[i] + ',' + this.chart.data.datasets[i].data.join(',') + '\n';
      }

      var blob = new Blob([content], {
        type: 'text/csv;charset=utf-8;'
      });
      saveAs(blob, filename);
    }
  }
  /**
   * Adds new section in chartarea - current last data in dataset
   */
  ;

  _proto.addSection = function addSection(label) {
    if (label === void 0) {
      label = '';
    }

    this.indexsection++;
    if (!label) label = '';
    console.log('chartjs.addsection()', this.chart.data.labels.length - 1, label);
    var ind; //if (this.chart.data.labels.length>0) ind = 0
    //else

    ind = Math.max(0, this.chart.data.labels.length - 1);
    this.chart.config.options.section.push({
      index: ind,
      color: this.selectColor(this.indexsection + this.colorsegmentindex, 85, 93),
      label: label
    });
  };

  return Chartjs;
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
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "type", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 'doughnut';
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "maxdata", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 256;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "initialdata", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "width", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 300;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, "height", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 200;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, "animate", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, "id", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class.prototype, "ylabel", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class.prototype, "xlabel", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class.prototype, "convertors", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class.prototype, "verticalline", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor16 = _applyDecoratedDescriptor(_class.prototype, "generatelabels", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor17 = _applyDecoratedDescriptor(_class.prototype, "sectionid", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor18 = _applyDecoratedDescriptor(_class.prototype, "responsive", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor19 = _applyDecoratedDescriptor(_class.prototype, "throttle", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 200;
  }
}), _descriptor20 = _applyDecoratedDescriptor(_class.prototype, "precision", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 4;
  }
}), _descriptor21 = _applyDecoratedDescriptor(_class.prototype, "min", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor22 = _applyDecoratedDescriptor(_class.prototype, "max", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor23 = _applyDecoratedDescriptor(_class.prototype, "babylonjs", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor24 = _applyDecoratedDescriptor(_class.prototype, "canvasobj", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor25 = _applyDecoratedDescriptor(_class.prototype, "colorsegmentindex", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return -2;
  }
}), _descriptor26 = _applyDecoratedDescriptor(_class.prototype, "colorindex", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor27 = _applyDecoratedDescriptor(_class.prototype, "minichart", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class);
exports.Chartjs = Chartjs;
//# sourceMappingURL=chartjs.js.map
