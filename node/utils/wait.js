"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forMs = forMs;
exports.forCondition = forCondition;
exports.TimeoutPromise = TimeoutPromise;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function forMs(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

function forCondition(_x) {
  return _forCondition.apply(this, arguments);
}

function _forCondition() {
  _forCondition = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(fnPredict) {
    var spanMs,
        _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            spanMs = _args.length > 1 && _args[1] !== undefined ? _args[1] : 100;

          case 1:
            if (!true) {
              _context.next = 8;
              break;
            }

            if (!fnPredict()) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return");

          case 4:
            _context.next = 6;
            return forMs(spanMs);

          case 6:
            _context.next = 1;
            break;

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _forCondition.apply(this, arguments);
}

function TimeoutPromise(_x2, _x3) {
  return _TimeoutPromise.apply(this, arguments);
}

function _TimeoutPromise() {
  _TimeoutPromise = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(ms, promise) {
    var timeout;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            timeout = new Promise(function (resolve, reject) {
              setTimeout(function () {
                reject(new Error("Timed out in ".concat(ms, " ms.")));
              }, ms);
            });
            return _context2.abrupt("return", Promise.race([promise, timeout]));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _TimeoutPromise.apply(this, arguments);
}