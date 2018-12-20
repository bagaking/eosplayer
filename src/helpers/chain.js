'use strict'

const {forMs} = require("../utils/wait")
const BN = require('bignumber.js').BigNumber;

const log = require('../utils/log')('chain');

/**
 * chain helper, supported chain operations
 * @author kinghand@foxmail.com
 */
class ChainHelper {

    constructor(eosClient) {
        this._eos = eosClient;
    }

    /**
     * get info of the chain connected
     * @return {Promise<*>}
     */
    async getInfo() {
        return (await this._eos.getInfo({}));
    }

    /**
     * get specific block of the chain
     * @param blockNumOrId
     * @return {Promise<*>}
     */
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

    /**
     * get the abi of contract
     * @param code
     * @return {Promise<*>}
     */
    async getAbi(code) {
        return await this._eos.getAbi(code);
    }

    /**
     * get the definition of a table in specific contract abi
     * @param code
     * @param tableName
     * @return {Promise<T | undefined>}
     */
    async getTableAbi(code, tableName) {
        let abi = await this.getAbi(code);
        return abi.abi.tables.find(desc => desc.name === tableName);
    }

    /**
     * abiJsonToBin
     * @param code
     * @param action
     * @param args
     * @return {Promise<string>}
     */
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
     * get a account's action count
     * @param {string|number} account_name - string name or id
     * @return {Promise<number>}
     */
    async getActionCount(account_name) {
        return await this.getActionMaxSeq + 1;
    }

    /**
     * get a account's max seq
     * @param {string|number} account_name - string name or id
     * @return {Promise<number>} - return -1 if there is no action
     */
    async getActionMaxSeq(account_name) {
        let recentActions = await this.getRecentActions(account_name);
        if (!recentActions || !recentActions.actions) {
            throw new Error(`getActionCount failed: cannot find recent actions of ${account_name})`);
        }
        let acts = recentActions.actions;
        return acts.length === 0 ? -1 : acts[acts.length - 1].account_action_seq;
    }

    /**
     * get recent actions
     * @param account_name
     * @return {Promise<Array>}
     */
    async getRecentActions(account_name) {
        return await this._eos.getActions({account_name});
    }

    /**
     * get actions of an account
     * @desc to avoid searching in huge amount actions, the application layer should check the getActionCount before calling thi method
     * @param {string|number} account_name - string name or id
     * @param {number} startPos - start from 0
     * @param {number} offset - when offset is 0, one object returned
     * @return {Promise<Array>} - [startPos, ..., startPos + offset]
     */
    async getActions(account_name, startPos = 0, offset = 0) {
        let pos = startPos;
        let endPos = startPos + offset;
        let actions = [];
        log.verbose('getActions start', startPos, endPos, "current:", actions.length);
        while (true) {
            let ret = await this._eos.getActions({account_name, pos, offset: endPos - pos});
            if (!ret || !ret.actions) {
                throw new Error(`getActions failed: cannot find actions of ${account_name} (pos:${pos}, offset:${offset})`);
            }
            let acts = ret.actions;

            log.verbose('getActions find', acts[acts.length - 1]);

            let maxActionInd = acts.length === 0 ? pos - 1 : acts[acts.length - 1].account_action_seq;
            if (maxActionInd < pos) {
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
        return (await this.getBalances(code, account_name))[0] || null;
    }

    /**
     * get balance of specific account
     * @param account_name - user's account name
     * @param code - Account of the currency contract. The default code is "eosio.token", which is the currency code of eos
     * @return {Promise<Array>} - list of asset, asset format is like '1.0000 EOS'
     */
    async getBalances(account_name, code = "eosio.token") {
        return ((await this._eos.getCurrencyBalance(code, account_name)) || []).map(v => v.trim());
    }

    /**
     * transfer
     * @param {Object} account - {name, authority}
     * @param {string} target - eos account, can be user or contract
     * @param {string} quantity - eos asset format, e.p. "1.0000 EOS"
     * @param {string} memo - memo
     * @param {Function} cbError - memo
     * @return {Promise<Object>} transactionData
     */
    async transfer(account, target, quantity, memo = "", cbError) {
        const transOptions = {authorization: [`${account.name}@${account.authority}`]}
        let trx = await this._eos.transfer(account.name, target, quantity, memo, transOptions).catch(
            (!!cbError) ? cbError : log.error
        );
        if (!!trx) {
            log.info(`Transfer dealed, txID: ${trx.transaction_id}`);
        }
        return trx;
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
                log.verbose(`wait tx ${_txID}, retry round: ${round}. ${err.message}`);
            }
            if (round >= maxRound) {
                log.error(`wait tx failed, round out.`)
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
     * get all items in a table
     * @desc this method can be very fast (infinitely close to once rpc time) when provide hint table
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
            log.verbose('search ', Date.now(), _l.toFixed(0), _u.toFixed(0));
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
        log.verbose('done search ', Date.now(), lower.toFixed(0), upper.toFixed(0));

        return ret;
    }


    /**
     * check a table
     * @desc the tag 'more' are handled. it means that the result would not be truncated.
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
        log.verbose('search ', Date.now(), lower_bound, upper_bound, limit);
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
     * @desc the tag 'more' are handled. it means that the result would not be truncated.
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

    /**
     * update auth
     * @param account
     * @param permission
     * @param parent
     * @param threshold
     * @param keys
     * @param accounts
     * @param waits
     * @returns {Promise<*>}
     */
    async updateAuth(account, permission, parent, threshold, keys, accounts, waits) {
        return await this._eos.updateauth({
            account,
            permission,
            parent,
            "auth": {
                threshold,
                keys,
                accounts,
                waits
            }
        });
    }

    static get help() {
        return `
### Chain API

\`\`\`js
{Object} async getInfo() // get info of the chain connected
{Object} async getBlock(blockNumOrId) // get specific block of the chain

{Contract} async getContract(code) // get contract
{Object} async getAbi(code) // get abi of contract
{Object} async getTableAbi(code, tableName) // get table abi of contract
{Object} async abiJsonToBin(code, action, args) 

{Object} async getAccountInfo(account_name) // get account info of any user

{Number} async getActionCount(account_name) // get a account's action count
{Number} async getActionMaxSeq(account_name) // get a account's max action seq
{Array} async getRecentActions(account_name) // get recent actions
{Array} async getActions(account_name, startPos = 0, offset = 0) // get all actions of an account

{String} async getBalance(account_name, code = "eosio.token") // get balance of specific account
{Array.<String>} async getBalances(account_name, code = "eosio.token") // get all balance of specific account
{Tx} async transfer(account, target, quantity, memo = "", cbError) // the format of account should be {name, authority}

{Tx} async waitTx(txID, maxRound = 12, timeSpanMS = 1009) // check a transaction info, retry once per sec until success

{Tx} async call(code, func, jsonData, ...authorization) // send action to a contract

{Array} async getTable(code, tableName, scope, lower, upper, ...hint) // get all items in a table
{Array} async checkTable(code, tableName, scope, limit = 10, lower_bound = 0, upper_bound = -1, index_position = 1) // check a table
{Array} async checkTableRange(code, tableName, scope, from, length = 1, index_position = 1) // check range in table
{Object} async checkTableItem(code, tableName, scope, key = 0) // check a item in a table

{Object} async updateAuth(account, permission, parent, threshold, keys, accounts, waits) // update auth
\`\`\`   
`
    }

}

module.exports = ChainHelper;