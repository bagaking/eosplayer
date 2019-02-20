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
import {IIdentity} from "./eos";

export interface IScatter {

    authenticate: Promise<any>;

    forgetIdentity: Function;

    getArbitrarySignature: Function;

    getIdentity: Function;

    requireVersion: Function;

    suggestNetwork: Function;

    useIdentity: Function;

    eos: Function;

    eth: Function;

    identity?: { accounts: IIdentity[] };

}
