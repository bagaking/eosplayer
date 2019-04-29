'use strict';

import {OneLineCall} from '@khgame/one-line-call';

export class TranscalPayload extends OneLineCall {

    /**
     * Get memo
     * @return {string}
     */
    public memo() {
        return this.serialize();
    }

    /**
     * Parse memo
     */
    public parseMemo(memo: string) {
        return this.parse(memo);
    }

    public static parse(memo: string) {
        return (new TranscalPayload('')).parseMemo(memo);
    }
}
