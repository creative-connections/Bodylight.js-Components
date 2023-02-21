import {bindable} from 'aurelia-templating';
import _ from 'lodash';
import {inject} from 'aurelia-framework';

@inject(Element)
export class Value {
  @bindable fromid;
  @bindable refindex;
  @bindable convertor;
  @bindable default;
  @bindable precision=4;
  @bindable throttle=500;
  @bindable dataevent=false;
  @bindable adobeid;

  //constructor(){}

  constructor(element) {
    this.element = element;
    //create lambda function which is added as listener later
    this.handleValueChange = e => {
      //e.detail do not reallocate - using same buffer, thus slicing to append to data array
      //let edata = e.detail.data.slice();

      //throttle update to reasonable frequency
      // _.throttle(()=> this.updateValue(e.detail.data[this.refindex]), this.throttle)();
      //call throttled function with args
      this.myupdatevalue(e.detail.data[this.refindex])
    };
    this.handleRawValueChange = e => {
      console.log('catched event from adobe',e)
      //this.updateValue(e.target.value)
    }
    this.handleFMIAttached = e => {
      const fromel = document.getElementById(this.fromid);
      if (fromel) {
        fromel.addEventListener('fmidata', this.handleValueChange);
      } else {
        console.warn('fmi attached, but no element with id found:',this.fromid);
      }
    }
  }

  bind() {
    //register throttled update function    
    if (typeof this.throttle === 'string') this.throttle = parseInt(this.throttle, 10);
    if (typeof this.dataevent === 'string') this.dataevent = this.dataevent === 'true';
    if (typeof this.precision === 'string') this.precision = parseInt(this.precision, 10);
    this.myupdatevalue = _.throttle(this.updateValue, this.throttle);
    if (this.default && typeof this.default === 'string') this.value = parseFloat(this.default);
    //configure convertors - used to convert units received from fmi
    if (this.convertor) {
      //used code from fmi component
      //TODO change to custom attribute
      let convertvalues = [this.convertor];
      let identity = x => x;
      this.operation = [];
      for (let i = 0; i < convertvalues.length; i++) {
        if (convertvalues[i].includes(',')) {
          //convert values are in form numerator,denominator contains comma ','
          let convertitems = convertvalues[i].split(',');
          if (convertitems[0] === '1' && convertitems[1] === '1' && convertitems[2] === '0') this.operation.push(identity);
          else {
            let numerator = parseFloat(convertitems[0]);
            let denominator = parseFloat(convertitems[1]);
            let addend = (convertitems.length>2)?parseFloat(convertitems[2]):0;
            this.operation.push(x => ((x * numerator / denominator) + addend));
          }
        } else {
          //convert values are in form of expression, do not contain comma
          if (convertvalues === '1/x') this.operation.push(x=> 1 / x);

          else {
            // for eval() security filter only allowed characters:
            // algebraic, digits, e, dot, modulo, parenthesis and 'x' and 'e' is allowed
            let expression = convertvalues[i].replace(/[^-\d/*+.()%xeMathroundsic]/g, '');
            console.log('chartjs bind(), evaluating expression:' + convertvalues[i] + ' securely filtered to :' + expression);
            // eslint-disable-next-line no-eval
            this.operation.push(x => eval(expression));
          }
        }
      }
    }
  }

  attached() {
    //listening to custom event fmidata
    //listening to custom event fmidata and fmireset
    const fromel = document.getElementById(this.fromid);
    if (fromel) {
      fromel.addEventListener('fmidata', this.handleValueChange);
    } else {
      console.warn('chartjs, null fromid element, waiting to be attached');
      document.addEventListener('fmiattached',this.handleFMIAttached);
    }
    if (this.adobeid) {
      
      const adobeel = document.getElementById(this.adobeid);
      if (adobeel){
        console.log('listening to adobe events');
        adobeel.addEventListener('change', this.handleRawValueChange);
      } else {
        console.warn('no adobe element found to listen changes');
      }
    }

  }

  detached() {
    if (document.getElementById(this.fromid)) document.getElementById(this.fromid).removeEventListener('fmidata', this.handleValueChange);
    if (this.adobeid && document.getElementById(this.adobeid)) document.getElementById(this.adobeid).removeEventListener('change', this.handleRawValueChange);
  }

  updateValue(rawvalue) {
    if (rawvalue.toPrecision) {
      if (this.operation) this.value = this.operation[0](rawvalue).toPrecision(this.precision); // * this.numerator / this.denominator + this.addconst;
      else this.value = rawvalue.toPrecision(this.precision);
    } else this.value = rawvalue;
    if (this.dataevent) {
      let c = new CustomEvent('fmivalue', {detail: {value: this.value}});
      this.element.dispatchEvent(c);
    }
  }
}
