import * as EosLib from 'eosjs'
import * as ecc from 'eosjs-ecc'
import * as debug from 'debug'

export const Eos = EosLib
export const Ecc = ecc
export const Debug = debug

console.log("Eos", Eos)
console.log("Ecc", Ecc)
console.log("Debug", Debug)
