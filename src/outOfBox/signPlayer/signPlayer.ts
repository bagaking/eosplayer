import {Eos} from '../../types/libs'
import {IAuthorization, IEosClient, IIdentity} from "../../types/eos";
import {TimeoutPromise} from "../../utils/wait";
import {IMultiSourcePlayerConfig, MultiSourcePlayer} from "../../multiSourcePlayer";
import {ISignPlayerOptions, NodeStat, NodeStatMgr} from "./nodeStat";
import {createLogger} from "../../utils/log";

const log = createLogger("signPlayer")

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
        cleaningTimeInterval: 120000, // 2 * 60 * 1000;
        revivalTimeInterval: 600000, //10 * 60 * 1000;
        responseIntervalThreshold: 1000,
        responseIntervalDecline: 100,
        maxCallPromiseExceedTime: 180000 // 经测试 1分钟时间仍然太短, 可能导致大量重发, 提高到5分钟
    }
};

export class SignPlayer extends MultiSourcePlayer {

    protected _identity: IIdentity;
    protected _options: ISignPlayerOptions;

    protected _nodeStates: NodeStatMgr;

    protected _concurrentCount: number = 0;

    constructor(conf: ISignPlayerConfig) {
        super(conf)
        const {account, options} = conf
        this._identity = {
            ...defaultConfig.account,
            ...account
        }
        this._options = {
            ...defaultConfig.options,
            ...options
        }
        this._nodeStates = new NodeStatMgr(this._nodeConfigs, this._options);
    }

    public get eosClient(): IEosClient {
        this._nodeStates.setTheBestNodeToCurrent()
        let conf = this._nodeStates.getCurNodeConf();
        // log.verbose("currentNode", this._nodeStates._currentNodeIndex, conf, this._nodeStates.getCurNodeStat());
        return new Eos(conf);
    }

    public async getIdentity(): Promise<IIdentity> {
        if (!this._identity) {
            throw new Error("identity has not been set");
        }
        return this._identity
    }

    public setIdentity(account: IIdentity) {
        this._identity = account
    }

    public async callChain(code: string, func: string, jsonData: any, authorization?: IAuthorization) {
        this._concurrentCount += 1;

        let chain = this.chain; // using eosClient here

        let startTimeStamp = (new Date()).getTime();
        let _endpointUrl= this._nodeStates.getCurNodeConf().httpEndpoint || '';

        this.log('START', _endpointUrl, code, func, jsonData,
            this._nodeStates.getCurNodeStat(),
            `Concurrent count => ${this._concurrentCount} `
        );
        try {
            let ret = await TimeoutPromise(
                this._options.maxCallPromiseExceedTime || 50000,
                chain.call(code, func, jsonData, authorization || {
                    actor: code,
                    permission: "active"
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

    protected log(mark: string, endPointUrl: string, code: string, func: string, jsonData: any, node: NodeStat, ...args: any[]) {
        log.info(
            `[eos_call_util] Call chain [[ ${endPointUrl} ]] ${code}.${func} [[[${mark}]]] :
Data => ${JSON.stringify(jsonData)}
Node status => ${JSON.stringify(node)}
`,
            ...args);
    }

}
