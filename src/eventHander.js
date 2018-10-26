class EventHandler {

    constructor(supportedEvents) {
        this._supportedEvents = supportedEvents || [];
        this._eventMap = {}
    }

    on(event, fnCallback, context) {
        if (!this._supportedEvents.find(event)) {
            throw new Error(`event handler : event ${event} are not supported.`);
        }
        this._eventMap[event] = {cb: fnCallback, ctx: context}
    }

    emit(event, ...args) {
        if (!(event in this._eventMap)) {
            throw new Error(`event handler : event ${event} are not found.`);
        }
        let e = this._eventMap[event];
        return e.cb.call(e.ctx, ...args);
    }

    async emitAsync(event, ...args) {
        if (!(event in this._eventMap)) {
            throw new Error(`event handler : event ${event} are not found.`);
        }
        let e = this._eventMap[event];
        return await e.cb.call(e.ctx, ...args);
    }
}

module.exports = EventHandler;