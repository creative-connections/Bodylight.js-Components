import {bindable,observable} from 'aurelia-framework';
import _ from 'lodash';

export const thirdpartytimeout = 5000;

export class Fmi {
  @bindable fminame='';
  @bindable tolerance=0.000001;//0.000030517578
  @bindable starttime=0;
  @bindable stoptime=0; //if >0 then fmi will stop at stoptime
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
  @bindable eventlisten = 'input';//input==continuous/change==when user drops the value
  @bindable mode="continuous"; //continuous or oneshot or onestep
  @bindable stepsperframe = 1;
  @bindable startafter = 0;
  @bindable fmuspeed = 1;

  cosimulation=1;
  stepSize=0.01;//0.0078125;

  doingstep=false;
  animationstarted=false;
  measurefps=false;d
  fpstick=0;
  stepi=0;
  resetBeforeChange = false;
  simulationtime = 0;
  isOneshot = false;
  isOnestep = false;

  constructor() {
    //create lambda function which is added as listener later
    this.changeinputs = {}; //[]; change to associative array
    this.handleValueChange = e => {
      //e.target; //triggered the event
      let targetid;
      if (e.detail && e.detail.id) targetid = e.detail.id;
      else if (e.target.id.length > 0) targetid = e.target.id;
      else targetid = e.target.parentElement.parentElement.id;
      let targetvalue = (e.detail && e.detail.value) ? e.detail.value : e.target.value;
      //bug sometimes value change is double fired, check whether changeinputs already contains the same value
      if (this.changeinputs[targetid] && this.changeinputs[targetid].value === targetvalue) return;
      this.changeinputs[targetid] = {id:targetid, value:targetvalue}; //detail will hold the value being changed
      //determine whether it is fixed parameter - further reset is needed?
      this.resetBeforeChange = this.resetBeforeChange || (this.inputreferences[targetid] && this.inputreferences[targetid].fixed);
      //do step if mode is onestep
      //TODO may be do throttle here - if more events will come do step shot only once
      if (this.isOnestep) setTimeout(this.step.bind(this),200); //do simulation step after 200 ms
      if (this.isOneshot) setTimeout(this.shot.bind(this),200); //so shot after 200ms
      
    };
    this.handleDetailChange = e => {
      //this.changeinputs.push({valuereference: e.detail.valuereference, value: e.detail.value, fromid: e.detail.id}); //detail will hold the value being changed
      //bug sometimes value change is double fired, check whether changeinputs already contains the same value
      if (this.changeinputs[e.detail.id] && this.changeinputs[e.detail.id].value === e.detail.value) return;
      this.changeinputs[e.detail.id] = {valuereference: e.detail.valuereference, value: e.detail.value, fromid: e.detail.id};
      //this.changeinputs[targetid] = targetvalue; //detail will hold the value being changed TODO valuereference???

      console.log('fmi handle detail change', this.changeinputs);
      //do step if mode is onestep
      if (this.isOnestep) setTimeout(this.stepHandler,200); //do simulation step after 100 ms
      if (this.isOneshot) {
        //TODO do start
        setTimeout(this.shot.bind(this),200);
      } //do simulation step after 100 ms
    };
    this.handleStart = e => {
      this.startevent(e);
    };
    this.handleStop = e=> {
      this.stopevent(e);
    };
    this.handleShot = this.shot.bind(this);
    this.handleStep = this.step.bind(this);
    this.debounceStep = _.debounce(this.handleStep,1000);
    this.debounceShot = _.debounce(this.handleShot,1000);

    //this handles event to register inputs - may be sent by subsequent component which change inputs/outputs communicating with fmi
    this.handleRegister = ()=> {
      this.deregisterInputs();
      this.registerInputs();

      if (this.isOnestep) this.debounceStep(); //do simulation step immediately;
      if (this.isOneshot) this.debounceShot(); //do simulation shot immediately;}
    };
    this.inst = false;
  }

  registerInputs(){
    if (this.inputs) { //register DOM elements to listen to their 'change' event directly
      let inputparts = this.inputs.split(';'); //splits groups delimited by ;
      this.inputreferences = [];
      for (let inputpart of inputparts) {
        let myinputs = inputpart.split(','); //splits reference and id by ,
        let numerator = (myinputs.length > 2) ? parseFloat(myinputs[2]) : 1;
        let denominator = (myinputs.length > 3) ? parseFloat(myinputs[3]) : 1;
        let addconst = (myinputs.length > 4) ? parseFloat(myinputs[4]) : 0;
        let fixedsignature = (myinputs.length > 5) ? (myinputs[5] === 'f') : false;
        if (isNaN(addconst)) {
          addconst = 0;
          fixedsignature = myinputs[4] === 'f';
        } //fixes bug, setting  instead of NaN, when 4th param is omited and instead 'f' or 't' is specified
        let inputref = {ref: myinputs[1], numerator: numerator, denominator: denominator, addconst: addconst, fixed: fixedsignature};
        if (this.inputreferences[myinputs[0]]) {
          this.inputreferences[myinputs[0]].fixed = this.inputreferences[myinputs[0]].fixed || fixedsignature;
          this.inputreferences[myinputs[0]].refs.push(inputref); //first is id second is reference
        }
          else
            this.inputreferences[myinputs[0]] = {fixed:fixedsignature,refs:[inputref]}; //first is id second is reference
        //register change event - the alteration is commited
        let dependentEl = document.getElementById(myinputs[0]);
        //now register 'change' event or eventlisten
        if (dependentEl) {
          dependentEl.addEventListener(this.eventlisten, this.handleValueChange);
          console.log('registering input, ref, num,den,add,fixed', myinputs[0], myinputs[1], numerator, denominator, addconst, fixedsignature);
        }
        else {
          //const dependentAnimEl = window.ani.getAnimateObj(myinputs[0]);
          //will push unregistered inputs into possible animation inputs handled during start/stop  
          if (!window.animateranges) window.animateranges = [];
          window.animateranges.push({
            name:myinputs[0],
            handleValueChange: this.handleValueChange
          });
          console.log('non-existing element id, will try to register to animation:', myinputs[0]);
        }
        
        
        
        
      }
    }
    if (this.otherinputs) {
      let otherinputtargets = this.otherinputs.split(';');
      for (let target of otherinputtargets) {
        document.getElementById(target).addEventListener('fmiinput', this.handleDetailChange);
      }
    }
    //TODO check if onestep - do step after
    /*if (this.isOnestep) {
      //console.log('onestep scheduling startevent in promise() to do step()')
      setTimeout(this.sendStartEvent.bind(this),1000);
      console.log('onestep scheduling promise() to do step()')
      setTimeout(this.step.bind(this),1500);
    } */ //do simulation step after 100 ms
  }

  deregisterInputs() {
    //do removeListeners()
    window.animateranges = [];
    if (this.inputs) {
      let inputparts = this.inputs.split(';');
      for (let inputpart of inputparts) {
        let myinputs = inputpart.split(',');
        try {
          document.getElementById(myinputs[0]).removeEventListener(this.eventlisten, this.handleValueChange);
        } catch (e) { }

      }
    }
    if (this.otherinputs) {
      let otherinputtargets = this.otherinputs.split(';');
      for (let target of otherinputtargets) {
        try {
          document.getElementById(target).removeEventListener('fmiinput', this.handleDetailChange);
        } catch (e) { }
      }
    }
  }

  attached() {
    console.log('fmi attached');
    this.mydata = [0, 0];
    //split references by ,
    this.references = this.valuereferences.split(',');    
    this.registerInputs();

    //if src is not specified - then expects that fmi scripts is loaded in HTML page prior thus should be available
    if (this.src && this.src.length > 0) {
      console.log('loading script first, then init fmi');
      //keep 'this' reference in global for callback
      window.thisfmi = this;
      this.getScript(this.src, this.initfmi.bind(this));
    } else { //src is specified, thus load it - browser loads it at the end, thus adding the rest as callback after loaded
      console.log('init fmi without loading script: fminame, this:', this.fminame, this);
      this.initfmi();
    }

    if (this.controlid) {
      document.getElementById(this.controlid).addEventListener('fmistart', this.handleStart);
      document.getElementById(this.controlid).addEventListener('fmistop', this.handleStop);
    }

    if (typeof this.showcontrols === 'string') {
      this.showcontrols = (this.showcontrols === 'true');
    }
    document.addEventListener('fmiregister',this.handleRegister);
    document.addEventListener('dostep',this.handleStep);
    //sending attached event - some may detect it to register it's outpu listener if attached before
    let event = new CustomEvent('fmiattached');
    document.dispatchEvent(event);
  }

  //detects whether script with FMU is already loaded, if not it adds it to DOM and loads
  //get script element and registers 'onload' callback to be called when the script is loaded
  getScript(source, callback) {
    //check whether the script is not already there
    if (Array.from(document.getElementsByTagName('script')).filter(x=> x.getAttribute('src') === source).length > 0) {
      console.log('fmi.getScript() WARNING, script is already added into DOM:', source);
      //do callback?
      if (callback) setTimeout(callback, 0);
      return;
    }
    //console.log('fmi getscript()');
    let script = document.createElement('script');
    let prior = document.getElementsByTagName('script')[0];
    script.async = 1;

    script.onerror = function() {
      if (!script.readyState || /loaded|complete/.test(script.readyState) ) {
        script.onerror = script.onload = null;
        script = undefined;
        // try to insert script by other app for previewing - scripts might be inserted into DOM
        if (window.editorapi && (typeof window.editorapi.insertScriptById === 'function')) {
          console.log('inserting script by thirdparty api');
          window.editorapi.insertScriptById(source, 'fmiobj-'+source);
        }
        //do callback even if isAbort - scripts might be inserted into DOM by another app
        if (callback) setTimeout(callback, 1500);
      }
    };

    //remove onreadystatechange - only reliable in IE https://stackoverflow.com/questions/1929742/can-script-readystate-be-trusted-to-detect-the-end-of-dynamic-script-loading
    script.onload = function( _, isAbort ) {
      if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState) ) {
        script.onerror = script.onload =  null;
        script = undefined;
        //do callback - scripts might be inserted into DOM by another app
        if (!isAbort && callback) setTimeout(callback, 0);
      }
    };

    script.src = window.bdlBaseHref ? window.bdlBaseHref + source : source;
    prior.parentNode.insertBefore(script, prior);
  }

  //make inst object globally - in case of globals (non-src) declaration
  initfmi() {
    console.log('fmi initfmi()');
    let that = {};
    /* global/local fminame */
    
    if (this.fminame) {
      that.fminame = this.fminame;
      console.log('using local fmi initfmi() fminame', that.fminame );
    } else {
      //try to use global fminame
      that.fminame = window.thisfmi.fminame;
      console.log('using global fmi initfmi() fminame', that.fminame );
    }    
    
    //bug fmu cosimulation
    that.fminame = this.fminame;

    //create instance
    let myinst = window[that.fminame]();
    //EMSDK v 3.x compiles fmu to Promise based api
    if (myinst instanceof Promise) {
      myinst.then(inst => {
        that.inst = inst;
        if (!window.fmiinst) { window.fmiinst = [];}
        window.fmiinst[that.fminame] = that;
        //console.log('fmi callback from Promise that', that, that.inst);
        //do one step if mode is onestep
        //https://newbedev.com/pass-correct-this-context-to-settimeout-callback
        //TODO check if this step/shot is needed
        if (window.thisfmi.isOnestep) {
          //console.log('onestep scheduling startevent in promise() to do step()')
          setTimeout(window.thisfmi.sendStartEvent.bind(window.thisfmi),1000);
          console.log('onestep scheduling promise() to do step()')
          //setTimeout(window.thisfmi.step.bind(window.thisfmi),1500);
          window.thisfmi.debounceStep();
        } else //do simulation step after 100 ms
        if (window.thisfmi.isOneshot) {
          //console.log('oneshot scheduling startevent in promise() to do step()')
          setTimeout(window.thisfmi.sendStartEvent.bind(window.thisfmi),800);
          console.log('oneshot scheduling promise() to do shot() after 4.5s')
          //setTimeout(window.thisfmi.shot.bind(window.thisfmi),1500);
          window.thisfmi.debounceShot();
        } else //do simulation step after 100 ms
        if (this.startafter>0)
        {
          setTimeout(window.thisfmi.startstop.bind(window.thisfmi),1000*this.startafter);
        }
      });
    } else { //older EMSDK prior 3.x compiles directly to api, keep compatibility
      that.inst = myinst;
      if (!window.fmiinst) { window.fmiinst = [];}
      window.fmiinst[that.fminame] = that;
      //console.log('fmi callback that, that.inst', that, that.inst);
      //do one step if mode is onestep
      //https://newbedev.com/pass-correct-this-context-to-settimeout-callback
      if (window.thisfmi.isOnestep) {
        console.log('onestep scheduling direct(nopromise) to do step()')
        setTimeout(window.thisfmi.sendStartEvent.bind(window.thisfmi),1000)
        //setTimeout(window.thisfmi.step.bind(window.thisfmi),1500);
        _.throttle(window.thisfmi.step.bind(window.thisfmi),1500);
      } else //do simulation step after 100 ms
      if (window.thisfmi.isOneshot) {
        console.log('oneshot scheduling direct(nopromise) to do step()')
        setTimeout(window.thisfmi.sendStartEvent.bind(window.thisfmi),1000)
        //setTimeout(window.thisfmi.shot.bind(window.thisfmi),1500);
        _.throttle(window.thisfmi.shot.bind(window.thisfmi),1500);
      } else if (this.startafter>0)
      {
        setTimeout(window.thisfmi.sendStartEvent.bind(window.thisfmi),1000*this.startafter);
      }
    }
  }

  bind() {
    this.isOneshot = this.mode === 'oneshot';
    this.isOnestep = this.mode === 'onestep';
    if (this.isOnestep) {
      this.showcontrols = false;
    }
    if (this.isOneshot) {
      this.showcontrols = false;
    }
    if (typeof this.stoptime === 'string') {
      this.stoptime=parseFloat(this.stoptime);
    }
    if (typeof this.starttime === 'string') {
      this.starttime=parseFloat(this.starttime);
    }
    if (typeof this.stepsperframee === 'string') {
      this.stepsperframe=parseInt(this.stepsperframe);
    }
    if (typeof this.startafter === 'string') {
      this.starttime=parseFloat(this.startafter);
    }
    if (typeof this.fpslimit === 'string') {
      this.fpslimit = parseFloat(this.fpslimit);
    }
    if (typeof this.fmuspeed === 'string') {
      this.fmuspeed = parseInt(this.fmuspeed);
      this.stepSize = this.fmuspeed * ((typeof(this.fstepsize) === 'string' ) ? parseFloat(this.fstepsize) : this.fstepsize);
    }

  }

  detached() {
    document.removeEventListener('fmiregister',this.handleRegister);
    if (this.animationstarted) {this.startstop();}
    this.deregisterInputs();
    if (this.controlid) {
      document.getElementById(this.controlid).removeEventListener('fmistart', this.handleStart);
      document.getElementById(this.controlid).removeEventListener('fmistop', this.handleStop);
    }
    if (window.editorapi && (typeof window.editorapi.removeScriptById === 'function')) {
      console.log('inserting script by thirdparty api');
      window.editorapi.removeScriptById(this.src, 'fmiobj-'+this.src);
    }
  }

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
    console.log('fmi initialize()');
    this.fmiEnterInit(this.fmiinst);
    this.fmiExitInit(this.fmiinst);
  }

  instantiate() {
    console.log('fmi instantiate()');
    //first define FMI API function names;
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
    //add fmustate support
    const sGetFMUState = 'fmi2GetFMUState';
    const sSetFMUState = 'fmi2SetFMUState';
    const sFreeFMUState = 'fmi2FreeFMUState';
    const sSerializedFMUStateSize = 'fmi2SerializedFMUStateSize';
    const sSerializeFMUState = 'fmi2SerializeFMUState';
    const sDeSerializeFMUStateSize = 'fmi2DeSerializeFMUState';
    this.stepTime = 0;
    this.stepSize = this.fmuspeed * ((typeof(this.fstepsize) === 'string' ) ? parseFloat(this.fstepsize) : this.fstepsize);
    this.mystep = this.stepSize;
    //console callback ptr, per emsripten create int ptr with signature viiiiii
    if (window.fmiinst && window.fmiinst[this.fminame]) this.inst = window.fmiinst[this.fminame].inst;
    else {
      console.warn('fmi instantiate() error initfmi() probably not called')
    }
    //else this.inst = null;//if (window.thisfmi) {this.inst = window.thisfmi.inst;}

    console.log('instantiate() this.inst', this.inst);
    //set the fminame and JS WASM function references
    let separator = '_';
    let prefix = this.fminame;
    //console.log('attached fminame:', that.fminame);
    // OpenModelica exports function names without prefix
    if (typeof this.inst._fmi2GetVersion === 'function') {
      prefix = '';
      separator = '';
    }
    //now use a 'cwrap' delivered by emscripten to facilitate calling C functions with C primitives (string,number) from Javascript
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
    //add fmustate
    this.fmiGetFMUState = this.inst.cwrap(prefix + separator + sGetFMUState, 'number', ['number']);
    this.fmiSetFMUState = this.inst.cwrap(prefix + separator + sSetFMUState, 'number', ['number']);
    this.fmiFreeFMUState = this.inst.cwrap(prefix + separator + sFreeFMUState, 'number', ['number']);
    this.fmiSerializedFMUStateSize = this.inst.cwrap(prefix + separator + sSerializedFMUStateSize, 'number', ['number']);
    this.fmiSerializeFMUState = this.inst.cwrap(prefix + separator + sSerializeFMUState, 'number', ['number']);
    this.fmiDeSerializeFMUStateSize = this.inst.cwrap(prefix + separator + sDeSerializeFMUStateSize, 'number', ['number']);

    this.instantiated = false;
    //calculate pow, power of stepsize
    this.pow = this.stepSize < 1 ? -Math.ceil(-Math.log10(this.stepSize)) : Math.ceil(Math.log10(this.stepSize)); //use Math.trunc ??
    //console.log('instantiate() this', this);
    this.consoleLoggerPtr = this.inst.addFunction(this.consoleLogger.bind(this), 'viiiiii');
    this.callbackptr = this.fmiCreateCallback(this.consoleLoggerPtr);
    //console.log('fminame',this.fminame);
    //console.log('guid',this.guid);
    //console.log('callbackptr',this.callbackptr);
    //console.log('fmiinstantiate fnc:',this.fmiInstantiate);
    //create instance of model simulation
    this.fmiinst = this.fmiInstantiate(this.fminame, this.cosimulation, this.guid, '', this.callbackptr, 0, 0); //last 1 debug, 0 nodebug
    this.setupExperiment();
  }

  setupExperiment() {
    //setup experiment
    this.fmiSetup(this.fmiinst, 1, this.tolerance, this.starttime, 0);
    console.log('setupExperiment() fmiinst', this.fmiinst);
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

  startevent(e) {
    console.log('fmi startevent recieved', e);
    //if (!this.animationstarted) 
    this.perfstart();
    this.startSimulation();
  }

  stopevent(e) {
    console.log('fmi stopevent recieved', e);
    //if (this.animationstarted) 
    this.stopSimulation();
    this.perfend();
  }

  //action to be performed when clicking the play/pause button
  //sends fmistart/fmistop event and starts/stops simulation
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

  //defines action to be done during browser animationframe and starts
  startSimulation() {
    this.animationstarted = true;
    this.fpsInterval = 1000 / (isNaN(this.fpslimit) ? parseInt(this.fpslimit, 10) : this.fpslimit);
    this.then = window.performance.now();
    //read input values
    
    //define performAnimation
    const performAnimation = (newtime) => {
      if (!this.animationstarted) return;
      this.request = requestAnimationFrame(performAnimation);
      if (this.fpslimit && (this.fpslimit < 60)) {
        if (isNaN(this.fpslimit)) this.fpslimit = parseInt(this.fpslimit, 10);
        this.now = newtime;
        //console.log('limiting fps to fpslimit, newtime, now, then, fpsinterval', this.fpslimit, newtime, this.now, this.then, this.fpsInterval);
        this.elapsed = this.now - this.then;
        //console.log('elapsed,fpsinterval', this.elapsed, this.fpsInterval);
        if (this.elapsed > this.fpsInterval) {
          this.then = this.now - (this.elapsed % this.fpsInterval);
          this.step();
        }
      } else {
        for (let i =0;i<this.stepsperframe;i++) this.step();
      }
    };
    performAnimation();
  }

  //cancels all action to be done during browser animationframe and starts
  stopSimulation() {
    //stop animation
    this.animationstarted = false;
    cancelAnimationFrame(this.request);
  }

  //sends fmistop event
  sendStopEvent() {
    //create custom event
    let event = new CustomEvent('fmistop', {detail: {time: this.round(this.stepTime, this.pow)}});
    //dispatch event - it should be listened by some other component
    document.getElementById(this.id).dispatchEvent(event);
  }

  sendStartEvent() {
    //create custom event
    console.log('fmi.sendStartEvent(). Sending start event for adobeobj');
    let event = new CustomEvent('fmistart', {detail: {time: this.round(this.stepTime, this.pow)}});
    //dispatch event - it should be listened by some other component
    document.getElementById(this.id).dispatchEvent(event);
    //animate using requestAnimationFrame
  }

  round(value, decimals) {
    if (decimals < 0) {let posdecimals = -decimals; return Number(Math.round(value + 'e' + posdecimals) + 'e-' + posdecimals);}
    return Number(Math.round(value + 'e-' + decimals) + 'e+' + decimals);
  }

  step(e) {
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
      this.stepi++;

      //changeinputs
      if (this.resetBeforeChange) {
        //fmi call
        this.setupExperiment();
        //do reset
        this.fmiReset(this.fmiinst);
        //setting fixed parameters are now allowed
        this.setInputVariables();
        //initialize
        this.initialize();
        //make big step from 0 to current stepTime ???
        //const res =
        //make big step only if it is not onestep
        if (!this.isOnestep) this.fmiDoStep(this.fmiinst, this.starttime, this.stepTime, 1);
        else this.stepTime = this.starttime;
        //reset the signature
        this.resetBeforeChange = false;
      } else {
        //do only change of variables
        this.setInputVariables();
      }
      //dostep
      //compute step to round the desired time
      const res = this.fmiDoStep(this.fmiinst, this.stepTime, this.mystep, 1);
      this.stepTime = this.stepTime + this.mystep;
      this.mystep = this.stepSize; //update correction step to current step
      if (res === 1 || res === 2) {
        console.warn('step() returned state<>0, doing reset()', res);
        this.fmiReset(this.fmiinst);
        this.initialize();
      }

      //distribute simulation data to listeners
      this.mydata = this.getReals(this.references);

      //create custom event
      let event = new CustomEvent('fmidata', {detail: {time: this.round(this.stepTime, this.pow), data: this.mydata}});
      //dispatch event - it should be listened by some other component
      document.getElementById(this.id).dispatchEvent(event);
      //compute showtime
      if (this.showtime) this.simulationtime = this.secondsToTime(this.stepTime, this.showtimemultiply);
      //do computation only every tickstoupdate tick
      if (this.measurefps) {
        if (this.fpstick === 0) {
          this.startfpstime = window.performance.now();
        }
        this.fpstick++;
        if (this.fpstick >= this.ticksToUpdate) {
          this.fpsInterval = 1000 / (isNaN(this.fpslimit) ? parseInt(this.fpslimit, 10) : this.fpslimit);
          //update ticks - so it will be every 3 seconds
          this.ticksToUpdate = Math.round(3000 / this.fpsInterval);
          //do correction step calculation
          if (this.stepSize < 1) {
            this.pow = -Math.ceil(-Math.log10(this.stepSize));
          } else {
            this.pow = Math.ceil(Math.log10(this.stepSize));
          }
          this.mystep = this.round(this.stepTime + this.stepSize, this.pow) - this.stepTime;
          //do fps calculation
          this.fps = (1000 * this.ticksToUpdate / (window.performance.now() - this.startfpstime)).toPrecision(4);
          this.fpstick = 0;
        }
      }
      //stop simulation when stoptime is defined and reached
      if (this.stoptime>0 && this.animationstarted && this.stoptime<this.stepTime) {
          this.startstop();
        }
    } catch (err) {
        console.error('error catched during fmu step',err);
      }
      finally {
        this.doingstep = false;
      }
    }
  }

  shot(e){
    console.log('fmi -> shot()')
    //check whether initialized and instantiated
    if (!this.inst) {
      //not instantiated
      if (window.fmiinst && window.fmiinst[this.fminame]) {
        console.warn('fmi shot() not instantiated, do it first time')
        this.instantiate();
        this.initialize();
      } else {
        //no initfmi() called = wait for script to be loaded, do nothing
        return
      }
    } else {
      console.log('fmi shot() doing reset')
      this.reset();
      //this.setInputVariables();
    }

    // do steps from starttime to stoptime
    do {
      this.step();
    } while(this.stoptime>this.stepTime)
  }

  setInputVariables() {
    for (let key in this.changeinputs) {
      let myinputs = this.changeinputs[key];
      //console.log('changing inputs', myinputs);
      //set real - reference is in - one input one reference
      //sets individual values - if id is in input, then reference is taken from inputs definition
      console.log('changing inputs for myinputs.id '+myinputs.id+" value "+myinputs.value, this.inputreferences);
      if (this.inputreferences[myinputs.id]) {
        for (let iref of this.inputreferences[myinputs.id].refs) {
          let normalizedvalue = myinputs.value * iref.numerator / iref.denominator + iref.addconst;
          if (myinputs.id) this.setSingleReal(iref.ref, normalizedvalue);
          // if reference is in input, then it is set directly
          else if (myinputs.valuereference) this.setSingleReal(myinputs.valuereference, normalizedvalue);
        }
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
  }

  reset() {
    console.log('doing reset()');
    this.stepTime = this.starttime;
    this.stepSize = this.fmuspeed * ((typeof(this.fstepsize) === 'string' ) ? parseFloat(this.fstepsize) : this.fstepsize);
    this.mystep = this.stepSize;
    this.setupExperiment();
    this.fmiReset(this.fmiinst);
    //set input variables for possible change of non-tunable - fixed parameter values
    this.setInputVariables();
    this.initialize();
    //create custom event
    let event = new CustomEvent('fmireset');
    //dispatch event - it should be listened by some other component
    document.getElementById(this.id).dispatchEvent(event);
  }

  softreset() {
    this.stepTime = this.starttime;
    this.stepSize = this.fmuspeed * ((typeof(this.fstepsize) === 'string' ) ? parseFloat(this.fstepsize) : this.fstepsize);
    this.mystep = this.stepSize;
    //this.setupExperiment();
    //this.fmiReset(this.fmiinst);
    //set input variables for possible change of non-tunable - fixed parameter values
    this.setInputVariables();
    //this.initialize();
    //create custom event
    let event = new CustomEvent('fmireset');
    //dispatch event - it should be listened by some other component
    document.getElementById(this.id).dispatchEvent(event);
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
    this.stepSize = this.fmuspeed * ((typeof(this.fstepsize) === 'string' ) ? parseFloat(this.fstepsize) : this.fstepsize);
  }

  getState(){
    let size = this.fmiSerializedFMUStateSize()
    let status = this.fmiSerializeFMUState(this.fmiinst,fmistate,serializedstate,size);
  }
}
