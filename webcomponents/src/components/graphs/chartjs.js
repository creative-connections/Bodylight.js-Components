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
  @bindable ylabel;
  @bindable xlabel;
  @bindable convertors;
  @bindable verticalline=false;
  @bindable sectionid;  //id to listen addsection event
  constructor() {
    this.handleValueChange = e => {
      //sets data to dataset
      //apply value convert among all data
      let rawdata = e.detail.data.slice(this.refindex, this.refendindex);
      //if convert operation is defined as array
      if (this.operation) {
        for (let i = 0; i < rawdata.length; i++) {
        //if particular operation is defined
          if (this.operation[i]) rawdata[i] = this.operation[i](rawdata[i]);
        }
      }
      this.chart.data.datasets[0].data = rawdata;
      //apply value convert among all data

      this.chart.update();
    };
    this.handleReset = e => {
      console.log('handlereset');
      this.resetdata();
      this.chart.update();
    };
    this.handleAddSection = e => {
      this.addSection();
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

    if (this.convertors) {
      let convertvalues = this.convertors.split(';');
      let identity = x => x;
      this.operation = [];
      for (let i = 0; i < convertvalues.length; i++) {
        let convertitems = convertvalues[i].split(',');
        if (convertitems[0] === '1' && convertitems[1] === '1') this.operation.push(identity);
        else {
          let numerator = parseFloat(convertitems[0]);
          let denominator = parseFloat(convertitems[1]);
          this.operation.push( x=> x * numerator / denominator );
        }
      }
    }

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

    //if defined in xlabel and ylabel - set labels for axes in chartjs opts
    let axisopts = {};
    if (this.ylabel) {
      axisopts.yAxes = [{
        scaleLabel: {
          display: true,
          labelString: this.ylabel
        }
      }];
    }
    if (this.xlabel) {
      axisopts.xAxes = [{
        scaleLabel: {
          display: true,
          labelString: this.xlabel
        }
      }];
    }

    this.options = {
      responsive: true,
      legend: {
        //display: false,
        position: 'top'
      },
      animation: animopts,
      tooltips: {
        position: 'nearest',
        mode: 'x-axis',
        intersect: false
      },
      scales: axisopts
    };
    if (typeof this.verticalline === 'string') {
      this.verticalline = this.verticalline === 'true';
    }

    //if sections are requested - define chartjs plugin to draw it in background
    if (this.sectionid) {
      this.options.section=[];
    }

  }

  attached() {
    //listening to custom event fmidata and fmireset
    document.getElementById(this.fromid).addEventListener('fmidata', this.handleValueChange);
    document.getElementById(this.fromid).addEventListener('fmireset', this.handleReset);
    //this.chartcanvas; - reference to the DOM canvas
    if (this.sectionid)
    document.getElementById(this.sectionid).addEventListener('addsection', this.handleAddSection);

    let ctx = this.chartcanvas.getContext('2d');

    //for verticalline option - register controller for Chartjs
    if (this.verticalline) {
      Chart.defaults.LineWithLine = Chart.defaults.line;
      Chart.controllers.LineWithLine = Chart.controllers.line.extend({
        draw: function(ease) {
          Chart.controllers.line.prototype.draw.call(this, ease);
          if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
            let activePoint = this.chart.tooltip._active[0];
            let ctx = this.chart.ctx;
            let x = activePoint.tooltipPosition().x;
            let topY = this.chart.legend.bottom;
            let bottomY = this.chart.chartArea.bottom;

            // draw line
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x, topY);
            ctx.lineTo(x, bottomY);
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#555';
            ctx.stroke();
            ctx.restore();
          }
        }
      });
    }

    //for sections register chartjs plugin
    if (this.sectionid) {
      Chart.pluginService.register({
        beforeDraw: function (chart, easing) {
          if (chart.config.options.section && chart.config.options.section.length>0) {
            var ctx = chart.chart.ctx;
            var chartArea = chart.chartArea;
            var meta = chart.getDatasetMeta(0);
            var i;
            ctx.save();
            for (i=1;i<chart.config.options.section.length;i++) {
              var start = meta.data[chart.config.options.section[i-1]]._model.x;
              var stop  = meta.data[chart.config.options.section[i]]._model.x;

              //console.log (start,stop);
              const hue = (i - 1) * 137.508; // use golden angle approximation
              var color = `hsl(${hue},85%,91%)`;
              ctx.fillStyle = color;
              //console.log (chartArea);
              ctx.fillRect(start, chartArea.top, stop - start, chartArea.bottom - chartArea.top);
            }
            ctx.restore();
            //console.log('last i',i);
            //last section
            if (chart.config.options.section[i-1]<(meta.data.length-1)) {
              //draw last section
              var start = meta.data[chart.config.options.section[i-1]]._model.x;
              var stop  = meta.data[meta.data.length-1]._model.x;

              //console.log (start,stop);
              const hue = (i - 1) * 137.508; // use golden angle approximation
              var color = `hsl(${hue},85%,91%)`;
              ctx.fillStyle = color;
              //console.log (chartArea);
              ctx.fillRect(start, chartArea.top, stop - start, chartArea.bottom - chartArea.top);
            }
          }
        }
      });
    }

    this.chart = new Chart(ctx, {
      type: this.type,
      data: this.data,
      options: this.options,
      tooltipEvents: ['mousemove', 'touchstart', 'touchmove', 'click']
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

  //adds new section - index of last data element
  addSection(){
    console.log('chartjs.addsection()',this.chart.data.data.labels.length-1);
    this.chart.config.options.section.push(this.chart.data.data.labels.length-1);
  }
}
