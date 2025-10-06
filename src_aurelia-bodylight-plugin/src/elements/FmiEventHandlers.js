// Contains event handler functions for FMI (value change, detail change, etc.)
export class FmiEventHandlers {
  constructor(fmiInstance) {
    this.fmi = fmiInstance;
  }

  handleValueChange = (e) => {
    // Logic from Fmi.handleValueChange
    console.log('fmi handle value change:');
    let targetid;
    if (e.detail && e.detail.id) targetid = e.detail.id;
    else if (e.target.id && e.target.id.length > 0) targetid = e.target.id;
    else targetid = e.target.parentElement && e.target.parentElement.parentElement ? e.target.parentElement.parentElement.id : undefined;
    let targetvalue = (e.detail && e.detail.value) ? e.detail.value : e.target.value;
    console.log('fmi handle value change:'+targetvalue,e);
    if (this.fmi.changeinputs[targetid] && this.fmi.changeinputs[targetid].value === targetvalue) return;
    this.fmi.changeinputs[targetid] = {id:targetid, value:targetvalue};
    this.fmi.resetBeforeChange = this.fmi.resetBeforeChange || (this.fmi.inputreferences && this.fmi.inputreferences[targetid] && this.fmi.inputreferences[targetid].fixed);
    if (this.fmi.isOnestep) setTimeout(this.fmi.handleStep, 200);
    if (this.fmi.isOneshot) {
      //setTimeout(this.fmi.debounceShot, 200);
      this.fmi.debounceShot();
    }
  }

  handleDetailChange = (e) => {
    console.log('fmi handle detail change:');
    if (this.fmi.changeinputs[e.detail.id] && this.fmi.changeinputs[e.detail.id].value === e.detail.value) return;
    this.fmi.changeinputs[e.detail.id] = {valuereference: e.detail.valuereference, value: e.detail.value, fromid: e.detail.id};
    //console.log('fmi handle detail change', this.fmi.changeinputs);
    if (this.fmi.isOnestep) setTimeout(this.fmi.handleStep, 200);
    if (this.fmi.isOneshot) setTimeout(this.fmi.debounceShot, 200);
  }

  handleStart = (e) => {
    this.fmi.startevent(e);
  }

  handleStop = (e) => {
    this.fmi.stopevent(e);
  }

  handleShot = (e) => {
    console.log('fmiEventHandler handleShot()',e);
    if (this.fmi.simulationController && typeof this.fmi.simulationController.shot === 'function') {
      this.fmi.simulationController.shot(e);
      //      this.fmi.debounceShot();
    }
  }

  handleStep = (e) => {
    this.fmi.step(e);
  }

  handleRegister = () => {
    this.fmi.inputManager.deregisterInputs();
    this.fmi.inputManager.registerInputs();
    if (this.fmi.isOnestep) this.fmi.debounceStep();
    if (this.fmi.isOneshot) {
      console.log('fmi handleRegister calling debounceShot');
      this.fmi.debounceShot();
    }
  }
}
