import idb from 'idb'
import Eos from 'eosjs'
import Ecc from 'eosjs-ecc'
import BigNumber from 'bignumber.js'

import { eosNodeConfigs } from './src/configs'

import { ScatterPlayer } from './src/outOfBox/scatterPlayer/scatterPlayer'
import { Player, SignPlayer, ReadingPlayer } from './src'
import { MykeyPlugins } from './src/plugins'
console.log('eosNodeConfigs', eosNodeConfigs)

/**
 * env of browser
 * @type {isPc}
 */
window.env = class env {
  static get isPc () {
    return !/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
  }
}

/**
 * eosjs
 * @see {@url https://www.npmjs.com/package/eosjs}
 * @type {Eos}
 */
window.eosjs = Eos

/**
 * eosjs_ecc
 * @see {@url https://www.npmjs.com/package/eosjs-ecc}
 * @type {Ecc}
 */
window.eosjs_ecc = Ecc

/**
 * big number
 * @see {@url https://www.npmjs.com/package/bignumber.js}
 * @type {BigNumber}
 */
window.BigNumber = BigNumber

/**
 * index data base
 * @see {@url https://www.npmjs.com/package/idb }
 */
window.idb = idb

/**
 * the eos player
 * @type {Player}
 */
window.eosplayer = new ScatterPlayer(eosNodeConfigs)
if (!window.kh) {
  window.kh = {}
}

window.eosplayer.plugins = {
  mykey: new MykeyPlugins(window.eosplayer.chain)
}

window.kh.eos = {
  Player,
  ScatterPlayer,
  SignPlayer,
  ReadingPlayer
}
