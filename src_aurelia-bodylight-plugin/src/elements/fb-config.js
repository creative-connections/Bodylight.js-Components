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
import {inject, bindable} from "aurelia-framework";
import {EventAggregator} from 'aurelia-event-aggregator';
import {dPS} from './fb-dps'

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
    @bindable apiStr;
    @bindable listen = false;
        
    constructor(ea) {this.ea = ea}

    async bind(){
        let firebaseConfig;
        if (this.apiStr && this.apiStr.length>0) 
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
        this.subscription = this.ea.subscribe('fb-send-message', payload => {
            this.sendMessage(payload)
        });
    }    

    attached(){
    }

    detached(){
        //this.ea.
    }
    unbind(){
        this.subscription.dispose();
        if (this.listen) {
            const messagesRef = ref(this.database, 'messages');
        
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
    

        // Function to display a message
//        function displayMessage(message) {
//            document.getElementById('messages').textContent = message;
//        }

}