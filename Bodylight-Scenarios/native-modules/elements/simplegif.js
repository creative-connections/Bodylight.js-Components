"use strict";

exports.__esModule = true;
exports.Simplegif = void 0;

var _aureliaTemplating = require("aurelia-templating");

var _gifffer = _interopRequireDefault(require("gifffer"));

var _class, _descriptor, _descriptor2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var Simplegif = (_class = /*#__PURE__*/function () {
  function Simplegif() {
    var _this = this;

    _initializerDefineProperty(this, "fromid", _descriptor, this);

    _initializerDefineProperty(this, "src", _descriptor2, this);

    this.isstopped = true;

    this.handleStart = function (e) {
      //console.log('AnimatedHeart start event');
      _this.start();
    };

    this.handleStop = function (e) {
      //console.log('AnimatedHeart stop event');
      _this.stop();
    };
  }

  var _proto = Simplegif.prototype;

  _proto.attached = function attached() {
    // eslint-disable-next-line new-cap
    this.gifs = (0, _gifffer.default)();
    console.log('animated heart gifs:', this.gifs);
    document.getElementById(this.fromid).addEventListener('fmistart', this.handleStart);
    document.getElementById(this.fromid).addEventListener('fmistop', this.handleStop);
  };

  _proto.stop = function stop() {
    this.isstopped = true;
    this.gifs[0].click();
  };

  _proto.start = function start() {
    this.isstopped = false;
    this.gifs[0].click();
  };

  return Simplegif;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "fromid", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "src", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class);
exports.Simplegif = Simplegif;
//# sourceMappingURL=simplegif.js.map
