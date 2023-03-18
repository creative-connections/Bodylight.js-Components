import {bindable} from 'aurelia-templating';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
  
@inject(EventAggregator)
export class QuizControl {
    @bindable type;
    @bindable ids;
    //@children('bdl-quiz') quizchildren;
    //quizchildren = [];
    quizindex =0;
    showforward = false;
    showback = false;
    quizids = [];

    constructor(eventAggregator) {
        this.ea = eventAggregator;
      }

    bind() {
        if (this.ids) {
            this.quizids = this.ids.split(',');
        }
    }

    attached() {
        //console.log('QuizControl quizelements:',this.quizelements);        
        if (this.quizids.length>0) {            
            //this.quizchildren[0].show = true;
            this.showfirst();
            this.ea.subscribe('quizdone', quizid => {
                this.shownext();//quizid);
            });
        }
    }

    showfirst(){
        this.showquiz(this.quizids[0])
        for (let i=1;i<this.quizids.length;i++) {
            this.hidequiz(this.quizids[i])
        }
    }

    gonext() {
        this.hidequiz(this.quizids[this.quizindex]);
        this.hidenext();
        //const index = this.quizids.indexOf(quizid);
        if (this.quizindex<this.quizids.length) {
          this.quizindex++;
          this.showquiz(this.quizids[this.quizindex]);          
        } else {
            //all quiz done, can go next
          this.allquizdone();  
        }
    }

    shownext() {
        if (this.quizindex<(this.quizids.length-1)) {
            this.showforward = true;
        } else {
            this.allquizdone();
        }
    }
    hidenext() {        
          this.showforward = false;        
    }

    hidequiz(qid){
        this.ea.publish('quizhide',qid);
    }

    showquiz(qid){
        this.ea.publish('quizshow',qid);
    }

    allquizdone(){
        //TODO enable navigation to NEXT page in markdown-book
    }

}