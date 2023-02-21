"use strict";

exports.__esModule = true;
exports.AnimateControl = void 0;

var _aureliaFramework = require("aurelia-framework");

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * controls animation
 */
var AnimateControl = (_class = /*#__PURE__*/function () {
  //unique id of this component
  //id of fmi - to listen if segmentcond is specified
  //0-100
  function AnimateControl() {
    var _this = this;

    _initializerDefineProperty(this, "id", _descriptor, this);

    _initializerDefineProperty(this, "fromid", _descriptor2, this);

    _initializerDefineProperty(this, "speedfactor", _descriptor3, this);

    _initializerDefineProperty(this, "segments", _descriptor4, this);

    _initializerDefineProperty(this, "simsegments", _descriptor5, this);

    _initializerDefineProperty(this, "segmentlabels", _descriptor6, this);

    _initializerDefineProperty(this, "controlfmi", _descriptor7, this);

    _initializerDefineProperty(this, "segmentcond", _descriptor8, this);

    _initializerDefineProperty(this, "allowcontinuous", _descriptor9, this);

    _initializerDefineProperty(this, "playafterstart", _descriptor10, this);

    this.continuousanimation = false;
    this.animationstarted = false;
    this.firstframe = true;
    this.frame = 0;
    this.aframe = 0;
    this.currentsegment = 0;
    this.animationframe = 0;
    this.playsegments = false;
    this.currentsegmentlabel = '';

    this.handleValueChange = function (e) {
      //get data - what is
      //console.log('bdlanimatecontrol handleValuechange', e);
      var value = e.detail.data[_this.segmentconditions[_this.currentsegment].refid];

      _this.processValue(value);
    };

    this.handleReset = function (e) {
      _this.continuousanimation = false;
      _this.animationstarted = false;
      _this.firstframe = true;
      _this.frame = 0;
      _this.aframe = 0;
      _this.currentsegment = 0;
      _this.animationframe = 0;
    };
  }

  var _proto = AnimateControl.prototype;

  _proto.bind = function bind() {
    var _this2 = this;

    if (this.speedfactor) {
      if (typeof this.speedfactor === 'string') this.speedfactor = parseInt(this.speedfactor, 10);
      if (this.speedfactor <= 0 || this.speedfactor > 100) this.speedfactor = 100;
    } //segments are int delimited by ;


    if (this.segments) {
      this.playsegments = true;
      this.segmentitems = this.segments.split(';').map(function (yy) {
        return parseInt(yy, 10);
      });

      if (this.simsegments) {
        this.simsegmentitems = this.simsegments.split(';').map(function (y2) {
          return parseInt(y2, 10);
        });
      }
    }

    if (this.segmentlabels) {
      this.segmentlabelarray = this.segmentlabels.split(';');
    }

    var isgreater = function isgreater(a, b) {
      return a > b;
    };

    var isequal = function isequal(a, b) {
      return a === b;
    };

    var islower = function islower(a, b) {
      return a < b;
    }; //console.log('bdlanimatecontro segmentcond1:', this.segmentcond);


    this.eventprefix = 'animate'; //segment condition is defined - then segments are determined by fmi data sent by 'fromid' component

    if (this.segmentcond) {
      this.eventprefix = 'fmi';
      this.segmentconditions = [];
      var scs = this.segmentcond.split(';');

      for (var _iterator = _createForOfIteratorHelperLoose(scs), _step; !(_step = _iterator()).done;) {
        var sc = _step.value;
        var scitem = sc.split(','); // [0] is refid, [1] is gt,lt,eq [2] is value in real

        var scf = islower;
        if (scitem[1] === 'gt') scf = isgreater;else if (scitem[1] === 'eq') scf = isequal;
        var scitem2 = {
          refid: scitem[0],
          relation: scf,
          value: parseFloat(scitem[2])
        };
        this.segmentconditions.push(scitem2);
      } //console.log('bdlanimatecontrol segmentcond', this.segmentconditions);
      //console.log('bdlanimatecontrol fromid', this.fromid);
      //  if (this.fromid) {document.getElementById(this.fromid).addEventListener('fmidata', this.handleValueChange);}

    }

    if (typeof this.allowcontinuous === 'string') {
      this.allowcontinuous = this.allowcontinuous === 'true';
    }

    if (typeof this.playafterstart === 'string') {
      this.playafterstart = this.playafterstart === 'true';
    }

    if (this.playafterstart) {
      //if animation is loaded 
      if (window.ani) {
        window.ani.animationstarted = true;
        window.ani.playafterstart = true;
        this.animationstarted = true;
      } else {
        setTimeout(function () {
          if (window.ani) {
            window.ani.animationstarted = true;
            window.ani.playafterstart = true;
            _this2.animationstarted = true;
          } else {
            console.warn('animate-control: cannot start animation automatically');
          }
        }, 300);
      }
    }
  };

  _proto.attached = function attached() {
    //console.log('bdlanimatecontrol attached fromid', this.fromid);
    if (this.fromid) {
      document.getElementById(this.fromid).addEventListener('fmidata', this.handleValueChange);
    }

    if (this.fromid) {
      document.getElementById(this.fromid).addEventListener('fmireset', this.handleReset);
    }
  };

  _proto.detached = function detached() {
    if (this.fromid && document.getElementById(this.fromid)) document.getElementById(this.fromid).removeEventListener('fmidata', this.handleValueChange);
  } //fires fmistart/fmistop events and starts/stops continuous animation
  ;

  _proto.startstop = function startstop() {
    this.animationstarted = !this.animationstarted;

    if (!this.animationstarted) {
      //stop animation
      //this.animationstarted = false;
      //console.log('Canceling animation, this, this.request:', this, this.request);
      cancelAnimationFrame(this.request); //create custom event

      var event = new CustomEvent(this.eventprefix + 'stop', {
        detail: {
          time: this.frame
        }
      }); //dispatch event - it should be listened by some other component

      document.getElementById(this.id).dispatchEvent(event);
    } else {
      //this.animationstarted = true;
      //if (window.ani) window.ani.enableAnimation();
      var that = this; //console.log('startstop() animate using requestAnimationFrame');
      //animate using requestAnimationFrame

      var performAnimation = function performAnimation() {
        //send event to do animation
        //console.log('performAnimation()');
        that.step(); //decide whether and how to schedule next animation frame

        if (that.playsegments && that.stopframe > 0 && that.frame > that.stopframe) that.stopsegment(that, performAnimation);else that.scheduleAnimation(that, performAnimation);
      };

      this.request = requestAnimationFrame(performAnimation);
    }
  };

  _proto.stopsegment = function stopsegment(that, performAnimation) {
    that.animationstarted = false;
    that.currentsegment++; //if last segment reninit frame from begining

    if (that.currentsegment >= that.segmentitems.length) {
      that.currentsegment = 0;
      that.frame = 0;
    }

    if (that.continuousanimation) that.scheduleAnimation(that, performAnimation);
  };

  _proto.scheduleAnimation = function scheduleAnimation(that, performAnimation) {
    // speedfactor is defined - then requestAnimationFrame is scheduled for later
    if (that.animationstarted) {
      if (that.speedfactor) {
        //requestAnimationFrame is scheduled for later
        setTimeout(function () {
          return that.request = requestAnimationFrame(performAnimation);
        }, 1000 / (60 * that.speedfactor / 100)); //60fps is normal - calculated as 1000 ms / framespersecond
      } else {
        //requestAnimationFrame is scheduled immediately
        that.request = requestAnimationFrame(performAnimation);
      } //this.step();

    }
  } //creates customevent and sends time, relativetime: rt in segment, segment - number of segment
  ;

  _proto.step = function step() {
    this.countrelativeframe(this.frame); //create custom event

    var event = this.frame === 0 ? new CustomEvent(this.eventprefix + 'start', {
      detail: {
        time: this.frame,
        relativetime: this.relativeframe,
        segment: this.currentsegment
      }
    }) //send start signal on frame 0
    : new CustomEvent(this.eventprefix + 'data', {
      detail: {
        time: this.frame,
        relativetime: this.relativeframe,
        segment: this.currentsegment
      }
    }); //send data signal - i.e. continue after pause
    //dispatch event - it should be listened by some other component

    document.getElementById(this.id).dispatchEvent(event);
    this.frame++;
  } //plays only one segment of the animation
  ;

  _proto.segment = function segment() {
    if (!this.segmentcond) {
      //play from current position up to the frame on the next segment
      this.stopframe = this.segmentitems[this.currentsegment]; //position in segment

      this.startrelativeframe(this.frame);
      this.countrelativeframe(this.frame); //console.log('AnimateControl segment() stopframe,currentsegment:', this.stopframe, this.currentsegment);

      this.currentsegmentlabel = this.segmentlabelarray[this.currentsegment]; //this.currentsegment++; moved to startstop - animationframe
      //console.log('AnimateControl segment() nextsegment:', this.currentsegment);

      this.startstop();
    } else {
      //if segmentcond is set - play until the condition is met
      this.stopframe = this.segmentitems[this.currentsegment]; //do not know stopframe
      //register handler
      //send start signal to fmi

      this.startrelativeframe(this.aframe);
      this.countrelativeframe(this.aframe);
      this.currentsegmentlabel = this.segmentlabelarray[this.currentsegment]; //console.log('bdlanimatecontrol segments with condition sending fmistart');
      //this.frame=0;
      //this.animationframe=0;
      //compute frame and animationframe step

      if (this.currentsegment === 0) {
        this.astep = this.segmentitems[this.currentsegment] / this.simsegmentitems[this.currentsegment];
      } else {
        var adif = this.segmentitems[this.currentsegment] - this.segmentitems[this.currentsegment - 1];
        var sdif = this.simsegmentitems[this.currentsegment] - this.simsegmentitems[this.currentsegment - 1];
        this.astep = adif / sdif;
      } //console.log('BdlAnimateControl segment() astep', this.astep);


      if (window.ani) window.ani.enableAnimation();
      var event = new CustomEvent(this.eventprefix + 'start', {
        detail: {
          time: this.frame
        }
      });
      document.getElementById(this.id).dispatchEvent(event);
    }
  };

  _proto.segmentcontinuous = function segmentcontinuous() {
    this.continuousanimation = !this.continuousanimation;
    if (this.continuousanimation && !this.animationstarted) this.segment();
  };

  _proto.startrelativeframe = function startrelativeframe(frame) {
    this.startframe = frame;
    this.framesinsegment = this.stopframe - this.startframe;
  };

  _proto.countrelativeframe = function countrelativeframe(frame) {
    this.relativeframe = (frame - this.startframe) / this.framesinsegment;
    return this.relativeframe;
  };

  _proto.nonstopsegment = function nonstopsegment() {};

  _proto.processValue = function processValue(value) {
    //compare with current segment condition
    //do stop simulation if the condition in 'relation' is met - returns true
    var referencevalue = this.segmentconditions[this.currentsegment].value;

    if (this.segmentconditions[this.currentsegment].relation(value, referencevalue)) {
      //set aframe to the boundary frame;
      this.aframe = this.segmentitems[this.currentsegment];
      this.floor_aframe = Math.floor(this.aframe);
      var event = new CustomEvent('fmistop', {
        detail: {
          time: this.frame
        }
      });
      document.getElementById(this.id).dispatchEvent(event);
      this.countrelativeframe(this.aframe); //dispatch animate data

      event = new CustomEvent('animatedata', {
        detail: {
          time: this.aframe,
          relativetime: this.relativeframe,
          segment: this.currentsegment
        }
      }); //send data signal - i.e. continue after pause
      //dispatch event - it should be listened by some other component

      document.getElementById(this.id).dispatchEvent(event); //dispatch addsection event - if somebody listens - it should add new section/segment into it's visualisation

      this.currentsegment++;

      if (this.currentsegment >= this.segmentitems.length) {
        this.currentsegment = 0;
        this.frame = 0;
        this.aframe = 0;
      }

      this.startrelativeframe(this.aframe);
      var event2 = new CustomEvent('addsection', {
        detail: {
          time: this.frame,
          label: this.segmentlabelarray[this.currentsegment]
        }
      });
      document.getElementById(this.id).dispatchEvent(event2); //if continuous is enabled - start immediatelly another segment

      if (this.continuousanimation) this.segment();
    } else {
      if (this.firstframe) {
        this.firstframe = false;

        var _event = new CustomEvent('addsection', {
          detail: {
            time: this.frame,
            label: this.segmentlabelarray[this.currentsegment]
          }
        });

        document.getElementById(this.id).dispatchEvent(_event);
      } //do step


      this.frame++;
      this.previous_aframe = this.floor_aframe;
      this.aframe += this.astep;
      this.floor_aframe = Math.floor(this.aframe); //if step - hits over a integer number

      if (this.floor_aframe > this.previous_aframe) {
        //fire animation event
        //console.log('bdlanimatecontrol step, frame, aframe, floor aframe, floor prevousframe', this.astep, this.frame, this.aframe, this.floor_aframe, this.previous_aframe);
        //do animation only if the aframe is lower than the prescribed boundary frame
        if (this.floor_aframe <= this.segmentitems[this.currentsegment]) {
          this.countrelativeframe(this.floor_aframe);

          var _event2 = new CustomEvent('animatedata', {
            detail: {
              time: this.floor_aframe,
              relativetime: this.relativeframe,
              segment: this.currentsegment
            }
          }); //send data signal - i.e. continue after pause
          //dispatch event - it should be listened by some other component


          document.getElementById(this.id).dispatchEvent(_event2);
        }
      }
    } //console.log('bdlanimatecontrol processValue',value,referencevalue);
    //compute animation frames

  };

  return AnimateControl;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "id", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "fromid", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "speedfactor", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "segments", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "simsegments", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "segmentlabels", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "controlfmi", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "segmentcond", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, "allowcontinuous", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, "playafterstart", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
})), _class);
exports.AnimateControl = AnimateControl;
//# sourceMappingURL=animate-control.js.map
