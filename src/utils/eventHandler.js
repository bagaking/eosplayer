'use strict'

/**
 * Event Handler
 * @desc
 * - only enabled event can be emitted
 * - If the callback of an event is not set, alert will be called by default on the browser, and Error will be triggered in nodejs
 * @author kinghand@foxmail.com
 */
class EventHandler {
  constructor (supportedEvents) {
    this._defaultCb = function (...args) {
      args.forEach(v => {
        if (alert) {
          if (typeof v instanceof Error) {
            alert(v.message)
          } else {
            alert(v)
          }
        } else {
          if (typeof v instanceof Error) {
            throw v
          } else {
            throw new Error(v)
          }
        }
      })
    }
    this._eventMap = {}

    if (supportedEvents) {
      this.enableEvents(supportedEvents)
      this._eventMap = Array.isArray(supportedEvents) ? {} : supportedEvents
    }
  }

  /**
     * enable event names
     * @param {Array | Object} supportedEvents - keys will be used when it's an object
     */
  enableEvents (supportedEvents) {
    let newEventKeys = Array.isArray(supportedEvents) ? supportedEvents : Object.keys(supportedEvents)
    this._supportedEvents = (this._supportedEvents || []).concat(newEventKeys)
  }

  /**
     * set callback of an event name
     * @param {string} event - event name
     * @param {Function} fnCallback - if there is already a callback, then the new one will cover the previous one.
     * @param {any} instance - the instance of the callback.
     * @return {EventHandler} - for pipeline
     */
  setEvent (event, fnCallback, instance) {
    if (!this._supportedEvents.find(name => name === event)) {
      throw new Error(`event handler : event ${event} are not supported.`)
    }
    this._eventMap[event] = { cb: fnCallback, ctx: instance }
    return this
  }

  /**
     * trigger an event by name
     * @param {string} event - event name
     * @param {Array} args - arguments
     */
  emitEvent (event, ...args) {
    if (!this._supportedEvents.find(name => name === event)) {
      throw new Error(`event handler : event ${event} are not found.`)
    }

    let e = this._eventMap[event]
    return e ? e.cb.call(e.ctx, ...args) : this._defaultCb.call(event, ...args)
  }
}

module.exports = EventHandler
