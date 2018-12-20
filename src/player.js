const Asset = require('./utils/asset');
const log = require('./utils/log')('chain');

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
 * @property {Object.<available,max,used>} cpu_limit
 * @property {Object.<available,max,used>} net_limit
 * @property {number} ram_quota
 * @property {number} ram_usage
 * @property {Array.<Object>}permissions
 * @property {Object.<cpu_weight,net_weight,owner,ram_bytes>} total_resources
 * @property {Object} voter_info
 */

/**
 * event names supported in player
 * @author kinghand@foxmail.com
 * @type {{ERR_TRANSCAL_FAILED: string}}
 */
const EVENT_NAMES = {
    ERR_TRANSFER_FAILED: "ERR_TRANSFER_FAILED",
    ERR_TRANSCAL_FAILED: "ERR_TRANSCAL_FAILED",
    ERR_TRANSEND_FAILED: "ERR_TRANSEND_FAILED",
}

const EventHandler = require('./utils/eventHandler')
const ChainHelper = require('./helpers/chain')
const KhHelper = require('./helpers/kh')
const EosProvider = require('./eosProvider')

/**
 * Player
 */
class Player extends EosProvider {

    constructor() {
        super();
        this.events.enableEvents(EVENT_NAMES);
    }

    get events() {
        return this._events || (this._events = new EventHandler());
    }

    get chain() {
        return new ChainHelper(this.eosClient);
    }

    get kh() {
        return new KhHelper(this.chain);
    }

    /**
     * get account info of any user, if the account name not given, account info of current identity will return
     * @param account_name
     * @return {Promise<{AccountInfo}>}
     */
    async getAccountInfo(account_name = undefined) {
        return await this.chain.getAccountInfo(account_name || (await this.getIdentity()).name);
    }

    /**
     * get balance of specific account
     * @param code - Account of the currency contract. The default code is "eosio.token", which is the currency code of eos
     * @param account_name - user's account name, name of cur identity by default
     * @param symbolName - the token's symbol name
     * @return {Promise<string|undefined>} asset format '1.0000 EOS'
     */
    async getBalance(account_name = undefined, code = "eosio.token", symbolName = undefined) {
        return this.chain.getBalance(account_name || (await this.getIdentity()).name, code, symbolName);
    }

    /**
     * get balances list of specific account
     * @param code - Account of the currency contract. The default code is "eosio.token"
     * @param account_name - user's account name, name of cur identity by default
     * @return {Promise<Array.<string>>} asset format '1.0000 EOS'
     */
    async getBalances(account_name = undefined, code = "eosio.token") {
        return this.chain.getBalances(account_name || (await this.getIdentity()).name, code);
    }

    /**
     * get balance value of specific account
     * @param code - Account of the currency contract. The default code is "eosio.token", which is the currency code of eos
     * @param account_name - user's account name, name of cur identity by default
     * @return {Promise<Asset>}
     */
    async getBalanceAsset(account_name = undefined, code = "eosio.token") {
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
    async transfer(target, quantity, memo = "") {
        return await this.chain.transfer(
            await this.getIdentity(),
            target,
            quantity,
            memo,
            err => this.events.emitEvent(EVENT_NAMES.ERR_TRANSCAL_FAILED, err)
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
    async transcal(target, quantity, func, ...args) {
        return await this.kh.transcal(
            await this.getIdentity(),
            target,
            quantity,
            func,
            args,
            err => this.events.emitEvent(EVENT_NAMES.ERR_TRANSCAL_FAILED, err));
    }

    /**
     * transcal with "0.0001 SYM" token
     * @deprecated using transend instead
     * @param {string} target - eos account, can be user or contract
     * @param {string} symbol
     * @param {string} func
     * @param {Array} args
     * @return {Promise<Object>}
     */
    async transget(target, symbol, func, ...args) {
        return await this.transend(target, symbol, func, ...args);
    }

    /**
     * transend method - transcal with "0.0001 SYM" token
     * @param {string} target - eos account, can be user or contract
     * @param {string} symbol
     * @param {string} func
     * @param {Array} args
     * @return {Promise<Object>}
     */
    async transend(target, symbol, func, ...args) {
        return await this.kh.transend(
            await this.getIdentity(),
            target,
            symbol,
            func,
            args,
            err => this.events.emitEvent(EVENT_NAMES.ERR_TRANSEND_FAILED, err));
    }

    /**
     * send action to a contract
     * @param {string} code - account of contract
     * @param {string} func - function name
     * @param {Object} jsonData - data
     * @return {Promise<*>} - transaction
     */
    async call(code, func, jsonData) {
        const account = await this.getIdentity();
        let trx = await this.chain.call(code, func, jsonData, {
            actor: account.name,
            permission: account.authority
        });
        if (!!trx) {
            log.info(`call operation dealed, txID: ${trx.transaction_id}`);
        }
        return trx;
    }

    /**
     * check a transaction info, retry once per sec until success
     * @deprecated - use eosplayer.chain.waitTx instead
     * @param {string} txID
     * @param {number} maxRound
     * @param {number} timeSpanMS
     * @return {Promise<Object>} transaction
     */
    async waitTx(txID, maxRound = 12, timeSpanMS = 1009) {
        return await this.chain.waitTx(txID, maxRound, timeSpanMS);
    }

    /**
     * check a table
     * @deprecated - use eosplayer.chain.checkTable instead
     * @param {string} code - the contract
     * @param {string} tableName - name of the table
     * @param {string} scope
     * @param {number} limit
     * @param {number} lower_bound
     * @param {number} upper_bound
     * @param {number} index_position
     * @return {Promise<Object>}
     */
    async checkTable(code, tableName, scope, limit = 10, lower_bound = 0, upper_bound = -1, index_position = 1) {
        return await this.chain.checkTable(code, tableName, scope, limit, lower_bound, upper_bound, index_position);
    }

    /**
     * check range in table
     * @deprecated - use eosplayer.chain.checkTableRange instead
     * @param {string} code - the contract
     * @param {string} tableName - name of the table
     * @param {string} scope
     * @param {number | string} from - start position or username
     * @param {number} length
     * @param {number} index_position
     * @return {Promise<Array>}
     */
    async checkTableRange(code, tableName, scope, from, length = 1, index_position = 1) {
        return await this.chain.checkTableRange(code, tableName, scope, from, length, index_position);
    }

    /**
     * check a item in a table
     * @deprecated - use eosplayer.chain.checkTableItem instead
     * @param {string} code - the contract
     * @param {string} tableName
     * @param {string} scope
     * @param {number} key
     * @param {number} index_position
     * @return {Promise<*>}
     */
    async checkTableItem(code, tableName, scope, key = 0, index_position = 1) {
        return await this.chain.checkTableItem(code, tableName, scope, key, index_position);
    }

    /**
     * create a name using the public key
     * @param name
     * @param pubKey
     * @return {Promise<void>}
     */
    async newAccount(name, pubKey) {
        let result = await this.eosClient.newaccount({
            creator: (await this.getIdentity()).name,
            name: name,
            owner: {
                threshold: 1,
                keys: [{
                    key: pubKey,
                    weight: 1
                }],
                accounts: [],
                waits: []
            },
            active: {
                threshold: 1,
                keys: [{
                    key: pubKey,
                    weight: 1
                }],
                accounts: [],
                waits: []
            }
        })
        return result;
    }


    /**
     *  get version
     */
    get version() {
        return "0.3.0";
    }

    /**
     *  get help info
     */
    get help() {
        let helpInfo = `
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
    
{Tx} async eosplayer.transget(code, symbol, func, ...args) 
    // send a action of trancal (quantity value = 0.0001) to contract

{Contract} async eosplayer.contract(code)
    // get contract object

{Tx} async eosplayer.call(code, func, jsonData)
    // send a action to contract
\`\`\`

${ChainHelper.help}`;
        return helpInfo;
    }
}

module.exports = Player;