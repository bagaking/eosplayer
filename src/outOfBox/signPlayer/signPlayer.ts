import {Eos} from '../../types/libs'
import {IEosClient, IIdentity} from "../../types/eos";
import {TimeoutPromise} from "../../utils/wait";
import {IMultiSourcePlayerConfig, MultiSourcePlayer} from "../../multiSourcePlayer";
import {ISignPlayerOptions, NodeStatMgr} from "./nodeStat";

export interface ISignPlayerConfig extends IMultiSourcePlayerConfig {
    account: IIdentity,
    options?: ISignPlayerOptions
}

const defaultConfig = {
    account: {
        name: 'eosio',
        authority: 'active'
    },
    options: {
        maxFailureRate: 0.499,
        failureRateThreshold: 0.1,
        maxContinuousFailure: 3,
        DECLINE_ERROR_COUNTER_TIME_INTERVAL: 120000, // 2 * 60 * 1000;
        RETRY_TIME_INTERVAL: 600000, //10 * 60 * 1000;
        responseIntervalThreshold: 1000,
        responseIntervalDecline: 100,
        maxCallPromiseExceedTime: 180000 // 经测试 1分钟时间仍然太短, 可能导致大量重发, 提高到5分钟
    }
};

export class SignPlayer extends MultiSourcePlayer {

    protected _identity: IIdentity;
    protected _options: ISignPlayerOptions;

    protected _nodeStates: NodeStatMgr;

    protected _currentNodeIndex: number;
    protected _concurrentCount: number;

    constructor(conf: ISignPlayerConfig) {
        super(conf)
        const {account, options} = conf
        this._identity = {
            ...defaultConfig.account,
            ...account
        }
        this._options = options
        this._nodeStates = new NodeStatMgr(this._nodeConfigs, this._options);
    }

    public get eosClient(): IEosClient {
        this._nodeStates.setTheBestNodeToCurrent()
        return new Eos(this._nodeStates.getCurNodeConf());
    }

    public async getIdentity(): Promise<IIdentity> {
        if (!this._identity) {
            throw new Error("identity has not been set");
        }
        return this._identity
    }

    setIdentity(account: IIdentity) {
        this._identity = account
    }

    async callChain(code: string, func: string, jsonData: any) {
        this._concurrentCount += 1;

        let chain = this.chain; // using eosClient here

        let startTimeStamp = (new Date()).getTime();
        let _endpointUrl = this._nodeStates.getCurNodeConf().httpEndpoint;

        this.log('START', _endpointUrl, code, func, jsonData,
            this._nodeStates.getCurNodeStat(),
            `Concurrent count => ${this._concurrentCount} `
        );
        try {
            let ret = await TimeoutPromise(
                this._options.maxCallPromiseExceedTime,
                chain.call(code, func, jsonData, {
                    "actor": code,
                    "permission": "active"
                })
            ).catch(ex => {
                throw ex;
            });
            let node = this._nodeStates.markSendSuccess(startTimeStamp);
            this.log('SUCCESS', _endpointUrl, code, func, jsonData, node);
            this._concurrentCount -= 1;
            return ret;
        } catch (e) {
            let node = this._nodeStates.markSendFailed(startTimeStamp);
            this.log('FAILED', _endpointUrl, code, func, jsonData, node, `ERROR => ${(e && e.message) ? e.message : e}`);
            this._concurrentCount -= 1;
            throw e;
        }
    }

    protected log(mark, endPointUrl, code, func, jsonData, node, ...args: any[]) {
        console.log(
            `[eos_call_util] Call chain [[ ${endPointUrl} ]] ${code}.${func} [[[${mark}]]] :
Data => ${JSON.stringify(jsonData)}
Node status => ${JSON.stringify(node)}`,
            ...args);
    }

}
