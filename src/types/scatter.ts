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

    forgetIdentity: (...args: any[]) => any;

    getArbitrarySignature: (...args: any[]) => any;

    getIdentity: (...args: any[]) => any;

    requireVersion: (...args: any[]) => any;

    suggestNetwork: (...args: any[]) => any;

    useIdentity: (...args: any[]) => any;

    eos: (...args: any[]) => any;

    eth: (...args: any[]) => any;

    identity?: { accounts: IIdentity[] };

}
