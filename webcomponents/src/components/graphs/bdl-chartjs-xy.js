import {BdlChartjsTime} from './bdl-chartjs-time';
//import {Chartjs} from './chartjs';
import {bindable, useView} from 'aurelia-templating';
@useView(PLATFORM.moduleName('./chartjs.html'))
export class BdlChartjsXy extends BdlChartjsTime {
  @bindable fromid;
  @bindable labels;
  @bindable refindex;
  @bindable refvalues;
  @bindable type;

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
      this.chart.update();
    };
  }

  bind() {
    super.bind();
    let datasets = [];
    let mydata1 = this.initialdata.split(';');
    //initialize x and y, x is first dataset, y is al the rest
    this.mydata = [];
    for (let i = 0; i < this.refvalues; i++) {
      let mydata2 = (mydata1[i]) ? mydata1[i].split(',') : ['0'];
      if (i === 0) {
        //parse x
        this.mydata[0] = mydata2.map( (x, index) => {return parseFloat(x);});
      } else {
        //parse all y
        this.mydata[i] = mydata2.map((yy, index) => { return {x: this.mydata[0][index], y: parseFloat(yy)}; });
      }
    }
    //this.colors already set in super()
    for (let i = 1; i < this.refvalues; i++) {
      datasets.push({
        data: this.mydata[i],
        label: this.chlabels[i],
        backgroundColor: this.colors[i],
        borderColor: this.colors[i],
        fill: false,
        showLine: true
      });
    }
    this.data = {
      datasets: datasets
    };
    this.type = 'scatter';
    this.options.tooltips.mode = 'nearest';
    this.options.elements = {
      point: {
        radius: this.customRadius,
        display: true
      }
    };
  }

  customRadius(context){
    let last = context.dataIndex === context.dataset.data.length-1;
    return last ? 10 : 2;
  }
}
