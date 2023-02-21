import {bindable} from 'aurelia-framework';
//import '@danzen/createjs';
//import 'createjs/builds/1.0.0/createjs';
import 'latest-createjs';
//import 'createjs/builds/1.0.0/createjs';
//import * as createjs from 'createjs/builds/1.0.0/createjs';

/**
 * Exposes animation exported from Adobe Animate to JS CreateJS
 *
 */
export class AnimateAdobe {
    @bindable src;
    @bindable width=800;
    @bindable height=600;
    @bindable name;//="ZelezoCelek"
    @bindable cid;//="3CC81150E735AE4485D4B0DF526EB8B4";
    @bindable fromid;
    @bindable fmuid; //optional -if not defined fromid is taken, fmu event is listened by fromid element
    @bindable responsive;
    @bindable playafterstart;
    animationstarted = false;

    constructor() {
      //console.log('animate-adobe constructor()');
      //fix issue - some bindings not detached
      //window.animatebindings = [];
      this.handleValueChange = e => {
        //set animation started when data comes - in case of fmu started in shared model.md page and fmu continues to send data
        if (!this.animationstarted) this.animationstarted = true;
        this.handleData(e);
      };
      this.handleFMIAttached = e => {
        let fromel = document.getElementById(this.fromid);
        if (fromel) {
          this.registerAnimateEvents(fromel);
          if (this.fmuid) {this.registerFMUEvents(document.getElementById(this.fmuid))}
          else this.registerFMUEvents(fromel);
        } else {
          console.warn('adobe-animate component configured to listen non-existing element with id:', this.fromid);
        }
      }
      this.animateData = e => {

      }
      this.handleFMIStart = e => { this.enableAnimation();}
      this.handleFMIStop = e => {this.disableAnimation();}
      this.handlaAnimateStart = e => {this.startAllAnimation();}
      this.handleAnimateStop = e => {this.stopAllAnimation();}
    }

    registerAnimateEvents(fromel)        {
      fromel.addEventListener('animatestart', this.handlaAnimateStart);
      fromel.addEventListener('animatestop', this.handleAnimateStop);
      fromel.addEventListener('animatedata',this.animateData);
    }

    registerFMUEvents(fromel)         {
      fromel.addEventListener('fmidata', this.handleValueChange);
      fromel.addEventListener('fmistart', this.handleFMIStart);
      fromel.addEventListener('fmistop', this.handleFMIStop);
    }
    /**
     * adds listeners to the component 'fromid' and listens to following
     * 'animatestart' starts all animation
     * 'animatestop' stops all animation
     * 'fmidata' handles data and per bind2animation structure sets animation value
     */
    bind() {
      if (this.fromid) {
        let fromel = document.getElementById(this.fromid);
        if (fromel) {
          this.registerAnimateEvents(fromel);
          if (this.fmuid) {this.registerFMUEvents(document.getElementById(this.fmuid))}
          else this.registerFMUEvents(fromel);
        } else {
          console.warn('adobe-animate waiting for fmi component to be attached');
          document.addEventListener('fmiattached',this.handleFMIAttached);
        }
      }
    }

    attached() {
      //disable animation if enabled from previous
      console.log('adobeobj attached()');
      if (window.ani) this.disableAnimation();
      if (this.responsive && (typeof this.responsive === 'string')) this.responsive = this.responsive==='true';
      if (this.playafterstart && (typeof this.playafterstart === 'string')) this.playafterstart = this.playafterstart ==='true';
      //this.adobecanvas = document.getElementById("canvas");
      //this.anim_container = document.getElementById("animation_container");
      //this.dom_overlay_container = document.getElementById("dom_overlay_container");
      //      console.log('animate-adobe attached() window.ani.adobecanvas,window.ani.anim_container,window.ani.dom_overlay_container',this.adobecanvas,this.anim_container,this.dom_overlay_container);
      let that = this;
      let continueAfter = () => {
        if (typeof createjs === 'undefined') console.log('WARN: createjs not present');
        //if (!window.createjs) window.createjs = createjs;
        //make this component global - due to further calls
        that.bindings = [];
        window.ani = that;
        //detects and if not present - adds script with JS into DOM - so browser will load it, after that, initAdobe() will be called
        this.getScript(that.src, that.initAdobe);
        that.ratio = that.width / that.height;
        //window.addEventListener('resize', this.handleResize);
      };

      //check global instance of createjs - if not present wait 500 ms
      if (typeof createjs === 'undefined') {
        //console.log('INFO: waiting 500ms for createjs ');
        setTimeout(() => continueAfter, 500);
      } else continueAfter();
    }

    makeResponsive(isResp, respDim, isScale, scaleType, domContainers) {
      //let lastW; let lastH; let lastS = 1;
      window.addEventListener('resize', window.ani.handleResize);
      window.ani.isResp = isResp;
      window.ani.respDim = respDim;
      window.ani.isScale = isScale;
      window.ani.scaleType = scaleType;
      window.ani.domContainers = domContainers;
      window.ani.handleResize();
    }

    handleResize() {
      console.log('animateadobe handleResize()');
      //do not run if ani.lib is not defined - no adobe component is available
      if (!window.ani.lib) return;
      let w = window.ani.lib.properties.width; let h = window.ani.lib.properties.height;
      let iw = window.innerWidth;
      let ih = window.innerHeight;
      if (window.ani.adobecanvas && window.ani.adobecanvas.parentElement && window.ani.adobecanvas.parentElement.parentElement && window.ani.adobecanvas.parentElement.parentElement.parentElement) {
        iw = window.ani.adobecanvas.parentElement.parentElement.parentElement.offsetWidth;
        ih = window.ani.adobecanvas.parentElement.parentElement.parentElement.offsetHeight;
      }
      ih = iw / ( w / h );
      //let iw = window.innerWidth; let ih = window.innerHeight;
      let pRatio = window.devicePixelRatio || 1; let xRatio = iw / w; let yRatio = ih / h; let sRatio = 1;
      if (window.ani.isResp) {
        if ((window.ani.respDim === 'width' && window.ani.lastW === iw) || (window.ani.respDim === 'height' && window.ani.lastH === ih)) {
          sRatio = window.ani.lastS;
        } else if (!window.ani.isScale) {
          if (iw < w || ih < h) {sRatio = Math.min(xRatio, yRatio);}
        } else if (window.ani.scaleType === 1) {
          sRatio = Math.min(xRatio, yRatio);
        } else if (window.ani.scaleType === 2) {
          sRatio = Math.max(xRatio, yRatio);
        }
      }
      window.ani.domContainers[0].width = w * pRatio * sRatio;
      window.ani.domContainers[0].height = h * pRatio * sRatio;
      window.ani.domContainers.forEach(function(container) {
        container.style.width = w * sRatio + 'px';
        container.style.height = h * sRatio + 'px';
      });
      window.ani.stage.scaleX = pRatio * sRatio;
      window.ani.stage.scaleY = pRatio * sRatio;
      window.ani.lastW = iw; window.ani.lastH = ih; window.ani.lastS = sRatio;
      window.ani.stage.tickOnUpdate = false;
      window.ani.stage.update();
      window.ani.stage.tickOnUpdate = true;
    }

    //handleResize(); // First draw
    detached() {
      console.log('adobeobj detached()');
      //stop animation
      this.disableAnimation();
      //remove script
      this.removeScript(this.src);
      //destroy bindings
      this.bindings = [];
      //remove listeners
      let fromel = document.getElementById(this.fromid);
      if (fromel) {
        fromel.removeEventListener('animatestart', this.startAllAnimation);
        fromel.removeEventListener('animatestop', this.stopAllAnimation);
        fromel.removeEventListener('fmidata', this.handleValueChange);
        fromel.removeEventListener('fmistart', this.enableAnimation);
        fromel.removeEventListener('fmistop', this.disableAnimation);
      }
      this.destroyAdobe();
      document.removeEventListener('fmiattached',this.handleFMIAttached);
    }

    destroyAdobe() {
      console.log('animate adobe destroy()');
      if (window.stage) {
        window.stage.enableMouseOver(-1);
        window.stage.enableDOMEvents(false);
        window.stage.removeAllEventListeners();
        window.stage.removeAllChildren();
        window.stage.canvas = null;
        window.stage = null;
      }
      if (window.ani && window.ani.exportRoot) window.ani.exportRoot = null;
      if (window.ani && window.ani.ss) window.ani.ss = null;
      if (window.ani && window.ani.lib) window.ani.lib = null;
      if (window.ani && window.ani.comp) window.ani.comp = null;
      if (window.ani && window.ani.cid) window.ani.cid = null;
      if (window.ani && window.ani.objs) window.ani.objs = null;
      if (window.ani && window.ani.animobjs) window.ani.animobjs = null;
      if (window.ani && window.ani.textobjs) window.ani.textobjs = null;
      if (window.ani && window.ani.playobjs) window.ani.playobjs = null;
      //if (window.AdobeAn) window.AdobeAn = null;
    }

    removeScript(source) {
      let src = window.bdlBaseHref ? window.bdlBaseHref + source : source;
      let tags = document.getElementsByTagName('script');
      for (let i = tags.length; i >= 0; i--) { //search backwards within nodelist for matching elements to remove
        if (tags[i] && tags[i].getAttribute('src') !== null && tags[i].getAttribute('src').indexOf(src) !== -1) {tags[i].parentNode.removeChild(tags[i]);} //remove element by calling parentNode.removeChild()
      }
    }

    //get script element and registers 'onload' callback to be called when the script is loaded
    getScript(source, callback) {
      //check whether the script is not already there
      if (Array.from(document.getElementsByTagName('script')).filter(x=> x.getAttribute('src') === source).length > 0) {
        console.warn('AnimateAdobe.getScript() WARNING, script is already added into DOM:', source);
        //do callback?
        if (callback) setTimeout(callback, 0);
        return;
      }
      //console.log('animateadobe getscript()');
      let script = document.createElement('script');
      let prior = document.getElementsByTagName('script')[0];
      script.async = 1;
      //set that after onload a callback will be executed
      script.onerror = function() {
        if (!script.readyState || /loaded|complete/.test(script.readyState) ) {
          script.onerror = script.onload = script.onreadystatechange = null;
          script = undefined;
          // try to insert script by other app for previewing - scripts might be inserted into DOM
          if (window.editorapi && (typeof window.editorapi.insertScriptById === 'function')) {
            //disable previoues definition
            window.ani.destroyAdobe();
            //enable current def
            //console.log('inserting script by thirdparty api');
            window.editorapi.insertScriptById(source, 'adobeobj')
              .then(innerscript => {
                //console.log('third party script node', innerscript);
                try {
                  // eslint-disable-next-line no-eval
                  eval(innerscript.innerHTML);
                } catch (e) {
                  console.warn('Error during evaluation of adobe script. Probably OK to ignore', e.message);
                }
                if (callback) setTimeout(callback, 1000);
              });
          }
          // do callback after 2s
          //if (callback) setTimeout(callback, 1000);
        }
      };
      script.onload = script.onreadystatechange = function( _, isAbort ) {
        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState) ) {
          script.onerror = script.onload = script.onreadystatechange = null;
          script = undefined;

          if (!isAbort && callback) setTimeout(callback, 0);
        }
      };
      //set script source - if base url is defined then base is prefixed
      script.src = window.bdlBaseHref ? window.bdlBaseHref + source : source;
      //add custom animate script into DOM - the onload will be called then
      prior.parentNode.insertBefore(script, prior);
    }

    //this is called after animate script is loaded into DOM, so global AdobeAn is available
    initAdobe() {
      console.log('animateadobe initAdobe()');
      //search for composition which has the 'name' in library
      for (let cid of Object.keys(window.AdobeAn.compositions)) {
        let comp = window.AdobeAn.getComposition(cid);
        let lib = comp.getLibrary();
        if (lib[window.ani.name] || lib['_'+window.ani.name]) {
          window.ani.lib = lib;
          window.ani.comp = comp;
          break;
        }
      }
      //take the first composition
      /*if (!window.ani.cid) {
        window.ani.cid = Object.keys(window.AdobeAn.compositions)[0]; //get the first composition
      }
      window.ani.comp = window.AdobeAn.getComposition(window.ani.cid);
      //let lib=comp.getLibrary();

      //get library to manipulate and other components
      window.ani.lib = window.ani.comp.getLibrary();

       */
      window.ani.ss = window.ani.comp.getSpriteSheet();
      //do initialize Spreadsheet if exists
      /*var ssMetadata = lib.ssMetadata;
      for(i=0; i<ssMetadata.length; i++) {
        ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
      }*/
      //window.ani.ssMetadata = window.ani.lib.ssMetadata;
      //TODO add support for spreadsheat
      /*if (window.ani.lib.ssMetadata.length>0) {
        let ssMetadata = window.ani.lib.ssMetadata;
        let queue = evt.target;
        for(let i=0; i<ssMetadata.length; i++) {
          window.ani.ss[ssMetadata[i].name] = new window.createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
        }
      }*/
      window.ani.exportRoot = new window.ani.lib[window.ani.name]();
      //set stage to be bind into ref='adobecanvas' DOM element of this component
      window.ani.stage = new window.ani.lib.Stage(window.ani.adobecanvas);
      window.stage = window.ani.stage;
      //Registers the "tick" event listener.
      let fnStartAnimation = function() {
        window.ani.stage.addChild(window.ani.exportRoot);
        //by default ticker uses setTimeout API, force to use requestAnimationFrame API
        window.createjs.Ticker.timingMode = window.createjs.Ticker.RAF_SYNCHED;
        window.createjs.Ticker.framerate = window.ani.lib.properties.fps;
        //window.createjs.Ticker.addEventListener('tick', window.ani.stage);
        window.ani.enableAnimation();
        if (!window.ani.playafterstart) window.ani.animationstarted = false; //initial animation is not started - will be stopped by following, if another event will set it to started
      };
      //Code to support hidpi screens and responsive scaling.
      //window.AdobeAn.makeResponsive(true, 'both', true, 1, [window.ani.adobecanvas, window.ani.anim_container, window.ani.dom_overlay_container]);
      if (window.ani.responsive) window.ani.makeResponsive(true, 'both', true, 1, [window.ani.adobecanvas, window.ani.anim_container, window.ani.dom_overlay_container]);
      window.AdobeAn.compositionLoaded(window.ani.lib.properties.id);
      //window.ani.handleResize();
      fnStartAnimation();
      setTimeout(()=>{
        /*
        //get all objects from animation
        window.ani.objs = Object.keys(window.ani.exportRoot.children[0]);
        //filter objects by purpose - so it can be bind to model value
        window.ani.animobjs = window.ani.objs.filter(name => name.includes('_anim'));
        window.ani.textobjs = window.ani.objs.filter(name => name.includes('_text'));
        window.ani.playobjs = window.ani.objs.filter(name => name.includes('_play'));
        window.ani.rangeobjs = window.ani.objs.filter(name => name.includes('_range'));
        //set default value to range objs
        for (let robj of window.ani.rangeobjs) {}
        */
        if (window.ani && window.ani.exportRoot) {
          window.ani.animobjs = window.ani.discoverChildren(window.ani.exportRoot, '', '_anim');
          //console.log('discoverAdobeAnimate() animobjs:', this.animobjs);
          window.ani.textobjs = window.ani.discoverChildren(window.ani.exportRoot, '', '_text');
          window.ani.playobjs = window.ani.discoverChildren(window.ani.exportRoot, '', '_play');
          window.ani.rangeobjs = window.ani.discoverChildren(window.ani.exportRoot, '', '_range');
          //set default value to range
          for (let robj of window.ani.rangeobjs) {robj.setValue(50);}
        } else {
          console.log('error, Animate object is not yet accessible. Try to refresh after while');
        }
        //stop animation if it is not yet started by other events, adobe automatically starts animation
        if (!window.ani.animationstarted) {
          //stop all animation
          window.ani.stopAllAnimation();
          //disable animation ticker
          window.ani.disableAnimation();
          //TODO fix bug - model in different md not
          //sent ready signal - fmu may make step if oneshot
          //workaround after resize the artifacts are updated
          //window.ani.handleResize();
        }
        let event = new CustomEvent('fmiregister');
        document.dispatchEvent(event);

      }, 1000);
    }
    /**
   * Discovers animable objects in Adobe Animation
   * Should be called when a dialog needs animobjs for select form etc.
   */
  discoverAdobeAnimate() {
    if (window.ani && window.ani.exportRoot) {
      this.animobjs = this.discoverChildren(window.ani.exportRoot, '', '_anim');
      //console.log('discoverAdobeAnimate() animobjs:', this.animobjs);
      this.textobjs = this.discoverChildren(window.ani.exportRoot, '', '_text');
      this.playobjs = this.discoverChildren(window.ani.exportRoot, '', '_play');
      this.rangeobjs = this.discoverChildren(window.ani.exportRoot, '', '_range');
    } else {
      console.log('error, Animate object is not yet accessible. Try to refresh after while');
    }
  }

  // returns array of strings in form @preffix.name in case name contains @suffix
  // root is root element array like, it's property name is checked for prefix
  //in form prefix - root name e.g. ['ventricles.ventriclesTotal.VentricleLeft_anim','ventricles.ventriclesTotal.VentricleRight_anim']
  discoverChildren(root, prefix, suffix) {
    let discovered = [];
    //console.log('discovering', prefix);
    if (root.children) {
    //depth first
      for (let child of root.children) {
        //object including suffix is what we need to discover
        if (child.name && child.name.includes(suffix)) {
          discovered.push(child);
        }
        //index needed when 'name' is undefined - so access via index in array
        let index = 0;
        if (!child.name) index = root.children.indexOf(child); //name is not defined then discover index
        if (child.children) {
          discovered = discovered.concat(
            //recursive calling to discover names in all children
            this.discoverChildren(
              child,
              child.name ? prefix + child.name + '.' : prefix + 'children.' + index + '.',
              //add name into the discovered childre, e.g. full.myname
              //otherwise add children.$index - e.g. full.children.1
              suffix
            )
          );
        }
      }
    }
    return discovered;
  }


    /**
     * starts animation of particular object
     * @param objname
     */
    startAnimation(objname) {
      console.log('animateadobe startAnimation() of object');
      const resolvePath = (object, path, defaultValue) => path
        .split('.')
        .reduce((o, p) => o ? o[p] : defaultValue, object);
      let myobj = resolvePath(window.ani.exportRoot, objname, undefined);
      //backward compatibility
      if (!myobj) myobj = resolvePath(window.ani.exportRoot.children[0], objname, undefined);
      if (myobj) myobj.play();
      /*if (this.exportRoot && this.exportRoot.children[0][objname]) {
        this.exportRoot.children[0][objname].play();
      }*/
      //this.timeline.addTween(cjs.Tween.get(this.instance).to({alpha:1},159).wait(1));
    }

    /**
     * stops animation of particular object
     * @param objname
     */
    stopAnimation(objname) {
      console.log('animateadobe stopAnimation() of object');
      const resolvePath = (object, path, defaultValue) => path
        .split('.')
        .reduce((o, p) => o ? o[p] : defaultValue, object);
      let myobj = resolvePath(window.ani.exportRoot, objname, undefined);
      //backward compatibility
      if (!myobj) myobj = resolvePath(window.ani.exportRoot.children[0], objname, undefined);
      if (myobj) myobj.stop();
    }

    /**
     * set the animation value of the object objname
     * @param objname
     * @param value
     */

    setAnimationValue(objname, value) {
      //console.log('animateadobe setAnimationValue',value);
      //console.log('adobe-animate() setting window.ani.exportRoot.children[0][' + objname + '].gotoAndStop(' + value + ')');
      if (window.ani.exportRoot) {
        //resolve path from string
        const resolvePath = (object, path, defaultValue) => path
          .split('.')
          .reduce((o, p) => o ? o[p] : defaultValue, object);
        let myobj = resolvePath(window.ani.exportRoot, objname, undefined);
        //backward compatibility
        if (!myobj) myobj = resolvePath(window.ani.exportRoot.children[0], objname, undefined);
        if (myobj) myobj.gotoAndStop(Math.floor(value));
        else console.warn('objname is undefined for window.ani.exportRoot', objname);
        //window.ani.exportRoot.children[0][objname].gotoAndStop(value);
      }
    }

    /**
     * stops all animation
     */
    stopAllAnimation() {
      console.log('animateadobe stopAllAnimation');
      if (window.ani.stage) {
        window.ani.stage.stop();
      }
    }

    disableAnimation() {
      console.log('animateadobe disableAnimation');
      if (window.ani) {
        window.ani.animationstarted = false;
        if (window.ani.stage) {
          window.createjs.Ticker.removeEventListener('tick', window.ani.stage);
          this.deregisterInputs();
        }
      }
    }

    enableAnimation() {
      console.log('animateadobe enableAnimation');
      if (window.ani.stage) {
        //listen to ticks will enable animation
        window.createjs.Ticker.addEventListener('tick', window.ani.stage);        
        //register inputs range
        this.registerInputs();
      }
      window.ani.animationstarted = true;
    }

    /**
     * starts all animation
     */
    startAllAnimation() {
      console.log('adobeobj startAllAnimation()');
      if (window.ani.stage) {
        //TODO call removeEventListener and refactor adding listener when animation should start
        if (!window.ani.animationstarted) window.ani.enableAnimation();//window.createjs.Ticker.addEventListener('tick', window.ani.stage);
        window.ani.stage.play();
      } else {
        console.warn('adobeobj startAllAnimation() window.ani.stage not available, try to reschedule after 1s');
        //try to reschedule after 1000 ms
        setTimeout(()=>{
          if (window.ani.stage) {
            //TODO call removeEventListener and refactor adding listener when animation should start
            if (!window.ani.animationstarted) window.ani.enableAnimation();//window.createjs.Ticker.addEventListener('tick', window.ani.stage);
            window.ani.stage.play();
          } else {
            console.error('adobeobj startAllAnimation() window.ani.stage not available after 2nd attemp');
          }
        },1000);
      }
    }

    /**
     * starts animation for 20 ms and stops it again
     */
    stepAllAnimation() {
      console.log('animateadobe stepAnimation, stop after 20ms');
      if (window.ani.stage) {
        window.ani.stage.play();
        setTimeout(()=>{window.ani.stage.stop();}, 20);
      }
    }

    /**
     * Sets text content of object in Adobe Animate
     * @param objname
     * @param textvalue
     */
    setText(objname, textvalue) {
      //console.log('animateadobe set text:',textvalue);
      if (window.ani.exportRoot) {
        const resolvePath = (object, path, defaultValue) => path
          .split('.')
          .reduce((o, p) => o ? o[p] : defaultValue, object);
        let myobj = resolvePath(window.ani.exportRoot, objname, undefined);
        //backward compatibility
        if (!myobj) myobj = resolvePath(window.ani.exportRoot.children[0], objname, undefined);
        if (myobj) myobj.text = textvalue;
        else console.warn('objname is undefined for window.ani.exportRoot', objname);
      }
    }

    /**
     * Uses values in e.detail.data and converts them to animation values
     * @param e
     */
    handleData(e) {
      //disable fix, fmi sends startevent if oneshot after registering input again issue when one shot mode sends data - but no animation is performed e.g. in editor (oneshot do not send start signal)
      //if (window.ani && !window.ani.animationstarted) window.ani.enableAnimation()
      let bindings = window.animatebindings;
      //const eps = 1e-12;
      if (!bindings) return;
      for (let binding of bindings) {
        //binding = {findex:findex,aname:aname,amin:amin,amax:amax,fmin:fmin,fmax:fmax}
        //it might be tring or number - from custom element attribute
        // eslint-disable-next-line eqeqeq
        let value = (binding.findex == -1) ? e.detail.time : e.detail.data[binding.findex];
        //refactored - add decision to binding object
        //let convertedvalue = binding.convertf2a(value);
        binding.handleValue(this, value);
      }
    }

    //will register inputs from global variable animateranges
    // type is array of struct
    // {name:string, handleValueChange:function(e)}
    //adobeobj should have accessible {name,value}
    registerInputs(){
      let ranges = window.animateranges;
      if (!ranges) return;
      for (let range of ranges) {
        const animateobj = this.getAnimateObj(range.name);
        //let rname = animateobj.name;      
        if (animateobj) {  
        animateobj.addEventListener('change', e=> { 
          //range.animateobj.value 
          e.detail = { id: animateobj.name, value: animateobj.value }          
          //handlevaluechange
          range.handleValueChange(e);        
        });
      } else console.warn('animate obj for inputs not found for name/id:',range.name);
      }
    }

    deregisterInputs(){
      let ranges = window.animateranges;
      if (!ranges) return;
      for (let range of ranges) {
        const animateobj = this.getAnimateObj(range.name);
        if (animateobj) animateobj.removeAllEventListeners();
      }
    }

    getAnimateObj(objname) {
      if (window.ani.exportRoot) {
        const resolvePath = (object, path, defaultValue) => path
        .split('.')
        .reduce((o, p) => o ? o[p] : defaultValue, object);
        let myobj = resolvePath(window.ani.exportRoot, objname, undefined);
        //some animation are in unnamed children root, backward compatibility with already done anim
        if (!myobj) myobj = resolvePath(window.ani.exportRoot.children[0], objname, undefined);
        return myobj;
      }
      else return null;
    }
}
