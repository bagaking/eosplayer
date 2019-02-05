"use strict";/**
 * Event Handler
 * @desc
 * - only enabled event can be emitted
 * - If the callback of an event is not set, alert will be called by default on the browser, and Error will be triggered in nodejs
 * @author kinghand@foxmail.com
 */var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _typeof2=_interopRequireDefault(require("@babel/runtime/helpers/typeof")),_classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck")),_createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass")),EventHandler=/*#__PURE__*/function(){function a(b){(0,_classCallCheck2.default)(this,a),this._defaultCb=function(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];b.forEach(function(a){if(alert)(0,_typeof2.default)(a)instanceof Error?alert(a.message):alert(a);else if((0,_typeof2.default)(a)instanceof Error)throw a;else throw new Error(a)})},this._eventMap={},b&&(this.enableEvents(b),this._eventMap=Array.isArray(b)?{}:b)}/**
     * enable event names
     * @param {Array | Object} supportedEvents - keys will be used when it's an object
     */return(0,_createClass2.default)(a,[{key:"enableEvents",value:function c(a){var b=Array.isArray(a)?a:Object.keys(a);this._supportedEvents=(this._supportedEvents||[]).concat(b)}/**
     * set callback of an event name
     * @param {string} event - event name
     * @param {Function} fnCallback - if there is already a callback, then the new one will cover the previous one.
     * @param {any} instance - the instance of the callback.
     * @return {EventHandler} - for pipeline
     */},{key:"setEvent",value:function d(a,b,c){if(!this._supportedEvents.find(function(b){return b===a}))throw new Error("event handler : event ".concat(a," are not supported."));return this._eventMap[a]={cb:b,ctx:c},this}/**
     * trigger an event by name
     * @param {string} event - event name
     * @param {Array} args - arguments
     */},{key:"emitEvent",value:function h(a){var b,c;if(!this._supportedEvents.find(function(b){return b===a}))throw new Error("event handler : event ".concat(a," are not found."));for(var d=this._eventMap[a],e=arguments.length,f=Array(1<e?e-1:0),g=1;g<e;g++)f[g-1]=arguments[g];return d?(b=d.cb).call.apply(b,[d.ctx].concat(f)):(c=this._defaultCb).call.apply(c,[a].concat(f))}}]),a}();exports.default=EventHandler;