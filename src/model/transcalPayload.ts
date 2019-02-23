'use strict';

export default class TranscalPayload {
  public args: string[] = [];
  constructor(public func: string, ... args: string[]) {
    this.args = args;
  }

  /**
   * Get memo
   * @return {string}
   */
  public memo() {
    return `@[${this.func}:${this.args.join(',')}]`;
  }

  /**
   * Parse memo
   */
  public parseMemo(memo: string) {
    const callType = memo[0];
    if (memo.length < 4) throw new Error('parse transcal error: the memo is too short.');
    if (memo[1] !== '[' || memo[2] === ']') throw new Error('parse transcal error: formation error.');
    if (callType !== '@' && callType !== '#') throw new Error('parse transcal error: type mark must be @ or #.');

    const posCol = memo.indexOf(':');
    const posEnd = memo.indexOf(']');
    if (posEnd < 0) throw new Error('parse transcal error: cannot find end mark \']\'.');

    if (posCol < 0) { // if the col mark exist
      this.func = memo.substr(2, posEnd - 2);
      this.args = [];
      return this;
    }

    this.func = memo.substr(2, posCol - 2);

    let pos = posCol + 1;
    let posPrev = pos;
    const args = [];
    while (true) {
      pos = memo.indexOf(',', pos);
      if (pos >= posEnd || pos < 0) {
        args.push(memo.substr(posPrev, posEnd - posPrev));
        break;
      }
      args.push(memo.substr(posPrev, pos - posPrev));
      posPrev = ++pos;
    }
    this.args = args;
    return this;
  }

  public static parse(memo: string) {
    return (new TranscalPayload('')).parseMemo(memo);
  }
}
