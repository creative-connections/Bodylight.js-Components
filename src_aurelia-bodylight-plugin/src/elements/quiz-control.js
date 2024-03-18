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
    page = 1;
    pages = 1;

    constructor(eventAggregator) {
        this.ea = eventAggregator;
      }

    bind() {
        if (this.ids) {
            this.quizids = this.ids.split(',').map(item => item.split(';')[0]);
            this.pages = this.quizids.length;
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
            this.ea.publish('quizids',this.quizids)
        }
    }

    showfirst(){
        this.showquiz(this.quizids[0])
        for (let i=1;i<this.quizids.length;i++) {
            this.hidequiz(this.quizids[i])
        }
        this.showback = false;
        this.showforward = true;
    }

    gonext() {
        this.hidequiz(this.quizids[this.quizindex]);
        this.hidenext();
        //const index = this.quizids.indexOf(quizid);
        this.page++;
        if (this.quizindex<(this.quizids.length-1)) {
          this.quizindex++;
          this.showquiz(this.quizids[this.quizindex]);
          if (this.quizindex<(this.quizids.length-1)) {
            this.showback = true;
            this.showforward = true;          
          } else {
            this.showback = true;
            this.showforward = false;            
          }
        } else {
            //all quiz done, can't go next
            console.warn('cannot go next');
          this.showquiz(this.quizids[this.quizindex]);
          this.showback = true;
          this.showforward = false;          
        }
    }
    goback() {
        this.hidequiz(this.quizids[this.quizindex]);
        this.hidenext();
        //const index = this.quizids.indexOf(quizid);
        this.page--;
        if (this.quizindex>0) {
          this.quizindex--;
          this.showquiz(this.quizids[this.quizindex]);
          if (this.quizindex>0) {
          this.showback = true;
          this.showforward = true;          
          } else {
            this.showback = false;
            this.showforward = true;            
          }
        } else {          
            //warning can't go back
            console.warn('cannot go back');
          this.showquiz(this.quizids[this.quizindex]);
          this.showback = false;
          this.showforward = true;          
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