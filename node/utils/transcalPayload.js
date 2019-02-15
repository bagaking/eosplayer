'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var TranscalPayload =
/*#__PURE__*/
function () {
  function TranscalPayload(func) {
    (0, _classCallCheck2.default)(this, TranscalPayload);
    this.func = func;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    this.args = args;
  }
  /**
     * Get memo
     * @return {string}
     */


  (0, _createClass2.default)(TranscalPayload, [{
    key: "memo",
    value: function memo() {
      return "@[".concat(this.func, ":").concat(this.args.join(','), "]");
    }
    /**
       * Parse memo
       */

  }, {
    key: "parseMemo",
    value: function parseMemo(memo) {
      var callType = memo[0];
      if (memo.length < 4) throw new Error('parse transcal error: the memo is too short.');
      if (memo[1] !== '[' || memo[2] === ']') throw new Error('parse transcal error: formation error.');
      if (callType !== '@' && callType !== '#') throw new Error('parse transcal error: type mark must be @ or #.');
      var posCol = memo.indexOf(':');
      var posEnd = memo.indexOf(']');
      if (posEnd < 0) throw new Error("parse transcal error: cannot find end mark ']'.");

      if (posCol < 0) {
        // if the col mark exist
        this.func = memo.substr(2, posEnd - 2);
        this.args = [];
        return this;
      }

      this.func = memo.substr(2, posCol - 2);
      var pos = posCol + 1;
      var posPrev = pos;
      var args = [];

      while (true) {
        pos = memo.indexOf(',', pos);

        if (pos >= posEnd || pos < 0) {
          args.push(memo.substr(posPrev, posEnd - posPrev));
          break;
        }

        args.push(memo.substr(posPrev, pos - posPrev));
        posPrev = ++pos;
      }

      this.args = args;
      return this;
    }
  }], [{
    key: "parse",
    value: function parse(memo) {
      return new TranscalPayload('').parseMemo(memo);
    }
  }]);
  return TranscalPayload;
}();

exports.default = TranscalPayload;