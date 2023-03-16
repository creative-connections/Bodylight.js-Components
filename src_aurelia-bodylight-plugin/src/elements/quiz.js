import {bindable} from 'aurelia-templating';
import { random } from 'lodash';
export class Quiz {
  @bindable question='?';
  @bindable terms; //for matching test
  @bindable answers;
  @bindable explanations;
  @bindable correctoptions;
  @bindable buttontitle='check answers';
  @bindable type='choice'; //could be choice|match for multiple choice|matching test

  bind() {
    this.useranswer = [];
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
      let shuffled1indices = this.shuffle(indices1);
      let shuffled2indices = this.shuffle(indices2);
      this.randomterms = [];
      this.randomanswers = [];
      for (let i=0;i<this.terms_array.length;i++) {
        const myterm = {title:this.terms_array[shuffled1indices[i]],index:shuffled1indices[i],disabled:false,class:'w3-button'}
        this.randomterms.push(myterm);
      }
      for (let i=0;i<this.answers_array.length;i++) {
        const myterm = {title:this.answers_array[shuffled2indices[i]],index:shuffled2indices[i],disabled:false,class:'w3-button'}
        this.randomanswers.push(myterm);
      }
    }
  }

  shuffle(array) {
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
}

  submit() {
    //console.log('Bdlquis submit()');
    this.showresult = true;
  }

  unselected = 'w3-button';
  selected = 'w3-green w3-button';
  correct = 'w3-button';
  incorrect = 'w3-red w3-button';
  correctcolors = ['w3-pale-green', 'w3-pale-blue','w3-pale-red','w3-pale-yellow','w3-amber','w3-indigo','w3-green','w3-blue']

  checkTermAnswerMatch(){
    if (this.selectedAnswer.index == this.selectedTerm.index) {
      this.selectedTerm.class = this.correct+' '+this.correctcolors[this.selectedAnswer.index]; 
      this.selectedAnswer.class=  this.correct+' '+this.correctcolors[this.selectedAnswer.index];
      this.selectedTerm.disabled = true;
      this.selectedAnswer.disabled = true;
      this.selectedAnswer = null;
      this.selectedTerm = null;
    } else {
      this.selectedTerm.class = this.incorrect; 
      this.selectedAnswer.class=  this.incorrect;
    }
  }

  selectTerm(term){
    if (this.selectedTerm) {this.selectedTerm.class = this.unselected;}
    this.selectedTerm = term;
    if (this.selectedAnswer) {
      this.checkTermAnswerMatch();
    } else {
      this.selectedTerm.class = this.selected;
    }
  }

  selectAnswer(answer){
    if (this.selectedAnswer) {this.selectedAnswer.class= this.unselected;}
    this.selectedAnswer = answer;
    if (this.selectedTerm) {
      this.checkTermAnswerMatch();
    } else {
      this.selectedAnswer.class= this.selected;
    }

  }
}
