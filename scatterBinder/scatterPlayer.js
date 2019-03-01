import Eos from 'eosjs'

import DB from './db'

import { Player } from '../src/player'
import { forMs, forCondition } from '../src/utils/wait'
import { MykeyPlugins } from '../src/helpers/mykeyPlugins'

import Log_ from '../src/utils/log'
const log = Log_('scatterPlayer')

/**
 * Event names supported in scatter player
 * @type {{ERR_GET_SCATTER_FAILED: string, ERR_GET_IDENTITY_FAILED: string}}
 */
const EVENT_NAMES = {
  ERR_GET_SCATTER_FAILED: 'ERR_GET_SCATTER_FAILED',
  ERR_GET_IDENTITY_FAILED: 'ERR_GET_IDENTITY_FAILED',
  ERR_LOGOUT_FAILED: 'ERR_LOGOUT_FAILED',
  ERR_CONF_NOT_FOUND: 'ERR_CONF_NOT_FOUND'
}

/**
 * Player on browser (need scatter)
 * @author kinghand@foxmail.com
 */
export default class ScatterPlayer extends Player {
  constructor (netConf) {
    super()
    this.events.enableEvents(EVENT_NAMES)

    this._networks = netConf
    this._db = new DB({
      network_name: 'dev',
      lang: 'ch'
    })

    log.info(`eosplayer created: \n${this.netName} \n${JSON.stringify(this.netConf)}`)

    this.identityReceiver = []
  }

  /**
     * storage of scatter player
     * @return {DB}
     */
  get storage () {
    return this._db
  }

  /**
     * switch to an network with name
     * @param key
     */
  switchNetwork (key) {
    if (key in this._networks) {
      this.storage.set('network_name', key)
      this._eosClient = null
      log.info(`network changed to ${this.netName}.`)
    } else {
      log.warning(`network ${key} cannot find.`)
    }
  }

  /**
     * add net config to table at runtime
     * @param netName
     * @param conf
     */
  setNetConf (netName, conf) {
    this._networks[netName] = conf
  }

  /**
     * get network name in use
     */
  get netName () {
    return this.storage.get('network_name')
  }

  /**
     * get network config of cur netName
     */
  get netConf () {
    let conf = this._networks[this.netName]
    if (!conf) {
      this.events.emitEvent(EVENT_NAMES.ERR_CONF_NOT_FOUND, new Error(`cannot find config of ${this.netName}`))
    }
    return conf
  }

  /**
     * try get scatter
     * @see https://get-scatter.com/docs/examples-interaction-flow
     * @return {Scatter}
     */
  get scatter () {
    let scatter = window.scatter
    if (!scatter) {
      let err = new Error('scatter cannot found')
      this.events.emitEvent(EVENT_NAMES.ERR_GET_SCATTER_FAILED, err)
      // throw err;
    }
    return scatter
  }

  /**
     * get Mykey plugins for sign and verify signature
     */
  get mykeyPlugins () {
    return new MykeyPlugins(this.chain)
  }


  /**
     * try get scatter async - if not find
     * @see https://get-scatter.com/docs/examples-interaction-flow
     * @return {Scatter}
     */
  async getScatterAsync (maxTry = 100) {
    while (!window.scatter && maxTry--) {
      log.verbose('get scatter failed, retry :', maxTry)
      await forMs(100)
    }
    if (!window.scatter) {
      let err = new Error('scatter cannot found')
      this.events.emitEvent(EVENT_NAMES.ERR_GET_SCATTER_FAILED, err)
    }
    return window.scatter
  }

  /**
     * login - require account identity from scatter
     * @return {Promise<{Identity}>}
     */
  async login () {
    return await this.getIdentity()
  }

  /**
     * logout
     * @return {Promise<void>}
     */
  async logout () {
    try {
      let ret = await (await this.getScatterAsync()).forgetIdentity()
      log.info(`log out from ${this.storage.get('latest_chain_id')}`)
      return ret
    } catch (err) {
      this.events.emitEvent(EVENT_NAMES.ERR_LOGOUT_FAILED, err)
    }
  }

  /**
     * get or create scatter
     * @return {eosAPI}
     */
  get eosClient () {
    if (!this._eosClient) {
      this._eosClient = this.scatter.eos(this.netConf, Eos, {}, this.netConf.protocol)
    }
    return this._eosClient
  }

  /**
     * getIdentity of cur scatter user
     * @attention When there are multiple concurrent getIdentity requests, scatter will only return the first one.
     * @return {Promise<{Identity}>}
     */
  async getIdentity () {
    let scatter_ = await this.getScatterAsync()

    let originChainID = this.storage.get('latest_chain_id')
    let chainID = this.netConf.chainId

    if ((!!originChainID) && chainID !== originChainID) {
      log.info(`a changing of chain_id detected: ${originChainID} -> ${chainID} `)
      await this.logout()
    }
    this.storage.set('latest_chain_id', chainID)

    // using message queue to del
    let identity
    const receiveInstanceOrError = idty => identity = idty
    this.identityReceiver.push(receiveInstanceOrError)

    if (this.identityReceiver.length <= 1) {
      scatter_.getIdentity({
        accounts: [this.netConf] // need slot 'chainid' and 'blockchain'
      }).then(() => {
        this.identityReceiver.forEach(receiver => receiver(scatter_.identity.accounts.find(acc => acc.blockchain === 'eos')))
        this.identityReceiver = []
      }).catch(err => {
        this.identityReceiver.forEach(receiver => receiver(err))
        this.identityReceiver = []
      })
    }
    await forCondition(() => !!identity) // using undefined to block operation, using null to handle error

    if (identity instanceof Error || (identity.isError)) {
      this.events.emitEvent(EVENT_NAMES.ERR_GET_IDENTITY_FAILED, identity)
      throw identity
    }

    return identity
  }

  /**
     * sign a message with current identity
     * @param message
     * @param {Object.<string,function>} plugins - plugin should be object
     * @return {Promise<void>} - signed data
     * @constructor
     */
  async sign (message, signPlugins) {
    let identity = await this.getIdentity()
    let account = identity.name

    const { permissions } = await this.getAccountInfo(account)
    if (!permissions) {
      log.warning(`permissions of account ${account} are not found.`)
      return
    }

    const perm = permissions.find(p => p.perm_name === identity.authority)
    log.info(`perm : ${JSON.stringify(perm)}`)
    const { accounts, keys } = perm.required_auth

    let pubkeys = keys
    if(pubkeys.length == 0 && signPlugins) {
      const accountsStrs = accounts.map(acc => `${acc.permission.actor}@${acc.permission.permission}`)
      log.verbose('try sign', accounts, accountsStrs, signPlugins)
      for (let i in accountsStrs) {
        const plugin = signPlugins[accountsStrs[i]]
        if (!plugin) {
          continue
        }
        let signKey = await Promise.resolve(plugin(account))
        pubkeys.push({key: signKey})
      }
    }

    let ret = ''
    for (let i = 0; i < pubkeys.length; i++) {
      try {
        log.info(`try sign (${JSON.stringify(pubkeys[i])}) : ${message}`)
        ret = await this.scatter.getArbitrarySignature(pubkeys[i].key, message)
        break
      } catch (ex) {
        log.warning(`try pub key failed ${pubkeys[i]}`)
      }
    }
    return ret
  }

  get help () {
    return super.help + `
  
## Usage of eosplayer (for broswer)
  
### Events

ERR_GET_SCATTER_FAILED  
ERR_GET_IDENTITY_FAILED  
ERR_LOGOUT_FAILED  

### APIs

\`\`\`js
{void} eosplayer.switchNetwork(val) // switch network
{void} eosplayer.setNetConf(network_name, conf) // add a network config at runtime    

get {Scatter} eosplayer.scatter // get scatter instance
get {Scatter} async getScatterAsync(maxTry = 100) // get scatter instance

get {string} eosplayer.netName // get current network name
get {string} eosplayer.netConf // get current network config
        
async {Identity} eosplayer.login() // let user allow you using identity
async {void} eosplayer.logout() // return back the identity

async {string} sign(message) // sign a message with current identity
\`\`\`

## Imported libs

\`\`\`js
window.eosjs = Eos; /** the eosjs lib @see {@url https://www.npmjs.com/package/eosjs} */  
window.env = env; /** {isPc} */  
window.idb = idb; /** idb lib for browser storage @see {@url https://www.npmjs.com/package/idb } */ 
window.BigNumber = BigNumber; /** big number @see {@url https://www.npmjs.com/package/bignumber.js} */

window.kh.eos.Player
window.kh.eos.ScatterPlayer
window.eosplayer = new ScatterPlayer(networks);  
\`\`\`        
`
  }
}
