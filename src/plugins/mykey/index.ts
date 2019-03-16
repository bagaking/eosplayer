'use strict';

import {ISignPlugin, ValidateDelegate} from '../interface';

/**
 * Mykey plugins help to sign and validate signature
 */
export class MykeyPlugins implements ISignPlugin {

    /**
     * initiate with the chain helper
     * @param {ChainHelper} _chain
     * @param {Object.<string,string>} _config - default: {mgrcontract: 'mykeymanager'}
     */
    constructor(
        private readonly _chain,
        private readonly _config = {
            mgrcontract: 'mykeymanager',
        }) {
    }

    public async getSignKey(account): Promise<string> {
        const mykey_signkey_table = 'keydata';
        const mykey_signkey_index = 3;
        const keydata = await this._chain.getTable(this._config.mgrcontract, mykey_signkey_table, account, mykey_signkey_index, mykey_signkey_index + 1);
        if (!keydata) return '';

        return keydata[0].key.pubkey;
    }

    get perm() {
        return `${this._config.mgrcontract}@active`;
    }

    get signKeyProvider() {
        const plugin = {
            [this.perm]: async (account: string) => await this.getSignKey(account),
        };
        return plugin;
    }

    get validatorProvider(): { [perm: string]: ValidateDelegate } {
        const plugin = {
            [this.perm]: async (account: string, recoverKey: string) => {
                const pubkey = await this.getSignKey(account);
                return pubkey === recoverKey;
            },
        };
        return plugin;
    }
}