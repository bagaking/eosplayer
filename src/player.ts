import Asset from './model/asset'
import {createLogger} from './utils/log'

import EventHandler from './utils/eventHandler'
import ChainHelper from './helpers/chain'
import KhHelper from './helpers/kh'
import EosProvider from './model/eosProvider'

const log = createLogger('chain');

const packageJson = require('../package.json')

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

    public get events() {
        return this._events || (this._events = new EventHandler())
    }

    public get chain() {
        return new ChainHelper(this.eosClient)
    }

    public get kh() {
        return new KhHelper(this.chain)
    }

    /**
     * get account info of any user, if the account name not given, account info of current identity will return
     * @param account_name
     * @return {Promise<{AccountInfo}>}
     */
    public async getAccountInfo(account_name?: string) {
        return await this.chain.getAccountInfo(account_name || (await this.getIdentity()).name)
    }

    /**
     * get balance of specific account
     * @param code - Account of the currency contract. The default code is "eosio.token", which is the currency code of eos
     * @param account_name - user's account name, name of cur identity by default
     * @param symbolName - the token's symbol name
     * @return {Promise<string|undefined>} asset format '1.0000 EOS'
     */
    public async getBalance(account_name?: string, code: string = 'eosio.token', symbolName?: string) {
        return this.chain.getBalance(account_name || (await this.getIdentity()).name, code, symbolName)
    }

    /**
     * get balances list of specific account
     * @param code - Account of the currency contract. The default code is "eosio.token"
     * @param account_name - user's account name, name of cur identity by default
     * @return {Promise<Array.<string>>} asset format '1.0000 EOS'
     */
    public async getBalances(account_name?: string, code: string = 'eosio.token') {
        return this.chain.getBalances(account_name || (await this.getIdentity()).name, code)
    }

    /**
     * get balance value of specific account
     * @param code - Account of the currency contract. The default code is "eosio.token", which is the currency code of eos
     * @param account_name - user's account name, name of cur identity by default
     * @return {Promise<Asset>}
     */
    public async getBalanceAsset(account_name?: string, code = 'eosio.token') {
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
    public async transfer(target: string, quantity: string, memo: string = '') {
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
    public async transcal(target: string, quantity: string, func: string, ...args: string[]) {
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
    public async call(code:string, func:string, jsonData:any) {
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
    public async newAccount(name:string, activeKey:string, ownerKey:string) {
        if (!activeKey) {
            throw new Error('newAccount : active key error ')
        }
        if (!ownerKey) {
            ownerKey = activeKey
        }
        let creator = await this.getIdentity();
        const eosClient = this.eosClient;
        if(!eosClient){
            throw new Error("eosClient is not exist")
        }
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
    public version() {
        return `${packageJson.name} # ${packageJson.version}`
    }

    /**
     *  get help info
     */
    public help() {
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

${ChainHelper.help()}`
    }
}
