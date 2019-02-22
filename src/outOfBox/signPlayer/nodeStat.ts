import {IEosNodeConfig} from "../../configs";
import {createLogger} from "../../utils/log";

const log = createLogger("signPlayer:nodeStat")

export interface ISignPlayerOptions {
    maxFailureRate?: number;
    maxContinuousFailure?: number;
    failureRateThreshold?: number;
    responseIntervalThreshold?: number;
    responseIntervalDecline?: number;
    maxCallPromiseExceedTime?: number;
    cleaningTimeInterval?: number;
    revivalTimeInterval?: number;
}

export class NodeStat {
    error_counts: number = 0; // 失败次数
    total_counts: number = 1; // 总调用次数
    continuous_failure: number = 0; // 连续失败次数
    enabled: boolean = true; // 开关状态
    response_interval: number = 0; // 响应间隔
    revival_time: number = (new Date()).getTime(); // 下次熔断恢复时间
    cleaning_time: number = (new Date()).getTime(); // 下次清理状态时间

    record_total_counts?: number = 0;
    record_total_success?: number = 0;
    record_total_fuse?: number = 0;
    record_total_failed?: number = 0;
}

export class NodeStatMgr {

    protected _nodeStatus: NodeStat[] = [];
    public _currentNodeIndex: number = 0;

    constructor(
        public readonly _nodeConfigs: IEosNodeConfig[],
        public readonly _options: ISignPlayerOptions
    ) {
        this.initNodeStatus()
    }

    public initNodeStatus() {
        for (let i = 0; i < this._nodeConfigs.length; i++) {
            this._nodeStatus.push(new NodeStat());
        }
        // log.info("initiated", this._nodeStatus, this._nodeConfigs)
        this.setTheBestNodeToCurrent();
    }

    public setTheBestNodeToCurrent() {
        let min_node_idx = Math.floor(Math.random() * this._nodeStatus.length);
        let timestamp = (new Date()).getTime();
        for (let i = 0; i !== this._nodeStatus.length; i++) {
            let node = this.tryClean(i);
            let error_rate = node.error_counts / node.total_counts;
            let revival = timestamp >= node.revival_time;

            if (node.enabled &&
                (error_rate >= (this._options.maxFailureRate || 0.5) ||
                    node.continuous_failure >= (this._options.maxContinuousFailure || 5))
            ) {
                node.enabled = false;
                node.revival_time = timestamp + (this._options.revivalTimeInterval || 600000);
                node.error_counts = 0;
                node.total_counts = 1;
                node.continuous_failure = 0;
                node.record_total_fuse = (node.record_total_fuse || 0) + 1;
                log.info(`[eos_call_util] fuse ${this._nodeConfigs[i].httpEndpoint}`);
            }

            if (!node.enabled && !revival) {
                continue;
            }

            let min_node = this._nodeStatus[min_node_idx];
            let min_error_rate = min_node.error_counts / min_node.total_counts;
            if (min_node.continuous_failure > node.continuous_failure // 选出节点的连续失败次数更小
                || min_error_rate > error_rate + (this._options.failureRateThreshold || 0.1) // 选出节点的失败率更低
                || min_node.response_interval > node.response_interval + (this._options.responseIntervalThreshold || 1000)// 选出节点的相应时间权值更快
            ) {
                min_node_idx = i;
            }
        }

        this._currentNodeIndex = min_node_idx;
    };

    public getNodeConf(index: number) : IEosNodeConfig{
        return this._nodeConfigs[index];
    }

    public getNodeStat(index: number) {
        return this._nodeStatus[index];
    }

    public tryClean(index: number) {
        let node = this.getNodeStat(index)
        let timestamp = (new Date()).getTime();
        if (node.cleaning_time > timestamp) return node;
        log.verbose("execute clean ", node)
        node.error_counts = Math.max(0, node.error_counts - 1);
        node.total_counts = Math.max(1, node.total_counts - 1);
        node.continuous_failure = Math.max(0, node.continuous_failure - 1);
        node.response_interval = Math.max(0, node.response_interval - (this._options.responseIntervalDecline || 1000));
        node.cleaning_time = timestamp + (this._options.cleaningTimeInterval || 60000);
        return node;
    }

    public getCurNodeConf() {
        return this.getNodeConf(this._currentNodeIndex)
    }

    public getCurNodeStat() {
        return this.getNodeStat(this._currentNodeIndex)
    }

    public markSendSuccess(startTimestamp: number) {
        const node = this.getCurNodeStat();
        const now = (new Date()).getTime();
        const timeDelta = now - startTimestamp;
        node.response_interval = (node.response_interval + timeDelta) / 2; // 相应时间公式: a[i] = (t[i] + a[i-1]) / 2
        node.continuous_failure = 0;
        node.enabled = true;
        node.cleaning_time = now + (this._options.cleaningTimeInterval || 180000);
        node.total_counts += 1;
        node.record_total_success = (node.record_total_success || 0) + 1;
        node.record_total_counts = (node.record_total_counts || 0) +  1;
        log.verbose("send succeed > ", node.continuous_failure, node.error_counts, node.total_counts)
        return node
    }

    public markSendFailed(startTimestamp: number) {
        let node = this.getCurNodeStat();
        node.error_counts += 1;
        node.continuous_failure += 1;
        node.revival_time = startTimestamp + (this._options.revivalTimeInterval || 180000);
        node.total_counts += 1;
        node.record_total_failed = (node.record_total_failed || 0) + 1;
        node.record_total_counts = (node.record_total_counts || 0) + 1;
        log.verbose("send failed > ", node.continuous_failure, node.error_counts, node.total_counts)
        return node
    }

}