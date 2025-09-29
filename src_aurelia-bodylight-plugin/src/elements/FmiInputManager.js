// Handles registration and deregistration of input elements and event listeners for FMI
export class FmiInputManager {
  constructor(fmiInstance) {
    this.fmi = fmiInstance;
  }

  registerInputs() {
    // Logic moved from Fmi.registerInputs
    if (this.fmi.inputs) {
      let inputparts = this.fmi.inputs.split(';');
      this.fmi.inputreferences = [];
      for (let inputpart of inputparts) {
        let myinputs = inputpart.split(',');
        let numerator = (myinputs.length > 2) ? parseFloat(myinputs[2]) : 1;
        let denominator = (myinputs.length > 3) ? parseFloat(myinputs[3]) : 1;
        let addconst = (myinputs.length > 4) ? parseFloat(myinputs[4]) : 0;
        let fixedsignature = (myinputs.length > 5) ? (myinputs[5] === 'f') : false;
        if (isNaN(addconst)) {
          addconst = 0;
          fixedsignature = myinputs[4] === 'f';
        }
        let inputref = {ref: myinputs[1], numerator: numerator, denominator: denominator, addconst: addconst, fixed: fixedsignature};
        if (this.fmi.inputreferences[myinputs[0]]) {
          this.fmi.inputreferences[myinputs[0]].fixed = this.fmi.inputreferences[myinputs[0]].fixed || fixedsignature;
          this.fmi.inputreferences[myinputs[0]].refs.push(inputref);
        } else {
          this.fmi.inputreferences[myinputs[0]] = {fixed:fixedsignature,refs:[inputref]};
        }
        let dependentEl = document.getElementById(myinputs[0]);
        if (dependentEl) {
          dependentEl.addEventListener(this.fmi.eventlisten, this.fmi.handleValueChange);
          console.warn('registering input, ref, num,den,add,fixed', myinputs[0], myinputs[1], numerator, denominator, addconst, fixedsignature);
        } else {
          if (!window.animateranges) window.animateranges = [];
          window.animateranges.push({
            name:myinputs[0],
            handleValueChange: this.fmi.handleValueChange
          });
          console.warn('non-existing element id, will try to register to animation:', myinputs[0]);
        }
      }
    }
    if (this.fmi.otherinputs) {
      let otherinputtargets = this.fmi.otherinputs.split(';');
      for (let target of otherinputtargets) {
        document.getElementById(target).addEventListener('fmiinput', this.fmi.handleDetailChange);
      }
    }
  }

  deregisterInputs() {
    // Logic moved from Fmi.deregisterInputs
    console.warn('deregistering inputs');
    window.animateranges = [];
    if (this.fmi.inputs) {
      let inputparts = this.fmi.inputs.split(';');
      for (let inputpart of inputparts) {
        let myinputs = inputpart.split(',');
        try {
          document.getElementById(myinputs[0]).removeEventListener(this.fmi.eventlisten, this.fmi.handleValueChange);
        } catch (e) { }
      }
    }
    if (this.fmi.otherinputs) {
      let otherinputtargets = this.fmi.otherinputs.split(';');
      for (let target of otherinputtargets) {
        try {
          document.getElementById(target).removeEventListener('fmiinput', this.fmi.handleDetailChange);
        } catch (e) { }
      }
    }
  }
}
