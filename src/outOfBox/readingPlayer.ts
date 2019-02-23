import {Eos} from '../types/libs';

import {IMultiSourcePlayerConfig, MultiSourcePlayer} from '../multiSourcePlayer';
import {IEosClient, IIdentity} from '../types/eos';
import {createLogger} from '../utils/log';
import {forMs} from '../utils/wait';

const log = createLogger('readingPlayer');

export interface IReadingPlayerConfig extends IMultiSourcePlayerConfig {
    account?: IIdentity;
}

const defaultConfig = {
    account: {
        name: 'eosio',
        authority: 'active',
    },
};

export class ReadingPlayer extends MultiSourcePlayer {

    protected _identity: IIdentity;
    protected _head_block_num: number = 0;
    protected _head_retry_count: number = 0;

    protected _eosNodes: IEosClient[] = [];

    constructor(conf: IReadingPlayerConfig) {
        super(conf);
        this._identity = defaultConfig.account;
        this._head_block_num = 0;
        this._head_retry_count = 0;
        log.info('[EosReading] ==> Create reading nodes \nCONFIGS:', JSON.stringify(this._nodeConfigs));
        this._eosNodes = this._nodeConfigs.map(cfg => {
            const eos = Eos(cfg);
            eos.__conf = cfg;
            return eos;
        });
    }

    get eosClient(): IEosClient {
        if (!this._eosNodes || this._eosNodes.length <= 0) {
            throw new Error('EosUtil : No Avaliable Nodes.');
        }
        return this._eosNodes[0];
    }

    public async getIdentity() {
        return this._identity;
    }

    public async checkNodes(checkSpanMs = 15000, retry_max = 4, blockHeightTolerance = 1000) { // 默认20秒查询一次节点
        while (true) {
            await forMs(checkSpanMs);
            console.log('[EosReading] ==> Start Checking Nodes ', this.eosClient.__conf.httpEndpoint, 'AT', Date.now());
            while (true) {
                try {
                    const chainInfo: any = await this.eosClient.getInfo({});
                    this._head_retry_count = 0;
                    if (chainInfo.head_block_num > this._head_block_num) {
                        this._head_block_num = chainInfo.head_block_num;
                        console.log(
                            '[EosReading] ==> | Info : new head block num',
                            this._head_block_num,
                            '| Node: ',
                            this.eosClient.__conf.httpEndpoint);
                    }

                    const randomInd = Math.floor(Math.random() * this._eosNodes.length);
                    if (randomInd === 0) break; // lucky!! 为 0 的概率越高, 说明配置中的节点越少, 此时降低因为快高切换节点的概率是没毛病的
                    try {
                        console.log(
                            '[EosReading] ==> | Info : try pick another node by block height | Node: ',
                            this._eosNodes[randomInd].__conf.httpEndpoint,
                        );
                        const anotherChainInfo = await this._eosNodes[randomInd].getInfo({});
                        if (anotherChainInfo.head_block_num - this._head_block_num > blockHeightTolerance) {
                            const temp = this._eosNodes[0];
                            this._eosNodes[0] = this._eosNodes[randomInd];
                            this._eosNodes[randomInd] = temp;
                            console.log(
                                '[EosReading] ==> | Info : new node selected (by head block) | OLD: ',
                                temp.__conf.httpEndpoint,
                                '| NEW:',
                                this.eosClient.__conf.httpEndpoint); // 如果节点发生切换, 就不应该 break 了, 应该走 2000ms 的重试
                        } else {
                            console.log(
                                '[EosReading] ==> | Info : no needs to switch node for block height | ',
                                anotherChainInfo.head_block_num, '-', this._head_block_num, '<', blockHeightTolerance);
                        }
                    } catch (ex) { // 如果选到的节点访问都失败了, 意味着当前节点在所有节点中可用性更高的概率更大, 不切换是没毛病的
                        break; // 此时保留原节点并退出
                    }
                } catch (ex) {
                    if (this._head_retry_count < retry_max) {
                        console.log(
                            '[EosReading] ==> | Error : Current node error | RETRY :', this._head_retry_count,
                            '| NODE: ', this._eosNodes[0].__conf.httpEndpoint,
                        );
                        this._head_retry_count += 1; // and retry will start after 2000ms
                    } else {
                        console.log(
                            '[EosReading] ==> | Error : Current node error | RETRY : Failed | Node:',
                            this._eosNodes[0].__conf.httpEndpoint,
                        );
                        for (let i = 1; i < this._eosNodes.length; i++) {
                            try {
                                const chainInfoNew = await this._eosNodes[i].getInfo({});
                                if (chainInfoNew.head_block_num >= this._head_block_num) {
                                    const temp = this._eosNodes[0];
                                    this._eosNodes[0] = this._eosNodes[i];
                                    this._eosNodes[i] = temp;
                                    console.log(
                                        '[EosReading] ==> Info : new node selected | OLD: ',
                                        temp.__conf.httpEndpoint,
                                        '| NEW:',
                                        this.eosClient.__conf.httpEndpoint);
                                    break; // and will be re-test after 2000ms
                                } else {
                                    console.log(
                                        '[EosReading] ==> Info : test node passed | Node: ',
                                        this._eosNodes[i].__conf.httpEndpoint,
                                        'Test: ', chainInfoNew.head_block_num, '<', this._head_block_num);
                                }
                            } catch (ex) {
                                console.log(
                                    '[EosReading] ==> Warning : test node error | Node: ',
                                    this._eosNodes[i].__conf.httpEndpoint);
                            }
                        }
                    }
                }
                await forMs(2000);
            }
        }
    }
}
