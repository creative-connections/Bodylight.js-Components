import {bindable} from 'aurelia-templating';
import {ChartjsFixed} from './chartjs-fixed';
import {useView} from 'aurelia-templating';
import {myParseInt} from './chartjs';

/**
 * shows fixed curve at time -
 * on X isvalues from FMU variables from xrefindex to xrefvalues
 * on Y is values from FMU variables from refindex to refvalues
 * convertors for x and y axis separated by ;
 * refindex, refvalues for y values
 * refindex2, refvalues2 for second curve in y values;
 * xrefindex,xrefvalues for x values
 * refpointindex
 */
@useView('./chartjs.html')
export class ChartjsFixedXy extends ChartjsFixed {
    @bindable fromid;
    @bindable labels;
    @bindable refindex;
    @bindable refvalues;
    @bindable refindex2;
    @bindable refvalues2;
    @bindable type;
    @bindable min;
    @bindable max;
    @bindable maxdata=8;
    @bindable xrefindex;
    @bindable xrefvalues;
    @bindable xtofixed = 0;
    @bindable refpointindex;
    @bindable xrefpointindex;
    @bindable showline=true;

    //@bindable cachesize;
    currentdataset=0;
    constructor() {
        super();
        this.handleValueChange = e => {
            //let j = this.currentdataset;
            //all values from refindex to one dataset - as one curve
            let ydata = e.detail.data.slice(this.refindex, this.refindex + this.refvalues);
            let y2data = [];
            let xdata = e.detail.data.slice(this.xrefindex, this.xrefindex + this.xrefvalues)
            let xpoint = 0;
            let ypoint= 0;
            let y2point = 0;
            //point to highlight
            if (this.refpointindex) {
                xpoint = e.detail.data[this.xrefpointindex];
                ypoint = e.detail.data[this.refpointindex];
            }

            //convertors
            if (this.operation && this.operation[0] && this.operation[1]){
                xdata = xdata.map(x => this.operation[0](x));
                ydata = ydata.map(y => this.operation[1](y));
                if (this.refpointindex) {
                    xpoint = this.operation[0](xpoint);
                    ypoint = this.operation[1](ypoint);

                }
            }

            let data = [];
            for (let i = 0; i < ydata.length; i++) {
                data.push({x: xdata[i], y: ydata[i]});
            }
            let data2 = [{x:xpoint,y:ypoint}];

            //set labels to x axis
            if (this.xtofixed >= 0) {
                let labeldata =xdata.map(x => x.toFixed(this.xtofixed));
                this.chart.data.labels = labeldata;
                //console.log('')
            }


            //set data xy to chart struct
            //do initialize dataset first
            let newdataset = {
                data: data,
                label: "",
                backgroundColor: this.currentcolor,
                borderColor: this.currentcolor,
                borderWidth: 1,
                pointRadius: 1,
                fill: false,
                showLine:this.showline
            };
            let colorindex = 1;
            if (this.refpointindex) {
                let newpointdataset = {
                    data: data2,
                    label: "",
                    backgroundColor: this.currentcolor,
                    borderColor: this.currentcolor,
                    borderWidth: 1,
                    pointRadius: 2,
                    fill: false
                }
                this.chart.data.datasets[0] = newdataset;
                this.chart.data.datasets.unshift(newpointdataset);
            } else {
                this.chart.data.datasets.unshift(newdataset);
            }

            if (this.chart.data.datasets[colorindex]) {
                this.chart.data.datasets[colorindex].backgroundColor = this.previouscolor;
                this.chart.data.datasets[colorindex].borderColor = this.previouscolor;
            }
            if (this.chart.data.datasets[colorindex+1]) {
                this.chart.data.datasets[colorindex+1].backgroundColor = this.previouscolor2;
                this.chart.data.datasets[colorindex+1].borderColor = this.previouscolor2;
            }

            if (this.chart.data.datasets.length > this.maxdata) {
                this.chart.data.datasets.pop();
            }
            if (this.refindex2) {
                y2data = e.detail.data.slice(this.refindex2, this.refindex2 + this.refvalues2)
                //if (this.refpointindex2) y2point = e.detail.data[this.ref2pointindex];
                if (this.operation) {
                    y2data = y2data.map(y => this.operation[1](y));
                    //if (this.refpointindex2) y2point = this.operation[1](y2point);
                } //operation[1] or operation[2]?
                let datab = []
                for (let i = 0; i < y2data.length; i++) {
                    datab.push({x: xdata[i], y: y2data[i]});
                }
                let datab2 = [{x:xpoint,y:y2point}]
                let datasetb = {
                    data: datab,
                    label: "",
                    backgroundColor: this.currentcolorb,
                    borderColor: this.currentcolorb,
                    borderWidth: 1,
                    pointRadius: 1,
                    fill: false,
                    showLine:this.showline
                }
                this.chart.data.datasets.splice(this.refpointindex?2:1,0,datasetb);

                if (this.chart.data.datasets[colorindex+3]) {
                    this.chart.data.datasets[colorindex+3].backgroundColor = this.previouscolorb2;
                    this.chart.data.datasets[colorindex+3].borderColor = this.previouscolorb2;
                }
                if (this.chart.data.datasets.length > this.maxdata) this.chart.data.datasets.pop();
            }

                this.updatechart();
            }
        }


    bind(){
        super.bind();
        this.type = 'scatter';
        this.data.labels = [];
        this.xrefindex = parseInt(this.xrefindex, 10);
        if (typeof this.maxdata === 'string') this.maxdata = parseInt(this.maxdata);
        if (!this.xrefindex) console.warn('xrefindex is not specified');
        this.xrefvalues = parseInt(this.xrefvalues, 10);
        if (this.xrefvalues !== this.refvalues) console.warn('the value of "xrefvalues" must be equal to "refvalues"');
        this.xrefpointindex = parseInt(this.xrefpointindex, 10);
        if (typeof this.showline === 'string') {
            this.showline = this.showline === 'true';
        }
        if (this.refindex2) {
            this.refindex2 = myParseInt(this.refindex2, 10);
            if (this.refvalues2) this.refvalues2 = parseInt(this.refvalues2, 10);
            else {console.warn('chartjs-fixed-xy refvalues2 not defined'); this.refindex2 = null;}
        }
    }

    attached() {
        super.attached();
    }
}
