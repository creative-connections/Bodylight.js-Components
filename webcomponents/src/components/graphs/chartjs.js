import Chart from 'chart.js';
import {bindable} from 'aurelia-framework';

export class Chartjs {
  @bindable fromid;
  @bindable labels;
  @bindable refindex;
  @bindable refvalues;
  @bindable type='doughnut';
  @bindable maxdata=256;
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
  indexsection=0;

  /**
   * initializes handlers for event processing - this is recommended way
   */
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
      this.chart.update();
    };
    this.handleReset = e => {
      console.log('handlereset');
      this.resetdata();
      this.chart.update();
    };
    this.handleAddSection = e => {
      this.addSection(e.detail.label);
    };
  }

  /**
   * empties data in every dataset and empties section
   */
  resetdata() {
    for (let dataset of this.chart.data.dataset) dataset.data = [];
    if (this.sectionid) this.chart.config.options.section = [];
  }

  /**
   * Returns unique color per index- neighbouring colors are different using golden angle approximation
   * @param index
   * @returns {string} usable by CSS or DOM elements
   */
  //  const hue = (i - 1) * 137.508; // use golden angle approximation
  //  var color = `hsl(${hue},85%,91%)`;
  selectColor(index, saturation = 55, lightness = 55) {
    const hue = (index - 1) * 137.508; // use golden angle approximation
    return `hsl(${hue},${saturation}%,${lightness}%)`;
  }

  /**
   * process all attributes of <bdl-chart> component and sets appropriate settings of subesquent chartjs
   */
  bind() {
    this.refindex = parseInt(this.refindex, 10);
    this.refvalues = parseInt(this.refvalues, 10);
    this.refendindex = this.refindex + this.refvalues;

    //configure convertors - used to convert units received from fmi
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

    //sets color of each dataset as different as possible
    //and set initial data in chart
    this.chlabels = this.labels.split(',');
    this.colors = [];
    let mydatastr = this.initialdata.split(',');
    this.mydata = mydatastr.map(x => {return parseFloat(x);});
    for (let i = 0; i < this.refvalues; i++) {
      if (!this.mydata[i]) {
        //this.mydata.push(0);
        console.log('chartjs no data');
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

    //bind - string value to boolean
    if (typeof this.animate === 'string') {
      this.animate = this.animate === 'true';
    }
    //set animation options
    let animopts1 = {
      animateScale: true,
      animateRotate: true,
      duration: 500
    };
    let animopts2 = {duration: 0};

    //select options based on attribute value - whether to animate or not
    let animopts = this.animate ? animopts1 : animopts2;

    //set labels for axes in chartjs opts
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

    //initialize options - used later by chartjs instance
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
    //sets boolean value - if verticalline attribute is set
    if (typeof this.verticalline === 'string') {
      this.verticalline = this.verticalline === 'true';
    }

    if (typeof this.maxdata === 'string') {
      this.maxdata = parseInt(this.maxdata);
    }

    //if sections are requested - define chartjs plugin to draw it in background
    if (this.sectionid) {
      this.options.section = [];
    }
  }

  /**
   * this is called when the DOM is attached to view - instantiate the chartjs and sets all necesary binding
   */
  attached() {
    //listening to custom event fmidata and fmireset
    document.getElementById(this.fromid).addEventListener('fmidata', this.handleValueChange);
    document.getElementById(this.fromid).addEventListener('fmireset', this.handleReset);
    //this.chartcanvas; - reference to the DOM canvas
    if (this.sectionid) {document.getElementById(this.sectionid).addEventListener('addsection', this.handleAddSection);}


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
        beforeDraw: function(chart, easing) {
          if (chart.config.options.section && chart.config.options.section.length > 0) {
            let ctx = chart.chart.ctx;
            let chartArea = chart.chartArea;
            let meta = chart.getDatasetMeta(0);
            let i;
            ctx.save();
            //console.log('chartjs sections', chart.config.options.section);
            for (i = 1; i < chart.config.options.section.length; i++) {
              //console.log('chartjs sectionplugin:i, section[i-1], section[1],start,stop)', i, chart.config.options.section[i - 1],chart.config.options.section[i]);
              let start = meta.data[chart.config.options.section[i - 1].index]._model.x;
              let stop  = meta.data[chart.config.options.section[i].index]._model.x;
              /*const hue = (i - 1) * 137.508; // use golden angle approximation
              ctx.fillStyle = `hsl(${hue},85%,91%)`;
               */

              //bar
              ctx.fillStyle = chart.config.options.section[i - 1].color;
              ctx.fillRect(start, chartArea.top, stop - start, chartArea.bottom - chartArea.top);
              //label
              //ctx.translate(start, chartArea.top);
              //ctx.rotate(Math.PI / 2);
              ctx.save();
              ctx.translate(start, chartArea.top);
              ctx.rotate(90*Math.PI / 180);
              ctx.fillStyle = '#aaa';
              ctx.font = '12px Helvetica';
              ctx.fillText(chart.config.options.section[i - 1].label, 5, -5);//start, chartArea.top);
              ctx.restore();
            }
            ctx.restore();
            //console.log('last i',i);
            //last section
            i = chart.config.options.section.length;
            if ((i > 0) && (chart.config.options.section[i - 1].index < (meta.data.length - 1))) {
              //draw last section
              let start = meta.data[chart.config.options.section[i - 1].index]._model.x;
              let stop  = meta.data[meta.data.length - 1]._model.x;

              //console.log (start,stop);
              /*
              const hue = (i - 1) * 137.508; // use golden angle approximation
              var color = `hsl(${hue},85%,91%)`;
               */
              ctx.fillStyle = chart.config.options.section[i - 1].color;
              //console.log (chartArea);
              ctx.fillRect(start, chartArea.top, stop - start, chartArea.bottom - chartArea.top);
              ctx.save();
              ctx.translate(start, chartArea.top);
              ctx.rotate(90*Math.PI / 180);
              ctx.fillStyle = '#aaa';
              ctx.font = '12px Helvetica';
              ctx.fillText(chart.config.options.section[i - 1].label, 5, -5);//start, chartArea.top);
              ctx.restore();
            }
          }
        }
      });
    }

    let ctx = this.chartcanvas.getContext('2d');

    this.chart = new Chart(ctx, {
      type: this.type,
      data: this.data,
      options: this.options,
      tooltipEvents: ['mousemove', 'touchstart', 'touchmove', 'click']
    });
  }

  /**
   * called when component is detached from view - remove event listeners - no need to update chart
   */
  detached() {
    if (document.getElementById(this.fromid)) {
      document.getElementById(this.fromid).removeEventListener('fmidata', this.handleValueChange);
      document.getElementById(this.fromid).removeEventListener('fmireset', this.handleReset);
      if (this.sectionid) {document.getElementById(this.sectionid).removeEventListener('addsection', this.handleAddSection);}
    }
  }

  /**
   * asks for filename and creates blob with CSV data from chart which initiates web browser download dialog.
   * CSV -  time point per row
   */
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

  /**
   * asks for filename and creates blob with CSV data from chart which initiates web browser download dialog
   * CSV - variable values per row
   */
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

  /**
   * Adds new section in chartarea - current last data in dataset
   */
  addSection(label = '') {
    this.indexsection++;
    if (!label) label = '';
    console.log('chartjs.addsection()', this.chart.data.labels.length - 1);
    this.chart.config.options.section.push({
      index: this.chart.data.labels.length - 1,
      color: this.selectColor(this.indexsection, 85, 91),
      label: label
    });
  }
}
