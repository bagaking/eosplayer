"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readingPlayer = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _player = require("./player");

var _eosjs = _interopRequireDefault(require("eosjs"));

var _wait = require("./utils/wait");

var defaultConfig = {
  account: {
    name: 'eosio',
    authority: 'active'
  },
  node: {
    keyProvider: ['5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79sample'],
    chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
    mockTransactions: function mockTransactions() {
      return null;
    },
    expireInSeconds: 60,
    broadcast: true,
    debug: false,
    sign: true,
    authorization: null // 该参数用于在多签名情况下，识别签名帐号与权限,格式如：account@permission

  },
  urls: ['https://mars.fn.eosbixin.com', 'https://eos.eoscafeblock.com', 'https://api.eosdublin.io', 'https://api.eosfengwo.com', 'https://eos.genesis-mining.com']
};

var readingPlayer =
/*#__PURE__*/
function (_Player) {
  (0, _inherits2.default)(readingPlayer, _Player);
  (0, _createClass2.default)(readingPlayer, [{
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
    key: "setIdentity",
    value: function setIdentity(name, authority) {
      this._identity = {
        name: name,
        authority: authority
      };
    }
  }, {
    key: "eosClient",
    get: function get() {
      if (!this._eosNodes || this._eosNodes.length <= 0) {
        throw new Error('EosUtil : No Avaliable Nodes.');
      }

      return this._eosNodes[0];
    }
  }]);

  function readingPlayer(_ref) {
    var _this;

    var nodeConfig = _ref.nodeConfig,
        urls = _ref.urls;
    (0, _classCallCheck2.default)(this, readingPlayer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(readingPlayer).call(this));
    _this._conf = (0, _objectSpread2.default)({}, defaultConfig.node, nodeConfig);
    _this._identity = defaultConfig.account;
    _this._urls = (0, _toConsumableArray2.default)(urls);
    _this._nodeConfigs = _this._urls.map(function (url) {
      var ret = {};

      for (var key in _this._conf) {
        if (!_this._conf.hasOwnProperty(key)) continue;
        ret[key] = _this._conf[key];
      }

      ret.httpEndpoint = url;
      return ret;
    });
    console.log('[EosReading] ==> Create reading nodes \nCONFIGS:', JSON.stringify(_this._nodeConfigs));
    _this._eosNodes = _this._nodeConfigs.map(function (cfg) {
      var eos = (0, _eosjs.default)(cfg);
      eos.__conf = cfg;
      return eos;
    });
    _this._head_block_num = 0;
    _this._head_retry_count = 0;
    return _this;
  }

  (0, _createClass2.default)(readingPlayer, [{
    key: "checkNodes",
    value: function () {
      var _checkNodes = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2() {
        var checkSpanMs,
            retry_max,
            blockHeightTolerance,
            chainInfo,
            randomInd,
            anotherChainInfo,
            temp,
            i,
            chainInfoNew,
            _temp,
            _args2 = arguments;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                checkSpanMs = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : 15000;
                retry_max = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : 4;
                blockHeightTolerance = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : 1000;

              case 3:
                if (!true) {
                  _context2.next = 67;
                  break;
                }

                _context2.next = 6;
                return (0, _wait.forMs)(checkSpanMs);

              case 6:
                console.log('[EosReading] ==> Start Checking Nodes ', this.eosClient.__conf.httpEndpoint, 'AT', Date.now());

              case 7:
                if (!true) {
                  _context2.next = 65;
                  break;
                }

                _context2.prev = 8;
                _context2.next = 11;
                return this._eosNodes[0].getInfo({});

              case 11:
                chainInfo = _context2.sent;
                this._head_retry_count = 0;

                if (chainInfo.head_block_num > this._head_block_num) {
                  this._head_block_num = chainInfo.head_block_num;
                  console.log('[EosReading] ==> | Info : new head block num', this._head_block_num, '| Node: ', this.eosClient.__conf.httpEndpoint);
                }

                randomInd = Math.floor(Math.random() * this._eosNodes.length);

                if (!(randomInd === 0)) {
                  _context2.next = 17;
                  break;
                }

                return _context2.abrupt("break", 65);

              case 17:
                _context2.prev = 17;
                console.log('[EosReading] ==> | Info : try pick another node by block height | Node: ', this._eosNodes[randomInd].__conf.httpEndpoint);
                _context2.next = 21;
                return this._eosNodes[randomInd].getInfo({});

              case 21:
                anotherChainInfo = _context2.sent;

                if (anotherChainInfo.head_block_num - this._head_block_num > blockHeightTolerance) {
                  temp = this._eosNodes[0];
                  this._eosNodes[0] = this._eosNodes[randomInd];
                  this._eosNodes[randomInd] = temp;
                  console.log('[EosReading] ==> | Info : new node selected (by head block) | OLD: ', temp.__conf.httpEndpoint, '| NEW:', this.eosClient.__conf.httpEndpoint); // 如果节点发生切换, 就不应该 break 了, 应该走 2000ms 的重试
                } else {
                  console.log('[EosReading] ==> | Info : no needs to switch node for block height | ', anotherChainInfo.head_block_num, '-', this._head_block_num, '<', blockHeightTolerance);
                }

                _context2.next = 28;
                break;

              case 25:
                _context2.prev = 25;
                _context2.t0 = _context2["catch"](17);
                return _context2.abrupt("break", 65);

              case 28:
                _context2.next = 61;
                break;

              case 30:
                _context2.prev = 30;
                _context2.t1 = _context2["catch"](8);

                if (!(this._head_retry_count < retry_max)) {
                  _context2.next = 37;
                  break;
                }

                console.log('[EosReading] ==> | Error : Current node error | RETRY :', this._head_retry_count, '| NODE: ', this._eosNodes[0].__conf.httpEndpoint);
                this._head_retry_count += 1; // and retry will start after 2000ms

                _context2.next = 61;
                break;

              case 37:
                console.log('[EosReading] ==> | Error : Current node error | RETRY : Failed | Node:', this._eosNodes[0].__conf.httpEndpoint);
                i = 1;

              case 39:
                if (!(i < this._eosNodes.length)) {
                  _context2.next = 61;
                  break;
                }

                _context2.prev = 40;
                _context2.next = 43;
                return this._eosNodes[i].getInfo({});

              case 43:
                chainInfoNew = _context2.sent;

                if (!(chainInfoNew.head_block_num >= this._head_block_num)) {
                  _context2.next = 52;
                  break;
                }

                _temp = this._eosNodes[0];
                this._eosNodes[0] = this._eosNodes[i];
                this._eosNodes[i] = _temp;
                console.log('[EosReading] ==> Info : new node selected | OLD: ', _temp.__conf.httpEndpoint, '| NEW:', this.eosClient.__conf.httpEndpoint);
                return _context2.abrupt("break", 61);

              case 52:
                console.log('[EosReading] ==> Info : test node passed | Node: ', this._eosNodes[i].__conf.httpEndpoint, 'Test: ', chainInfoNew.head_block_num, '<', this._head_block_num);

              case 53:
                _context2.next = 58;
                break;

              case 55:
                _context2.prev = 55;
                _context2.t2 = _context2["catch"](40);
                console.log('[EosReading] ==> Warning : test node error | Node: ', this._eosNodes[i].__conf.httpEndpoint);

              case 58:
                i++;
                _context2.next = 39;
                break;

              case 61:
                _context2.next = 63;
                return (0, _wait.forMs)(2000);

              case 63:
                _context2.next = 7;
                break;

              case 65:
                _context2.next = 3;
                break;

              case 67:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[8, 30], [17, 25], [40, 55]]);
      }));

      function checkNodes() {
        return _checkNodes.apply(this, arguments);
      }

      return checkNodes;
    }()
  }]);
  return readingPlayer;
}(_player.Player);

exports.readingPlayer = readingPlayer;