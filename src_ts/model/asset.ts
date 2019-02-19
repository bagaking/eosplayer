'use strict'

/**
 * Asset - asset type of eos
 * @author kinghand@foxmail.com
 */
export default class Asset {
    constructor(protected _val: number, protected _sym: string, protected _decimal = 4) {
    }

    /**
     * get value
     * @return {*}
     */
    get val() {
        return this._val
    }

    /**
     * get symbol
     * @return {*}
     */
    get sym() {
        return this._sym
    }

    /**
     * get decimal
     * @return {number|*}
     */
    get decimal() {
        return this._decimal
    }

    /**
     * Get String val without symbol
     * @return {string | *}
     */
    get valStr() {
        return this._val.toFixed(this.decimal)
    }

    /**
     * Get string val with symbol, such as '1.0000 EOS'
     * @return {string}
     */
    toString() {
        return `${this.valStr} ${this.sym}`
    }

    /**
     * create a asset by asset string
     * @param {string} assetStr
     * @return {Asset}
     */
    static parse(assetStr: string) {
        if (!assetStr) return null

        assetStr = assetStr.trim()
        let blankPos = assetStr.indexOf(' ')
        if (blankPos < 0) return null

        let strVal = assetStr.slice(0, blankPos)
        let strSym = assetStr.slice(1 + blankPos)
        if (!strVal || !strSym) return null
        let decimalPos = assetStr.indexOf('.')
        let decimal = decimalPos < 0 ? 0 : blankPos - decimalPos - 1
        let val = parseFloat(strVal)

        return new Asset(val, strSym, decimal)
    }
}
