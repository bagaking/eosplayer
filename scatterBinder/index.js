const idb = require('idb');
const Eos = require('eosjs');
const Ecc = require('eosjs-ecc')
const {BigNumber} = require('bignumber.js');

const netConf = require('./conf');
const {
    Player,
    ScatterPlayer
} = require('./scatterPlayer');
const SignPlayer = require('../src/signPlayer');

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
 * eosjs_ecc
 * @see {@url https://www.npmjs.com/package/eosjs-ecc}
 * @type {Ecc}
 */
window.eosjs_ecc = Ecc;

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
if (!window.kh) {
    window.kh = {}
}
window.kh.eos = {
    Player,
    ScatterPlayer,
    SignPlayer
};