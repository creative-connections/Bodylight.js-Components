//import * as Plotlyjs from 'plotly.js-dist';
import {bindable} from 'aurelia-framework';

export class Plotly {
  @bindable fromid;
  @bindable labels;
  @bindable refindex;
  @bindable refvalues;
  @bindable maxdata = 255;
  @bindable width=600;
  @bindable height=300;
  @bindable convertors;

  constructor() {
    this.handleValueChange = e => {
      this.updateData(e);
    };
    this.handleReset = e => {
      this.resetData(e);
    };
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
        if (convertvalues[i].includes(',')) {
          //convert values are in form numerator,denominator contains comma ','
          let convertitems = convertvalues[i].split(',');
          if (convertitems[0] === '1' && convertitems[1] === '1') this.operation.push(identity);
          else {
            let numerator = parseFloat(convertitems[0]);
            let denominator = parseFloat(convertitems[1]);
            this.operation.push(x => x * numerator / denominator);
          }
        } else {
          //convert values are in form of expression, do not contain comma
          if (convertvalues === '1/x') this.operation.push(x => 1 / x);

          else {
            //filter only allowed characters: algebraic, digits, e, dot, modulo, parenthesis and 'x' is allowed
            let expression = convertvalues[i].replace(/[^-\d/*+.()%xe]/g, '');
            console.log('chartjs bind(), evaluating expression:' + convertvalues[i] + ' securely filtered to :' + expression);
            // eslint-disable-next-line no-eval
            this.operation.push(x => eval(expression));
          }
        }
      }
    }


    //sets color of each dataset as different as possible
    //and set initial data in chart
    //set labels - separated by comma
    if (this.labels) this.chlabels = this.labels.split(',');
    //else generate labels as 'variable 1' ...
    else {
      this.chlabels = [...Array(this.refvalues)].map((_, i) => `variable ${i}`);
    }
  }

  attached() {
    //console.log('plotlyjs:', Plotly);
    this.xdata = [];
    //this.xdata = [0, 1, 2, 3, 4];
    //empty ydata as array of datasets with length refvalues
    this.ydata = [];
    this.data = [];
    for (let i = 0; i < this.refvalues; i++) {
      this.ydata.push([]);
      //this.ydata = [[1, 2, 4, 8, 16], [0, 2, 4, 6, 8]];
      this.data.push({
        x: this.xdata, y: this.ydata[i], line: {
          //color: 'rgb(128, 0, 128)',
          width: 1
        }
      });
    }
    this.layout = { autosize: true, margin: { t: 0 },  width: this.width, height: this.height};
    if (window.Plotly) {
      this.chart = window.Plotly.newPlot( this.plotlydiv, this.data, this.layout );
      //listening to custom event fmidata and fmireset
      const fromel = document.getElementById(this.fromid);
      if (fromel) {
        fromel.addEventListener('fmidata', this.handleValueChange);
        fromel.addEventListener('fmireset', this.handleReset);
      } else {console.warn('plotly element WARNING, null fromid element');}
    }
    else (console.warn('plotly.js needs to be loaded externally'))
  }

  detached() {
    const fromel = document.getElementById(this.fromid);
    if (fromel) {
      fromel.removeEventListener('fmidata', this.handleValueChange);
      fromel.removeEventListener('fmireset', this.handleReset);
    } else {console.log('chartjs WARNING, null fromid element');}
  }


  updateData(e) {
    let j = 0;
    for (let i = this.refindex; i < this.refindex + this.refvalues; i++) {
      //adds data to datasets

      //if convert operation is defined as array then convert
      if (this.operation && this.operation[j]) this.ydata[j].push(this.operation[j](e.detail.data[i]));
      //else push data directly
      else this.ydata[j].push(e.detail.data[i]);
      if (this.ydata[j].length > this.maxdata) {
        //console.log('shifting dataset chartjs-time', this.chart.data.datasets[j].data);
        this.ydata[j].shift();
      }
      j++;
    }

    this.xdata.push(e.detail.time);
    //limit data
    if (this.xdata.length > this.maxdata) this.xdata.shift();
    //redraw
    //console.log('plotly redraw');
    Plotlyjs.redraw(this.plotlydiv);
  }

  resetData(e) {
    console.log('plotly resetdata()');
    this.xdata.length = 0;// = [];
    //this.ydata = [];
    for (let i = 0; i < this.refvalues; i++) this.ydata[i].length = 0;//=[];//.push([]);
    Plotlyjs.redraw(this.plotlydiv);
  }
}
