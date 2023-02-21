"use strict";

exports.__esModule = true;
exports.Quiz = void 0;

var _aureliaTemplating = require("aurelia-templating");

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var Quiz = (_class = /*#__PURE__*/function () {
  function Quiz() {
    _initializerDefineProperty(this, "question", _descriptor, this);

    _initializerDefineProperty(this, "answers", _descriptor2, this);

    _initializerDefineProperty(this, "explanations", _descriptor3, this);

    _initializerDefineProperty(this, "correctoptions", _descriptor4, this);

    _initializerDefineProperty(this, "buttontitle", _descriptor5, this);
  }

  var _proto = Quiz.prototype;

  _proto.bind = function bind() {
    this.useranswer = [];
    this.showresult = false;
    this.answers_array = this.answers.split('|').map(function (s) {
      return s.trim();
    });
    this.explanation_array = this.explanations.split('|').map(function (s) {
      return s.trim();
    });
    this.correct_array = this.correctoptions.split('|').map(function (s) {
      return s.trim();
    });
    this.answer_exp_array = [];

    for (var i = 0; i < this.answers_array.length; i++) {
      this.answer_exp_array.push({
        id: i,
        answer: this.answers_array[i],
        correct: this.correct_array[i] === 'true',
        explanation: this.explanation_array[i],
        user: false
      });
    }
  };

  _proto.submit = function submit() {
    //console.log('Bdlquis submit()');
    this.showresult = true;
  };

  return Quiz;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "question", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '?';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "answers", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "explanations", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "correctoptions", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "buttontitle", [_aureliaTemplating.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 'check answers';
  }
})), _class);
exports.Quiz = Quiz;
//# sourceMappingURL=quiz.js.map
