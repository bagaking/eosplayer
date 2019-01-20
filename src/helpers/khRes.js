'use strict'

import Asset from '../utils/asset'

export default class ResHelper {
  constructor (chain, code, symStr, admin = { name: null, authority: null }) {
    this._chain = chain
    this._code = code
    this._symStr = symStr
    this._admin = admin
  }

  get admin () {
    if (!this._admin || !this._admin.name || !this._admin.authority) return null
    return this._admin
  }

  async resContract () {
    let _cont = await this._chain.getContract(this._code)
    return _cont
  }

  /**
     * check res of an user
     * @param userAccount - account of the user
     * @return {Promise<Asset>} - returns null if it's not exist.
     */
  async checkBalance (userAccount) {
    return Asset.parse(await this._chain.checkTableItem(this._code, 'res.accounts', userAccount, this._symStr))
  }

  /**
     * check res's info
     * @return {Promise<Asset>} - returns null if it's not exist.
     */
  async checkInfo () {
    return Asset.parse(await this._chain.checkTableItem(this._code, 'res.info', this._code, this._symStr))
  }

  async issue (user, quantity, memo) {
    let contract = await this.resContract()
    return await contract.resissue({ user, quantity, memo })
  }

  async burn (user, quantity, memo) {
    let contract = await this.resContract()
    return await contract.resburn({ user, quantity, memo })
  }

  async take (from, to, quantity, memo) {
    let contract = await this.resContract()
    return await contract.restake({ from, to, quantity, memo })
  }

  async change (user, from, to, memo) {
    let contract = await this.resContract()
    return await contract.change({ user, from, to, memo })
  }
}
