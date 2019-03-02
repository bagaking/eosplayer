'use strict'

/**
 * Mykey plugins help to sign and validate signature
 */
export class MykeyPlugins {
  /**
   * initiate with the chain helper
   * @param {ChainHelper} chain
   */
  constructor (chain, config = {mgrcontract: "mykeymanager"}) {
    this._chain = chain
    this._config = config
  }

  async getSignKey(account) {
    let mykey_signkey_table = "keydata" 
    let mykey_signkey_index = 3
    let keydata = await this._chain.getTable(this._config.mgrcontract, mykey_signkey_table, account, mykey_signkey_index, mykey_signkey_index + 1);
    if(!keydata) return "";

    return keydata[0].key.pubkey;
  }

  get signkeyPlugin () {
    let mgr_active_perm = `${this._config.mgrcontract}@active`
    let plugin = {
      [mgr_active_perm] : async (account) => {
        return await this.getSignKey(account)
      }
    }

    return plugin;
  }

  get validateSignPlugin () {
    let mgr_active_perm = `${this._config.mgrcontract}@active`
    let plugin = {
      [mgr_active_perm] : async (account, recoverKey) => {
        let pubkey = await this.getSignKey(account)
        return pubkey === recoverKey
      }
    }
    return plugin;
  } 
}