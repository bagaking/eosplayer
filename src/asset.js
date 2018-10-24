const _ = require('lodash');

class Asset {
    constructor(val, sym, decimal = 4) {
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

    get valStr() {
        return this._val.toFixed(this.decimal);
    }

    toString() {
        return `${this.valStr} ${this.sym}`
    }

    /**
     * create a asset by asset string
     * @param {string} str
     * @return {Asset}
     */
    static parse(str) {
        if (_.isEmpty(str)) return null;

        str = str.trim()
        let blankPos = str.indexOf(' ');
        if (blankPos < 0) return null;

        let strVal = str.slice(0, blankPos)
        let strSym = str.slice(1 + blankPos)
        if (_.isEmpty(strVal) || _.isEmpty(strSym)) return null;
        let decimalPos = str.indexOf('.');
        let decimal = decimalPos < 0 ? 0 : blankPos - decimalPos - 1;
        let val = parseFloat(strVal.slice(0, blankPos))

        return new Asset(val, strSym, decimal);
    }
}

module.exports = Asset