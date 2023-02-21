"use strict";

exports.__esModule = true;
exports.RemoteValue = void 0;

var _aureliaFetchClient = require("aurelia-fetch-client");

var _aureliaFramework = require("aurelia-framework");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var RemoteValue = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = (_class2 = /*#__PURE__*/function () {
  function RemoteValue(httpclient) {
    var _this = this;

    this.value = void 0;

    _initializerDefineProperty(this, "remoteurl", _descriptor, this);

    _initializerDefineProperty(this, "started", _descriptor2, this);

    this.remotevalue = void 0;

    _initializerDefineProperty(this, "remoteheader", _descriptor3, this);

    _initializerDefineProperty(this, "remoteheadervalue", _descriptor4, this);

    this.postvalue = '';

    _initializerDefineProperty(this, "interval", _descriptor5, this);

    _initializerDefineProperty(this, "id", _descriptor6, this);

    this.starttime = void 0;
    this.showsettings = false;

    _initializerDefineProperty(this, "inputs", _descriptor7, this);

    this.inputids = [];
    this.posterror = false;
    this.client = httpclient;

    this.handleTick = function () {
      if (_this.started) {
        //do periodic stuff
        _this.get(); //schedule next tick


        if (_this.fetchinterval > 0) setTimeout(_this.handleTick.bind(_this), _this.fetchinterval);
      } //else do nothing - stopped between ticks

    };

    this.handleValueChange = function (e) {
      //handle value changed from e.g. range component - post it
      _this.postvalue = e.detail && e.detail.value ? e.detail.value : e.target.value;
      var targetid;
      if (e.detail && e.detail.id) targetid = e.detail.id;else if (e.target.id.length > 0) targetid = e.target.id;else targetid = e.target.parentElement.parentElement.id; //post it - add targetid to URL

      _this.post(targetid);
    };
  }

  var _proto = RemoteValue.prototype;

  _proto.bind = function bind() {
    if (this.id) {//will generate fmidata event
    }

    if (typeof this.started === 'string') {
      this.started = this.started === 'true';
    }

    if (this.inputs) {
      this.inputids = this.inputs.split(';'); //array of id1;id2;id3 ...
    }
  };

  _proto.attached = function attached() {
    this.time = new Date();
    this.starttime = Math.round(this.time.getTime() / 1000); //this.remoteurl =         localStorage.getItem('bdl-fhir-url');
    //this.remoteheadervalue = localStorage.getItem('bdl-fhir-api-key');

    if (typeof interval === 'string') {
      this.interval = parseInt(this.interval);
    } //now start


    this.start();

    if (this.inputids.length > 0) {
      for (var _iterator = _createForOfIteratorHelperLoose(this.inputids), _step; !(_step = _iterator()).done;) {
        var myid = _step.value;
        var myidel = document.getElementById(myid);
        if (myidel) myidel.addEventListener('input', this.handleValueChange);else console.warn('cannot add listener to input for vaue change', myid);
      }
    }
  };

  _proto.detached = function detached() {
    this.stop();

    if (this.inputids.length > 0) {
      for (var _iterator2 = _createForOfIteratorHelperLoose(this.inputids), _step2; !(_step2 = _iterator2()).done;) {
        var myid = _step2.value;
        var myidel = document.getElementById(myid);
        if (myidel) myidel.removeEventListener('input', this.handleValueChange);
      }
    }
  };

  _proto.intervalChanged = function intervalChanged(newValue, oldValue) {
    //triggered by aurelia fw when getinterval is changed
    if (typeof this.interval === 'string') {
      this.interval = parseInt(this.interval);
    }
  };

  _proto.stop = function stop() {
    this.started = false;
    this.fetchinterval = 0;
  };

  _proto.start = function start() {
    //this.get();
    this.started = !this.started;

    if (this.started) {
      this.fetchinterval = this.interval;
      setTimeout(this.handleTick.bind(this), this.fetchinterval);
    } else {
      this.fetchinterval = 0;
    }
  };

  _proto.get = function get() {
    var _this2 = this;

    //sends GET request to
    var myheaders = new Headers(); //localStorage.setItem('bdl-fhir-url',this.remoteurl);

    if (this.remoteheadervalue && this.remoteheadervalue.length > 0) {
      myheaders.append(this.remoteheader, this.remoteheadervalue); //localStorage.setItem('bdl-fhir-api-key',this.remoteheadervalue);
    }

    this.client.fetch(this.remoteurl, {
      headers: myheaders
    }).then(function (response) {
      return response.json();
    }) // do response.json() for json result
    .then(function (data) {
      //console.log('markdownaurelia fetched md:', data)
      _this2.remotevalue = data;
      _this2.remotevalueformatted = JSON.stringify(_this2.remotevalue, null, 4);

      if (_this2.id) {
        //generatefmidata event
        var mydata = [];
        var mytime = (Math.round(new Date().getTime() / 100) - _this2.starttime * 10) / 10;

        if (typeof _this2.remotevalue === 'object') {
          for (var _i = 0, _Object$keys = Object.keys(_this2.remotevalue); _i < _Object$keys.length; _i++) {
            var key = _Object$keys[_i];
            mydata.push(_this2.remotevalue[key]);
          }
        } else if (typeof _this2.remotevalue === 'number') {
          mydata.push(_this2.remotevalue);
        }

        var event = new CustomEvent('fmidata', {
          detail: {
            time: mytime,
            data: mydata
          }
        });
        document.getElementById(_this2.id).dispatchEvent(event);
      }

      _this2.posterror = false;
    }).catch(function (err) {
      console.log('error', err);

      _this2.stop();
    }); //stops on error

    /*this.client.get(this.remoteurl)
        .then(response => response.json())// do response.json() for json result
        .then(data => {
            //console.log('markdownaurelia fetched md:', data)
            this.remotevalue = data;
            this.remotevalueformatted = JSON.stringify(this.remotevalue,null,4)
        });*/
  };

  _proto.round = function round(value, decimals) {
    if (decimals < 0) {
      var posdecimals = -decimals;
      return Number(Math.round(value + 'e' + posdecimals) + 'e-' + posdecimals);
    }

    return Number(Math.round(value + 'e-' + decimals) + 'e+' + decimals);
  };

  _proto.post = function post(id) {
    var _this3 = this;

    //sends POST request tod
    var myheaders = new Headers();
    myheaders.append('Accept', 'application/json');
    myheaders.append('Content-Type', 'application/json'); //localStorage.setItem('bdl-fhir-url',this.remoteurl);

    if (this.remoteheadervalue && this.remoteheadervalue.length > 0) {
      myheaders.append(this.remoteheader, this.remoteheadervalue); //localStorage.setItem('bdl-fhir-api-key',this.remoteheadervalue);
    }

    var url = this.remoteurl + (id ? '/' + id : '');
    if (!this.posterror) this.client.fetch(url, {
      method: 'post',
      headers: myheaders,
      body: this.postvalue
    }).then(function (response) {
      return response.json();
    }) // do response.json() for json result
    .then(function (data) {
      //console.log('markdownaurelia fetched md:', data)
      _this3.remotevalue = data;
      _this3.remotevalueformatted = JSON.stringify(_this3.remotevalue, null, 4);
    }).catch(function (err) {
      console.error('error posting data', err);
      _this3.posterror = true;
    });
    /*this.client.get(this.remoteurl)
        .then(response => response.json())// do response.json() for json result
        .then(data => {
            //console.log('markdownaurelia fetched md:', data)
            this.remotevalue = data;
            this.remotevalueformatted = JSON.stringify(this.remotevalue,null,4)
        });*/
  };

  _proto.forcepost = function forcepost() {
    this.posterror = false;
    this.post();
  };

  _proto.showhidesettings = function showhidesettings() {
    this.showsettings = !this.showsettings;
  };

  _proto.remoteurlChanged = function remoteurlChanged(newValue, oldValue) {
    //in case of change restart
    if (!this.started) this.start();
  };

  return RemoteValue;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "remoteurl", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "started", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "remoteheader", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "remoteheadervalue", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "interval", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 500;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "id", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "inputs", [_aureliaFramework.bindable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.RemoteValue = RemoteValue;
//# sourceMappingURL=remote-value.js.map
