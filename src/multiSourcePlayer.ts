import {IEosNodeConfig} from './configs';

import {IReadingPlayerConfig} from './outOfBox';
import {Player} from './player';

export interface IMultiSourcePlayerConfig {
    node: IEosNodeConfig;
    urls: string[];
}

const defaultConfig: IReadingPlayerConfig = {
    node: {
        chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
        mockTransactions: (): null => null,
        expireInSeconds: 60,
        broadcast: true,
        debug: false,
        sign: true,
    },
    urls: [
        'https://mars.fn.eosbixin.com',
        'https://eos.eoscafeblock.com',
        'https://api.eosdublin.io',
    ],
};

export class MultiSourcePlayer extends Player {

    protected _conf: any;
    protected _urls: string[] = [];
    protected _nodeConfigs: IEosNodeConfig[] = [];

    constructor(conf: IMultiSourcePlayerConfig) {
        super();
        const {node, urls} = conf;
        this._conf = {
            ...defaultConfig.node,
            ...node,
        };
        this._urls = urls;
        this._nodeConfigs = this._urls.map(url => {
            const ret: any = {
                chainId: '',
            };
            for (const key in this._conf) {
                if (!this._conf.hasOwnProperty(key)) continue;
                ret[key] = this._conf[key];
            }
            ret.httpEndpoint = url;
            return ret as IEosNodeConfig;
        });
    }

    // need implement eosClient and getIdentity in child class
}