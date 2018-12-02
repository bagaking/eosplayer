'use strict'

/**
 * kh helper, supported kh contract operations
 * @author kinghand@foxmail.com
 */
class KhHelper {

    /**
     * initiate with the chain helper
     * @param {ChainHelper} chain
     */
    constructor(chain) {
        this._chain = chain;
    }

    /**
     * call kh contract with transfer (match eoskit)
     * @param {Object} account - {name, authority}
     * @param {string} target - eos account, can be user or contract
     * @param {string} quantity - eos asset format, e.p. "1.0000 EOS"
     * @param {string} func - function name
     * @param {Array} args - arguments of the transcal
     * @param {Function} cbError - memo
     * @return {Promise<Object>} transactionData
     */
    async transcal(account, target, quantity, func, args, cbError) {
        return await this._chain.transfer(account, target, quantity, `@[${func}:${args.join(',')}]`, cbError);
    }




}