import {BdlChartjsTime} from '../graphs/bdl-chartjs-time';
import {bindable, useView} from 'aurelia-templating';
@useView(PLATFORM.moduleName('../graphs/chartjs.html'))
export class BdlEcg extends BdlChartjsTime {
  @bindable fromid;
  @bindable labels;
  @bindable maxdata=40; //5*8 ecgvalues
  //@bindable refindex;
  refindex = 0;
  //  @bindable refvalues;
  refvalues = 1; //initiate
  previousreltime=0;
  @bindable type;
  ecgvalues=[[0.2, 0.12, 0, 0, 0, 0, -0.1, 1.4], //4b
    [-0.5, 0, 0, 0, 0, 0, 0, 0], //1
    [0, 0, 0, 0, 0.15, 0.28, 0.35, 0.38], //2
    [0.38, 0.35, 0.28, 0.15, 0, 0, 0, 0], //3
    [0, 0, 0, 0, 0, 0, 0.12, 0.2]//4a
  ]// ]; //values in mV in segments
  ecglabels=[['P', '', '', '', '', '', 'Q', 'R'], //4b
    ['S', '', '', '', '', '', '', ''], //1
    ['', '', '', '', '', '', '', 'T'], //2
    ['', '', '', '', '', '', '', ''], //3
    ['', '', '', '', '', '', '', 'P'] //4a
  ] //labels related to values
  ecgindex=0;
  ecgsegment=1;

  constructor() {
    super();
    console.log('BdlEcg()');
    //this.type = 'line';
    this.handleValueChange = e => {
      console.log('bdl-ecg handlevaluechange e.detail', e.detail);


      let mysegment = e.detail.segment;
      let myreltime = e.detail.relativetime;

      //reset index if new segment
      if (this.currentsegment !== mysegment) {
        //reset index
        this.previousindex = 0;
        this.index = 0;
        this.currentsegment = mysegment;
        this.previousreltime = 0;
        //TODO draw points from previous segments - if not already drawn
      } else {
        this.previousindex = this.index;
      }
      //count difference in this step
      let rd = e.detail.relativetime - this.previousreltime; //e.g. 0.33 of segments
      //count how many points of ECG to draw - >1 -
      let npoints = Math.round(this.ecgvalues[mysegment - 1].length * rd);
      this.index += npoints;
      //set previousreltime to current points of time used
      this.previousreltime = this.previousreltime + (npoints / this.ecgvalues[mysegment - 1].length );

      //TODO push multiple values - per percent in current segment - or do approximation
      //push multiple values - if in ecgvalues
      console.log('bdl-ecg handlevaluechange npoints,previndex,index:', npoints,this.previousindex,this.index);
      if (npoints > 0) {
        this.chart.data.datasets[0].data.push(...(this.ecgvalues[mysegment - 1].slice(this.previousindex, this.index)));
        //push npoints times the 'time' label
        this.chart.data.labels.push(...(this.ecglabels[mysegment - 1].slice(this.previousindex, this.index)));
        if (this.chart.data.datasets[0].data.length > this.maxdata) {
          //console.log('shifting dataset chartjs-time', this.chart.data.datasets[j].data);
          this.chart.data.datasets[0].data.shift();
        }
        if (this.chart.data.labels.length > this.maxdata) {
          //console.log('shifting dataset chartjs-time', this.chart.data.datasets[j].data);
          this.chart.data.labels.shift();
        }
      }
      //shift - remove first element if data is too big
      //console.log('chartjs handlevaluechange() chart.data.datasets[0].data', this.chart.data.datasets[0].data);
      this.chart.update(0);
    };
  }

  bind() {
    super.bind();
  }
  attached() {
    super.attached();
    document.getElementById(this.fromid).addEventListener('animatedata', this.handleValueChange);
  }
  detached() {
    super.detached();
    if (document.getElementById(this.fromid)) {
      document.getElementById(this.fromid).removeEventListener('animatedata', this.handleValueChange);
    }
  }
}
