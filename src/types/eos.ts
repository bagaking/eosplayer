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
    name: string;
    authority: string;
    blockchain?: string;
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

    abiBinToJson?: () => any;

    abiJsonToBin?: () => any;

    bidname?: () => any;

    buyram?: () => any;

    buyrambytes?: () => any;

    canceldelay?: () => any;

    claimrewards?: () => any;

    contract?: () => any;

    create?: () => any;

    createTransaction?: () => any;

    delegatebw?: () => any;

    deleteauth?: () => any;

    getAbi?: () => any;

    getAccount?: () => any;

    getActions?: () => any;

    getBlock?: () => any;

    getBlockHeaderState?: () => any;

    getCode?: () => any;

    getCodeHash?: () => any;

    getControlledAccounts?: () => any;

    getCurrencyBalance?: () => any;

    getCurrencyStats?: () => any;

    getInfo: () => any;

    getKeyAccounts?: () => any;

    getProducerSchedule?: () => any;

    getProducers?: () => any;

    getRawCodeAndAbi?: () => any;

    getRequiredKeys?: () => any;

    getScheduledTransactions?: () => any;

    getTableRows?: () => any;

    getTransaction?: () => any;

    issue?: () => any;

    linkauth?: () => any;

    newaccount?: () => any;

    nonce?: () => any;

    onerror?: () => any;

    pushBlock?: () => any;

    pushTransaction?: () => any;

    pushTransactions?: () => any;

    refund?: () => any;

    regproducer?: () => any;

    regproxy?: () => any;

    reqauth?: () => any;

    rmvproducer?: () => any;

    sellram?: () => any;

    setabi?: () => any;

    setalimits?: () => any;

    setcode?: () => any;

    setglimits?: () => any;

    setparams?: () => any;

    setpriv?: () => any;

    setprods?: () => any;

    setram?: () => any;

    transaction: () => any;

    transfer?: () => any;

    undelegatebw?: () => any;

    unlinkauth?: () => any;

    unregprod?: () => any;

    updateauth?: () => any;

    voteproducer?: () => any;

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
    account_name: string;
    core_liquid_balance: string;  // - asset format, which is a string like '1.0000 EOS'
    cpu_limit: any; // - {available,max,used}
    net_limit: any; // - {available,max,used}
    ram_quota: number;
    ram_usage: number;
    permissions: any[];
    total_resources: any; // {cpu_weight,net_weight,owner,ram_bytes}
    voter_info: any;
}
