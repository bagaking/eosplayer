'use strict';

import ChainHelper from '../../helpers/chain';
import {ISignPlugin, ValidateDelegate} from '../interface';

/**
 * Mykey plugins help to sign and validate signature
 */
export class MykeyPlugins implements ISignPlugin {

    /**
     * initiate with the chain helper
     * @param {Object.<string,string>} config - default: {mgrcontract: 'mykeymanager'}
     */
    constructor(
        private readonly config = {
            mgrcontract: 'mykeymanager',
        }) {
    }

    public async getSignKey(account: string, chain: ChainHelper): Promise<string> {
        const signKeyTableName = 'keydata';
        const signKeyIndex = 3;
        const keyObject = await chain.getTableAll(
            this.config.mgrcontract,
            signKeyTableName,
            account,
            signKeyIndex,
            signKeyIndex + 1,
        );
        if (!keyObject) return '';

        return keyObject[0].key.pubkey;
    }

    get perm() {
        return `${this.config.mgrcontract}@active`;
    }

    get signKeyProvider() {
        return {
            [this.perm]:
                async (account: string, chain: ChainHelper) =>
                    await this.getSignKey(account, chain),
        };
    }

    get validatorProvider(): { [perm: string]: ValidateDelegate } {
        return {
            [this.perm]: async (account: string, recoverKey: string, chain: ChainHelper) => {
                const pubkey = await this.getSignKey(account, chain);
                return pubkey === recoverKey;
            },
        };
    }
}