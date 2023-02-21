import {HttpClient} from 'aurelia-fetch-client';
import {inject, bindable} from "aurelia-framework";

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

    constructor(httpclient) {
        this.client = httpclient;
        this.handleTick = () => {
            if (this.started) {
                //do periodic stuff
                this.get();
                //schedule next tick
                if (this.fetchinterval > 0) setTimeout(this.handleTick.bind(this), this.fetchinterval);
            } //else do nothing - stopped between ticks
        }
        this.handleValueChange = (e) => {
            //handle value changed from e.g. range component - post it
            this.postvalue = (e.detail && e.detail.value) ? e.detail.value : e.target.value;
            let targetid;
            if (e.detail && e.detail.id) targetid = e.detail.id;
            else if (e.target.id.length > 0) targetid = e.target.id;
            else targetid = e.target.parentElement.parentElement.id;
            //post it - add targetid to URL
            this.post(targetid);
        }
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
                if (myidel) myidel.addEventListener('input', this.handleValueChange);
                else console.warn('cannot add listener to input for vaue change',myid);
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
        this.started = false;
        this.fetchinterval = 0;
    }

    start() {
        //this.get();
        this.started = !this.started;
        if (this.started) {
            this.fetchinterval = this.interval;
            setTimeout(this.handleTick.bind(this), this.fetchinterval);
        } else {
            this.fetchinterval = 0;
        }
    }

    get() {
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
                this.remotevalue = data;
                this.remotevalueformatted = JSON.stringify(this.remotevalue, null, 4)
                if (this.id) {
                    //generatefmidata event
                    let mydata = [];
                    let mytime = (Math.round((new Date()).getTime() / 100) - (this.starttime * 10)) / 10;
                    if (typeof this.remotevalue === 'object') {
                        for (let key of Object.keys(this.remotevalue)) mydata.push(this.remotevalue[key]);
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
                this.stop();
            }); //stops on error
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


    post(id) {
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
        this.client.fetch(url, {method: 'post', headers: myheaders, body: this.postvalue})
            .then(response => response.json())// do response.json() for json result
            .then(data => {
                //console.log('markdownaurelia fetched md:', data)
                this.remotevalue = data;
                this.remotevalueformatted = JSON.stringify(this.remotevalue, null, 4)
            })
            .catch(err => {
            console.error('error posting data',err);
            this.posterror = true;
        });
        /*this.client.get(this.remoteurl)
            .then(response => response.json())// do response.json() for json result
            .then(data => {
                //console.log('markdownaurelia fetched md:', data)
                this.remotevalue = data;
                this.remotevalueformatted = JSON.stringify(this.remotevalue,null,4)
            });*/
    }

    forcepost() {
        this.posterror = false;
        this.post();
    }

    showhidesettings() {
        this.showsettings = !this.showsettings;
    }

    remoteurlChanged(newValue,oldValue) {
        //in case of change restart
        if (!this.started) this.start();
    }
}
