'use strict';
/**
 * Asset - asset type of eos
 * @author kinghand@foxmail.com
 */

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Asset =
/*#__PURE__*/
function () {
  function Asset(val, sym) {
    var decimal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
    (0, _classCallCheck2.default)(this, Asset);
    this._val = val;
    this._sym = sym;
    this._decimal = decimal;
  }
  /**
     * get value
     * @return {*}
     */


  (0, _createClass2.default)(Asset, [{
    key: "toString",

    /**
       * Get string val with symbol, such as '1.0000 EOS'
       * @return {string}
       */
    value: function toString() {
      return "".concat(this.valStr, " ").concat(this.sym);
    }
    /**
       * create a asset by asset string
       * @param {string} str
       * @return {Asset}
       */

  }, {
    key: "val",
    get: function get() {
      return this._val;
    }
    /**
       * get symbol
       * @return {*}
       */

  }, {
    key: "sym",
    get: function get() {
      return this._sym;
    }
    /**
       * get decimal
       * @return {number|*}
       */

  }, {
    key: "decimal",
    get: function get() {
      return this._decimal;
    }
    /**
       * Get String val without symbol
       * @return {string | *}
       */

  }, {
    key: "valStr",
    get: function get() {
      return this._val.toFixed(this.decimal);
    }
  }], [{
    key: "parse",
    value: function parse(str) {
      if (!str || typeof str !== 'string') return null;
      str = str.trim();
      var blankPos = str.indexOf(' ');
      if (blankPos < 0) return null;
      var strVal = str.slice(0, blankPos);
      var strSym = str.slice(1 + blankPos);
      if (!strVal || !strSym) return null;
      var decimalPos = str.indexOf('.');
      var decimal = decimalPos < 0 ? 0 : blankPos - decimalPos - 1;
      var val = parseFloat(strVal);
      return new Asset(val, strSym, decimal);
    }
  }]);
  return Asset;
}();

exports.default = Asset;