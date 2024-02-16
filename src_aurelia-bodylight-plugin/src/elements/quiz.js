import {bindable} from 'aurelia-templating';
import {inject} from 'aurelia-framework';
import _ from 'lodash';
import {EventAggregator} from 'aurelia-event-aggregator';
  
@inject(EventAggregator)
export class Quiz {
  @bindable question='?';
  @bindable terms; //for matching test
  @bindable answers;
  @bindable explanations;
  @bindable correctoptions;
  @bindable buttontitle='check answers';
  @bindable type='choice'; //could be choice|match for multiple choice|matching test
  @bindable id;
  
  constructor(eventAggregator) {
    this.ea = eventAggregator;
  }

  bind() {
    this.useranswer = [];
    this.showquiz=true;
    this.showresult = false;
    this.answers_array = (this.answers)? this.answers.split('|').map(s => s.trim()): [];
    this.terms_array = (this.terms)? this.terms.split('|').map(s => s.trim()): [];
    this.explanation_array = (this.explanations)? this.explanations.split('|').map(s => s.trim()): [];
    this.correct_array = (this.correctoptions)?this.correctoptions.split('|').map(s => s.trim()):[];
    this.answer_exp_array = [];

    for (let i = 0; i < this.answers_array.length; i++) {
      this.answer_exp_array.push(
        {
          id: i,
          answer: this.answers_array[i],
          correct: this.correct_array[i] === 'true',
          explanation: this.explanation_array[i],
          user: false
        });
    }

    if (this.type === 'match') {
      //prepare randomterms and randomanswers
      let indices1 = [...Array(this.terms_array.length).keys()];
      let indices2 = [...Array(this.answers_array.length).keys()];
      let shuffled1indices = _.shuffle(indices1);
      let shuffled2indices = _.shuffle(indices2);
      this.randomterms = [];
      this.randomanswers = [];
      for (let i=0;i<this.terms_array.length;i++) {
        const termindex = shuffled1indices[i];
        const termtitle = this.terms_array[termindex];
        const myterm = {title:termtitle,index:shuffled1indices[i],disabled:false,class:this.unselected}
        this.randomterms.push(myterm);
      }
      for (let i=0;i<this.answer_exp_array.length;i++) {
        const myterm = {title:this.answers_array[shuffled2indices[i]],index:shuffled2indices[i],disabled:false,class:this.unselected}
        this.randomanswers.push(myterm);
      }
      console.log('quiz match, randomterms',this.randomterms);
      console.log('quiz match, randomanswers',this.randomanswers);
    }
    if (this.type === 'choice2') {
      //prepare randomterms and randomanswers
      //let indices1 = [...Array(this.terms_array.length).keys()];
      let indices2 = [...Array(this.answer_exp_array.length).keys()];
      //let shuffled1indices = _.shuffle(indices1);
      let shuffled2indices = _.shuffle(indices2);
      //this.randomterms = [];
      this.randomanswers = [];
      //for (let i=0;i<this.terms_array.length;i++) {
        //const termindex = shuffled1indices[i];
        //const termtitle = this.terms_array[termindex];
        //const myterm = {title:termtitle,index:shuffled1indices[i],disabled:false,class:this.unselected}
        //this.randomterms.push(myterm);
      //}
      for (let i=0;i<this.answer_exp_array.length;i++) {
//        const myterm = {title:this.answers_array[shuffled2indices[i]].answer,index:shuffled2indices[i],disabled:false,class:this.unselected}
        const myterm = {
          title:this.answer_exp_array[shuffled2indices[i]].answer,
          index:shuffled2indices[i],
          disabled:false,
          class:this.unselected,
          correct:this.answer_exp_array[shuffled2indices[i]].correct,
          explanation: this.answer_exp_array[shuffled2indices[i]].explanation,
        }
        this.randomanswers.push(myterm);
      }
//      console.log('quiz match, randomterms',this.randomterms);
      console.log('quiz match, randomanswers',this.randomanswers);
    }
    this.subscription1 = this.ea.subscribe('quizshow', quizid => {
      if (this.id === quizid)  this.show();//quizid);
    });
    this.subscription2 = this.ea.subscribe('quizhide', quizid => {
      if (this.id === quizid) this.hide();//quizid);
    });
    
  }

  attached(){
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


  /*shuffle(array) {
    var i = array.length,
        j = 0,
        temp;

    while (i--) {

        j = Math.floor(Math.random() * (i+1));

        // swap randomly chosen element with current element
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;

    }
    return array;
}*/

  submit() {
    //console.log('Bdlquis submit()');
    this.showresult = true;
    if (this.type === 'choice2') {
      if (this.selectedAnswer.correct) this.selectedAnswer.class = this.selectedcorrect;
      else this.selectedAnswer.class = this.selectedincorrect;
    }
    this.ea.publish('quizdone',this.id);
  }

  unselected = 'w3-border w3-margin w3-round-medium w3-light-grey w3-hover-green w3-padding';//class="w3-border w3-margin w3-round-small"
  selected = 'w3-border w3-margin w3-round-medium w3-hover-light-green w3-padding w3-blue';
  selectedcorrect = 'w3-border w3-margin w3-round-medium w3-hover-light-green w3-padding w3-green';
  selectedincorrect = 'w3-border w3-margin w3-round-medium w3-hover-light-green w3-padding w3-red';
  correct = 'w3-border w3-margin w3-round-medium w3-padding';
  incorrect = 'w3-border w3-margin w3-round-medium w3-red w3-hover-green w3-padding';
  correctcolors = ['w3-pale-green', 'w3-pale-blue','w3-pale-yellow','w3-amber','w3-indigo','w3-green','w3-blue']

  checkTermAnswerMatch(){
    if (this.selectedAnswer.index == this.selectedTerm.index) {
      this.selectedTerm.class = this.correct+' '+this.correctcolors[this.selectedAnswer.index]; 
      this.selectedAnswer.class=  this.correct+' '+this.correctcolors[this.selectedAnswer.index];
      this.selectedTerm.disabled = true;
      this.selectedAnswer.disabled = true;
      this.selectedAnswer = null;
      this.selectedTerm = null;
      //check if all terms are disabled
      if (this.randomterms.filter(x => !x.disabled).length === 0) this.ea.publish('quizdone',this.id);
    } else {
      this.selectedTerm.class = this.incorrect; 
      this.selectedAnswer.class=  this.incorrect;
    }
  }

  selectTerm(term){
    if (term.disabled) return;
    if (this.selectedTerm) {this.selectedTerm.class = this.unselected;}
    this.selectedTerm = term;
    if (this.selectedAnswer) {
      this.checkTermAnswerMatch();
    } else {
      this.selectedTerm.class = this.selected;
    }
  }

  selectAnswer(answer){ //in choice - answer was selected
    if (answer.disabled) return;
    if (this.selectedAnswer) {this.selectedAnswer.class= this.unselected;}
    this.selectedAnswer = answer;
    if (this.selectedTerm) {
      this.checkTermAnswerMatch();
    } else {
      this.selectedAnswer.class= this.selected;
    }

  }

  checkAnswer(answer) { //in choice2 - answer was selected
    if (answer.disabled) return;
    if (this.selectedAnswer) {this.selectedAnswer.class= this.unselected;}
    this.selectedAnswer = answer;
    this.selectedAnswer.class= this.selected;
  }
}
