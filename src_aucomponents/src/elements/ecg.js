import {ChartjsTime} from './chartjs-time';
import {bindable, useView} from 'aurelia-templating';
//import {PLATFORM} from 'aurelia-pal';
//@useView(PLATFORM.moduleName('./bdl-chartjs.html'))
@useView('./chartjs.html')
/**
 * bdl-ecg component draws chartjs graph with ECG, expects cardiac cycle to be splitted into 5 segments:
 * (4b-atrial systole,1-ventricular systole,2-ejection,3-ventricular diastole,4a-diastole with filling)
 * For each segment received from 'animatedata' event it shows appropriate graph data,
 * 'animatedata' should contain these `event.detail` properties:
 * - 'segment' - numbers 1,2,3,4,5 (0=4b,1=1,2=2,3=3,4=4a)
 * - 'relativetime' - number between 0..1 inclusive, 0 means beginning of the segment, 0.5 half of the segment, 1 - full segment
 *                  - only the appopriate part of the segment is drawn
 *
 * `type` should contain theset values:
 * - `normal`
 */
export class Ecg extends ChartjsTime {
  @bindable fromid;
  @bindable labels = 'ECG I (mV)';
  @bindable maxdata=80; //2 * 5*8 ecgvalues = 2 cardiac cycles
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
  //ecgvalueslbb=[]
  ecglabels=[['P', '', '', '', '', '', 'Q', 'R'], //4b
    ['S', '', '', '', '', '', '', ''], //1
    ['', '', '', '', '', '', '', 'T'], //2
    ['', '', '', '', '', '', '', ''], //3
    ['', '', '', '', '', '', '', 'P'] //4a
  ] //labels related to values
  ecgindex=0;
  ecgsegment=1;
  @bindable width='300'
  @bindable height='50'

  constructor() {
    super();
    console.log('BdlEcg()');
    //this.type = 'line';
    //need to define method here in order to register it for eventlistener later
    this.handleValueChange = e => {
      this.handleValueChangeImpl(e);
    };
  }

  bind() {
    super.bind();
    this.datalabels = true;
    //disable labels on xaxes
    this.options.scales.xAxes = [{ticks: { display: false}}];
  }

  attached() {
    super.attached();
    let fromidel = document.getElementById(this.fromid)
    if (fromidel) {
      fromidel.addEventListener('animatedata', this.handleValueChange);
    }
    //instantiate datalabels
    if (!this.chart.data.datasets[0].datalabels) this.chart.data.datasets[0].datalabels = [];
  }

  detached() {
    super.detached();
    if (document.getElementById(this.fromid)) {
      document.getElementById(this.fromid).removeEventListener('animatedata', this.handleValueChange);
    }
  }

  handleValueChangeImpl(e) {
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
    let rd = myreltime - this.previousreltime; //e.g. 0.33 of segments
    //count how many points of ECG to draw - >1 -
    let npoints = Math.round(this.ecgvalues[mysegment].length * rd);
    this.index += npoints;
    //set previousreltime to current points of time used
    this.previousreltime = this.previousreltime + (npoints / this.ecgvalues[mysegment].length );

    //TODO push multiple values - per percent in current segment - or do approximation
    //push multiple values - if in ecgvalues
    console.log('bdl-ecg handlevaluechange npoints,previndex,index:', npoints, this.previousindex, this.index);
    if (npoints > 0) {
      this.chart.data.datasets[0].data.push(...(this.ecgvalues[mysegment].slice(this.previousindex, this.index)));
      this.chart.data.datasets[0].datalabels.push(...(this.ecglabels[mysegment].slice(this.previousindex, this.index)));
      //push npoints times the 'time' label
      this.chart.data.labels.push(...Array(npoints).fill(e.detail.time));
      //shift
      if (this.chart.data.datasets[0].data.length > this.maxdata) {
        //console.log('shifting dataset chartjs-time', this.chart.data.datasets[j].data);
        let pointstoremove = this.chart.data.datasets[0].data.length - this.maxdata;
        this.chart.data.datasets[0].data.splice(0, pointstoremove);
        this.chart.data.datasets[0].datalabels.splice(0, pointstoremove);
        this.chart.data.labels.splice(0, pointstoremove);
      }
    }
    //shift - remove first element if data is too big
    //console.log('chartjs handlevaluechange() chart.data.datasets[0].data', this.chart.data.datasets[0].data);
    this.chart.update(0);
  }
}
