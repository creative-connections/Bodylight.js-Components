import {bindable} from 'aurelia-templating';
export class Quiz {
  @bindable question='?';
  @bindable answers;
  @bindable explanations;
  @bindable correctoptions;
  @bindable buttontitle='check answers';

  bind() {
    this.useranswer = [];
    this.showresult = false;
    this.answers_array = this.answers.split('|').map(s => s.trim());
    this.explanation_array = this.explanations.split('|').map(s => s.trim());
    this.correct_array = this.correctoptions.split('|').map(s => s.trim());
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
  }

  submit() {
    //console.log('Bdlquis submit()');
    this.showresult = true;
  }
}
