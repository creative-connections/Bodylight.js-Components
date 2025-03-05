import { bindable } from 'aurelia-templating';
import { inject } from 'aurelia-framework';
import _ from 'lodash';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class QuizSummary {
    @bindable id;    
    qas = []
    quizids = []

    constructor(eventAggregator) {
        this.ea = eventAggregator;
    }

    bind() {
        /*this.subscription3 = this.ea.subscribe('fb-process-answer-result', answers =>{
            console.log('answers to show:',answers);
        });*/
        
        this.subscription1 = this.ea.subscribe('quizshow', quizid => {
            if (this.id === quizid) this.show();//quizid);
        });
        this.subscription2 = this.ea.subscribe('quizhide', quizid => {
            if (this.id === quizid) this.hide();
            else {
                //set default answer
                this.setDefaultAnswer(quizid)
            }
        });
        this.subscription3 = this.ea.subscribe('quizsetanswer', quizid => {
            //TODO set answer
            if (quizid.addAnswer) this.addAnswer(quizid.id,quizid.answer,quizid.answerclass);
            else if (quizid.removeAnswer) this.removeAnswer(quizid.id,quizid.answer);
            else
            this.setAnswer(quizid.id,quizid.answer,quizid.answerclass);
        })
        this.subscription4 = this.ea.subscribe('quizids', quizids => {
            if (quizids.includes(this.id)) this.quizids = quizids; //if im there then i belong to this group
        })

        /*this.qas = [
            {id:'q1',question:'1. question',answers:['B. answer'],cl:'w3-pale-blue'},
            {id:'q2',question:'2.question multi answers with some long and very long text to be truncated', answers:['A. first choice','B. second choice with again very long answer line'],cl:'w3-pale-blue'},
            {id:'q3',question:'3. question',answers:['C. answer'],cl:'w3-light-grey'},
        ]*/
    }

    attached() {
        //TODO detect siblings <quiz> and their ids to listen only to them
    }

    unbind() {
        this.subscription1.dispose()
        this.subscription2.dispose()
        //this.subscription3.dispose()
        this.subscription4.dispose()

    }

    show() {
        this.showquiz = true;
        this.backupqas = this.qas;
        this.sendAnswersToServer();
    }

    hide() {
        this.showquiz = false;
        this.backupqas = [];
    }

    setDefaultAnswer(qid2) {
        let qid = qid2;
        if (qid2.includes(';')) qid = qid2.split(';')[0]; //first is id second is id of related tabs
        if (this.quizids.includes(qid2)) {
            // Check if an item with id 'id2' exists
            let item = this.qas.find(item => item.id === qid);

            // If the item doesn't exist, add a new one with default values
            if (!item) {
                let question = '';
                let qelement = document.getElementById(qid);
                if (qelement) question = qelement.getAttribute('question');
                console.log('adding default '+qid+' question '+question);
                let newqa = { id: qid, question: question, answers: ['?'], cl: ['w3-light-grey'] }
                console.log('adding default newqa',newqa);
                this.qas.push(newqa); // Change 'id3', 'defaultQuestion', and ['defaultAnswer'] as needed
            }
        }
    }

    addAnswer(qid2,answer,aclass){
        let qid = qid2;
        if (qid2.includes(';')) qid = qid2.split(';')[0]; //first is id second is id of related tabs
        if (this.quizids.includes(qid2)) {
            let item = this.qas.find(item => item.id === qid);

            // If the item doesn't exist, add a new one with default values
            if (!item) {
                let question = '';
                let qelement = document.getElementById(qid);
                if (qelement) question = qelement.getAttribute('question');
                console.log('adding default '+qid+' question '+question);
                let newqa = { id: qid, question: question, answers: [answer], cl: [aclass] }
                console.log('adding default question aswer',newqa);
                this.qas.push(newqa); // Change 'id3', 'defaultQuestion', and ['defaultAnswer'] as needed
            } else {
                if (!item.answers.includes(answer)) {
                    if (item.answers[0] == '?') { //replace default answer
                        item.answers[0] = answer;
                        item.cl[0] = aclass;
                    } else {
                        item.answers.push(answer)
                        item.cl.push(aclass);
                    }
                }
                
            }
        }
    }
    removeAnswer(qid2,answer){
        let qid = qid2;
        if (qid2.includes(';')) qid = qid2.split(';')[0]; //first is id second is id of related tabs
        if (this.quizids.includes(qid2)) {
            let index = this.qas.findIndex(item => item.id === qid);

            // If the item doesn't exist, add a new one with default values
            if (index == -1) {
                let question = '';
                let qelement = document.getElementById(qid);
                if (qelement) question = qelement.getAttribute('question');
                console.log('adding default '+qid+' question '+question);
                let newqa = { id: qid, question: question, answers: ['?'], cl: ['w3-light-grey'] }
                this.qas.push(newqa); // Change 'id3', 'defaultQuestion', and ['defaultAnswer'] as needed
            } else {
                if (this.qas[index].answers.includes(answer)) {
                    // Find the index of 'q2' in the array
                    let index2 = this.qas[index].answers.indexOf(answer);
                    // If the item is found, remove it using splice
                    if (index2 !== -1) {
                        this.qas[index].answers.splice(index2, 1);                        
                        this.qas[index].cl.splice(index2, 1);                        
                    }                   
                    if (this.qas[index].answers.length == 0) {
                        //set default answer
                        this.qas[index].answers.push('?');
                        this.qas[index].cl.push('w3-light-grey');
                    }
                }                
            }

        }
    }
    setAnswer(qid2,answer,answerclass){
        let qid = qid2;
        if (qid2.includes(';')) qid = qid2.split(';')[0]; //first is id second is id of related tabs
        if (this.quizids.includes(qid2)) {
            // Check if an item with id 'id2' exists
            let index = this.qas.findIndex(item => item.id === qid);

            // If the item doesn't exist, add a new one with default values
            if (index == -1) {
                let question = '';
                let qelement = document.getElementById(qid);
                if (qelement) question = qelement.getAttribute('question');
                console.log('adding default '+qid+' question '+question);
                let newqa = { id: qid, question: question, answers: [answer], cl: [answerclass] }
                console.log('adding default newqa',newqa);
                this.qas.push(newqa); // Change 'id3', 'defaultQuestion', and ['defaultAnswer'] as needed
            } else {
                this.qas[index].answers[0] = answer;
                this.qas[index].cl[0] = answerclass;
                //TODO add green for correct and red for incorrect answer
            }
        }
        return true;
    }

    sendAnswersToServer() {
        this.ea.publish('fb-send-answer',this.qas);
    }
}