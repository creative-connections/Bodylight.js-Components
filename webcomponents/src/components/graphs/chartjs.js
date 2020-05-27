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

  constructor() {
    this.animateScale = true;
    this.animateRotate = true;
    this.handleValueChange = e => {
      //let datapoint = [e.detail.time];
      //e.detail do not reallocate - using same buffer, thus slicing to append to data array
      //let edata = e.detail.data.slice();
      //for (let i = 0; i < edata.length; i++) datapoint.push(edata[i]);
      //this.data.push(datapoint);
      //shift - remove first element if data is too big
      //if (this.data.length > this.maxdata) this.data.shift();
      //console.log('Dygraphchar data', this.data);
      //this.dygraph.updateOptions( { 'file': this.data } );
      //console.log('chartjs handlevaluechange() e.detail,refindex,refendindex', e.detail, this.refindex, this.refendindex);

      this.chart.data.datasets[0].data = e.detail.data.slice(this.refindex, this.refendindex);
      //console.log('chartjs handlevaluechange() chart.data.datasets[0].data', this.chart.data.datasets[0].data);
      this.chart.update();
    };
  }

  selectColor(number) {
    const hue = (number-1) * 137.508; // use golden angle approximation
    return `hsl(${hue},70%,70%)`;
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
  }

  attached() {
    //listening to custom event fmidata
    document.getElementById(this.fromid).addEventListener('fmidata', this.handleValueChange);

    //this.chartcanvas; - reference to the DOM canvas

    let ctx = this.chartcanvas.getContext('2d');
    this.chart = new Chart(ctx, {
      type: this.type,
      data: this.data,
      options: {
        responsive: true,
        legend: {
          display: false,
          position: 'top'
        },
        animation: {
          animateScale: this.animateScale,
          animateRotate: this.animateRotate
        },
        tooltips: {
          position: 'average',
          mode: 'index',
          intersect: false
        }
      }
    });
  }

  detached() {
    if (document.getElementById(this.fromid)) document.getElementById(this.fromid).removeEventListener('fmidata', this.handleValueChange);
  }
}
