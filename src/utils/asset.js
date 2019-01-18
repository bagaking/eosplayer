'use strict'

/**
 * Asset - asset type of eos
 * @author kinghand@foxmail.com
 */
class Asset {
  constructor (val, sym, decimal = 4) {
    this._val = val
    this._sym = sym
    this._decimal = decimal
  }

  /**
     * get value
     * @return {*}
     */
  get val () {
    return this._val
  }

  /**
     * get symbol
     * @return {*}
     */
  get sym () {
    return this._sym
  }

  /**
     * get decimal
     * @return {number|*}
     */
  get decimal () {
    return this._decimal
  }

  /**
     * Get String val without symbol
     * @return {string | *}
     */
  get valStr () {
    return this._val.toFixed(this.decimal)
  }

  /**
     * Get string val with symbol, such as '1.0000 EOS'
     * @return {string}
     */
  toString () {
    return `${this.valStr} ${this.sym}`
  }

  /**
     * create a asset by asset string
     * @param {string} str
     * @return {Asset}
     */
  static parse (str) {
    if (!str || typeof str !== 'string') return null

    str = str.trim()
    let blankPos = str.indexOf(' ')
    if (blankPos < 0) return null

    let strVal = str.slice(0, blankPos)
    let strSym = str.slice(1 + blankPos)
    if (!strVal || !strSym) return null
    let decimalPos = str.indexOf('.')
    let decimal = decimalPos < 0 ? 0 : blankPos - decimalPos - 1
    let val = parseFloat(strVal)

    return new Asset(val, strSym, decimal)
  }
}

module.exports = Asset
