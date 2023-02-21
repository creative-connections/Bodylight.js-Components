"use strict";

exports.__esModule = true;
exports.Bind2animswitch = void 0;

var _bind2animation = require("./bind2animation");

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * This class checks the value coming from outside simulation
 * - if the value triggers limit then starts the animation
 * if the value is bellow limit, then stops the animation
 */
var Bind2animswitch = /*#__PURE__*/function (_Bind2animation) {
  _inheritsLoose(Bind2animswitch, _Bind2animation);

  //trigger = true;
  function Bind2animswitch(_findex, _aname, limit) {
    var _this;

    _this = _Bind2animation.call(this, _findex, _aname, 0, 0, 0, 0, null) || this;
    _this.triggered = true;
    _this.limit = void 0;
    _this.findex = _findex;
    _this.aname = _aname;
    _this.limit = limit;
    return _this;
  }

  var _proto = Bind2animswitch.prototype;

  _proto.convertf2a = function convertf2a(x) {
    return x;
  };

  _proto.handleValue = function handleValue(animobj, value) {
    if (!this.triggered) {
      //not triggered - check if animation should start
      if (value > this.limit) {
        animobj.startAnimation(this.aname);
        this.triggered = true;
      }
    } else {
      //check if animation should stop
      if (value <= this.limit) {
        animobj.stopAnimation(this.aname);
        this.triggered = false;
      }
    }
  };

  return Bind2animswitch;
}(_bind2animation.Bind2animation);

exports.Bind2animswitch = Bind2animswitch;
//# sourceMappingURL=bind2animswitch.js.map
