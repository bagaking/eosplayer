'using strict'

/**
 * Storage
 */
export default class DB {
  /**
     * the storage lib interact with localStorage now
     * @param defaultValues - define what will you get when you require an key not exist
     */
  constructor (defaultValues) {
    this._defualts = defaultValues
  }

  /**
     * get val by key
     * @param key - will be assembled to eosplayer::${key}
     * @return {*}
     */
  get (key) {
    let pkey = `eosplayer::${key}`
    let item = localStorage.getItem(pkey)
    if (item) {
      return item
    }
    if (key in this._defualts) {
      let val = this._defualts[key]
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
  set (key, val) {
    let pkey = `eosplayer::${key}`
    localStorage.setItem(pkey, val)
  }
}
