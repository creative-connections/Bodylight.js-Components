import { ChartjsTime } from './chartjs-time';
//import {BdlChartjs} from './chartjs';
import { inject } from 'aurelia-framework';
import { bindable, useView } from 'aurelia-templating';
//import {PLATFORM} from 'aurelia-pal';
//@useView(PLATFORM.moduleName('./bdl-chartjs.html'))
import { EventAggregator } from 'aurelia-event-aggregator';

@useView('./chartjs.html')
@inject(EventAggregator)
export class ChartjsXy extends ChartjsTime {
  @bindable fromid;
  @bindable labels;
  @bindable refindex;
  @bindable refvalues;
  @bindable type;
  @bindable labelx;
  @bindable labely;
  @bindable refpoint = false;
  showlines = true;

  constructor(ea) {
    super();
    this.ea = ea;
    this.handleValueChange = e => {
      //e.detail do not reallocate - using same buffer, thus slicing to append to data array
      //let datapoints =e.detail.data.slice(this.refindex, this.refendindex);
      //console.log('debug handlevaluechange refindex' + this.refindex + ' refvaules:' + this.refvalues + ' e:', e)
      let j = 0;
      //put first value on x axis, others on y axis other values
      for (let i = 1; i < this.refvalues; i++) {
        if (this.operation && this.operation[i]){
          //if (this.refpoint)
            const newindex = this.refindex + i;
            const x = this.operation[0](e.detail.data[this.refindex]);
            const y = this.operation[i](e.detail.data[newindex]);
          const datapoint = { 
            x: x, 
            y: y
          }  
          /*console.log('debug chartjsxy, data to push to chartjs',datapoint)
          console.log('debug chartjsxy, this',this);
          console.log('debug chartjsxy refindex '+this.refindex+' i '+i+' e',e);
          console.log('debug chartjsxy newindex '+newindex+' once more newindex',e);
          console.log('debug e.detail data y',e.detail.data[this.refindex + i])
          console.log('debug operation[i]',this.operation[i])
          console.log('debug converted y',this.operation[i](e.detail.data[this.refindex + i]))*/
          this.chart.data.datasets[j].data.push(datapoint);
        }
        else
          this.chart.data.datasets[j].data.push({ x: e.detail.data[this.refindex], y: e.detail.data[this.refindex + i] });
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
  chartcontrol(payload) {
    console.log('chartjsxy chartcontrol:', payload);
    if (payload.type === 'stop') {
      //unsubscribe to listen fmidata
      this.addListeners();      
    }
    if (payload.type === 'data') {
      this.handleValueChange({ detail: { data: payload.data } });    
    }
    if (payload.type === 'refpoint1') {
      let point = this.highlightLeftPoint(payload.data);
      //this.ea.publish('chartdata1', point)
    }
    if (payload.type === 'refpoint2') {
      let point = this.highlightRightPoint(payload.data);
      //this.ea.publish('chartdata2', point)
    }
    if (payload.type === 'start') {
      //subscribe back to listen fmidata
      this.removeListeners();
      //clean data
      this.handleReset();
    }
    if ((payload.type === 'leftPoint') || (payload.type === 'rightPoint')) {this.lastPositionName=payload.type}
  }

  attached() {
    //
    if (this.refpoint) {
      // Create a plugin object
      let highlightPointLinesPlugin = {
        id: 'highlightPointLines',  // plugin ID

        beforeDraw: function (chart) {
          // 1) Get the plugin config object, if any
          var pluginOpts = chart.config.options.plugins && chart.config.options.plugins.highlightPointLines;
          if (!pluginOpts) return;

          // 2) We'll check for up to two highlight definitions:
          //    pluginOpts.leftPoint = { datasetIndex, dataIndex }
          //    pluginOpts.rightPoint = { datasetIndex, dataIndex }
          //    We'll draw each if present.
          var ctx = chart.chart.ctx;
          ctx.save();

          // Helper to draw highlight lines & circle
          function drawHighlight(datasetIndex, dataIndex) {
            var meta = chart.getDatasetMeta(datasetIndex || 0);
            var point = meta && meta.data && meta.data[dataIndex];
            if (!point) return;  // invalid indexes

            // In Chart.js 2.9.4, the position is stored in point._model
            var x = point._model.x;
            var y = point._model.y;

            // Vertical line (bottom to point)
            ctx.beginPath();
            ctx.moveTo(x, chart.chartArea.bottom);
            ctx.lineTo(x, y);
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'red';
            ctx.stroke();

            // Horizontal line (left to point)
            ctx.beginPath();
            ctx.moveTo(chart.chartArea.left, y);
            ctx.lineTo(x, y);
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'red';
            ctx.stroke();

            // Small red circle at the point
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fillStyle = 'red';
            ctx.fill();
          }

          // Draw left point if specified
          if (pluginOpts.leftPoint && pluginOpts.leftPoint.dataIndex != null) {
            drawHighlight(pluginOpts.leftPoint.datasetIndex, pluginOpts.leftPoint.dataIndex);
          }

          // Draw right point if specified
          if (pluginOpts.rightPoint && pluginOpts.rightPoint.dataIndex != null) {
            drawHighlight(pluginOpts.rightPoint.datasetIndex, pluginOpts.rightPoint.dataIndex);
          }

          ctx.restore();
        }
      };
      Chart.pluginService.register(highlightPointLinesPlugin)
      const highlightNearestPlugin = {
        // This runs after Chart.js processes the user event 
        // (mouse move, click, etc.) and determines active elements.
        afterEvent: function(chart, e) {
          const active = chart.tooltip._active || [];
          if (!active.length) {
            // No nearest point
            return;
          }
      
          // The nearest point is active[0].
          const nearest = active[0];
          const datasetIndex = nearest._datasetIndex;
          const dataIndex = nearest._index;
      
          // Access the raw data from the dataset
          const pointData = chart.data.datasets[datasetIndex].data[dataIndex];
      
          // Do something with the nearest point...
          //console.log('Nearest point data:', pointData,e);
          // e.g., highlight it or store it
          // chart.$myWrapper is the instance of MyChartWrapper
          if (e.type==='click') {
            //first click
            if (chart.$myWrapper.lastPositionName === 'leftPoint')
              chart.$myWrapper.lastPositionName='rightPoint';
            else 
              chart.$myWrapper.lastPositionName='left2Point';
            //lastPositionName?
          }
          chart.$myWrapper.setPointHighlight(null, dataIndex);

        }
      };
      Chart.pluginService.register(highlightNearestPlugin)
    }

    super.attached();
    if (this.refpoint) { //if refpoint is set to true -then chartcontrol will handle incoming custom data
    this.chartcontrolsub = this.ea.subscribe('chartcontrol', payload => {
      this.chartcontrol(payload)
    });

    // Store a reference to this wrapper on the chart
    this.chart.$myWrapper = this;
  }
  }

  detached() {
    if (this.chartcontrolsub) this.chartcontrolsub.dispose();
    super.detached();
  }

  bind() {
    super.bind();
    if (typeof this.refpoint === 'string') {
      this.refpoint = this.refpoint === 'true';
    }
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
          return { x: this.mydata[0][index], y: parseFloat(yy) };
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
          return { x: parseFloat(mydata2[index]), y: parseFloat(yy) };
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

  /**
     * Highlight the "left" point on the chart, returning { x, y } in canvas coords
     */
  highlightLeftPoint(dataIndex) {
    return this.setPointHighlight('leftPoint', dataIndex);
  }

  /**
   * Highlight the "right" point on the chart, returning { x, y } in canvas coords
   */
  highlightRightPoint(dataIndex) {
    return this.setPointHighlight('rightPoint', dataIndex);
  }

  /**
   * Internal helper used by highlightLeftPoint & highlightRightPoint
   *    - positionName: 'leftPoint' or 'rightPoint'
   *    - dataIndex: index in data array
   *    - datasetIndex: which dataset (defaults to 0)
   */
  setPointHighlight(positionName, dataIndex) {
    //null positionName use last or leftPoint
    if (!positionName) { 
      if (!this.lastPositionName) this.lastPositionName='leftPoint';
      positionName = this.lastPositionName;
    }
    else {this.lastPositionName = positionName}
    const chart = this.chart;
    const datasetIndex = 0;
    var dsIndex = (typeof datasetIndex === 'number') ? datasetIndex : 0;
    var meta = chart.getDatasetMeta(dsIndex);
    var point = meta && meta.data && meta.data[dataIndex];

    // Ensure plugins config exists
    if (!chart.config.options.plugins) {
      chart.config.options.plugins = {};
    }
    if (!chart.config.options.plugins.highlightPointLines) {
      chart.config.options.plugins.highlightPointLines = {};
    }

    // If the dataIndex is invalid, clear that highlight and return null
    
    if (!point) {
      chart.config.options.plugins.highlightPointLines[positionName] = {};
      chart.update();
      return null;
    }

    // In Chart.js 2.9.4, the point's canvas coordinates are in point._model
    //var x = point._model.x;
    //var y = point._model.y;


    // Store highlight in plugin config
    chart.config.options.plugins.highlightPointLines[positionName] = {
      datasetIndex: dsIndex,
      dataIndex: dataIndex
    };

    // Redraw the chart to show the updated highlight
    chart.update();

    // Return the {x, y} pixel coordinates
    var dsIndex = (typeof datasetIndex === 'number') ? datasetIndex : 0;

    // Just fetch the original data object
    var originalValue = chart.data.datasets[dsIndex].data[dataIndex];

    // If it's an object with x and y, you have it right away:
    let mypoint ={}
    if (originalValue && typeof originalValue === 'object') {
      mypoint = { x: originalValue.x, y: originalValue.y };
    } else {
      // If your data is just [y1, y2, ...] then "x" is usually the index or label
      // and "y" is originalValue. You might then return { x: dataIndex, y: originalValue };
      mypoint = { x: dataIndex, y: originalValue };
    }
    if (positionName === 'leftPoint') this.ea.publish('chartdata1', mypoint)
      else if (positionName === 'rightPoint') this.ea.publish('chartdata2', mypoint)
    return mypoint;
      //  return { x: x, y: y };
  }
}
