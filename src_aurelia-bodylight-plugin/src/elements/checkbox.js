import {bindable} from 'aurelia-framework';
export class Checkbox {
    @bindable min=0; //default 0 if not checked
    @bindable max=1; //default 1 if checked
    @bindable title=''; //title to be shown next to checkbox
    @bindable titlemax; //variant if checkbox is checked
    @bindable titlemin; //variant if checkbox is unchecked
    @bindable default; //false/true whether checkbox is checked or not
    value;
    isChecked=false;

    bind() {
      if (this.default) {
        //console.log('checkbox default,', this.default);
        this.isChecked = this.default === 'true';
      }
      if (!this.titlemax) this.titlemax = this.title;
      if (!this.titlemin) this.titlemin = this.title;
      //console.log('checkbox bind() min:' + this.min + ' max:' + this.max + ' default:' + this.default + ' ischecked' + this.isChecked);
    }
}
