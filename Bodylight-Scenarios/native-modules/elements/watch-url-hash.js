"use strict";

exports.__esModule = true;
exports.WatchUrlHash = void 0;

var _aureliaFramework = require("aurelia-framework");

var _aureliaEventAggregator = require("aurelia-event-aggregator");

var _utils = require("../attributes/utils");

var _dec, _class;

var WatchUrlHash = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = /*#__PURE__*/function () {
  function WatchUrlHash(ea) {
    var _this = this;

    this.ea = ea;
    this.params = ''; //event listener function needs to be declared this way - they have access to 'this'

    this.handleHashChange = function (e) {
      console.log('WatchHashCore HandleHashChange e:', e);
      var params = (0, _utils.parseHashParamString)(window.location.hash);
      /*let args = [];
            let index;
            for (let i = 0; i < this.paramname.length; i++) {
                if (this.paramindex[i]) index = params[this.paramname[i]] ? params[this.paramname[i]] : params[this.paramindex[i]];
                else index = params[this.paramname[i]];
                if (index) {
                    //this.elementVM.changesrc(index, this.paramname[i]);
                    args.push(index);
                    //this.changesrc(index, this.paramname[i]);
                }
            }
            if (args.length > 0) this.changesrc(...args);
             */

      _this.ea.publish('hashchange', params);
    };
  }

  var _proto = WatchUrlHash.prototype;

  _proto.attached = function attached() {
    window.addEventListener('hashchange', this.handleHashChange);
  };

  return WatchUrlHash;
}()) || _class);
exports.WatchUrlHash = WatchUrlHash;
//# sourceMappingURL=watch-url-hash.js.map
