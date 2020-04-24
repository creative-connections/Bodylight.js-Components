import {bindable} from 'aurelia-framework';

export class Fmi {
  @bindable fminame='N/A';
  @bindable tolerance=0.000001;//0.000030517578
  @bindable starttime=0;
  @bindable guid='N/A';
  @bindable id;
  @bindable inputs;
  @bindable otherinputs;
  @bindable valuereferences;
  @bindable ticksToUpdate = 200;
  @bindable src;
  @bindable fstepsize=0.01;

  cosimulation=1;
  stepSize=0.01;//0.0078125;

  doingstep=false;
  animationstarted=false;
  measurefps=true;
  fpstick=0;
  stepi=0;


  constructor() {
    //create lambda function which is added as listener later
    this.changeinputs = [];
    this.handleValueChange = e => {
      //e.target; //triggered the event
      console.log('handlevaluechange', e, e.target);
      let targetid = e.target.parentElement.parentElement.id;
      let targetvalue = e.target.value;
      this.changeinputs.push({id: targetid, value: targetvalue}); //detail will hold the value being changed
      console.log('fmi handle value change', this.changeinputs);
    };
    this.handleDetailChange = e => {
      //e.target; //triggered the event
      //let targetid = e.target.parent().parent().id;
      //let targetvalue = e.target.value;
      this.changeinputs.push({valuereference: e.detail.valuereference, value: e.detail.value}); //detail will hold the value being changed
      console.log('fmi handle detail change', this.changeinputs);
    };
    this.inst = {};
  }

  attached() {
    console.log('fmi attached');
    this.mydata = [0, 0];
    //split references by ,
    this.references = this.valuereferences.split(',');

    //parse inputs id,ref1;id2,ref2 ...
    if (this.inputs) { //register DOM elements to listen to their 'change' event directly
      let inputparts = this.inputs.split(';'); //splits groups delimited by ;
      this.inputreferences = [];
      for (let inputpart of inputparts) {
        let myinputs = inputpart.split(','); //splits reference and id by ,
        let numerator = (myinputs.length > 2) ? myinputs[2] : 1;
        let denominator = (myinputs.length > 3) ? myinputs[3] : 1;
        this.inputreferences[myinputs[0]] = {ref: myinputs[1], numerator: numerator, denominator: denominator}; //first is id second is reference
        //register change event - the alteration is commited
        document.getElementById(myinputs[0]).addEventListener('change', this.handleValueChange);
      }
    }

    if (this.otherinputs) {
      let otherinputtargets = this.otherinputs.split(',;');
      for (let target of otherinputtargets) document.getElementById(target).addEventListener('fmiinput', this.handleDetailChange);
    }

    //if src is not specified - then expects that fmi scripts is loaded in HTML page prior thus should be available
    if (this.src && this.src.length > 0) {
      console.log('loading script first, then init fmi');
      //keep 'this' reference in global for callback
      window.thisfmi = this;
      this.getScript(this.src, this.initfmi);
    } else { //src is specified, thus load it - browser loads it at the end, thus adding the rest as callback after loaded
      console.log('init fmi without loading script: fminame, this:', this.fminame, this);
      this.initfmi();
    }
  }

  getScript(source, callback) {
    console.log('fmi getscript()');
    let script = document.createElement('script');
    let prior = document.getElementsByTagName('script')[0];
    script.async = 1;

    script.onload = script.onreadystatechange = function( _, isAbort ) {
      if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState) ) {
        script.onload = script.onreadystatechange = null;
        script = undefined;

        if (!isAbort && callback) setTimeout(callback, 0);
      }
    };

    script.src = source;
    prior.parentNode.insertBefore(script, prior);
  }

  //make inst object globally - in case of globals (non-src) declaration
  initfmi() {
    //TODO make the instance global and take it when button is pressed and instantiate is callsed()
    let that = {};
    if (window.thisfmi) {
      that.fminame = window.thisfmi.fminame;
      console.log('using global fmi initfmi() fminame', that.fminame );
    } else {
      that.fminame = this.fminame;
      console.log('using local fmi initfmi() fminame', that.fminame );
    }

    //create instance
    that.inst = window[that.fminame]();
    console.log('fmi callback that, that.inst', that, that.inst);
    //or? that.inst = new window[that.fminame];
    //console.log('instantiate, that.inst', that.inst);
    //create function methods using emscripten recommended cwrap
    if (!window.fmiinst) { window.fmiinst = [];}
    window.fmiinst[that.fminame] = that;
  }

  bind() {}

  detached() {}
  /**
   * Implements a rudimentary browser console logger for the FMU.
   */
  consoleLogger(componentEnvironment, instanceName, status, category, message, other) {
    /* Fills variables into message returned by the FMU, the C way */
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
    console.log('FMU(' + this.inst.UTF8ToString(instanceName) +  ':' + status + ':' + this.inst.UTF8ToString(category) + ') msg: ' + this.inst.UTF8ToString(formatMessage(message, other))
    );

    this.inst._free(formatMessage);
  }

  initialize() {
    this.fmiEnterInit(this.fmiinst);
    this.fmiExitInit(this.fmiinst);
  }

  instantiate() {
    const sReset = 'fmi2Reset';
    const sInstantiate = 'fmi2Instantiate';
    const sSetup = 'fmi2SetupExperiment';
    const sEnterinit = 'fmi2EnterInitializationMode';
    const sExitinit = 'fmi2ExitInitializationMode';
    const sSetreal = 'fmi2SetReal';
    const sSetboolean = 'fmi2SetBoolean';
    const sGetreal = 'fmi2GetReal';
    const sGetboolean = 'fmi2GetBoolean';
    const sDostep = 'fmi2DoStep';
    const sCreateCallback = 'createFmi2CallbackFunctions';
    this.stepTime = 0;
    this.stepSize = (typeof(this.fstepsize) === 'string' ) ? parseFloat(this.fstepsize) : this.fstepsize;
    this.mystep = this.stepSize;
    //console callback ptr, per emsripten create int ptr with signature viiiiii
    this.inst = window.fmiinst[this.fminame].inst; //if (window.thisfmi) {this.inst = window.thisfmi.inst;}
    console.log('instantiate() this.inst', this.inst);
    //set the fminame and JS WASM function references
    let separator = '_';
    let prefix = this.fminame;
    //console.log('attached fminame:', that.fminame);
    // OpenModelica exported function names
    if (typeof window._fmi2GetVersion === 'function') {
      prefix = '';
      separator = '';
    }
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
    this.fmi2FreeInstance = this.inst.cwrap(prefix + separator + 'fmi2FreeInstance', 'number', ['number']);
    this.instantiated = false;
    //calculate pow, power of stepsize
    this.pow = this.stepSize < 1 ? -Math.ceil(-Math.log10(this.stepSize)) : Math.ceil(Math.log10(this.stepSize));
    console.log('instantiate() this.inst', this.inst);
    this.consoleLoggerPtr = this.inst.addFunction(this.consoleLogger.bind(this), 'viiiiii');
    this.callbackptr = this.fmiCreateCallback(this.consoleLoggerPtr);
    //create instance of model simulation
    this.fmiinst = this.fmiInstantiate(this.fminame, this.cosimulation, this.guid, '', this.callbackptr, 0, 0); //last 1 debug, 0 nodebug
    //setup experiment
    this.fmiSetup(this.fmiinst, 1, this.tolerance, this.starttime, 0);
    console.log('instantiated fmiinst', this.fmiinst);
    this.instantiated = true;
  }

  simulate() {}

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

  startstop() {
    if (this.animationstarted) {
      //stop animation
      this.animationstarted = false;
      cancelAnimationFrame(this.request);
      //create custom event
      let event = new CustomEvent('fmistop', {detail: {time: this.round(this.stepTime, this.pow)}});
      //dispatch event - it should be listened by some other component
      document.getElementById(this.id).dispatchEvent(event);
    } else {
      this.animationstarted = true;
      //create custom event
      let event = new CustomEvent('fmistart', {detail: {time: this.round(this.stepTime, this.pow)}});
      //dispatch event - it should be listened by some other component
      document.getElementById(this.id).dispatchEvent(event);
      //animate using requestAnimationFrame
      const performAnimation = () => {
        this.request = requestAnimationFrame(performAnimation);
        this.step();
      };
      requestAnimationFrame(performAnimation);
    }
  }

  round(value, decimals) {
    if (decimals < 0) {let posdecimals = -decimals; return Number(Math.round(value + 'e' + posdecimals) + 'e-' + posdecimals);}
    return Number(Math.round(value + 'e-' + decimals) + 'e+' + decimals);
  }

  step() {
    //primitive semaphore, only one instance can perform this call
    if (!this.doingstep) {
      this.doingstep = true;
      if (!this.instantiated) {
        this.instantiate();
        this.initialize();
      }
      //TODO now demo data, get real data from simulation
      //console.log('step()1 fmiinst', this.fmiinst);
      this.stepi++;

      //changeinputs
      if (this.changeinputs.length > 0) {
        while (this.changeinputs.length > 0) {
          console.log('changing inputs');
          let myinputs = this.changeinputs.shift(); //remove first item
          //set real - reference is in - one input one reference
          //for (let reference of this.inputs[myinputs.id])

          //sets individual values - if id is in input, then reference is taken from inputs definition
          //console.log('changing inputs,id,value', this.inputreferences, myinputs.id, myinputs.value);
          let normalizedvalue = myinputs.value * this.inputreferences[myinputs.id].numerator / this.inputreferences[myinputs.id].denominator;
          if (myinputs.id) this.setSingleReal(this.inputreferences[myinputs.id].ref, normalizedvalue);
          // if reference is in input, then it is set directly
          else if (myinputs.valuereference) this.setSingleReal(myinputs.valuereference, normalizedvalue);
        }
        //flush all in one call to fmi
        this.flushRealQueue();
      }
      //dostep
      //compute step to round the desired time
      //const res = this.fmiDoStep(this.fmiinst, this.stepTime, this.stepSize, 1);
      const res = this.fmiDoStep(this.fmiinst, this.stepTime, this.mystep, 1);
      this.stepTime = this.stepTime + this.mystep;
      this.mystep = this.stepSize; //update correction step to current step
      //console.log('step() res:', res);
      if (res === 1 || res === 2) {
        this.fmiReset(this.fmiinst);
      }

      //distribute simulation data to listeners
      this.mydata = this.getReals(this.references);

      //create custom event
      let event = new CustomEvent('fmidata', {detail: {time: this.round(this.stepTime, this.pow), data: this.mydata}});
      //dispatch event - it should be listened by some other component
      document.getElementById(this.id).dispatchEvent(event);

      if (this.measurefps) {
        if (this.fpstick === 0) {this.startfpstime = Date.now(); }
        this.fpstick++;
        if (this.fpstick >= this.ticksToUpdate) {
          //do correction step calculation
          //this.pow = 0;
          if (this.stepSize < 1) this.pow = - Math.ceil(- Math.log10(this.stepSize)); else this.pow = Math.ceil(Math.log10(this.stepSize));
          this.mystep = this.round(this.stepTime + this.stepSize, this.pow) - this.stepTime;
          //do fps calculation
          this.fps = 1000 * this.ticksToUpdate / (Date.now() - this.startfpstime);
          this.fpstick = 0;
        }
      }
      this.doingstep = false;
    }
  }

  reset() {
    this.fmiReset(this.fmiinst);
    this.stepTime = 0;
  }

  /* routines to alloc buffer for getting/setting from fmi*/
  createBuffer(arr) {
    let size = arr.length * arr.BYTES_PER_ELEMENT;
    let ptr = this.inst._malloc(size);
    return { ptr, size };
  }

  createAndFillBuffer(arr) {
    const buffer = this.createBuffer(arr);
    this.fillBuffer(buffer, arr);
    return buffer;
  }

  freeBuffer(buffer) {
    if (buffer.ptr !== null) {
      this.inst._free(buffer.ptr);
    }
    buffer.ptr = null;
    buffer.size = null;
  }

  viewBuffer(buffer) {
    return new Uint8Array(this.inst.HEAPU8.buffer, buffer.ptr, buffer.size);
  }

  fillBuffer(buffer, arr) {
    const view = this.viewBuffer(buffer);
    view.set(new Uint8Array(arr.buffer));
    return buffer;
  }

  getReals(references) {
    const queryBuffer = this.createAndFillBuffer(new Int32Array(references));
    const query = this.viewBuffer(queryBuffer);
    const outputBuffer = this.createBuffer(new Float64Array(references.length));
    const output = this.viewBuffer(outputBuffer);

    this.getReal(query, output, references.length);

    const real = new Float64Array(output.buffer, output.byteOffset, references.length);

    this.freeBuffer(queryBuffer);
    this.freeBuffer(outputBuffer);
    return real;
  }

  getSingleReal(reference) {
    const queryBuffer = this.createAndFillBuffer(new Int32Array([reference]));
    const query = this.viewBuffer(queryBuffer);
    const outputBuffer = this.createBuffer(new Float64Array(1));
    const output = this.viewBuffer(outputBuffer);

    this.getReal(query, output, 1);

    const real = new Float64Array(output.buffer, output.byteOffset, 1);

    this.freeBuffer(queryBuffer);
    this.freeBuffer(outputBuffer);
    return real[0];
  }

  /**
     * Adds a real value to setRealQueue
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

  flushBooleanQueue() {
    if (this.setBooleanQueue) {
      const referenceBuffer = this.createAndFillBuffer(new Int32Array(this.setBooleanQueue.references));
      const references = this.viewBuffer(referenceBuffer);
      const valueBuffer = this.createAndFillBuffer(new Int32Array(this.setBooleanQueue.values));
      const values = this.viewBuffer(valueBuffer);

      this.setBoolean(references, values, this.setBooleanQueue.references.length);
      this.freeBuffer(referenceBuffer);
      this.freeBuffer(valueBuffer);

      this.setBooleanQueue = false;
    }
  }

  /**
     */
  setSingleBoolean(reference, value) {
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
  getSingleBoolean(reference) {
    const queryBuffer = this.createAndFillBuffer(new Int32Array([reference]));
    const query = this.viewBuffer(queryBuffer);
    const outputBuffer = this.createBuffer(new Int32Array(1));
    const output = this.viewBuffer(outputBuffer);
    this.getBoolean(query, output, 1);
    const bool = new Int32Array(output.buffer, output.byteOffset, 1);
    this.freeBuffer(queryBuffer);
    this.freeBuffer(outputBuffer);
    return bool[0];
  }
  getBooleans(references) {
    const queryBuffer = this.createAndFillBuffer(new Int32Array(references));
    const query = this.viewBuffer(queryBuffer);
    const outputBuffer = this.createBuffer(new Int32Array(references.length));
    const output = this.viewBuffer(outputBuffer);
    this.getBoolean(query, output, references.length);
    const bool = new Int32Array(output.buffer, output.byteOffset, references.length);
    this.freeBuffer(queryBuffer);
    this.freeBuffer(outputBuffer);
    return bool;
  }
}
