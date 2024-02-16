import {bindable} from 'aurelia-templating';
import {inject} from 'aurelia-framework';
import _ from 'lodash';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class QuizSummary {
    @bindable id;
  
    constructor(eventAggregator) {
      this.ea = eventAggregator;
    }
  
    bind() {
        this.subscription1 =this.ea.subscribe('quizshow', quizid => {
            if (this.id === quizid)  this.show();//quizid);
          });
        this.subscription2 = this.ea.subscribe('quizhide', quizid => {
            if (this.id === quizid) this.hide();//quizid);
          });
      
    }

    unbind() {
        this.subscription1.dispose()
        this.subscription2.dispose()
    
    }

    show(){
        this.showquiz = true;
      }
    
      hide(){
        this.showquiz = false;
      }
          
}