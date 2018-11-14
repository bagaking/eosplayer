'use strict'

/**
 * EOSProvider - defined the MUST interfaces of a player
 */
class EOSProvider {

    /**
     * get or create scatter
     * @return {eosAPI}
     */
    get eosClient() {
        throw new Error(`method not yet implemented: this interface should be implement by the specific class.`)
    }

    /**
     * getIdentity of cur scatter user
     * @return {Promise<{Identity}>}
     */
    async getIdentity() {
        throw new Error(`method not yet implemented: this interface should be implement by the specific class.`)
        // it should be like that : '{ name: "nameofuser", authority: "active" }'
    }

}

module.exports = EOSProvider;