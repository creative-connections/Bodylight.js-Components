"use strict";

exports.__esModule = true;
exports.QuizSchema3 = void 0;

var _class, _descriptor, _descriptor2, _descriptor3;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var QuizSchema3 = (_class = /*#__PURE__*/function () {
  function QuizSchema3() {
    _initializerDefineProperty(this, "title1", _descriptor, this);

    _initializerDefineProperty(this, "title2", _descriptor2, this);

    _initializerDefineProperty(this, "title3", _descriptor3, this);

    this.cell1 = '';
    this.cell2 = '';
    this.cell3 = '';
    this.currentCell = 1;
    this.show1 = true;
    this.show2 = true;
    this.show3 = true;
  }

  var _proto = QuizSchema3.prototype;

  _proto.setCurrentCell = function setCurrentCell(content) {
    if (this.currentCell == 1) this.cell1 = content;else if (this.currentCell == 2) this.cell2 = content;else this.cell3 = content;
    if (this.currentCell < 3) this.currentCell++;
  };

  _proto.unsetlast = function unsetlast() {
    if (this.currentCell == 3) {
      this.show3 = true;
      this.cell3 = '';
    } else if (this.currentCell == 2) {
      this.show2 = true;
      this.cell2 = '';
    } else if (this.currentCell == 1) {
      this.show1 = true;
      this.cell1 = '';
    }

    if (this.currentCell > 1) this.currentCell--;
  };

  _proto.settitle1 = function settitle1() {
    if (this.show1) setCurrentCell(this.title1);
    this.show1 = false;
  };

  _proto.settitle2 = function settitle2() {
    if (this.show2) setCurrentCell(this.title2);
    this.show2 = false;
  };

  _proto.settitle3 = function settitle3() {
    if (this.show3) setCurrentCell(this.title3);
    this.show3 = false;
  };

  return QuizSchema3;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "title1", [bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "title2", [bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "title3", [bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class);
exports.QuizSchema3 = QuizSchema3;
//# sourceMappingURL=quiz-schema3.js.map
