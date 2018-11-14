'using strict'

/**
 * Storage
 */
class DB {
    constructor(defualts) {
        this._defualts = defualts;
    }

    get(key) {
        let pkey = `eosplayer::${key}`;
        let item = localStorage.getItem(pkey)
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
        let pkey = `eosplayer::${key}`;
        localStorage.setItem(pkey, val);
    }
}

module.exports = DB