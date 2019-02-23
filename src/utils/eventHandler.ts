'use strict';

interface IEvent {
    cb: (...args: any[]) => any;
    ctx: any;
}

interface IEventMap {
    [event: string]: IEvent;
}

/**
 * Event Handler
 * @desc
 * - only enabled event can be emitted
 * - If the callback of an event is not set, alert will be called by default on the browser, and Error will be triggered in nodejs
 * @author kinghand@foxmail.com
 */
export default class EventHandler {

    protected _defaultCb!: (...args: any[]) => any;
    protected _eventMap: IEventMap = {};
    protected _supportedEvents: string[] = [];

    constructor(supportedEvents?: string[] | IEventMap) {
        this._defaultCb = (...args: any[]) => {
            args.forEach(v => {
                if (v instanceof Error) {
                    throw v;
                } else {
                    throw new Error(v);
                }
            });
        };
        if (supportedEvents) {
            this.enableEvents(supportedEvents);
            this._eventMap = Array.isArray(supportedEvents) ? {} : supportedEvents;
        }
    }

    /**
     * enable event names
     * @param {Array | Object} supportedEvents - keys will be used when it's an object
     */
    public enableEvents(supportedEvents: any) {
        const newEventKeys = Array.isArray(supportedEvents) ? supportedEvents : Object.keys(supportedEvents);
        this._supportedEvents = (this._supportedEvents || []).concat(newEventKeys);
    }

    /**
     * set callback of an event name
     * @param {string} event - event name
     * @param {Function} fnCallback - if there is already a callback, then the new one will cover the previous one.
     * @param {*} instance - the instance of the callback.
     * @return {EventHandler} - for pipeline
     */
    public setEvent(event: string, fnCallback: (...args: any[]) => any, instance: any) {
        if (!this._supportedEvents.find((name: string) => name === event)) {
            throw new Error(`event handler : event ${event} are not supported.`);
        }
        this._eventMap[event] = {cb: fnCallback, ctx: instance};
        return this;
    }

    /**
     * trigger an event by name
     * @param {string} event - event name
     * @param {Array} args - arguments
     */
    public emitEvent(event: string, ...args: any[]) {
        if (!this._supportedEvents.find((name: string) => name === event)) {
            throw new Error(`event handler : event ${event} are not found.`);
        }

        const e = this._eventMap[event];
        return e ? e.cb.call(e.ctx, ...args) : this._defaultCb.call(event, ...args);
    }
}
