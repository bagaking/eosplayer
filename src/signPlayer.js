import { Player } from './player'
import Eos from 'eosjs'

const defaultConfig = {
  account: {
    name: 'eosio',
    authority: 'active'
  },
  node: {
    keyProvider: ['5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79sample'],
    chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
    httpEndpoint: 'http://dev.toneos.pro:7777',
    mockTransactions: () => null,
    expireInSeconds: 60,
    broadcast: true,
    debug: false,
    sign: true,
    authorization: null // 该参数用于在多签名情况下，识别签名帐号与权限,格式如：account@permission
  }
}

export class SignPlayer extends Player {
  constructor (nodeConfig = defaultConfig.node, signAccount = defaultConfig.account) {
    super()
    this._conf = { ...defaultConfig.node,
      ...nodeConfig
    }
    this._identity = { ...defaultConfig.account,
      ...signAccount
    }
  }

  get eosClient () {
    if (!this._eosClient) {
      this._eosClient = new Eos(this._conf)
    }
    return this._eosClient
  }

  async getIdentity () {
    return this._identity
  }
}
