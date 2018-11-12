'use strict'

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

    async abiJsonToBin(code, action, args) {
        let params = {
            "code": code,
            "action": action,
            "args": args
        };
        return (await this._eos.abiJsonToBin(params)).binargs;
    }

    async getAllActions(accountName, pos) {
        if (!pos) {
            pos = 0;
        }
        let newPos = pos;
        let actions = [];
        while (true) {
            let ret = this._eos.getActions({
                account_name: accountName,
                pos: newPos,
                offset: 100
            })
            let acts = ret.actions;
            actions = actions.concat(acts);
            newPos += 100;
            if (!offset && acts.length < 100) {
                return actions;
            } else if (newPos >= pos + offset) {
                return actions;
            }
        }
    }

}