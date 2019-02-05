"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _construct2=_interopRequireDefault(require("@babel/runtime/helpers/construct")),_regenerator=_interopRequireDefault(require("@babel/runtime/regenerator")),_asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator")),_classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck")),_createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass")),_khRes=_interopRequireDefault(require("./khRes")),_transcalPayload=_interopRequireDefault(require("../utils/transcalPayload")),KhHelper=/*#__PURE__*/function(){/**
     * initiate with the chain helper
     * @param {ChainHelper} chain
     */function a(b){(0,_classCallCheck2.default)(this,a),this._chain=b}/**
     * call kh contract with transfer (match eoskit)
     * @param {Object} account - {name, authority}
     * @param {string} target - eos account, can be user or contract
     * @param {string} quantity - eos asset format, e.p. "1.0000 EOS"
     * @param {string} func - function name
     * @param {Array} args - arguments of the transcal
     * @param {Function} cbError - memo
     * @return {Promise<Object>} transactionData
     */return(0,_createClass2.default)(a,[{key:"transcal",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b,c,d,e,f,g){return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,this._chain.transfer(b,c,d,"@[".concat(e,":").concat(f.join(","),"]"),g);case 2:return a.abrupt("return",a.sent);case 3:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * transcal with "0.0001 EOS" token
     * @param {Object.<string, string>} account - {name, authority}
     * @param {string} target - eos account, can be user or contract
     * @param {string} symbol
     * @param {string} func
     * @param {Array} args - arguments of the transcal
     * @param {Function} cbError - memo
     * @return {Promise<Object>}
     */},{key:"transend",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b,c,d,e,f,g){return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,this.transcal(b,c,"0.0001 ".concat(d),e,f,g);case 2:return a.abrupt("return",a.sent);case 3:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * get res helper of (code, sym)
     * @example kh.res('thecontract', 'WOD')
     * @param code - the contract's account
     * @param symStr - symbol of resource
     */},{key:"res",value:function c(a,b){return new _khRes.default(this._chain,a,b)}/**
     * check res of an user
     * @deprecated - using res(code, symStr).checkBalance(userAccount) instead
     * @param code - contract name
     * @param userAccount - account of the user
     * @param symStr - symbol string like "EOS"
     * @return {Promise<Asset>} - returns null if it's not exist.
     */},{key:"checkResOf",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b,c,d){return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,this.res(b,d).checkBalance(c);case 2:return a.abrupt("return",a.sent);case 3:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * check res of an user
     * @deprecated - using res(code, symStr).checkInfo() instead
     * @param code - contract name
     * @param symStr - symbol string like "EOS"
     * @return {Promise<Asset>} - returns null if it's not exist.
     */},{key:"checkResInfo",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b,c){return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,this.res(b,c).checkInfo();case 2:return a.abrupt("return",a.sent);case 3:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * parse transcal payload to data structure
     * @param memo
     * @return {TranscalPayload}
     */},{key:"parseTranscalPayload",value:function b(a){return _transcalPayload.default.parse(a)}/**
     * assemble transcal data structure to payload
     * @param func
     * @param args
     * @return {string}
     */},{key:"assembleTranscalPayload",value:function e(a){for(var b=arguments.length,c=Array(1<b?b-1:0),d=1;d<b;d++)c[d-1]=arguments[d];return(0,_construct2.default)(_transcalPayload.default,[a].concat(c)).memo()}}]),a}();exports.default=KhHelper;