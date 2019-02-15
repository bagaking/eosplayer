"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignPlayer = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _player = require("./player");

var _eosjs = _interopRequireDefault(require("eosjs"));

var defaultConfig = {
  account: {
    name: 'eosio',
    authority: 'active'
  },
  node: {
    keyProvider: ['5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79sample'],
    chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
    httpEndpoint: 'http://dev.toneos.pro:7777',
    mockTransactions: function mockTransactions() {
      return null;
    },
    expireInSeconds: 60,
    broadcast: true,
    debug: false,
    sign: true,
    authorization: null // 该参数用于在多签名情况下，识别签名帐号与权限,格式如：account@permission

  }
};

var SignPlayer =
/*#__PURE__*/
function (_Player) {
  (0, _inherits2.default)(SignPlayer, _Player);

  function SignPlayer() {
    var _this;

    var nodeConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultConfig.node;
    var signAccount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultConfig.account;
    (0, _classCallCheck2.default)(this, SignPlayer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SignPlayer).call(this));
    _this._conf = (0, _objectSpread2.default)({}, defaultConfig.node, nodeConfig);
    _this._identity = (0, _objectSpread2.default)({}, defaultConfig.account, signAccount);
    return _this;
  }

  (0, _createClass2.default)(SignPlayer, [{
    key: "getIdentity",
    value: function () {
      var _getIdentity = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this._identity);

              case 1:
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
  }, {
    key: "eosClient",
    get: function get() {
      if (!this._eosClient) {
        this._eosClient = new _eosjs.default(this._conf);
      }

      return this._eosClient;
    }
  }]);
  return SignPlayer;
}(_player.Player);

exports.SignPlayer = SignPlayer;