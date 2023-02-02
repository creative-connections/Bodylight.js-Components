import {bindable} from 'aurelia-templating';
import {Chartjs} from './chartjs';
import {useView} from 'aurelia-templating';

/**
 * shows stacked box -
 * on X is group stack 0 or stack 1
 * on Y is values from FMU variables from refindexes
 */
@useView('./chartjs.html')
export class ChartjsStacked extends Chartjs {
    @bindable fromid;
    @bindable labels;
    @bindable refindex;
    @bindable refvalues;
    @bindable type;
    @bindable min;
    @bindable max;
    @bindable maxdata = 3;
    @bindable stacks;

    constructor() {
        super();
        //stacked box contains data, each box in different dataset, group is
        this.handleValueChange = e => {
            for (let j = 0; j< this.refindices.length; j++) {
                let mydata = e.detail.data[this.refindices[j]];
                //do conversion if operation is defined
                if (this.operation && this.operation[j]) mydata = this.operation[j](mydata);
                if (!this.chart.data.datasets[j]) {
                    //do initialize dataset first
                    this.chart.data.datasets.push({
                        data: [mydata], //data is array
                        label:this.chlabels[j],
                        backgroundColor: this.selectColor(j),
                        stack:this.stack[j]
                    })
                } else {
                    this.chart.data.datasets[j].data[0]=mydata; //data is array 0 item
                }
            }
            this.updatechart();
        };
    }

    bind() {
        super.bind();
        this.type = "bar"

        this.options.scales.xAxes = [{ stacked: true }];

        this.options.scales.yAxes = [{ stacked: true }]
        //reset labels
        this.data.labels = ["data"];

            //allows refindices to be defined in refindex separated by comma ,
        if (Array.isArray(this.refindex)) {
            this.refindices = this.refindex;
            //define stack array for groups, contains descriptive string for group
        } else { //or refindices will be refindex, refindex+1, ...
            this.refindices = [];
            for (let i = 0;i<this.refvalues;i++) this.refindices.push(this.refindex+i);
        }
        if (this.stacks) { this.stack=this.stacks.split(',');}
        else {this.stack=new Array(this.refindices.length).fill('stack 0');}
        //init dataset data and labels = 0
        this.data.datasets = []
        for (let j = 0; j< this.refindices.length; j++) {
            //do initialize dataset first
            this.data.datasets.push({
                data: [0], //data is array
                label: this.chlabels[j],
                backgroundColor: this.selectColor(j),
                stack: this.stack[j]
            });
        }
    }

    attached (){
        super.attached();
    }
}
