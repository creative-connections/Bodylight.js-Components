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
    //this.type = 'line';
    this.handleValueChange = e => {
      //e.detail do not reallocate - using same buffer, thus slicing to append to data array
      //let datapoints =e.detail.data.slice(this.refindex, this.refendindex);
      let j = 0;
      for (let i = this.refindex; i < this.refindex + this.refvalues; i++) {
        //adds data to datasets
        this.chart.data.datasets[j].data.push(e.detail.data[i]);
        if (this.chart.data.datasets[j].data.length > this.maxdata) {
          //console.log('shifting dataset chartjs-time', this.chart.data.datasets[j].data);
          this.chart.data.datasets[j].data.shift();
        }
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
    let mydata1 = this.initialdata.split(';');
    for (let i = 0; i < this.refvalues; i++) {
      let mydata2 = (mydata1[i]) ? mydata1[i].split(','):[];
      this.mydata[i] = mydata2.map(x => {return parseFloat(x);});
      //console.log('chartjstime mydata i',this.mydata[i]);
    }

    for (let i = 0; i < this.refvalues; i++) {
      this.colors.push(this.selectColor(i));
      datasets.push({
        data: this.mydata[i],
        label: this.chlabels[i],
        backgroundColor: this.colors[i],
        borderColor: this.colors[i],
        borderWidth: 1,
        pointRadius: 1,
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

  resetdata() {
    let j = 0;
    for (let i = this.refindex; i < this.refindex + this.refvalues; i++) {
      this.chart.data.datasets[j].data = [];
      this.chart.data.labels = [];
      j++;
    }
  }
}
