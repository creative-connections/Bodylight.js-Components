/**
 * firebase configuration
 * subscribe to fb-get-message channel to get broadcasted messages from firebase
 * send message to fb-send-message channel to sned the message to firebase
 */
// Import the required functions from the Firebase SDK
import { initializeApp } from 'firebase/app';
//import * as firebase from "firebase/app";
import { getDatabase, ref, set, onValue, off } from 'firebase/database';
//import * as firebasedb from 'firebase/database';
import { inject, bindable } from "aurelia-framework";
import { EventAggregator } from 'aurelia-event-aggregator';
import { dPS } from './fb-dps'
import { uuidv7 } from '../utils/uuidv7'

@inject(EventAggregator)
export class FbConfig {
    @bindable apiKey;
    @bindable authDomain;
    @bindable databaseURL;
    @bindable projectId;
    @bindable storageBucket;
    @bindable messagingSenderId;
    @bindable appId;
    @bindable measurementId;
    @bindable apiStr; //encrypted above configuration
    @bindable listen = false;
    @bindable listen2; //realtime database channel to listen for answers, data are processed to aggregate counts etc.
    @bindable listen3; //realtime database channel to listen for other events, e.g. tab id
    @bindable event3; //if specified the listen3 message is sent via event aggregator channel named in this attribute to other subscribers, e.g. `showid` 
    @bindable publish; //realtime database channel to listen for other events, e.g. tab id
    @bindable event4; //if specified it is subscribed and all messages are published  through 'publish' realtime database, e.g. `showid` 
    userid;
    answersent = false;
    showbutton2 = false;  //whether to show button2
    selected2 = true; //whether the listen2 data are processed
    showbutton3 = false; //whether to show button3
    selected3 = false; //whether the listen3 data are processed
    showbutton4 = false; //whether to show publish button
    selected4 = false; //whether the publish button is selected

    constructor(ea) { this.ea = ea }

    async bind() {
        let firebaseConfig;
        console.log('FBconfig.bind()');
        if (!window.userid) {
            if (typeof crypto.randomUUID === 'function'){
                window.userid = crypto.randomUUID();}
            else {
                window.userid = uuidv7();
            }

        }
        if (this.apiStr && this.apiStr.length > 0)
            firebaseConfig = JSON.parse(await dPS(this.apiStr))
        else
            firebaseConfig = {
                apiKey: this.apiKey,
                authDomain: this.authDomain,
                databaseURL: this.databaseURL,
                projectId: this.projectId,
                storageBucket: this.storageBucket,
                messagingSenderId: this.messagingSenderId,
                appId: this.appId,
                measurementId: this.measurementId
            };
        if (firebaseConfig.databaseURL !== undefined) {
            console.log('firebaseConfig has a defined property databaseURL');
        } else {
            console.warn('firebaseConfig does not have a defined property databaseURL');
            return
        }
        this.app = initializeApp(firebaseConfig);
        this.database = getDatabase(this.app);
        if (typeof this.listen === 'string') {
            this.listen = this.listen === 'true';
        }
        if (this.listen) this.listenForMessages();
        if (this.listen2) this.listenFor2Messages();
        if (this.listen3) this.listenFor3Messages();
        if (this.publish) this.publishForMessages();

        this.subscription = this.ea.subscribe('fb-send-message', payload => {
            this.sendMessage(payload)
        });
        this.subsendanswer = this.ea.subscribe('fb-send-answer', payload => {
            this.sendAnswer(payload)
        });
        /*this.subprocessanswer = this.ea.subscribe('fb-process-answer', payload => {
            this.processAnswers()
        });*/
    }

    attached() {
    }

    detached() {
        //this.ea.
    }
    unbind() {
        this.subscription.dispose();
        this.subsendanswer.dispose();
        this.subprocessanswer.dispose();
        if (this.listen) {
            const messagesRef = ref(this.database, 'messages');

            // Detach the listener if it exists
            if (this.messagesListener) {
                off(messagesRef, 'value', this.messagesListener);
                this.messagesListener = null; // Reset the listener
            }
        }
        if (this.listen2) {
            this.showbutton2 = true;
            const messagesRef = ref(this.database, this.listen2);

            // Detach the listener if it exists
            if (this.messagesListener) {
                off(messagesRef, 'value', this.messagesListener);
                this.messagesListener = null; // Reset the listener
            }

        }
    }

    // Function to listen for new messages
    listenForMessages() {        
        const messagesRef = ref(this.database, 'messages');
        // Define the listener as an arrow function and store it
        this.messagesListener = snapshot => {
            const data = snapshot.val();
            if (data) {
                //TODO send to listening message
                //displayMessage(data.content);         
                this.ea.publish('fb-get-message', data.content);                
            }
        };
        // Attach the listener
        onValue(messagesRef, this.messagesListener);

    }

    // Function to listen for new messages
    listenFor2Messages() {
        this.showbutton2 = true;
        const messagesRef = ref(this.database, this.listen2); //answers
        // Define the listener as an arrow function and store it
        this.messagesListener = snapshot => {
            const data = snapshot.val();
            if (data) {
                //TODO send to listening message
                //displayMessage(data.content);         
                //this.ea.publish('fb-get-message-'+this.listen2, data.content);
                if (this.selected2) this.processAnswers(data);
            }
        };
        // Attach the listener
        onValue(messagesRef, this.messagesListener);
    }

    // Function to listen for new messages
    listenFor3Messages() {
        this.showbutton3 = true;
        const messagesRef = ref(this.database, this.listen3); //answers
        // Define the listener as an arrow function and store it
        this.messagesListener = snapshot => {
            const data = snapshot.val();
            if (data) {
                //TODO send to listening message
                //displayMessage(data.content);         
                if (this.selected3 && this.event3)
                  this.ea.publish(this.event3, data.content);
                //this.processAnswers(data);

            }
        };
        // Attach the listener
        onValue(messagesRef, this.messagesListener);
    }

    // Function to listen for new messages
    publishForMessages() {
        this.showbutton4 = true;
        if (this.event4) {
            this.subscription4 = this.ea.subscribe(this.event4, payload => {
                this.sendMessage4(this.publish,payload)
            });
        }
    }
    

    // Function to send a message
    async sendMessage(message) {
        console.log('sending message');
        //const message = "Hello from Master 2";
        try {
            await set(ref(this.database, 'messages'), { content: message });
            console.log('Message sent successfully');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
    // Function to send a message
    async sendMessage4(channel,message) {
        console.log('sending message');
        //const message = "Hello from Master 2";
        try {
            await set(ref(this.database, channel), { content: message });
            console.log('Message sent successfully');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    // Function to send a message
    async sendAnswer(qas) {
        if (!this.answersent) {
            //this.answersent = true;
            console.log('sending answer');
            //const message = "Hello from Master 2";
            try {
                let screenid = window.location.hash.replace(/[.#]/g, "");
                const userQuestionsRef = ref(this.database, 'answers/' + window.userid + '/questions/'+screenid);
                await set(userQuestionsRef, qas);
                console.log('Answers sent successfully');
            } catch (error) {
                console.error('Error sending answers:', error);
            }
        }

    }

    processAnswers(data) {
        //const dbRef = ref(this.database, 'answers/');
        //dbRef.once('value', snapshot => {
        //const data = snapshot.val();
        let aggregatedResults = {}
        for (let userId in data) {
            const userAnswers = data[userId];
            const screens = userAnswers.questions.screen;
            for (let screenId in screens) {
                const useranswers = screens[screenId];
                for (let answersStruct of useranswers){
                    const qid = answersStruct.id
                    const qname = answersStruct.question.slice(0,4)
                    let ar = {
                        id:qid,
                        q:qname, //first 4 chars of question
                        a: {}
                    }
                    if (aggregatedResults[qid]) {
                        //it exists, increment
                        for (let answer of answersStruct.answers) {
                            const aid = answer.charAt(0);
                            if (aggregatedResults[qid].a[aid])
                                aggregatedResults[qid].a[aid]++;
                            else
                                aggregatedResults[qid].a[aid] = 1;
                        }
                    } else {
                        //do not exist, create
                        aggregatedResults[qid] = ar;
                        for (let answer of answersStruct.answers) {
                            const aid = answer.charAt(0);
                            aggregatedResults[qid].a[aid] = 1;
                        }
                    }
                }
            }
        }
        console.log(aggregatedResults);
        this.ea.publish('fb-process-answer-result', aggregatedResults);
        // Here you can do what you need with the counts (e.g., update the UI)
    }


    // Function to display a message
    //        function displayMessage(message) {
    //            document.getElementById('messages').textContent = message;
    //        }
    click2() {this.selected2 = ! this.selected2}
    click3() {this.selected2 = ! this.selected3}
    click4() {this.selected2 = ! this.selected4}
}