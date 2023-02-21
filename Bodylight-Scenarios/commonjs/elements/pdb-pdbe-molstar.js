"use strict";

exports.__esModule = true;
exports.PdbPdbeMolstar = void 0;

var _aureliaFramework = require("aurelia-framework");

var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12;

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * requires extra initialidzation of pdb components
 * <!-- Web component polyfill (only loads what it needs) -->
 * <script src="https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs/webcomponents-lite.js" charset="utf-8"></script>
 *
 * <!-- CSS -->
 * <link rel="stylesheet" type="text/css" href="https://www.ebi.ac.uk/pdbe/pdb-component-library/css/pdbe-molstar-1.1.0.css">
 *
 * <!-- JS -->
 * <script type="text/javascript" src="https://www.ebi.ac.uk/pdbe/pdb-component-library/js/pdbe-molstar-component-1.1.0.js"></script>
 */
var PdbPdbeMolstar = (_class = /*#__PURE__*/function () {
  function PdbPdbeMolstar() {
    _initializerDefineProperty(this, "moleculeId", _descriptor, this);

    _initializerDefineProperty(this, "customDataUrl", _descriptor2, this);

    _initializerDefineProperty(this, "customDataFormat", _descriptor3, this);

    _initializerDefineProperty(this, "hideControls", _descriptor4, this);

    _initializerDefineProperty(this, "hidePolymer", _descriptor5, this);

    _initializerDefineProperty(this, "rotate", _descriptor6, this);

    _initializerDefineProperty(this, "alwaysrotate", _descriptor7, this);

    _initializerDefineProperty(this, "width", _descriptor8, this);

    _initializerDefineProperty(this, "height", _descriptor9, this);

    _initializerDefineProperty(this, "assemblyId", _descriptor10, this);

    _initializerDefineProperty(this, "visualStyle", _descriptor11, this);

    _initializerDefineProperty(this, "showIons", _descriptor12, this);
  }

  var _proto = PdbPdbeMolstar.prototype;

  /* Adding to template do not have effect as pdbe-molstar is third party web component, thus appendchild notifies api to interpret it
  Aurelia do not bind to unknown attributes - molecule-id etc. it creates
            <pdbe-molstar molecule-id='2hhd'
                    bg-color-r="255"
                    bg-color-g="255"
                    bg-color-b="255"></pdbe-molstar>
  */
  _proto.bind = function bind() {
    this.divstyle = "width:" + this.width + ";height:" + this.height + "; position:relative";
    console.log('bind() moleculeId,hidecontrols,hidepolymer,moleculeidref', this.moleculeId, this.hideControls, this.hidePolymer, this.parentref);
    this.pdbref = document.createElement('pdbe-molstar');
    if (this.moleculeId) this.pdbref.setAttribute('molecule-id', this.moleculeId);
    this.pdbref.setAttribute('hide-controls', this.hideControls);
    if (this.hidePolymer && this.hidePolymer === 'true') this.pdbref.setAttribute('hide-polymer', this.hidePolymer);
    if (this.assemblyId) this.pdbref.setAttribute('assembly-id', this.assemblyId);

    if (this.customDataUrl) {
      this.pdbref.setAttribute('custom-data-url', this.customDataUrl);
      if (this.customDataFormat) this.pdbref.setAttribute('custom-data-format', this.customDataFormat);else this.pdbref.setAttribute('custom-data-format', 'pdb');
    } //console.log('pdbpdbemolstart bind() this:', this);


    if (this.visualStyle) this.pdbref.setAttribute('visual-style', this.visualStyle);
    this.pdbref.setAttribute('bg-color-r', 255);
    this.pdbref.setAttribute('bg-color-g', 255);
    this.pdbref.setAttribute('bg-color-b', 255);
    this.parentref.appendChild(this.pdbref);

    if (this.showIons) {
      //prepare selection of ions to be visualised - representation as gaussian-surface (big ball) and different colors
      //console.log('showing ions:', this.showIons);
      //let viewerInstance = this.pdbref.viewerInstance;
      this.selectIonsSection = [];
      var ions = this.showIons.split(',');
      var i = 3;

      for (var _iterator = _createForOfIteratorHelperLoose(ions), _step; !(_step = _iterator()).done;) {
        var ion = _step.value;
        var color = this.selectColor(i++);
        this.selectIonsSection.push({
          label_comp_id: ion,
          representation: 'gaussian-surface',
          representationColor: {
            r: color.r,
            g: color.g,
            b: color.b
          }
        });
      }
    }
  };

  _proto.attached = function attached() {
    var _this = this;

    //schedule to rotate and show ions after 3 sec
    if (this.rotate && this.rotate === 'true') {
      setTimeout(function () {
        //let pdbeMolstarComponent = document.getElementById(this.pid);
        var viewerInstance = _this.pdbref.viewerInstance;
        viewerInstance.visual.toggleSpin(true);
        if (_this.showIons) viewerInstance.visual.select({
          data: _this.selectIonsSection
        });
      }, 3000);
      setTimeout(function () {
        //let pdbeMolstarComponent = document.getElementById(this.pid);
        var viewerInstance = _this.pdbref.viewerInstance;
        viewerInstance.visual.toggleSpin(false);
      }, 60000);
    } else if (this.alwaysrotate && this.alwaysrotate === 'true') {
      setTimeout(function () {
        //let pdbeMolstarComponent = document.getElementById(this.pid);
        var viewerInstance = _this.pdbref.viewerInstance;
        viewerInstance.visual.toggleSpin(true);
        if (_this.showIons) viewerInstance.visual.select({
          data: _this.selectIonsSection
        });
      }, 3000);
    } else {
      //schedule to show ions after 3 sec
      setTimeout(function () {
        if (_this.showIons) viewerInstance.visual.select({
          data: _this.selectIonsSection
        });
      }, 3000);
    }
  };

  _proto.selectColor = function selectColor(index, saturation, lightness) {
    if (saturation === void 0) {
      saturation = 75;
    }

    if (lightness === void 0) {
      lightness = 65;
    }

    var hue = (index - 1) * 137.508; // use golden angle approximation

    return this.hslToRgb(hue / 360, saturation / 100, lightness / 100);
  }
  /**
  * Converts an HSL color value to RGB. Conversion formula
  * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
  * Assumes h, s, and l are contained in the set [0, 1] and
  * returns r, g, and b in the set [0, 255].
  *
  * @param   {number}  h       The hue
  * @param   {number}  s       The saturation
  * @param   {number}  l       The lightness
  * @return  {Array}           The RGB representation
  */
  ;

  _proto.hslToRgb = function hslToRgb(h, s, l) {
    var r;
    var g;
    var b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      var hue2rgb = function hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };

  return PdbPdbeMolstar;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "moleculeId", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "customDataUrl", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "customDataFormat", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "hideControls", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 'true';
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "hidePolymer", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 'false';
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "rotate", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 'true';
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "alwaysrotate", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 'false';
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "width", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '100%';
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, "height", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '300px';
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, "assemblyId", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, "visualStyle", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class.prototype, "showIons", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class);
exports.PdbPdbeMolstar = PdbPdbeMolstar;
//# sourceMappingURL=pdb-pdbe-molstar.js.map
