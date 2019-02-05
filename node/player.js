"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:!0}),exports.Player=void 0;var _regenerator=_interopRequireDefault(require("@babel/runtime/regenerator")),_asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator")),_classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck")),_createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass")),_possibleConstructorReturn2=_interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn")),_getPrototypeOf2=_interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf")),_inherits2=_interopRequireDefault(require("@babel/runtime/helpers/inherits")),_asset=_interopRequireDefault(require("./utils/asset")),_log=_interopRequireDefault(require("./utils/log")),_eventHandler=_interopRequireDefault(require("./utils/eventHandler")),_chain=_interopRequireDefault(require("./helpers/chain")),_kh=_interopRequireDefault(require("./helpers/kh")),_eosProvider=_interopRequireDefault(require("./eosProvider")),log=(0,_log.default)("chain"),EVENT_NAMES={ERR_TRANSFER_FAILED:"ERR_TRANSFER_FAILED",ERR_TRANSCAL_FAILED:"ERR_TRANSCAL_FAILED",ERR_TRANSEND_FAILED:"ERR_TRANSEND_FAILED"/**
 * Player
 */},Player=/*#__PURE__*/function(a){function b(){var a;return(0,_classCallCheck2.default)(this,b),a=(0,_possibleConstructorReturn2.default)(this,(0,_getPrototypeOf2.default)(b).call(this)),a.events.enableEvents(EVENT_NAMES),a}return(0,_inherits2.default)(b,a),(0,_createClass2.default)(b,[{key:"getAccountInfo",/**
     * get account info of any user, if the account name not given, account info of current identity will return
     * @param account_name
     * @return {Promise<{AccountInfo}>}
     */value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(){var b,c=arguments;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(b=0<c.length&&void 0!==c[0]?c[0]:void 0,a.t0=this.chain,a.t1=b,a.t1){a.next=7;break}return a.next=6,this.getIdentity();case 6:a.t1=a.sent.name;case 7:return a.t2=a.t1,a.next=10,a.t0.getAccountInfo.call(a.t0,a.t2);case 10:return a.abrupt("return",a.sent);case 11:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * get balance of specific account
     * @param code - Account of the currency contract. The default code is "eosio.token", which is the currency code of eos
     * @param account_name - user's account name, name of cur identity by default
     * @param symbolName - the token's symbol name
     * @return {Promise<string|undefined>} asset format '1.0000 EOS'
     */},{key:"getBalance",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(){var b,c,d,e=arguments;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(b=0<e.length&&void 0!==e[0]?e[0]:void 0,c=1<e.length&&void 0!==e[1]?e[1]:"eosio.token",d=2<e.length&&void 0!==e[2]?e[2]:void 0,a.t0=this.chain,a.t1=b,a.t1){a.next=9;break}return a.next=8,this.getIdentity();case 8:a.t1=a.sent.name;case 9:return a.t2=a.t1,a.t3=c,a.t4=d,a.abrupt("return",a.t0.getBalance.call(a.t0,a.t2,a.t3,a.t4));case 13:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * get balances list of specific account
     * @param code - Account of the currency contract. The default code is "eosio.token"
     * @param account_name - user's account name, name of cur identity by default
     * @return {Promise<Array.<string>>} asset format '1.0000 EOS'
     */},{key:"getBalances",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(){var b,c,d=arguments;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(b=0<d.length&&void 0!==d[0]?d[0]:void 0,c=1<d.length&&void 0!==d[1]?d[1]:"eosio.token",a.t0=this.chain,a.t1=b,a.t1){a.next=8;break}return a.next=7,this.getIdentity();case 7:a.t1=a.sent.name;case 8:return a.t2=a.t1,a.t3=c,a.abrupt("return",a.t0.getBalances.call(a.t0,a.t2,a.t3));case 11:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * get balance value of specific account
     * @param code - Account of the currency contract. The default code is "eosio.token", which is the currency code of eos
     * @param account_name - user's account name, name of cur identity by default
     * @return {Promise<Asset>}
     */},{key:"getBalanceAsset",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(){var b,c,d,e=arguments;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return b=0<e.length&&void 0!==e[0]?e[0]:void 0,c=1<e.length&&void 0!==e[1]?e[1]:"eosio.token",a.next=4,this.getBalance(b,c);case 4:return d=a.sent,a.abrupt("return",_asset.default.parse(d));case 6:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * transfer
     * @param {string} target - eos account, can be user or contract
     * @param {string} quantity - eos asset format, e.p. "1.0000 EOS"
     * @param {string} memo - memo
     * @return {Promise<Object>} transactionData
     */},{key:"transfer",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b,c){var d,e=this,f=arguments;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return d=2<f.length&&void 0!==f[2]?f[2]:"",a.t0=this.chain,a.next=4,this.getIdentity();case 4:return a.t1=a.sent,a.t2=b,a.t3=c,a.t4=d,a.t5=function(a){return e.events.emitEvent(EVENT_NAMES.ERR_TRANSCAL_FAILED,a)},a.next=11,a.t0.transfer.call(a.t0,a.t1,a.t2,a.t3,a.t4,a.t5);case 11:return a.abrupt("return",a.sent);case 12:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * call kh contract with transfer (match eoskit)
     * @param {string} target - eos account, can be user or contract
     * @param {string} quantity - eos asset format, e.p. "1.0000 EOS"
     * @param {string} func - function name
     * @param {Array} args
     * @return {Promise<Object>} transactionData
     */},{key:"transcal",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b,c,d){var e,f,g,h=this,i=arguments;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:for(e=i.length,f=Array(3<e?e-3:0),g=3;g<e;g++)f[g-3]=i[g];return a.t0=this.kh,a.next=4,this.getIdentity();case 4:return a.t1=a.sent,a.t2=b,a.t3=c,a.t4=d,a.t5=f,a.t6=function(a){return h.events.emitEvent(EVENT_NAMES.ERR_TRANSCAL_FAILED,a)},a.next=12,a.t0.transcal.call(a.t0,a.t1,a.t2,a.t3,a.t4,a.t5,a.t6);case 12:return a.abrupt("return",a.sent);case 13:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * transcal with "0.0001 SYM" token
     * @deprecated using transend instead
     * @param {string} target - eos account, can be user or contract
     * @param {string} symbol
     * @param {string} func
     * @param {Array} args
     * @return {Promise<Object>}
     */},{key:"transget",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b,c,d){var e,f,g,h=arguments;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:for(e=h.length,f=Array(3<e?e-3:0),g=3;g<e;g++)f[g-3]=h[g];return a.next=3,this.transend.apply(this,[b,c,d].concat(f));case 3:return a.abrupt("return",a.sent);case 4:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * transend method - transcal with "0.0001 SYM" token
     * @param {string} target - eos account, can be user or contract
     * @param {string} symbol
     * @param {string} func
     * @param {Array} args
     * @return {Promise<Object>}
     */},{key:"transend",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b,c,d){var e,f,g,h=this,i=arguments;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:for(e=i.length,f=Array(3<e?e-3:0),g=3;g<e;g++)f[g-3]=i[g];return a.t0=this.kh,a.next=4,this.getIdentity();case 4:return a.t1=a.sent,a.t2=b,a.t3=c,a.t4=d,a.t5=f,a.t6=function(a){return h.events.emitEvent(EVENT_NAMES.ERR_TRANSEND_FAILED,a)},a.next=12,a.t0.transend.call(a.t0,a.t1,a.t2,a.t3,a.t4,a.t5,a.t6);case 12:return a.abrupt("return",a.sent);case 13:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * send action to a contract
     * @param {string} code - account of contract
     * @param {string} func - function name
     * @param {Object} jsonData - data
     * @return {Promise<*>} - transaction
     */},{key:"call",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b,c,d){var e,f;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,this.getIdentity();case 2:return e=a.sent,a.next=5,this.chain.call(b,c,d,{actor:e.name,permission:e.authority});case 5:return f=a.sent,f&&log.info("call operation dealed, txID: ".concat(f.transaction_id)),a.abrupt("return",f);case 8:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * check a transaction info, retry once per sec until success
     * @deprecated - use eosplayer.chain.waitTx instead
     * @param {string} txID
     * @param {number} maxRound
     * @param {number} timeSpanMS
     * @return {Promise<Object>} transaction
     */},{key:"waitTx",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b){var c,d,e=arguments;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return c=1<e.length&&void 0!==e[1]?e[1]:12,d=2<e.length&&void 0!==e[2]?e[2]:1009,a.next=4,this.chain.waitTx(b,c,d);case 4:return a.abrupt("return",a.sent);case 5:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
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
     */},{key:"checkTable",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b,c,d){var e,f,g,h,i=arguments;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e=3<i.length&&void 0!==i[3]?i[3]:10,f=4<i.length&&void 0!==i[4]?i[4]:0,g=5<i.length&&void 0!==i[5]?i[5]:-1,h=6<i.length&&void 0!==i[6]?i[6]:1,a.next=6,this.chain.checkTable(b,c,d,e,f,g,h);case 6:return a.abrupt("return",a.sent);case 7:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * check range in table
     * @deprecated - use eosplayer.chain.checkTableRange instead
     * @param {string} code - the contract
     * @param {string} tableName - name of the table
     * @param {string} scope
     * @param {number | string} from - start position or username
     * @param {number} length
     * @param {number} index_position
     * @return {Promise<Array>}
     */},{key:"checkTableRange",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b,c,d,e){var f,g,h=arguments;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return f=4<h.length&&void 0!==h[4]?h[4]:1,g=5<h.length&&void 0!==h[5]?h[5]:1,a.next=4,this.chain.checkTableRange(b,c,d,e,f,g);case 4:return a.abrupt("return",a.sent);case 5:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * check a item in a table
     * @deprecated - use eosplayer.chain.checkTableItem instead
     * @param {string} code - the contract
     * @param {string} tableName
     * @param {string} scope
     * @param {number} key
     * @param {number} index_position
     * @return {Promise<*>}
     */},{key:"checkTableItem",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b,c,d){var e,f,g=arguments;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e=3<g.length&&void 0!==g[3]?g[3]:0,f=4<g.length&&void 0!==g[4]?g[4]:1,a.next=4,this.chain.checkTableItem(b,c,d,e,f);case 4:return a.abrupt("return",a.sent);case 5:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * create a account with public key
     * @param name
     * @param activeKey
     * @param ownerKey
     * @return {Promise<void>}
     */},{key:"newAccount",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b,c,d){var e,f;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(c){a.next=2;break}throw new Error("newAccount : active key error ");case 2:return d||(d=c),a.next=5,this.getIdentity();case 5:return e=a.sent,f=this.eosClient.transaction(function(a){a.newaccount({creator:e.name,name:b,owner:d,active:c}),a.buyrambytes({payer:e.name,receiver:b,bytes:8192}),a.delegatebw({from:e.name,receiver:b,stake_net_quantity:"1.0000 EOS",stake_cpu_quantity:"1.0000 EOS",transfer:0})}),a.abrupt("return",f);case 8:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     *  get version
     */},{key:"events",get:function a(){return this._events||(this._events=new _eventHandler.default)}},{key:"chain",get:function a(){return new _chain.default(this.eosClient)}},{key:"kh",get:function a(){return new _kh.default(this.chain)}},{key:"version",get:function a(){return"0.3.0"}/**
     *  get help info
     */},{key:"help",get:function b(){var a="\n```js\n      =============================================================\n        \n               -----      ------        ------      -------\n              -----     -----          ------      -------\n             -----   -----            ------      -------\n            -----  -----             ------      -------\n           ----------                ----- ---- ------ \n          -----  -----              ----- ---- ------\n         -----    -----           ------      -------\n        -----      ------        ------      -------\n       ------       -------     ------      -------\n      --------      ---------  ------      -------\n        \n===========================================================\n```\n---\n\n# eosplayer ".concat(this.version,"\n        \n## Usage of eosplayer\n\n### Events\n\n`ERR_TRANSFER_FAILED`\n`ERR_TRANSCAL_FAILED`\n`ERR_TRANSEND_FAILED`\n\n### APIs\n\n```js\n{String} get help // get help info of usage\n{String} get version // get the version info\n{ChainHelper} get chain // get the chain helper\n{KhHelper} get kh // get the kh contract helper\n\n{Void} eosplayer.event.setEvent(event, fnCallback, context) //listen to a event\n\n{Eos} get eosplayer.eosClient // get eos instance\n{Identity} async eosplayer.getIdentity() // get identity\n\n{AccountInfo} async eosplayer.getAccountInfo(account_name = identity.name) \n    // get account info for any user\n\n{String} async eosplayer.getBalance(account_name = undefined, code = \"eosio.token\", symbolName = undefined)  \n    // get balance string of a account. ex. \"1.0000 EOS\", null means that the account dosen't have any token,\n\n{Array.<String>} async getBalances(account_name = undefined, code = \"eosio.token\")\n    // get balances\n\n{String} async eosplayer.getBalanceAsset(account_name = undefined, code = \"eosio.token\") \n    // get balance structure of a account. ex. {val:1, sym:\"EOS\", decimal:4}\n\n{Tx} async eosplayer.transfer(target, quantity, memo = \"\")\n    // transfer tokens to target\n\n{Tx} async eosplayer.transcal(code, quantity, func, ...args) \n    // send a action of transcal to contract\n    \n{Tx} async eosplayer.transget(code, symbol, func, ...args) \n    // send a action of trancal (quantity value = 0.0001) to contract\n\n{Contract} async eosplayer.contract(code)\n    // get contract object\n\n{Tx} async eosplayer.call(code, func, jsonData)\n    // send a action to contract\n    \n{Tx} async eosplayer.newAccount(name, activeKey, ownerKey)\n    // create a account with public key\n```\n\n").concat(_chain.default.help);return a}}]),b}(_eosProvider.default);exports.Player=Player;