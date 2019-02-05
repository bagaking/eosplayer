"use strict";/**
 * Asset - asset type of eos
 * @author kinghand@foxmail.com
 */var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck")),_createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass")),Asset=/*#__PURE__*/function(){function a(b,c){var d=2<arguments.length&&void 0!==arguments[2]?arguments[2]:4;(0,_classCallCheck2.default)(this,a),this._val=b,this._sym=c,this._decimal=d}/**
     * get value
     * @return {*}
     */return(0,_createClass2.default)(a,[{key:"toString",/**
     * Get string val with symbol, such as '1.0000 EOS'
     * @return {string}
     */value:function a(){return"".concat(this.valStr," ").concat(this.sym)}/**
     * create a asset by asset string
     * @param {string} str
     * @return {Asset}
     */},{key:"val",get:function a(){return this._val}/**
     * get symbol
     * @return {*}
     */},{key:"sym",get:function a(){return this._sym}/**
     * get decimal
     * @return {number|*}
     */},{key:"decimal",get:function a(){return this._decimal}/**
     * Get String val without symbol
     * @return {string | *}
     */},{key:"valStr",get:function a(){return this._val.toFixed(this.decimal)}}],[{key:"parse",value:function i(b){if(!b||"string"!=typeof b)return null;b=b.trim();var c=b.indexOf(" ");if(0>c)return null;var d=b.slice(0,c),e=b.slice(1+c);if(!d||!e)return null;var f=b.indexOf("."),g=0>f?0:c-f-1,h=parseFloat(d);return new a(h,e,g)}}]),a}();exports.default=Asset;