import {HttpClient} from 'aurelia-fetch-client';
import {inject, bindable} from "aurelia-framework";
import _ from 'lodash'; // Ensure lodash is imported

@inject(HttpClient)
export class RemoteValue {
    value;
    @bindable remoteurl;
    @bindable started = false;
    remotevalue;
    @bindable remoteheader = '';
    @bindable remoteheadervalue = '';
    postvalue = '';
    @bindable interval = 500;
    @bindable id;
    starttime;
    showsettings = false;
    @bindable inputs;
    inputids = [];
    posterror = false;
    counterr = 0;
    debouncedPosts = new Map();

    constructor(httpclient) {
        this.client = httpclient;
        // Method to handle each tick
        this.handleTick = () => {            
            this.get();
  };

        this.handleValueChange = (e) => {
            //handle value changed from e.g. range component - post it
            this.postvalue = (e.detail && e.detail.value) ? e.detail.value : e.target.value;
            let targetid;
            if (e.detail && e.detail.id) targetid = e.detail.id;
            else if (e.target.id.length > 0) targetid = e.target.id;
            else targetid = e.target.parentElement.parentElement.id;
            //post it - add targetid to URL
            //this.debouncedPost(targetid,this.postvalue);
            console.log('postWithDebounce()',targetid,this.postvalue);
            this.postWithDebounce(targetid,this.postvalue);
        }
    // Create a debounced version of the post method
    //this.debouncedPost = _.debounce(this.post, 1000, { leading: true, trailing: false });
    }

    postWithDebounce(id, value) {
        if (!this.debouncedPosts.has(id)) {
          this.debouncedPosts.set(id, _.debounce((id, value) => this.post(id, value), 2000,{ leading: true, trailing: false }));
        }
        this.debouncedPosts.get(id)(id, value);
      }

    bind() {
        if (this.id) {
            //will generate fmidata event
        }
        if (typeof this.started === 'string') {
            this.started = this.started === 'true';
        }
        if (this.inputs) {
            this.inputids = this.inputs.split(';'); //array of id1;id2;id3 ...
        }

    }

    attached() {
        this.time = new Date();
        this.starttime = Math.round(this.time.getTime() / 1000);
        //this.remoteurl =         localStorage.getItem('bdl-fhir-url');
        //this.remoteheadervalue = localStorage.getItem('bdl-fhir-api-key');
        if (typeof (interval) === 'string') {
            this.interval = parseInt(this.interval)
        }
        //now start
        this.start();
        if (this.inputids.length > 0) {
            for (let myid of this.inputids) {
                const myidel = document.getElementById(myid);
                if (myidel) {console.log('remote-value adding listener to id',myid);myidel.addEventListener('input', this.handleValueChange);}
                else console.warn('cannot add listener to input for value change',myid);
            }
        }
    }

    detached() {
        this.stop();
        if (this.inputids.length > 0) {
            for (let myid of this.inputids) {
                const myidel = document.getElementById(myid);
                if (myidel) myidel.removeEventListener('input', this.handleValueChange);
            }
        }
    }

    intervalChanged(newValue, oldValue) {
        //triggered by aurelia fw when getinterval is changed
        if (typeof (this.interval) === 'string') {
            this.interval = parseInt(this.interval)
        }
    }

    stop() {
        clearInterval(this.intervalId);
        this.started = false;
    }

    start() {
        //this.get();
        this.started = !this.started;
        if (this.started) {
        this.intervalId = setInterval(() => {
            if (this.started && !this.inProgress) {
              this.handleTick();
            }
          }, 2000); // 2 seconds interval
        } else {
            this.stop();
        }
    }

    get() {
        this.inProgress = true; // Mark request as in progress
        //sends GET request to
        let myheaders = new Headers();
        //localStorage.setItem('bdl-fhir-url',this.remoteurl);
        if (this.remoteheadervalue && this.remoteheadervalue.length > 0) {
            myheaders.append(this.remoteheader, this.remoteheadervalue);
            //localStorage.setItem('bdl-fhir-api-key',this.remoteheadervalue);
        }
        this.client.fetch(this.remoteurl, {headers: myheaders})            
            .then(response => response.json())// do response.json() for json result
            .then(data => {
                //console.log('markdownaurelia fetched md:', data)
                this.counterr = 0;
                this.remotevalue = data;
                this.remotevalueformatted = JSON.stringify(this.remotevalue, null, 4)
                if (this.id) {
                    //generatefmidata event
                    let mydata = [];
                    let mytime = (Math.round((new Date()).getTime() / 100) - (this.starttime * 10)) / 10;
                    if (typeof this.remotevalue === 'object') {
                        //for (let key of Object.keys(this.remotevalue)) mydata.push(this.remotevalue[key]);
                        mydata = this.remotevalue;
                    } else if (typeof this.remotevalue === 'number') {
                        mydata.push(this.remotevalue)
                    }
                    let event = new CustomEvent('fmidata', {detail: {time: mytime, data: mydata}});
                    document.getElementById(this.id).dispatchEvent(event);
                }
                this.posterror = false;
            })
            .catch(err => {
                console.log('error', err);
                this.remotevalueformatted = err;
                this.counterr++;
                if (this.counterr>5) this.stop();
            })            
            .finally(() => {
                this.inProgress = false; // Allow the next request
              });
             //stops on error
        /*this.client.get(this.remoteurl)
            .then(response => response.json())// do response.json() for json result
            .then(data => {
                //console.log('markdownaurelia fetched md:', data)
                this.remotevalue = data;
                this.remotevalueformatted = JSON.stringify(this.remotevalue,null,4)
            });*/
    }

    round(value, decimals) {
        if (decimals < 0) {
            let posdecimals = -decimals;
            return Number(Math.round(value + 'e' + posdecimals) + 'e-' + posdecimals);
        }
        return Number(Math.round(value + 'e-' + decimals) + 'e+' + decimals);
    }


    post(id,postvalue) {
        //sends POST request tod
        let myheaders = new Headers();
        myheaders.append('Accept', 'application/json');
        myheaders.append('Content-Type', 'application/json')
        //localStorage.setItem('bdl-fhir-url',this.remoteurl);
        if (this.remoteheadervalue && this.remoteheadervalue.length > 0) {
            myheaders.append(this.remoteheader, this.remoteheadervalue);

            //localStorage.setItem('bdl-fhir-api-key',this.remoteheadervalue);
        }
        let url = this.remoteurl + (id ? '/' + id : '');
        if (!this.posterror)
        this.client.fetch(url, {method: 'post', headers: myheaders, body: postvalue})
            //.then(response => response.json())// do response.json() for json result
            .then(data => {
                //console.log('returned data:', data)
                this.remotevalueraw = data;                
                try {
                  
                  this.remotevalue = data.json();  
                  console.log('returned data:', this.remotevalue);
                  this.remotevalueformatted = JSON.stringify(this.remotevalue);
                } catch(error) {
                  console.warn('probably zero data returned', error);
                  console.warn('raw data:', data);                  
                  //this.remotevalue = "";
                  //this.remotevalueformatted = "";
                }
            })
            .catch(err => {
            console.warn('probably no data returned',err);
            this.posterror = true;
        });
    }

    forcepost() {
        this.posterror = false;
        this.debouncedPost();
    }

    showhidesettings() {
        this.showsettings = !this.showsettings;
    }

    remoteurlChanged(newValue,oldValue) {
        //in case of change restart
        if (!this.started) this.start();
    }
}
