import Eos from 'eosjs'
import ScatterJS from 'scatterjs-core'
import ScatterEOS from 'scatterjs-plugin-eosjs'

ScatterJS.plugins(new ScatterEOS())

// console.log('ScatterJS', ScatterJS);

export default ScatterJS
