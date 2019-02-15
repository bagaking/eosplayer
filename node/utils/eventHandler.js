'use strict';
/**
 * Event Handler
 * @desc
 * - only enabled event can be emitted
 * - If the callback of an event is not set, alert will be called by default on the browser, and Error will be triggered in nodejs
 * @author kinghand@foxmail.com
 */

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var EventHandler =
/*#__PURE__*/
function () {
  function EventHandler(supportedEvents) {
    (0, _classCallCheck2.default)(this, EventHandler);

    this._defaultCb = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      args.forEach(function (v) {
        if (alert) {
          if ((0, _typeof2.default)(v) instanceof Error) {
            alert(v.message);
          } else {
            alert(v);
          }
        } else {
          if ((0, _typeof2.default)(v) instanceof Error) {
            throw v;
          } else {
            throw new Error(v);
          }
        }
      });
    };

    this._eventMap = {};

    if (supportedEvents) {
      this.enableEvents(supportedEvents);
      this._eventMap = Array.isArray(supportedEvents) ? {} : supportedEvents;
    }
  }
  /**
     * enable event names
     * @param {Array | Object} supportedEvents - keys will be used when it's an object
     */


  (0, _createClass2.default)(EventHandler, [{
    key: "enableEvents",
    value: function enableEvents(supportedEvents) {
      var newEventKeys = Array.isArray(supportedEvents) ? supportedEvents : Object.keys(supportedEvents);
      this._supportedEvents = (this._supportedEvents || []).concat(newEventKeys);
    }
    /**
       * set callback of an event name
       * @param {string} event - event name
       * @param {Function} fnCallback - if there is already a callback, then the new one will cover the previous one.
       * @param {any} instance - the instance of the callback.
       * @return {EventHandler} - for pipeline
       */

  }, {
    key: "setEvent",
    value: function setEvent(event, fnCallback, instance) {
      if (!this._supportedEvents.find(function (name) {
        return name === event;
      })) {
        throw new Error("event handler : event ".concat(event, " are not supported."));
      }

      this._eventMap[event] = {
        cb: fnCallback,
        ctx: instance
      };
      return this;
    }
    /**
       * trigger an event by name
       * @param {string} event - event name
       * @param {Array} args - arguments
       */

  }, {
    key: "emitEvent",
    value: function emitEvent(event) {
      var _e$cb, _this$_defaultCb;

      if (!this._supportedEvents.find(function (name) {
        return name === event;
      })) {
        throw new Error("event handler : event ".concat(event, " are not found."));
      }

      var e = this._eventMap[event];

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return e ? (_e$cb = e.cb).call.apply(_e$cb, [e.ctx].concat(args)) : (_this$_defaultCb = this._defaultCb).call.apply(_this$_defaultCb, [event].concat(args));
    }
  }]);
  return EventHandler;
}();

exports.default = EventHandler;