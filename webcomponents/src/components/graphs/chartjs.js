import Chart from 'chart.js';
import {bindable} from 'aurelia-framework';

export class Chartjs {
  @bindable fromid;
  @bindable labels;
  @bindable refindex;
  @bindable refvalues;
  @bindable type='doughnut';
  @bindable maxdata=512;
  @bindable initialdata='';
  @bindable width=600;
  @bindable height=300;
  @bindable animate=false;
  @bindable id;

  constructor() {
    this.handleValueChange = e => {
      //sets data to dataset
      this.chart.data.datasets[0].data = e.detail.data.slice(this.refindex, this.refendindex);
      this.chart.update();
    };
    this.handleReset = e => {
      console.log('handlereset');
      this.resetdata();
      this.chart.update();
    };
  }

  resetdata() {
    this.chart.data.datasets[0].data = [];
  }
  //returns color per number so the neighbouring colors are different
  selectColor(number) {
    const hue = (number - 1) * 137.508; // use golden angle approximation
    return `hsl(${hue},55%,55%)`;
  }

  bind() {
    this.refindex = parseInt(this.refindex, 10);
    this.refvalues = parseInt(this.refvalues, 10);
    this.refendindex = this.refindex + this.refvalues;

    this.chlabels = this.labels.split(',');
    this.colors = [];
    let mydatastr = this.initialdata.split(',');
    this.mydata = mydatastr.map(x => {return parseFloat(x);});
    for (let i = 0; i < this.refvalues; i++) {
      if (!this.mydata[i]) {
        //this.mydata.push(0);
        console.log('chartjsno data');
      }
      this.colors.push(this.selectColor(i));
    }
    let datasets = [{
      data: this.mydata,
      backgroundColor: this.colors
    }];

    this.data = {
      labels: this.chlabels,
      datasets: datasets
    };

    //set animation options for animation and non-animation
    let animopts1 = {
      animateScale: true,
      animateRotate: true,
      duration: 500
    };
    let animopts2 = {duration: 0};
    //bind - string value to boolean
    if (typeof this.animate === 'string') {
      this.animate = this.animate === 'true';
    }

    //select options based on attribute value - whether to animate or not
    let animopts = this.animate ? animopts1 : animopts2;

    this.options = {
      responsive: true,
      legend: {
        display: false,
        position: 'top'
      },
      animation: animopts,
      tooltips: {
        position: 'nearest',
        mode: 'index',
        intersect: false
      }
    };
  }

  attached() {
    //listening to custom event fmidata and fmireset
    document.getElementById(this.fromid).addEventListener('fmidata', this.handleValueChange);
    document.getElementById(this.fromid).addEventListener('fmireset', this.handleReset);
    //this.chartcanvas; - reference to the DOM canvas

    let ctx = this.chartcanvas.getContext('2d');
    this.chart = new Chart(ctx, {
      type: this.type,
      data: this.data,
      options: this.options
    });
  }

  detached() {
    if (document.getElementById(this.fromid)) document.getElementById(this.fromid).removeEventListener('fmidata', this.handleValueChange);
  }

  download() {
    //ask for filename
    let filename = prompt('File name (*.csv):', 'data.csv');
    if (filename) {
      //adds csv as extension
      if (!filename.endsWith('.csv')) filename = filename.concat('.csv');
      //labels first row
      let content = 'Time,' + this.labels + '\n';
      //transpose each row = variable in specific time
      for (let i = 0; i < this.chart.data.labels.length; i++) {
        let row = this.chart.data.labels[i];
        for (let j = 0; j < this.chart.data.datasets.length; j++) {
          row += ',' + this.chart.data.datasets[j].data[i];
        }
        content += row + '\n';
      }
      let blob = new Blob([content], {type: 'text/csv;charset=utf-8;'});
      saveAs(blob, filename);
    }
  }
  downloadflat() {
    //ask for filename
    let filename = prompt('File name (*.csv):', 'data.csv');
    if (filename) {
      //adds csv as extension
      if (!filename.endsWith('.csv')) filename = filename.concat('.csv');
      //labels first row - each row is then all data per variable - transposition might be needed
      let content = 'variable name,values ...' + '\n';
      let labels = this.labels.split(',');
      // variable per row
      //chart labels - usually time
      content = content + 'Time,' + this.chart.data.labels.join(',') + '\n';
      //dataset data on other rows
      for (let i = 0; i < this.chart.data.datasets.length; i++) {content = content + labels[i] + ',' + this.chart.data.datasets[i].data.join(',') + '\n';}
      let blob = new Blob([content], {type: 'text/csv;charset=utf-8;'});
      saveAs(blob, filename);
    }
  }
}
