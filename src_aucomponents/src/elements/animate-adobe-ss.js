import {bindable} from 'aurelia-framework';
import 'latest-createjs';

export class AnimateAdobeSs {
  @bindable src;
  @bindable width=800;
  @bindable height=600;
  @bindable name;//="ZelezoCelek"
  //@bindable cid;//="3CC81150E735AE4485D4B0DF526EB8B4";

  constructor(){}
  bind(){}

  attached(){
    //let that = this;
    let continueAfter = () => {
      if (typeof createjs === 'undefined') console.log('WARN: createjs not present,loading script manually not supported yet.');

      //if (!window.createjs) window.createjs = createjs;
      //make this component global - due to further calls
      //this.bindings = [];
      //window.ani = that;
      //detects and if not present - adds script with JS into DOM - so browser will load it, after that, initAdobe() will be called
      this.getScript(this.src, this.init.bind(this));
      //this.ratio = this.width / this.height;
      //window.addEventListener('resize', this.handleResize);
      //this.init();
    };

    //check global instance of createjs - if not present wait 500 ms
    if (typeof createjs === 'undefined') {
      console.log('INFO: waiting 1000ms for createjs ');
      setTimeout(() => continueAfter.bind(this), 1000);
    } else continueAfter();
  }

  //handleResize(); // First draw
  detached() {
    console.log('adobeobj detached()');
    //stop animation
    //this.disableAnimation();
    //remove script
    this.removeScript(this.src);
    //destroy bindings
    this.bindings = [];
    //remove listeners
    /*let fromel = document.getElementById(this.fromid);
    if (fromel) {
      fromel.removeEventListener('animatestart', this.startAllAnimation);
      fromel.removeEventListener('animatestop', this.stopAllAnimation);
      fromel.removeEventListener('fmidata', this.handleValueChange);
      fromel.removeEventListener('fmistart', this.enableAnimation);
      fromel.removeEventListener('fmistop', this.disableAnimation);
    }*/
    this.destroyAdobe();
    //document.removeEventListener('fmiattached',this.handleFMIAttached);
  }

  destroyAdobe() {
    console.log('animate adobe ss destroy()');
    if (this.stage) {
      this.stage.enableMouseOver(-1);
      this.stage.enableDOMEvents(false);
      this.stage.removeAllEventListeners();
      this.stage.removeAllChildren();
      this.stage.canvas = null;
      this.stage = null;
    }
    if (this.exportRoot) this.exportRoot = null;
    if (this.ss) this.ss = null;
    if (this.lib) this.lib = null;
    if (this.comp) this.comp = null;
    if (this.cid) this.cid = null;
    if (this.objs) this.objs = null;
    if (this.animobjs) this.animobjs = null;
    if (this.textobjs) this.textobjs = null;
    if (this.playobjs) this.playobjs = null;
    if (this.AdobeAn) this.AdobeAn = null;
  }


  init(){
    //canvas = document.getElementById("canvas");
    //anim_container = document.getElementById("animation_container");
    //dom_overlay_container = document.getElementById("dom_overlay_container");
    //find the right composition
    this.lib = null; this.comp = null;
    for (let cid of Object.keys(AdobeAn.compositions)) {
      let comp = AdobeAn.getComposition(cid);
      let lib = comp.getLibrary();
      if (lib[this.name] || lib['_'+this.name]) {
        this.lib = lib;
        this.comp = comp;
        break;
      }
    }
    /*let cid = Object.keys(AdobeAn.compositions).at(-1); //TODO last composition is the one needed??
    let comp=AdobeAn.getComposition(cid);
    this.lib=comp.getLibrary();*/
    let loader = new createjs.LoadQueue(false);
    loader.installPlugin(createjs.Sound);
    loader.addEventListener("fileload", function(evt){this.handleFileLoad(evt,this.comp)}.bind(this));
    loader.addEventListener("complete", function(evt){this.handleComplete(evt,this.comp)}.bind(this));
    //var lib=comp.getLibrary();
    loader.loadManifest(this.lib.properties.manifest);
  }

  handleFileLoad(evt, comp) {
    var images=comp.getImages();
    if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }
  }
  handleComplete(evt,comp) {
    //This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
    //var lib=comp.getLibrary();
    let ss=comp.getSpriteSheet();
    let queue = evt.target;
    let ssMetadata = this.lib.ssMetadata;
    for(let i=0; i<ssMetadata.length; i++) {
      ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
    }
    let keys = Object.keys(this.lib);
    console.log('animate adobe ss lib keys:',keys);
    console.log('animate adobe ss name to be initialized:',this.name);
    //fix '_' before object name
    if (typeof this.lib[this.name] == 'function') this.exportRoot = new this.lib[this.name]
    else if (typeof this.lib['_'+this.name] == 'function') this.exportRoot = new this.lib['_'+this.name]();//new lib._04_Fe_výskyt_HTML5Canvas();
    else { console.warn('cannot instantiate animation',this.name); return;}
    this.stage = new this.lib.Stage(this.canvas);
    //Registers the "tick" event listener.
    //Code to support hidpi screens and responsive scaling.
    //AdobeAn.makeResponsive(false,'both',false,1,[this.canvas,this.anim_container,this.dom_overlay_container]);
    this.makeResponsive(true, 'both', true, 1, [this.canvas, this.anim_container, this.dom_overlay_container]);

    AdobeAn.compositionLoaded(this.lib.properties.id);
    this.fnStartAnimation();
  }

  fnStartAnimation() {
    this.stage.addChild(this.exportRoot);
    createjs.Ticker.setFPS(this.lib.properties.fps);
    createjs.Ticker.addEventListener("tick", this.stage);
  }


  playSound(id, loop) {
    return createjs.Sound.play(id, createjs.Sound.INTERRUPT_EARLY, 0, 0, loop);
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
          this.destroyAdobe();
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

  makeResponsive(isResp, respDim, isScale, scaleType, domContainers) {
    //let lastW; let lastH; let lastS = 1;
    window.addEventListener('resize', this.handleResize.bind(this));
    this.isResp = isResp;
    this.respDim = respDim;
    this.isScale = isScale;
    this.scaleType = scaleType;
    this.domContainers = domContainers;
    this.handleResize();
  }

  handleResize() {
    console.log('animateadobe handleResize()');
    //do not run if ani.lib is not defined - no adobe component is available
    if (!this.lib) return;
    let w = this.lib.properties.width; let h = this.lib.properties.height;
    let iw = window.innerWidth;
    let ih = window.innerHeight;
    if (this.canvas && this.canvas.parentElement && this.canvas.parentElement.parentElement && this.canvas.parentElement.parentElement.parentElement) {
      iw = this.canvas.parentElement.parentElement.parentElement.offsetWidth;
      ih = this.canvas.parentElement.parentElement.parentElement.offsetHeight;
    }
    ih = iw / ( w / h );
    //let iw = window.innerWidth; let ih = window.innerHeight;
    let pRatio = window.devicePixelRatio || 1; let xRatio = iw / w; let yRatio = ih / h; let sRatio = 1;
    if (this.isResp) {
      if ((this.respDim === 'width' && this.lastW === iw) || (this.respDim === 'height' && this.lastH === ih)) {
        sRatio = this.lastS;
      } else if (!this.isScale) {
        if (iw < w || ih < h) {sRatio = Math.min(xRatio, yRatio);}
      } else if (this.scaleType === 1) {
        sRatio = Math.min(xRatio, yRatio);
      } else if (this.scaleType === 2) {
        sRatio = Math.max(xRatio, yRatio);
      }
    }
    this.domContainers[0].width = w * pRatio * sRatio;
    this.domContainers[0].height = h * pRatio * sRatio;
    this.domContainers.forEach(function(container) {
      container.style.width = w * sRatio + 'px';
      container.style.height = h * sRatio + 'px';
    });
    this.stage.scaleX = pRatio * sRatio;
    this.stage.scaleY = pRatio * sRatio;
    this.lastW = iw; this.lastH = ih; this.lastS = sRatio;
    this.stage.tickOnUpdate = false;
    this.stage.update();
    this.stage.tickOnUpdate = true;
  }

  removeScript(source) {
    let src = window.bdlBaseHref ? window.bdlBaseHref + source : source;
    let tags = document.getElementsByTagName('script');
    for (let i = tags.length; i >= 0; i--) { //search backwards within nodelist for matching elements to remove
      if (tags[i] && tags[i].getAttribute('src') !== null && tags[i].getAttribute('src').indexOf(src) !== -1) {tags[i].parentNode.removeChild(tags[i]);} //remove element by calling parentNode.removeChild()
    }
  }


}
