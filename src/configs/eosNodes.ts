'use strict';

export interface IEosNodeConfig {
    chainId: string;
    httpEndpoint?: string;
    keyProvider?: string[];
    mockTransactions?: () => any;
    expireInSeconds?: number;
    broadcast?: boolean;
    debug?: boolean;
    sign?: boolean;
    keyPrefix?: string;
    transactionHeaders?: (expireInSeconds: number, callback: (error: any, headers: any) => any) => any;
    logger?: {
        log?: (...args: any[]) => any
        error?: (...args: any[]) => any,
    };
    authorization?: string;
    blockchain?: string;
}

export interface IEosNodeConfigTable {
    [name: string]: IEosNodeConfig;
}

export const eosNodeConfigs: IEosNodeConfigTable = {
    scatter: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://nodes.get-scatter.com:443',
    },
    acroeos: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://api2.acroeos.one',
    },
    alohaeos: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'http://api.main.alohaeos.com',
    },
    atticlab: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://eosbp.atticlab.net',
    },
    genereos: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://mainnet.genereos.io',
    },
    blockmatrix: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://eosapi.blockmatrix.network',
    },
    chainrift: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://eospublic.chainrift.com',
    },
    eosio: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://api.eosio.cr',
    },
    cryptolions: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://bp.cryptolions.io',
    },
    cypherglass: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://api.cypherglass.com',
    },
    eos42: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://nodes.eos42.io',
    },
    eosamsterdam: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://mainnet.eosamsterdam.net',
    },
    eosasia: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://api1.eosasia.one',
    },
    eosauthority: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://publicapi-mainnet.eosauthority.com',
    },
    eosbean: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://api.eosbean.com',
    },
    eosbeijing: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://api.eosbeijing.one',
    },
    eosbixin: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://mars.fn.eosbixin.com',
    },
    eoscafeblock: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://eos.eoscafeblock.com',
    },
    eoscanada: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://mainnet.eoscanada.com',
    },
    eoscannon: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://mainnet.eoscannon.io',
    },
    eoscleaner: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://api.eoscleaner.com',
    },
    eosdac: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://eu.eosdac.io',
    },
    eosdublin: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://api.eosdublin.io',
    },
    eoseoul: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://api.eoseoul.io',
    },
    eosfengwo: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://api.eosfengwo.com',
    },
    eosflare: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://node.eosflare.io',
    },
    genesis_mining: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://eos.genesis-mining.com',
    },
    eosdetroit: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://api.eosdetroit.io',
    },
    meet: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://mainnet.meet.one',
    },
    eosgravity: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://api-mainnet.eosgravity.com',
    },
    eoslaomao: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://api.eoslaomao.com',
    },
    eosmetal: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://api3.eosmetal.io',
    },
    minergate: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://api.eos.minergate.com',
    },
    minergate_bp: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://bp.eos.minergate.com',
    },
    eosn: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://api.eosn.io',
    },
    eosnewyork: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://api.eosnewyork.io',
    },
    eosnodeone: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://api.main-net.eosnodeone.io',
    },
    eospacex: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://api-mainnet.eospacex.com',
    },
    nodepacific: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://eosapi.nodepacific.com',
    },
    eosrio: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://api.eosrio.io',
    },
    eossweden: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://api.eossweden.se',
    },
    eostitan: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://api.eostitan.com',
    },
    eostribe: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://api.eostribe.io',
    },
    eosvolga: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://bp.eosvolga.one',
    },
    eosweb: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://apinode.eosweb.net',
    },
    eosys: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://rpc.eosys.io',
    },
    franceos: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://api.franceos.fr',
    },
    eosblockbuster: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://full.eosblockbuster.com',
    },
    jeda: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://api.jeda.one',
    },
    oraclechain: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://api.oraclechain.io',
    },
    sheos: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://api.sheos.org',
    },
    eosgeneva: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://api.eosgeneva.io',
    },
    greymass: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://eos.greymass.com',
    },
    zbeos: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://node1.zbeos.com',
    },
    zeroxeos: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://node1.zeroxeos.com',
    },
    eosnode: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://proxy.eosnode.tools',
    },
    dfuse: {
        blockchain: 'eos',
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
        httpEndpoint: 'https://mainnet.eos.dfuse.io',
    },
    dev: {
        blockchain: 'eos',
        chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
        httpEndpoint: 'http://dev.toneos.pro:7777',
    },
};
