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
import {IIdentity} from './eos';

export interface IScatter {

    authenticate: Promise<any>;

    forgetIdentity: () => any;

    getArbitrarySignature: () => any;

    getIdentity: () => any;

    requireVersion: () => any;

    suggestNetwork: () => any;

    useIdentity: () => any;

    eos: () => any;

    eth: () => any;

    identity?: { accounts: IIdentity[] };

}
