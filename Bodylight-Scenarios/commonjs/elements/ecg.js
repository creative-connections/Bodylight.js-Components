"use strict";

exports.__esModule = true;
exports.Ecg = void 0;

var _chartjsTime = require("./chartjs-time");

var _aureliaTemplating = require("aurelia-templating");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

//import {PLATFORM} from 'aurelia-pal';
//@useView(PLATFORM.moduleName('./bdl-chartjs.html'))
var Ecg = (_dec = (0, _aureliaTemplating.useView)('./chartjs.html'), _dec(_class = (_class2 = /*#__PURE__*/function (_ChartjsTime) {
  _inheritsLoose(Ecg, _ChartjsTime);

  //2 * 5*8 ecgvalues = 2 cardiac cycles
  //@bindable refindex;
  //  @bindable refvalues;
  //initiate
  // ]; //values in mV in segments
  //ecgvalueslbb=[]
  //labels related to values
  function Ecg() {
    var _this;

    _this = _ChartjsTime.call(this) || this;

    _initializerDefineProperty(_this, "fromid", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "labels", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "maxdata", _descriptor3, _assertThisInitialized(_this));

    _this.refindex = 0;
    _this.refvalues = 1;
    _this.previousreltime = 0;

    _initializerDefineProperty(_this, "type", _descriptor4, _assertThisInitialized(_this));

    _this.ecgvalues = [[0.2, 0.12, 0, 0, 0, 0, -0.1, 1.4], //4b
    [-0.5, 0, 0, 0, 0, 0, 0, 0], //1
    [0, 0, 0, 0, 0.15, 0.28, 0.35, 0.38], //2
    [0.38, 0.35, 0.28, 0.15, 0, 0, 0, 0], //3
    [0, 0, 0, 0, 0, 0, 0.12, 0.2] //4a
    ];
    _this.ecglabels = [['P', '', '', '', '', '', 'Q', 'R'], //4b
    ['S', '', '', '', '', '', '', ''], //1
    ['', '', '', '', '', '', '', 'T'], //2
    ['', '', '', '', '', '', '', ''], //3
    ['', '', '', '', '', '', '', 'P'] //4a
    ];
    _this.ecgindex = 0;
    _this.ecgsegment = 1;

    _initializerDefineProperty(_this, "width", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "height", _descriptor6, _assertThisInitialized(_this));

    console.log('BdlEcg()'); //this.type = 'line';
    //need to define method here in order to register it for eventlistener later

    _this.handleValueChange = function (e) {
      _this.handleValueChangeImpl(e);
    };

    return _this;
  }

  var _proto = Ecg.prototype;

  _proto.bind = function bind() {
    _ChartjsTime.prototype.bind.call(this);

    this.datalabels = true; //disable labels on xaxes

    this.options.scales.xAxes = [{
      ticks: {
        display: false
      }
    }];
  };

  _proto.attached = function attached() {
    _ChartjsTime.prototype.attached.call(this);

    var fromidel = document.getElementById(this.fromid);

    if (fromidel) {
      fromidel.addEventListener('animatedata', this.handleValueChange);
    } //instantiate datalabels


    if (!this.chart.data.datasets[0].datalabels) this.chart.data.datasets[0].datalabels = [];
  };

  _proto.detached = function detached() {
    _ChartjsTime.prototype.detached.call(this);

    if (document.getElementById(this.fromid)) {
      document.getElementById(this.fromid).removeEventListener('animatedata', this.handleValueChange);
    }
  };

  _proto.handleValueChangeImpl = function handleValueChangeImpl(e) {
    console.log('bdl-ecg handlevaluechange e.detail', e.detail);
    var mysegment = e.detail.segment;
    var myreltime = e.detail.relativetime; //reset index if new segment

    if (this.currentsegment !== mysegment) {
      //reset index
      this.previousindex = 0;
      this.index = 0;
      this.currentsegment = mysegment;
      this.previousreltime = 0; //TODO draw points from previous segments - if not already drawn
    } else {
      this.previousindex = this.index;
    } //count difference in this step


    var rd = myreltime - this.previousreltime; //e.g. 0.33 of segments
    //count how many points of ECG to draw - >1 -

    var npoints = Math.round(this.ecgvalues[mysegment].length * rd);
    this.index += npoints; //set previousreltime to current points of time used

    this.previousreltime = this.previousreltime + npoints / this.ecgvalues[mysegment].length; //TODO push multiple values - per percent in current segment - or do approximation
    //push multiple values - if in ecgvalues

    console.log('bdl-ecg handlevaluechange npoints,previndex,index:', npoints, this.previousindex, this.index);

    if (npoints > 0) {
      var _this$chart$data$data, _this$chart$data$data2, _this$chart$data$labe;

      (_this$chart$data$data = this.chart.data.datasets[0].data).push.apply(_this$chart$data$data, this.ecgvalues[mysegment].slice(this.previousindex, this.index));

      (_this$chart$data$data2 = this.chart.data.datasets[0].datalabels).push.apply(_this$chart$data$data2, this.ecglabels[mysegment].slice(this.previousindex, this.index)); //push npoints times the 'time' label


      (_this$chart$data$labe = this.chart.data.labels).push.apply(_this$chart$data$labe, Array(npoints).fill(e.detail.time)); //shift


      if (this.chart.data.datasets[0].data.length > this.maxdata) {
        //console.log('shifting dataset chartjs-time', this.chart.data.datasets[j].data);
        var pointstoremove = this.chart.data.datasets[0].data.length - this.maxdata;
        this.chart.data.datasets[0].data.splice(0, pointstoremove);
        this.chart.data.datasets[0].datalabels.splice(0, pointstoremove);
        this.chart.data.labels.splice(0, pointstoremove);
      }
    } //shift - remove first element if data is too big
    //console.log('chartjs handlevaluechange() chart.data.datasets[0].data', this.chart.data.datasets[0].data);


    this.chart.update(0);
  };

  return Ecg;
}(_chartjsTime.ChartjsTime), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "fromid", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "labels", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 'ECG I (mV)';
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "maxdata", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 80;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "type", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "width", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '300';
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "height", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '50';
  }
})), _class2)) || _class);
exports.Ecg = Ecg;
//# sourceMappingURL=ecg.js.map
