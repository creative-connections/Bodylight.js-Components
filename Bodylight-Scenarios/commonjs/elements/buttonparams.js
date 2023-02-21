"use strict";

exports.__esModule = true;
exports.Buttonparams = void 0;

var _aureliaFramework = require("aurelia-framework");

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9;

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var Buttonparams = (_class = /*#__PURE__*/function () {
  //@bindable value;

  /*({
  name:'values',
  attribute:'values',
  changeHandler:'valuesChanged',
  defaultBindingMode: bindingMode.twoWay,
  defaultValue: undefined
  })*/
  //value from ind refindex should be equal and triggers the action of buttonparams - like it would be clicked manually
  //name of the event to be fired
  //@bindable findex; //optional index of variables which will be set to values array fmu-index
  //@bindable convertors; //optional convertor?? value-convertor
  //debug to show inputs true, otherwise false
  //previousvalue = null;
  function Buttonparams() {
    var _this = this;

    _initializerDefineProperty(this, "title", _descriptor, this);

    _initializerDefineProperty(this, "ids", _descriptor2, this);

    _initializerDefineProperty(this, "values", _descriptor3, this);

    _initializerDefineProperty(this, "resetvalues", _descriptor4, this);

    _initializerDefineProperty(this, "ticks2reset", _descriptor5, this);

    _initializerDefineProperty(this, "fromid", _descriptor6, this);

    _initializerDefineProperty(this, "refindex", _descriptor7, this);

    _initializerDefineProperty(this, "thresholdvalue", _descriptor8, this);

    _initializerDefineProperty(this, "fireevent", _descriptor9, this);

    this.showinputs = false;
    this.values2send = [];
    this.ids2send = [];
    this.resetvalues2send = [];
    this.currenttick = 0;
    this.triggered = false;

    this.handleTick = function (e) {
      _this.currenttick++;

      if (_this.currenttick >= _this.ticks2reset) {
        //do reset values
        if (_this.ids2send.length !== _this.resetvalues2send.length) {
          console.warn('warning ids and values contain different number of items.', _this.ids2send, _this.resetvalues2send);
          return;
        } //set reset values


        for (var i = 0; i < _this.ids2send.length; i++) {
          var inputel = document.getElementById(_this.ids2send[i]);
          inputel.value = _this.resetvalues2send[i];
          var event = new Event('change');
          inputel.dispatchEvent(event);
        } //remove event listener - do not need to listen the event anymore


        var fromel = document.getElementById(_this.fromid);

        if (fromel) {
          fromel.removeEventListener('fmidata', _this.handleTick);
        }
      }
    };

    this.handleValueChange = function (e) {
      //sets data to dataset
      //apply value convert among all data
      if (_this.fromid) {
        if (_this.refindex) {
          //let rawdata = e.detail.data[this.refindex];
          _this.value = e.detail.data[_this.refindex]; //  else this.value = rawdata;
          //console.log('Range received rawdata '+rawdata+' converted value '+this.value);
          //console.log('this operation',this.operation)

          _this.updatevalue(); //call function - it may be throttled 

        } else {
          if (_this.smooth) {//do smooth step 
          }
        }
      }
    };
  }

  var _proto = Buttonparams.prototype;

  _proto.bind = function bind() {
    //console.log('button.bind()');
    this.ids2send = this.ids.split(',');
    this.createids = []; //create those ids not yet in HTML DOM and put them to createids array

    for (var _iterator = _createForOfIteratorHelperLoose(this.ids2send), _step; !(_step = _iterator()).done;) {
      var myid = _step.value;
      if (!document.getElementById(myid)) this.createids.push(myid);
    }

    this.values2send = this.values.split(','); //reset value - after some time period or after some event

    if (this.resetvalues) {
      this.resetvalues2send = this.resetvalues.split(',');
    } //get ticks2reset value - parse into number (int),default 1


    if (typeof this.ticks2reset === 'string') {
      this.ticks2reset = parseInt(this.ticks2reset, 10);
      if (isNaN(this.ticks2reset)) this.ticks2reset = 1;
    }

    if (this.fromid) {}
  };

  _proto.attached = function attached() {
    //in this stage, view creates the virtual inputs as in createids array, the inputs are then consumed by fmu component
    //console.log('button.attached() ids2send, values2send', this.ids2send, this.values2send);
    if (this.fromid) {
      var fromel = document.getElementById(this.fromid);

      if (fromel) {
        fromel.addEventListener('fmidata', this.handleValueChange);
      }
    }
  };

  _proto.detached = function detached() {
    if (this.fromid) {
      if (document.getElementById(this.fromid)) {
        document.getElementById(this.fromid).removeEventListener('fmidata', this.handleValueChange);
      }
    }
  }
  /*
  this is fired when the button is pressed, it sets values to the defined state
  dispatch the event and if resetvalues is set - then listen fmidata event
   */
  ;

  _proto.switchvalues = function switchvalues() {
    if (this.ids2send.length !== this.values2send.length) {
      console.warn('warning ids and values contain different number of items.', this.ids2send, this.values2send);
      return;
    }

    for (var i = 0; i < this.ids2send.length; i++) {
      var inputel = document.getElementById(this.ids2send[i]);
      inputel.value = this.values2send[i];
      var event = new Event(this.fireevent);
      inputel.dispatchEvent(event);
    } //if resetvalues are set, listen to ticks - fmidata event and after defined ticks2reset the values are set to resetvalues


    if (this.resetvalues) {
      this.currenttick = 0;
      var fromel = document.getElementById(this.fromid);

      if (fromel) {
        fromel.addEventListener('fmidata', this.handleTick);
      }
    }
  };

  _proto.valuesChanged = function valuesChanged() {
    this.values2send = this.values.split(',');
  } //a value comes from external id - if change compare and trigger event if match
  ;

  _proto.updatevalue = function updatevalue() {
    if (this.value == this.thresholdvalue) {
      //convert and compare - string "2" == 2
      if (!this.triggered) {
        this.triggered = true;
        this.trigger();
      } else {
        this.normalAction();
      }
    } else {
      if (this.triggered) {
        this.triggered = false;
      }

      this.normalAction();
    }
  } //do action if not triggered
  ;

  _proto.normalAction = function normalAction() {};

  _proto.trigger = function trigger() {
    this.switchvalues();
  };

  return Buttonparams;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "title", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "ids", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "values", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "resetvalues", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "ticks2reset", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "fromid", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "refindex", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "thresholdvalue", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, "fireevent", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 'input';
  }
})), _class);
exports.Buttonparams = Buttonparams;
//# sourceMappingURL=buttonparams.js.map
