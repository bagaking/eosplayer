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

var _asset = _interopRequireDefault(require("../utils/asset"));

var ResHelper =
/*#__PURE__*/
function () {
  function ResHelper(chain, code, symStr) {
    var admin = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
      name: null,
      authority: null
    };
    (0, _classCallCheck2.default)(this, ResHelper);
    this._chain = chain;
    this._code = code;
    this._symStr = symStr;
    this._admin = admin;
  }

  (0, _createClass2.default)(ResHelper, [{
    key: "resContract",
    value: function () {
      var _resContract = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        var _cont;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._chain.getContract(this._code);

              case 2:
                _cont = _context.sent;
                return _context.abrupt("return", _cont);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function resContract() {
        return _resContract.apply(this, arguments);
      }

      return resContract;
    }()
    /**
       * check res of an user
       * @param userAccount - account of the user
       * @return {Promise<Asset>} - returns null if it's not exist.
       */

  }, {
    key: "checkBalance",
    value: function () {
      var _checkBalance = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(userAccount) {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.t0 = _asset.default;
                _context2.next = 3;
                return this._chain.checkTableItem(this._code, 'res.accounts', userAccount, this._symStr);

              case 3:
                _context2.t1 = _context2.sent;
                return _context2.abrupt("return", _context2.t0.parse.call(_context2.t0, _context2.t1));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function checkBalance(_x) {
        return _checkBalance.apply(this, arguments);
      }

      return checkBalance;
    }()
    /**
       * check res's info
       * @return {Promise<Asset>} - returns null if it's not exist.
       */

  }, {
    key: "checkInfo",
    value: function () {
      var _checkInfo = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3() {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.t0 = _asset.default;
                _context3.next = 3;
                return this._chain.checkTableItem(this._code, 'res.info', this._code, this._symStr);

              case 3:
                _context3.t1 = _context3.sent;
                return _context3.abrupt("return", _context3.t0.parse.call(_context3.t0, _context3.t1));

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function checkInfo() {
        return _checkInfo.apply(this, arguments);
      }

      return checkInfo;
    }()
  }, {
    key: "issue",
    value: function () {
      var _issue = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4(user, quantity, memo) {
        var contract;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.resContract();

              case 2:
                contract = _context4.sent;
                _context4.next = 5;
                return contract.resissue({
                  user: user,
                  quantity: quantity,
                  memo: memo
                });

              case 5:
                return _context4.abrupt("return", _context4.sent);

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function issue(_x2, _x3, _x4) {
        return _issue.apply(this, arguments);
      }

      return issue;
    }()
  }, {
    key: "burn",
    value: function () {
      var _burn = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee5(user, quantity, memo) {
        var contract;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.resContract();

              case 2:
                contract = _context5.sent;
                _context5.next = 5;
                return contract.resburn({
                  user: user,
                  quantity: quantity,
                  memo: memo
                });

              case 5:
                return _context5.abrupt("return", _context5.sent);

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function burn(_x5, _x6, _x7) {
        return _burn.apply(this, arguments);
      }

      return burn;
    }()
  }, {
    key: "take",
    value: function () {
      var _take = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee6(from, to, quantity, memo) {
        var contract;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.resContract();

              case 2:
                contract = _context6.sent;
                _context6.next = 5;
                return contract.restake({
                  from: from,
                  to: to,
                  quantity: quantity,
                  memo: memo
                });

              case 5:
                return _context6.abrupt("return", _context6.sent);

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function take(_x8, _x9, _x10, _x11) {
        return _take.apply(this, arguments);
      }

      return take;
    }()
  }, {
    key: "change",
    value: function () {
      var _change = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee7(user, from, to, memo) {
        var contract;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.resContract();

              case 2:
                contract = _context7.sent;
                _context7.next = 5;
                return contract.change({
                  user: user,
                  from: from,
                  to: to,
                  memo: memo
                });

              case 5:
                return _context7.abrupt("return", _context7.sent);

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function change(_x12, _x13, _x14, _x15) {
        return _change.apply(this, arguments);
      }

      return change;
    }()
  }, {
    key: "admin",
    get: function get() {
      if (!this._admin || !this._admin.name || !this._admin.authority) return null;
      return this._admin;
    }
  }]);
  return ResHelper;
}();

exports.default = ResHelper;