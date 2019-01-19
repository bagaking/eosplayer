'use strict'

import ResHelper from './khRes'
import TranscalPayload from '../utils/transcalPayload'

/**
 * kh helper, supported kh contract operations
 * @author kinghand@foxmail.com
 */
export default class KhHelper {
  /**
     * initiate with the chain helper
     * @param {ChainHelper} chain
     */
  constructor (chain) {
    this._chain = chain
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
  async transcal (account, target, quantity, func, args, cbError) {
    return await this._chain.transfer(
      account,
      target,
      quantity,
      `@[${func}:${args.join(',')}]`,
      cbError)
  }

  /**
     * transcal with "0.0001 EOS" token
     * @param {Object.<string, string>} account - {name, authority}
     * @param {string} target - eos account, can be user or contract
     * @param {string} symbol
     * @param {string} func
     * @param {Array} args - arguments of the transcal
     * @param {Function} cbError - memo
     * @return {Promise<Object>}
     */
  async transend (account, target, symbol, func, args, cbError) {
    return await this.transcal(
      account,
      target,
      `0.0001 ${symbol}`,
      func,
      args,
      cbError)
  }

  /**
     * get res helper of (code, sym)
     * @example kh.res('thecontract', 'WOD')
     * @param code - the contract's account
     * @param symStr - symbol of resource
     */
  res (code, symStr) {
    return new ResHelper(this._chain, code, symStr)
  }

  /**
     * check res of an user
     * @deprecated - using res(code, symStr).checkBalance(userAccount) instead
     * @param code - contract name
     * @param userAccount - account of the user
     * @param symStr - symbol string like "EOS"
     * @return {Promise<Asset>} - returns null if it's not exist.
     */
  async checkResOf (code, userAccount, symStr) {
    return await this.res(code, symStr).checkBalance(userAccount)
  }

  /**
     * check res of an user
     * @deprecated - using res(code, symStr).checkInfo() instead
     * @param code - contract name
     * @param symStr - symbol string like "EOS"
     * @return {Promise<Asset>} - returns null if it's not exist.
     */
  async checkResInfo (code, symStr) {
    return await this.res(code, symStr).checkInfo()
  }

  /**
     * parse transcal payload to data structure
     * @param memo
     * @return {TranscalPayload}
     */
  parseTranscalPayload (memo) {
    return TranscalPayload.parse(memo)
  }

  /**
     * assemble transcal data structure to payload
     * @param func
     * @param args
     * @return {string}
     */
  assembleTranscalPayload (func, ...args) {
    return (new TranscalPayload(func, ...args)).memo()
  }
}
