import {bindable} from 'aurelia-templating';
import {ChartjsTime} from './chartjs-time';
import {useView} from 'aurelia-templating';
//import {PLATFORM} from 'aurelia-pal';
//@customElement
//@useView(PLATFORM.moduleName('./bdl-chartjs.html'))
@useView('./chartjs.html')
export class ChartjsTimeError extends ChartjsTime {
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
    
    refindices;

    constructor() {
        super();
    }

    /**
     * sets all tim-series specific options for chartjs
     */
    bind() {
        super.bind();
        if (typeof this.timedenomfixed === 'string') this.timedenomfixed = parseInt(this.timedenomfixed,10);                
        if (typeof this.timedenom === 'string') {
            
            this.timedenom = parseFloat(this.timedenom, 10);
            this.timeoperation = x => {return (x/this.timedenom).toFixed(this.timedenomfixed)}; //time operation is denomination 
        } else {
            this.timeoperation = x => { return x }; //time operation is identity - no operation on number is performed
        }
        //done in super
        //this.chlabels = this.labels.split(','); //labels for each dataset
        //this.colors = [];
        let datasets = [];
        let mydata1 = this.initialdata.split(';');
        for (let i = 0; i < (this.refvalues + 1); i++) { //mydata[0] == timelabels in x axis, mydata[1..n] ar in y axis
            let mydata2 = (mydata1[i]) ? mydata1[i].split(',') : [];
            this.mydata[i] = mydata2.map(x => {
                return parseFloat(x);
            });
            //console.log('chartjstime mydata i',this.mydata[i]);
        }

        //initialize colors for each dataset
        for (let i = 0; i < this.refvalues; i++) {
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
        if (this.verticalline) this.type = 'LineWithLine';
        else this.type = 'line';
        if (typeof (this.showrefpoint) === 'string') {
            this.showrefpoint = this.showrefpoint === 'true';            
        }
    }
}