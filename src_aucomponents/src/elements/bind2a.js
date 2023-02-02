import {bindable} from 'aurelia-templating';
import {Bind2animation} from './bind2animation';

/**
 * component used to define binding between Adobe Animation object and FMU model simulation
 * value is directly converted to animation state using bind2animationb
 */
export class Bind2a {
    @bindable aid; //id of animate - optionall, g
    @bindable fid; //id of fmu component -optional
    @bindable aname; //name of animation component in AA
    @bindable findex; //index of variable in fmu array
    @bindable amin = 0; //minimal value in animate component
    @bindable amax = 100; //maximal value in animate component
    @bindable fmin; //optional minimal value of variable from fmu model
    @bindable fmax; //optional maximal value of variable from fmu model
    @bindable convertor;
    index=0;
    autofmin = false;
    autofmax = false;

    constructor() {

    }

    //it is called when all bindable properties are set to class instance;
    bind() {
      this.amin = parseFloat(this.amin);
      this.amax = parseFloat(this.amax);
      //optional fmin,fmax - if not set then autofmin fmax is triggered
      if (this.fmin) this.fmin = parseFloat(this.fmin); else this.autofmin = true;
      if (this.fmax) this.fmax = parseFloat(this.fmax); else this.autofmax = true;
      //create bind2animation structure
      let operation = this.parseConvertors();
      let binding = new Bind2animation(this.findex, this.aname, this.amin, this.amax, this.fmin, this.fmax, operation,this.autofmin, this.autofmax);
      this.addbinding(binding);
    }

    parseConvertors() {
      //configure convertors - used to convert units received from fmi
      if (this.convertor) {
        let convertvalues = this.convertor.split(';');
        let identity = x => x;
        let operations = [];
        for (let i = 0; i < convertvalues.length; i++) {
          if (convertvalues[i].includes(',')) {
            //convert values are in form numerator,denominator,addend contains comma ','
            let convertitems = convertvalues[i].split(',');
            if (convertitems[0] === '1' && convertitems[1] === '1' && (convertitems.length<=2 || (convertitems[2]==='0'))) operations.push(identity);
            else {
              let numerator = parseFloat(convertitems[0]);
              let denominator = parseFloat(convertitems[1]);
              let addend = convertitems.length>2 ? parseFloat(convertitems[2]) : 0;
              operations.push(x => x * numerator / denominator + addend);
            }
          } else {
            //convert values are in form of expression, do not contain comma
            if (convertvalues === '1/x') operations.push(x=> 1 / x);

            else {
              //filter only allowed characters: algebraic, digits, e, dot, modulo, parenthesis and 'x' is allowed
              let expression = convertvalues[i].replace(/[^-\d/*+.\^()%xeMathsincopw]/g, '');
              //console.log('bind2a bind(), evaluating expression:' + convertvalues[i] + ' securely filtered to :' + expression);
              // eslint-disable-next-line no-eval
              operations.push(x => eval(expression));
            }
          }
        }
        //only one onvertor is usable in this component - return first
        return operations[0];
      }
      return null;
    }

    addbinding(binding) {
      //create global bind2animation array - it is used then by animate-adobe instance
      if (!window.animatebindings) window.animatebindings = [];
      //keep index within the array, will be used when detaching
      this.index = window.animatebindings.push(binding) - 1;
    }

    unbind() {
      //remove binding structure from global array - using index position
      window.animatebindings.splice(this.index, 1);
    }
}
