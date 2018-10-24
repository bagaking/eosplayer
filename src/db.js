const idb = require('idb')

class DB {
    constructor(defualts) {
        this._defualts = defualts;
    }

    get(key) {
        key = `eosplayer::${key}`;
        let item = localStorage.getItem(key)
        if(!!item){
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
        key = `eosplayer::${key}`;
        localStorage.setItem(key, val);
    }
}

module.exports = DB