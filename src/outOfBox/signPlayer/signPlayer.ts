import {IMultiSourcePlayerConfig, MultiSourcePlayer} from '../../multiSourcePlayer';
import {IAuthorization, IEosClient, IIdentity} from '../../types/eos';
import {Eos} from '../../types/libs';
import {createLogger} from '../../utils/log';
import {TimeoutPromise} from '../../utils/wait';
import {ISignPlayerOptions, NodeStat, NodeStatMgr} from './nodeStat';

const log = createLogger('signPlayer');

export interface ISignPlayerConfig extends IMultiSourcePlayerConfig {
    account: IIdentity;
    options?: ISignPlayerOptions;
}

const defaultConfig = {
    account: {
        name: 'eosio',
        authority: 'active',
    },
    options: {
        maxFailureRate: 0.499,
        failureRateThreshold: 0.1,
        maxContinuousFailure: 3,
        cleaningTimeInterval: 120000, // 2 * 60 * 1000;
        revivalTimeInterval: 600000, // 10 * 60 * 1000;
        responseIntervalThreshold: 1000,
        responseIntervalDecline: 100,
        maxCallPromiseExceedTime: 180000, // 经测试 1分钟时间仍然太短, 可能导致大量重发, 提高到5分钟
    },
};

export class SignPlayer extends MultiSourcePlayer {

    protected _identity: IIdentity;
    protected _options: ISignPlayerOptions;

    protected _nodeStates: NodeStatMgr;

    protected _concurrentCount: number = 0;

    constructor(conf: ISignPlayerConfig) {
        super(conf);
        const {account, options} = conf;
        this._identity = {
            ...defaultConfig.account,
            ...account,
        };
        this._options = {
            ...defaultConfig.options,
            ...options,
        };
        this._nodeStates = new NodeStatMgr(this._nodeConfigs, this._options);
    }

    public get eosClient(): IEosClient {
        this._nodeStates.setTheBestNodeToCurrent();
        const conf = this._nodeStates.getCurNodeConf();
        // log.verbose("currentNode", this._nodeStates._currentNodeIndex, conf, this._nodeStates.getCurNodeStat());
        return new Eos(conf);
    }

    public async getIdentity(): Promise<IIdentity> {
        if (!this._identity) {
            throw new Error('identity has not been set');
        }
        return this._identity;
    }

    public setIdentity(account: IIdentity) {
        this._identity = account;
    }

    public lockChain() {
        const chain = this.chain; // using eosClient here
        return chain;
    }

    public async dynamicCall(code: string, func: string, jsonData: any, authorization?: IAuthorization) {
        this._concurrentCount += 1;

        const chain = this.lockChain(); // using eosClient here

        const startTimeStamp = (new Date()).getTime();
        const _endpointUrl = this._nodeStates.getCurNodeConf().httpEndpoint || '';

        const auth = authorization || {
            actor: this._identity.name,
            permission: this._identity.authority,
        };

        this.log('START', _endpointUrl, code, func, jsonData, auth,
            this._nodeStates.getCurNodeStat(),
            `Concurrent count => ${this._concurrentCount} `,
        );
        try {
            const ret = await TimeoutPromise(
                this._options.maxCallPromiseExceedTime || 50000,
                chain.call(code, func, jsonData, auth),
            ).catch(ex => {
                throw ex;
            });
            const node = this._nodeStates.markSendSuccess(startTimeStamp);
            this.log('SUCCESS', _endpointUrl, code, func, jsonData, auth, node);
            this._concurrentCount -= 1;
            return ret;
        } catch (e) {
            const node = this._nodeStates.markSendFailed(startTimeStamp);
            this.log('FAILED', _endpointUrl, code, func, jsonData, auth, node, `ERROR => ${(e && e.message) ? e.message : e}`);
            this._concurrentCount -= 1;
            throw e;
        }
    }

    protected log(
        mark: string,
        endPointUrl: string,
        code: string,
        func: string,
        jsonData: any,
        auth: IAuthorization,
        node: NodeStat,
        ...args: any[]
    ) {
        log.info(
            `[signPlayer] Call chain [[ ${endPointUrl} ]] ${code}.${func}(${JSON.stringify(jsonData)}) by ${auth.actor}@${auth.permission} [[[${mark}]]] :
Node status => ${JSON.stringify(node)}
`,
            ...args);
    }

}
