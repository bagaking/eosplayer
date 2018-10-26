const Eos = require('eosjs');

const DB = require('./db');
const Asset = require('./asset');
const EventHandler = require('./eventHandler')

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



class Player extends EventHandler{

    constructor(netConf) {
        super(["getScatterFailed", "getIdentityFailed", "transcalFailed"])
        this.on("getScatterFailed", alert);
        this.on("getIdentityFailed", alert);
        this.on("transcalFailed", alert);

        this._networks = netConf;
        this._db = new DB({
            network_name: 'mainnet',
            lang: 'ch',
        });
        console.log(`eosplayer created: \n${this.netName} \n${JSON.stringify(this.netConf)}`)
    }

    switchNetwork(val) {
        if (val in this._networks) {
            this._db.set("network_name", val);
            this._eosClient = null;
            console.log(`network changed to ${this.netName}.`)
        } else {
            console.log(`network ${val} cannot find.`)
        }
    }

    setNetConf(network_name, conf) {
        this._networks[network_name] = conf;
    }

    /**
     * get network name in use
     */
    get netName() {
        return this._db.get("network_name");
    }

    /**
     * get network config of cur netName
     */
    get netConf() {
        return this._networks[this.netName];
    }

    /**
     * try get scatter
     * @see https://get-scatter.com/docs/examples-interaction-flow
     * @return {Scatter}
     */
    get scatter() {
        let scatter = window.scatter;
        if (!scatter) {
            let errInfo = 'scatter cannot found';
            this.emit('getScatterFailed', errInfo);
            throw new Error(errInfo);
        }
        return scatter;
    }

    /**
     * get or create scatter
     * @return {eosAPI}
     */
    get eosClient() {
        if (!this._eosClient) {
            this._eosClient = this.scatter.eos(this.netConf, Eos, {}, this.netConf.protocol);
        }
        return this._eosClient;
    }

    /**
     * getIdentity of cur scatter user
     * @return {Promise<{Identity}>}
     */
    async getIdentity() {
        let originChainID = this._db.get("latest_chain_id");
        if ((!!originChainID) && this.netConf.chainId !== originChainID) {
            console.log(`a changing of chain_id detected: ${originChainID} -> ${this.netConf.chainId} `);
            await this.logout();
            console.log(`log out from ${originChainID}`);
        }
        await this.scatter.getIdentity({
            accounts: [this.netConf],
        }).catch((err) => {
            this.emit('getIdentityFailed', 'cannot get identity', err);
            throw err;
        });
        ;
        this._db.set("latest_chain_id", this.netConf.chainId);
        return this.scatter.identity.accounts.find(acc => acc.blockchain === 'eos');
    }

    /**
     * login - require account identity from scatter
     * @return {Promise<{Identity}>}
     */
    async login() {
        return await this.getIdentity();
    }

    /**
     * logout
     * @return {Promise<void>}
     */
    async logout() {
        return await this.scatter.forgetIdentity(this.netName);
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

    async transcal(target, quantity, func, ...args) {
        const account = await this.getIdentity()

        const transOptions = {authorization: [`${account.name}@${account.authority}`]}
        let trx = await this.eosClient.transfer(account.name, target, quantity, `@[${func}:${args.join(',')}]`, transOptions).catch(
            err => {
                this.emit("transcalFailed", err)
                throw err;
            }//console.error
        );
        if (!!trx) {
            console.log(`Transaction ID: ${trx.transaction_id}`);
        }
        return trx;
    }

    async transget(target, symbol, func, ...args) {
        return await this.transcal(target, `0.0001 ${symbol}`, func, ...args);
    }

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

    async checkTableRange(code, tableName, scope, from, length = 1, index_position = 1) {
        if(length < 0) {
            throw new Error(`range error: length(${length}) must larger than 0 `);
        }
        let result = await this.checkTable(code, tableName, scope, length, from, from + length, index_position);
        return result && result.rows ? result.rows : [];
    }

    async checkTableItem(code, tableName, scope, key = 0, index_position = 1) {
        let rows = await this.checkTableRange(code, tableName, scope, key, 1, index_position);
        return rows[0];
    }

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


    get version() {
        return "0.0.1beta-1";
    }

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

# eosplayer
        
## Imported libs

window.eosjs = Eos; /** the eosjs lib @see {@url https://www.npmjs.com/package/eosjs} */
window.env = env; /** {isPc} */
window.idb = idb; /** idb lib for browser storage @see {@url https://www.npmjs.com/package/idb } */
window.eosplayer = new Player(networks);
        
## Usage of eosplayer

{void} switchNetwork(val) // switch network
{void} setNetConf(network_name, conf) // add a network config to the sandbox

get {string} help // get and print help info of usage 

get {string} window.eosplayer.netName // get current network name
get {string} window.eosplayer.netConf // get current network config

get {Scatter} window.eosplayer.scatter // get scatter instance
get {Eos} window.eosplayer.eosClient // get eos instance

async {Identity} window.eosplayer.getIdentity() // get identity
async {Identity} window.eosplayer.login() // let user allow you using identity
async {void} window.eosplayer.logout() // return back the identity

async {AccountInfo} window.eosplayer.getAccountInfo(account_name = identity.name) // get account info for any user

async {string} window.eosplayer.getBalance(account_name = undefined, code = "eosio.token") // get balance string of a account. ex. "1.0000 EOS", null means that the account dosen't have any token, 
async {string} window.eosplayer.getBalanceAsset(account_name = undefined, code = "eosio.token") // get balance structure of a account. ex. {val:1, sym:"EOS", decimal:4}

async {void} transcal(code, quantity, func, ...args) // send a action of transcal to contract
async {void} call(code, quantity, func, ...args) // send a action to contract

  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =*
 == for more : {@url https://github.com/bagaking/eosplayer} ===
*= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
`;
        //console.log(helpInfo);
        return helpInfo;
    }

}

module.exports = Player


