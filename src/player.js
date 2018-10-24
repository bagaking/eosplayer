const Chance = require('chance');
const Eos = require('eosjs');
const _ = require('lodash');

const DB = require('./db');
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

class Player {

    constructor(netConf, cbScatterfailed) {
        this._networks = netConf;
        this._cbScatterFailed = cbScatterfailed || alert;
        this._db = new DB({
            network_name: 'mainnet',
            lang: 'ch',
            seed: new Chance().word({length: 10}),
        });
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
            this._cbScatterFailed(errInfo);
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
        await this.scatter.getIdentity({
            accounts: [this.netConf],
        }).catch((err) => {
            console.error(err);
            alert('cannot get identity');
        });
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
        if (_.isEmpty(account_name)) {
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
    async getBalance(code = "eosio.token", account_name = undefined) {
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
    async getBalanceAsset(code = "eosio.token", account_name = undefined) {
        let strAsset = await this.getBalance(code, account_name);
        return Asset.parse(strAsset)
    }

    async transcal(code, quantity, func, ...args) {
        const account = await this.getIdentity()
        const transOptions = {authorization: [`${account.name}@${account.authority}`]}
        let trx = await this.eosClient.transfer(account.name, code, quantity, `@[${func}:${args.join(',')}]`, transOptions).catch(console.error);
        console.log(`Transaction ID: ${trx.transaction_id}`);
    }

    async call(code, func, data) {
        const account = await this.getIdentity();
        this.scatter.transaction({
            actions: [
                {
                    account: code,
                    name: func,
                    authorization: [{
                        actor: account.name,
                        permission: account.authority
                    }],
                    data: data
                }
            ]
        })
    }

    get help() {
        let helpInfo =`
# Usage

get {string} help // get and print help info of usage 

get {string} window.eosplayer.netName // get current network name
get {string} window.eosplayer.netConf // get current network config

get {Scatter} window.eosplayer.scatter // get scatter instance
get {Eos} window.eosplayer.eosClient // get eos instance

async {Identity} window.eosplayer.getIdentity() // get identity
async {Identity} window.eosplayer.login() // let user allow you using identity
async {void} window.eosplayer.logout() // return back the identity

async {AccountInfo} window.eosplayer.getAccountInfo(account_name = identity.name) // get account info for any user

async {string} getBalance(code = "eosio.token", account_name = undefined) // get balance string of a account. ex. "1.0000 EOS"
async {string} getBalanceAsset(code = "eosio.token", account_name = undefined) // get balance structure of a account. ex. {val:1, sym:"EOS", decimal:4}

async transcal(code, quantity, func, ...args) // send a action of transcal to contract
async call(code, quantity, func, ...args) // send a action to contract
            `;
        console.log(helpInfo);
        return helpInfo;
    }

}

module.exports = Player


