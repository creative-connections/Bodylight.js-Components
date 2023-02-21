"use strict";

exports.__esModule = true;
exports.Bind2animation = void 0;

/** Bind2animation class instance
 * this class makes conversion from fmu value to animation value
 * keeps min and max values of FMU model simulation and calling
 *  convertf2a converts value to animation value between min-max
 * **/
var Bind2animation = /*#__PURE__*/function () {
  //index of variable from FMU
  //name of the animation object - should end by _anim
  //min and max values for animation (usually 0-100)
  //min and max values from FMU model simulation
  //internal koefficients
  //converting operation - function (x) -> return some_algebraic_operation_on(x)
  function Bind2animation(_findex, _aname, _amin, _amax, _fmin, _fmax, _operation, _autofmin, _autofmax) {
    this.findex = void 0;
    this.aname = void 0;
    this.amin = void 0;
    this.amax = void 0;
    this.fmin = void 0;
    this.fmax = void 0;
    this.k1 = void 0;
    this.k2 = void 0;
    this.k3 = void 0;
    this.operation = void 0;
    this.autofmin = false;
    this.autofmax = false;
    this.afmin = Number.MAX_SAFE_INTEGER;
    this.afmax = Number.MIN_SAFE_INTEGER;
    this.afminset = false;
    this.afmaxset = false;
    this.findex = _findex;
    this.aname = _aname; //can be obtained by Object.keys(window.ani.lib).filter(name => name.endsWith('Celek'))

    this.amin = _amin;
    this.amax = _amax;
    this.fmin = _fmin;
    this.fmax = _fmax;
    this.autofmin = _autofmin;
    this.autofmax = _autofmax;
    this.operation = _operation;
    this.updateK();
    this.k3 = this.amax - this.amin;
  }
  /** convertf2a converts value to animation value between min-max
  * uses linear approximation,
  * values beyond limits are converted to min or max
  **/


  var _proto = Bind2animation.prototype;

  _proto.convertf2a = function convertf2a(x) {
    //do conversion if operation is defined
    if (this.operation) x = this.operation(x);

    if (this.autofmin) {
      //initially sets minimum as 1/2 of current value, otherwise update it
      if (!this.afminset) {
        this.fmin = x * 0.9;
        this.afminset = true;
        this.updateK();
      } else {
        if (x < this.fmin) {
          this.fmin = x;
          this.updateK();
        }
      }
    }

    if (x <= this.fmin) return this.amin;

    if (this.autofmax) {
      //initially sets maximum as 2x of current value, otherwise update it
      if (!this.afmaxset) {
        this.fmax = x * 1.1;
        this.afmaxset = true;
        this.updateK();
      } else {
        if (x > this.fmax) {
          this.fmax = x;
          this.updateK();
        }
      }
    }

    if (x < this.fmax) return this.amin + (x * this.k1 - this.k2) * this.k3;
    return this.amax;
  };

  _proto.updateK = function updateK() {
    console.log('bind2animation updateK() aname' + this.aname + ' min:' + this.fmin + ' max:' + this.fmax);
    this.k1 = this.fmax !== this.fmin ? 1 / (this.fmax - this.fmin) : 0;
    this.k2 = this.fmax !== this.fmin ? this.fmin / (this.fmax - this.fmin) : 0;
  };

  _proto.handleValue = function handleValue(animobj, value) {
    animobj.setAnimationValue(this.aname, this.convertf2a(value));
  };

  return Bind2animation;
}();

exports.Bind2animation = Bind2animation;
//# sourceMappingURL=bind2animation.js.map
