import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class QuizPresent{
    constructor(eventAggregator) {
        this.ea = eventAggregator;
    }

    answers = {"q1.1":{"id":"q1.1","q":"1.1 ","a":{"A":19,"B":19,"C":21,"D":21,"E":21,"?":1,"H":7}},"q1.2":{"id":"q1.2","q":"1.2 ","a":{"C":18,"?":1,"B":3}},"q1.3":{"id":"q1.3","q":"1.3 ","a":{"B":17,"?":1,"C":4}},"q1.4":{"id":"q1.4","q":"1.4 ","a":{"B":21,"?":1}},"q1.5":{"id":"q1.5","q":"1.5 ","a":{"C":21,"?":1}},"q1.6":{"id":"q1.6","q":"1.6 ","a":{"C":21,"?":1}},"q2.1":{"id":"q2.1","q":"2.1 ","a":{"A":17,"B":3,"?":2}},"q2.2":{"id":"q2.2","q":"2.2 ","a":{"A":20,"B":1,"?":1}},"q2.3":{"id":"q2.3","q":"2.3 ","a":{"A":18,"B":3,"?":1}},"q2.4":{"id":"q2.4","q":"2.4 ","a":{"A":4,"B":17,"?":1}},"q2.5":{"id":"q2.5","q":"2.5 ","a":{"A":17,"B":5}},"q2.6":{"id":"q2.6","q":"2.6 ","a":{"A":1,"C":21}},"q3.4":{"id":"q3.4","q":"3.4 ","a":{"B":20,"C":1}},"q3.5":{"id":"q3.5","q":"3.5 ","a":{"C":3,"A":18}},"q3.7":{"id":"q3.7","q":"3.7 ","a":{"B":2,"A":19}},"q3.8":{"id":"q3.8","q":"3.8 ","a":{"A":4,"B":17}},"q3.9":{"id":"q3.9","q":"3.9 ","a":{"B":2,"A":19}},"q3.10":{"id":"q3.10","q":"3.10","a":{"A":19,"B":2}},"q3.11":{"id":"q3.11","q":"3.11","a":{"B":17,"A":4}},"q3.12":{"id":"q3.12","q":"3.12","a":{"B":4,"A":17}},"q3.14":{"id":"q3.14","q":"3.14","a":{"B":21}}}
    /*answers = [{"id":"q1.1","q":"1.1 ","a":{"A":19,"B":19,"C":21,"D":21,"E":21,"?":1,"H":7}},
               {"id":"q1.2","q":"1.2 ","a":{"C":18,"?":1,"B":3}},
               {"id":"q1.3","q":"1.3 ","a":{"B":17,"?":1,"C":4}},
               {"id":"q1.4","q":"1.4 ","a":{"B":21,"?":1}},
               {"id":"q1.5","q":"1.5 ","a":{"C":21,"?":1}},
               {"id":"q1.6","q":"1.6 ","a":{"C":21,"?":1}},
               {"id":"q2.1","q":"2.1 ","a":{"A":17,"B":3,"?":2}},
               {"id":"q2.2","q":"2.2 ","a":{"A":20,"B":1,"?":1}},
               {"id":"q2.3","q":"2.3 ","a":{"A":18,"B":3,"?":1}},
               {"id":"q2.4","q":"2.4 ","a":{"A":4,"B":17,"?":1}},
               {"id":"q2.5","q":"2.5 ","a":{"A":17,"B":5}}]//,"q2.6":{"id":"q2.6","q":"2.6 ","a":{"A":1,"C":21}},"q3.4":{"id":"q3.4","q":"3.4 ","a":{"B":20,"C":1}},"q3.5":{"id":"q3.5","q":"3.5 ","a":{"C":3,"A":18}},"q3.7":{"id":"q3.7","q":"3.7 ","a":{"B":2,"A":19}},"q3.8":{"id":"q3.8","q":"3.8 ","a":{"A":4,"B":17}},"q3.9":{"id":"q3.9","q":"3.9 ","a":{"B":2,"A":19}},"q3.10":{"id":"q3.10","q":"3.10","a":{"A":19,"B":2}},"q3.11":{"id":"q3.11","q":"3.11","a":{"B":17,"A":4}},"q3.12":{"id":"q3.12","q":"3.12","a":{"B":4,"A":17}},"q3.14":{"id":"q3.14","q":"3.14","a":{"B":21}}}
               */
    //answers = {}

    bind() {
        this.subscription = this.ea.subscribe('fb-process-answer-result', answers =>{
            this.answers = answers;
            console.log('answers to show:',answers);
        });
        //this.answers = JSON.parse(this.answers_str)
    }

    attached() {
        /*for (let myanswer of this.answers) {
            let qelement = document.getElementById(qid);
            let myspans = qelement.querySelectorAll('span');
            myspans.forEach(span =>{
                if (span.textContent.startsWith('A')) {
                    // Create new span with specified styles and content
                    const newSpan = document.createElement('span');
                    newSpan.style.position = 'absolute';
                    newSpan.style.backgroundColor = 'greenyellow';
                    newSpan.textContent = mynumber; // Set text to `mynumber`
                    // Append the new span to the parent of the matching span
                    span.parentNode.insertBefore(newSpan, span.nextSibling);
                }
            })
        }*/

        
    }

    unbind(){
        this.subscription.dispose();
    }
}
export class KeysValueConverter {
    toView(obj) {
      return Reflect.ownKeys(obj);
    }
}