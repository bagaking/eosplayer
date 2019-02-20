export interface IAuthorization {
    actor: string;
    permission: string;
}

/**
 * @interface Identity
 * @property {string} name
 * @property {string} authority - default: active
 * @property {string} blockchain - default: eos
 */
export interface IIdentity {
    name: string
    authority: string
    blockchain?: string
}

/**
 * @interface eosAPI
 * @property {Function} abiBinToJson
 * @property {Function} abiJsonToBin
 * @property {Function} bidname
 * @property {Function} buyram
 * @property {Function} buyrambytes
 * @property {Function} canceldelay
 * @property {Function} claimrewards
 * @property {Function} contract
 * @property {Function} create
 * @property {Function} createTransaction
 * @property {Function} delegatebw
 * @property {Function} deleteauth
 * @property {Function} getAbi
 * @property {Function} getAccount - getAccount({account_name: [[account_name]] })
 * @property {Function} getActions
 * @property {Function} getBlock
 * @property {Function} getBlockHeaderState
 * @property {Function} getCode
 * @property {Function} getCodeHash
 * @property {Function} getControlledAccounts
 * @property {Function} getCurrencyBalance
 * @property {Function} getCurrencyStats
 * @property {Function} getInfo
 * @property {Function} getKeyAccounts
 * @property {Function} getProducerSchedule
 * @property {Function} getProducers
 * @property {Function} getRawCodeAndAbi
 * @property {Function} getRequiredKeys
 * @property {Function} getScheduledTransactions
 * @property {Function} getTableRows
 * @property {Function} getTransaction
 * @property {Function} issue
 * @property {Function} linkauth
 * @property {Function} newaccount
 * @property {Function} nonce
 * @property {Function} onerror
 * @property {Function} pushBlock
 * @property {Function} pushTransaction
 * @property {Function} pushTransactions
 * @property {Function} refund
 * @property {Function} regproducer
 * @property {Function} regproxy
 * @property {Function} reqauth
 * @property {Function} rmvproducer
 * @property {Function} sellram
 * @property {Function} setabi
 * @property {Function} setalimits
 * @property {Function} setcode
 * @property {Function} setglimits
 * @property {Function} setparams
 * @property {Function} setpriv
 * @property {Function} setprods
 * @property {Function} setram
 * @property {Function} transaction
 * @property {Function} transfer
 * @property {Function} undelegatebw
 * @property {Function} unlinkauth
 * @property {Function} unregprod
 * @property {Function} updateauth
 * @property {Function} voteproducer
 */
export interface IEosClient {

    abiBinToJson?: Function;

    abiJsonToBin?: Function;

    bidname?: Function;

    buyram?: Function;

    buyrambytes?: Function;

    canceldelay?: Function;

    claimrewards?: Function;

    contract?: Function;

    create?: Function;

    createTransaction?: Function;

    delegatebw?: Function;

    deleteauth?: Function;

    getAbi?: Function;

    getAccount?: Function;

    getActions?: Function;

    getBlock?: Function;

    getBlockHeaderState?: Function;

    getCode?: Function;

    getCodeHash?: Function;

    getControlledAccounts?: Function;

    getCurrencyBalance?: Function;

    getCurrencyStats?: Function;

    getInfo?: Function;

    getKeyAccounts?: Function;

    getProducerSchedule?: Function;

    getProducers?: Function;

    getRawCodeAndAbi?: Function;

    getRequiredKeys?: Function;

    getScheduledTransactions?: Function;

    getTableRows?: Function;

    getTransaction?: Function;

    issue?: Function;

    linkauth?: Function;

    newaccount?: Function;

    nonce?: Function;

    onerror?: Function;

    pushBlock?: Function;

    pushTransaction?: Function;

    pushTransactions?: Function;

    refund?: Function;

    regproducer?: Function;

    regproxy?: Function;

    reqauth?: Function;

    rmvproducer?: Function;

    sellram?: Function;

    setabi?: Function;

    setalimits?: Function;

    setcode?: Function;

    setglimits?: Function;

    setparams?: Function;

    setpriv?: Function;

    setprods?: Function;

    setram?: Function;

    transaction?: Function;

    transfer?: Function;

    undelegatebw?: Function;

    unlinkauth?: Function;

    unregprod?: Function;

    updateauth?: Function;

    voteproducer?: Function;

    __conf?: any;
}

/**
 * @interface AccountInfo
 * @property {string} account_name
 * @property {string} core_liquid_balance - asset format, which is a string like '1.0000 EOS'
 * @property {Object} cpu_limit - {available,max,used}
 * @property {Object} net_limit - {available,max,used}
 * @property {number} ram_quota
 * @property {number} ram_usage
 * @property {Array.<Object>}permissions
 * @property {Object} total_resources {cpu_weight,net_weight,owner,ram_bytes}
 * @property {Object} voter_info
 */
export interface IAccountInfo {
    account_name: string
    core_liquid_balance: string  //- asset format, which is a string like '1.0000 EOS'
    cpu_limit: any // - {available,max,used}
    net_limit: any // - {available,max,used}
    ram_quota: number
    ram_usage: number
    permissions: any[]
    total_resources: any // {cpu_weight,net_weight,owner,ram_bytes}
    voter_info: any
}

