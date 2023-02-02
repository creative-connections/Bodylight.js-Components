import {Bind2a} from './bind2a';
import {bindable} from 'aurelia-templating';
import {Bind2animswitch} from './bind2animswitch';

export class Bind2aPlay extends Bind2a {
  @bindable aname; //name of animation component in AA
  @bindable findex; //index of variable in fmu array
  @bindable limit;

  constructor() {
    super();
  }

  bind() {
    let mylimit = 1e-12; //small epsilon
    if (this.limit) mylimit = parseFloat(this.limit);
    let binding = new Bind2animswitch(
      this.findex,
      this.aname,
      mylimit
    );
    this.addbinding(binding);
  }
}
