import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { bindable } from 'aurelia-framework';
import _ from 'lodash';

//returns array of numbers if contains comma, or number - int
export function myParseInt(str, raddix) {
  if (typeof str == "string") {
    if (str.lastIndexOf(',') > 0) return str.split(',').map(x => parseInt(x, raddix));
    else return parseInt(str, raddix);
  } else return str;
}

export class Chartjs {
  @bindable fromid;
  @bindable labels;
  @bindable refindex;
  @bindable refvalues;
  @bindable type = 'doughnut';
  @bindable maxdata = 256;
  @bindable sampledata = false; //TODO, whether to sample data in each throttle, otherwise all data are stored
  @bindable initialdata = '';
  @bindable width;
  @bindable height = 200;
  @bindable animate = false;
  @bindable id;
  @bindable ylabel;
  @bindable xlabel;
  @bindable convertors;
  @bindable verticalline = false;
  @bindable generatelabels = false;
  @bindable sectionid;  //id to listen addsection event
  @bindable responsive = false; //false - to keep width and height, true - to rescale

  @bindable throttle = 200; //time to throttle chart update, if it is too much at once
  @bindable trailing = false; //if true, updatechart only after no data for throttle ms
  @bindable precision = 4;
  @bindable min; //min for y axis - if chart has this axis
  @bindable max; //max for y axis - if chart has this axis
  @bindable babylonjs; //whether to integrate with 3d babylonjs
  @bindable canvasobj; //canvas obj name -
  @bindable colorsegmentindex = -2; //index to shift the color
  @bindable colorindex = 0; //index to shift the color
  @bindable minichart;
  @bindable displayxticks = true;
  @bindable showdownloadicons = false;
  indexsection = 0;
  datalabels = false; //may be configured by subclasses
  refindices;
  canvasContainer;
  canvasContainer1;

  /**
   * initializes handlers for event processing - this is recommended way
   */
  constructor() {
    this.handleValueChange = e => {
      //sets data to dataset
      //apply value convert among all data
      let rawdata;
      if (this.refindices) {
        rawdata = this.refindices.map(x => e.detail.data[x]);
      } else
        rawdata = e.detail.data.slice(this.refindex, this.refendindex);
      //if convert operation is defined as array
      if (this.operation) {
        for (let i = 0; i < rawdata.length; i++) {
          //if particular operation is defined
          if (this.operation[i]) rawdata[i] = this.operation[i](rawdata[i]);
        }
      }
      this.chart.data.datasets[0].data = rawdata;
      this.updatechart();
    };
    this.handleReset = e => {
      console.log('handlereset2()');
      if (this.chart.data.datasets)
        for (let dataset of this.chart.data.datasets)
          if (dataset && dataset.data) dataset.data = [];
      if (this.chart.data.labels.length > 0) this.chart.data.labels = [];
      if (this.sectionid) {
        this.chart.config.options.section = [];
        this.indexsection = 0;
      }
      //do not update chart as it blinks - next valuechange will show it

      //this.updatechart();
      //this.chart.config.options.section = [];

    };
    this.handleAddSection = e => {
      this.addSection(e.detail.label);
    };

    this.handleFMIAttached = e => {
      const fromel = document.getElementById(this.fromid);
      if (fromel) {
        fromel.addEventListener('fmidata', this.handleValueChange);
        fromel.addEventListener('fmireset', this.handleReset);
      } else {
        console.warn('fmi attached, but no element with id found:', this.fromid);
      }
    }
  }

  /**
   * Returns unique color per index- neighbouring colors are different using golden angle approximation
   * @param index
   * @returns {string} usable by CSS or DOM elements
   */
  //  const hue = (i - 1) * 137.508; // use golden angle approximation
  //  var color = `hsl(${hue},85%,91%)`;
  selectColor(index, saturation = 55, lightness = 55, transparency = 1) {
    const hue = (index - 1) * 137.508; // use golden angle approximation
    return `hsla(${hue},${saturation}%,${lightness}%,${transparency})`;
  }


  /**
   * process all attributes of <bdl-chart> component and sets appropriate settings of subesquent chartjs
   */
  bind() {
    //console.log('chartjs bind');
    if (typeof this.displayxticks === 'string') this.displayxticks = this.displayxticks === 'true';
    if (typeof this.showdownloadicons === 'string') this.showdownloadicons = this.showdownloadicons === 'true';
    if ((typeof this.refindex == 'string') && (this.refindex.indexOf(',') > 0)) { this.refindices = this.refindex.split(',') }
    else {
      this.refindex = myParseInt(this.refindex, 10);
      this.refvalues = parseInt(this.refvalues, 10);
      this.refendindex = this.refindex + this.refvalues;
    }

    //empty plugins by default
    this.plugins = [];

    //configure convertors - used to convert units received from fmi
    if (this.convertors) {
      let convertvalues = this.convertors.split(';');
      let identity = x => x;
      this.operation = [];
      for (let i = 0; i < convertvalues.length; i++) {
        if (convertvalues[i].includes(',')) {
          //convert values are in form numerator,denominator contains comma ','
          let convertitems = convertvalues[i].split(',');
          if (convertitems[0] === '1' && convertitems[1] === '1') this.operation.push(identity);
          else {
            const numerator = parseFloat(convertitems[0]);
            const denominator = parseFloat(convertitems[1]);
            const addend = (convertitems.length > 2) ? parseFloat(convertitems[2]) : 0;
            /*console.log('adding operation numerator',numerator);
            console.log('adding operation denominator',denominator);
            console.log('adding operation addend',addend);*/
            this.operation.push(x => ((x * numerator / denominator) + addend));
          }
        } else {
          //convert values are in form of expression, do not contain comma
          if (convertvalues === '1/x') this.operation.push(x => 1 / x);

          else {
            // for eval() security filter only allowed characters:
            // algebraic, digits, e, dot, modulo, parenthesis and 'x' and 'e' is allowed
            let expression = convertvalues[i].replace(/[^-\d/*+.()%xe]/g, '');
            console.log('chartjs bind(), evaluating expression:' + convertvalues[i] + ' securely filtered to :' + expression);
            // eslint-disable-next-line no-eval
            this.operation.push(x => eval(expression));
          }
        }
      }
    }

    //sets boolean value - if verticalline attribute is set
    if (typeof this.generatelabels === 'string') {
      this.generatelabels = this.generatelabels === 'true';
    }
    if (typeof this.sampledata === 'string') {
      this.sampledata = this.sampledata === 'true';
    }
    if (typeof this.minichart === 'string') this.minichart = (this.minichart === 'true');
    if (typeof this.colorindex === 'string') {
      this.colorindex = parseInt(this.colorindex, 10);
    }
    if (!this.colorindex) this.colorindex = 0; //in case not defined or null
    if (typeof this.colorsegmentindex === 'string') {
      this.colorsegmentindex = parseInt(this.colorsegmentindex, 10);
    }

    //sets color of each dataset as different as possible
    //and set initial data in chart
    //set labels - separated by comma
    if (this.labels) this.chlabels = this.labels.split(',');
    //else generate labels as 'variable 1' ...
    else {
      //this.chlabels = [...Array(this.refvalues)].map((_, i) => this.generatelabels ? `variable ${i}` : '');
      //this seems not to be correctly transpilled to ES5, therefore following generator ->
      this.chlabels = [];
      for (let i = 0; i < this.refvalues; i++) {
        let ilabel = this.generatelabels ? ('variable ' + i) : '';
        this.chlabels.push(ilabel);
      }
    }

    this.colors = [];
    let mydatastr = this.initialdata.split(',');
    this.mydata = mydatastr.map(x => { return parseFloat(x); });
    if (this.refindices) this.refvalues = this.refindices.length;
    for (let i = 0; i < this.refvalues; i++) {
      if (!this.mydata[i]) {
        //this.mydata.push(0);
        //console.log('chartjs no data');
      }
      this.colors.push(this.selectColor(i + this.colorindex));
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
    if (typeof this.responsive === 'string') {
      this.responsive = this.responsive === 'true';
    }
    //set animation options
    let animopts1 = {
      animateScale: true,
      animateRotate: true,
      duration: 500
    };
    let animopts2 = { duration: 0 };

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
    if (this.minichart) {
      if (axisopts.xAxes) axisopts.xAxes[0].display = false;
      else axisopts.xAxes = [{ display: false }];
      if (axisopts.yAxes) axisopts.yAxes[0].display = false;
      else axisopts.yAxes = [{ display: false }];
    }
    if (!this.displayxticks) {
      if (axisopts.xAxes) axisopts.xAxes.ticks = { display: false }
      else axisopts.xAxes = [{ ticks: { display: false } }]
    }

    //initialize options - used later by chartjs instance
    this.options = {
      live: true,
      responsive: this.responsive, //true - rescale, false - will keep canvas width and height
      legend: {
        display: !(this.minichart),
        position: 'top',
        labels: {
          boxWidth: 8, //40 default
          fontSize: 10, //12 default
          padding: 2 //10 default
        }
      },
      animation: animopts,

      scales: axisopts,
      babylondynamictexture: ""// name of global dynamictextureobj to call update()
    };
    if (!this.minichart) {
      //add other options
      this.options.tooltips = {
        position: 'nearest',
        mode: 'index',
        intersect: false,
        titleFontFamily: 'Open Sans',
        titleFontSize: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
        bodyFontSize: 10,
        //titleFontColor: 'red',
        caretSize: 5,
        cornerRadius: 4,
        xPadding: 3,
        yPadding: 3,
        callbacks: {
          label: function (tooltipItem, data) {
            //let label = data.labels[tooltipItem.index];
            let value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            //console.log('chartjs tooltip, value',tooltipItem,value);
            if (typeof value === 'object') return value.x.toPrecision(4) + ':' + value.y.toPrecision(4)
            if (typeof value === 'number') return value.toPrecision(4); //TODO this.precision is not accessible from here
            return value;
          }
        },
        // This is called when tooltip leaves an element
        /*onLeave: function(event, tooltipItem) {
          if (tooltipItem.length === 0) {
            this._chart.tooltip._active = [];
            this._chart.update();
          }
        }*/
      };
      this.options.hover = {
        animationDuration: 0, //disable animation on hover - e.g. for tooltips
        intersect: false
      }
      this.options.events = ['mousemove', 'touchstart', 'touchmove', 'click'];
    } else {
      this.options.tooltips = { enabled: false }
      this.options.events = []
    }
    //sets boolean value - if verticalline attribute is set
    if (typeof this.verticalline === 'string') {
      this.verticalline = this.verticalline === 'true';
    }

    if (typeof this.maxdata === 'string') {
      this.maxdata = parseInt(this.maxdata, 10);
    }

    //if sections are requested - define chartjs plugin to draw it in background
    if (this.sectionid) {
      this.options.section = [];
    }

    if (this.min) {
      //sets yscale min
      if (!this.options) this.options = {};
      if (!this.options.scales) this.options.scales = {};
      if (!this.options.scales.yAxes) this.options.scales.yAxes = [{}]; //chartjs 2.9.4
      if (!this.options.scales.yAxes[0].ticks) this.options.scales.yAxes[0].ticks = {}; //chartjs 2.9.4
      this.options.scales.yAxes[0].ticks.min = parseFloat(this.min);
    }
    if (this.max) {
      //sets yscale max
      if (!this.options) this.options = {};
      if (!this.options.scales) this.options.scales = {};
      if (!this.options.scales.yAxes) this.options.scales.yAxes = [{}]; //chartjs 2.9.4
      if (!this.options.scales.yAxes[0].ticks) this.options.scales.yAxes[0].ticks = {}; //chartjs 2.9.4
      this.options.scales.yAxes[0].ticks.max = parseFloat(this.max);
      //if (this.min) this.options.scales.yAxes[0].ticks.stepSize = (this.options.scales.yAxes[0].ticks.max - this.options.scales.yAxes[0].ticks.min) / 10;
    }


    /*if (this.minichart) {
      this.options.plugins.legend.display = false
    }*/
  }

  addListeners() {
    //listening to custom event fmidata and fmireset
    const fromel = document.getElementById(this.fromid);
    if (fromel) {
      fromel.addEventListener('fmidata', this.handleValueChange);
      fromel.addEventListener('fmireset', this.handleReset);
      // Listen to your custom events (attach these listeners where appropriate)
      fromel.addEventListener('fmistart', () => {
        if (this.chart) {
          this.chart.options.tooltips.enabled = false;  // disable tooltips
          this.chart.options.hover.mode = null;               // disable hover interaction
          this.chart.options.hover.animationDuration = 0;     // disable hover animations    
          // Disable interaction events on the canvas
          this.chart.canvas.style.pointerEvents = 'none';
          this.chart.update(0);                          // immediate update to apply change
        }
      });

      fromel.addEventListener('fmistop', () => {
        if (this.chart) {
          console.log('chartjs fmistop()');
          this.chart.options.tooltips.enabled = true;   // re-enable tooltips
          this.chart.options.hover.mode = 'nearest';           // restore hover mode
          //    this.chart.options.hover.animationDuration = 400;    // restore animation duration default    
          this.chart.canvas.style.pointerEvents = 'auto'; // re-enable interactions

          this.chart.update(0);                          // immediate update to apply change
        }
      });
    } else {
      console.warn('chartjs, null fromid element, waiting to be attached');
      document.addEventListener('fmiattached', this.handleFMIAttached);
    }

    if (this.sectionid) {
      const sectionel = document.getElementById(this.sectionid);
      if (sectionel) sectionel.addEventListener('addsection', this.handleAddSection);
      else console.log('chartjs WARNING, null sectionid element');
    }
  }
  /**
   * this is called when the DOM is attached to view - instantiate the chartjs and sets all necesary binding
   */
  attached() {
    //set width as offsset width
    if (!this.width) {
      console.log('chartjs setting width:', this.canvasContainer)
      console.log('chartjs setting width canvascontainer1:', this.canvasContainer1)
      this.width = this.canvasContainer.offsetWidth;
    }
    //console.log('chartjs attached');
    this.addListeners();
    //unregister
    Chart.plugins.unregister(ChartDataLabels);

    //for verticalline option - register controller for BdlChartjs
    if (this.verticalline) {
      Chart.defaults.LineWithLine = Chart.defaults.line;
      Chart.controllers.LineWithLine = Chart.controllers.line.extend({
        draw: function (ease) {
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
          if (chart.config.options.section && chart.config.options.section.length > 0) {
            let ctx = chart.chart.ctx;
            let chartArea = chart.chartArea;
            let meta = chart.getDatasetMeta(0);
            let i;
            ctx.save();
            //console.log('chartjs sections', chart.config.options.section);
            if (meta.data.length == 0) return;
            //first section

            for (i = 1; i < chart.config.options.section.length; i++) {
              //console.log('chartjs sectionplugin:i, section[i-1], section[1],start,stop)', i, chart.config.options.section[i - 1],chart.config.options.section[i]);
              const startindex = chart.config.options.section[i - 1].index;
              const stopindex = chart.config.options.section[i].index;
              if (startindex >= meta.data.length) continue;
              if (stopindex >= meta.data.length) continue;
              let start = meta.data[startindex]._model.x;
              let stop = meta.data[stopindex]._model.x;
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
              ctx.rotate(90 * Math.PI / 180);
              ctx.fillStyle = '#aaa';
              ctx.font = '12px Helvetica';
              ctx.fillText(chart.config.options.section[i - 1].label, 5, -5);//start, chartArea.top);
              ctx.restore();
            }
            ctx.restore();
            //console.log('last i',i);
            //last section
            i = chart.config.options.section.length;
            if ((i > 1) && (chart.config.options.section[i - 1].index < (meta.data.length - 1)) && (chart.config.options.section[i - 1].index < meta.data.length)) {
              //draw last section
              let start = meta.data[chart.config.options.section[i - 1].index]._model.x;
              let stop = meta.data[meta.data.length - 1]._model.x;

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
              ctx.rotate(90 * Math.PI / 180);
              ctx.fillStyle = '#aaa';
              ctx.font = '12px Helvetica';
              ctx.fillText(chart.config.options.section[i - 1].label, 5, -5);//start, chartArea.top);
              ctx.restore();
            }
          }
        }
      });
    }

    if (this.datalabels) {
      console.log('datalabels true ,setting plugin', this.datalabels);
      console.log('datalabels true ,setting plugin', this.datalabels);
      Chart.pluginService.register({
        afterDatasetsDraw: function (chartInstance, easing) {
          // To only draw at the end of animation, check for easing === 1
          //if (dataset && dataset.datalabels) {
          let ctx = chartInstance.chart.ctx;

          chartInstance.data.datasets.forEach(function (dataset, i) {
            if (dataset && dataset.datalabels) {
              let meta = chartInstance.getDatasetMeta(i);
              if (!meta.hidden) {
                meta.data.forEach(function (element, index) {
                  if (dataset.datalabels[index].length > 0) {
                    // Draw the text in black, with the specified font
                    ctx.fillStyle = '#aaa';
                    ctx.font = '12px Helvetica';

                    // Just naively convert to string for now
                    let dataString = dataset.datalabels[index];

                    // Make sure alignment settings are correct
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';

                    let padding = 5;
                    let position = element.tooltipPosition();
                    ctx.fillText(dataString, position.x, position.y - (12 / 2) - padding);
                  }
                });
              }
            }
          });
        }
      });
    }

    //babylonjs bind
    /*if (typeof this.babylonjs === 'string') {
      //this.babylonjs = this.babylonjs === 'true';
    } else this.babylonjs = false;*/
    if (this.babylonjs) {
      this.options.babylondynamictexture = this.babylonjs
      Chart.plugins.register({
        beforeDraw: function (chartInstance) {
          var ctx = chartInstance.chart.ctx;
          //console.log('ctx before draw:')
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
        },
        afterDraw: function (chartInstance) {
          var ctx = chartInstance.chart.ctx;
          //console.log('ctx after draw:')
          if (window[chartInstance.options.babylondynamictexture]) window[chartInstance.options.babylondynamictexture].update();
        }
      });
    }

    //canvasobj - if defined then use this object name to get canvas object -  otherwise the one from template

    let ctx = (this.canvasobj) ? window[this.canvasobj] : this.chartcanvas.getContext('2d');
    //ctx may be null if canvasobj is not yet initialized.
    if (ctx) this.initChart(ctx); //init chart only if ctx is ready
    else {
      //add myself to lazyinitchart array
      if (!window.lazyInitChart) window.lazyInitChart = [];
      window.lazyInitChart.push(this);
    }
    /*
        //do lazy init of charts after third party canvas initialization
        if (window.lazyInitChart) {
            for (let obj in window.lazyInitChart) obj.initChart().bind(obj);
        }
     */
    //add listener to canvas to switch off tooltips on mouseout
    /*if (this.chartcanvas) {
      this.chartcanvas.addEventListener('mouseout', e => {
        console.log('chartjs mouseout');
        if (this.chart) {
            // Safely clear active tooltip elements
            this.chart.tooltip._active = [];//setActiveElements([], {x: 0, y: 0});
            // Update chart immediately without animation
            // Delay update to prevent race condition causing tooltip errors
            setTimeout(() => {
              //myChart.update(0);
              this.chart.update({duration: 0});
            }, 100); // a 10ms delay works reliably
            
        }
      });
    }*/

  }

  initChart() {
    let ctx = (this.canvasobj) ? window[this.canvasobj] : this.chartcanvas.getContext('2d');
    initChart(ctx);
  }

  initChart(ctx) {
    /*let that = this;
    if (window.lazyInitChart) {let that = window.lazyInitChart;}*/
    this.chart = new Chart(ctx, {
      plugins: this.plugins,
      type: this.type,
      data: this.data,
      options: this.options,
      tooltipEvents: this.tooltips
    });
    //register throttled update function
    if (typeof this.throttle === 'string') this.throttle = parseInt(this.throttle, 10);
    let mytrailing = false;
    if (typeof this.trailing === 'string') mytrailing = this.trailing === 'true';
    else mytrailing = !!this.trailing;

    if (this.throttle > 0) {
      if (mytrailing) {
        // trailing only: update only after no data for throttle ms
        this.updatechart = _.throttle(() => {
          if (this.chart.tooltip) {
            this.chart.tooltip._active = [];
            this.chart.active = [];
          }
          this.chart.update(0);
        }, this.throttle, { leading: false, trailing: true });
      } else {
        // default throttle: update at most once per throttle ms
        this.updatechart = _.throttle(() => {
          if (this.chart.tooltip) {
            this.chart.tooltip._active = [];
            this.chart.active = [];
          }
          this.chart.update(0);
        }, this.throttle);
      }
    } else {
      this.updatechart = () => {
        if (this.chart.tooltip) {
          this.chart.tooltip._active = [];
          this.chart.active = [];
        }
        this.chart.update(0);
      };
    }
    // console.log('chartjs data', this.data);
    /*    //now delay tooltip
        let originalShowTooltip = that.chart.showTooltip;
        //let that.timeout;
        that.timeout=0;
        that.chart.showTooltip = function (activeElements) {
          let delay = (activeElements.length === 0) ? 2000 : 0;
          clearTimeout(that.timeout);
          that.timeout = setTimeout(function () {
            originalShowTooltip.call(that.chart, activeElements);
          }, delay);
        }
    
     */
  }
  removeListeners() {
    if (document.getElementById(this.fromid)) {
      document.getElementById(this.fromid).removeEventListener('fmidata', this.handleValueChange);
      document.getElementById(this.fromid).removeEventListener('fmireset', this.handleReset);
    } else {
      console.log('chartjs WARNING, null fromid element,removing from global');
      document.removeEventListener('fmidata', this.handleValueChange);
      document.removeEventListener('fmireset', this.handleReset);
    }
    if (this.sectionid) { document.getElementById(this.sectionid).removeEventListener('addsection', this.handleAddSection); }
    document.removeEventListener('fmiattached', this.handleFMIAttached)

  }
  /**
   * called when component is detached from view - remove event listeners - no need to update chart
   */
  detached() {
    this.removeListeners();
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
      let blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
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
      for (let i = 0; i < this.chart.data.datasets.length; i++) { content = content + labels[i] + ',' + this.chart.data.datasets[i].data.join(',') + '\n'; }
      let blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, filename);
    }
  }

  /**
   * Adds new section in chartarea - current last data in dataset
   */
  addSection(label = '') {
    this.indexsection++;
    if (!label) label = '';
    console.log('chartjs.addsection()', this.chart.data.labels.length - 1, label);
    let ind;
    //if (this.chart.data.labels.length>0) ind = 0
    //else
    ind = Math.max(0, this.chart.data.labels.length - 1);
    this.chart.config.options.section.push({
      index: ind,
      color: this.selectColor((this.indexsection + this.colorsegmentindex), 85, 93),
      label: label
    });
  }

  update() {
    if (this.sampledata)
      this.chart.update();
  }

  /* resizeCanvas is triggered only when using aurelia-resize plugin*/
  resizeCanvas(detail) {
    console.log("chartjs.resizeCanvas() width=" + detail.width);
    this.width = detail.width;
    //this.height = detail.height;
  }
}
