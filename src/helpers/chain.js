'use strict'
const {forMs} = require("../utils/wait")
const BN = require('bignumber.js').BigNumber;

module.exports = class ChainHelper {

    constructor(eosClient) {
        this._eos = eosClient;
    }

    async getInfo() {
        return (await this._eos.getInfo({}));
    }

    async getBlock(blockNumOrId) {
        let params = {
            "block_num_or_id": blockNumOrId
        };
        return (await this._eos.getBlock(params));
    }

    /**
     * get contract
     * @param code
     * @return {Promise<void>}
     */
    async getContract(code) {
        return await this._eos.contract(code)
    }

    async getAbi(code) {
        return await this._eos.getAbi(code);
    }

    async getTableAbi(code, tableName) {
        let abi = await this.getAbi(code);
        return abi.abi.tables.find(desc => desc.name === tableName);
    }

    async abiJsonToBin(code, action, args) {
        let params = {
            "code": code,
            "action": action,
            "args": args
        };
        return (await this._eos.abiJsonToBin(params)).binargs;
    }

    /**
     * get account info of any user
     * @param {string|number} account_name - string name or id
     * @return {Promise<{AccountInfo}>}
     */
    async getAccountInfo(account_name) {
        return await this._eos.getAccount({account_name})
    }

    /**
     * get account info of any user
     * @param {string|number} account_name - string name or id
     * @return {Promise<number>}
     */
    async getActionCount(account_name) {
        let recentActions = await this.getRecentActions(account_name);
        if (!recentActions || !recentActions.actions) {
            throw new Error(`getActionCount failed: cannot find recent actions of ${account_name})`);
        }
        let acts = recentActions.actions;
        return acts.length === 0 ? 0 : [acts.length - 1].account_action_seq;
    }

    async getRecentActions(account_name) {
        return await this._eos.getActions({account_name});
    }

    /**
     * get account info of any user
     * @param {string|number} account_name - string name or id
     * @param {number} startPos - start from 0
     * @param {number} offset - when offset is 0, one object returned
     * @return {Promise<Array>} - [startPos, ..., startPos + offset]
     */
    async getActions(account_name, startPos = 0, offset = 0) {
        let pos = startPos;
        let endPos = startPos + offset;
        let actions = [];

        while (true) {
            let ret = await this._eos.getActions({account_name, pos, offset: endPos - pos});
            if (!ret || !ret.actions) {
                throw new Error(`getActions failed: cannot find actions of ${account_name} (pos:${pos}, offset:${offset})`);
            }
            let acts = ret.actions;

            console.log('getActions find', acts[acts.length - 1]);

            let maxActionInd = acts.length === 0 ? pos : acts[acts.length - 1].account_action_seq;
            if (maxActionInd <= pos) {
                break;
            }

            actions.push(...acts);
            if (maxActionInd >= endPos) {
                break;
            }

            pos = maxActionInd + 1;
        }

        return actions;
    }

    /**
     * get balance of specific account
     * @param code - Account of the currency contract. The default code is "eosio.token", which is the currency code of eos
     * @param account_name - user's account name
     * @return {Promise<string|undefined>} asset format '1.0000 EOS'
     */
    async getBalance(account_name, code = "eosio.token") {
        let result = await this._eos.getCurrencyBalance(code, account_name)
        return result[0] ? result[0].trim() : null;
    }

    /**
     * check a transaction info, retry once per sec until success
     * @param {string} txID
     * @param {number} maxRound
     * @param {number} timeSpanMS
     * @return {Promise<Object>} transaction
     */
    async waitTx(txID, maxRound = 12, timeSpanMS = 1009) { // Unmanaged polling uses prime as the default interval
        const waitForMs = (time) => new Promise(resolve => setTimeout(resolve, time));
        const checkTx = async (_txID, round = 0) => { // can only use lambda, cuz this is used
            try {
                const tx = await this._eos.getTransaction(_txID);
                if (tx) return tx;
            } catch (err) {
                console.log(`wait tx ${_txID}, retry round: ${round}. ${err.message}`);
            }
            if (round >= maxRound) {
                console.error(`wait tx failed, round out.`)
                return null;
            }
            await waitForMs(timeSpanMS);
            return checkTx(_txID, round + 1);
        }

        return await checkTx(txID);
    }

    /**
     * send action to a contract
     * @param {string} code - account of contract
     * @param {string} func - function name
     * @param {Object} jsonData - data
     * @param {Array.<Object>} authorization - should be an object who has keys {actor, permission}
     * @return {Promise<*>} - transaction
     */
    async call(code, func, jsonData, ...authorization) {
        return await this._eos.transaction({
            actions: [
                {
                    account: code,
                    name: func,
                    authorization: authorization,
                    data: jsonData
                }
            ]
        });
    }

    /**
     *
     * @param {string} code - the contract
     * @param {string} tableName - name of the table
     * @param {string} scope
     * @param {string|number} lower - lower position, can be number or stringNumber, cannot be account_name
     * @param {string|number} upper - lower position, can be number or stringNumber, cannot be account_name
     * @param {Array} hint - hint table to speed up search
     * @example getTable("contract", "table", "scope", 0, -1, "4611686018427387903", "6917529027641081856", "9223372036854775808", "13835058055282163712")
     * @return {Promise<Array>}
     */
    async getTable(code, tableName, scope, lower, upper, ...hint) {
        lower = lower ? BN(lower) : BN(0);
        upper = upper && upper !== -1 ? BN(upper) : BN("18446744073709551615")

        let ret = [];
        let pool = [];
        const Require = (_l, _u) => {
            console.log('search ', Date.now(), _l.toFixed(0), _u.toFixed(0));
            if (_l.gte(_u)) return;
            let _promise = this._eos.getTableRows({
                json: true,
                code: code,
                scope: scope,
                table: tableName,
                limit: -1,
                lower_bound: _l.toFixed(0),
                upper_bound: _u.toFixed(0),
            }).then(result => {
                let _myInd = pool.findIndex(v => v === _promise);
                pool.splice(_myInd, 1);
                if (!result) {
                    return;
                }

                if (!result.more) {
                    if (result.rows) {
                        ret.push(...result.rows);
                    }
                } else {
                    let _mid = _u.minus(_l).dividedBy(2).decimalPlaces(0).plus(_l);
                    Require(_l, _mid.minus(1));
                    Require(_mid, _u);
                }
            }).catch(err => {
                let _myInd = pool.find(v => v === _promise);
                pool.splice(_myInd, 1);
                throw err;
            })
            pool.push(_promise);
        }
        if (!hint || hint.length <= 0) {
            Require(lower, upper);
        } else {
            [... hint.map(i => BN(i)), upper].reduce((_l, _m) => {
                Require(_l, _m);
                return _m;
            }, lower);
        }

        while (pool.length > 0) {
            await forMs(50);
        }
        console.log('done search ', Date.now(), lower.toFixed(0), upper.toFixed(0));

        return ret;
    }


    /**
     * check a table
     * @param {string} code - the contract
     * @param {string} tableName - name of the table
     * @param {string} scope
     * @param {number} limit
     * @param {number | string} lower_bound
     * @param {number | string} upper_bound
     * @param {number} index_position
     * @return {Promise<Array>}
     */
    async checkTable(code, tableName, scope, limit = 10, lower_bound = 0, upper_bound = -1, index_position = 1) {
        console.log('search ', Date.now(), lower_bound, upper_bound, limit);
        let result = await this._eos.getTableRows({
            json: true,
            code: code,
            scope: scope,
            table: tableName,
            limit,
            lower_bound,
            upper_bound,
            index_position
        });
        let ret = result && result.rows ? result.rows : [];
        if (result.more && (limit <= 0 || (result.rows && result.rows.length < limit))) { // deal with 'more'
            let abi = await this.getTableAbi(code, tableName);
            let key = abi.key_names[0];
            let largestIndVal = ret[ret.length - 1][key]; // the new start from where the last search end.
            return ret.concat(await this.checkTable(code, tableName, scope, limit - ret.length, BN(largestIndVal).plus(1).toFixed(0), upper_bound, index_position));
            //todo: the meaning of 'limit', should be considered
        }
        return ret;
    }


    /**
     * check range in table
     * @param {string} code - the contract
     * @param {string} tableName - name of the table
     * @param {string} scope
     * @param {number | string} from - start position or username
     * @param {number} length
     * @param {number} index_position
     * @return {Promise<Array>}
     */
    async checkTableRange(code, tableName, scope, from, length = 1, index_position = 1) {
        if (length < 0) {
            throw new Error(`range error: length(${length}) must larger than 0 `);
        }
        let rows = await this.checkTable(code, tableName, scope, length, from, (typeof from === "number") ? from + length : -1, index_position);
        return rows;
    }

    /**
     * check a item in a table
     * @param {string} code - the contract
     * @param {string} tableName
     * @param {string} scope
     * @param {number} key
     * @param {number} index_position
     * @return {Promise<*>}
     */
    async checkTableItem(code, tableName, scope, key = 0) {
        let rows = await this.checkTableRange(code, tableName, scope, key, 1);
        return rows[0];
    }

}