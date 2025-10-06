import { bindable } from 'aurelia-templating';
import { ChartjsTimeError } from './chartjs-time-error';
import { useView } from 'aurelia-templating';
//import {PLATFORM} from 'aurelia-pal';
//@customElement
//@useView(PLATFORM.moduleName('./bdl-chartjs.html'))
@useView('./chartjs.html')
export class ChartjsTimeCi extends ChartjsTimeError {
    @bindable fromid;
    @bindable labels;
    @bindable refindex;// starting  index - if moooor indices, separate by comma
    @bindable refvalues; //number of values from refindex - only if one refindex is   defined
    @bindable type;
    @bindable min;
    @bindable max;
    @bindable minichart;
    @bindable colorindex;
    @bindable timedenom; //coeficient which will be denominated from time (e.g. 60 => time/60 in minutes 3600 => time/3600 in hours)
    @bindable timedenomfixed = 1;
    @bindable showrefpoint;
    @bindable fraction = 0.05; // relative fraction of confidence interval, e.g. 0.05 for ±5% bands
    @bindable margin = 0; // absolute margin added to confidence interval bands



    refindices;

    constructor() {
        super();
        this.handleValueChange = e => {
            let j = 0;

            function handleIndex(i) {
                // Add base data point (converted if operation exists)
                let baseValue = this.operation && this.operation[j] ? this.operation[j](e.detail.data[i]) : e.detail.data[i];
                this.chart.data.datasets[j].data.push(baseValue);

                // Calculate confidence interval bounds
                let upperValue = baseValue * (1 + this.fraction)+this.margin;
                let lowerValue = baseValue * (1 - this.fraction)-this.margin;

                // Push upper and lower band values to next two datasets if they exist
                if (this.chart.data.datasets[j + 1]) {
                    this.chart.data.datasets[j + 1].data.push(upperValue);
                    if (this.chart.data.datasets[j + 1].data.length > this.maxdata) {
                        this.chart.data.datasets[j + 1].data.shift();
                    }
                }

                if (this.chart.data.datasets[j + 2]) {
                    this.chart.data.datasets[j + 2].data.push(lowerValue);
                    if (this.chart.data.datasets[j + 2].data.length > this.maxdata) {
                        this.chart.data.datasets[j + 2].data.shift();
                    }
                }

                // Maintain max data length for base dataset j as before
                if (this.chart.data.datasets[j].data.length > this.maxdata) {
                    this.chart.data.datasets[j].data.shift();
                }

                j+=3;
            }

            if (this.refindices) {
                for (let i of this.refindices) handleIndex.call(this, i);
            } else {
                for (let i = this.refindex; i < this.refindex + this.refvalues; i++) handleIndex.call(this, i);
            }

            this.chart.data.labels.push(this.timeoperation(e.detail.time));
            if (this.chart.data.labels.length > this.maxdata) {
                this.chart.data.labels.shift();
                if (this.sectionid) {
                    if (this.chart.config.options.section[0].index === 0) this.chart.config.options.section.shift();
                    for (let i = 0; i < this.chart.config.options.section.length; i++) {
                        this.chart.config.options.section[i].index -= 1;
                    }
                }
            }

            this.updatechart();
        };

    }

    bind() {
        super.bind();
        if (typeof this.fraction === 'string') {
            this.fraction = parseFloat(this.fraction, 10);
        }
        if (typeof this.margin === 'string') {
            this.margin = parseFloat(this.margin, 10);
        }
        let datasets = [];
        let mydata1 = this.initialdata.split(';');
        for (let i = 0; i < (this.refvalues*3 + 1); i++) { //mydata[0] == timelabels in x axis, mydata[1..n] ar in y axis
            let mydata2 = (mydata1[i]) ? mydata1[i].split(',') : [];
            this.mydata[i] = mydata2.map(x => {
                return parseFloat(x);
            });
            //console.log('chartjstime mydata i',this.mydata[i]);
        }

        //initialize colors for each dataset
        for (let i = 0; i < this.refvalues*3; i++) {
            //this.colors.push(this.selectColor(i));
            const ii = Math.floor(i / 3);
            const mod = i % 3;
            const mybordercolor = mod === 0 ? this.selectColor(ii + this.colorindex) : "transparent";
            const mycolor = mod === 0 ? this.selectColor(ii + this.colorindex) : this.selectColor(ii + this.colorindex,55,55,0.5);
            const myradius = mod === 0 ? 1 : 0;
            const myfill = mod === 0 ? false : ii*3;
            const mylabel = mod === 0 ? this.chlabels[i] : '';
            
            datasets.push({
                data: this.mydata[i + 1],
                label: mylabel,
                backgroundColor: mycolor,
                borderColor: mybordercolor,
                borderWidth: 1,
                pointRadius: myradius,
                fill: myfill
            });
            //timelabels.push(i);
        }

        this.data = {
            labels: this.mydata[0],
            datasets: datasets
        };
    }

}