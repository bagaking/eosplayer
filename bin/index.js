#!/usr/bin/env node

const debug = require('debug')
debug.enable('error:*')

const Yargs = require('yargs')

const { ReadingPlayer } = require('../build/lib')

const player = new ReadingPlayer({
  urls: [
    'https://eos.greymass.com',
    'https://proxy.eosnode.tools'
  ]
})

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg
const ARGUMENT_NAMES = /([^\s,]+)/g
function getParamNames (func) {
  const fnStr = func.toString().replace(STRIP_COMMENTS, '')
  let result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES)
  if (result === null) { result = [] }
  return result
}

for (const key in player.chain) {
  const fn = player.chain[key]
  if (typeof fn === 'function') {
    const params = getParamNames(fn)
    Yargs.command(
      key + (params.length > 0 ? ' <args>' : ''),
      '[' + params.reduce((prev, cur) => prev + ',' + cur, '').substr(1) + ']'
    )
  }
}

const argv = Yargs
  .help('h')
  .alias('h', 'help')
  .command({
    command: '*',
    handler () {
      Yargs.showHelp()
      process.exit(0)
    }
  }).argv

const methodName = (typeof argv['_'] === 'string') ? argv['_'] : argv['_'][0]
const paramStr = (typeof argv.args === 'object') ? argv.args[0] : argv.args

function go () {
  if (player.chain[methodName]) {
    let lst = JSON.parse(paramStr || '[]')
    console.log('execute', methodName, '(', lst, ')')
    Promise.resolve(player.chain[methodName](...lst)).then(console.log)
  } else {
    console.error(`method ${methodName} are not found`)
  }
}
go()