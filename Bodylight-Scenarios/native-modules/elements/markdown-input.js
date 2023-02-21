"use strict";

exports.__esModule = true;
exports.markdownInput = void 0;

var _aureliaFramework = require("aurelia-framework");

var _class, _descriptor;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var markdownInput = (_class = /*#__PURE__*/function () {
  function markdownInput() {
    _initializerDefineProperty(this, "id", _descriptor, this);
  }

  var _proto = markdownInput.prototype;

  _proto.submit = function submit() {
    console.log('dispatching content', this.textinput.value);
    var event = new CustomEvent('contentupdate', {
      detail: {
        content: this.textinput.value
      }
    }); //dispatch event - it should be listened by some other component

    document.getElementById(this.id).dispatchEvent(event);
  };

  return markdownInput;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "id", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class);
exports.markdownInput = markdownInput;
//# sourceMappingURL=markdown-input.js.map
