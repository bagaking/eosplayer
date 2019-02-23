'use strict';

import Asset from '../model/asset';
import TranscalPayload from '../model/transcalPayload';
import {IIdentity} from '../types/eos';
import ChainHelper from './chain';
import ResHelper from './khRes';

/**
 * kh helper, supported kh contract operations
 * @author kinghand@foxmail.com
 */
export default class KhHelper {
    /**
     * initiate with the chain helper
     * @param {ChainHelper} _chain
     */
    constructor(public readonly _chain: ChainHelper) {
    }

    /**
     * call kh contract with transfer (match eoskit)
     * @param {IIdentity} account - {name, authority}
     * @param {string} target - eos account, can be user or contract
     * @param {string} quantity - eos asset format, e.p. "1.0000 EOS"
     * @param {string} func - function name
     * @param {Array} args - arguments of the transcal
     * @param {Function} cbError - memo
     * @return {Promise<*>} transactionData
     */
    public async transcal(account: IIdentity, target: string, quantity: string, func: string, args: any[], cbError: (err: any) => any): Promise<any> {
        return await this._chain.transfer(
            account,
            target,
            quantity,
            `@[${func}:${args.join(',')}]`,
            cbError);
    }

    /**
     * transcal with "0.0001 EOS" token
     * @param {IIdentity} account - {name, authority}
     * @param {string} target - eos account, can be user or contract
     * @param {string} symbolStr
     * @param {string} func
     * @param {Array} args - arguments of the transcal
     * @param {Function} cbError - memo
     * @return {Promise<*>}
     */
    public async transend(account: IIdentity, target: string, symbolStr: string, func: string, args: any[], cbError: (err: any) => any) {
        return await this.transcal(
            account,
            target,
            `0.0001 ${symbolStr}`,
            func,
            args,
            cbError);
    }

    /**
     * get res helper of (code, sym)
     * @example kh.res('thecontract', 'WOD')
     * @param code - the contract's account
     * @param symStr - symbol of resource
     */
    public res(code: string, symStr: string) {
        return new ResHelper(this._chain, code, symStr);
    }

    /**
     * check res of an user
     * @deprecated - using res(code, symStr).checkBalance(userAccount) instead
     * @param code - contract name
     * @param account_name - account of the user
     * @param symbolStr - symbol string like "EOS"
     * @return {Promise<Asset>} - returns null if it's not exist.
     */
    public async checkResOf(code: string, account_name: string, symbolStr: string): Promise<Asset> {
        return await this.res(code, symbolStr).checkAsset(account_name);
    }

    /**
     * check res of an user
     * @deprecated - using res(code, symStr).checkInfo() instead
     * @param code - contract name
     * @param symbolStr - symbol string like "EOS"
     * @return {Promise<Asset>} - returns null if it's not exist.
     */
    public async checkResInfo(code: string, symbolStr: string) {
        return await this.res(code, symbolStr).checkInfo();
    }

    /**
     * parse transcal payload to data structure
     * @param memo
     * @return {TranscalPayload}
     */
    public parseTranscalPayload(memo: string) {
        return TranscalPayload.parse(memo);
    }

    /**
     * assemble transcal data structure to payload
     * @param func
     * @param args
     * @return {string}
     */
    public assembleTranscalPayload(func: string, ...args: string[]) {
        return (new TranscalPayload(func, ...args)).memo();
    }
}
