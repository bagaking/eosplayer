'using strict'

/**
 * Storage
 */
export default class DB {
    /**
     * the storage lib interact with localStorage now
     * @param defaultConfigs - define what will you get when you require an key not exist
     */
    constructor (public defaultConfigs : any) {
    }

    /**
     * get val by key
     * @param key - will be assembled to eosplayer::${key}
     * @return {*}
     */
    get (key : string) {
        let pKey = `eosplayer::${key}`
        let item = localStorage.getItem(pKey)
        if (item) {
            return item
        }
        if (key in this.defaultConfigs) {
            let val = this.defaultConfigs[key]
            this.set(key, val)
            return val
        }
        return undefined
    }

    /**
     * set value
     * @param key
     * @param val
     */
    set (key : string, val: any) {
        let pKey = `eosplayer::${key}`
        localStorage.setItem(pKey, val)
    }
}
