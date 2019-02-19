'use strict'

export default class TranscalPayload {
  args : string[] = []
  constructor (public func : string, ... args_ : string[]) {
    this.args = args_
  }

  /**
     * Get memo
     * @return {string}
     */
  memo () {
    return `@[${this.func}:${this.args.join(',')}]`
  }

  /**
     * Parse memo
     */
  parseMemo (memo: string) {
    let callType = memo[0]
    if (memo.length < 4) throw new Error('parse transcal error: the memo is too short.')
    if (memo[1] !== '[' || memo[2] === ']') throw new Error('parse transcal error: formation error.')
    if (callType !== '@' && callType !== '#') throw new Error('parse transcal error: type mark must be @ or #.')

    let posCol = memo.indexOf(':')
    let posEnd = memo.indexOf(']')
    if (posEnd < 0) throw new Error("parse transcal error: cannot find end mark ']'.")

    if (posCol < 0) { // if the col mark exist
      this.func = memo.substr(2, posEnd - 2)
      this.args = []
      return this
    }

    this.func = memo.substr(2, posCol - 2)

    let pos = posCol + 1
    let posPrev = pos
    let args = []
    while (true) {
      pos = memo.indexOf(',', pos)
      if (pos >= posEnd || pos < 0) {
        args.push(memo.substr(posPrev, posEnd - posPrev))
        break
      }
      args.push(memo.substr(posPrev, pos - posPrev))
      posPrev = ++pos
    }
    this.args = args
    return this
  }

  static parse (memo: string) {
    return (new TranscalPayload('')).parseMemo(memo)
  }
}
