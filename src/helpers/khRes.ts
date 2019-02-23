'use strict';

import Asset from '../model/asset';
import ChainHelper from './chain';

export default class ResHelper {
  constructor(
      public readonly _chain: ChainHelper,
      public readonly _code: string,
      public readonly _symStr: string,
      public readonly _admin: any = { name: null, authority: null }) {
  }

  get admin() {
    if (!this._admin || !this._admin.name || !this._admin.authority) return null;
    return this._admin;
  }

  public async resContract()  {
    return await this._chain.getContract(this._code) ;
  }

  /**
   * check res of an user
   * @param account_name - account of the user
   * @return {Promise<Asset>} - returns null if it's not exist.
   */
  public async checkAsset(account_name: string): Promise<Asset> {
    return Asset.parse(await this._chain.checkTableItem(this._code, 'res.accounts', account_name, this._symStr));
  }

  /**
   * check res's info
   * @return {Promise<Asset>} - returns null if it's not exist.
   */
  public async checkInfo() {
    return Asset.parse(await this._chain.checkTableItem(this._code, 'res.info', this._code, this._symStr));
  }

  public async issue(account_name: string, quantity: string, memo: string) {
    const contract = await this.resContract();
    return await contract.resissue({ user : account_name, quantity, memo });
  }

  public async burn(account_name: string, quantity: string, memo: string) {
    const contract = await this.resContract();
    return await contract.resburn({ user : account_name, quantity, memo });
  }

  public async take(from: string, to: string, quantity: string, memo: string) {
    const contract = await this.resContract();
    return await contract.restake({ from, to, quantity, memo });
  }

  public async change(account_name: string, from: string, to: string, memo: string) {
    const contract = await this.resContract();
    return await contract.change({ user : account_name, from, to, memo });
  }
}
