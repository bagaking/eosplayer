const Eos = require('eosjs');
const idb = require('idb');

const Player = require('./player')
const {networks} = require('./conf')

class env {

    static isPc() {
        return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? false : true;
    }
}

/**
 * @see {@url https://www.npmjs.com/package/eosjs}
 * @type {Eos}
 */
window.eosjs = Eos;

/**
 * env of browser
 * @type {isPc}
 */
window.env = env;

/**
 * @see {@url https://www.npmjs.com/package/idb }
 * @type {{DB: DB; Transaction: Transaction; ObjectStore: ObjectStore; UpgradeDB: UpgradeDB; Index: Index; IDBStatic: IDBStatic; HasCursor: HasCursor; Cursor: Cursor; default}}
 */
window.idb = idb;

/**
 * the eos player
 * @type {Player}
 */
window.eosplayer = new Player(networks);
