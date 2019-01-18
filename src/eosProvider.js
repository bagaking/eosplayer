'use strict'

const EOS = require('eosjs')

const symEosClient = Symbol('sym::EosClient')
const symGetIdentity = Symbol('sym::GetIdentity')

/**
 * EOSProvider - defined the MUST interfaces of a player
 * @author kinghand@foxmail.com
 */
class EOSProvider {
  /**
     * get or create scatter
     * @return {eosAPI}
     */
  get eosClient () {
    if (this[symEosClient]) {
      return symEosClient()
    } else {
      throw new Error(`method not yet implemented: this interface should be implement by the specific class.`)
    }
  }

  /**
     * getIdentity of cur scatter user
     * @return {Promise<{Identity}>}
     */
  async getIdentity () {
    if (this[symGetIdentity]) {
      return symGetIdentity()
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

  initFromConf (conf, account) {
    if (conf) {
      let eos = Eos(conf)
      this[symEosClient] = () => eos
    }
    if (account) {
      this[symGetIdentity] = account
    }
  }
}

module.exports = EOSProvider
