import {bindable, observable} from 'aurelia-framework';
import _ from 'lodash';
import { FmiInputManager } from './FmiInputManager.js';
import { FmiBufferManager } from './FmiBufferManager.js';
import { FmiSimulationController } from './FmiSimulationController.js';
import { FmiInstance } from './FmiInstance.js';
import { FmiEventHandlers } from './FmiEventHandlers.js';
import { FmiBufferUtils } from './FmiBufferUtils.js';

export const thirdpartytimeout = 5000;

export class Fmi {
  @bindable fminame='';
  @bindable fmifunctionprefixname='';
  @bindable tolerance=0.000001;
  @bindable starttime=0;
  @bindable stoptime=0;
  @bindable guid='';
  @bindable id;
  @bindable inputs;
  @bindable otherinputs;
  @bindable valuereferences;
  @bindable ticksToUpdate = 30;
  @bindable src;
  @bindable fstepsize=0.01;
  @bindable controlid;
  @bindable showcontrols=true;
  @bindable fpslimit = 60;
  @bindable showtime = false;
  @bindable showtimemultiply = 1;
  @bindable eventlisten = 'input'; //default 'input' or 'change'
  @bindable mode="continuous";
  @bindable stepsperframe = 1;
  @bindable startafter = 0;
  @bindable fmuspeed = 1;
  @bindable fmuspeed2;
  @bindable fmuspeed2after=10;
  @bindable debug = 0;

  // Properties referenced in fmi.html (initialized in constructor)

  // Initialize backing fields in constructor

  constructor() {
    // Submodules
    this.inputManager = new FmiInputManager(this);
    this.bufferManager = new FmiBufferManager(this);
    this.simulationController = new FmiSimulationController(this);
    this.instance = new FmiInstance(this);
    this.eventHandlers = new FmiEventHandlers(this);

    // State and backing fields (consolidated)
    this._showcontrols = true;
    this._fmuspeed = 1;
    this._fpslimit = 60;
    this._showtime = false;
    this._simulationtime = '';
    this._animationstarted = false;
    this._measurefps = false;
    this._fps = 0;
    this._simplecontrols = false;
    this.animationstarted = false;
    this.measurefps = false;
    this.fps = 0;
    this.simulationtime = '';
    this.simplecontrols = false;
    this.cosimulation = 1;
    this.stepSize = 0.01;
    this.doingstep = false;
    this.fpstick = 0;
    this.stepi = 0;
    this.resetBeforeChange = false;
    this.isOneshot = false;
    this.isOnestep = false;
    this.changeinputs = {};
    // Register event handler methods as arrow functions for event listeners, delegating to eventHandlers
    this.handleValueChange = (e) => this.eventHandlers.handleValueChange(e);
    this.handleDetailChange = (e) => this.eventHandlers.handleDetailChange(e);
    this.handleStart = (e) => this.eventHandlers.handleStart(e);
    this.handleStop = (e) => this.eventHandlers.handleStop(e);
    this.handleShot = (e) => this.eventHandlers.handleShot(e);
    this.handleStep = (e) => this.eventHandlers.handleStep(e);
    this.debounceStep = _.debounce(this.handleStep, 1000);
    this.debounceShot = _.debounce(this.handleShot, 50);
    this.handleRegister = () => this.eventHandlers.handleRegister();
    this.inst = false;
  }
  // Methods for template click.delegate bindings
  startstop() {
    if (this.simulationController && typeof this.simulationController.startstop === 'function') {
      return this.simulationController.startstop(...args);
    }
    // fallback: legacy logic if needed
  }

  step() {
    if (this.simulationController && typeof this.simulationController.step === 'function') {
      return this.simulationController.step(...args);
    }
  }

  reset() {
    // Full reset logic, matching fmi-old.js
    this.stepTime = this.starttime;
    this.stepSize = this.fmuspeed * ((typeof(this.fstepsize) === 'string' ) ? parseFloat(this.fstepsize) : this.fstepsize);
    this.mystep = this.stepSize;
    this.stepi = 0;
    this.fpstick = 0;
    this.fmuspeedalreadychanged = false;
    this.animationstarted = false;
    this.measurefps = false;
    this.fps = 0;
    this.simulationtime = '';
    this.simplecontrols = false;
    // Always use the latest FMU instance
    if (window.fmiinst && window.fmiinst[this.fminame]) this.inst = window.fmiinst[this.fminame].inst;
    // Setup experiment, reset, set input variables, initialize
    if (this.instance && typeof this.instance.setupExperiment === 'function') {
      this.instance.setupExperiment();
    }
    if (typeof this.fmiReset === 'function' && this.fmiinst) {
      this.fmiReset(this.fmiinst);
    }
    if (typeof this.setInputVariables === 'function') {
      this.setInputVariables();
    }
    if (this.instance && typeof this.instance.initialize === 'function') {
      this.instance.initialize();
    }
  this.dispatchFmiEvent('fmireset');
  }
// Aurelia lifecycle: bind
  bind() {
    // Set mode flags
    this.isOneshot = this.mode === 'oneshot';
    this.isOnestep = this.mode === 'onestep';
    if (this.isOneshot || this.isOnestep) {
      this.showcontrols = false;
    }
    if (typeof this.stoptime === 'string') {
      this.stoptime = parseFloat(this.stoptime);
    }
    if (typeof this.starttime === 'string') {
      this.starttime = parseFloat(this.starttime);
    }
    if (typeof this.stepsperframe === 'string') {
      this.stepsperframe = parseInt(this.stepsperframe);
    }
    if (typeof this.startafter === 'string') {
      this.startafter = parseFloat(this.startafter);
    }
    if (typeof this.fpslimit === 'string') {
      this.fpslimit = parseFloat(this.fpslimit);
    }
    if (typeof this.fmuspeed === 'string') {
      this.fmuspeed = parseFloat(this.fmuspeed);
      this.stepSize = this.fmuspeed * (typeof this.fstepsize === 'string' ? parseFloat(this.fstepsize) : this.fstepsize);
    }
    if (typeof this.fmuspeed2 === 'string') {
      this.fmuspeed2 = parseFloat(this.fmuspeed2);
    }
    if (typeof this.fmuspeed2after === 'string') {
      this.fmuspeed2after = parseInt(this.fmuspeed2after, 10);
    }
    if (typeof this.debug === 'string') {
      this.debug = parseInt(this.debug);
    }
  }

  // Load a script dynamically, as in the original fmi-old.js
  getScript(source, callback) {
    // Check whether the script is already present
    if (Array.from(document.getElementsByTagName('script')).filter(x => x.getAttribute('src') === source).length > 0) {
      console.log('fmi.getScript() WARNING, script is already added into DOM:', source);
      if (callback) setTimeout(callback, 0);
      return;
    }
    let script = document.createElement('script');
    let prior = document.getElementsByTagName('script')[0];
    script.async = 1;
    script.onerror = function() {
      if (!script.readyState || /loaded|complete/.test(script.readyState)) {
        script.onerror = script.onload = null;
        script = undefined;
        if (window.editorapi && (typeof window.editorapi.insertScriptById === 'function')) {
          console.log('inserting script by thirdparty api');
          window.editorapi.insertScriptById(source, 'fmiobj-' + source);
        }
        if (callback) setTimeout(callback, 1500);
      }
    };
    script.onload = function(_, isAbort) {
      if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
        script.onerror = script.onload = null;
        script = undefined;
        if (!isAbort && callback) setTimeout(callback, 0);
      }
    };
    script.src = window.bdlBaseHref ? window.bdlBaseHref + source : source;
    prior.parentNode.insertBefore(script, prior);
  }
  
  // Aurelia lifecycle: attached
  attached() {
    console.log('fmi attached()');

    // Register inputs and event listeners
    this.mydata = [0, 0];
    this.references = this.valuereferences ? this.valuereferences.split(',') : [];
    if (this.inputManager && typeof this.inputManager.registerInputs === 'function') {
      this.inputManager.registerInputs();
    }
    // FMU script loading/init
    if (this.src && this.src.length > 0) {
      window.thisfmi = this;
      
      this.getScript(this.src, this.instance.initfmi.bind(this.instance));
      
    } else {
      if (this.instance && typeof this.instance.initfmi === 'function') {
        this.instance.initfmi();
      }
    }
    if (this.controlid) {
      const ctrl = document.getElementById(this.controlid);
      if (ctrl) {
        ctrl.addEventListener('fmistart', this.handleStart);
        ctrl.addEventListener('fmistop', this.handleStop);
      }
    }
    if (typeof this.showcontrols === 'string') {
      this.showcontrols = (this.showcontrols === 'true');
    }
    document.addEventListener('fmiregister', this.handleRegister);
    document.addEventListener('dostep', this.handleStep);
  this.dispatchFmiEvent('fmiattached', true);
  }

  // Aurelia lifecycle: detached
  detached() {
    document.removeEventListener('fmiregister', this.handleRegister);
    if (this.animationstarted) {
      this.startstop();
    }
    if (this.inputManager && typeof this.inputManager.deregisterInputs === 'function') {
      this.inputManager.deregisterInputs();
    }
    if (this.controlid) {
      const ctrl = document.getElementById(this.controlid);
      if (ctrl) {
        ctrl.removeEventListener('fmistart', this.handleStart);
        ctrl.removeEventListener('fmistop', this.handleStop);
      }
    }
    if (window.editorapi && typeof window.editorapi.removeScriptById === 'function') {
      window.editorapi.removeScriptById(this.src, 'fmiobj-' + this.src);
    }
  }
/**
   * Implements a rudimentary browser console logger for the FMU.
   */
  consoleLogger(componentEnvironment, instanceName, status, category, message, other) {
    // Fills variables into message returned by the FMU, the C way
    const formatMessage = (message1, other1) => {
      // get a new pointer
      let ptr = this.inst._malloc(1);
      // get the size of the resulting formated message
      let num = this.inst._snprintf(ptr, 0, message1, other1);
      this.inst._free(ptr);
      num++; // TODO: Error handling num < 0
      ptr = this.inst._malloc(num);
      this.inst._snprintf(ptr, num, message1, other1);
      // return pointer to the resulting message string
      return ptr;
    };

    // eslint-disable-next-line new-cap
    console.log('FMU(' + this.inst.UTF8ToString(instanceName) +  
    ' status:' + status + 
    ' cat:' + this.inst.UTF8ToString(category) + 
    ') msg: ' + this.inst.UTF8ToString(formatMessage(message, other))
  );
    /*console.log(
      'FMU(' + 
      instanceName +  ' status:' + 
      status + ' cat:' + 
      category + ') msg: ' + 
      message + ' other:'+ other
    );*/
    this.inst._free(formatMessage);
  }  

  secondsToTime(sec, multiply = 1) {
    let x = Math.floor(sec * multiply);
    let seconds = Math.floor(x % 60).toString().padStart(2, '0');
    x /= 60;
    let minutes = Math.floor(x % 60).toString().padStart(2, '0');
    x /= 60;
    let hours = Math.floor(x % 24).toString().padStart(2, '0');
    x /= 24;
    let days = Math.floor(x);
    return ' ' + days + ' ' + hours + ':' + minutes + ':' + seconds;
  }

  perfstartTime;
  perfendTime;

  perfstart() {
    this.perfstartTime = new Date();
  };

  //outputs how many s the simulation was performed - at the end of simulation, good to measure performance
  perfend() {
    this.perfendTime = new Date();
    var timeDiff = this.perfendTime - this.perfstartTime; //in ms
    // strip the ms
    timeDiff /= 1000;
    // get seconds
    console.warn("Simulation took "+ timeDiff + " seconds");
  }

  fmuspeedChanged(newValue) {
    console.log('Changing simulation speed of '+this.id+ ' from '+this.fmuspeed+' to '+newValue);
    this.fmuspeedalreadychanged = true;
    //this.fmuspeed = newValue;    
    this.stepSize = newValue * ((typeof(this.fstepsize) === 'string' ) ? parseFloat(this.fstepsize) : this.fstepsize);
  }
  resetFmuspeed() {
    console.log('Reseting simulation speed to '+this.fmuspeed);
    this.fmuspeedalreadychanged = false;
    //this.fmuspeed = newValue;    
    this.stepSize = this.fmuspeed * ((typeof(this.fstepsize) === 'string' ) ? parseFloat(this.fstepsize) : this.fstepsize);
  }


  getState(){
    let size = this.fmiSerializedFMUStateSize()
    let status = this.fmiSerializeFMUState(this.fmiinst,fmistate,serializedstate,size);
  }


  round(value, decimals) {
    if (decimals < 0) {let posdecimals = -decimals; return Number(Math.round(value + 'e' + posdecimals) + 'e-' + posdecimals);}
    return Number(Math.round(value + 'e' + '-' + decimals) + 'e+' + decimals);
  }

  /**
   * Dispatches a 'fmistart' event, matching the original fmi-old.js logic.
   */
  sendStartEvent() {
    //create custom event
    console.log('fmi.sendStartEvent(). Sending start event for adobeobj');
    this.dispatchFmiEvent('fmistart', false, {time: this.round(this.stepTime, this.pow)});
    //animate using requestAnimationFrame
  }

  //sends fmistop event
  sendStopEvent() {
    this.dispatchFmiEvent('fmistop', false, {time: this.round(this.stepTime, this.pow)});
  }

  /**
   * Helper to DRY event dispatching logic.
   * @param {string} eventName - Name of the event to dispatch
   * @param {boolean} [global=false] - If true, dispatches on document; else, on this.id element
   * @param {object} [detail] - Optional detail for CustomEvent
   */
  dispatchFmiEvent(eventName, global = false, detail = undefined) {
    const event = detail ? new CustomEvent(eventName, { detail }) : new CustomEvent(eventName);
    if (global) {
      document.dispatchEvent(event);
    } else {
      const el = document.getElementById(this.id);
      if (el) el.dispatchEvent(event);
    }
  }
  /**
   * Sets input variables for the FMU, ported from fmi-old.js
   */

  setInputVariables() {
    console.log('fmi.setInputVariables()');//+resetAfterChange);
    for (let key in this.changeinputs) {
      let myinputs = this.changeinputs[key];
      if (this.inputreferences && this.inputreferences[myinputs.id]) {
        for (let iref of this.inputreferences[myinputs.id].refs) {
          let normalizedvalue = myinputs.value * iref.numerator / iref.denominator + iref.addconst;
          if (myinputs.id) this.setSingleReal(iref.ref, normalizedvalue);
          else if (myinputs.valuereference) this.setSingleReal(myinputs.valuereference, normalizedvalue);
        }
      }
    }
    if (typeof this.flushRealQueue === 'function') this.flushRealQueue();
    //TODO: investigate why this was here, because oneshot/onestep needs to keep changes
    if (!this.isOneshot && !this.isOnestep) {
      this.changeinputs = {};
    }
  }

  setReal(query, value, count) {
    console.log('setreal query,value,count', query, value, count);
    return this.fmiSetReal(this.fmiinst, query.byteOffset, count, value.byteOffset);
  }

  setBoolean(query, value, count) {
    return this.fmiSetBoolean(this.fmiinst, query.byteOffset, count, value.byteOffset);
  }

  /**
   * Loads Reals from FMU
   */
  getReal(query, output, count) {
    return this.fmiGetReal(this.fmiinst, query.byteOffset, count, output.byteOffset);
  }

  /**
   * Loads Booleans from FMU
   */
  getBoolean(query, output, count) {
    return this.fmiGetBoolean(this.fmiinst, query.byteOffset, count, output.byteOffset);
  }



  /**
   * Handles the start event, ported from fmi-old.js
   */
  startevent(e) {
    console.log('fmi startevent recieved', e);
    this.perfstart();
    this.startSimulation();
  }

  /**
   * Handles the stop event, ported from fmi-old.js
   */
  stopevent(e) {
    console.log('fmi stopevent recieved', e);
    this.stopSimulation();
    this.perfend();
  }

  /**
   * Handles play/pause simulation logic, ported from fmi-old.js
   */
  startstop() {
    if (this.animationstarted) {
      this.stopSimulation();
      this.sendStopEvent();
      this.perfend();
    } else {
      this.perfstart();
      this.sendStartEvent();
      this.startSimulation();
    }
  }

  /**
   * Delegates to simulationController.startSimulation()
   */
  startSimulation() {
    if (this.simulationController && typeof this.simulationController.startSimulation === 'function') {
      return this.simulationController.startSimulation();
    }
  }

  /**
   * Delegates to simulationController.stopSimulation()
   */
  stopSimulation() {
    if (this.simulationController && typeof this.simulationController.stopSimulation === 'function') {
      return this.simulationController.stopSimulation();
    }
  }

  /**
   * Adds a real value to setRealQueue, ported from fmi-old.js
   */
  setSingleReal(reference, value) {
    console.log('setSingleReal reference,value', reference, value);
    if (!this.setRealQueue) {
      this.setRealQueue = {
        references: [],
        values: []
      };
    }
    this.setRealQueue.references.push(reference);
    this.setRealQueue.values.push(value);
  }

  /**
   * Flushes the setRealQueue and writes values to FMU, ported from fmi-old.js
   */
  flushRealQueue() {
    if (this.setRealQueue) {
      const referenceBuffer = this.createAndFillBuffer(new Int32Array(this.setRealQueue.references));
      const references = this.viewBuffer(referenceBuffer);
      const valueBuffer = this.createAndFillBuffer(new Float64Array(this.setRealQueue.values));
      const values = this.viewBuffer(valueBuffer);
      this.setReal(references, values, this.setRealQueue.references.length);
      this.freeBuffer(referenceBuffer);
      this.freeBuffer(valueBuffer);
      this.setRealQueue = false;
    }
  }

  /**
   * Allocates a buffer in the FMU's memory and fills it with the given typed array.
   * Ported from fmi-old.js
   */
  createAndFillBuffer(typedArray) {
    return FmiBufferUtils.createAndFillBuffer(this.inst, typedArray);
  }

  viewBuffer(ptr, type = Float64Array, length = 0) {
    return FmiBufferUtils.viewBuffer(this.inst, ptr);
  }

  freeBuffer(ptr) {
    FmiBufferUtils.freeBuffer(this.inst, ptr);
  }

}
