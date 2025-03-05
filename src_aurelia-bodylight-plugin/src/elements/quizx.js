import {bindable} from 'aurelia-templating';
import {inject} from 'aurelia-framework';
import _ from 'lodash';
import {EventAggregator} from 'aurelia-event-aggregator';
  
@inject(EventAggregator)
export class Quizx {
  @bindable question='?';
  @bindable terms; //for matching test
  @bindable answers;
  @bindable explanations;
  @bindable correctoptions;
  @bindable buttontitle='check answers';
  @bindable type='choice'; //could be choice|match for multiple choice|matching test
  @bindable id;
  showresults = false;
  showhint = false;
  answer_exp_array = [];
  
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
    this.showresults = window.bdlshowresults;

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
      console.log('quizx match, randomterms',this.randomterms);
      console.log('quizx match, randomanswers',this.randomanswers);
    }
    if (this.type === 'choice2') {
      //prepare randomterms and randomanswers
      //let indices1 = [...Array(this.terms_array.length).keys()];
      let indices2 = [...Array(this.answer_exp_array.length).keys()];
      //let shuffled1indices = _.shuffle(indices1);
      
      //do not shuffle choice2
      //let shuffled2indices = _.shuffle(indices2);
      let shuffled2indices = indices2;
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
      console.log('quizx match, randomanswers',this.randomanswers);
    }
    this.subscription1 = this.ea.subscribe('quizshow', quizid => {
      if (this.check(quizid,this.id)) this.show();//quizid);
    });
    this.subscription2 = this.ea.subscribe('quizhide', quizid => {
      if (this.check(quizid,this.id)) this.hide();//quizid);
    }); 
    this.subscription3 = this.ea.subscribe('fb-process-answer-result', qa =>{
      //this.hints = answerresults;
      //this.id
      if (qa[this.id]) {
        this.bindhint(qa)
      }
      //console.log('answers to show:',answerresults);
  });   
  }

  bindhint(qa){
    const answers = qa[this.id].a;
    for (const key of Object.keys(answers)) {
      const value = answers[key];      
      if (this.randomanswers) {
        const myanswer = this.randomanswers.find(el => el.title.startsWith(key))
        if (myanswer) {myanswer.hint = value; this.showhint=true}
      } else {
        //choice - anwer_exp_array
        const myanswer = this.answer_exp_array.find(el => el.answer.startsWith(key))
        if (myanswer) {myanswer.hint = value; this.showhint=true}
      }
    }
  }

  check(qid,qid2){
    if (qid.includes(';')){
      const qids = qid.split(';')
      return qids.includes(qid2);
    } else return qid === qid2;
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

  unselected = 'w3-border w3-margin w3-round-medium w3-light-grey w3-padding';//class="w3-border w3-margin w3-round-small"
  selected = 'w3-border w3-margin w3-round-medium w3-padding w3-blue';
  selectedcorrect = 'w3-border w3-margin w3-round-medium w3-padding w3-green';
  selectedincorrect = 'w3-border w3-margin w3-round-medium w3-padding w3-red';
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
    
    let setqa = {id:this.id,answer:this.selectedAnswer.title,answerclass:answer.correct?'w3-pale-green':'w3-pale-red'}
    console.log('quizx checkanswer setqa',setqa)
    this.ea.publish('quizsetanswer', setqa)
    if (this.showresults){
      //show whether this answer is correct or not
      answer.showresult = true;
      if (answer.correct) answer.class = this.selectedcorrect;
      else answer.class = this.selectedincorrect;
    }    
    /*this.subscription3 = this.ea.subscribe('quizsetanswer', quizid => {
      //TODO set answer
      this.setAnswer(quizid.id,quizid.answer);
    }*/
  }


  checkCheckboxAnswer(answer) {
    console.log('check CheckboxAnswer',answer)
    //answer.user = !answer.user //change checkbox
    if (answer.user) {
      console.log('publishing answer',answer)
      let setqa = {id:this.id,answer:answer.answer,addAnswer:true,answerclass:(answer.correct)?'w3-pale-green':'w3-pale-red'}
      console.log('publishing setqa',setqa)
      this.ea.publish('quizsetanswer', setqa)
    } else {
      let setqa = {id:this.id,answer:answer.answer,removeAnswer:true}
      this.ea.publish('quizsetanswer', setqa)
    }
    if (this.showresults){
      //show whether this answer is correct or not
      answer.showresult = true;
    }
  }
}
