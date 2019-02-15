"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _asset = _interopRequireDefault(require("./utils/asset"));

var _log = _interopRequireDefault(require("./utils/log"));

var _eventHandler = _interopRequireDefault(require("./utils/eventHandler"));

var _chain = _interopRequireDefault(require("./helpers/chain"));

var _kh = _interopRequireDefault(require("./helpers/kh"));

var _eosProvider = _interopRequireDefault(require("./eosProvider"));

var log = (0, _log.default)('chain');
/**
 * @interface eosAPI
 * @property {Function} abiBinToJson
 * @property {Function} abiJsonToBin
 * @property {Function} bidname
 * @property {Function} buyram
 * @property {Function} buyrambytes
 * @property {Function} canceldelay
 * @property {Function} claimrewards
 * @property {Function} contract
 * @property {Function} create
 * @property {Function} createTransaction
 * @property {Function} delegatebw
 * @property {Function} deleteauth
 * @property {Function} getAbi
 * @property {Function} getAccount - getAccount({account_name: [[account_name]] })
 * @property {Function} getActions
 * @property {Function} getBlock
 * @property {Function} getBlockHeaderState
 * @property {Function} getCode
 * @property {Function} getCodeHash
 * @property {Function} getControlledAccounts
 * @property {Function} getCurrencyBalance
 * @property {Function} getCurrencyStats
 * @property {Function} getInfo
 * @property {Function} getKeyAccounts
 * @property {Function} getProducerSchedule
 * @property {Function} getProducers
 * @property {Function} getRawCodeAndAbi
 * @property {Function} getRequiredKeys
 * @property {Function} getScheduledTransactions
 * @property {Function} getTableRows
 * @property {Function} getTransaction
 * @property {Function} issue
 * @property {Function} linkauth
 * @property {Function} newaccount
 * @property {Function} nonce
 * @property {Function} onerror
 * @property {Function} pushBlock
 * @property {Function} pushTransaction
 * @property {Function} pushTransactions
 * @property {Function} refund
 * @property {Function} regproducer
 * @property {Function} regproxy
 * @property {Function} reqauth
 * @property {Function} rmvproducer
 * @property {Function} sellram
 * @property {Function} setabi
 * @property {Function} setalimits
 * @property {Function} setcode
 * @property {Function} setglimits
 * @property {Function} setparams
 * @property {Function} setpriv
 * @property {Function} setprods
 * @property {Function} setram
 * @property {Function} transaction
 * @property {Function} transfer
 * @property {Function} undelegatebw
 * @property {Function} unlinkauth
 * @property {Function} unregprod
 * @property {Function} updateauth
 * @property {Function} voteproducer
 */

/**
 * @interface Scatter
 * @property {Promise} authenticate
 * @property {Function} forgetIdentity - authenticate()
 * @property {Function} getArbitrarySignature - getArbitrarySignature(e,t,r="",n=!1)
 * @property {Function} getIdentity - getIdentity(e={}){return E(i.e,{network:m,fields:e}).then(async e=> {…}
 * @property {Function} requireVersion - ƒ requireVersion(e)
 * @property {Function} suggestNetwork - ƒ suggestNetwork(e)
 * @property {Function} useIdentity
 * @property {Function} eos - create eosApi object : f eos({blockchain, host, port, chainID}, Eos, option={}, protocol="http")
 * @property {Function} eth - ummmmm ...
 */

/**
 * @interface Identity
 * @property {string} name
 * @property {string} authority - default: active
 * @property {string} blockchain - default: eos
 */

/**
 * @interface AccountInfo
 * @property {string} account_name
 * @property {string} core_liquid_balance - asset format, which is a string like '1.0000 EOS'
 * @property {Object.<available,max,used>} cpu_limit
 * @property {Object.<available,max,used>} net_limit
 * @property {number} ram_quota
 * @property {number} ram_usage
 * @property {Array.<Object>}permissions
 * @property {Object.<cpu_weight,net_weight,owner,ram_bytes>} total_resources
 * @property {Object} voter_info
 */

/**
 * event names supported in player
 * @author kinghand@foxmail.com
 * @type {{ERR_TRANSCAL_FAILED: string}}
 */

var EVENT_NAMES = {
  ERR_TRANSFER_FAILED: 'ERR_TRANSFER_FAILED',
  ERR_TRANSCAL_FAILED: 'ERR_TRANSCAL_FAILED',
  ERR_TRANSEND_FAILED: 'ERR_TRANSEND_FAILED'
  /**
   * Player
   */

};

var Player =
/*#__PURE__*/
function (_EosProvider) {
  (0, _inherits2.default)(Player, _EosProvider);

  function Player() {
    var _this;

    (0, _classCallCheck2.default)(this, Player);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Player).call(this));

    _this.events.enableEvents(EVENT_NAMES);

    return _this;
  }

  (0, _createClass2.default)(Player, [{
    key: "getAccountInfo",

    /**
       * get account info of any user, if the account name not given, account info of current identity will return
       * @param account_name
       * @return {Promise<{AccountInfo}>}
       */
    value: function () {
      var _getAccountInfo = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        var account_name,
            _args = arguments;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                account_name = _args.length > 0 && _args[0] !== undefined ? _args[0] : undefined;
                _context.t0 = this.chain;
                _context.t1 = account_name;

                if (_context.t1) {
                  _context.next = 7;
                  break;
                }

                _context.next = 6;
                return this.getIdentity();

              case 6:
                _context.t1 = _context.sent.name;

              case 7:
                _context.t2 = _context.t1;
                _context.next = 10;
                return _context.t0.getAccountInfo.call(_context.t0, _context.t2);

              case 10:
                return _context.abrupt("return", _context.sent);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getAccountInfo() {
        return _getAccountInfo.apply(this, arguments);
      }

      return getAccountInfo;
    }()
    /**
       * get balance of specific account
       * @param code - Account of the currency contract. The default code is "eosio.token", which is the currency code of eos
       * @param account_name - user's account name, name of cur identity by default
       * @param symbolName - the token's symbol name
       * @return {Promise<string|undefined>} asset format '1.0000 EOS'
       */

  }, {
    key: "getBalance",
    value: function () {
      var _getBalance = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2() {
        var account_name,
            code,
            symbolName,
            _args2 = arguments;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                account_name = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : undefined;
                code = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : 'eosio.token';
                symbolName = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : undefined;
                _context2.t0 = this.chain;
                _context2.t1 = account_name;

                if (_context2.t1) {
                  _context2.next = 9;
                  break;
                }

                _context2.next = 8;
                return this.getIdentity();

              case 8:
                _context2.t1 = _context2.sent.name;

              case 9:
                _context2.t2 = _context2.t1;
                _context2.t3 = code;
                _context2.t4 = symbolName;
                return _context2.abrupt("return", _context2.t0.getBalance.call(_context2.t0, _context2.t2, _context2.t3, _context2.t4));

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getBalance() {
        return _getBalance.apply(this, arguments);
      }

      return getBalance;
    }()
    /**
       * get balances list of specific account
       * @param code - Account of the currency contract. The default code is "eosio.token"
       * @param account_name - user's account name, name of cur identity by default
       * @return {Promise<Array.<string>>} asset format '1.0000 EOS'
       */

  }, {
    key: "getBalances",
    value: function () {
      var _getBalances = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3() {
        var account_name,
            code,
            _args3 = arguments;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                account_name = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : undefined;
                code = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : 'eosio.token';
                _context3.t0 = this.chain;
                _context3.t1 = account_name;

                if (_context3.t1) {
                  _context3.next = 8;
                  break;
                }

                _context3.next = 7;
                return this.getIdentity();

              case 7:
                _context3.t1 = _context3.sent.name;

              case 8:
                _context3.t2 = _context3.t1;
                _context3.t3 = code;
                return _context3.abrupt("return", _context3.t0.getBalances.call(_context3.t0, _context3.t2, _context3.t3));

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getBalances() {
        return _getBalances.apply(this, arguments);
      }

      return getBalances;
    }()
    /**
       * get balance value of specific account
       * @param code - Account of the currency contract. The default code is "eosio.token", which is the currency code of eos
       * @param account_name - user's account name, name of cur identity by default
       * @return {Promise<Asset>}
       */

  }, {
    key: "getBalanceAsset",
    value: function () {
      var _getBalanceAsset = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4() {
        var account_name,
            code,
            strAsset,
            _args4 = arguments;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                account_name = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : undefined;
                code = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : 'eosio.token';
                _context4.next = 4;
                return this.getBalance(account_name, code);

              case 4:
                strAsset = _context4.sent;
                return _context4.abrupt("return", _asset.default.parse(strAsset));

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getBalanceAsset() {
        return _getBalanceAsset.apply(this, arguments);
      }

      return getBalanceAsset;
    }()
    /**
       * transfer
       * @param {string} target - eos account, can be user or contract
       * @param {string} quantity - eos asset format, e.p. "1.0000 EOS"
       * @param {string} memo - memo
       * @return {Promise<Object>} transactionData
       */

  }, {
    key: "transfer",
    value: function () {
      var _transfer = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee5(target, quantity) {
        var _this2 = this;

        var memo,
            _args5 = arguments;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                memo = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : '';
                _context5.t0 = this.chain;
                _context5.next = 4;
                return this.getIdentity();

              case 4:
                _context5.t1 = _context5.sent;
                _context5.t2 = target;
                _context5.t3 = quantity;
                _context5.t4 = memo;

                _context5.t5 = function (err) {
                  return _this2.events.emitEvent(EVENT_NAMES.ERR_TRANSCAL_FAILED, err);
                };

                _context5.next = 11;
                return _context5.t0.transfer.call(_context5.t0, _context5.t1, _context5.t2, _context5.t3, _context5.t4, _context5.t5);

              case 11:
                return _context5.abrupt("return", _context5.sent);

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function transfer(_x, _x2) {
        return _transfer.apply(this, arguments);
      }

      return transfer;
    }()
    /**
       * call kh contract with transfer (match eoskit)
       * @param {string} target - eos account, can be user or contract
       * @param {string} quantity - eos asset format, e.p. "1.0000 EOS"
       * @param {string} func - function name
       * @param {Array} args
       * @return {Promise<Object>} transactionData
       */

  }, {
    key: "transcal",
    value: function () {
      var _transcal = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee6(target, quantity, func) {
        var _this3 = this;

        var _len,
            args,
            _key,
            _args6 = arguments;

        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                for (_len = _args6.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
                  args[_key - 3] = _args6[_key];
                }

                _context6.t0 = this.kh;
                _context6.next = 4;
                return this.getIdentity();

              case 4:
                _context6.t1 = _context6.sent;
                _context6.t2 = target;
                _context6.t3 = quantity;
                _context6.t4 = func;
                _context6.t5 = args;

                _context6.t6 = function (err) {
                  return _this3.events.emitEvent(EVENT_NAMES.ERR_TRANSCAL_FAILED, err);
                };

                _context6.next = 12;
                return _context6.t0.transcal.call(_context6.t0, _context6.t1, _context6.t2, _context6.t3, _context6.t4, _context6.t5, _context6.t6);

              case 12:
                return _context6.abrupt("return", _context6.sent);

              case 13:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function transcal(_x3, _x4, _x5) {
        return _transcal.apply(this, arguments);
      }

      return transcal;
    }()
    /**
       * transcal with "0.0001 SYM" token
       * @deprecated using transend instead
       * @param {string} target - eos account, can be user or contract
       * @param {string} symbol
       * @param {string} func
       * @param {Array} args
       * @return {Promise<Object>}
       */

  }, {
    key: "transget",
    value: function () {
      var _transget = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee7(target, symbol, func) {
        var _len2,
            args,
            _key2,
            _args7 = arguments;

        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                for (_len2 = _args7.length, args = new Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
                  args[_key2 - 3] = _args7[_key2];
                }

                _context7.next = 3;
                return this.transend.apply(this, [target, symbol, func].concat(args));

              case 3:
                return _context7.abrupt("return", _context7.sent);

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function transget(_x6, _x7, _x8) {
        return _transget.apply(this, arguments);
      }

      return transget;
    }()
    /**
       * transend method - transcal with "0.0001 SYM" token
       * @param {string} target - eos account, can be user or contract
       * @param {string} symbol
       * @param {string} func
       * @param {Array} args
       * @return {Promise<Object>}
       */

  }, {
    key: "transend",
    value: function () {
      var _transend = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee8(target, symbol, func) {
        var _this4 = this;

        var _len3,
            args,
            _key3,
            _args8 = arguments;

        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                for (_len3 = _args8.length, args = new Array(_len3 > 3 ? _len3 - 3 : 0), _key3 = 3; _key3 < _len3; _key3++) {
                  args[_key3 - 3] = _args8[_key3];
                }

                _context8.t0 = this.kh;
                _context8.next = 4;
                return this.getIdentity();

              case 4:
                _context8.t1 = _context8.sent;
                _context8.t2 = target;
                _context8.t3 = symbol;
                _context8.t4 = func;
                _context8.t5 = args;

                _context8.t6 = function (err) {
                  return _this4.events.emitEvent(EVENT_NAMES.ERR_TRANSEND_FAILED, err);
                };

                _context8.next = 12;
                return _context8.t0.transend.call(_context8.t0, _context8.t1, _context8.t2, _context8.t3, _context8.t4, _context8.t5, _context8.t6);

              case 12:
                return _context8.abrupt("return", _context8.sent);

              case 13:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function transend(_x9, _x10, _x11) {
        return _transend.apply(this, arguments);
      }

      return transend;
    }()
    /**
       * send action to a contract
       * @param {string} code - account of contract
       * @param {string} func - function name
       * @param {Object} jsonData - data
       * @return {Promise<*>} - transaction
       */

  }, {
    key: "call",
    value: function () {
      var _call = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee9(code, func, jsonData) {
        var account, trx;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this.getIdentity();

              case 2:
                account = _context9.sent;
                _context9.next = 5;
                return this.chain.call(code, func, jsonData, {
                  actor: account.name,
                  permission: account.authority
                });

              case 5:
                trx = _context9.sent;

                if (trx) {
                  log.info("call operation dealed, txID: ".concat(trx.transaction_id));
                }

                return _context9.abrupt("return", trx);

              case 8:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function call(_x12, _x13, _x14) {
        return _call.apply(this, arguments);
      }

      return call;
    }()
    /**
       * check a transaction info, retry once per sec until success
       * @deprecated - use eosplayer.chain.waitTx instead
       * @param {string} txID
       * @param {number} maxRound
       * @param {number} timeSpanMS
       * @return {Promise<Object>} transaction
       */

  }, {
    key: "waitTx",
    value: function () {
      var _waitTx = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee10(txID) {
        var maxRound,
            timeSpanMS,
            _args10 = arguments;
        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                maxRound = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : 12;
                timeSpanMS = _args10.length > 2 && _args10[2] !== undefined ? _args10[2] : 1009;
                _context10.next = 4;
                return this.chain.waitTx(txID, maxRound, timeSpanMS);

              case 4:
                return _context10.abrupt("return", _context10.sent);

              case 5:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function waitTx(_x15) {
        return _waitTx.apply(this, arguments);
      }

      return waitTx;
    }()
    /**
       * check a table
       * @deprecated - use eosplayer.chain.checkTable instead
       * @param {string} code - the contract
       * @param {string} tableName - name of the table
       * @param {string} scope
       * @param {number} limit
       * @param {number} lower_bound
       * @param {number} upper_bound
       * @param {number} index_position
       * @return {Promise<Object>}
       */

  }, {
    key: "checkTable",
    value: function () {
      var _checkTable = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee11(code, tableName, scope) {
        var limit,
            lower_bound,
            upper_bound,
            index_position,
            _args11 = arguments;
        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                limit = _args11.length > 3 && _args11[3] !== undefined ? _args11[3] : 10;
                lower_bound = _args11.length > 4 && _args11[4] !== undefined ? _args11[4] : 0;
                upper_bound = _args11.length > 5 && _args11[5] !== undefined ? _args11[5] : -1;
                index_position = _args11.length > 6 && _args11[6] !== undefined ? _args11[6] : 1;
                _context11.next = 6;
                return this.chain.checkTable(code, tableName, scope, limit, lower_bound, upper_bound, index_position);

              case 6:
                return _context11.abrupt("return", _context11.sent);

              case 7:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function checkTable(_x16, _x17, _x18) {
        return _checkTable.apply(this, arguments);
      }

      return checkTable;
    }()
    /**
       * check range in table
       * @deprecated - use eosplayer.chain.checkTableRange instead
       * @param {string} code - the contract
       * @param {string} tableName - name of the table
       * @param {string} scope
       * @param {number | string} from - start position or username
       * @param {number} length
       * @param {number} index_position
       * @return {Promise<Array>}
       */

  }, {
    key: "checkTableRange",
    value: function () {
      var _checkTableRange = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee12(code, tableName, scope, from) {
        var length,
            index_position,
            _args12 = arguments;
        return _regenerator.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                length = _args12.length > 4 && _args12[4] !== undefined ? _args12[4] : 1;
                index_position = _args12.length > 5 && _args12[5] !== undefined ? _args12[5] : 1;
                _context12.next = 4;
                return this.chain.checkTableRange(code, tableName, scope, from, length, index_position);

              case 4:
                return _context12.abrupt("return", _context12.sent);

              case 5:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function checkTableRange(_x19, _x20, _x21, _x22) {
        return _checkTableRange.apply(this, arguments);
      }

      return checkTableRange;
    }()
    /**
       * check a item in a table
       * @deprecated - use eosplayer.chain.checkTableItem instead
       * @param {string} code - the contract
       * @param {string} tableName
       * @param {string} scope
       * @param {number} key
       * @param {number} index_position
       * @return {Promise<*>}
       */

  }, {
    key: "checkTableItem",
    value: function () {
      var _checkTableItem = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee13(code, tableName, scope) {
        var key,
            index_position,
            _args13 = arguments;
        return _regenerator.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                key = _args13.length > 3 && _args13[3] !== undefined ? _args13[3] : 0;
                index_position = _args13.length > 4 && _args13[4] !== undefined ? _args13[4] : 1;
                _context13.next = 4;
                return this.chain.checkTableItem(code, tableName, scope, key, index_position);

              case 4:
                return _context13.abrupt("return", _context13.sent);

              case 5:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function checkTableItem(_x23, _x24, _x25) {
        return _checkTableItem.apply(this, arguments);
      }

      return checkTableItem;
    }()
    /**
       * create a account with public key
       * @param name
       * @param activeKey
       * @param ownerKey
       * @return {Promise<void>}
       */

  }, {
    key: "newAccount",
    value: function () {
      var _newAccount = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee14(name, activeKey, ownerKey) {
        var creator, result;
        return _regenerator.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                if (activeKey) {
                  _context14.next = 2;
                  break;
                }

                throw new Error('newAccount : active key error ');

              case 2:
                if (!ownerKey) {
                  ownerKey = activeKey;
                }

                _context14.next = 5;
                return this.getIdentity();

              case 5:
                creator = _context14.sent;
                result = this.eosClient.transaction(function (tr) {
                  tr.newaccount({
                    creator: creator.name,
                    name: name,
                    owner: ownerKey,
                    active: activeKey
                  });
                  tr.buyrambytes({
                    payer: creator.name,
                    receiver: name,
                    bytes: 8192
                  });
                  tr.delegatebw({
                    from: creator.name,
                    receiver: name,
                    stake_net_quantity: '1.0000 EOS',
                    stake_cpu_quantity: '1.0000 EOS',
                    transfer: 0
                  });
                });
                return _context14.abrupt("return", result);

              case 8:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function newAccount(_x26, _x27, _x28) {
        return _newAccount.apply(this, arguments);
      }

      return newAccount;
    }()
    /**
       *  get version
       */

  }, {
    key: "events",
    get: function get() {
      return this._events || (this._events = new _eventHandler.default());
    }
  }, {
    key: "chain",
    get: function get() {
      return new _chain.default(this.eosClient);
    }
  }, {
    key: "kh",
    get: function get() {
      return new _kh.default(this.chain);
    }
  }, {
    key: "version",
    get: function get() {
      return '0.3.0';
    }
    /**
       *  get help info
       */

  }, {
    key: "help",
    get: function get() {
      var helpInfo = "\n```js\n      =============================================================\n        \n               -----      ------        ------      -------\n              -----     -----          ------      -------\n             -----   -----            ------      -------\n            -----  -----             ------      -------\n           ----------                ----- ---- ------ \n          -----  -----              ----- ---- ------\n         -----    -----           ------      -------\n        -----      ------        ------      -------\n       ------       -------     ------      -------\n      --------      ---------  ------      -------\n        \n===========================================================\n```\n---\n\n# eosplayer ".concat(this.version, "\n        \n## Usage of eosplayer\n\n### Events\n\n`ERR_TRANSFER_FAILED`\n`ERR_TRANSCAL_FAILED`\n`ERR_TRANSEND_FAILED`\n\n### APIs\n\n```js\n{String} get help // get help info of usage\n{String} get version // get the version info\n{ChainHelper} get chain // get the chain helper\n{KhHelper} get kh // get the kh contract helper\n\n{Void} eosplayer.event.setEvent(event, fnCallback, context) //listen to a event\n\n{Eos} get eosplayer.eosClient // get eos instance\n{Identity} async eosplayer.getIdentity() // get identity\n\n{AccountInfo} async eosplayer.getAccountInfo(account_name = identity.name) \n    // get account info for any user\n\n{String} async eosplayer.getBalance(account_name = undefined, code = \"eosio.token\", symbolName = undefined)  \n    // get balance string of a account. ex. \"1.0000 EOS\", null means that the account dosen't have any token,\n\n{Array.<String>} async getBalances(account_name = undefined, code = \"eosio.token\")\n    // get balances\n\n{String} async eosplayer.getBalanceAsset(account_name = undefined, code = \"eosio.token\") \n    // get balance structure of a account. ex. {val:1, sym:\"EOS\", decimal:4}\n\n{Tx} async eosplayer.transfer(target, quantity, memo = \"\")\n    // transfer tokens to target\n\n{Tx} async eosplayer.transcal(code, quantity, func, ...args) \n    // send a action of transcal to contract\n    \n{Tx} async eosplayer.transget(code, symbol, func, ...args) \n    // send a action of trancal (quantity value = 0.0001) to contract\n\n{Contract} async eosplayer.contract(code)\n    // get contract object\n\n{Tx} async eosplayer.call(code, func, jsonData)\n    // send a action to contract\n    \n{Tx} async eosplayer.newAccount(name, activeKey, ownerKey)\n    // create a account with public key\n```\n\n").concat(_chain.default.help);
      return helpInfo;
    }
  }]);
  return Player;
}(_eosProvider.default);

exports.Player = Player;