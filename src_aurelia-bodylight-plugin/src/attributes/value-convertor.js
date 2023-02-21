//attribute value-convertor
import {inject, DOM} from 'aurelia-framework';

//@customAttribute('value-convertor')
/**
 * EITHER
 * value-convertor = "nominator1,denominator1,addend1;nominator2,denominator2,addend2;..."
 * OR
 * value-convertor = "expression1(x);expression2(x);..." where 'x' holds value to be converted
 */
@inject(DOM.Element)
export class ValueConvertorCustomAttribute {
  constructor(element) {
    this.element = element;
  }

  //binds operation array into parent element view-model operation.
  bind() {
    //
    let convertvalues = this.value.split(';');
    let identity = x => x;
    this.operation = [];
    for (let i = 0; i < convertvalues.length; i++) {
      if (convertvalues[i].includes(',')) {
        //convert values are in form numerator,denominator contains comma ','
        let convertitems = convertvalues[i].split(',');
        if (convertitems[0] === '1' && convertitems[1] === '1') {
          this.operation.push(identity);
        } else {
          let numerator = parseFloat(convertitems[0]);
          let denominator = parseFloat(convertitems[1]);
          this.operation.push(x => x * numerator / denominator);
        }
      } else {
        //convert values are in form of expression, do not contain comma
        if (convertvalues === '1/x') {
          this.operation.push(x => 1 / x);
        } else {
          // for eval() security filter only allowed characters:
          // algebraic, digits, e, dot, modulo, parenthesis and 'x' and 'e' is allowed
          let expression = convertvalues[i].replace(/[^-\d/*+.()%xe]/g, '');
          console.log('chartjs bind(), evaluating expression:' + convertvalues[i] + ' securely filtered to :' + expression);
          // eslint-disable-next-line no-eval
          this.operation.push(x => eval(expression));
        }
      }
    }

    if (this.element &&
      this.element.au &&
      this.element.au.controller &&
      typeof (this.element.au.controller) === 'object' &&
      this.element.au.controller.viewModel &&
      typeof (this.element.au.controller.viewModel) === 'object') {
      this.elementVM = this.element.au.controller.viewModel;
      this.elementVM.operation = this.operation;
    }
  }

  unbind() {
    if (this.fromel) {
      this.fromel.removeEventListener('fmidata', this.handleValueChange);
      this.fromel.removeEventListener('fmireset', this.handleReset);
      this.fromel.removeEventListener('fmiattached', this.handleFMIAttached);
    }
  }

  valueChanged(newValue, oldValue) {
  }

}

