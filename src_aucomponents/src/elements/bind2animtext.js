import {Bind2animation} from './bind2animation';
export class Bind2animtext extends Bind2animation {
  constructor(_findex, _aname, _operation, precision = 0, fixed = 2 , suffix='', prefix = '') {
    super(_findex, _aname, 0, 0, 0, 0, _operation);
    this.findex = _findex;
    this.aname = _aname;
    this.precision = precision;
    this.fixed = fixed;
    this.suffix = suffix;
    this.prefix = prefix
  }

  convertf2a(x) {
    if (this.operation) x = this.operation(x);
    //let xstr = x.toPrecision(4);
    //return x.toPrecision(4);
    return this.prefix+(this.precision > 0 ? x.toPrecision(this.precision) : x.toFixed(this.fixed)) + this.suffix;
  }

  //animobj is type of animate-adobe
  handleValue(animobj, value) {
    animobj.setText(this.aname, this.convertf2a(value));
    //this.setText(binding.aname, convertedvalue);
  }
}
