'using strict';

/**
 * Storage
 */
export default class DB {
    /**
     * the storage lib interact with localStorage now
     * @param defaultConfigs - define what will you get when you require an key not exist
     */
    constructor(public defaultConfigs: any) {
    }

    /**
     * get val by key
     * @param key - will be assembled to eosplayer::${key}
     * @return {*}
     */
    public get(key: string) {
        const pKey = `eosplayer::${key}`;
        const item = localStorage.getItem(pKey);
        if (item) {
            return item;
        }
        if (key in this.defaultConfigs) {
            const val = this.defaultConfigs[key];
            this.set(key, val);
            return val;
        }
        return undefined;
    }

    /**
     * set value
     * @param key
     * @param val
     */
    public set(key: string, val: any) {
        const pKey = `eosplayer::${key}`;
        localStorage.setItem(pKey, val);
    }
}
