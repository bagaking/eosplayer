"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _toConsumableArray2=_interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray")),_regenerator=_interopRequireDefault(require("@babel/runtime/regenerator")),_asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator")),_classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck")),_createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass")),_wait=require("../utils/wait"),_bignumber=require("bignumber.js"),_log=_interopRequireDefault(require("../utils/log")),_eosjs=_interopRequireDefault(require("eosjs")),_eosjsEcc=_interopRequireDefault(require("eosjs-ecc")),log=(0,_log.default)("chain"),ChainHelper=/*#__PURE__*/function(){function a(b){(0,_classCallCheck2.default)(this,a),this._eos=b}/**
     * get info of the chain connected
     * @return {Promise<*>}
     */return(0,_createClass2.default)(a,[{key:"getInfo",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(){return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,this._eos.getInfo({});case 2:return a.abrupt("return",a.sent);case 3:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * get specific block of the chain
     * @param blockNumOrId
     * @return {Promise<*>}
     */},{key:"getBlock",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b){var c;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return c={block_num_or_id:b},a.next=3,this._eos.getBlock(c);case 3:return a.abrupt("return",a.sent);case 4:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * get contract
     * @param code
     * @return {Promise<void>}
     */},{key:"getContract",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b){return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,this._eos.contract(b);case 2:return a.abrupt("return",a.sent);case 3:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * get the abi of contract
     * @param code
     * @return {Promise<*>}
     */},{key:"getAbi",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b){return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,this._eos.getAbi(b);case 2:return a.abrupt("return",a.sent);case 3:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * get the definition of a table in specific contract abi
     * @param code
     * @param tableName
     * @return {Promise<T | undefined>}
     */},{key:"getTableAbi",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b,c){var d;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,this.getAbi(b);case 2:return d=a.sent,a.abrupt("return",d.abi.tables.find(function(a){return a.name===c}));case 4:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * abiJsonToBin
     * @param code
     * @param action
     * @param args
     * @return {Promise<string>}
     */},{key:"abiJsonToBin",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b,c,d){var e;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e={code:b,action:c,args:d},a.next=3,this._eos.abiJsonToBin(e);case 3:return a.abrupt("return",a.sent.binargs);case 4:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * get account info of any user
     * @param {string|number} account_name - string name or id
     * @return {Promise<{AccountInfo}>}
     */},{key:"getAccountInfo",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b){return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,this._eos.getAccount({account_name:b});case 2:return a.abrupt("return",a.sent);case 3:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * get first public key of an account
     * @param name - account_name
     * @param authority - default is 'active'
     * @return {Promise<*>}
     * @constructor
     */},{key:"getPubKey",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b){var c,d=arguments;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return c=1<d.length&&void 0!==d[1]?d[1]:"active",a.next=3,this.getPubKeys(b,c);case 3:return a.abrupt("return",a.sent[0].key);case 4:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * get public keys of an account
     * @param name - account_name
     * @param authority - default is 'active'
     * @return {Promise<*>}
     * @constructor
     */},{key:"getPubKeys",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b){var c,d,e,f=arguments;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return c=1<f.length&&void 0!==f[1]?f[1]:"active",a.next=3,this.getAccountInfo(b);case 3:if(d=a.sent,e=d.permissions.find(function(a){return a.perm_name==c}),e){a.next=7;break}throw new Error("cannot find the permission of ".concat(b));case 7:return a.abrupt("return",e.required_auth.keys);case 8:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * recover public key from signature
     * @param signature - signed data
     * @param message
     * @return {string|pubkey|PublicKey}
     */},{key:"recoverSign",value:function c(a,b){return _eosjsEcc.default.recover(a,b)}/**
     * validate if signed data is signed by a account
     * @param signature - signed data
     * @param message
     * @param account
     * @param authority - default is 'active'
     * @return {string|pubkey|PublicKey}
     */},{key:"validateSign",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b,c,d){var e,f,g,h,i=arguments;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e=3<i.length&&void 0!==i[3]?i[3]:"active",f=this.recoverSign(b,c),a.next=4,this.getPubKeys(d,e);case 4:return g=a.sent,h=g.find(function(a){return a.key===f}),a.abrupt("return",h?h.key:void 0);case 7:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * get a account's action count
     * @param {string|number} account_name - string name or id
     * @return {Promise<number>}
     */},{key:"getActionCount",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b){return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,this.getActionMaxSeq(b);case 2:return a.t0=a.sent,a.abrupt("return",a.t0+1);case 4:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * get a account's max seq
     * @param {string|number} account_name - string name or id
     * @return {Promise<number>} - return -1 if there is no action
     */},{key:"getActionMaxSeq",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b){var c,d;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,this.getRecentActions(b);case 2:if(c=a.sent,c&&c.actions){a.next=5;break}throw new Error("getActionCount failed: cannot find recent actions of ".concat(b,")"));case 5:return d=c.actions,a.abrupt("return",0===d.length?-1:d[d.length-1].account_action_seq);case 7:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * get recent actions
     * @param account_name
     * @return {Promise<Array>}
     */},{key:"getRecentActions",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b){return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,this._eos.getActions({account_name:b});case 2:return a.abrupt("return",a.sent);case 3:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * get actions of an account
     * @desc to avoid searching in huge amount actions, the application layer should check the getActionCount before calling thi method
     * @param {string|number} account_name - string name or id
     * @param {number} startPos - start from 0
     * @param {number} offset - when offset is 0, one object returned, offset ==(should be) count - 1
     * @return {Promise<Array>} - [startPos, ..., startPos + offset]
     */},{key:"getActions",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b){var c,d,e,f,g,h,i,j,k=arguments;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:c=1<k.length&&void 0!==k[1]?k[1]:0,d=2<k.length&&void 0!==k[2]?k[2]:0,e=c,f=c+d,g=[],log.verbose("getActions start",c,f,"current:",g.length);case 6:return h=void 0,a.prev=8,a.next=11,(0,_wait.TimeoutPromise)(1e4,this._eos.getActions({account_name:b,pos:e,offset:f-e}));case 11:h=a.sent,a.next=18;break;case 14:return a.prev=14,a.t0=a["catch"](8),log.warning(a.t0),a.abrupt("continue",6);case 18:if(h&&h.actions){a.next=20;break}throw new Error("getActions failed: cannot find actions of ".concat(b," (pos:").concat(e,", offset:").concat(d,")"));case 20:if(i=h.actions,log.verbose("getActions find",i[i.length-1]),j=0===i.length?e-1:i[i.length-1].account_action_seq,!(j<e)){a.next=25;break}return a.abrupt("break",31);case 25:if(g.push.apply(g,(0,_toConsumableArray2.default)(i)),!(j>=f)){a.next=28;break}return a.abrupt("break",31);case 28:e=j+1,a.next=6;break;case 31:return a.abrupt("return",g);case 32:case"end":return a.stop();}},a,this,[[8,14]])}));return function b(){return a.apply(this,arguments)}}()/**
     * Get all the actions in bulk
     * @param account_name
     * @param cbReceive - using this callback to receive list of actions
     * @param startPos
     * @param count
     * @param concurrent
     * @return {Promise<void>}
     */},{key:"getAllActionsBatch",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b,c){var d,e,f,g,h,j,k,l,m,n,o,p=this,q=arguments;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:d=2<q.length&&void 0!==q[2]?q[2]:0,e=3<q.length&&void 0!==q[3]?q[3]:100,f=4<q.length&&void 0!==q[4]?q[4]:10,g=e-1,h=/*#__PURE__*/function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(c){return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=1,a.next=4,p.getActions(b,c,g);case 4:return a.abrupt("return",a.sent);case 7:a.prev=7,a.t0=a["catch"](1),log.error("error : ",a.t0);case 10:a.next=0;break;case 12:case"end":return a.stop();}},a,this,[[1,7]])}));return function(){return a.apply(this,arguments)}}(),j=[],k=[],log.info("===> start search actions of ".concat(b," from ").concat(d,", concurrent : ").concat(f,", count : ").concat(e,", once : ").concat(f*e)),l=Date.now(),m=0;case 10:if(k.push(d+m*e),0!=m%f){a.next=23;break}return n=Date.now(),log.verbose("===> deal batch ".concat(m," : ").concat(k," at ").concat(l)),a.next=16,Promise.all(k.map(h));case 16:if(o=a.sent,o.find(function(a){return 0<a.length})){a.next=19;break}return a.abrupt("break",26);case 19:log.verbose("===> deal batch ".concat(m," done (").concat(Date.now()-n,")")),o.forEach(function(a){0>=a.length||(null!=c&&c(a),j.push.apply(j,(0,_toConsumableArray2.default)(a)))}),log.verbose("===> send batch ".concat(m," done (").concat(Date.now()-n,")")),k=[];case 23:m++,a.next=10;break;case 26:log.info("getAllActions : all scaned (".concat(Date.now()-l,")"));case 27:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * get balance of specific account
     * @param account_name - user's account name
     * @param code - Account of the currency contract. The default code is "eosio.token", which is the currency code of eos
     * @param symbolName - the token's symbol name
     * @return {Promise<string|undefined>} asset format '1.0000 EOS'
     */},{key:"getBalance",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b){var c,d,e,f=arguments;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return c=1<f.length&&void 0!==f[1]?f[1]:"eosio.token",d=2<f.length&&void 0!==f[2]?f[2]:void 0,a.next=4,this.getBalances(b,c);case 4:if(e=a.sent,d){a.next=10;break}return log.warning("Symbol of the token has not been specified, the first item will return. all:",e),a.abrupt("return",e[0]||null);case 10:if("string"!=typeof d){a.next=12;break}return a.abrupt("return",e.find(function(a){return a.endsWith(d)})||null);case 12:return log.error("Symbol gave but error."),a.abrupt("return",null);case 14:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * get balance of specific account
     * @param account_name - user's account name
     * @param code - Account of the currency contract. The default code is "eosio.token", which is the currency code of eos
     * @return {Promise<Array>} - list of asset, asset format is like '1.0000 EOS'
     */},{key:"getBalances",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b){var c,d=arguments;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return c=1<d.length&&void 0!==d[1]?d[1]:"eosio.token",a.next=3,this._eos.getCurrencyBalance(c,b);case 3:if(a.t0=a.sent,a.t0){a.next=6;break}a.t0=[];case 6:return a.t1=function(a){return a.trim()},a.abrupt("return",a.t0.map(a.t1));case 8:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * transfer
     * @param {Object} account - {name, authority}
     * @param {string} target - eos account, can be user or contract
     * @param {string} quantity - eos asset format, e.p. "1.0000 EOS"
     * @param {string} memo - memo
     * @param {Function} cbError - memo
     * @return {Promise<Object>} transactionData
     */},{key:"transfer",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b,c,d){var e,f,g,h,i=arguments;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e=3<i.length&&void 0!==i[3]?i[3]:"",f=4<i.length?i[4]:void 0,g={authorization:["".concat(b.name,"@").concat(b.authority)]},a.next=5,this._eos.transfer(b.name,c,d,e,g).catch(f||log.error);case 5:return h=a.sent,h&&log.info("Transfer dealed, txID: ".concat(h.transaction_id)),a.abrupt("return",h);case 8:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * check a transaction info, retry once per sec until success
     * @param {string} txID
     * @param {number} maxRound
     * @param {number} timeSpanMS
     * @return {Promise<Object>} transaction
     */},{key:"waitTx",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b){var c,d,e,f,g=this,h=arguments;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return c=1<h.length&&void 0!==h[1]?h[1]:12,d=2<h.length&&void 0!==h[2]?h[2]:1009,e=function(a){return new Promise(function(b){return setTimeout(b,a)})},f=/*#__PURE__*/function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b){var h,i,j=arguments;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return h=1<j.length&&void 0!==j[1]?j[1]:0,a.prev=1,a.next=4,g._eos.getTransaction(b);case 4:if(i=a.sent,!i){a.next=7;break}return a.abrupt("return",i);case 7:a.next=12;break;case 9:a.prev=9,a.t0=a["catch"](1),log.verbose("wait tx ".concat(b,", retry round: ").concat(h,". ").concat(a.t0.message));case 12:if(!(h>=c)){a.next=15;break}return log.error("wait tx failed, round out."),a.abrupt("return",null);case 15:return a.next=17,e(d);case 17:return a.abrupt("return",f(b,h+1));case 18:case"end":return a.stop();}},a,this,[[1,9]])}));return function(){return a.apply(this,arguments)}}(),a.next=6,f(b);case 6:return a.abrupt("return",a.sent);case 7:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * send action to a contract
     * @param {string} code - account of contract
     * @param {string} func - function name
     * @param {Object} jsonData - data
     * @param {Array.<Object>} authorization - should be an object who has keys {actor, permission}
     * @return {Promise<*>} - transaction
     */},{key:"call",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b,c,d){var e,f,g,h=arguments;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:for(e=h.length,f=Array(3<e?e-3:0),g=3;g<e;g++)f[g-3]=h[g];return a.next=3,this._eos.transaction({actions:[{account:b,name:c,authorization:f,data:d}]});case 3:return a.abrupt("return",a.sent);case 4:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
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
     */},{key:"getTable",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b,c,d,e,f){var g,h,i,j,k,l,m=this,n=arguments;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:for(g=n.length,h=Array(5<g?g-5:0),i=5;i<g;i++)h[i-5]=n[i];e=e?(0,_bignumber.BigNumber)(e):(0,_bignumber.BigNumber)(0),f=f&&-1!==f?(0,_bignumber.BigNumber)(f):(0,_bignumber.BigNumber)("18446744073709551615"),j=[],k=[],l=function(a,e){if(log.verbose("search ",Date.now(),a.toFixed(0),e.toFixed(0)),!a.gte(e)){var f=m._eos.getTableRows({json:!0,code:b,scope:d,table:c,limit:-1,lower_bound:a.toFixed(0),upper_bound:e.toFixed(0)}).then(function(b){var c=k.findIndex(function(a){return a===f});if(k.splice(c,1),!!b)if(!b.more)b.rows&&j.push.apply(j,(0,_toConsumableArray2.default)(b.rows));else{var d=e.minus(a).dividedBy(2).decimalPlaces(0).plus(a);l(a,d.minus(1)),l(d,e)}}).catch(function(a){var b=k.find(function(a){return a===f});throw k.splice(b,1),a});k.push(f)}},!h||0>=h.length?l(e,f):[].concat((0,_toConsumableArray2.default)(h.map(function(a){return(0,_bignumber.BigNumber)(a)})),[f]).reduce(function(a,b){return l(a,b),b},e);case 7:if(!(0<k.length)){a.next=12;break}return a.next=10,(0,_wait.forMs)(50);case 10:a.next=7;break;case 12:return log.verbose("done search ",Date.now(),e.toFixed(0),f.toFixed(0)),a.abrupt("return",j);case 14:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
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
     */},{key:"checkTable",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b,c,d){var e,f,g,h,i,j,k=arguments;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e=3<k.length&&void 0!==k[3]?k[3]:10,f=4<k.length&&void 0!==k[4]?k[4]:0,g=5<k.length&&void 0!==k[5]?k[5]:-1,h=6<k.length&&void 0!==k[6]?k[6]:1,log.verbose("search ",Date.now(),f,g,e),a.next=7,this._eos.getTableRows({json:!0,code:b,scope:d,table:c,limit:e,lower_bound:f,upper_bound:g,index_position:h});case 7:return i=a.sent,j=i&&i.rows?i.rows:[],i.more&&(0>=e||i.rows&&i.rows.length<e)&&log.warning("'more' detected, and this method didn't deal with the tag 'more'. if you want to get all results, using checkTableMore and provide the primary key. "),a.abrupt("return",j);case 11:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
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
     */},{key:"checkTableMore",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p=arguments;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return f=4<p.length&&void 0!==p[4]?p[4]:9999999,g=5<p.length&&void 0!==p[5]?p[5]:0,h=6<p.length&&void 0!==p[6]?p[6]:-1,i=7<p.length&&void 0!==p[7]?p[7]:1,log.verbose("search ",b,c,Date.now()),a.next=7,this._eos.getTableRows({json:!0,code:b,scope:d,table:c,limit:f,lower_bound:g,upper_bound:h,index_position:i});case 7:if(j=a.sent,k=j&&j.rows?j.rows:[],log.verbose("part size ".concat(k.length,".")),!(j.more&&(0>=f||j.rows&&j.rows.length<f))){a.next=24;break}if(l=k[0][e],m=k[k.length-1][e],l&&m){a.next=19;break}return a.next=16,this.getAbi(b);case 16:throw n=a.sent,log.error("searching more error with primary key : ".concat(e,". please check\nlast data: ").concat(k[k.length-1]," \nabi ").concat(JSON.stringify(n))),new Error("check more error with primary key : ".concat(e));case 19:return log.info("'more' detected: start searching results from ".concat(m,".")),a.next=22,this.checkTableMore(b,c,d,e,f-k.length+1,m,h,i);case 22:return o=a.sent,a.abrupt("return",k.concat(o.splice(1)));case 24:return a.abrupt("return",k);case 25:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * check range in table
     * @desc the tag 'more' are handled. it means that the result would not be truncated.
     * @param {string} code - the contract
     * @param {string} tableName - name of the table
     * @param {string} scope
     * @param {number | string} from - start position or username
     * @param {number} length
     * @param {number} index_position
     * @return {Promise<Array>}
     */},{key:"checkTableRange",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b,c,d,e){var f,g,h,i=arguments;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(f=4<i.length&&void 0!==i[4]?i[4]:1,g=5<i.length&&void 0!==i[5]?i[5]:1,!(0>f)){a.next=4;break}throw new Error("range error: length(".concat(f,") must larger than 0 "));case 4:return a.next=6,this.checkTable(b,c,d,f,e,"number"==typeof e?e+f:new _bignumber.BigNumber(_eosjs.default.modules.format.encodeName(e,!1)).plus(f).toString(),g);case 6:return h=a.sent,a.abrupt("return",h);case 8:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * check a item in a table
     * @param {string} code - the contract
     * @param {string} tableName
     * @param {string} scope
     * @param {number} key
     * @param {number} index_position
     * @return {Promise<*>}
     */},{key:"checkTableItem",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b,c,d){var e,f,g=arguments;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e=3<g.length&&void 0!==g[3]?g[3]:0,a.next=3,this.checkTableRange(b,c,d,e,1);case 3:return f=a.sent,a.abrupt("return",f[0]);case 5:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()/**
     * update auth
     * @param account
     * @param permission
     * @param parent
     * @param threshold
     * @param keys
     * @param accounts
     * @param waits
     * @returns {Promise<*>}
     */},{key:"updateAuth",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b,c,d,e,f,g,h){return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,this._eos.updateauth({account:b,permission:c,parent:d,auth:{threshold:e,keys:f,accounts:g,waits:h}});case 2:return a.abrupt("return",a.sent);case 3:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()}],[{key:"getTableByScope",value:function(){var a=(0,_asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function a(b,c,d,e,f){var g,h,i,j,k,l=arguments;return _regenerator.default.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:g=5<l.length&&void 0!==l[5]?l[5]:1e3,h="".concat(b,"/v1/chain/get_table_by_scope"),i={code:c,table:d,lower_bound:e,upper_bound:f,limit:g// 表示每次获取6条记录
};case 3:return a.next=6,fetch(h,{method:"POST",// or 'PUT'
body:JSON.stringify(i),// data can be `string` or {object}!
headers:new Headers({"Content-Type":"application/json"})});case 6:return j=a.sent,a.next=9,j.json();case 9:if(k=a.sent,""!==k.more){a.next=12;break}return a.abrupt("return",k.rows);case 12:g+=1e3,a.next=3;break;case 15:case"end":return a.stop();}},a,this)}));return function b(){return a.apply(this,arguments)}}()},{key:"help",get:function a(){return"\n### Chain API\n\n```js\n{Object} async getInfo() // get info of the chain connected\n{Object} async getBlock(blockNumOrId) // get specific block of the chain\n    \n\n{Contract} async getContract(code) // get contract\n{Object} async getAbi(code) // get abi of contract\n{Object} async getTableAbi(code, tableName) // get table abi of contract\n{Object} async abiJsonToBin(code, action, args) \n\n{Object} async getAccountInfo(account_name) // get account info of any user\n{string} async getPubKey(account_name, authority = \"active\") // get the first public key of an account\n{Array} async getPubKeys(account_name, authority = \"active\") // get public keys of an account\n{string} async recoverSign(signature, message) // recover sign and to the public key\n{string} async validateSign (signature, message, account, authority = 'active') // validate if signed data is signed by a account. it returns the matched public key \n\n{Number} async getActionCount(account_name) // get a account's action count\n{Number} async getActionMaxSeq(account_name) // get a account's max action seq\n{Array} async getRecentActions(account_name) // get recent actions\n{Array} async getActions(account_name, startPos = 0, offset = 0) // get all actions of an account\n{Array} async getAllActionsBatch (account_name, cbReceive, startPos = 0, count = 100, concurrent = 10) // get all actions in bulk\n\n{String} async getBalance(account_name, code = \"eosio.token\", symbolName = undefined) // get balance of specific account\n{Array.<String>} async getBalances(account_name, code = \"eosio.token\") // get all balance of specific account\n{Tx} async transfer(account, target, quantity, memo = \"\", cbError) // the format of account should be {name, authority}\n\n{Tx} async waitTx(txID, maxRound = 12, timeSpanMS = 1009) // check a transaction info, retry once per sec until success\n\n{Tx} async call(code, func, jsonData, ...authorization) // send action to a contract\n\n{Array} async getTable(code, tableName, scope, lower, upper, ...hint) // get all items in a table\n{Array} async checkTable(code, tableName, scope, limit = 10, lower_bound = 0, upper_bound = -1, index_position = 1) // check a table\n{Array} async checkTableMore(code, tableName, scope, primaryKey, limit = 9999999, lower_bound = 0, upper_bound = -1, index_position = 1)\n{Array} async checkTableRange(code, tableName, scope, from, length = 1, index_position = 1) // check range in table\n{Object} async checkTableItem(code, tableName, scope, key = 0) // check a item in a table\n\n{Object} async updateAuth(account, permission, parent, threshold, keys, accounts, waits) // update auth\n```   \n"}}]),a}();exports.default=ChainHelper;