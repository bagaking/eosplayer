const idb = require('idb');
const Eos = require('eosjs');
const {BigNumber} = require('bignumber.js');

const netConf = require('./conf');
const ScatterPlayer = require('./scatterPlayer');

/**
 * env of browser
 * @type {isPc}
 */
window.env = class env {
    static get isPc() {
        return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? false : true;
    }
};

/**
 * eosjs
 * @see {@url https://www.npmjs.com/package/eosjs}
 * @type {Eos}
 */
window.eosjs = Eos;

/**
 * big number
 * @see {@url https://www.npmjs.com/package/bignumber.js}
 * @type {BigNumber}
 */
window.BigNumber = BigNumber;

/**
 * index data base
 * @see {@url https://www.npmjs.com/package/idb }
 */
window.idb = idb;

/**
 * the eos player
 * @type {Player}
 */
window.eosplayer = new ScatterPlayer(netConf);