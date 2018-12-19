const Player = require('../src/player')
const Eos = require('eosjs')
const scatterConf = {
  blockchain: 'eos',
  host: 'nodes.get-scatter.com',
  port: 443,
  chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
  protocol: 'https',
  httpEndpoint: 'https://nodes.get-scatter.com:443',
}

class MyPlayer extends Player {
        get eosClient() {
            if (!this._eosClient) {
                this._eosClient = new Eos(scatterConf);
            }
            return this._eosClient;
        }

        async getIdentity() {
            return { name: "myawsomename", authority: "active" }
        }
}

let p = new MyPlayer();

debug = require('debug')
console.log('verbose:chain', debug.enabled('verbose:chain'))
console.log('info:chain', debug.enabled('info:chain'))
console.log('warning:chain', debug.enabled('warning:chain'))
console.log('error:chain', debug.enabled('error:chain'))
debug.enable('verbose:*')
console.log('verbose:chain', debug.enabled('verbose:chain'))

console.log("start", scatterConf, p);
(async () => console.log(await p.chain.getActions('eosthrone123', 0, 100000)))()
console.log("end");