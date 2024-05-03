/** Bind2animation class instance
 * this class makes conversion from fmu value to animation value
 * keeps min and max values of FMU model simulation and calling
 *  convertf2a converts value to animation value between min-max
 * **/
export class Bind2animation {
    findex; //index of variable from FMU
    aname; //name of the animation object - should end by _anim
    amin;amax; //min and max values for animation (usually 0-100)
    fmin;fmax; //min and max values from FMU model simulation
    k1;k2;k3; //internal koefficients
    operation; //converting operation - function (x) -> return some_algebraic_operation_on(x)
    autofmin = false;
    autofmax = false;
    afmin = Number.MAX_SAFE_INTEGER;
    afmax = Number.MIN_SAFE_INTEGER;
    afminset = false;
    afmaxset = false;
    autocoef = 2;

    constructor(_findex, _aname, _amin, _amax, _fmin, _fmax, _operation,_autofmin,_autofmax,_autocoef) {
      this.findex = _findex;
      this.aname = _aname; //can be obtained by Object.keys(window.ani.lib).filter(name => name.endsWith('Celek'))
      this.amin = _amin;
      this.amax = _amax;
      if (typeof _fmin == "number") {this.fmin = _fmin; this.afminset = true;}
      if (typeof _fmax == "number") {this.fmax = _fmax; this.afmaxset = true;}
      this.autofmin = _autofmin;
      this.autofmax = _autofmax;
      this.operation = _operation;
      if (_autocoef != 0) this.autocoef = _autocoef;
      this.updateK();
      this.k3 = (this.amax - this.amin);
    }

    /** convertf2a converts value to animation value between min-max
    * uses linear approximation,
    * values beyond limits are converted to min or max
 **/
    convertf2a(x) {
      //do conversion if operation is defined
      if (this.operation) x = this.operation(x);
      //initially sets minimum as 1/2 of current value, otherwise update it
      if (!this.afminset) {
        this.fmin = x/this.autocoef;
        this.afminset = true;
        this.updateK();
      }
      //initially sets maximum as 2x of current value, otherwise update it
      if (!this.afmaxset) {
        this.fmax = x*this.autocoef;
        this.afmaxset = true;
        this.updateK();
      }      
      if (this.autofmin) {        
          if (x<this.fmin) {
            this.fmin=x;
            this.updateK();
          }        
      }

      if (x <= this.fmin) return this.amin;

      if (this.autofmax) {
          if (x>this.fmax) {
            this.fmax= x;
            this.updateK();
          }
      }

      if (x < this.fmax) return this.amin + (x * this.k1 - this.k2) * this.k3;

      return this.amax;
    }

    updateK() {
      console.log('bind2animation updateK() aname'+this.aname+' min:'+ this.fmin+ ' max:'+this.fmax);
      this.k1 = (this.fmax !== this.fmin) ? (1 / (this.fmax - this.fmin)) : 0;
      this.k2 = (this.fmax !== this.fmin) ? (this.fmin / (this.fmax - this.fmin)) : 0;
    }

    handleValue(animobj, value) {
      animobj.setAnimationValue(this.aname, this.convertf2a(value));
    }
}
