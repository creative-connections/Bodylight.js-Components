"use strict";

exports.__esModule = true;
exports.thirdpartytimeout = exports.Fmi = void 0;

var _aureliaFramework = require("aurelia-framework");

var _lodash = _interopRequireDefault(require("lodash"));

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var thirdpartytimeout = 5000;
exports.thirdpartytimeout = thirdpartytimeout;
var Fmi = (_class = /*#__PURE__*/function () {
  //0.000030517578
  //if >0 then fmi will stop at stoptime
  //input==continuous/change==when user drops the value
  //continuous or oneshot or onestep
  //0.0078125;
  function Fmi() {
    var _this = this;

    _initializerDefineProperty(this, "fminame", _descriptor, this);

    _initializerDefineProperty(this, "tolerance", _descriptor2, this);

    _initializerDefineProperty(this, "starttime", _descriptor3, this);

    _initializerDefineProperty(this, "stoptime", _descriptor4, this);

    _initializerDefineProperty(this, "guid", _descriptor5, this);

    _initializerDefineProperty(this, "id", _descriptor6, this);

    _initializerDefineProperty(this, "inputs", _descriptor7, this);

    _initializerDefineProperty(this, "otherinputs", _descriptor8, this);

    _initializerDefineProperty(this, "valuereferences", _descriptor9, this);

    _initializerDefineProperty(this, "ticksToUpdate", _descriptor10, this);

    _initializerDefineProperty(this, "src", _descriptor11, this);

    _initializerDefineProperty(this, "fstepsize", _descriptor12, this);

    _initializerDefineProperty(this, "controlid", _descriptor13, this);

    _initializerDefineProperty(this, "showcontrols", _descriptor14, this);

    _initializerDefineProperty(this, "fpslimit", _descriptor15, this);

    _initializerDefineProperty(this, "showtime", _descriptor16, this);

    _initializerDefineProperty(this, "showtimemultiply", _descriptor17, this);

    _initializerDefineProperty(this, "eventlisten", _descriptor18, this);

    _initializerDefineProperty(this, "mode", _descriptor19, this);

    _initializerDefineProperty(this, "stepsperframe", _descriptor20, this);

    _initializerDefineProperty(this, "startafter", _descriptor21, this);

    _initializerDefineProperty(this, "fmuspeed", _descriptor22, this);

    this.cosimulation = 1;
    this.stepSize = 0.01;
    this.doingstep = false;
    this.animationstarted = false;
    this.measurefps = false;
    this.d = void 0;
    this.fpstick = 0;
    this.stepi = 0;
    this.resetBeforeChange = false;
    this.simulationtime = 0;
    this.isOneshot = false;
    this.isOnestep = false;
    this.perfstartTime = void 0;
    this.perfendTime = void 0;
    //create lambda function which is added as listener later
    this.changeinputs = {}; //[]; change to associative array

    this.handleValueChange = function (e) {
      //e.target; //triggered the event
      var targetid;
      if (e.detail && e.detail.id) targetid = e.detail.id;else if (e.target.id.length > 0) targetid = e.target.id;else targetid = e.target.parentElement.parentElement.id;
      var targetvalue = e.detail && e.detail.value ? e.detail.value : e.target.value; //bug sometimes value change is double fired, check whether changeinputs already contains the same value

      if (_this.changeinputs[targetid] && _this.changeinputs[targetid].value === targetvalue) return;
      _this.changeinputs[targetid] = {
        id: targetid,
        value: targetvalue
      }; //detail will hold the value being changed
      //determine whether it is fixed parameter - further reset is needed?

      _this.resetBeforeChange = _this.resetBeforeChange || _this.inputreferences[targetid].fixed; //do step if mode is onestep
      //TODO may be do throttle here - if more events will come do step shot only once

      if (_this.isOnestep) setTimeout(_this.step.bind(_this), 200); //do simulation step after 200 ms

      if (_this.isOneshot) setTimeout(_this.shot.bind(_this), 200); //so shot after 200ms
    };

    this.handleDetailChange = function (e) {
      //this.changeinputs.push({valuereference: e.detail.valuereference, value: e.detail.value, fromid: e.detail.id}); //detail will hold the value being changed
      //bug sometimes value change is double fired, check whether changeinputs already contains the same value
      if (_this.changeinputs[e.detail.id] && _this.changeinputs[e.detail.id].value === e.detail.value) return;
      _this.changeinputs[e.detail.id] = {
        valuereference: e.detail.valuereference,
        value: e.detail.value,
        fromid: e.detail.id
      }; //this.changeinputs[targetid] = targetvalue; //detail will hold the value being changed TODO valuereference???

      console.log('fmi handle detail change', _this.changeinputs); //do step if mode is onestep

      if (_this.isOnestep) setTimeout(_this.stepHandler, 200); //do simulation step after 100 ms

      if (_this.isOneshot) {
        //TODO do start
        setTimeout(_this.shot.bind(_this), 200);
      } //do simulation step after 100 ms

    };

    this.handleStart = function (e) {
      _this.startevent(e);
    };

    this.handleStop = function (e) {
      _this.stopevent(e);
    };

    this.handleShot = this.shot.bind(this);
    this.handleStep = this.step.bind(this);
    this.debounceStep = _lodash.default.debounce(this.handleStep, 1000);
    this.debounceShot = _lodash.default.debounce(this.handleShot, 1000); //this handles event to register inputs - may be sent by subsequent component which change inputs/outputs communicating with fmi

    this.handleRegister = function () {
      _this.deregisterInputs();

      _this.registerInputs();

      if (_this.isOnestep) _this.debounceStep(); //do simulation step immediately;

      if (_this.isOneshot) _this.debounceShot(); //do simulation shot immediately;}
    };

    this.inst = false;
  }

  var _proto = Fmi.prototype;

  _proto.registerInputs = function registerInputs() {
    if (this.inputs) {
      //register DOM elements to listen to their 'change' event directly
      var inputparts = this.inputs.split(';'); //splits groups delimited by ;

      this.inputreferences = [];

      for (var _iterator = _createForOfIteratorHelperLoose(inputparts), _step; !(_step = _iterator()).done;) {
        var inputpart = _step.value;
        var myinputs = inputpart.split(','); //splits reference and id by ,

        var numerator = myinputs.length > 2 ? parseFloat(myinputs[2]) : 1;
        var denominator = myinputs.length > 3 ? parseFloat(myinputs[3]) : 1;
        var addconst = myinputs.length > 4 ? parseFloat(myinputs[4]) : 0;
        var fixedsignature = myinputs.length > 5 ? myinputs[5] === 'f' : false;

        if (isNaN(addconst)) {
          addconst = 0;
          fixedsignature = myinputs[4] === 'f';
        } //fixes bug, setting  instead of NaN, when 4th param is omited and instead 'f' or 't' is specified


        var inputref = {
          ref: myinputs[1],
          numerator: numerator,
          denominator: denominator,
          addconst: addconst,
          fixed: fixedsignature
        };

        if (this.inputreferences[myinputs[0]]) {
          this.inputreferences[myinputs[0]].fixed = this.inputreferences[myinputs[0]].fixed || fixedsignature;
          this.inputreferences[myinputs[0]].refs.push(inputref); //first is id second is reference
        } else this.inputreferences[myinputs[0]] = {
          fixed: fixedsignature,
          refs: [inputref]
        }; //first is id second is reference
        //register change event - the alteration is commited


        var dependentEl = document.getElementById(myinputs[0]); //now register 'change' event or eventlisten

        if (dependentEl) {
          dependentEl.addEventListener(this.eventlisten, this.handleValueChange);
          console.log('registering input, ref, num,den,add,fixed', myinputs[0], myinputs[1], numerator, denominator, addconst, fixedsignature);
        } else {
          //const dependentAnimEl = window.ani.getAnimateObj(myinputs[0]);
          //will push unregistered inputs into possible animation inputs handled during start/stop  
          if (!window.animateranges) window.animateranges = [];
          window.animateranges.push({
            name: myinputs[0],
            handleValueChange: this.handleValueChange
          });
          console.log('non-existing element id, will try to register to animation:', myinputs[0]);
        }
      }
    }

    if (this.otherinputs) {
      var otherinputtargets = this.otherinputs.split(';');

      for (var _iterator2 = _createForOfIteratorHelperLoose(otherinputtargets), _step2; !(_step2 = _iterator2()).done;) {
        var target = _step2.value;
        document.getElementById(target).addEventListener('fmiinput', this.handleDetailChange);
      }
    } //TODO check if onestep - do step after

    /*if (this.isOnestep) {
      //console.log('onestep scheduling startevent in promise() to do step()')
      setTimeout(this.sendStartEvent.bind(this),1000);
      console.log('onestep scheduling promise() to do step()')
      setTimeout(this.step.bind(this),1500);
    } */
    //do simulation step after 100 ms

  };

  _proto.deregisterInputs = function deregisterInputs() {
    //do removeListeners()
    if (this.inputs) {
      var inputparts = this.inputs.split(';');

      for (var _iterator3 = _createForOfIteratorHelperLoose(inputparts), _step3; !(_step3 = _iterator3()).done;) {
        var inputpart = _step3.value;
        var myinputs = inputpart.split(',');

        try {
          document.getElementById(myinputs[0]).removeEventListener(this.eventlisten, this.handleValueChange);
        } catch (e) {}
      }
    }

    if (this.otherinputs) {
      var otherinputtargets = this.otherinputs.split(';');

      for (var _iterator4 = _createForOfIteratorHelperLoose(otherinputtargets), _step4; !(_step4 = _iterator4()).done;) {
        var target = _step4.value;

        try {
          document.getElementById(target).removeEventListener('fmiinput', this.handleDetailChange);
        } catch (e) {}
      }
    }
  };

  _proto.attached = function attached() {
    console.log('fmi attached');
    this.mydata = [0, 0]; //split references by ,

    this.references = this.valuereferences.split(',');
    this.registerInputs(); //if src is not specified - then expects that fmi scripts is loaded in HTML page prior thus should be available

    if (this.src && this.src.length > 0) {
      console.log('loading script first, then init fmi'); //keep 'this' reference in global for callback

      window.thisfmi = this;
      this.getScript(this.src, this.initfmi);
    } else {
      //src is specified, thus load it - browser loads it at the end, thus adding the rest as callback after loaded
      console.log('init fmi without loading script: fminame, this:', this.fminame, this);
      this.initfmi();
    }

    if (this.controlid) {
      document.getElementById(this.controlid).addEventListener('fmistart', this.handleStart);
      document.getElementById(this.controlid).addEventListener('fmistop', this.handleStop);
    }

    if (typeof this.showcontrols === 'string') {
      this.showcontrols = this.showcontrols === 'true';
    }

    document.addEventListener('fmiregister', this.handleRegister);
    document.addEventListener('dostep', this.handleStep); //sending attached event - some may detect it to register it's outpu listener if attached before

    var event = new CustomEvent('fmiattached');
    document.dispatchEvent(event);
  } //detects whether script with FMU is already loaded, if not it adds it to DOM and loads
  //get script element and registers 'onload' callback to be called when the script is loaded
  ;

  _proto.getScript = function getScript(source, callback) {
    //check whether the script is not already there
    if (Array.from(document.getElementsByTagName('script')).filter(function (x) {
      return x.getAttribute('src') === source;
    }).length > 0) {
      console.log('fmi.getScript() WARNING, script is already added into DOM:', source); //do callback?

      if (callback) setTimeout(callback, 0);
      return;
    } //console.log('fmi getscript()');


    var script = document.createElement('script');
    var prior = document.getElementsByTagName('script')[0];
    script.async = 1;

    script.onerror = function () {
      if (!script.readyState || /loaded|complete/.test(script.readyState)) {
        script.onerror = script.onload = null;
        script = undefined; // try to insert script by other app for previewing - scripts might be inserted into DOM

        if (window.editorapi && typeof window.editorapi.insertScriptById === 'function') {
          console.log('inserting script by thirdparty api');
          window.editorapi.insertScriptById(source, 'fmiobj');
        } //do callback even if isAbort - scripts might be inserted into DOM by another app


        if (callback) setTimeout(callback, 1200);
      }
    }; //remove onreadystatechange - only reliable in IE https://stackoverflow.com/questions/1929742/can-script-readystate-be-trusted-to-detect-the-end-of-dynamic-script-loading


    script.onload = function (_, isAbort) {
      if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
        script.onerror = script.onload = null;
        script = undefined; //do callback - scripts might be inserted into DOM by another app

        if (!isAbort && callback) setTimeout(callback, 0);
      }
    };

    script.src = window.bdlBaseHref ? window.bdlBaseHref + source : source;
    prior.parentNode.insertBefore(script, prior);
  } //make inst object globally - in case of globals (non-src) declaration
  ;

  _proto.initfmi = function initfmi() {
    var _this2 = this;

    console.log('fmi initfmi()');
    var that = {};

    if (window.thisfmi) {
      that.fminame = window.thisfmi.fminame;
      console.log('using global fmi initfmi() fminame', that.fminame);
    } else {
      that.fminame = this.fminame;
      console.log('using local fmi initfmi() fminame', that.fminame);
    } //create instance


    var myinst = window[that.fminame](); //EMSDK v 3.x compiles fmu to Promise based api

    if (myinst instanceof Promise) {
      myinst.then(function (inst) {
        that.inst = inst;

        if (!window.fmiinst) {
          window.fmiinst = [];
        }

        window.fmiinst[that.fminame] = that; //console.log('fmi callback from Promise that', that, that.inst);
        //do one step if mode is onestep
        //https://newbedev.com/pass-correct-this-context-to-settimeout-callback
        //TODO check if this step/shot is needed

        if (window.thisfmi.isOnestep) {
          //console.log('onestep scheduling startevent in promise() to do step()')
          setTimeout(window.thisfmi.sendStartEvent.bind(window.thisfmi), 1000);
          console.log('onestep scheduling promise() to do step()'); //setTimeout(window.thisfmi.step.bind(window.thisfmi),1500);

          window.thisfmi.debounceStep();
        } else //do simulation step after 100 ms
          if (window.thisfmi.isOneshot) {
            //console.log('oneshot scheduling startevent in promise() to do step()')
            setTimeout(window.thisfmi.sendStartEvent.bind(window.thisfmi), 1000);
            console.log('oneshot scheduling promise() to do shot()'); //setTimeout(window.thisfmi.shot.bind(window.thisfmi),1500);

            window.thisfmi.debounceShot();
          } else //do simulation step after 100 ms
            if (_this2.startafter > 0) {
              setTimeout(window.thisfmi.sendStartEvent.bind(window.thisfmi), 1000 * _this2.startafter);
            }
      });
    } else {
      //older EMSDK prior 3.x compiles directly to api, keep compatibility
      that.inst = myinst;

      if (!window.fmiinst) {
        window.fmiinst = [];
      }

      window.fmiinst[that.fminame] = that; //console.log('fmi callback that, that.inst', that, that.inst);
      //do one step if mode is onestep
      //https://newbedev.com/pass-correct-this-context-to-settimeout-callback

      if (window.thisfmi.isOnestep) {
        console.log('onestep scheduling direct(nopromise) to do step()');
        setTimeout(window.thisfmi.sendStartEvent.bind(window.thisfmi), 1000); //setTimeout(window.thisfmi.step.bind(window.thisfmi),1500);

        _lodash.default.throttle(window.thisfmi.step.bind(window.thisfmi), 1500);
      } else //do simulation step after 100 ms
        if (window.thisfmi.isOneshot) {
          console.log('oneshot scheduling direct(nopromise) to do step()');
          setTimeout(window.thisfmi.sendStartEvent.bind(window.thisfmi), 1000); //setTimeout(window.thisfmi.shot.bind(window.thisfmi),1500);

          _lodash.default.throttle(window.thisfmi.shot.bind(window.thisfmi), 1500);
        } else if (this.startafter > 0) {
          setTimeout(window.thisfmi.sendStartEvent.bind(window.thisfmi), 1000 * this.startafter);
        }
    }
  };

  _proto.bind = function bind() {
    this.isOneshot = this.mode === 'oneshot';
    this.isOnestep = this.mode === 'onestep';

    if (this.isOnestep) {
      this.showcontrols = false;
    }

    if (this.isOneshot) {
      this.showcontrols = false;
    }

    if (typeof this.stoptime === 'string') {
      this.stoptime = parseFloat(this.stoptime);
    }

    if (typeof this.starttime === 'string') {
      this.starttime = parseFloat(this.starttime);
    }

    if (typeof this.stepsperframee === 'string') {
      this.stepsperframe = parseInt(this.stepsperframe);
    }

    if (typeof this.startafter === 'string') {
      this.starttime = parseFloat(this.startafter);
    }

    if (typeof this.fpslimit === 'string') {
      this.fpslimit = parseFloat(this.fpslimit);
    }

    if (typeof this.fmuspeed === 'string') {
      this.fmuspeed = parseInt(this.fmuspeed);
      this.stepSize = this.fmuspeed * (typeof this.fstepsize === 'string' ? parseFloat(this.fstepsize) : this.fstepsize);
    }
  };

  _proto.detached = function detached() {
    document.removeEventListener('fmiregister', this.handleRegister);

    if (this.animationstarted) {
      this.startstop();
    }

    this.deregisterInputs();

    if (this.controlid) {
      document.getElementById(this.controlid).removeEventListener('fmistart', this.handleStart);
      document.getElementById(this.controlid).removeEventListener('fmistop', this.handleStop);
    }
  }
  /**
   * Implements a rudimentary browser console logger for the FMU.
   */
  ;

  _proto.consoleLogger = function consoleLogger(componentEnvironment, instanceName, status, category, message, other) {
    var _this3 = this;

    /* Fills variables into message returned by the FMU, the C way */
    var formatMessage = function formatMessage(message1, other1) {
      // get a new pointer
      var ptr = _this3.inst._malloc(1); // get the size of the resulting formated message


      var num = _this3.inst._snprintf(ptr, 0, message1, other1);

      _this3.inst._free(ptr);

      num++; // TODO: Error handling num < 0

      ptr = _this3.inst._malloc(num);

      _this3.inst._snprintf(ptr, num, message1, other1); // return pointer to the resulting message string


      return ptr;
    }; // eslint-disable-next-line new-cap


    console.log('FMU(' + this.inst.UTF8ToString(instanceName) + ':' + status + ':' + this.inst.UTF8ToString(category) + ') msg: ' + this.inst.UTF8ToString(formatMessage(message, other)));

    this.inst._free(formatMessage);
  };

  _proto.initialize = function initialize() {
    console.log('fmi initialize()');
    this.fmiEnterInit(this.fmiinst);
    this.fmiExitInit(this.fmiinst);
  };

  _proto.instantiate = function instantiate() {
    console.log('fmi instantiate()'); //first define FMI API function names;

    var sReset = 'fmi2Reset';
    var sInstantiate = 'fmi2Instantiate';
    var sSetup = 'fmi2SetupExperiment';
    var sEnterinit = 'fmi2EnterInitializationMode';
    var sExitinit = 'fmi2ExitInitializationMode';
    var sSetreal = 'fmi2SetReal';
    var sSetboolean = 'fmi2SetBoolean';
    var sGetreal = 'fmi2GetReal';
    var sGetboolean = 'fmi2GetBoolean';
    var sDostep = 'fmi2DoStep';
    var sCreateCallback = 'createFmi2CallbackFunctions'; //add fmustate support

    var sGetFMUState = 'fmi2GetFMUState';
    var sSetFMUState = 'fmi2SetFMUState';
    var sFreeFMUState = 'fmi2FreeFMUState';
    var sSerializedFMUStateSize = 'fmi2SerializedFMUStateSize';
    var sSerializeFMUState = 'fmi2SerializeFMUState';
    var sDeSerializeFMUStateSize = 'fmi2DeSerializeFMUState';
    this.stepTime = 0;
    this.stepSize = this.fmuspeed * (typeof this.fstepsize === 'string' ? parseFloat(this.fstepsize) : this.fstepsize);
    this.mystep = this.stepSize; //console callback ptr, per emsripten create int ptr with signature viiiiii

    if (window.fmiinst && window.fmiinst[this.fminame]) this.inst = window.fmiinst[this.fminame].inst;else {
      console.warn('fmi instantiate() error initfmi() probably not called');
    } //else this.inst = null;//if (window.thisfmi) {this.inst = window.thisfmi.inst;}

    console.log('instantiate() this.inst', this.inst); //set the fminame and JS WASM function references

    var separator = '_';
    var prefix = this.fminame; //console.log('attached fminame:', that.fminame);
    // OpenModelica exports function names without prefix

    if (typeof this.inst._fmi2GetVersion === 'function') {
      prefix = '';
      separator = '';
    } //now use a 'cwrap' delivered by emscripten to facilitate calling C functions with C primitives (string,number) from Javascript


    this.fmiCreateCallback = this.inst.cwrap(sCreateCallback, 'number', ['number']);
    this.fmiReset = this.inst.cwrap(prefix + separator + sReset, 'number', ['number']);
    this.fmiInstantiate = this.inst.cwrap(prefix + separator + sInstantiate, 'number', ['string', 'number', 'string', 'string', 'number', 'number', 'number']);
    this.fmiSetup = this.inst.cwrap(prefix + separator + sSetup, 'number', ['number', 'number', 'number', 'number', 'number', 'number']);
    this.fmiEnterInit = this.inst.cwrap(prefix + separator + sEnterinit, 'number', ['number']);
    this.fmiExitInit = this.inst.cwrap(prefix + separator + sExitinit, 'number', ['number']);
    this.fmiSetReal = this.inst.cwrap(prefix + separator + sSetreal, 'number', ['number', 'number', 'number', 'number']);
    this.fmiGetReal = this.inst.cwrap(prefix + separator + sGetreal, 'number', ['number', 'number', 'number', 'number']);
    this.fmiSetBoolean = this.inst.cwrap(prefix + separator + sSetboolean, 'number', ['number', 'number', 'number', 'number']);
    this.fmiGetBoolean = this.inst.cwrap(prefix + separator + sGetboolean, 'number', ['number', 'number', 'number', 'number']);
    this.fmiDoStep = this.inst.cwrap(prefix + separator + sDostep, 'number', ['number', 'number', 'number', 'number']);
    this.fmiGetVersion = this.inst.cwrap(prefix + separator + 'fmi2GetVersion', 'string');
    this.fmiGetTypesPlatform = this.inst.cwrap(prefix + separator + 'fmi2GetTypesPlatform', 'string');
    this.fmi2FreeInstance = this.inst.cwrap(prefix + separator + 'fmi2FreeInstance', 'number', ['number']); //add fmustate

    this.fmiGetFMUState = this.inst.cwrap(prefix + separator + sGetFMUState, 'number', ['number']);
    this.fmiSetFMUState = this.inst.cwrap(prefix + separator + sSetFMUState, 'number', ['number']);
    this.fmiFreeFMUState = this.inst.cwrap(prefix + separator + sFreeFMUState, 'number', ['number']);
    this.fmiSerializedFMUStateSize = this.inst.cwrap(prefix + separator + sSerializedFMUStateSize, 'number', ['number']);
    this.fmiSerializeFMUState = this.inst.cwrap(prefix + separator + sSerializeFMUState, 'number', ['number']);
    this.fmiDeSerializeFMUStateSize = this.inst.cwrap(prefix + separator + sDeSerializeFMUStateSize, 'number', ['number']);
    this.instantiated = false; //calculate pow, power of stepsize

    this.pow = this.stepSize < 1 ? -Math.ceil(-Math.log10(this.stepSize)) : Math.ceil(Math.log10(this.stepSize)); //use Math.trunc ??
    //console.log('instantiate() this', this);

    this.consoleLoggerPtr = this.inst.addFunction(this.consoleLogger.bind(this), 'viiiiii');
    this.callbackptr = this.fmiCreateCallback(this.consoleLoggerPtr); //console.log('fminame',this.fminame);
    //console.log('guid',this.guid);
    //console.log('callbackptr',this.callbackptr);
    //console.log('fmiinstantiate fnc:',this.fmiInstantiate);
    //create instance of model simulation

    this.fmiinst = this.fmiInstantiate(this.fminame, this.cosimulation, this.guid, '', this.callbackptr, 0, 0); //last 1 debug, 0 nodebug

    this.setupExperiment();
  };

  _proto.setupExperiment = function setupExperiment() {
    //setup experiment
    this.fmiSetup(this.fmiinst, 1, this.tolerance, this.starttime, 0);
    console.log('setupExperiment() fmiinst', this.fmiinst);
    this.instantiated = true;
  };

  _proto.simulate = function simulate() {};

  _proto.setReal = function setReal(query, value, count) {
    console.log('setreal query,value,count', query, value, count);
    return this.fmiSetReal(this.fmiinst, query.byteOffset, count, value.byteOffset);
  };

  _proto.setBoolean = function setBoolean(query, value, count) {
    return this.fmiSetBoolean(this.fmiinst, query.byteOffset, count, value.byteOffset);
  }
  /**
   * Loads Reals from FMU
   */
  ;

  _proto.getReal = function getReal(query, output, count) {
    return this.fmiGetReal(this.fmiinst, query.byteOffset, count, output.byteOffset);
  }
  /**
   * Loads Booleans from FMU
   */
  ;

  _proto.getBoolean = function getBoolean(query, output, count) {
    return this.fmiGetBoolean(this.fmiinst, query.byteOffset, count, output.byteOffset);
  };

  _proto.startevent = function startevent(e) {
    console.log('fmi startevent recieved', e);
    if (!this.animationstarted) this.startSimulation();
  };

  _proto.stopevent = function stopevent(e) {
    console.log('fmi stopevent recieved', e);
    if (this.animationstarted) this.stopSimulation();
  } //action to be performed when clicking the play/pause button
  //sends fmistart/fmistop event and starts/stops simulation
  ;

  _proto.startstop = function startstop() {
    if (this.animationstarted) {
      this.stopSimulation();
      this.sendStopEvent();
      this.perfend();
    } else {
      this.perfstart();
      this.sendStartEvent();
      this.startSimulation();
    }
  } //defines action to be done during browser animationframe and starts
  ;

  _proto.startSimulation = function startSimulation() {
    var _this4 = this;

    this.animationstarted = true;
    this.fpsInterval = 1000 / (isNaN(this.fpslimit) ? parseInt(this.fpslimit, 10) : this.fpslimit);
    this.then = window.performance.now();

    var performAnimation = function performAnimation(newtime) {
      if (!_this4.animationstarted) return;
      _this4.request = requestAnimationFrame(performAnimation);

      if (_this4.fpslimit && _this4.fpslimit < 60) {
        if (isNaN(_this4.fpslimit)) _this4.fpslimit = parseInt(_this4.fpslimit, 10);
        _this4.now = newtime; //console.log('limiting fps to fpslimit, newtime, now, then, fpsinterval', this.fpslimit, newtime, this.now, this.then, this.fpsInterval);

        _this4.elapsed = _this4.now - _this4.then; //console.log('elapsed,fpsinterval', this.elapsed, this.fpsInterval);

        if (_this4.elapsed > _this4.fpsInterval) {
          _this4.then = _this4.now - _this4.elapsed % _this4.fpsInterval;

          _this4.step();
        }
      } else {
        for (var i = 0; i < _this4.stepsperframe; i++) {
          _this4.step();
        }
      }
    };

    performAnimation();
  } //cancels all action to be done during browser animationframe and starts
  ;

  _proto.stopSimulation = function stopSimulation() {
    //stop animation
    this.animationstarted = false;
    cancelAnimationFrame(this.request);
  } //sends fmistop event
  ;

  _proto.sendStopEvent = function sendStopEvent() {
    //create custom event
    var event = new CustomEvent('fmistop', {
      detail: {
        time: this.round(this.stepTime, this.pow)
      }
    }); //dispatch event - it should be listened by some other component

    document.getElementById(this.id).dispatchEvent(event);
  };

  _proto.sendStartEvent = function sendStartEvent() {
    //create custom event
    console.log('fmi.sendStartEvent(). Sending start event for adobeobj');
    var event = new CustomEvent('fmistart', {
      detail: {
        time: this.round(this.stepTime, this.pow)
      }
    }); //dispatch event - it should be listened by some other component

    document.getElementById(this.id).dispatchEvent(event); //animate using requestAnimationFrame
  };

  _proto.round = function round(value, decimals) {
    if (decimals < 0) {
      var posdecimals = -decimals;
      return Number(Math.round(value + 'e' + posdecimals) + 'e-' + posdecimals);
    }

    return Number(Math.round(value + 'e-' + decimals) + 'e+' + decimals);
  };

  _proto.step = function step(e) {
    //this = window.thisfmi;
    //primitive semaphore, only one instance can perform this call
    if (!this.doingstep) {
      //console.log('fmu step()');
      this.doingstep = true;

      try {
        if (!this.instantiated) {
          this.instantiate();
          this.initialize();
        }

        this.stepi++; //changeinputs

        if (this.resetBeforeChange) {
          //fmi call
          this.setupExperiment(); //do reset

          this.fmiReset(this.fmiinst); //setting fixed parameters are now allowed

          this.setInputVariables(); //initialize

          this.initialize(); //make big step from 0 to current stepTime ???
          //const res =
          //make big step only if it is not onestep

          if (!this.isOnestep) this.fmiDoStep(this.fmiinst, this.starttime, this.stepTime, 1);else this.stepTime = this.starttime; //reset the signature

          this.resetBeforeChange = false;
        } else {
          //do only change of variables
          this.setInputVariables();
        } //dostep
        //compute step to round the desired time


        var res = this.fmiDoStep(this.fmiinst, this.stepTime, this.mystep, 1);
        this.stepTime = this.stepTime + this.mystep;
        this.mystep = this.stepSize; //update correction step to current step

        if (res === 1 || res === 2) {
          console.warn('step() returned state<>0, doing reset()', res);
          this.fmiReset(this.fmiinst);
          this.initialize();
        } //distribute simulation data to listeners


        this.mydata = this.getReals(this.references); //create custom event

        var event = new CustomEvent('fmidata', {
          detail: {
            time: this.round(this.stepTime, this.pow),
            data: this.mydata
          }
        }); //dispatch event - it should be listened by some other component

        document.getElementById(this.id).dispatchEvent(event); //compute showtime

        if (this.showtime) this.simulationtime = this.secondsToTime(this.stepTime, this.showtimemultiply); //do computation only every tickstoupdate tick

        if (this.measurefps) {
          if (this.fpstick === 0) {
            this.startfpstime = window.performance.now();
          }

          this.fpstick++;

          if (this.fpstick >= this.ticksToUpdate) {
            this.fpsInterval = 1000 / (isNaN(this.fpslimit) ? parseInt(this.fpslimit, 10) : this.fpslimit); //update ticks - so it will be every 3 seconds

            this.ticksToUpdate = Math.round(3000 / this.fpsInterval); //do correction step calculation

            if (this.stepSize < 1) {
              this.pow = -Math.ceil(-Math.log10(this.stepSize));
            } else {
              this.pow = Math.ceil(Math.log10(this.stepSize));
            }

            this.mystep = this.round(this.stepTime + this.stepSize, this.pow) - this.stepTime; //do fps calculation

            this.fps = (1000 * this.ticksToUpdate / (window.performance.now() - this.startfpstime)).toPrecision(4);
            this.fpstick = 0;
          }
        } //stop simulation when stoptime is defined and reached


        if (this.stoptime > 0 && this.animationstarted && this.stoptime < this.stepTime) {
          this.startstop();
        }
      } catch (err) {
        console.error('error catched during fmu step', err);
      } finally {
        this.doingstep = false;
      }
    }
  };

  _proto.shot = function shot(e) {
    //check whether initialized and instantiated
    if (!this.inst) {
      //not instantiated
      if (window.fmiinst && window.fmiinst[this.fminame]) {
        this.instantiate();
      } else {
        //no initfmi() called = wait for script to be loaded, do nothing
        return;
      }
    } else {
      this.reset(); //this.setInputVariables();
    } // do steps from starttime to stoptime


    do {
      this.step();
    } while (this.stoptime > this.stepTime);
  };

  _proto.setInputVariables = function setInputVariables() {
    for (var key in this.changeinputs) {
      var myinputs = this.changeinputs[key]; //console.log('changing inputs', myinputs);
      //set real - reference is in - one input one reference
      //sets individual values - if id is in input, then reference is taken from inputs definition

      console.log('changing inputs,id,value', this.inputreferences, myinputs.id, myinputs.value);

      for (var _iterator5 = _createForOfIteratorHelperLoose(this.inputreferences[myinputs.id].refs), _step5; !(_step5 = _iterator5()).done;) {
        var iref = _step5.value;
        var normalizedvalue = myinputs.value * iref.numerator / iref.denominator + iref.addconst;
        if (myinputs.id) this.setSingleReal(iref.ref, normalizedvalue); // if reference is in input, then it is set directly
        else if (myinputs.valuereference) this.setSingleReal(myinputs.valuereference, normalizedvalue);
      }
    }

    this.flushRealQueue();

    if (!this.isOneshot && !this.isOnestep) {
      //forget inputs in continuous mode
      this.changeinputs = {};
    }
    /*if (this.changeinputs.length > 0) {
      while (this.changeinputs.length > 0) {
        let myinputs = this.changeinputs.shift(); //remove first item
        //console.log('changing inputs', myinputs);
        //set real - reference is in - one input one reference
        //sets individual values - if id is in input, then reference is taken from inputs definition
        console.log('changing inputs,id,value', this.inputreferences, myinputs.id, myinputs.value);
        for (let iref of this.inputreferences[myinputs.id].refs) {
          let normalizedvalue = myinputs.value * iref.numerator / iref.denominator + iref.addconst;
          if (myinputs.id) this.setSingleReal(iref.ref, normalizedvalue);
          // if reference is in input, then it is set directly
          else if (myinputs.valuereference) this.setSingleReal(myinputs.valuereference, normalizedvalue);
        }
      }
      //flush all in one call to fmi
      this.flushRealQueue();
    }*/

  };

  _proto.reset = function reset() {
    console.log('doing reset()');
    this.stepTime = this.starttime;
    this.stepSize = this.fmuspeed * (typeof this.fstepsize === 'string' ? parseFloat(this.fstepsize) : this.fstepsize);
    this.mystep = this.stepSize;
    this.setupExperiment();
    this.fmiReset(this.fmiinst); //set input variables for possible change of non-tunable - fixed parameter values

    this.setInputVariables();
    this.initialize(); //create custom event

    var event = new CustomEvent('fmireset'); //dispatch event - it should be listened by some other component

    document.getElementById(this.id).dispatchEvent(event);
  };

  _proto.softreset = function softreset() {
    this.stepTime = this.starttime;
    this.stepSize = this.fmuspeed * (typeof this.fstepsize === 'string' ? parseFloat(this.fstepsize) : this.fstepsize);
    this.mystep = this.stepSize; //this.setupExperiment();
    //this.fmiReset(this.fmiinst);
    //set input variables for possible change of non-tunable - fixed parameter values

    this.setInputVariables(); //this.initialize();
    //create custom event

    var event = new CustomEvent('fmireset'); //dispatch event - it should be listened by some other component

    document.getElementById(this.id).dispatchEvent(event);
  }
  /* routines to alloc buffer for getting/setting from fmi*/
  ;

  _proto.createBuffer = function createBuffer(arr) {
    var size = arr.length * arr.BYTES_PER_ELEMENT;

    var ptr = this.inst._malloc(size);

    return {
      ptr: ptr,
      size: size
    };
  };

  _proto.createAndFillBuffer = function createAndFillBuffer(arr) {
    var buffer = this.createBuffer(arr);
    this.fillBuffer(buffer, arr);
    return buffer;
  };

  _proto.freeBuffer = function freeBuffer(buffer) {
    if (buffer.ptr !== null) {
      this.inst._free(buffer.ptr);
    }

    buffer.ptr = null;
    buffer.size = null;
  };

  _proto.viewBuffer = function viewBuffer(buffer) {
    return new Uint8Array(this.inst.HEAPU8.buffer, buffer.ptr, buffer.size);
  };

  _proto.fillBuffer = function fillBuffer(buffer, arr) {
    var view = this.viewBuffer(buffer);
    view.set(new Uint8Array(arr.buffer));
    return buffer;
  };

  _proto.getReals = function getReals(references) {
    var queryBuffer = this.createAndFillBuffer(new Int32Array(references));
    var query = this.viewBuffer(queryBuffer);
    var outputBuffer = this.createBuffer(new Float64Array(references.length));
    var output = this.viewBuffer(outputBuffer);
    this.getReal(query, output, references.length);
    var real = new Float64Array(output.buffer, output.byteOffset, references.length);
    this.freeBuffer(queryBuffer);
    this.freeBuffer(outputBuffer);
    return real;
  };

  _proto.getSingleReal = function getSingleReal(reference) {
    var queryBuffer = this.createAndFillBuffer(new Int32Array([reference]));
    var query = this.viewBuffer(queryBuffer);
    var outputBuffer = this.createBuffer(new Float64Array(1));
    var output = this.viewBuffer(outputBuffer);
    this.getReal(query, output, 1);
    var real = new Float64Array(output.buffer, output.byteOffset, 1);
    this.freeBuffer(queryBuffer);
    this.freeBuffer(outputBuffer);
    return real[0];
  }
  /**
     * Adds a real value to setRealQueue
     */
  ;

  _proto.setSingleReal = function setSingleReal(reference, value) {
    console.log('setSingleReal reference,value', reference, value);

    if (!this.setRealQueue) {
      this.setRealQueue = {
        references: [],
        values: []
      };
    }

    this.setRealQueue.references.push(reference);
    this.setRealQueue.values.push(value);
  };

  _proto.flushRealQueue = function flushRealQueue() {
    if (this.setRealQueue) {
      var referenceBuffer = this.createAndFillBuffer(new Int32Array(this.setRealQueue.references));
      var references = this.viewBuffer(referenceBuffer);
      var valueBuffer = this.createAndFillBuffer(new Float64Array(this.setRealQueue.values));
      var values = this.viewBuffer(valueBuffer);
      this.setReal(references, values, this.setRealQueue.references.length);
      this.freeBuffer(referenceBuffer);
      this.freeBuffer(valueBuffer);
      this.setRealQueue = false;
    }
  };

  _proto.flushBooleanQueue = function flushBooleanQueue() {
    if (this.setBooleanQueue) {
      var referenceBuffer = this.createAndFillBuffer(new Int32Array(this.setBooleanQueue.references));
      var references = this.viewBuffer(referenceBuffer);
      var valueBuffer = this.createAndFillBuffer(new Int32Array(this.setBooleanQueue.values));
      var values = this.viewBuffer(valueBuffer);
      this.setBoolean(references, values, this.setBooleanQueue.references.length);
      this.freeBuffer(referenceBuffer);
      this.freeBuffer(valueBuffer);
      this.setBooleanQueue = false;
    }
  }
  /**
     */
  ;

  _proto.setSingleBoolean = function setSingleBoolean(reference, value) {
    if (!this.setBooleanQueue) {
      this.setBooleanQueue = {
        references: [],
        values: []
      };
    }

    this.setBooleanQueue.references.push(reference);
    this.setBooleanQueue.values.push(value);
  }
  /**
     * Loads a single boolean value based on reference, this is a shorthand function.
     * It is recommended to use Module.getBoolean with reusable mallocs.
     */
  ;

  _proto.getSingleBoolean = function getSingleBoolean(reference) {
    var queryBuffer = this.createAndFillBuffer(new Int32Array([reference]));
    var query = this.viewBuffer(queryBuffer);
    var outputBuffer = this.createBuffer(new Int32Array(1));
    var output = this.viewBuffer(outputBuffer);
    this.getBoolean(query, output, 1);
    var bool = new Int32Array(output.buffer, output.byteOffset, 1);
    this.freeBuffer(queryBuffer);
    this.freeBuffer(outputBuffer);
    return bool[0];
  };

  _proto.getBooleans = function getBooleans(references) {
    var queryBuffer = this.createAndFillBuffer(new Int32Array(references));
    var query = this.viewBuffer(queryBuffer);
    var outputBuffer = this.createBuffer(new Int32Array(references.length));
    var output = this.viewBuffer(outputBuffer);
    this.getBoolean(query, output, references.length);
    var bool = new Int32Array(output.buffer, output.byteOffset, references.length);
    this.freeBuffer(queryBuffer);
    this.freeBuffer(outputBuffer);
    return bool;
  };

  _proto.secondsToTime = function secondsToTime(sec, multiply) {
    if (multiply === void 0) {
      multiply = 1;
    }

    var x = Math.floor(sec * multiply);
    var seconds = Math.floor(x % 60).toString().padStart(2, '0');
    x /= 60;
    var minutes = Math.floor(x % 60).toString().padStart(2, '0');
    x /= 60;
    var hours = Math.floor(x % 24).toString().padStart(2, '0');
    x /= 24;
    var days = Math.floor(x);
    return ' ' + days + ' ' + hours + ':' + minutes + ':' + seconds;
  };

  _proto.perfstart = function perfstart() {
    this.perfstartTime = new Date();
  };

  //outputs how many s the simulation was performed - at the end of simulation, good to measure performance
  _proto.perfend = function perfend() {
    this.perfendTime = new Date();
    var timeDiff = this.perfendTime - this.perfstartTime; //in ms
    // strip the ms

    timeDiff /= 1000; // get seconds

    console.warn("Simulation took " + timeDiff + " seconds");
  };

  _proto.fmuspeedChanged = function fmuspeedChanged(newValue) {
    this.stepSize = this.fmuspeed * (typeof this.fstepsize === 'string' ? parseFloat(this.fstepsize) : this.fstepsize);
  };

  _proto.getState = function getState() {
    var size = this.fmiSerializedFMUStateSize();
    var status = this.fmiSerializeFMUState(this.fmiinst, fmistate, serializedstate, size);
  };

  return Fmi;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "fminame", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 'N/A';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "tolerance", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.000001;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "starttime", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "stoptime", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "guid", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 'N/A';
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "id", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "inputs", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "otherinputs", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, "valuereferences", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, "ticksToUpdate", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 30;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, "src", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class.prototype, "fstepsize", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.01;
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class.prototype, "controlid", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class.prototype, "showcontrols", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor15 = _applyDecoratedDescriptor(_class.prototype, "fpslimit", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 60;
  }
}), _descriptor16 = _applyDecoratedDescriptor(_class.prototype, "showtime", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor17 = _applyDecoratedDescriptor(_class.prototype, "showtimemultiply", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor18 = _applyDecoratedDescriptor(_class.prototype, "eventlisten", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 'input';
  }
}), _descriptor19 = _applyDecoratedDescriptor(_class.prototype, "mode", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return "continuous";
  }
}), _descriptor20 = _applyDecoratedDescriptor(_class.prototype, "stepsperframe", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor21 = _applyDecoratedDescriptor(_class.prototype, "startafter", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor22 = _applyDecoratedDescriptor(_class.prototype, "fmuspeed", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
})), _class);
exports.Fmi = Fmi;
//# sourceMappingURL=fmi.js.map
