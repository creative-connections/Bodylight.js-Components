import {bindable} from 'aurelia-templating';
import {Chartjs} from './chartjs';
import {useView} from 'aurelia-templating';
import _ from 'lodash';
import Chart from 'chart.js';

/**
 * shows fixed curve at time -
 * on X is 0,1,2,3,4,5,6,7,8,9
 * on Y is values from FMU variables from refindex to refvalues
 */
@useView('./chartjs.html')
export class ChartjsFixed extends Chartjs {
    @bindable fromid; //DOM id of FMU component to listen fmu-data event
    @bindable labels; //labels of datasets
    @bindable refindex; //variable index in fmu data
    @bindable refvalues; //how many variables to show from fmu data
    @bindable type; //type of chart - is overwritten to 'line'
    @bindable min; //if defined chartjs y axis from min
    @bindable max; //if defined chartjs y axis to max
    @bindable maxdata=3; //howmany datasets to remember
    @bindable colorindex=0; //from whic colorindex to start, 0 blue, 1 red, 2 green,...
    @bindable highlightindex;
    @bindable refpointindex; //extra dataset with only one point is drawn
    currentcolor;
    previouscolor;
    previouscolor2;
    currentcolorb;
    previouscolorb;
    previouscolorb2;
    //@bindable cachesize;
    currentdataset=0;

    constructor(){
        super();
        this.handleValueChange = e => {
            //let j = this.currentdataset;
            //all values from refindex to one dataset - as one curve
            //if (!this.chart.data.datasets[j]) {
                //do initialize dataset first
            let newdataset = {
                data: e.detail.data.slice(this.refindex,this.refindex+this.refvalues),
                label:"",
                backgroundColor: this.currentcolor,
                borderColor: this.currentcolor,
                borderWidth: 1,
                pointRadius: 1,
                fill: false
            }
            //index to blure color
            let colorindex=1;
            //decide whether to add point
            if (this.refpointindex) {
                let newpointdataset = {
                    data: [e.detail.data[this.refpointindex]],
                    label:"",
                    backgroundColor: this.currentcolor,
                    borderColor: this.currentcolor,
                    borderWidth: 1,
                    pointRadius: 0,
                    fill: false
                }
                this.chart.data.datasets[0] = newdataset;
                this.chart.data.datasets.unshift(newpointdataset)
                //blur color from inde 2, [0] is point [1] is dataset
                colorindex = 2;
            } else {
                this.chart.data.datasets.unshift(newdataset);
            }
            if(this.chart.data.datasets[colorindex]) {
                this.chart.data.datasets[colorindex].backgroundColor = this.previouscolor;
                this.chart.data.datasets[colorindex].borderColor = this.previouscolor;
            }
            if(this.chart.data.datasets[colorindex+1]) {
                this.chart.data.datasets[colorindex+1].backgroundColor = this.previouscolor2;
                this.chart.data.datasets[colorindex+1].borderColor = this.previouscolor2;
            }
            //do apply operation on each element of array
            if (this.operation && this.operation[0]) {
                this.chart.data.datasets[0].data.map(item => {
                    return this.operation[0](item)
                });
                if (this.refpointindex) { //do conversion on [1] too
                    this.chart.data.datasets[1].data.map(item => {
                        return this.operation[0](item)
                    });
                }
            }

            if (this.chart.data.datasets.length>this.maxdata) { this.chart.data.datasets.pop();}

            this.updatechart();
        };
    }

    bind(){
        super.bind();
        this.type = 'line';
        this.options.legend.display = false;
        let dataset = [];
        dataset.push({
            data: [],
            label:"",
            backgroundColor: this.selectColor(0),
            borderColor: this.selectColor(0),
            borderWidth: 1,
            pointRadius: 1,
            fill: false
        })

        this.data = {
            labels: Array.from(Array(this.refvalues), (_,x) => x+1), //returns [1,2,3,..,refvalues]
            datasets: dataset
        };
        if (typeof this.colorindex === 'string') this.colorindex = parseInt(this.colorindex,10);
        //initialize colors for each dataset
        this.currentcolor =  this.selectColor(this.colorindex,65);
        this.previouscolor = this.selectColor(this.colorindex,65,75);
        this.previouscolor2 = this.selectColor(this.colorindex,65,95);
        this.currentcolorb =  this.selectColor(this.colorindex+1,65);
        this.previouscolorb = this.selectColor(this.colorindex+1,65,75);
        this.previouscolorb2 = this.selectColor(this.colorindex+1,65,95);

        this.refpointindex = parseInt(this.refpointindex, 10);
        if (this.refpointindex) {
            this.options.refpointplugin = {index:this.refpointindex-this.refindex};
        }
    }

    attached() {
        if (this.refpointindex) {
            Chart.pluginService.register({
                id: 'custom_lines to ref point',
                afterDraw: (chart) => {
                    if (chart.config.options.refpointplugin) {
                        const ctx = chart.canvas.getContext('2d');
                        ctx.save();

                        // draw line
                        let meta1 = chart.getDatasetMeta(0);
                        //let meta2 = chart.getDatasetMeta(1);
                        if (meta1) {
                            ctx.beginPath();
                            try {
                                //expect that data[0] contains point data[1] lines
                                let x = meta1.data[0]._model.x;
                                let y = meta1.data[0]._model.y;
                                let value = chart.data.datasets[0].data[0];
                                if (isNaN(value)) {
                                    //value is object x, y
                                    ctx.moveTo(0, y);
                                    ctx.lineTo(x, y);
                                    ctx.lineTo(x, chart.height);
                                    ctx.lineWidth = 1;
                                    ctx.strokeStyle = '#ff9c9c';
                                    ctx.stroke();
                                    ctx.font = "10px Arial"
                                    if (value.y) ctx.fillText(value.y.toPrecision(4),x,y);
                                } else {
                                    //only y value is there, draw line
                                    ctx.moveTo(0, y);
                                    ctx.lineTo(chart.width, y);
                                    ctx.lineWidth = 1;
                                    ctx.strokeStyle = '#ff9c9c';
                                    ctx.stroke();
                                    ctx.font = "10px Arial"
                                    ctx.fillStyle = "black";
                                    ctx.fillText(value.toPrecision(4),x,y);
                                }
                            } catch (e) {
                                //console.warn('error, meta1:',meta1);
                            }
                            ctx.restore();
                        }

                    }
                }
            })
        }
        super.attached();
        if (this.refpointindex) console.log('chartjs fixed debug: chart:',this.chart);
    }

}
