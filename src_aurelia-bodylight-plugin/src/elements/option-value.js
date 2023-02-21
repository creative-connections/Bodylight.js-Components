import {bindable} from "aurelia-framework";

/**
 * <bdl-option-value value="some default value" ids="id1,attr1;id2,attr2"></bdl-option-value>
 * value is deafult value - it can be changed in input field
 * ids is ';' and ',' separated values of id and attributes to be changed when value is changed in inputfield
 */
export class OptionValue {
    @bindable value;
    @bindable ids;
    regex = /http:\/\/[^\/]*/i;
    myids;

    bind(){
        let iddef = this.ids.split(';'); // id1,attr1;id2,attr2
        this.myids = iddef.map( x => x.split(','));
    }

    valueChanged(newValue,oldValue) {
        for (let myid of this.myids) {
            let myattrvalue = document.getElementById(myid[0]).getAttribute(myid[1]);
            myattrvalue.replace(this.regex,newValue);
            document.getElementById(myid[0]).setAttribute(myid[1], myattrvalue);
        }
    }
}
