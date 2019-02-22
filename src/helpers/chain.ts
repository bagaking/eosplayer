'use strict'

import {forMs, TimeoutPromise} from '../utils/wait'
import {BigNumber} from 'bignumber.js'
import axios from 'axios';

import {createLogger} from '../utils/log'

import {Eos, Ecc} from '../types/libs'

import {IAccountInfo, IAuthorization, IEosClient, IIdentity} from "../types/eos";

const log = createLogger('chain')
/**
 * chain helper, supported chain operations
 * @author kinghand@foxmail.com
 */
export default class ChainHelper {

    constructor(public readonly _eos: IEosClient) {
    }

    /**
     * get info of the chain connected
     * @return {Promise<*>}
     */
    async getInfo() {
        return (await this._eos.getInfo({}))
    }

    /**
     * get specific block of the chain
     * @param blockNumOrId
     * @return {Promise<*>}
     */
    async getBlock(blockNumOrId: string | number) {
        let params = {
            'block_num_or_id': blockNumOrId
        }
        return (await this._eos.getBlock(params))
    }

    /**
     * get contract
     * @param code
     * @return {Promise<void>}
     */
    async getContract(code: string) {
        return await this._eos.contract(code)
    }

    /**
     * get the abi of contract
     * @param code
     * @return {Promise<*>}
     */
    async getAbi(code: string) {
        return await this._eos.getAbi(code)
    }

    /**
     * get the definition of a table in specific contract abi
     * @param code
     * @param tableName
     * @return {Promise<T | undefined>}
     */
    async getTableAbi(code: string, tableName: string) {
        let abi = await this.getAbi(code)
        return abi.abi.tables.find((desc: any) => desc.name === tableName)
    }

    /**
     * abiJsonToBin
     * @param code
     * @param action
     * @param args
     * @return {Promise<string>}
     */
    async abiJsonToBin(code: string, action: string, args: any[]) {
        let params = {
            'code': code,
            'action': action,
            'args': args
        }
        return (await this._eos.abiJsonToBin(params)).binargs
    }

    /**
     * get account info of any user
     * @param {string|number} account_name - string name or id
     * @return {Promise<{AccountInfo}>}
     */
    async getAccountInfo(account_name: string): Promise<IAccountInfo> {
        return await this._eos.getAccount({account_name})
    }

    /**
     * get first public key of an account
     * @param account_name - account_name
     * @param authority - default is 'active'
     * @return {Promise<*>}
     * @constructor
     */
    async getPubKey(account_name: string, authority: string = 'active') {
        const pubkeys = (await this.getPubKeys(account_name, authority))
        if (!pubkeys || pubkeys.length <= 0) {
            log.warning(`cannot find public key for ${account_name}@${authority}`)
            return
        }

        return (await this.getPubKeys(account_name, authority))[0].key
    }

    /**
     * get public keys of an account
     * @param account_name
     * @param authority - default is 'active'
     * @return {Promise<*>}
     * @constructor
     */
    async getPubKeys(account_name: string, authority: string = 'active') {
        let accountInfo = await this.getAccountInfo(account_name)
        let permission = accountInfo.permissions.find((v: any) => v.perm_name == authority)
        if (!permission) throw new Error(`cannot find the permission of ${account_name}`)
        return permission.required_auth.keys
    }

    /**
     * recover public key from signature
     * @param signature - signed data
     * @param message
     * @return {string}
     */
    recoverSign(signature: string, message: string): string {
        return Ecc.recover(signature, message)
    }

    /**
     * validate if signed data is signed by a account
     * @param signature - signed data
     * @param message
     * @param account_name
     * @param authority - default is 'active'
     * @param {Object.<string,function>} accountsPermissionPlugins - plugin should be object
     * @example
     * validateSign(SIG, MSG, ACC, 'active', { ['pretonarts11@eosio.code'] : async (account, recoverKey) => validate rpc ... }
     * @return {string|undefined} - recover public key, and it's failed when 'undefined' return.
     */
    async validateSign(
        signature: string,
        message: string,
        account_name: string,
        authority: string = 'active',
        accountsPermissionPlugins: any): Promise<string | undefined> {
        const recoverKey = this.recoverSign(signature, message)
        const {permissions} = await this.getAccountInfo(account_name)
        if (!permissions) {
            log.warning(`permissions of account_name ${account_name} are not found.`)
            return
        }
        const perm = permissions.find((p: any) => p.perm_name === authority)
        if (!permissions) {
            log.warning(`permission ${authority} account_name ${account_name} are not found.`)
            return
        }

        const {accounts, keys} = perm.required_auth
        let keyObj = keys.find((v: any) => v.key === recoverKey)
        if (keyObj) {
            return keyObj.key
        }
        if (!accountsPermissionPlugins) {
            return
        }
        const accountsStrs = accounts.map((acc: any) => `${acc.permission.actor}@${acc.permission.permission}`)
        log.verbose('try match', accounts, accountsStrs, accountsPermissionPlugins)
        for (let i in accountsStrs) {
            const plugin = accountsPermissionPlugins[accountsStrs[i]]
            if (!plugin) {
                continue
            }
            if (await Promise.resolve(plugin(account_name, recoverKey, this))) return recoverKey
        }
    }

    /**
     * get a account's action count
     * @param {string|number} account_name - string name or id
     * @return {Promise<number>}
     */
    async getActionCount(account_name: string) {
        return await this.getActionMaxSeq(account_name) + 1
    }

    /**
     * get a account's max seq
     * @param {string|number} account_name - string name or id
     * @return {Promise<number>} - return -1 if there is no action
     */
    async getActionMaxSeq(account_name: string) {
        let recentActions = await this.getRecentActions(account_name)
        if (!recentActions || !recentActions.actions) {
            throw new Error(`getActionCount failed: cannot find recent actions of ${account_name})`)
        }
        let acts = recentActions.actions
        return acts.length === 0 ? -1 : acts[acts.length - 1].account_action_seq
    }

    /**
     * get recent actions
     * @param account_name
     * @return {Promise<Array>}
     */
    async getRecentActions(account_name: string) {
        return await this._eos.getActions({account_name})
    }

    /**
     * get actions of an account
     * @desc to avoid searching in huge amount actions, the application layer should check the getActionCount before calling thi method
     * @param {string|number} account_name - string name or id
     * @param {number} startPos - start from 0
     * @param {number} offset - when offset is 0, one object returned, offset ==(should be) count - 1
     * @return {Promise<Array>} - [startPos, ..., startPos + offset]
     */
    async getActions(account_name: string, startPos = 0, offset = 0) {
        let pos = startPos
        let endPos = startPos + offset
        let actions = []
        log.verbose('getActions start', startPos, endPos, 'current:', actions.length)
        while (true) {
            let ret: any
            try {
                ret = await TimeoutPromise(10000, this._eos.getActions({account_name, pos, offset: endPos - pos}))
            } catch (ex) {
                log.warning(ex)
                continue
            }
            if (!ret || !ret.actions) {
                throw new Error(`getActions failed: cannot find actions of ${account_name} (pos:${pos}, offset:${offset})`)
            }
            let acts = ret.actions

            log.verbose('getActions find', acts[acts.length - 1])

            let maxActionInd = acts.length === 0 ? pos - 1 : acts[acts.length - 1].account_action_seq
            if (maxActionInd < pos) {
                break
            }

            actions.push(...acts)
            if (maxActionInd >= endPos) {
                break
            }

            pos = maxActionInd + 1
        }

        return actions
    }

    /**
     * Get all the actions in bulk
     * @param account_name
     * @param cbReceive - using this callback to receive list of actions
     * @param startPos
     * @param count
     * @param concurrent
     * @return {Promise<void>}
     */
    async getAllActionsBatch(account_name: string, cbReceive: Function, startPos: number = 0, count: number = 100, concurrent: number = 10) {
        const offset = count - 1
        const req = async (pos: number) => {
            while (true) {
                try {
                    log.verbose(`search Start : at:${Date.now()} pos:${pos} offset:${offset}`)
                    return await this.getActions(account_name, pos, offset)
                } catch (ex) {
                    log.error('error : ', ex)
                }
            }
        }

        let ret: any[] = []
        let ranges = []
        log.info(`===> start search actions of ${account_name} from ${startPos}, concurrent : ${concurrent}, count : ${count}, once : ${concurrent * count}`)
        let tStart = Date.now()
        for (let i = 0; ; i++) {
            ranges.push(startPos + i * count)
            if (i % concurrent === 0) {
                let tRound = Date.now()
                log.verbose(`===> deal batch ${i} : ${ranges} at ${tStart}`)
                let results = await Promise.all(
                    ranges.map(req)
                )
                if (!results.find(acts => acts.length > 0)) {
                    break
                }
                log.verbose(`===> deal batch ${i} done (${Date.now() - tRound})`)
                results.forEach(acts => {
                    if (acts.length <= 0) {
                        return
                    }
                    if (cbReceive != null) {
                        cbReceive(acts)
                    }
                    ret.push(...acts)
                })
                log.verbose(`===> send batch ${i} done (${Date.now() - tRound})`)
                ranges = []
            }
        }
        log.info(`getAllActions : all scaned (${Date.now() - tStart})`)
        return ret
    }

    /**
     * get balance of specific account
     * @param account_name - user's account name
     * @param code - Account of the currency contract. The default code is "eosio.token", which is the currency code of eos
     * @param symbolName - the token's symbol name
     * @return {Promise<string|undefined>} asset format '1.0000 EOS'
     */
    async getBalance(account_name: string, code: string = 'eosio.token', symbolName?: string) {
        let balances = await this.getBalances(account_name, code)
        if (!symbolName) {
            log.warning('Symbol of the token has not been specified, the first item will return. all:', balances)
            return balances[0] || null
        } else {
            return balances.find((v: string) => v.endsWith(symbolName)) || null
        }
    }

    /**
     * get balance of specific account
     * @param account_name - user's account name
     * @param code - Account of the currency contract. The default code is "eosio.token", which is the currency code of eos
     * @return {Promise<Array>} - list of asset, asset format is like '1.0000 EOS'
     */
    async getBalances(account_name: string, code: string = 'eosio.token') {
        return ((await this._eos.getCurrencyBalance(code, account_name)) || []).map((v: string) => v.trim())
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
    async transfer(account: IIdentity, target: string, quantity: string, memo: string = '', cbError: Function) {
        const transOptions = {authorization: [`${account.name}@${account.authority}`]}
        let trx = await this._eos.transfer(account.name, target, quantity, memo, transOptions).catch(
            (cbError) || log.error
        )
        if (trx) {
            log.info(`Transfer dealed, txID: ${trx.transaction_id}`)
        }
        return trx
    }

    /**
     * check a transaction info, retry once per sec until success
     * @param {string} txID
     * @param {number} maxRound
     * @param {number} timeSpanMS
     * @return {Promise<Object>} transaction
     */
    async waitTx(txID: string, maxRound: number = 12, timeSpanMS: number = 1009) { // Unmanaged polling uses prime as the default interval
        const checkTx: any = async (_txID: string, round: number = 0) => { // can only use lambda, cuz this is used
            try {
                const tx = await this._eos.getTransaction(_txID)
                if (tx) return tx
            } catch (err) {
                log.verbose(`wait tx ${_txID}, retry round: ${round}. ${err.message}`)
            }
            if (round >= maxRound) {
                log.error(`wait tx failed, round out.`)
                return null
            }
            await forMs(timeSpanMS)
            return checkTx(_txID, round + 1)
        }

        return await checkTx(txID)
    }

    /**
     * send action to a contract
     * @param {string} code - account of contract
     * @param {string} func - function name
     * @param {*} jsonData - data
     * @param {Array<IAuthorization>} authorization - should be an object who has keys {actor, permission}
     * @return {Promise<*>} - transaction
     */
    async call(code: string, func: string, jsonData: any, ...authorization: IAuthorization[]) {
        const data = {
            actions: [{
                account: code,
                name: func,
                data: jsonData,
                authorization: authorization
            }],
        };
        log.info("CALL", "code", code, "func", func, "jsonData", jsonData, "authorization", jsonData);
        // log.info(JSON.stringify(data, null, 2))
        return await this._eos.transaction(data)
    }

    /**
     * get all items in a table
     * @desc this method can be very fast (infinitely close to once rpc time) when provide hint table
     * @param {string} code - the contract
     * @param {string} tableName - name of the table
     * @param {string} scope
     * @param {number} lowerNum - lower position, can be number or stringNumber, cannot be account_name
     * @param {number} upperNum - lower position, can be number or stringNumber, cannot be account_name
     * @param {Array<number>} hint - hint table to speed up search
     * @example getTable("contract", "table", "scope", 0, -1, "4611686018427387903", "6917529027641081856", "9223372036854775808", "13835058055282163712")
     * @return {Promise<Array>}
     */
    async getTableAll(code: string,
                      tableName: string,
                      scope: string,
                      lowerNum: string | number,
                      upperNum: string | number,
                      ...hint: Array<string | number>) {
        const lower: BigNumber = lowerNum ? new BigNumber(lowerNum) : new BigNumber(0)
        const upper: BigNumber = upperNum && upperNum !== -1 ? new BigNumber(upperNum) : new BigNumber('18446744073709551615')

        let ret: any[] = [];
        let pool: any[] = [];
        const Require = (_l: BigNumber, _u: BigNumber) => {
            log.verbose('search ', Date.now(), _l.toFixed(0), _u.toFixed(0))
            if (_l.gte(_u)) return
            let _promise = this._eos.getTableRows({
                json: true,
                code: code,
                scope: scope,
                table: tableName,
                limit: -1,
                lower_bound: _l.toFixed(0),
                upper_bound: _u.toFixed(0)
            }).then((result: any) => {
                let _myInd = pool.findIndex(v => v === _promise)
                pool.splice(_myInd, 1)
                if (!result) {
                    return
                }

                if (!result.more) {
                    if (result.rows) {
                        ret.push(...result.rows)
                    }
                } else {
                    let _mid = _u.minus(_l).dividedBy(2).decimalPlaces(0).plus(_l)
                    Require(_l, _mid.minus(1))
                    Require(_mid, _u)
                }
            }).catch((err: Error) => {
                let _myInd = pool.find(v => v === _promise)
                pool.splice(_myInd, 1)
                throw err
            })
            pool.push(_promise)
        }
        if (!hint || hint.length <= 0) {
            Require(lower, upper)
        } else {
            [...hint.map(i => new BigNumber(i)), upper].reduce((_l, _m) => {
                Require(_l, _m)
                return _m
            }, lower)
        }

        while (pool.length > 0) {
            await forMs(50)
        }
        log.verbose('done search ', Date.now(), lower.toFixed(0), upper.toFixed(0))

        return ret
    }

    /**
     * check a table
     * @desc the tag 'more' are not handled.
     * @param {string} code - the contract
     * @param {string} tableName - name of the table
     * @param {string} scope
     * @param {number} limit
     * @param {number | string} lower_bound
     * @param {number | string} upper_bound
     * @param {number} index_position
     * @return {Promise<Array>}
     */
    async checkTable(
        code: string,
        tableName: string,
        scope: string,
        limit: number = 10,
        lower_bound: number | string = 0,
        upper_bound: number | string = -1,
        index_position: number = 1): Promise<any[]> {
        log.verbose('search ', Date.now(), lower_bound, upper_bound, limit)
        let result = await this._eos.getTableRows({
            json: true,
            code: code,
            scope: scope,
            table: tableName,
            limit,
            lower_bound,
            upper_bound,
            index_position
        })
        let ret = result && result.rows ? result.rows : []
        if (result.more && (limit <= 0 || (result.rows && result.rows.length < limit))) { // deal with 'more'
            log.warning(`'more' detected, and this method didn't deal with the tag 'more'. if you want to get all results, using checkTableMore and provide the primary key. `)
        }
        return ret
    }

    /**
     * check a table
     * @desc the tag 'more' are handled. it means that the result would not be truncated.
     * @param {string} code - the contract
     * @param {string} tableName - name of the table
     * @param {string} scope
     * @param {string} primaryKey - the key for indexing
     * @param {number} limit
     * @param {number | string} lower_bound
     * @param {number | string} upper_bound
     * @param {number} index_position
     * @return {Promise<Array>}
     */
    async checkTableMore(
        code: string,
        tableName: string,
        scope: string,
        primaryKey: string,
        limit: number = 9999999,
        lower_bound: number | string = 0,
        upper_bound: number | string = -1,
        index_position: number = 1): Promise<any[]> {
        log.verbose('search ', code, tableName, Date.now())
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
        let ret = result && result.rows ? result.rows : []
        log.verbose(`part size ${ret.length}.`)
        if (result.more && (limit <= 0 || (result.rows && result.rows.length < limit))) { // deal with 'more'
            let from = ret[0][primaryKey]
            let to = ret[ret.length - 1][primaryKey]
            if (!from || !to) {
                let abi = await this.getAbi(code)
                log.error(`searching more error with primary key : ${primaryKey}. please check\nlast data: ${ret[ret.length - 1]} \nabi ${JSON.stringify(abi)}`)
                throw new Error(`check more error with primary key : ${primaryKey}`)
            }
            log.info(`'more' detected: start searching results from ${to}.`)
            let partResult = await this.checkTableMore(code, tableName, scope, primaryKey, limit - ret.length + 1, to, upper_bound, index_position)
            return ret.concat(partResult.splice(1))
            // todo: the meaning of 'limit', should be considered
        }
        return ret
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
    async checkTableRange(
        code: string,
        tableName: string,
        scope: string,
        from: number | string,
        length: number = 1,
        index_position: number = 1): Promise<any[]> {
        if (length < 0) {
            throw new Error(`range error: length(${length}) must larger than 0 `)
        }
        let rows: any[] = await this.checkTable(
            code,
            tableName,
            scope,
            length,
            from,
            (typeof from === 'number') ?
                from + length :
                new BigNumber(Eos.modules.format.encodeName(from, false)).plus(length).toString(),
            index_position)
        return rows
    }

    /**
     * check a item in a table
     * @param {string} code - the contract
     * @param {string} tableName
     * @param {string} scope
     * @param {number} key
     * @return {Promise<*>}
     */
    async checkTableItem(
        code: string,
        tableName: string,
        scope: string,
        key: string | number) {
        let rows = await this.checkTableRange(code, tableName, scope, key, 1)
        return rows[0]
    }

    /**
     * update auth
     * @param account_name
     * @param permission
     * @param parent
     * @param threshold
     * @param keys
     * @param accounts
     * @param waits
     * @returns {Promise<*>}
     */
    async updateAuth(
        account_name: string,
        permission: string,
        parent: string,
        threshold: number,
        keys: any,
        accounts: any,
        waits: number = 1) {
        return await this._eos.updateauth({
            account_name,
            permission,
            parent,
            'auth': {
                threshold,
                keys,
                accounts,
                waits
            }
        })
    }

    static async getTableByScope(
        host: string,
        code: string,
        table: string,
        lower_bound: string | number,
        upper_bound: string | number,
        limit: number = 1000) {
        const api = '/v1/chain/get_table_by_scope'
        const params = {
            'code': code,
            'table': table,
            'lower_bound': lower_bound,
            'upper_bound': upper_bound,
            'limit': limit // 表示每次获取6条记录
        }

        const req = axios.create({
            baseURL: host,
            headers: {
                post: {
                    'Content-Type': 'application/json'
                }
            }
        });
        let ret: any[] = []
        while (true) {
            let rsp = await req.post(api, params)
            let table = rsp.data
            ret.push(table)
            if (table.more === '') {
                break
            }
        }
        return ret
    }

    static help() {
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
{string} async getPubKey(account_name, authority = "active") // get the first public key of an account
{Array} async getPubKeys(account_name, authority = "active") // get public keys of an account
{string} async recoverSign(signature, message) // recover sign and to the public key
{string} async validateSign (signature, message, account, authority = 'active', accountsPermisionPlugins) 
// validate if signed data is signed by a account. it returns the matched public key 

{Number} async getActionCount(account_name) // get a account's action count
{Number} async getActionMaxSeq(account_name) // get a account's max action seq
{Array} async getRecentActions(account_name) // get recent actions
{Array} async getActions(account_name, startPos = 0, offset = 0) // get all actions of an account
{Array} async getAllActionsBatch (account_name, cbReceive, startPos = 0, count = 100, concurrent = 10) // get all actions in bulk

{String} async getBalance(account_name, code = "eosio.token", symbolName = undefined) // get balance of specific account
{Array.<String>} async getBalances(account_name, code = "eosio.token") // get all balance of specific account
{Tx} async transfer(account, target, quantity, memo = "", cbError) // the format of account should be {name, authority}

{Tx} async waitTx(txID, maxRound = 12, timeSpanMS = 1009) // check a transaction info, retry once per sec until success

{Tx} async call(code, func, jsonData, ...authorization) // send action to a contract

{Array} async getTableAll(code, tableName, scope, lowerNum, upperNum, ...hint) // get all items in a table
{Array} async checkTable(code, tableName, scope, limit = 10, lower_bound = 0, upper_bound = -1, index_position = 1) // check a table
{Array} async checkTableMore(code, tableName, scope, primaryKey, limit = 9999999, lower_bound = 0, upper_bound = -1, index_position = 1)
{Array} async checkTableRange(code, tableName, scope, from, length = 1, index_position = 1) // check range in table
{Object} async checkTableItem(code, tableName, scope, key = 0) // check a item in a table

{Object} async updateAuth(account, permission, parent, threshold, keys, accounts, waits) // update auth
\`\`\`   
`
    }
}
