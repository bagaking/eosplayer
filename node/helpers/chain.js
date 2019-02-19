'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _wait = require("../utils/wait");

var _bignumber = require("bignumber.js");

var _log = _interopRequireDefault(require("../utils/log"));

var _eosjs = _interopRequireDefault(require("eosjs"));

var _eosjsEcc = _interopRequireDefault(require("eosjs-ecc"));

var log = (0, _log.default)('chain');
/**
 * chain helper, supported chain operations
 * @author kinghand@foxmail.com
 */

var ChainHelper =
/*#__PURE__*/
function () {
  function ChainHelper(eosClient) {
    (0, _classCallCheck2.default)(this, ChainHelper);
    this._eos = eosClient;
  }
  /**
     * get info of the chain connected
     * @return {Promise<*>}
     */


  (0, _createClass2.default)(ChainHelper, [{
    key: "getInfo",
    value: function () {
      var _getInfo = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._eos.getInfo({});

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getInfo() {
        return _getInfo.apply(this, arguments);
      }

      return getInfo;
    }()
    /**
       * get specific block of the chain
       * @param blockNumOrId
       * @return {Promise<*>}
       */

  }, {
    key: "getBlock",
    value: function () {
      var _getBlock = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(blockNumOrId) {
        var params;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = {
                  'block_num_or_id': blockNumOrId
                };
                _context2.next = 3;
                return this._eos.getBlock(params);

              case 3:
                return _context2.abrupt("return", _context2.sent);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getBlock(_x) {
        return _getBlock.apply(this, arguments);
      }

      return getBlock;
    }()
    /**
       * get contract
       * @param code
       * @return {Promise<void>}
       */

  }, {
    key: "getContract",
    value: function () {
      var _getContract = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(code) {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._eos.contract(code);

              case 2:
                return _context3.abrupt("return", _context3.sent);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getContract(_x2) {
        return _getContract.apply(this, arguments);
      }

      return getContract;
    }()
    /**
       * get the abi of contract
       * @param code
       * @return {Promise<*>}
       */

  }, {
    key: "getAbi",
    value: function () {
      var _getAbi = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4(code) {
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._eos.getAbi(code);

              case 2:
                return _context4.abrupt("return", _context4.sent);

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getAbi(_x3) {
        return _getAbi.apply(this, arguments);
      }

      return getAbi;
    }()
    /**
       * get the definition of a table in specific contract abi
       * @param code
       * @param tableName
       * @return {Promise<T | undefined>}
       */

  }, {
    key: "getTableAbi",
    value: function () {
      var _getTableAbi = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee5(code, tableName) {
        var abi;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.getAbi(code);

              case 2:
                abi = _context5.sent;
                return _context5.abrupt("return", abi.abi.tables.find(function (desc) {
                  return desc.name === tableName;
                }));

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getTableAbi(_x4, _x5) {
        return _getTableAbi.apply(this, arguments);
      }

      return getTableAbi;
    }()
    /**
       * abiJsonToBin
       * @param code
       * @param action
       * @param args
       * @return {Promise<string>}
       */

  }, {
    key: "abiJsonToBin",
    value: function () {
      var _abiJsonToBin = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee6(code, action, args) {
        var params;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                params = {
                  'code': code,
                  'action': action,
                  'args': args
                };
                _context6.next = 3;
                return this._eos.abiJsonToBin(params);

              case 3:
                return _context6.abrupt("return", _context6.sent.binargs);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function abiJsonToBin(_x6, _x7, _x8) {
        return _abiJsonToBin.apply(this, arguments);
      }

      return abiJsonToBin;
    }()
    /**
       * get account info of any user
       * @param {string|number} account_name - string name or id
       * @return {Promise<{AccountInfo}>}
       */

  }, {
    key: "getAccountInfo",
    value: function () {
      var _getAccountInfo = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee7(account_name) {
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this._eos.getAccount({
                  account_name: account_name
                });

              case 2:
                return _context7.abrupt("return", _context7.sent);

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getAccountInfo(_x9) {
        return _getAccountInfo.apply(this, arguments);
      }

      return getAccountInfo;
    }()
    /**
       * get first public key of an account
       * @param name - account_name
       * @param authority - default is 'active'
       * @return {Promise<*>}
       * @constructor
       */

  }, {
    key: "getPubKey",
    value: function () {
      var _getPubKey = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee8(account_name) {
        var authority,
            pubkeys,
            _args8 = arguments;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                authority = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : 'active';
                _context8.next = 3;
                return this.getPubKeys(account_name, authority);

              case 3:
                pubkeys = _context8.sent;

                if (!(!pubkeys || pubkeys.length <= 0)) {
                  _context8.next = 7;
                  break;
                }

                log.warning("cannot find public key for ".concat(account_name, "@").concat(authority));
                return _context8.abrupt("return");

              case 7:
                _context8.next = 9;
                return this.getPubKeys(account_name, authority);

              case 9:
                return _context8.abrupt("return", _context8.sent[0].key);

              case 10:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function getPubKey(_x10) {
        return _getPubKey.apply(this, arguments);
      }

      return getPubKey;
    }()
    /**
       * get public keys of an account
       * @param name - account_name
       * @param authority - default is 'active'
       * @return {Promise<*>}
       * @constructor
       */

  }, {
    key: "getPubKeys",
    value: function () {
      var _getPubKeys = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee9(account_name) {
        var authority,
            accountInfo,
            permission,
            _args9 = arguments;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                authority = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : 'active';
                _context9.next = 3;
                return this.getAccountInfo(account_name);

              case 3:
                accountInfo = _context9.sent;
                permission = accountInfo.permissions.find(function (v) {
                  return v.perm_name == authority;
                });

                if (permission) {
                  _context9.next = 7;
                  break;
                }

                throw new Error("cannot find the permission of ".concat(account_name));

              case 7:
                return _context9.abrupt("return", permission.required_auth.keys);

              case 8:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function getPubKeys(_x11) {
        return _getPubKeys.apply(this, arguments);
      }

      return getPubKeys;
    }()
    /**
       * recover public key from signature
       * @param signature - signed data
       * @param message
       * @return {string|pubkey|PublicKey}
       */

  }, {
    key: "recoverSign",
    value: function recoverSign(signature, message) {
      return _eosjsEcc.default.recover(signature, message);
    }
    /**
       * validate if signed data is signed by a account
       * @param signature - signed data
       * @param message
       * @param account
       * @param authority - default is 'active'
       * @param {Object.<string,function>} plugins - plugin should be object
       * @example
       * validateSign(SIG, MSG, ACC, 'active', { ['pretonarts11@eosio.code'] : async (account, recoverKey) => validate rpc ... }
       * @return {string|pubkey|PublicKey}
       */

  }, {
    key: "validateSign",
    value: function () {
      var _validateSign = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee10(signature, message, account) {
        var authority,
            accountsPermisionPlugins,
            recoverKey,
            _ref,
            permissions,
            perm,
            _perm$required_auth,
            accounts,
            keys,
            keyObj,
            accountsStrs,
            i,
            plugin,
            _args10 = arguments;

        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                authority = _args10.length > 3 && _args10[3] !== undefined ? _args10[3] : 'active';
                accountsPermisionPlugins = _args10.length > 4 ? _args10[4] : undefined;
                recoverKey = this.recoverSign(signature, message);
                _context10.next = 5;
                return this.getAccountInfo(account);

              case 5:
                _ref = _context10.sent;
                permissions = _ref.permissions;

                if (permissions) {
                  _context10.next = 10;
                  break;
                }

                log.warning("permissions of account ".concat(account, " are not found."));
                return _context10.abrupt("return");

              case 10:
                perm = permissions.find(function (p) {
                  return p.perm_name === authority;
                });

                if (permissions) {
                  _context10.next = 14;
                  break;
                }

                log.warning("permission ".concat(authority, " account ").concat(account, " are not found."));
                return _context10.abrupt("return");

              case 14:
                _perm$required_auth = perm.required_auth, accounts = _perm$required_auth.accounts, keys = _perm$required_auth.keys;
                keyObj = keys.find(function (v) {
                  return v.key === recoverKey;
                });

                if (!keyObj) {
                  _context10.next = 18;
                  break;
                }

                return _context10.abrupt("return", keyObj.key);

              case 18:
                if (accountsPermisionPlugins) {
                  _context10.next = 20;
                  break;
                }

                return _context10.abrupt("return");

              case 20:
                accountsStrs = accounts.map(function (acc) {
                  return "".concat(acc.permission.actor, "@").concat(acc.permission.permission);
                });
                log.verbose('try match', accounts, accountsStrs, accountsPermisionPlugins);
                _context10.t0 = _regenerator.default.keys(accountsStrs);

              case 23:
                if ((_context10.t1 = _context10.t0()).done) {
                  _context10.next = 35;
                  break;
                }

                i = _context10.t1.value;
                plugin = accountsPermisionPlugins[accountsStrs[i]];

                if (plugin) {
                  _context10.next = 28;
                  break;
                }

                return _context10.abrupt("continue", 23);

              case 28:
                log.warning(plugin);
                _context10.next = 31;
                return Promise.resolve(plugin(account, recoverKey));

              case 31:
                if (!_context10.sent) {
                  _context10.next = 33;
                  break;
                }

                return _context10.abrupt("return", recoverKey);

              case 33:
                _context10.next = 23;
                break;

              case 35:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function validateSign(_x12, _x13, _x14) {
        return _validateSign.apply(this, arguments);
      }

      return validateSign;
    }()
    /**
       * get a account's action count
       * @param {string|number} account_name - string name or id
       * @return {Promise<number>}
       */

  }, {
    key: "getActionCount",
    value: function () {
      var _getActionCount = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee11(account_name) {
        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return this.getActionMaxSeq(account_name);

              case 2:
                _context11.t0 = _context11.sent;
                return _context11.abrupt("return", _context11.t0 + 1);

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function getActionCount(_x15) {
        return _getActionCount.apply(this, arguments);
      }

      return getActionCount;
    }()
    /**
       * get a account's max seq
       * @param {string|number} account_name - string name or id
       * @return {Promise<number>} - return -1 if there is no action
       */

  }, {
    key: "getActionMaxSeq",
    value: function () {
      var _getActionMaxSeq = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee12(account_name) {
        var recentActions, acts;
        return _regenerator.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return this.getRecentActions(account_name);

              case 2:
                recentActions = _context12.sent;

                if (!(!recentActions || !recentActions.actions)) {
                  _context12.next = 5;
                  break;
                }

                throw new Error("getActionCount failed: cannot find recent actions of ".concat(account_name, ")"));

              case 5:
                acts = recentActions.actions;
                return _context12.abrupt("return", acts.length === 0 ? -1 : acts[acts.length - 1].account_action_seq);

              case 7:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function getActionMaxSeq(_x16) {
        return _getActionMaxSeq.apply(this, arguments);
      }

      return getActionMaxSeq;
    }()
    /**
       * get recent actions
       * @param account_name
       * @return {Promise<Array>}
       */

  }, {
    key: "getRecentActions",
    value: function () {
      var _getRecentActions = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee13(account_name) {
        return _regenerator.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return this._eos.getActions({
                  account_name: account_name
                });

              case 2:
                return _context13.abrupt("return", _context13.sent);

              case 3:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function getRecentActions(_x17) {
        return _getRecentActions.apply(this, arguments);
      }

      return getRecentActions;
    }()
    /**
       * get actions of an account
       * @desc to avoid searching in huge amount actions, the application layer should check the getActionCount before calling thi method
       * @param {string|number} account_name - string name or id
       * @param {number} startPos - start from 0
       * @param {number} offset - when offset is 0, one object returned, offset ==(should be) count - 1
       * @return {Promise<Array>} - [startPos, ..., startPos + offset]
       */

  }, {
    key: "getActions",
    value: function () {
      var _getActions = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee14(account_name) {
        var startPos,
            offset,
            pos,
            endPos,
            actions,
            ret,
            acts,
            maxActionInd,
            _args14 = arguments;
        return _regenerator.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                startPos = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : 0;
                offset = _args14.length > 2 && _args14[2] !== undefined ? _args14[2] : 0;
                pos = startPos;
                endPos = startPos + offset;
                actions = [];
                log.verbose('getActions start', startPos, endPos, 'current:', actions.length);

              case 6:
                if (!true) {
                  _context14.next = 31;
                  break;
                }

                ret = void 0;
                _context14.prev = 8;
                _context14.next = 11;
                return (0, _wait.TimeoutPromise)(10000, this._eos.getActions({
                  account_name: account_name,
                  pos: pos,
                  offset: endPos - pos
                }));

              case 11:
                ret = _context14.sent;
                _context14.next = 18;
                break;

              case 14:
                _context14.prev = 14;
                _context14.t0 = _context14["catch"](8);
                log.warning(_context14.t0);
                return _context14.abrupt("continue", 6);

              case 18:
                if (!(!ret || !ret.actions)) {
                  _context14.next = 20;
                  break;
                }

                throw new Error("getActions failed: cannot find actions of ".concat(account_name, " (pos:").concat(pos, ", offset:").concat(offset, ")"));

              case 20:
                acts = ret.actions;
                log.verbose('getActions find', acts[acts.length - 1]);
                maxActionInd = acts.length === 0 ? pos - 1 : acts[acts.length - 1].account_action_seq;

                if (!(maxActionInd < pos)) {
                  _context14.next = 25;
                  break;
                }

                return _context14.abrupt("break", 31);

              case 25:
                actions.push.apply(actions, (0, _toConsumableArray2.default)(acts));

                if (!(maxActionInd >= endPos)) {
                  _context14.next = 28;
                  break;
                }

                return _context14.abrupt("break", 31);

              case 28:
                pos = maxActionInd + 1;
                _context14.next = 6;
                break;

              case 31:
                return _context14.abrupt("return", actions);

              case 32:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this, [[8, 14]]);
      }));

      function getActions(_x18) {
        return _getActions.apply(this, arguments);
      }

      return getActions;
    }()
    /**
       * Get all the actions in bulk
       * @param account_name
       * @param cbReceive - using this callback to receive list of actions
       * @param startPos
       * @param count
       * @param concurrent
       * @return {Promise<void>}
       */

  }, {
    key: "getAllActionsBatch",
    value: function () {
      var _getAllActionsBatch = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee16(account_name, cbReceive) {
        var _this = this;

        var startPos,
            count,
            concurrent,
            offset,
            req,
            ret,
            ranges,
            tStart,
            i,
            tRound,
            results,
            _args16 = arguments;
        return _regenerator.default.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                startPos = _args16.length > 2 && _args16[2] !== undefined ? _args16[2] : 0;
                count = _args16.length > 3 && _args16[3] !== undefined ? _args16[3] : 100;
                concurrent = _args16.length > 4 && _args16[4] !== undefined ? _args16[4] : 10;
                offset = count - 1;

                req =
                /*#__PURE__*/
                function () {
                  var _ref2 = (0, _asyncToGenerator2.default)(
                  /*#__PURE__*/
                  _regenerator.default.mark(function _callee15(pos) {
                    return _regenerator.default.wrap(function _callee15$(_context15) {
                      while (1) {
                        switch (_context15.prev = _context15.next) {
                          case 0:
                            if (!true) {
                              _context15.next = 13;
                              break;
                            }

                            _context15.prev = 1;
                            log.verbose("search Start : at:".concat(Date.now(), " pos:").concat(pos, " offset:").concat(offset));
                            _context15.next = 5;
                            return _this.getActions(account_name, pos, offset);

                          case 5:
                            return _context15.abrupt("return", _context15.sent);

                          case 8:
                            _context15.prev = 8;
                            _context15.t0 = _context15["catch"](1);
                            log.error('error : ', _context15.t0);

                          case 11:
                            _context15.next = 0;
                            break;

                          case 13:
                          case "end":
                            return _context15.stop();
                        }
                      }
                    }, _callee15, this, [[1, 8]]);
                  }));

                  return function req(_x21) {
                    return _ref2.apply(this, arguments);
                  };
                }();

                ret = [];
                ranges = [];
                log.info("===> start search actions of ".concat(account_name, " from ").concat(startPos, ", concurrent : ").concat(concurrent, ", count : ").concat(count, ", once : ").concat(concurrent * count));
                tStart = Date.now();
                i = 0;

              case 10:
                ranges.push(startPos + i * count);

                if (!(i % concurrent === 0)) {
                  _context16.next = 23;
                  break;
                }

                tRound = Date.now();
                log.verbose("===> deal batch ".concat(i, " : ").concat(ranges, " at ").concat(tStart));
                _context16.next = 16;
                return Promise.all(ranges.map(req));

              case 16:
                results = _context16.sent;

                if (results.find(function (acts) {
                  return acts.length > 0;
                })) {
                  _context16.next = 19;
                  break;
                }

                return _context16.abrupt("break", 26);

              case 19:
                log.verbose("===> deal batch ".concat(i, " done (").concat(Date.now() - tRound, ")"));
                results.forEach(function (acts) {
                  if (acts.length <= 0) {
                    return;
                  }

                  if (cbReceive != null) {
                    cbReceive(acts);
                  }

                  ret.push.apply(ret, (0, _toConsumableArray2.default)(acts));
                });
                log.verbose("===> send batch ".concat(i, " done (").concat(Date.now() - tRound, ")"));
                ranges = [];

              case 23:
                i++;
                _context16.next = 10;
                break;

              case 26:
                log.info("getAllActions : all scaned (".concat(Date.now() - tStart, ")"));
                return _context16.abrupt("return", ret);

              case 28:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function getAllActionsBatch(_x19, _x20) {
        return _getAllActionsBatch.apply(this, arguments);
      }

      return getAllActionsBatch;
    }()
    /**
       * get balance of specific account
       * @param account_name - user's account name
       * @param code - Account of the currency contract. The default code is "eosio.token", which is the currency code of eos
       * @param symbolName - the token's symbol name
       * @return {Promise<string|undefined>} asset format '1.0000 EOS'
       */

  }, {
    key: "getBalance",
    value: function () {
      var _getBalance = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee17(account_name) {
        var code,
            symbolName,
            balances,
            _args17 = arguments;
        return _regenerator.default.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                code = _args17.length > 1 && _args17[1] !== undefined ? _args17[1] : 'eosio.token';
                symbolName = _args17.length > 2 && _args17[2] !== undefined ? _args17[2] : undefined;
                _context17.next = 4;
                return this.getBalances(account_name, code);

              case 4:
                balances = _context17.sent;

                if (symbolName) {
                  _context17.next = 10;
                  break;
                }

                log.warning('Symbol of the token has not been specified, the first item will return. all:', balances);
                return _context17.abrupt("return", balances[0] || null);

              case 10:
                if (!(typeof symbolName === 'string')) {
                  _context17.next = 12;
                  break;
                }

                return _context17.abrupt("return", balances.find(function (v) {
                  return v.endsWith(symbolName);
                }) || null);

              case 12:
                log.error('Symbol gave but error.');
                return _context17.abrupt("return", null);

              case 14:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function getBalance(_x22) {
        return _getBalance.apply(this, arguments);
      }

      return getBalance;
    }()
    /**
       * get balance of specific account
       * @param account_name - user's account name
       * @param code - Account of the currency contract. The default code is "eosio.token", which is the currency code of eos
       * @return {Promise<Array>} - list of asset, asset format is like '1.0000 EOS'
       */

  }, {
    key: "getBalances",
    value: function () {
      var _getBalances = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee18(account_name) {
        var code,
            _args18 = arguments;
        return _regenerator.default.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                code = _args18.length > 1 && _args18[1] !== undefined ? _args18[1] : 'eosio.token';
                _context18.next = 3;
                return this._eos.getCurrencyBalance(code, account_name);

              case 3:
                _context18.t0 = _context18.sent;

                if (_context18.t0) {
                  _context18.next = 6;
                  break;
                }

                _context18.t0 = [];

              case 6:
                _context18.t1 = function (v) {
                  return v.trim();
                };

                return _context18.abrupt("return", _context18.t0.map(_context18.t1));

              case 8:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function getBalances(_x23) {
        return _getBalances.apply(this, arguments);
      }

      return getBalances;
    }()
    /**
       * transfer
       * @param {Object} account - {name, authority}
       * @param {string} target - eos account, can be user or contract
       * @param {string} quantity - eos asset format, e.p. "1.0000 EOS"
       * @param {string} memo - memo
       * @param {Function} cbError - memo
       * @return {Promise<Object>} transactionData
       */

  }, {
    key: "transfer",
    value: function () {
      var _transfer = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee19(account, target, quantity) {
        var memo,
            cbError,
            transOptions,
            trx,
            _args19 = arguments;
        return _regenerator.default.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                memo = _args19.length > 3 && _args19[3] !== undefined ? _args19[3] : '';
                cbError = _args19.length > 4 ? _args19[4] : undefined;
                transOptions = {
                  authorization: ["".concat(account.name, "@").concat(account.authority)]
                };
                _context19.next = 5;
                return this._eos.transfer(account.name, target, quantity, memo, transOptions).catch(cbError || log.error);

              case 5:
                trx = _context19.sent;

                if (trx) {
                  log.info("Transfer dealed, txID: ".concat(trx.transaction_id));
                }

                return _context19.abrupt("return", trx);

              case 8:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      function transfer(_x24, _x25, _x26) {
        return _transfer.apply(this, arguments);
      }

      return transfer;
    }()
    /**
       * check a transaction info, retry once per sec until success
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
      _regenerator.default.mark(function _callee21(txID) {
        var _this2 = this;

        var maxRound,
            timeSpanMS,
            waitForMs,
            checkTx,
            _args21 = arguments;
        return _regenerator.default.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                maxRound = _args21.length > 1 && _args21[1] !== undefined ? _args21[1] : 12;
                timeSpanMS = _args21.length > 2 && _args21[2] !== undefined ? _args21[2] : 1009;

                // Unmanaged polling uses prime as the default interval
                waitForMs = function waitForMs(time) {
                  return new Promise(function (resolve) {
                    return setTimeout(resolve, time);
                  });
                };

                checkTx =
                /*#__PURE__*/
                function () {
                  var _ref3 = (0, _asyncToGenerator2.default)(
                  /*#__PURE__*/
                  _regenerator.default.mark(function _callee20(_txID) {
                    var round,
                        tx,
                        _args20 = arguments;
                    return _regenerator.default.wrap(function _callee20$(_context20) {
                      while (1) {
                        switch (_context20.prev = _context20.next) {
                          case 0:
                            round = _args20.length > 1 && _args20[1] !== undefined ? _args20[1] : 0;
                            _context20.prev = 1;
                            _context20.next = 4;
                            return _this2._eos.getTransaction(_txID);

                          case 4:
                            tx = _context20.sent;

                            if (!tx) {
                              _context20.next = 7;
                              break;
                            }

                            return _context20.abrupt("return", tx);

                          case 7:
                            _context20.next = 12;
                            break;

                          case 9:
                            _context20.prev = 9;
                            _context20.t0 = _context20["catch"](1);
                            log.verbose("wait tx ".concat(_txID, ", retry round: ").concat(round, ". ").concat(_context20.t0.message));

                          case 12:
                            if (!(round >= maxRound)) {
                              _context20.next = 15;
                              break;
                            }

                            log.error("wait tx failed, round out.");
                            return _context20.abrupt("return", null);

                          case 15:
                            _context20.next = 17;
                            return waitForMs(timeSpanMS);

                          case 17:
                            return _context20.abrupt("return", checkTx(_txID, round + 1));

                          case 18:
                          case "end":
                            return _context20.stop();
                        }
                      }
                    }, _callee20, this, [[1, 9]]);
                  }));

                  return function checkTx(_x28) {
                    return _ref3.apply(this, arguments);
                  };
                }();

                _context21.next = 6;
                return checkTx(txID);

              case 6:
                return _context21.abrupt("return", _context21.sent);

              case 7:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, this);
      }));

      function waitTx(_x27) {
        return _waitTx.apply(this, arguments);
      }

      return waitTx;
    }()
    /**
       * send action to a contract
       * @param {string} code - account of contract
       * @param {string} func - function name
       * @param {Object} jsonData - data
       * @param {Array.<Object>} authorization - should be an object who has keys {actor, permission}
       * @return {Promise<*>} - transaction
       */

  }, {
    key: "call",
    value: function () {
      var _call = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee22(code, func, jsonData) {
        var _len,
            authorization,
            _key,
            _args22 = arguments;

        return _regenerator.default.wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                for (_len = _args22.length, authorization = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
                  authorization[_key - 3] = _args22[_key];
                }

                _context22.next = 3;
                return this._eos.transaction({
                  actions: [{
                    account: code,
                    name: func,
                    authorization: authorization,
                    data: jsonData
                  }]
                });

              case 3:
                return _context22.abrupt("return", _context22.sent);

              case 4:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this);
      }));

      function call(_x29, _x30, _x31) {
        return _call.apply(this, arguments);
      }

      return call;
    }()
    /**
       * get all items in a table
       * @desc this method can be very fast (infinitely close to once rpc time) when provide hint table
       * @param {string} code - the contract
       * @param {string} tableName - name of the table
       * @param {string} scope
       * @param {string|number} lower - lower position, can be number or stringNumber, cannot be account_name
       * @param {string|number} upper - lower position, can be number or stringNumber, cannot be account_name
       * @param {Array} hint - hint table to speed up search
       * @example getTable("contract", "table", "scope", 0, -1, "4611686018427387903", "6917529027641081856", "9223372036854775808", "13835058055282163712")
       * @return {Promise<Array>}
       */

  }, {
    key: "getTable",
    value: function () {
      var _getTable = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee23(code, tableName, scope, lower, upper) {
        var _this3 = this;

        var _len2,
            hint,
            _key2,
            ret,
            pool,
            Require,
            _args23 = arguments;

        return _regenerator.default.wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                for (_len2 = _args23.length, hint = new Array(_len2 > 5 ? _len2 - 5 : 0), _key2 = 5; _key2 < _len2; _key2++) {
                  hint[_key2 - 5] = _args23[_key2];
                }

                lower = lower ? (0, _bignumber.BigNumber)(lower) : (0, _bignumber.BigNumber)(0);
                upper = upper && upper !== -1 ? (0, _bignumber.BigNumber)(upper) : (0, _bignumber.BigNumber)('18446744073709551615');
                ret = [];
                pool = [];

                Require = function Require(_l, _u) {
                  log.verbose('search ', Date.now(), _l.toFixed(0), _u.toFixed(0));
                  if (_l.gte(_u)) return;

                  var _promise = _this3._eos.getTableRows({
                    json: true,
                    code: code,
                    scope: scope,
                    table: tableName,
                    limit: -1,
                    lower_bound: _l.toFixed(0),
                    upper_bound: _u.toFixed(0)
                  }).then(function (result) {
                    var _myInd = pool.findIndex(function (v) {
                      return v === _promise;
                    });

                    pool.splice(_myInd, 1);

                    if (!result) {
                      return;
                    }

                    if (!result.more) {
                      if (result.rows) {
                        ret.push.apply(ret, (0, _toConsumableArray2.default)(result.rows));
                      }
                    } else {
                      var _mid = _u.minus(_l).dividedBy(2).decimalPlaces(0).plus(_l);

                      Require(_l, _mid.minus(1));
                      Require(_mid, _u);
                    }
                  }).catch(function (err) {
                    var _myInd = pool.find(function (v) {
                      return v === _promise;
                    });

                    pool.splice(_myInd, 1);
                    throw err;
                  });

                  pool.push(_promise);
                };

                if (!hint || hint.length <= 0) {
                  Require(lower, upper);
                } else {
                  [].concat((0, _toConsumableArray2.default)(hint.map(function (i) {
                    return (0, _bignumber.BigNumber)(i);
                  })), [upper]).reduce(function (_l, _m) {
                    Require(_l, _m);
                    return _m;
                  }, lower);
                }

              case 7:
                if (!(pool.length > 0)) {
                  _context23.next = 12;
                  break;
                }

                _context23.next = 10;
                return (0, _wait.forMs)(50);

              case 10:
                _context23.next = 7;
                break;

              case 12:
                log.verbose('done search ', Date.now(), lower.toFixed(0), upper.toFixed(0));
                return _context23.abrupt("return", ret);

              case 14:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, this);
      }));

      function getTable(_x32, _x33, _x34, _x35, _x36) {
        return _getTable.apply(this, arguments);
      }

      return getTable;
    }()
    /**
       * check a table
       * @desc the tag 'more' are not handled.
       * @param {string} code - the contract
       * @param {string} tableName - name of the table
       * @param {string} scope
       * @param {number} limit
       * @param {number | string} lower_bound
       * @param {number | string} upper_bound
       * @param {number} index_position
       * @return {Promise<Array>}
       */

  }, {
    key: "checkTable",
    value: function () {
      var _checkTable = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee24(code, tableName, scope) {
        var limit,
            lower_bound,
            upper_bound,
            index_position,
            result,
            ret,
            _args24 = arguments;
        return _regenerator.default.wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                limit = _args24.length > 3 && _args24[3] !== undefined ? _args24[3] : 10;
                lower_bound = _args24.length > 4 && _args24[4] !== undefined ? _args24[4] : 0;
                upper_bound = _args24.length > 5 && _args24[5] !== undefined ? _args24[5] : -1;
                index_position = _args24.length > 6 && _args24[6] !== undefined ? _args24[6] : 1;
                log.verbose('search ', Date.now(), lower_bound, upper_bound, limit);
                _context24.next = 7;
                return this._eos.getTableRows({
                  json: true,
                  code: code,
                  scope: scope,
                  table: tableName,
                  limit: limit,
                  lower_bound: lower_bound,
                  upper_bound: upper_bound,
                  index_position: index_position
                });

              case 7:
                result = _context24.sent;
                ret = result && result.rows ? result.rows : [];

                if (result.more && (limit <= 0 || result.rows && result.rows.length < limit)) {
                  // deal with 'more'
                  log.warning("'more' detected, and this method didn't deal with the tag 'more'. if you want to get all results, using checkTableMore and provide the primary key. ");
                }

                return _context24.abrupt("return", ret);

              case 11:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, this);
      }));

      function checkTable(_x37, _x38, _x39) {
        return _checkTable.apply(this, arguments);
      }

      return checkTable;
    }()
    /**
       * check a table
       * @desc the tag 'more' are handled. it means that the result would not be truncated.
       * @param {string} code - the contract
       * @param {string} tableName - name of the table
       * @param {string} scope
       * @param {string} primaryKey - the key for indexing
       * @param {number} limit
       * @param {number | string} lower_bound
       * @param {number | string} upper_bound
       * @param {number} index_position
       * @return {Promise<Array>}
       */

  }, {
    key: "checkTableMore",
    value: function () {
      var _checkTableMore = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee25(code, tableName, scope, primaryKey) {
        var limit,
            lower_bound,
            upper_bound,
            index_position,
            result,
            ret,
            from,
            to,
            abi,
            partResult,
            _args25 = arguments;
        return _regenerator.default.wrap(function _callee25$(_context25) {
          while (1) {
            switch (_context25.prev = _context25.next) {
              case 0:
                limit = _args25.length > 4 && _args25[4] !== undefined ? _args25[4] : 9999999;
                lower_bound = _args25.length > 5 && _args25[5] !== undefined ? _args25[5] : 0;
                upper_bound = _args25.length > 6 && _args25[6] !== undefined ? _args25[6] : -1;
                index_position = _args25.length > 7 && _args25[7] !== undefined ? _args25[7] : 1;
                log.verbose('search ', code, tableName, Date.now());
                _context25.next = 7;
                return this._eos.getTableRows({
                  json: true,
                  code: code,
                  scope: scope,
                  table: tableName,
                  limit: limit,
                  lower_bound: lower_bound,
                  upper_bound: upper_bound,
                  index_position: index_position
                });

              case 7:
                result = _context25.sent;
                ret = result && result.rows ? result.rows : [];
                log.verbose("part size ".concat(ret.length, "."));

                if (!(result.more && (limit <= 0 || result.rows && result.rows.length < limit))) {
                  _context25.next = 24;
                  break;
                }

                // deal with 'more'
                from = ret[0][primaryKey];
                to = ret[ret.length - 1][primaryKey];

                if (!(!from || !to)) {
                  _context25.next = 19;
                  break;
                }

                _context25.next = 16;
                return this.getAbi(code);

              case 16:
                abi = _context25.sent;
                log.error("searching more error with primary key : ".concat(primaryKey, ". please check\nlast data: ").concat(ret[ret.length - 1], " \nabi ").concat(JSON.stringify(abi)));
                throw new Error("check more error with primary key : ".concat(primaryKey));

              case 19:
                log.info("'more' detected: start searching results from ".concat(to, "."));
                _context25.next = 22;
                return this.checkTableMore(code, tableName, scope, primaryKey, limit - ret.length + 1, to, upper_bound, index_position);

              case 22:
                partResult = _context25.sent;
                return _context25.abrupt("return", ret.concat(partResult.splice(1)));

              case 24:
                return _context25.abrupt("return", ret);

              case 25:
              case "end":
                return _context25.stop();
            }
          }
        }, _callee25, this);
      }));

      function checkTableMore(_x40, _x41, _x42, _x43) {
        return _checkTableMore.apply(this, arguments);
      }

      return checkTableMore;
    }()
    /**
       * check range in table
       * @desc the tag 'more' are handled. it means that the result would not be truncated.
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
      _regenerator.default.mark(function _callee26(code, tableName, scope, from) {
        var length,
            index_position,
            rows,
            _args26 = arguments;
        return _regenerator.default.wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                length = _args26.length > 4 && _args26[4] !== undefined ? _args26[4] : 1;
                index_position = _args26.length > 5 && _args26[5] !== undefined ? _args26[5] : 1;

                if (!(length < 0)) {
                  _context26.next = 4;
                  break;
                }

                throw new Error("range error: length(".concat(length, ") must larger than 0 "));

              case 4:
                _context26.next = 6;
                return this.checkTable(code, tableName, scope, length, from, typeof from === 'number' ? from + length : new _bignumber.BigNumber(_eosjs.default.modules.format.encodeName(from, false)).plus(length).toString(), index_position);

              case 6:
                rows = _context26.sent;
                return _context26.abrupt("return", rows);

              case 8:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26, this);
      }));

      function checkTableRange(_x44, _x45, _x46, _x47) {
        return _checkTableRange.apply(this, arguments);
      }

      return checkTableRange;
    }()
    /**
       * check a item in a table
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
      _regenerator.default.mark(function _callee27(code, tableName, scope) {
        var key,
            rows,
            _args27 = arguments;
        return _regenerator.default.wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                key = _args27.length > 3 && _args27[3] !== undefined ? _args27[3] : 0;
                _context27.next = 3;
                return this.checkTableRange(code, tableName, scope, key, 1);

              case 3:
                rows = _context27.sent;
                return _context27.abrupt("return", rows[0]);

              case 5:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27, this);
      }));

      function checkTableItem(_x48, _x49, _x50) {
        return _checkTableItem.apply(this, arguments);
      }

      return checkTableItem;
    }()
    /**
       * update auth
       * @param account
       * @param permission
       * @param parent
       * @param threshold
       * @param keys
       * @param accounts
       * @param waits
       * @returns {Promise<*>}
       */

  }, {
    key: "updateAuth",
    value: function () {
      var _updateAuth = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee28(account, permission, parent, threshold, keys, accounts, waits) {
        return _regenerator.default.wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                _context28.next = 2;
                return this._eos.updateauth({
                  account: account,
                  permission: permission,
                  parent: parent,
                  'auth': {
                    threshold: threshold,
                    keys: keys,
                    accounts: accounts,
                    waits: waits
                  }
                });

              case 2:
                return _context28.abrupt("return", _context28.sent);

              case 3:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28, this);
      }));

      function updateAuth(_x51, _x52, _x53, _x54, _x55, _x56, _x57) {
        return _updateAuth.apply(this, arguments);
      }

      return updateAuth;
    }()
  }], [{
    key: "getTableByScope",
    value: function () {
      var _getTableByScope = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee29(host, code, table, lower_bound, upper_bound) {
        var limit,
            url,
            params,
            ret,
            rep,
            _args29 = arguments;
        return _regenerator.default.wrap(function _callee29$(_context29) {
          while (1) {
            switch (_context29.prev = _context29.next) {
              case 0:
                limit = _args29.length > 5 && _args29[5] !== undefined ? _args29[5] : 1000;
                url = "".concat(host, "/v1/chain/get_table_by_scope");
                params = {
                  'code': code,
                  'table': table,
                  'lower_bound': lower_bound,
                  'upper_bound': upper_bound,
                  'limit': limit // 表示每次获取6条记录

                };

              case 3:
                if (!true) {
                  _context29.next = 15;
                  break;
                }

                _context29.next = 6;
                return fetch(url, {
                  method: 'POST',
                  // or 'PUT'
                  body: JSON.stringify(params),
                  // data can be `string` or {object}!
                  headers: new Headers({
                    'Content-Type': 'application/json'
                  })
                });

              case 6:
                ret = _context29.sent;
                _context29.next = 9;
                return ret.json();

              case 9:
                rep = _context29.sent;

                if (!(rep.more === '')) {
                  _context29.next = 12;
                  break;
                }

                return _context29.abrupt("return", rep.rows);

              case 12:
                limit += 1000;
                _context29.next = 3;
                break;

              case 15:
              case "end":
                return _context29.stop();
            }
          }
        }, _callee29, this);
      }));

      function getTableByScope(_x58, _x59, _x60, _x61, _x62) {
        return _getTableByScope.apply(this, arguments);
      }

      return getTableByScope;
    }()
  }, {
    key: "help",
    get: function get() {
      return "\n### Chain API\n\n```js\n{Object} async getInfo() // get info of the chain connected\n{Object} async getBlock(blockNumOrId) // get specific block of the chain\n    \n\n{Contract} async getContract(code) // get contract\n{Object} async getAbi(code) // get abi of contract\n{Object} async getTableAbi(code, tableName) // get table abi of contract\n{Object} async abiJsonToBin(code, action, args) \n\n{Object} async getAccountInfo(account_name) // get account info of any user\n{string} async getPubKey(account_name, authority = \"active\") // get the first public key of an account\n{Array} async getPubKeys(account_name, authority = \"active\") // get public keys of an account\n{string} async recoverSign(signature, message) // recover sign and to the public key\n{string} async validateSign (signature, message, account, authority = 'active') // validate if signed data is signed by a account. it returns the matched public key \n\n{Number} async getActionCount(account_name) // get a account's action count\n{Number} async getActionMaxSeq(account_name) // get a account's max action seq\n{Array} async getRecentActions(account_name) // get recent actions\n{Array} async getActions(account_name, startPos = 0, offset = 0) // get all actions of an account\n{Array} async getAllActionsBatch (account_name, cbReceive, startPos = 0, count = 100, concurrent = 10) // get all actions in bulk\n\n{String} async getBalance(account_name, code = \"eosio.token\", symbolName = undefined) // get balance of specific account\n{Array.<String>} async getBalances(account_name, code = \"eosio.token\") // get all balance of specific account\n{Tx} async transfer(account, target, quantity, memo = \"\", cbError) // the format of account should be {name, authority}\n\n{Tx} async waitTx(txID, maxRound = 12, timeSpanMS = 1009) // check a transaction info, retry once per sec until success\n\n{Tx} async call(code, func, jsonData, ...authorization) // send action to a contract\n\n{Array} async getTable(code, tableName, scope, lower, upper, ...hint) // get all items in a table\n{Array} async checkTable(code, tableName, scope, limit = 10, lower_bound = 0, upper_bound = -1, index_position = 1) // check a table\n{Array} async checkTableMore(code, tableName, scope, primaryKey, limit = 9999999, lower_bound = 0, upper_bound = -1, index_position = 1)\n{Array} async checkTableRange(code, tableName, scope, from, length = 1, index_position = 1) // check range in table\n{Object} async checkTableItem(code, tableName, scope, key = 0) // check a item in a table\n\n{Object} async updateAuth(account, permission, parent, threshold, keys, accounts, waits) // update auth\n```   \n";
    }
  }]);
  return ChainHelper;
}();

exports.default = ChainHelper;