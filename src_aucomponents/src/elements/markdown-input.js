import {bindable} from 'aurelia-framework';
export class markdownInput {
    @bindable id;
    submit() {
      console.log('dispatching content', this.textinput.value);
      let event = new CustomEvent('contentupdate', {detail: {content: this.textinput.value}});
      //dispatch event - it should be listened by some other component
      document.getElementById(this.id).dispatchEvent(event);
    }
}
