const Chance = require('chance');
const Eos = require('eosjs');
const _ = require('lodash');

const DB = require('./db');

class player {

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
    get netName(){
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
     * @return {*}
     */
    get eosClient() {
        if (!this._eosClient) {
            this._eosClient = this.scatter.eos(this.netConf, Eos, {}, this.netConf.protocol);
        }
        return this._eosClient;
    }

    /**
     * getIdentity of cur scatter user
     * @return {Promise<{name,active,eos}>}
     */
    async getAccount() {
        await this.scatter.getIdentity({
            accounts: [this.netConf],
        }).catch((err) => {
            console.error(err);
            alert('cannot get identity');
        });
        return this.scatter.identity.accounts.find(acc => acc.blockchain === 'eos');
    }

    async forgetIdentity() {
        await this.scatter.forgetIdentity(this.netName);
    }

    async transcal(code, quantity, func, ...args) {
        const account = await this.getAccount()
        const transOptions = {authorization: [`${account.name}@${account.authority}`]}
        let trx = await this.eosClient.transfer(account.name, code, quantity, `@[${func}:${args.join(',')}]`, transOptions).catch(console.error);
        console.log(`Transaction ID: ${trx.transaction_id}`);
    }

    async call(code, func, data) {
        const account = await this.getAccount();
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

    async getBalance(code, name = undefined) {
        if (!name) {
            name = (await this.getAccount()).name;
        }
        let result = await this.eosClient.getCurrencyBalance(code, name)
        return result[0] ? parseFloat(result[0].split(' ', 1)[0]).toFixed(4) : 0;
    }
}

module.exports = player


