"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _debug = _interopRequireDefault(require("debug"));

var _default = function _default(name) {
  return {
    verbose: (0, _debug.default)("verbose:".concat(name)),
    info: (0, _debug.default)("info:".concat(name)),
    warning: (0, _debug.default)("warning:".concat(name)),
    error: (0, _debug.default)("error:".concat(name))
  };
};

exports.default = _default;

var namespaces = _debug.default.disable();

if (namespaces === '') {
  _debug.default.enable('info:*,warning:*,error:*');
} else {
  _debug.default.enable(namespaces);
}