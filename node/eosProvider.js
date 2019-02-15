'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _eosjs = _interopRequireDefault(require("eosjs"));

var symEosClient = Symbol('sym::EosClient');
var symGetIdentity = Symbol('sym::GetIdentity');
/**
 * EOSProvider - defined the MUST interfaces of a player
 * @author kinghand@foxmail.com
 */

var EOSProvider =
/*#__PURE__*/
function () {
  function EOSProvider() {
    (0, _classCallCheck2.default)(this, EOSProvider);
  }

  (0, _createClass2.default)(EOSProvider, [{
    key: "getIdentity",

    /**
       * getIdentity of cur scatter user
       * @return {Promise<{Identity}>}
       */
    value: function () {
      var _getIdentity = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this[symGetIdentity]) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", symGetIdentity());

              case 4:
                throw new Error("method not yet implemented: this interface should be implement by the specific class.");

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getIdentity() {
        return _getIdentity.apply(this, arguments);
      }

      return getIdentity;
    }()
    /**
       * get auth structure from identity
       * @return {Object} - { authorization : [ 'name@authority' ] }
       */

  }, {
    key: "getAuth",
    value: function () {
      var _getAuth = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2() {
        var identity;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.getIdentity();

              case 2:
                identity = _context2.sent;
                return _context2.abrupt("return", {
                  authorization: ["".concat(identity.name, "@").concat(identity.authority)]
                });

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getAuth() {
        return _getAuth.apply(this, arguments);
      }

      return getAuth;
    }()
  }, {
    key: "initFromConf",
    value: function initFromConf(conf, account) {
      if (conf) {
        var eos = (0, _eosjs.default)(conf);

        this[symEosClient] = function () {
          return eos;
        };
      }

      if (account) {
        this[symGetIdentity] = account;
      }
    }
  }, {
    key: "eosClient",

    /**
       * get or create scatter
       * @return {eosAPI}
       */
    get: function get() {
      if (this[symEosClient]) {
        return symEosClient();
      } else {
        throw new Error("method not yet implemented: this interface should be implement by the specific class.");
      }
    }
  }]);
  return EOSProvider;
}();

exports.default = EOSProvider;