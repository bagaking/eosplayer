"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _player = require("./player");

Object.keys(_player).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _player[key];
    }
  });
});

var _readingPlayer = require("./readingPlayer");

Object.keys(_readingPlayer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _readingPlayer[key];
    }
  });
});

var _signPlayer = require("./signPlayer");

Object.keys(_signPlayer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _signPlayer[key];
    }
  });
});