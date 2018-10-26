class EventHandler {

    constructor(supportedEvents) {
        this._supportedEvents = (!supportedEvents) ? [] : (Array.isArray(supportedEvents) ? supportedEvents : Object.keys(supportedEvents)) ;
        this._eventMap = {}
        this._defaultCb = function(v){ alert(`${JSON.stringify(this)} : ${JSON.stringify(v)}`); }
    }

    setEvent(event, fnCallback, context) {
        if (!this._supportedEvents.find(name => name === event)) {
            throw new Error(`event handler : event ${event} are not supported.`);
        }
        this._eventMap[event] = {cb: fnCallback, ctx: context}
    }

    emitEvent(event, ...args) {
        if (!this._supportedEvents.find(name => name === event)) {
            throw new Error(`event handler : event ${event} are not found.`);
        }

        let e = this._eventMap[event];
        return e ? e.cb.call(e.ctx, ...args) : this._defaultCb.call(event, ...args);
    }

    async emitEventAsync(event, ...args) {
        return await emitEvent(event, ...args);
    }
}

module.exports = EventHandler;