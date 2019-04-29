import {Eos} from '../../types/libs';

import DB from './db';

import {Player} from '../../player';
import {forCondition, forMs} from '../../utils/wait';

import {IEosNodeConfig, IEosNodeConfigTable} from '../../configs';
import {GetSignKeyDelegate, ISignPlugin} from '../../plugins/interface';
import {IEosClient, IIdentity} from '../../types/eos';
import {IScatter} from '../../types/scatter';
import {createLogger} from '../../utils/log';


import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import { promisify } from 'util';
import { promises } from 'fs';

// Don't forget to tell ScatterJS which plugins you are using.
ScatterJS.plugins( new ScatterEOS() );

const log = createLogger('scatterPlayer');
/**
 * Event names supported in scatter player
 * @type {{ERR_GET_SCATTER_FAILED: string, ERR_GET_IDENTITY_FAILED: string}}
 */
const EVENT_NAMES = {
    ERR_GET_SCATTER_FAILED: 'ERR_GET_SCATTER_FAILED',
    ERR_GET_IDENTITY_FAILED: 'ERR_GET_IDENTITY_FAILED',
    ERR_LOGOUT_FAILED: 'ERR_LOGOUT_FAILED',
    ERR_CONF_NOT_FOUND: 'ERR_CONF_NOT_FOUND',
};

/**
 * Player on browser (need scatter)
 * @author kinghand@foxmail.com
 */
export class ScatterPlayer extends Player {

    protected identityReceiver: ((_identity: IIdentity | Error) => any)[] = [];
    public readonly storage: DB = new DB({
        network_name: 'dev',
        lang: 'ch',
    });
    protected _eosClient?: IEosClient;

    constructor(public _networks: IEosNodeConfigTable) {
        super();
        this.events.enableEvents(EVENT_NAMES);
        log.info(`eos player created: \n${this.netName} \n${JSON.stringify(this.netConf, null, 2)}`);
    }

    /**
     * switch to an network with name
     * @param key
     */
    public switchNetwork(key: string) {
        if (key in this._networks) {
            this.storage.set('network_name', key);
            this._eosClient = undefined;
            log.info(`network changed to ${this.netName} ${this.netConf}.`);
        } else {
            log.warning(`network ${key} cannot find.`);
        }
    }

    /**
     * add net config to table at runtime
     * @param netName
     * @param conf
     */
    public setNetConf(netName: string, conf: any) {
        this._networks[netName] = conf;
    }

    /**
     * get network name in use
     */
    public get netName(): string {
        return this.storage.get('network_name');
    }

    /**
     * get network config of cur netName
     */
    public get netConf(): IEosNodeConfig {
        const conf = this._networks[this.netName];
        if (!conf) {
            this.events.emitEvent(EVENT_NAMES.ERR_CONF_NOT_FOUND, new Error(`cannot find config of ${this.netName}`));
        }
        return conf;
    }
    /**
     * try get scatter
     * @see https://get-scatter.com/docs/examples-interaction-flow
     * @return {Scatter}
     */
    public get scatter(): IScatter {
        const scatter = (window as any).scatter;
        if (!scatter) {
            const err = new Error('scatter cannot found');
            this.events.emitEvent(EVENT_NAMES.ERR_GET_SCATTER_FAILED, err);
            // throw err;
        }
        return scatter;
    }

    /**
     * try get scatter async - if not find
     * @see https://get-scatter.com/docs/examples-interaction-flow
     * @return {Scatter}
     */
    public async getScatterAsync(maxTry = 100): Promise<IScatter> {
        while (!(window as any).scatter && maxTry--) {
            log.verbose('get scatter failed, retry :', maxTry);
            (window as any).scatter =await this.getPCScatter()
            await forMs(100);
        }
        if (!(window as any).scatter) {
            const err = new Error('scatter cannot found');
            this.events.emitEvent(EVENT_NAMES.ERR_GET_SCATTER_FAILED, err);
        }
        return (window as any).scatter;
        
    }
    public async getPCScatter(): Promise<IScatter>{
        return new Promise(resolve=>{
            ScatterJS.scatter.connect('CryptoThrone').then(connected => {
                if(!connected) return false;
                resolve(ScatterJS.scatter);
            })
        })
    }


    /**
     * login - require account identity from scatter
     * @return {Promise<{Identity}>}
     */
    public async login() {
        return this.getIdentity();
    }

    /**
     * logout
     * @return {Promise<void>}
     */
    public async logout() {
        try {
            const ret = await (await this.getScatterAsync()).forgetIdentity();
            log.info(`log out from ${this.storage.get('latest_chain_id')}`);
            return ret;
        } catch (err) {
            this.events.emitEvent(EVENT_NAMES.ERR_LOGOUT_FAILED, err);
        }
    }

    /**
     * get or create scatter
     * @return {eosAPI}
     */
    public get eosClient() {
        if (!this._eosClient) {
            const conf = this.netConf as any;
            console.log('this.scatter', this.scatter);
            console.log('this.scatter.eos', this.scatter.eos);
            // console.log('Eos', Eos)
            const firstColon = conf.httpEndpoint.indexOf(':');
            const nextColon = conf.httpEndpoint.indexOf(':', firstColon + 1);
            const protocol = conf.httpEndpoint.substr(0, firstColon);
            const host = nextColon < 0 ?
                conf.httpEndpoint.substr(firstColon + 3) :
                conf.httpEndpoint.substr(firstColon + 3, nextColon - firstColon - 3);
            const port = nextColon < 0 ? (protocol === 'https' ? '443' : '80') : conf.httpEndpoint.substr(nextColon + 1);

            console.log('protocol', protocol, host, port);

            conf.host = host;
            conf.port = port;
            console.log('conf', conf);
            this._eosClient = this.scatter.eos(conf, Eos, {}, protocol);
        }
        if (!this._eosClient) {
            throw new Error('cannot create _eosClient');
        }
        return this._eosClient;
    }

    /**
     * getIdentity of cur scatter user
     * @attention When there are multiple concurrent getIdentity requests, scatter will only return the first one.
     * @return {Promise<{Identity}>}
     */
    public async getIdentity() {
        const _scatter = await this.getScatterAsync();

        const originChainID = this.storage.get('latest_chain_id');
        const chainID = this.netConf.chainId;

        if ((!!originChainID) && chainID !== originChainID) {
            log.info(`a changing of chain_id detected: ${originChainID} -> ${chainID} `);
            await this.logout();
        }
        this.storage.set('latest_chain_id', chainID);

        // using message queue to del
        let identity: IIdentity | Error | any;

        function receiveInstanceOrError(_identity: IIdentity | Error) {
            identity = _identity;
        }

        this.identityReceiver.push(receiveInstanceOrError);

        if (this.identityReceiver.length <= 1) {
            _scatter.getIdentity({
                accounts: [this.netConf], // need slot 'chainid' and 'blockchain'
            }).then(() => {
                this.identityReceiver.forEach(
                    receiver => receiver(_scatter.identity ?
                        _scatter.identity.accounts.find((acc: any) => acc.blockchain === 'eos') :
                        undefined,
                    ));
                this.identityReceiver = [];
            }).catch((err: Error) => {
                this.identityReceiver.forEach(receiver => receiver(err));
                this.identityReceiver = [];
            });
        }
        await forCondition(() => !!identity); // using undefined to block operation, using null to handle error

        if (identity instanceof Error || (identity.isError)) {
            this.events.emitEvent(EVENT_NAMES.ERR_GET_IDENTITY_FAILED, identity);
            throw identity;
        }

        return identity;
    }

    /**
     * sign a message with current identity
     * @param {string} message - message to sign
     * @param {... ISignPlugin[]} signPlugins - signer map's list
     * @return {Promise<void>} - signed data
     * @constructor
     */
    public async sign(message: string, ...signPlugins: ISignPlugin[]) {
        const identity = await this.getIdentity();
        const account = identity.name;

        const {permissions} = await this.getAccountInfo(account);
        if (!permissions) {
            log.warning(`permissions of account ${account} are not found.`);
            return;
        }

        const perm = permissions.find(p => p.perm_name === identity.authority);
        log.info(`perm : ${JSON.stringify(perm)}`);
        const {accounts, keys} = perm.required_auth;

        let pubKeys: Array<{ key: string }> = keys || [];
        for (let i = 0; signPlugins && i < signPlugins.length; i++) {
            const signPlugin: ISignPlugin = signPlugins[i];
            if (!signPlugin) {
                throw new Error(`Sign Plugin Error : cannot parse the ${i}'th plugin`);
            }
            const converted: string[] = await Promise.all(accounts
                .map(acc => `${acc.permission.actor}@${acc.permission.permission}`)
                .map(accStr => signPlugin.signKeyProvider[accStr])
                .filter(_ => _)
                .map(signKeyProvider => Promise.resolve(signKeyProvider(account, this.chain))),
            );
            pubKeys = [
                ...pubKeys,
                ...converted.map(key => ({key})),
            ];
        }

        let ret = '';
        for (let i = 0; i < pubKeys.length; i++) {
            try {
                log.info(`try sign (${JSON.stringify(pubKeys[i])}) : ${message}`);
                ret = await this.scatter.getArbitrarySignature(pubKeys[i].key, message);
                break;
            } catch (ex) {
                log.warning(`try pub key failed ${pubKeys[i]}`);
            }
        }
        return ret;
    }

    public help(): string {
        return super.help() + `

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
`;
    }
}
