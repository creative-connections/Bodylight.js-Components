import {bindable} from 'aurelia-framework';

export class BdlAnimateControl {
  @bindable id; //unique id of this component
  @bindable speedfactor; //0-100
  animationstarted = false;
  frame = 0;

  bind() {
    if (this.speedfactor) {
      if (typeof this.speedfactor === 'string') this.speedfactor = parseInt(this.speedfactor, 10);
      if (this.speedfactor <= 0 || this.speedfactor > 100) this.speedfactor = 100;
    }
  }
  //fires fmistart/fmistop events
  startstop() {
    this.animationstarted = !this.animationstarted;
    if (! this.animationstarted) {
      //stop animation
      //this.animationstarted = false;
      console.log('Canceling animation, this, this.request:', this, this.request);
      cancelAnimationFrame(this.request);
      //create custom event
      let event = new CustomEvent('fmistop', {detail: {time: this.frame}});
      //dispatch event - it should be listened by some other component
      document.getElementById(this.id).dispatchEvent(event);
    } else {
      //this.animationstarted = true;
      //create custom event
      let event = new CustomEvent('fmistart', {detail: {time: this.frame}});
      //dispatch event - it should be listened by some other component
      document.getElementById(this.id).dispatchEvent(event);
      let that = this;
      //animate using requestAnimationFrame
      const performAnimation = () => {
        //speedfactor is defined - then timeout slowdown
        if (this.speedfactor) {
          setTimeout(() => that.request = requestAnimationFrame(performAnimation), 1000 / (60 * that.speedfactor / 100)); //60fps is normal - calculated as 1000 ms / framespersecond
        } else that.request = requestAnimationFrame(performAnimation);
        this.step();
      };
      requestAnimationFrame(performAnimation);
    }
  }

  step() {
    this.frame++;
    //create custom event
    let event = new CustomEvent('fmidata', {detail: {time: this.frame}});
    //dispatch event - it should be listened by some other component
    document.getElementById(this.id).dispatchEvent(event);
  }
}
