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

    abiBinToJson?: (...args: any[]) => any;

    abiJsonToBin?: (...args: any[]) => any;

    bidname?: (...args: any[]) => any;

    buyram?: (...args: any[]) => any;

    buyrambytes?: (...args: any[]) => any;

    canceldelay?: (...args: any[]) => any;

    claimrewards?: (...args: any[]) => any;

    contract?: (...args: any[]) => any;

    create?: (...args: any[]) => any;

    createTransaction?: (...args: any[]) => any;

    delegatebw?: (...args: any[]) => any;

    deleteauth?: (...args: any[]) => any;

    getAbi?: (...args: any[]) => any;

    getAccount?: (...args: any[]) => any;

    getActions?: (...args: any[]) => any;

    getBlock?: (...args: any[]) => any;

    getBlockHeaderState?: (...args: any[]) => any;

    getCode?: (...args: any[]) => any;

    getCodeHash?: (...args: any[]) => any;

    getControlledAccounts?: (...args: any[]) => any;

    getCurrencyBalance?: (...args: any[]) => any;

    getCurrencyStats?: (...args: any[]) => any;

    getInfo: (...args: any[]) => any;

    getKeyAccounts?: (...args: any[]) => any;

    getProducerSchedule?: (...args: any[]) => any;

    getProducers?: (...args: any[]) => any;

    getRawCodeAndAbi?: (...args: any[]) => any;

    getRequiredKeys?: (...args: any[]) => any;

    getScheduledTransactions?: (...args: any[]) => any;

    getTableRows?: (...args: any[]) => any;

    getTransaction?: (...args: any[]) => any;

    issue?: (...args: any[]) => any;

    linkauth?: (...args: any[]) => any;

    newaccount?: (...args: any[]) => any;

    nonce?: (...args: any[]) => any;

    onerror?: (...args: any[]) => any;

    pushBlock?: (...args: any[]) => any;

    pushTransaction?: (...args: any[]) => any;

    pushTransactions?: (...args: any[]) => any;

    refund?: (...args: any[]) => any;

    regproducer?: (...args: any[]) => any;

    regproxy?: (...args: any[]) => any;

    reqauth?: (...args: any[]) => any;

    rmvproducer?: (...args: any[]) => any;

    sellram?: (...args: any[]) => any;

    setabi?: (...args: any[]) => any;

    setalimits?: (...args: any[]) => any;

    setcode?: (...args: any[]) => any;

    setglimits?: (...args: any[]) => any;

    setparams?: (...args: any[]) => any;

    setpriv?: (...args: any[]) => any;

    setprods?: (...args: any[]) => any;

    setram?: (...args: any[]) => any;

    transaction: (...args: any[]) => any;

    transfer?: (...args: any[]) => any;

    undelegatebw?: (...args: any[]) => any;

    unlinkauth?: (...args: any[]) => any;

    unregprod?: (...args: any[]) => any;

    updateauth?: (...args: any[]) => any;

    voteproducer?: (...args: any[]) => any;

    __conf?: any;
}

export interface IEosTransactionData {
    actions: {
        account: string,
        name: string,
        data: any,
        authorization: IAuthorization[],
    }[];
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
