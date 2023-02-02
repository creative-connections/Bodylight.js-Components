import {ChartjsTime} from './chartjs-time';
//import {BdlChartjs} from './chartjs';
import {bindable, useView} from 'aurelia-templating';
//import {PLATFORM} from 'aurelia-pal';
//@useView(PLATFORM.moduleName('./bdl-chartjs.html'))
@useView('./chartjs.html')
export class ChartjsXy extends ChartjsTime {
  @bindable fromid;
  @bindable labels;
  @bindable refindex;
  @bindable refvalues;
  @bindable type;
  @bindable labelx;
  @bindable labely;
  showlines = true;

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
    let datasets = [];
    let mydata1 = this.initialdata.split(';');
    //initialize x and y, x is first dataset, y is al the rest
    this.mydata = [];
    for (let i = 0; i < this.refvalues; i++) {
      let mydata2 = (mydata1[i]) ? mydata1[i].split(',') : [];
      if (i === 0) {
        //parse x
        this.mydata[0] = mydata2.map((x, index) => {
          return parseFloat(x);
        });
      } else {
        //parse all y
        this.mydata[i] = mydata2.map((yy, index) => {
          return {x: this.mydata[0][index], y: parseFloat(yy)};
        });
      }
    }

    //this.colors already set in super()
    for (let i = 1; i < this.refvalues; i++) {
      datasets.push({
        data: this.mydata[i],
        label: this.chlabels[i],
        backgroundColor: this.colors[i - 1],
        borderColor: this.colors[i - 1],
        fill: false,
        showLine: this.showlines,
        borderWidth: 1,
        refvalues: this.refvalues
      });
    }
    //add additional data, all after ; is taken as x values separated by , of initial curve,
    // after ; is y values of initial curve separated by ,
    // if more curves then another ;. E.g. initialdata=";;0,0.00015;0,28000;0,0.00015;0,1400"
    // -> line from 0 0 to 0.0015 28000 and from 0 0 to 00015 1400
    if (mydata1.length > this.refvalues) {
      let j = this.refvalues;
      for (let i = this.refvalues; i < mydata1.length; i += 2) {
        let mydata2 = mydata1[i].split(',');
        let mydata3 = mydata1[i + 1].split(',');
        this.mydata[j] = mydata3.map((yy, index) => {
          return {x: parseFloat(mydata2[index]), y: parseFloat(yy)};
        });
        datasets.push({
          data: this.mydata[j],
          backgroundColor: this.selectColor(i),
          borderColor: this.selectColor(i),
          fill: false,
          showLine: this.showlines
        });
        j++;
      }
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

  customRadius(context) {
    let last = context.dataIndex === context.dataset.data.length - 1;
    let inrefvalues = context.datasetIndex < context.dataset.refvalues; //dataset is in refvalues - changed by simulator
    if (inrefvalues) return (last ? 3 : 1);
    return 1; //dataset is fixed - background borders
  }

  resetdata() {
    let j = 0;
    for (let i = (this.refindex + 1); i < this.refindex + this.refvalues; i++) {
      this.chart.data.datasets[j].data = [];
      j++;
    }
  }
}
