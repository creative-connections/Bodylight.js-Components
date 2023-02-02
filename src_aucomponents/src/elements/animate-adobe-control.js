import {bindable} from 'aurelia-templating';
export class AnimateAdobeControl {
    @bindable id;
    animationstarted = true;
    //frame = 0;
    onetime = false;

    attached(){
        if (window.ani) {
            //window.ani.startAllAnimation();
            //window.ani.startAllAnimation();
            //try to set animationstarted to true -
            window.ani.animationstarted=true;
            //this.animationstarted = window.ani.animationstarted;
        } else {
            setTimeout(() =>{
                if (window.ani) {window.ani.animationstarted = true;} else {
                  console.warn('animate-control: cannot start animation automatically');
                }
              }, 300)
        }
    }

    startstop() {
      console.log('animateadobecontrol startstop()', this);
      if (!this.onetime && !this.animationstarted) {
          //animate-adobe component playafterstart=false - start it once
          window.ani.startAllAnimation();
          this.onetime = true;
      } else {
          if (window.ani && window.ani.animationstarted) window.ani.disableAnimation();
          else if (window.ani && !window.ani.animationstarted) {
              window.ani.enableAnimation();
          }
          this.animationstarted = window.ani.animationstarted;
          //let event = new CustomEvent(eventname, {detail: {time: this.frame}}); //send start signal on frame 0
          //dispatch event - it should be listened by some other component
          //document.getElementById(this.id).dispatchEvent(event);
      }
    }

    step() {
      if (!this.animationstarted) this.startstop();
      setTimeout(()=>{this.startstop();}, 100);
    }
}
