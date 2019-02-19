'use strict'

import Eos from 'eosjs'
import {IEosClient, IIdentity} from "../types/eos";

const symEosClient = Symbol('sym::EosClient')
const symGetIdentity = Symbol('sym::GetIdentity')

/**
 * EOSProvider - defined the MUST interfaces of a player
 * @author kinghand@foxmail.com
 */
export default class EOSProvider {

  private field : any = {}

  /**
     * get or create scatter
     * @return {eosAPI}
     */
  get eosClient () : IEosClient {
    if (this.field[symEosClient]) {
      return this.field[symEosClient]
    } else {
      throw new Error(`method not yet implemented: this interface should be implement by the specific class.`)
    }
  }

  /**
     * getIdentity of cur scatter user
     * @return {Promise<{IIdentity}>}
     */
  async getIdentity () : Promise<IIdentity> {
    if (this.field[symGetIdentity]) {
      return this.field[symGetIdentity]
    } else {
      throw new Error(`method not yet implemented: this interface should be implement by the specific class.`)
    }
    // it should be like that : '{ name: "nameofuser", authority: "active" }'
  }

  /**
     * get auth structure from identity
     * @return {Object} - { authorization : [ 'name@authority' ] }
     */
  async getAuth () {
    let identity = await this.getIdentity()
    return {
      authorization: [`${identity.name}@${identity.authority}`]
    }
  }

  initFromConf (conf: any, account: IIdentity) {
    if (conf) {
      let eos = Eos(conf)
        this.field[symEosClient] = () => eos
    }
    if (account) {
        this.field[symGetIdentity] = account
    }
  }
}
