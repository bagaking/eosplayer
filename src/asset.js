const _ = require('lodash');

class Asset {
    constructor(val, decimal, sym) {
        this._val = val;
        this._sym = sym;
        this._decimal = decimal;
    }

    get val() {
        return this._val;
    }

    get sym() {
        return this._sym;
    }

    get decimal() {
        return this._decimal;
    }

    toString() {
        return `${this.val.toFixed(this.decimal)} ${this.sym}`
    }

    /**
     * create a asset by asset string
     * @param {string} str
     * @return {Asset}
     */
    static parse(str) {
        str = str.trim()
        if (_.isEmpty(str)) return null;
        let blankPos = str.indexOf(' ');
        if (blankPos < 0) return null;

        let strVal = str.slice(0, blankPos)
        let strSym = str.slice(1 + blankPos)
        if (_.isEmpty(strVal) || _.isEmpty(strSym)) return null;
        let decimalPos = str.indexOf('.');
        let decimal = decimalPos < 0 ? 0 : blankPos - decimalPos - 1;
        let val = parseFloat(strVal.slice(0, blankPos)).toFixed(decimal);

        return new Asset(val, strSym, decimal);
    }
}

module.exports = Asset