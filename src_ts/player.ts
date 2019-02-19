import Asset from './model/asset'
import {createLogger} from './utils/log'

import EventHandler from './utils/eventHandler'
import ChainHelper from './helpers/chain'
import KhHelper from './helpers/kh'
import EosProvider from './model/eosProvider'

const log = createLogger('chain');
/**
 * @interface eosAPI
 * @property {Function} abiBinToJson
 * @property {Function} abiJsonToBin
 * @property {Function} bidname
 * @property {Function} buyram
 * @property {Function} buyrambytes
 * @property {Function} canceldelay
 * @property {Function} claimrewards
 * @property {Function} contract
 * @property {Function} create
 * @property {Function} createTransaction
 * @property {Function} delegatebw
 * @property {Function} deleteauth
 * @property {Function} getAbi
 * @property {Function} getAccount - getAccount({account_name: [[account_name]] })
 * @property {Function} getActions
 * @property {Function} getBlock
 * @property {Function} getBlockHeaderState
 * @property {Function} getCode
 * @property {Function} getCodeHash
 * @property {Function} getControlledAccounts
 * @property {Function} getCurrencyBalance
 * @property {Function} getCurrencyStats
 * @property {Function} getInfo
 * @property {Function} getKeyAccounts
 * @property {Function} getProducerSchedule
 * @property {Function} getProducers
 * @property {Function} getRawCodeAndAbi
 * @property {Function} getRequiredKeys
 * @property {Function} getScheduledTransactions
 * @property {Function} getTableRows
 * @property {Function} getTransaction
 * @property {Function} issue
 * @property {Function} linkauth
 * @property {Function} newaccount
 * @property {Function} nonce
 * @property {Function} onerror
 * @property {Function} pushBlock
 * @property {Function} pushTransaction
 * @property {Function} pushTransactions
 * @property {Function} refund
 * @property {Function} regproducer
 * @property {Function} regproxy
 * @property {Function} reqauth
 * @property {Function} rmvproducer
 * @property {Function} sellram
 * @property {Function} setabi
 * @property {Function} setalimits
 * @property {Function} setcode
 * @property {Function} setglimits
 * @property {Function} setparams
 * @property {Function} setpriv
 * @property {Function} setprods
 * @property {Function} setram
 * @property {Function} transaction
 * @property {Function} transfer
 * @property {Function} undelegatebw
 * @property {Function} unlinkauth
 * @property {Function} unregprod
 * @property {Function} updateauth
 * @property {Function} voteproducer
 */

/**
 * @interface Scatter
 * @property {Promise} authenticate
 * @property {Function} forgetIdentity - authenticate()
 * @property {Function} getArbitrarySignature - getArbitrarySignature(e,t,r="",n=!1)
 * @property {Function} getIdentity - getIdentity(e={}){return E(i.e,{network:m,fields:e}).then(async e=> {…}
 * @property {Function} requireVersion - ƒ requireVersion(e)
 * @property {Function} suggestNetwork - ƒ suggestNetwork(e)
 * @property {Function} useIdentity
 * @property {Function} eos - create eosApi object : f eos({blockchain, host, port, chainID}, Eos, option={}, protocol="http")
 * @property {Function} eth - ummmmm ...
 */

/**
 * @interface Identity
 * @property {string} name
 * @property {string} authority - default: active
 * @property {string} blockchain - default: eos
 */

/**
 * @interface AccountInfo
 * @property {string} account_name
 * @property {string} core_liquid_balance - asset format, which is a string like '1.0000 EOS'
 * @property {Object} cpu_limit - {available,max,used}
 * @property {Object} net_limit - {available,max,used}
 * @property {number} ram_quota
 * @property {number} ram_usage
 * @property {Array.<Object>}permissions
 * @property {Object} total_resources {cpu_weight,net_weight,owner,ram_bytes}
 * @property {Object} voter_info
 */

/**
 * event names supported in player
 * @author kinghand@foxmail.com
 * @type {{ERR_TRANSCAL_FAILED: string}}
 */
const EVENT_NAMES = {
    ERR_TRANSFER_FAILED: 'ERR_TRANSFER_FAILED',
    ERR_TRANSCAL_FAILED: 'ERR_TRANSCAL_FAILED',
    ERR_TRANSEND_FAILED: 'ERR_TRANSEND_FAILED'
}

/**
 * Player
 */
export class Player extends EosProvider {

    protected _events: EventHandler = new EventHandler();

    constructor() {
        super();
        this.events.enableEvents(EVENT_NAMES)

    }

    get events() {
        return this._events || (this._events = new EventHandler())
    }

    get chain() {
        return new ChainHelper(this.eosClient)
    }

    get kh() {
        return new KhHelper(this.chain)
    }

    /**
     * get account info of any user, if the account name not given, account info of current identity will return
     * @param account_name
     * @return {Promise<{AccountInfo}>}
     */
    async getAccountInfo(account_name?: string) {
        return await this.chain.getAccountInfo(account_name || (await this.getIdentity()).name)
    }

    /**
     * get balance of specific account
     * @param code - Account of the currency contract. The default code is "eosio.token", which is the currency code of eos
     * @param account_name - user's account name, name of cur identity by default
     * @param symbolName - the token's symbol name
     * @return {Promise<string|undefined>} asset format '1.0000 EOS'
     */
    async getBalance(account_name?: string, code: string = 'eosio.token', symbolName?: string) {
        return this.chain.getBalance(account_name || (await this.getIdentity()).name, code, symbolName)
    }

    /**
     * get balances list of specific account
     * @param code - Account of the currency contract. The default code is "eosio.token"
     * @param account_name - user's account name, name of cur identity by default
     * @return {Promise<Array.<string>>} asset format '1.0000 EOS'
     */
    async getBalances(account_name?: string, code: string = 'eosio.token') {
        return this.chain.getBalances(account_name || (await this.getIdentity()).name, code)
    }

    /**
     * get balance value of specific account
     * @param code - Account of the currency contract. The default code is "eosio.token", which is the currency code of eos
     * @param account_name - user's account name, name of cur identity by default
     * @return {Promise<Asset>}
     */
    async getBalanceAsset(account_name?: string, code = 'eosio.token') {
        let strAsset = await this.getBalance(account_name, code);
        return Asset.parse(strAsset)
    }

    /**
     * transfer
     * @param {string} target - eos account, can be user or contract
     * @param {string} quantity - eos asset format, e.p. "1.0000 EOS"
     * @param {string} memo - memo
     * @return {Promise<Object>} transactionData
     */
    async transfer(target: string, quantity: string, memo: string = '') {
        return await this.chain.transfer(
            await this.getIdentity(),
            target,
            quantity,
            memo,
            (err: Error) => this.events.emitEvent(EVENT_NAMES.ERR_TRANSCAL_FAILED, err)
        )
    }

    /**
     * call kh contract with transfer (match eoskit)
     * @param {string} target - eos account, can be user or contract
     * @param {string} quantity - eos asset format, e.p. "1.0000 EOS"
     * @param {string} func - function name
     * @param {Array} args
     * @return {Promise<Object>} transactionData
     */
    async transcal(target: string, quantity: string, func: string, ...args: string[]) {
        return await this.kh.transcal(
            await this.getIdentity(),
            target,
            quantity,
            func,
            args,
            (err: Error) => this.events.emitEvent(EVENT_NAMES.ERR_TRANSCAL_FAILED, err))
    }

    /**
     * send action to a contract
     * @param {string} code - account of contract
     * @param {string} func - function name
     * @param {*} jsonData - data
     * @return {Promise<*>} - transaction
     */
    async call(code:string, func:string, jsonData:any) {
        const account = await this.getIdentity();
        let trx = await this.chain.call(code, func, jsonData, {
            actor: account.name,
            permission: account.authority
        })
        if (trx) {
            log.info(`call operation dealed, txID: ${trx.transaction_id}`)
        }
        return trx
    }

    /**
     * create a account with public key
     * @param name
     * @param activeKey
     * @param ownerKey
     * @return {Promise<void>}
     */
    async newAccount(name:string, activeKey:string, ownerKey:string) {
        if (!activeKey) {
            throw new Error('newAccount : active key error ')
        }
        if (!ownerKey) {
            ownerKey = activeKey
        }
        let creator = await this.getIdentity();
        return await this.eosClient.transaction((tr : any) => {
            tr.newaccount({
                creator: creator.name,
                name: name,
                owner: ownerKey,
                active: activeKey
            })

            tr.buyrambytes({
                payer: creator.name,
                receiver: name,
                bytes: 8192
            })

            tr.delegatebw({
                from: creator.name,
                receiver: name,
                stake_net_quantity: '1.0000 EOS',
                stake_cpu_quantity: '1.0000 EOS',
                transfer: 0
            })
        })
    }

    /**
     *  get version
     */
    get version() {
        return '0.3.0'
    }

    /**
     *  get help info
     */
    get help() {
        return `
\`\`\`js
      =============================================================
        
               -----      ------        ------      -------
              -----     -----          ------      -------
             -----   -----            ------      -------
            -----  -----             ------      -------
           ----------                ----- ---- ------ 
          -----  -----              ----- ---- ------
         -----    -----           ------      -------
        -----      ------        ------      -------
       ------       -------     ------      -------
      --------      ---------  ------      -------
        
===========================================================
\`\`\`
---

# eosplayer ${this.version}
        
## Usage of eosplayer

### Events

\`ERR_TRANSFER_FAILED\`
\`ERR_TRANSCAL_FAILED\`
\`ERR_TRANSEND_FAILED\`

### APIs

\`\`\`js
{String} get help // get help info of usage
{String} get version // get the version info
{ChainHelper} get chain // get the chain helper
{KhHelper} get kh // get the kh contract helper

{Void} eosplayer.event.setEvent(event, fnCallback, context) //listen to a event

{Eos} get eosplayer.eosClient // get eos instance
{Identity} async eosplayer.getIdentity() // get identity

{AccountInfo} async eosplayer.getAccountInfo(account_name = identity.name) 
    // get account info for any user

{String} async eosplayer.getBalance(account_name = undefined, code = "eosio.token", symbolName = undefined)  
    // get balance string of a account. ex. "1.0000 EOS", null means that the account dosen't have any token,

{Array.<String>} async getBalances(account_name = undefined, code = "eosio.token")
    // get balances

{String} async eosplayer.getBalanceAsset(account_name = undefined, code = "eosio.token") 
    // get balance structure of a account. ex. {val:1, sym:"EOS", decimal:4}

{Tx} async eosplayer.transfer(target, quantity, memo = "")
    // transfer tokens to target

{Tx} async eosplayer.transcal(code, quantity, func, ...args) 
    // send a action of transcal to contract

{Tx} async eosplayer.call(code, func, jsonData)
    // send a action to contract
    
{Tx} async eosplayer.newAccount(name, activeKey, ownerKey)
    // create a account with public key
\`\`\`

${ChainHelper.help}`
    }
}
