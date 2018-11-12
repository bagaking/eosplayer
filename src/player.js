const Asset = require('./asset');


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
 * @property {Function<Promise>} getAccount - getAccount({account_name: [[account_name]] })
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

const EVENT_NAMES = {
    ERR_TRANSCAL_FAILED: "ERR_TRANSCAL_FAILED"
}

const EventHandler = require('./eventHandler')
const EosProvider = require('./eosProvider')

class Player extends EosProvider {

    constructor() {
        super();
        this.events.enableEvents(EVENT_NAMES);
    }

    get events() {
        return this._events || (this._events = new EventHandler());
    }

    /**
     * get account info of any user, if the account name not given, account info of current identity will return
     * @param account_name
     * @return {Promise<{AccountInfo}>}
     */
    async getAccountInfo(account_name) {
        if (!account_name || typeof account_name !== "string") {
            account_name = (await this.getIdentity()).name;
        }
        return await this.eosClient.getAccount({account_name})
    }

    /**
     * get balance of specific account
     * @param code - Account of the currency contract. The default code is "eosio.token", which is the currency code of eos
     * @param account_name - user's account name, name of cur identity by default
     * @return {Promise<string|undefined>} asset format '1.0000 EOS'
     */
    async getBalance(account_name = undefined, code = "eosio.token") {
        if (!account_name) {
            account_name = (await this.getIdentity()).name;
        }
        let result = await this.eosClient.getCurrencyBalance(code, account_name)
        return result[0] ? result[0].trim() : null;
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
        const account = await this.getIdentity()

        const transOptions = {authorization: [`${account.name}@${account.authority}`]}
        let trx = await this.eosClient.transfer(account.name, target, quantity, memo, transOptions).catch(
            err => {
                this.events.emitEvent(EVENT_NAMES.ERR_TRANSCAL_FAILED, err)
                throw err;
            }
        );
        if (!!trx) {
            console.log(`Transaction ID: ${trx.transaction_id}`);
        }
        return trx;
    }

    /**
     * call contract with transfer (match eoskit)
     * @param {string} target - eos account, can be user or contract
     * @param {string} quantity - eos asset format, e.p. "1.0000 EOS"
     * @param {string} func - function name
     * @param args
     * @return {Promise<Object>} transactionData
     */
    async transcal(target, quantity, func, ...args) {
        return await this.transfer(target, quantity, `@[${func}:${args.join(',')}]`);
    }

    /**
     * transcal with "0.0001 SYM" token
     * @param {string} target - eos account, can be user or contract
     * @param {string} symbol
     * @param {string} func
     * @param args
     * @return {Promise<*>}
     */
    async transget(target, symbol, func, ...args) {
        return await this.transcal(target, `0.0001 ${symbol}`, func, ...args);
    }

    /**
     * check a transaction info, retry once per sec until success
     * @param {string} txID
     * @param {number} maxRound
     * @param {number} timeSpanMS
     * @return {Promise<Object>} transaction
     */
    async waitTx(txID, maxRound = 12, timeSpanMS = 1009) { // Unmanaged polling uses prime as the default interval
        const waitForMs = (time) => new Promise(resolve => setTimeout(resolve, time));
        const checkTx = async (_txID, round = 0) => { // can only use lambda, cuz this is used
            try {
                const tx = await this.eosClient.getTransaction(_txID);
                if (tx) return tx;
            } catch (err) {
                console.log(`wait tx ${_txID}, retry round: ${round}. ${err.message}`);
            }
            if (round >= maxRound) {
                console.error(`wait tx failed, round out.`)
                return null;
            }
            await waitForMs(timeSpanMS);
            return checkTx(_txID, round + 1);
        }

        return await checkTx(txID);
    }

    /**
     * get contract
     * @param code
     * @return {Promise<void>}
     */
    async contract(code) {
        return await this.eosClient.contract(code)
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
        let trx = await this.eosClient.transaction({
            actions: [
                {
                    account: code,
                    name: func,
                    authorization: [{
                        actor: account.name,
                        permission: account.authority
                    }],
                    data: jsonData
                }
            ]
        })
        if (!!trx) {
            console.log(`Transaction ID: ${trx.transaction_id}`);
        }
        return trx;
    }

    /**
     * check a table
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
        let result = await this.eosClient.getTableRows({
            json: true,
            code: code,
            scope: scope,
            table: tableName,
            limit,
            lower_bound,
            upper_bound,
            index_position
        });
        // todo: deal with 'more' ?
        return result;
    }

    /**
     * check range in table
     * @param {string} code - the contract
     * @param {string} tableName - name of the table
     * @param {string} scope
     * @param {number | string} from - start position or username
     * @param {number} length
     * @param {number} index_position
     * @return {Promise<Array>}
     */
    async checkTableRange(code, tableName, scope, from, length = 1, index_position = 1) {
        if (length < 0) {
            throw new Error(`range error: length(${length}) must larger than 0 `);
        }
        let result = await this.checkTable(code, tableName, scope, length, from, (typeof from === "number") ? from + length : undefined, index_position);
        return result && result.rows ? result.rows : [];
    }

    /**
     * check a item in a table
     * @param {string} code - the contract
     * @param {string} tableName
     * @param {string} scope
     * @param {number} key
     * @param {number} index_position
     * @return {Promise<*>}
     */
    async checkTableItem(code, tableName, scope, key = 0, index_position = 1) {
        let rows = await this.checkTableRange(code, tableName, scope, key, 1, index_position);
        return rows[0];
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
        return "0.1.1";
    }

    /**
     *  get help info
     */
    get help() {
        let helpInfo = `
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

# eosplayer ${this.version}
        
## Usage of eosplayer

### Events

ERR_TRANSCAL_FAILED

### APIs

get {string} help // get help info of usage
get {string} version // get the version info

{void} eosplayer.event.setEvent(event, fnCallback, context) //listen to a event

get {Eos} eosplayer.eosClient // get eos instance
async {Identity} eosplayer.getIdentity() // get identity

async {AccountInfo} eosplayer.getAccountInfo(account_name = identity.name) 
    // get account info for any user

async {string} eosplayer.getBalance(account_name = undefined, code = "eosio.token")  
    // get balance string of a account. ex. "1.0000 EOS", null means that the account dosen't have any token,

async {string} eosplayer.getBalanceAsset(account_name = undefined, code = "eosio.token") 
    // get balance structure of a account. ex. {val:1, sym:"EOS", decimal:4}

async {tx} eosplayer.transfer(target, quantity, memo = "")
    // transfer tokens to target

async {tx} eosplayer.transcal(code, quantity, func, ...args) 
    // send a action of transcal to contract
    
async {tx} eosplayer.transget(code, symbol, func, ...args) 
    // send a action of trancal (quantity value = 0.0001) to contract

async {Contract} eosplayer.contract(code)
    // get contract object

async {tx} eosplayer.call(code, func, jsonData)
    // send a action to contract

async {tx} eosplayer.waitTx(txID, maxRound = 12, timeSpanMS = 1009); 
    // check a transaction info, retry once per sec until success

async {table} eosplayer.checkTable(code, tableName, scope, limit = 10, lower_bound = 0, upper_bound = -1, index_position = 1) 
    // check all items in a table

async {item[]} eosplayer.checkTableRange(code, tableName, scope, from, length = 1, index_position = 1)
    // check a range of items in a table
    
async {item} eosplayer.checkTableItem(code, tableName, scope, key = 0, index_position = 1)
    // check a specific item in a table 

`;
        return helpInfo;
    }

}


module.exports = Player;