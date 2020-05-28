import Chart from 'chart.js';
import {bindable} from 'aurelia-framework';

export class Chartjs {
  @bindable fromid;
  @bindable labels;
  @bindable refindex;
  @bindable refvalues;
  @bindable type='doughnut';
  @bindable maxdata=300;
  @bindable initialdata='';
  @bindable width=600;
  @bindable height=300;

  constructor() {
    this.handleValueChange = e => {
      //sets data to dataset
      this.chart.data.datasets[0].data = e.detail.data.slice(this.refindex, this.refendindex);
      this.chart.update();
    };
  }

  selectColor(number) {
    const hue = (number-1) * 137.508; // use golden angle approximation
    return `hsl(${hue},55%,55%)`;
  }

  bind() {
    this.refindex = parseInt(this.refindex, 10);
    this.refvalues= parseInt(this.refvalues, 10);
    this.refendindex = this.refindex + this.refvalues;

    this.chlabels = this.labels.split(',');
    this.colors = [];
    let mydatastr = this.initialdata.split(',');
    this.mydata = mydatastr.map(x => {return parseFloat(x);});
    for (let i = 0; i < this.refvalues; i++) {
      if (!this.mydata[i]) this.mydata.push(0);
      this.colors.push(this.selectColor(i));
    }
    let datasets = [{
      data: this.mydata,
      backgroundColor: this.colors
    }];
    /*
    for (let i = 0; i < this.refvalues; i++) {
      this.colors.push(this.selectColor(i));
      datasets.push({data:[0,0.5*i,0.2*i,1.2*i,0.8*i,i], backgroundColor: this.colors})
    }
    */
    this.data = {
      labels: this.chlabels,
      datasets: datasets
    };
    this.options = {
      responsive: true,
      legend: {
        display: false,
        position: 'top'
      },
      animation: {
        animateScale: true,
        animateRotate: true,
        duration: 500
      },
      tooltips: {
        position: 'nearest',
        mode: 'index',
        intersect: false
      }
    };
  }

  attached() {
    //listening to custom event fmidata
    document.getElementById(this.fromid).addEventListener('fmidata', this.handleValueChange);

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
}
