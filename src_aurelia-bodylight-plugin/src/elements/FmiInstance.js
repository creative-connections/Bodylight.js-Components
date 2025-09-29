// Encapsulates FMU instantiation, initialization, and API bindings
export class FmiInstance {
  constructor(fmi) {
    this.fmi = fmi;
  }

  initfmi() {
    console.log('fmi initfmi()');
    let that = {};
    if (this.fmi.fminame) {
      that.fminame = this.fmi.fminame;
      console.log('using local fmi initfmi() fminame', that.fminame );
    } else {
      that.fminame = window.thisfmi.fminame;
      console.log('using global fmi initfmi() fminame', that.fminame );
    }
    that.fminame = this.fmi.fminame;
    let myinst = window[that.fminame]();
    if (myinst instanceof Promise) {
      myinst.then(inst => {
        that.inst = inst;
        if (!window.fmiinst) { window.fmiinst = [];}
        window.fmiinst[that.fminame] = that;
        if (window.thisfmi.isOnestep) {
          setTimeout(window.thisfmi.sendStartEvent.bind(window.thisfmi),1000);
          window.thisfmi.debounceStep();
        } else if (window.thisfmi.isOneshot) {
          setTimeout(window.thisfmi.sendStartEvent.bind(window.thisfmi),800);
          window.thisfmi.debounceShot();
        } else if (this.fmi.startafter>0) {
          setTimeout(window.thisfmi.startstop.bind(window.thisfmi),1000*this.fmi.startafter);
        }
      });
    } else {
      that.inst = myinst;
      if (!window.fmiinst) { window.fmiinst = [];}
      window.fmiinst[that.fminame] = that;
      if (window.thisfmi.isOnestep) {
        setTimeout(window.thisfmi.sendStartEvent.bind(window.thisfmi),1000)
        _.throttle(window.thisfmi.step.bind(window.thisfmi),1500);
      } else if (window.thisfmi.isOneshot) {
        setTimeout(window.thisfmi.sendStartEvent.bind(window.thisfmi),1000)
        _.throttle(window.thisfmi.shot.bind(window.thisfmi),1500);
      } else if (this.fmi.startafter>0) {
        setTimeout(window.thisfmi.sendStartEvent.bind(window.thisfmi),1000*this.fmi.startafter);
      }
    }
  }

  instantiate() {
    console.log('fmi instantiate()');
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
    const sGetFMUState = 'fmi2GetFMUState';
    const sSetFMUState = 'fmi2SetFMUState';
    const sFreeFMUState = 'fmi2FreeFMUState';
    const sSerializedFMUStateSize = 'fmi2SerializedFMUStateSize';
    const sSerializeFMUState = 'fmi2SerializeFMUState';
    const sDeSerializeFMUStateSize = 'fmi2DeSerializeFMUState';
    this.fmi.stepTime = 0;
    this.fmi.fmuspeedalreadychanged = false;
    this.fmi.stepSize = this.fmi.fmuspeed * ((typeof(this.fmi.fstepsize) === 'string' ) ? parseFloat(this.fmi.fstepsize) : this.fmi.fstepsize);
    this.fmi.mystep = this.fmi.stepSize;
    if (window.fmiinst && window.fmiinst[this.fmi.fminame]) this.fmi.inst = window.fmiinst[this.fmi.fminame].inst;
    else {
      console.warn('fmi instantiate() error initfmi() probably not called')
    }
    console.log('instantiate() this.inst', this.fmi.inst);
    let separator = '_';
    let prefix = this.fmi.fminame;
    if (this.fmi.fmifunctionprefixname) {
      prefix = this.fmi.fmifunctionprefixname;
    }
    if (typeof this.fmi.inst._fmi2GetVersion === 'function') {
      prefix = '';
      separator = '';
    }
    this.fmi.fmiCreateCallback = this.fmi.inst.cwrap(sCreateCallback, 'number', ['number']);
    this.fmi.fmiReset = this.fmi.inst.cwrap(prefix + separator + sReset, 'number', ['number']);
    this.fmi.fmiInstantiate = this.fmi.inst.cwrap(prefix + separator + sInstantiate, 'number', ['string', 'number', 'string', 'string', 'number', 'number', 'number']);
    this.fmi.fmiSetup = this.fmi.inst.cwrap(prefix + separator + sSetup, 'number', ['number', 'number', 'number', 'number', 'number', 'number']);
    this.fmi.fmiEnterInit = this.fmi.inst.cwrap(prefix + separator + sEnterinit, 'number', ['number']);
    this.fmi.fmiExitInit = this.fmi.inst.cwrap(prefix + separator + sExitinit, 'number', ['number']);
    this.fmi.fmiSetReal = this.fmi.inst.cwrap(prefix + separator + sSetreal, 'number', ['number', 'number', 'number', 'number']);
    this.fmi.fmiGetReal = this.fmi.inst.cwrap(prefix + separator + sGetreal, 'number', ['number', 'number', 'number', 'number']);
    this.fmi.fmiSetBoolean = this.fmi.inst.cwrap(prefix + separator + sSetboolean, 'number', ['number', 'number', 'number', 'number']);
    this.fmi.fmiGetBoolean = this.fmi.inst.cwrap(prefix + separator + sGetboolean, 'number', ['number', 'number', 'number', 'number']);
    this.fmi.fmiDoStep = this.fmi.inst.cwrap(prefix + separator + sDostep, 'number', ['number', 'number', 'number', 'number']);
    this.fmi.fmiGetVersion = this.fmi.inst.cwrap(prefix + separator + 'fmi2GetVersion', 'string');
    this.fmi.fmiGetTypesPlatform = this.fmi.inst.cwrap(prefix + separator + 'fmi2GetTypesPlatform', 'string');
    this.fmi.fmi2FreeInstance = this.fmi.inst.cwrap(prefix + separator + 'fmi2FreeInstance', 'number', ['number']);
    this.fmi.fmiGetFMUState = this.fmi.inst.cwrap(prefix + separator + sGetFMUState, 'number', ['number']);
    this.fmi.fmiSetFMUState = this.fmi.inst.cwrap(prefix + separator + sSetFMUState, 'number', ['number']);
    this.fmi.fmiFreeFMUState = this.fmi.inst.cwrap(prefix + separator + sFreeFMUState, 'number', ['number']);
    this.fmi.fmiSerializedFMUStateSize = this.fmi.inst.cwrap(prefix + separator + sSerializedFMUStateSize, 'number', ['number']);
    this.fmi.fmiSerializeFMUState = this.fmi.inst.cwrap(prefix + separator + sSerializeFMUState, 'number', ['number']);
    this.fmi.fmiDeSerializeFMUStateSize = this.fmi.inst.cwrap(prefix + separator + sDeSerializeFMUStateSize, 'number', ['number']);
    this.fmi.instantiated = false;
    this.fmi.pow = this.fmi.stepSize < 1 ? -Math.ceil(-Math.log10(this.fmi.stepSize)) : Math.ceil(Math.log10(this.fmi.stepSize));
    this.fmi.consoleLoggerPtr = this.fmi.inst.addFunction(this.fmi.consoleLogger.bind(this.fmi), 'viiiiii');
  // Ensure consoleLogger is defined
  //const logger = (typeof this.fmi.consoleLogger === 'function') ? this.fmi.consoleLogger : function(){};
    //this.fmi.consoleLoggerPtr = this.fmi.inst.addFunction(logger.bind(this.fmi), 'viiiiii');
    this.fmi.callbackptr = this.fmi.fmiCreateCallback(this.fmi.consoleLoggerPtr);
    this.fmi.fmiinst = this.fmi.fmiInstantiate(this.fmi.fminame, this.fmi.cosimulation, this.fmi.guid, '', this.fmi.callbackptr, 0, this.fmi.debug);
    this.setupExperiment();
  }

  initialize() {
    console.log('fmi initialize() with inst', this.fmi.fmiinst);
    let status = this.fmi.fmiEnterInit(this.fmi.fmiinst);
    if (status != 0) {console.log('fmiEnterInit returned:', status)}
    try {
      status = this.fmi.fmiExitInit(this.fmi.fmiinst);
      if (status != 0) {console.log('fmiExitInit returned:', status)}
    } catch (err) {
      console.log('initialize() fmiExitInit throws err', err);
    }
  }

  setupExperiment() {
    this.fmi.resetFmuspeed();
    this.fmi.fmiSetup(this.fmi.fmiinst, 1, this.fmi.tolerance, this.fmi.starttime, 0);
    console.log('setupExperiment() fmiinst', this.fmi.fmiinst);
    this.fmi.instantiated = true;
  }
}
