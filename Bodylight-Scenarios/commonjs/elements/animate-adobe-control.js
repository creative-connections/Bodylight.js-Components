"use strict";

exports.__esModule = true;
exports.AnimateAdobeControl = void 0;

var _aureliaTemplating = require("aurelia-templating");

var _class, _descriptor;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var AnimateAdobeControl = (_class = /*#__PURE__*/function () {
  function AnimateAdobeControl() {
    _initializerDefineProperty(this, "id", _descriptor, this);

    this.animationstarted = true;
    this.onetime = false;
  }

  var _proto = AnimateAdobeControl.prototype;

  _proto.attached = function attached() {
    if (window.ani) {
      //window.ani.startAllAnimation();
      //window.ani.startAllAnimation();
      //try to set animationstarted to true -
      window.ani.animationstarted = true; //this.animationstarted = window.ani.animationstarted;
    } else {
      setTimeout(function () {
        if (window.ani) {
          window.ani.animationstarted = true;
        } else {
          console.warn('animate-control: cannot start animation automatically');
        }
      }, 300);
    }
  };

  _proto.startstop = function startstop() {
    console.log('animateadobecontrol startstop()', this);

    if (!this.onetime && !this.animationstarted) {
      //animate-adobe component playafterstart=false - start it once
      window.ani.startAllAnimation();
      this.onetime = true;
    } else {
      if (window.ani && window.ani.animationstarted) window.ani.disableAnimation();else if (window.ani && !window.ani.animationstarted) {
        window.ani.enableAnimation();
      }
      this.animationstarted = window.ani.animationstarted; //let event = new CustomEvent(eventname, {detail: {time: this.frame}}); //send start signal on frame 0
      //dispatch event - it should be listened by some other component
      //document.getElementById(this.id).dispatchEvent(event);
    }
  };

  _proto.step = function step() {
    var _this = this;

    if (!this.animationstarted) this.startstop();
    setTimeout(function () {
      _this.startstop();
    }, 100);
  };

  return AnimateAdobeControl;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "id", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class);
exports.AnimateAdobeControl = AnimateAdobeControl;
//# sourceMappingURL=animate-adobe-control.js.map
