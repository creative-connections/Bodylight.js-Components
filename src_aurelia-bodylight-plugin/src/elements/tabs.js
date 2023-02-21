import {bindable} from 'aurelia-templating';

/*
 listen changetabs event
 */
export class Tabs {
    @bindable idlist;
    @bindable titlelist;
    ids=[];
    @bindable w3class='w3-bar-item';
    @bindable listen;
    activeclasstemplate='w3-button w3-white w3-border-top w3-border-left w3-border-right';
    inactiveclasstemplate='w3-button w3-border-bottom w3-theme-l5';

    constructor(){
        //this is to register listener function - per aurelia docs -this needs to be done this way
        this.handleChange = e => {
            if (e.detail && e.detail.id) {
                //detail.id is name, need to match in idlist
                let myid = this.ids.find(x => x.name === e.detail.id);
                if (myid) this.open(myid);
            }
        }
    }

    bind() {
      if (this.w3class) {
          this.activeclass= this.w3class+ ' '+this.activeclasstemplate;
          this.inactiveclass= this.w3class+' '+this.inactiveclasstemplate;
      } else {
          this.activeclass= this.activeclasstemplate;
          this.inactiveclass= this.inactiveclasstemplate;
      }
      if (this.idlist) {
        //convert comma separated list of ids to array [{id:'id1',title:'id1'}]
        this.ids = this.idlist.split(',').map(x => {return {name: x, title: x, cls: this.inactiveclass};});
        if (this.titlelist) {
          let titles = this.titlelist.split(',');
          //if titles are defined, replace title in the ids array [{id:'id1',title:'title1'}]
          for (let i = 0; i < titles.length; i++) {
            if (this.ids[i]) this.ids[i].title = titles[i];
          }
        }
      }
    }
    attached() {
      console.log('tabs component', this);
      //open first, hide all no-active
      this.open(this.ids[0]);
      if (this.listen) { //ref to DOM element
          console.log('tabs component listening custom event with name:',this.listen)
          document.addEventListener(this.listen, this.handleChange);
          //else console.warn('no DOM element with id found:',this.controlid);
      }

    }

    open(newid) {
      if (this.active) {
        this.setinactive(this.active);
        this.setactive(newid);
        this.active = newid;
      } else {
        for (let id of this.ids) {
          if (id !== this.active) {this.setinactive(id);}
        }
        this.setactive(newid);
        this.active = newid;
      }
    }

    setactive(id) {
      let el = document.getElementById(id.name);
      if (el) {
        el.style.display = 'block';
        id.cls = this.activeclass;
      }
    }
    setinactive(id) {
      let el = document.getElementById(id.name);
      if (el) {
        el.style.display = 'none';
        id.cls = this.inactiveclass;
      }
    }
}
