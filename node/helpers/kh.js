'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _construct2 = _interopRequireDefault(require("@babel/runtime/helpers/construct"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _khRes = _interopRequireDefault(require("./khRes"));

var _transcalPayload = _interopRequireDefault(require("../utils/transcalPayload"));

/**
 * kh helper, supported kh contract operations
 * @author kinghand@foxmail.com
 */
var KhHelper =
/*#__PURE__*/
function () {
  /**
     * initiate with the chain helper
     * @param {ChainHelper} chain
     */
  function KhHelper(chain) {
    (0, _classCallCheck2.default)(this, KhHelper);
    this._chain = chain;
  }
  /**
     * call kh contract with transfer (match eoskit)
     * @param {Object} account - {name, authority}
     * @param {string} target - eos account, can be user or contract
     * @param {string} quantity - eos asset format, e.p. "1.0000 EOS"
     * @param {string} func - function name
     * @param {Array} args - arguments of the transcal
     * @param {Function} cbError - memo
     * @return {Promise<Object>} transactionData
     */


  (0, _createClass2.default)(KhHelper, [{
    key: "transcal",
    value: function () {
      var _transcal = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(account, target, quantity, func, args, cbError) {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._chain.transfer(account, target, quantity, "@[".concat(func, ":").concat(args.join(','), "]"), cbError);

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function transcal(_x, _x2, _x3, _x4, _x5, _x6) {
        return _transcal.apply(this, arguments);
      }

      return transcal;
    }()
    /**
       * transcal with "0.0001 EOS" token
       * @param {Object.<string, string>} account - {name, authority}
       * @param {string} target - eos account, can be user or contract
       * @param {string} symbol
       * @param {string} func
       * @param {Array} args - arguments of the transcal
       * @param {Function} cbError - memo
       * @return {Promise<Object>}
       */

  }, {
    key: "transend",
    value: function () {
      var _transend = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(account, target, symbol, func, args, cbError) {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.transcal(account, target, "0.0001 ".concat(symbol), func, args, cbError);

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function transend(_x7, _x8, _x9, _x10, _x11, _x12) {
        return _transend.apply(this, arguments);
      }

      return transend;
    }()
    /**
       * get res helper of (code, sym)
       * @example kh.res('thecontract', 'WOD')
       * @param code - the contract's account
       * @param symStr - symbol of resource
       */

  }, {
    key: "res",
    value: function res(code, symStr) {
      return new _khRes.default(this._chain, code, symStr);
    }
    /**
       * check res of an user
       * @deprecated - using res(code, symStr).checkBalance(userAccount) instead
       * @param code - contract name
       * @param userAccount - account of the user
       * @param symStr - symbol string like "EOS"
       * @return {Promise<Asset>} - returns null if it's not exist.
       */

  }, {
    key: "checkResOf",
    value: function () {
      var _checkResOf = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(code, userAccount, symStr) {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.res(code, symStr).checkBalance(userAccount);

              case 2:
                return _context3.abrupt("return", _context3.sent);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function checkResOf(_x13, _x14, _x15) {
        return _checkResOf.apply(this, arguments);
      }

      return checkResOf;
    }()
    /**
       * check res of an user
       * @deprecated - using res(code, symStr).checkInfo() instead
       * @param code - contract name
       * @param symStr - symbol string like "EOS"
       * @return {Promise<Asset>} - returns null if it's not exist.
       */

  }, {
    key: "checkResInfo",
    value: function () {
      var _checkResInfo = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4(code, symStr) {
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.res(code, symStr).checkInfo();

              case 2:
                return _context4.abrupt("return", _context4.sent);

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function checkResInfo(_x16, _x17) {
        return _checkResInfo.apply(this, arguments);
      }

      return checkResInfo;
    }()
    /**
       * parse transcal payload to data structure
       * @param memo
       * @return {TranscalPayload}
       */

  }, {
    key: "parseTranscalPayload",
    value: function parseTranscalPayload(memo) {
      return _transcalPayload.default.parse(memo);
    }
    /**
       * assemble transcal data structure to payload
       * @param func
       * @param args
       * @return {string}
       */

  }, {
    key: "assembleTranscalPayload",
    value: function assembleTranscalPayload(func) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return (0, _construct2.default)(_transcalPayload.default, [func].concat(args)).memo();
    }
  }]);
  return KhHelper;
}();

exports.default = KhHelper;