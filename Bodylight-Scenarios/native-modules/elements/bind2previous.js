"use strict";

exports.__esModule = true;
exports.Bind2previous = void 0;

var _aureliaFramework = require("aurelia-framework");

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4;

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * Bind2Previous binds two components identified by "fromid" and "toid" it changes the 'value' attribute of the 'toid' element
 * <bind2previous fromid="id1" toid="id2"></bind2previous>
 *
 * <bdl-fmi id="id4" inputs="id4,id1,id6,..."></bdl-fmi> fmi component registers event listener and change the value on behalf of it
 *
 */
var Bind2previous = (_class = /*#__PURE__*/function () {
  //one or multiple ids separated by ,
  //name of event default 'input' or could be fmi-data
  //id of DOM to send value,values
  //attribute to se, if not set 'value' is set
  function Bind2previous() {
    var _this = this;

    _initializerDefineProperty(this, "fromid", _descriptor, this);

    _initializerDefineProperty(this, "event", _descriptor2, this);

    _initializerDefineProperty(this, "toid", _descriptor3, this);

    _initializerDefineProperty(this, "toattribute", _descriptor4, this);

    //document.getElementById("id${window.ids - 2}").addEventListener("change", myfun${window.ids});

    /*function myfun${window.ids}(event){
        document.getElementById("id${window.ids - 1}").value = event.target.value;
    }*/
    this.handleValueChange = function (e) {
      //console.log('handleValueChange, e,fromid,toid', e);
      var value = e.detail ? e.detail.value : e.target.value; //set concrete attribute

      if (_this.toattribute) {
        var el = document.getElementById(_this.toid); //multiple values or single value

        if (_this.multiple) {
          //multiple values - first read existing
          if (!el) {
            console.warn('bind2previous didnt find target element with id' + _this.toid);
            return;
          }

          var elvalues = el.getAttribute(_this.toattribute).split(','); //identify index which to modify

          var myindex = _this.fromids.indexOf(e.target.id); //set - modify in appropriate place in array


          elvalues[myindex] = value; //convert back to csv

          var value2send = elvalues.join(','); //set to DOM

          el.setAttribute(_this.toattribute, value2send);
          console.log('bind2previous setting values to DOM element', value2send, el);
        } else {
          el.setAttribute(_this.toattribute, value); //fix setting depended input attributes -e.g. in <range>

          var inputs = el.getElementsByTagName('input');

          if (inputs.length > 0) {
            for (var _iterator = _createForOfIteratorHelperLoose(inputs), _step; !(_step = _iterator()).done;) {
              var input = _step.value;
              input.setAttribute(_this.toattribute, value);
            }
          }
        }
      } //set value attribute
      else document.getElementById(_this.toid).value = value;
    };
  }

  var _proto = Bind2previous.prototype;

  _proto.attached = function attached() {
    this.multiple = this.fromid.includes(',');

    if (this.multiple) {
      //this.multiple = true;
      this.fromids = this.fromid.split(',');

      for (var _iterator2 = _createForOfIteratorHelperLoose(this.fromids), _step2; !(_step2 = _iterator2()).done;) {
        var id = _step2.value;
        document.getElementById(id).addEventListener(this.event, this.handleValueChange);
      }
    } else //single fromid
      document.getElementById(this.fromid).addEventListener(this.event, this.handleValueChange);
  };

  _proto.detached = function detached() {
    if (this.multiple) {
      for (var _iterator3 = _createForOfIteratorHelperLoose(this.fromids), _step3; !(_step3 = _iterator3()).done;) {
        var id = _step3.value;
        document.getElementById(id).removeEventListener(this.event, this.handleValueChange);
      }
    } else if (document.getElementById(this.fromid)) document.getElementById(this.fromid).removeEventListener(this.event, this.handleValueChange);
  };

  return Bind2previous;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "fromid", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "event", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 'input';
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "toid", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "toattribute", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class);
exports.Bind2previous = Bind2previous;
//# sourceMappingURL=bind2previous.js.map
