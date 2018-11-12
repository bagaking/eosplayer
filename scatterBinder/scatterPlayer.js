const Eos = require('eosjs');

const DB = require('../src/utils/db');
const Player = require('../src/player')

const EVENT_NAMES = {
    ERR_GET_SCATTER_FAILED: "ERR_GET_SCATTER_FAILED",
    ERR_GET_IDENTITY_FAILED: "ERR_GET_IDENTITY_FAILED",
}

class ScatterPlayer extends Player {
    constructor(netConf) {
        super();
        this.events.enableEvents(EVENT_NAMES);

        this._networks = netConf;
        this._db = new DB({
            network_name: 'dev',
            lang: 'ch',
        });

        console.log(`eosplayer created: \n${this.netName} \n${JSON.stringify(this.netConf)}`)
    }

    get storage() {
        return this._db;
    }

    /**
     * switch to an network with name
     * @param key
     */
    switchNetwork(key) {
        if (key in this._networks) {
            this.storage.set("network_name", key);
            this._eosClient = null;
            console.log(`network changed to ${this.netName}.`)
        } else {
            console.log(`network ${key} cannot find.`)
        }
    }

    /**
     * add net config to table at runtime
     * @param netName
     * @param conf
     */
    setNetConf(netName, conf) {
        this._networks[netName] = conf;
    }

    /**
     * get network name in use
     */
    get netName() {
        return this.storage.get("network_name");
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
            let err = new Error('scatter cannot found');
            this.events.emitEvent(EVENT_NAMES.ERR_GET_SCATTER_FAILED, err);
            throw err;
        }
        return scatter;
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
            this.events.emitEvent(EVENT_NAMES.ERR_GET_IDENTITY_FAILED, err);
            throw err;
        });
        ;
        this._db.set("latest_chain_id", this.netConf.chainId);
        return this.scatter.identity.accounts.find(acc => acc.blockchain === 'eos');
    }

    get help() {
        return super.help + `
  
## Usage of eosplayer (for broswer)
  
### Events

ERR_GET_SCATTER_FAILED  
ERR_GET_IDENTITY_FAILED  

### APIs

{void} eosplayer.switchNetwork(val) // switch network
{void} eosplayer.setNetConf(network_name, conf) // add a network config at runtime    

get {Scatter} eosplayer.scatter // get scatter instance

get {string} eosplayer.netName // get current network name
get {string} eosplayer.netConf // get current network config
        
async {Identity} eosplayer.login() // let user allow you using identity
async {void} eosplayer.logout() // return back the identity

## Imported libs

window.eosjs = Eos; /** the eosjs lib @see {@url https://www.npmjs.com/package/eosjs} */
window.env = env; /** {isPc} */
window.idb = idb; /** idb lib for browser storage @see {@url https://www.npmjs.com/package/idb } */
window.eosplayer = new ScatterPlayer(networks);
        
`
    }
}

module.exports = ScatterPlayer;