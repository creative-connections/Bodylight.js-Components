import {ChartjsXy} from './chartjs-xy';
import {bindable, useView} from 'aurelia-templating';
import Chart from 'chart.js';

@useView('./chartjs-xy-points.html')
export class ChartjsXyPoints extends ChartjsXy {
    @bindable fromid;
    @bindable labels;
    @bindable refindex;
    @bindable refvalues;
    @bindable min;
    @bindable max;
    @bindable xmin;
    @bindable xmax;
    @bindable atitle='Add Point';
    @bindable rtitle='Remove Point';
    showlines = false;
    @bindable convertors;


    index = 0;

    constructor() {
      super();
      this.handleValueChange = e => {
        //e.detail do not reallocate - using same buffer, thus slicing to append to data array
        let rawdata = e.detail.data.slice(this.refindex, this.refendindex);
        //do value conversion based on convertors
        if (this.operation) {
          for (let i = 0; i < rawdata.length; i++) {
            //if particular operation is defined
            if (this.operation[i]) rawdata[i] = this.operation[i](rawdata[i]);
          }
        }
        let j = 0;
        //put each first value on x axis, second on y axis
        for (let i = 1; i < this.refvalues; i = i + 2) {
          //remember only current x,y value - on the index
          this.chart.data.datasets[j].data[this.index] = {x: rawdata[i - 1], y: rawdata[i]};
          //increment dataset - if more dataset are available
          j++;
        }
        this.updatechart()
      };
    }
    bind() {
      super.bind();
      console.log('chartjs xy point bind()');
      if (this.xmin) {
        //sets yscale min
        if (!this.options) this.options = {};
        if (!this.options.scales) this.options.scales = {};
        if (!this.options.scales.xAxes) this.options.scales.xAxes = [{}]; //chartjs 2.9.4
        if (!this.options.scales.xAxes[0].ticks) this.options.scales.xAxes[0].ticks = {}; //chartjs 2.9.4
        this.options.scales.xAxes[0].ticks.min = parseFloat(this.xmin);
      }
      if (this.xmax) {
        //sets yscale max
        if (!this.options) this.options = {};
        if (!this.options.scales) this.options.scales = {};
        if (!this.options.scales.xAxes) this.options.scales.xAxes = [{}]; //chartjs 2.9.4
        if (!this.options.scales.xAxes[0].ticks) this.options.scales.xAxes[0].ticks = {}; //chartjs 2.9.4
        this.options.scales.xAxes[0].ticks.max = parseFloat(this.xmax);
        //if (this.min) this.options.scales.yAxes[0].ticks.stepSize = (this.options.scales.yAxes[0].ticks.max - this.options.scales.yAxes[0].ticks.min) / 10;
      }
      //customize tooltip display
      this.options.tooltips.callbacks = {
        label: function(tooltipItem, data) {
          let label = data.datasets[tooltipItem.datasetIndex].label || '';
          if (label) {
            label += ': ';
          }
          label += '(' + tooltipItem.xLabel.toPrecision(3) + ',' + tooltipItem.yLabel.toPrecision(3) + ')';
          return label;
        },
        footer: function(tooltipItem, data) {
          if (data.datasets.length < 2) return tooltipItem[0].yLabel;
          let label = [];
          //label.push('| ' + data.datasets[0].data[tooltipItem[0].index].y.toPrecision(3) + ' - ' + data.datasets[1].data[tooltipItem[0].index].y.toPrecision(3) + ' |');
          label.push('Δ ' + Math.abs(data.datasets[0].data[tooltipItem[0].index].y - data.datasets[1].data[tooltipItem[0].index].y).toPrecision(3));
          return label;
        }
      };
      this.type = 'scatter';
      this.plugins = null;
      this.options.XYPlugin = true;
    }
    attached() {
      //register horizontal line drawing, shows difference line between appropriate points from dataset0 and dataset1
      Chart.pluginService.register({
        beforeDraw: function(chart, ease) {
          if (chart.config.options.XYPlugin && chart.tooltip._active && chart.tooltip._active.length) {
            let activePoint = chart.tooltip._active[0];
            //console.log('chart horizontal line debug chart activepoint:', activePoint);
            let ctx = chart.ctx;

            let y = activePoint.tooltipPosition().y;
            //let topY = this.chart.legend.bottom;
            let leftX = chart.chartArea.left;
            //let bottomY = this.chart.chartArea.bottom;
            let rightX = chart.chartArea.right;
            // draw line
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(leftX, y);
            ctx.lineTo(rightX, y);
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#ff9c9c';
            ctx.stroke();
            let meta1 = chart.getDatasetMeta(0);
            let meta2 = chart.getDatasetMeta(1);
            if (meta1) {
              //draw second line
              //console.log('plugin meta', chart, meta);
              let secondy2 = meta1.data[activePoint._index]._model.y;
              let secondy = secondy2 !== y ? secondy2 : meta2.data[activePoint._index]._model.y;
              //let stop  = meta.data[chart.config.options.section[i].index]._model.x;
              ctx.beginPath();
              ctx.moveTo(leftX, secondy);
              ctx.lineTo(rightX, secondy);
              ctx.lineWidth = 1;
              ctx.strokeStyle = '#ff9c9c';
              ctx.stroke();
              let x = activePoint.tooltipPosition().x;
              ctx.beginPath();
              ctx.moveTo(x, y);
              let sy = (y > secondy) ? 3 : -3;
              //small arrow up
              ctx.lineTo(x - sy, y - sy);
              ctx.lineTo(x + sy, y - sy);
              //line
              ctx.lineTo(x, y);
              ctx.lineTo(x, secondy);
              //small arrow down
              ctx.lineTo(x - sy, secondy + sy);
              ctx.lineTo(x + sy, secondy + sy);
              ctx.lineTo(x, secondy);
              ctx.lineWidth = 1;
              ctx.strokeStyle = '#7b7bff';
              ctx.stroke();
            }
            ctx.restore();
          }
        }

      });
      super.attached();
    }
    addpoint() {this.index++;}
    removepoint() {if (this.index > 0) this.index--;}
}
