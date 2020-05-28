import {BdlChartjsXy} from "./bdl-chartjs-xy";
import {bindable, useView} from 'aurelia-templating';
@useView(PLATFORM.moduleName('./chartjs.html'))
export class BdlChartjsPv extends BdlChartjsXy {
  @bindable fromid;
  @bindable labels;
  @bindable refindex;
  @bindable refvalues;
  constructor(){
    super();
  }
  bind(){
    super.bind();

  }

}
