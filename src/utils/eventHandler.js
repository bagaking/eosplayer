'use strict'

/**
 * Event Handler
 * @desc
 * - only enabled event can be emitted
 * - If the callback of an event is not set, alert will be called by default on the browser, and Error will be triggered in nodejs
 * @author kinghand@foxmail.com
 */
class EventHandler {

    constructor(supportedEvents) {
        this._eventMap = {};
        this._defaultCb = function (v) {
            let strTrigger = `${JSON.stringify(this)} : ${JSON.stringify(v)}`;
            if(!!alert) {
                alert(strTrigger);
            }else{
                throw new Error(strTrigger);
            }
        }

        if (!!supportedEvents) {
            this.enableEvents(supportedEvents);
            this._eventMap = Array.isArray(supportedEvents) ? {} : supportedEvents;
        }
    }

    /**
     * enable event names
     * @param {Array | Object} supportedEvents - keys will be used when it's an object
     */
    enableEvents(supportedEvents) {
        let newEventKeys = Array.isArray(supportedEvents) ? supportedEvents : Object.keys(supportedEvents);
        this._supportedEvents = (this._supportedEvents || []).concat(newEventKeys);
    }

    /**
     * set callback of an event name
     * @param {string} event - event name
     * @param {Function} fnCallback - if there is already a callback, then the new one will cover the previous one.
     * @param {any} instance - the instance of the callback.
     */
    setEvent(event, fnCallback, instance) {
        if (!this._supportedEvents.find(name => name === event)) {
            throw new Error(`event handler : event ${event} are not supported.`);
        }
        this._eventMap[event] = {cb: fnCallback, ctx: context}
    }

    /**
     * trigger an event by name
     * @param {string} event - event name
     * @param {Array} args - arguments
     */
    emitEvent(event, ...args) {
        if (!this._supportedEvents.find(name => name === event)) {
            throw new Error(`event handler : event ${event} are not found.`);
        }

        let e = this._eventMap[event];
        return e ? e.cb.call(e.ctx, ...args) : this._defaultCb.call(event, ...args);
    }

}

module.exports = EventHandler;