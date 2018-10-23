const Chance = require('chance');
const Eos = require('eosjs');
const DB = require('./db');
const {network} = require('./conf')


class env {

}

class player {

    constructor(netConf) {
        this._netConf = netConf;
        this._db = new DB({
            network_name: 'mainnet',
            lang: 'ch',
            seed: new Chance().word({length: 10}),
        });
    }

    get netConf() {
        this._netConf[this._db.get("network_name")]
    }

    /**
     * @see https://get-scatter.com/docs/examples-interaction-flow
     */
    get scatter() {
        let scatter = window.scatter;
        if (!scatter) {
            alert('scatter cannot found');
            throw new Error("scatter cannot found");
        }
        return scatter;
    }

    get eosClient() {
        if (!this._eosClient) {
            this._eosClient = this.scatter.eos(this.netConf, Eos, {}, this.netConf.protocol);
        }
        return this._eosClient;
    }


    async getAccount() { //todo:
        await this.scatter.getIdentity({
            accounts: [this.netConf],
        }).catch((err) => {
            console.error(err);
            alert('cannot get identity');
        });
        return this.scatter.identity.accounts.find(acc => acc.blockchain === 'eos');
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

}

window.eosenv = env;
window.eosplayer = new player(network)