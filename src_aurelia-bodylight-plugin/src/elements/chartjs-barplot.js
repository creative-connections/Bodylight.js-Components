import {Chartjs} from './chartjs';
// eslint-disable-next-line no-unused-vars
import ChartDataLabels from 'chartjs-plugin-datalabels';
//import {BdlChartjs} from './chartjs';
import {bindable} from 'aurelia-templating';
//import {PLATFORM} from 'aurelia-pal';
//@useView(PLATFORM.moduleName('./bdl-chartjs.html'))
//@useView('./chartjs.html')
export class ChartjsBarplot extends Chartjs {
    @bindable id;
    @bindable fromid;
    @bindable labels;
    @bindable refindex;
    @bindable refvalues=1;
    @bindable extremelimits='0,1'; //csv limits of chart min and max
    @bindable normallimits;//='';//0.25,0.75'; //csv normal limits inside chart
    @bindable initialdata='7.5';
    @bindable width='500';
    @bindable height='50';
    @bindable nominal=0.01; //sets precision to floor/round
    @bindable twoway = false; //whether click will create event 'change'
    @bindable responsive;


    constructor() {
      super();
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
        //now decide whether datalabel is right or left
        if (((this.elimits[1] - rawdata) / (this.elimits[1] - this.elimits[0])) < 0.05) {
          this.options.plugins.datalabels.align = 'left';
          this.options.plugins.datalabels.color = 'white';
        } else {
          this.options.plugins.datalabels.align = 'right';
          this.options.plugins.datalabels.color = 'black';
        }
        this.updatechart();
      };
    }

    bind() {
      super.bind();
      this.plugins = [ChartDataLabels];
      if (this.extremelimits) {
        this.elimits = this.extremelimits.split(','); //split by comma
        for (let i = 0; i < this.elimits.length; i++ ) this.elimits[i] = parseFloat(this.elimits[i]);
      }
      if (this.normallimits) {
        this.nlimits = this.normallimits.split(',');
        for (let i = 0; i < this.nlimits.length; i++) this.nlimits[i] = parseFloat(this.nlimits[i]);
      }
      if (this.nominal) {
        if (typeof this.nominal === 'string') this.nominal = parseFloat(this.nominal);
        this.options.nominal = this.nominal;
      }

      if (this.twoway && (typeof this.twoway === 'string')) {
        this.twoway = this.twoway === 'true';
      }
      //chartjs type horizontal bar
      this.type = 'horizontalBar';
      // no legend and no labels
      //this.chlabels = [];
      this.options.legend.display = false;
      //sets xaxis limits to extremelimits
      if (!this.options.scales.xAxes) this.options.scales.xAxes = [{}];

      this.options.scales.xAxes[0].ticks = {
        autoSkip: true,
        min: this.elimits[0],
        max: this.elimits[1],
        fontSize: 8,
        callback: function(value, index, values) {
          //count relative distance to last tick value
          const reldistance = (values[3] - value) / (values[3] - values[0]);
          // do not display tick label if too close to extreme limit (<5% of length)
          if (index === 2 && (reldistance < 0.05)) return ''; return value;
        }
      };
      //set ticks to extreme and normal limits only
      let myticks = (this.normallimits)
        ? [this.elimits[0], this.nlimits[0], this.nlimits[1], this.elimits[1]]
        : [this.elimits[0], this.elimits[1]];
      //console.log('charjs barplot myticks', myticks);
      this.options.scales.xAxes[0].afterBuildTicks = function(scale) {
        scale.ticks = myticks;
        return;
      };
      this.options.scales.xAxes[0].beforeUpdate = function(oScale) {
        return;
      };
      //datalabel plugin shows value right of the bar
      this.options.plugins = {
        datalabels: {
          align: 'right',
          anchor: 'end',
          formatter: function(value, context) { return value.toPrecision(3); },
          font: {size: 8},
          padding: {top: 0, right: 0, bottom: 0, left: 1}

        }
      };
      //now decide whether datalabel is right or left
      //TODO eliminate duplicate in handlevaluechange
      if (((this.elimits[1] - parseFloat(this.initialdata)) / (this.elimits[1] - this.elimits[0])) < 0.05) {
        this.options.plugins.datalabels.align = 'left';
        this.options.plugins.datalabels.color = 'white';
      } else {
        this.options.plugins.datalabels.align = 'right';
        this.options.plugins.datalabels.color = 'black';
      }

      //if the component is twoway - on click shows second bar with desired value and triggers 'change' event
      if (this.twoway) {
        //sets options for chart
        this.options.events = ['click'];
        this.options.parentId = this.id;
        //this.options.parentvm = this;
        this.options.onClick = function(c, i) {
          //note this - refers now to chart, not to webcomponent - shared properties are via options.nominal and options.parentid
          //console.log('chartjs barplot click,', c, i, 'this:', this);
          //let scaler = this.chart.scales['y-axis-0'];
          let xscaler = this.chart.scales['x-axis-0'];
          //let y = c.clientY - this.canvas.getBoundingClientRect().top - scaler.top;
          let x = c.clientX - this.canvas.getBoundingClientRect().left - xscaler.left;
          //let yval = scaler.max - y / scaler.height * (scaler.max - scaler.min);
          let xval = xscaler.min + x / xscaler.width * (xscaler.max - xscaler.min);
          if (this.options.nominal) {
            //nominal is defined - floor xval to nominal
            xval = Math.floor(xval / this.options.nominal) * this.options.nominal;
          }
          //console.log('value clicked: %o, ypx: %o', yval, y);
          //console.log('value clicked: %o, xpx: %o', xval, x);
          //this.trigger('onTickerXClick', xval);
          if (this.data.datasets.length < 2) {
            this.data.datasets.push({data: [xval], backgroundColor: '#ff0000', label: 'new value'});
          } else this.data.datasets[1].data = [xval];
          this.update();
          //create and dispatch change event
          let event = new CustomEvent('change', {detail: {value: xval, id: this.options.parentId}});
          //dispatch event - it should be listened by some other component
          document.getElementById(this.options.parentId).dispatchEvent(event);
          //this.parentvm.valueChanged(xval);
        };
      }
      this.options.tooltips = { enabled: false };
      this.tooltips = [];
      /*if (!this.options.scales.yAxes) this.options.scales.yAxes = [{}];
      this.options.scales.yAxes[0].ticks = {
        max: 5,
        min: 0,
        stepSize: 0.5
      };*/
    }
    valueChanged(value) {
      console.log('chartjs barplot valuechanged:', value);
    }
}
