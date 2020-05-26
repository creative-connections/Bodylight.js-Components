import {bindable} from 'aurelia-templating';
import {Chartjs} from './chartjs';
import {useView} from 'aurelia-templating';

//@customElement
@useView(PLATFORM.moduleName('./chartjs.html'))
export class BdlChartjsTime extends Chartjs {
  @bindable fromid;
  @bindable labels;
  @bindable refindex;
  @bindable refvalues;
  @bindable type;

  constructor() {
    super();
    this.animateScale = false;
    this.animateRotate = false;
    //this.type = 'line';
    this.handleValueChange = e => {
      //e.detail do not reallocate - using same buffer, thus slicing to append to data array
      //let datapoints =e.detail.data.slice(this.refindex, this.refendindex);
      let j = 0;
      for (let i = this.refindex; i < this.refindex + this.refvalues; i++) {
        this.chart.data.datasets[j].data.push(e.detail.data[i]);
        if (this.chart.data.datasets[j].length > this.maxdata) this.chart.data.datasets[j].shift();
        j++;
      }
      this.chart.data.labels.push(e.detail.time);
      if (this.chart.data.labels.length > this.maxdata) this.chart.data.labels.shift();
      //shift - remove first element if data is too big
      //console.log('chartjs handlevaluechange() chart.data.datasets[0].data', this.chart.data.datasets[0].data);
      this.chart.update();
    };
  }
  bind() {
    super.bind();
    this.chlabels = this.labels.split(',');
    this.colors = [];
    let datasets = []; let timelabels = [];
    for (let i = 0; i < this.refvalues; i++) {
      this.colors.push(this.selectColor(i));
      datasets.push({
        data: this.mydata[i], //mydata is initialized in super class;
        label: this.chlabels[i],
        backgroundColor: this.colors[i],
        borderColor: this.colors[i],
        fill: false
      });
      timelabels.push(i);
    }

    this.data = {
      labels: timelabels,
      datasets: datasets
    };
    this.type = 'line';
  }
}
