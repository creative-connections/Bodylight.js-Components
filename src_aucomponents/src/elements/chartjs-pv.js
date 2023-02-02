import {ChartjsXy} from './chartjs-xy';
import {bindable, useView} from 'aurelia-templating';
//import {PLATFORM} from 'aurelia-pal';
//@useView(PLATFORM.moduleName('./bdl-chartjs.html'))
@useView('./chartjs.html')
export class ChartjsPv extends ChartjsXy {
  @bindable fromid;
  @bindable labels;
  @bindable refindex;
  @bindable refvalues;

  constructor() {
    super();
    this.handleValueChange = e => {
      //e.detail do not reallocate - using same buffer, thus slicing to append to data array
      //let datapoints =e.detail.data.slice(this.refindex, this.refendindex);
      let j = 0;
      //put first value on x axis, others on y axis other values
      for (let i = (this.refindex + 1); i < this.refindex + this.refvalues; i++) {
        this.chart.data.datasets[j].data.push({x: e.detail.data[this.refindex], y: e.detail.data[i]});
        //console.log('adding from data[], i, data[i]', e.detail.data, i, e.detail.data[i]);
        if (this.chart.data.datasets[j].data.length > this.maxdata) {
          //console.log('shifting dataset chartjs-xy', this.chart.data.datasets[j].data);
          this.chart.data.datasets[j].data.shift();
        }
        j++;
      }
      //console.log('chartjs-xy handlevaluechange datasets, e.detail.data',this.chart.data.datasets, e.detail.data);
      this.updatechart();
    };
  }
  bind() {
    super.bind();
  }
}
