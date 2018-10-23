//const idb = require('idb')
//const _ = require('lodash')


class DB {
    constructor(defualts) {
        this._defualts = defualts;
    }

    get(key) {
        let item = localStorage.getItem(key)
        if(item !== undefined){
            return item;
        }
        if(key in this._defualts){
            let val = this._defualts[key]
            this.set(key, val);
            return val
        }
        return undefined;
    }

    set(key, val){
        localStorage.setItem(key, val);
    }
}

module.exports = DB