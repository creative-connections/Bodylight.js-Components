import {Bind2a} from './bind2a';
import {bindable} from 'aurelia-templating';
import {Bind2animtext} from './bind2animtext';

/**
 * component used to define binding between Adobe Animation object and FMU model simulation
 * value is converted to text which is shown, using bind2animtext
 */
export class Bind2aText extends Bind2a {
  @bindable aname; //name of animation component in AA
  @bindable findex; //index of variable in fmu array
  @bindable convertor;
  @bindable precision;
  @bindable fixed;
  @bindable suffix;
  @bindable prefix;

  constructor() {
    super();
  }

  //it is called when all bindable properties are set to class instance;
  bind() {
    //create bind2animation structure
    let binding = new Bind2animtext(
      this.findex,
      this.aname,
      this.parseConvertors(),
      this.precision ? parseInt(this.precision, 10) : 0,
      this.fixed ? parseInt(this.fixed, 10) : 1,
      this.suffix ? this.suffix: '',
      this.prefix ? this.prefix : ''
    );
    this.addbinding(binding);
  }
}
