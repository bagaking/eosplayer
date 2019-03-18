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
    // console.log(key, getParamNames(fn))
    const params = getParamNames(fn)
    Yargs.command(
      key + (params.length > 0 ? ' <args>' : ''),
      '[' + params.reduce((prev, cur) => prev + ',' + cur, '').substr(1) + ']'
    )
    // (argv) => {
    //   console.log(argv.name)
    //   console.log(argv.nargs())
    // })
  }
}

const argv = Yargs
  .help('h').alias('h', 'help').argv

if (argv.h || argv.help) {
  console.log(argv.help())
  process.exit(0)
}

// console.log(argv)
// console.log(typeof argv['_'])

const methodName = (typeof argv['_'] === 'string') ? argv['_'] : argv['_'][0]
const paramStr = (typeof argv.args === 'object') ? argv.args[0] : argv.args

function go () {
  // console.log(player.chain[methodName])
  if (player.chain[methodName]) {
    let lst = JSON.parse(paramStr || '[]')
    console.log('execute', methodName, '(', lst, ')')
    Promise.resolve(player.chain[methodName](...lst)).then(console.log)
  } else {
    console.error(`method ${methodName} are not found`)
    // console.log(Yargs.help())
    process.exit(0)
  }
}
go()

//
//
//
// import { FileWalker } from 'kht'
// import * as Path from 'path'
// import * as fs from 'fs-extra'
// import {
//     jsonSerializer,
//     jsSerializer,
//     tsSerializer,
//     tsInterfaceSerializer,
//     serialize
// } from './serializer'
// import { makeCamelName } from './utils/names'
//
// const packageObj = require('../package.json')
// const argv = Yargs
//     .usage('Usage: tables [-i INPUT_DIR] [-o OUTPUT_DIR] [-f FORMAT]')
//     .option('input', {
//         alias: 'i',
//         default: '.',
//         describe: 'the input directory or fileName'
//     })
//     .option('output', {
//         alias: 'o',
//         default: '.',
//         describe: 'the output directory'
//     })
//     .option('format', {
//         alias: 'f',
//         describe: 'export format',
//         choices: ['json', 'js', 'ts', 'ts-interface'],
//         default: 'json'
//     })
//     .help('h')
//     .alias('h', 'help')
//     .version(packageObj.version)
//     .argv
//
// const { input, output, format } = argv
// const EXECUTE_PATH = process.cwd()
// const oPath = (output && output.startsWith('/')) ? output : Path.resolve(EXECUTE_PATH, output)
// const iPath = (input && input.startsWith('/')) ? input : Path.resolve(EXECUTE_PATH, input)
//
// const formats = {
//     'json': { suffix: 'json', serializer: jsonSerializer },
//     'js': { suffix: 'js', serializer: jsSerializer },
//     'ts': { suffix: 'ts', serializer: tsSerializer },
//     'ts-interface': { suffix: 'ts', serializer: tsInterfaceSerializer }
// }
// const formatObj = formats[format]
//
// const stat = fs.statSync(iPath)
// if (stat.isDirectory()) {
//     FileWalker.forEachSync(
//         iPath,
//         fileObj => {
//             console.log('generate : ', fileObj.path)
//             serialize(fileObj.path, oPath, {
//                 [`${makeCamelName(fileObj.parsed.name)}.${formatObj.suffix}`]: formatObj.serializer
//             })
//         }, false, file => !file.match(/\..*\.swp/) && !file.startsWith('~') && file.endsWith('xlsx')
//     )
// } else if (!iPath.match(/\..*\.swp/) && !iPath.startsWith('~') && iPath.endsWith('xlsx')) {
//     console.log('generate : ', iPath)
//     serialize(iPath, oPath, {
//         [`${makeCamelName(Path.parse(iPath).name)}.${formatObj.suffix}`]: formatObj.serializer
//     })
// } else {
//     console.log('file format error:', iPath)
// }
