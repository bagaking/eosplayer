# eosplayer

Eosplayer is a bonding layer of eosjs, which is based on eosjs and provides better usability for the application layer. It can be used on both the node.js server and in a browser or Dapp wallet that already has Scatter installed.

frontd releases : [https://github.com/bagaking/eosplayer/releases](https://github.com/bagaking/eosplayer/releases)

LICENSE : [Apache 2.0](https://github.com/bagaking/eosplayer/blob/master/LICENSE)

## build (for broswer)

`npm run build` or `yarn run build`

## play

1. clone the repo  
1. cd into the folder  
1. install hserve : `npm i -g hserve`
1. serve the play folder : `hserve play`
1. open the test site in your chrome : `http://localhost:3000` by default 
1. test it in your chrome console

## api documents : 

[http://doc.eosplayer.pro](https://doc.eosplayer.pro)

---

> you can using `help` commond to show api documents on chrome console

## Usage of eosplayer

### Events

`ERR_TRANSCAL_FAILED`
`ERR_TRANSFER_FAILED`
`ERR_TRANSEND_FAILED`

### APIs

```js
{String} get help // get help info of usage
{String} get version // get the version info
{Chain} get chain // get the chain

{Void} eosplayer.event.setEvent(event, fnCallback, context) //listen to a event

{Eos} get eosplayer.eosClient // get eos instance
{Identity} async eosplayer.getIdentity() // get identity

{AccountInfo} async eosplayer.getAccountInfo(account_name = identity.name) 
    // get account info for any user

{String} async eosplayer.getBalance(account_name = undefined, code = "eosio.token")  
    // get balance string of a account. ex. "1.0000 EOS", null means that the account dosen't have any token,

{String} async eosplayer.getBalanceAsset(account_name = undefined, code = "eosio.token") 
    // get balance structure of a account. ex. {val:1, sym:"EOS", decimal:4}

{Tx} async eosplayer.transfer(target, quantity, memo = "")
    // transfer tokens to target

{Tx} async eosplayer.transcal(code, quantity, func, ...args) 
    // send a action of transcal to contract
    
{Tx} async eosplayer.transget(code, symbol, func, ...args) 
    // send a action of trancal (quantity value = 0.0001) to contract

{Contract} async eosplayer.contract(code)
    // get contract object

{Tx} async eosplayer.call(code, func, jsonData)
    // send a action to contract
```

### Chain API

```js

{Object} async getInfo() // get info of the chain connected
{Object} async getBlock(blockNumOrId) // get specific block of the chain

{Contract} async getContract(code) // get contract
{Object} async getAbi(code) // get abi of contract
{Object} async getTableAbi(code, tableName) // get table abi of contract
{Object} async abiJsonToBin(code, action, args) 

{Object} async getAccountInfo(account_name) // get account info of any user

{Number} async getActionCount(account_name) // get a account's action count
{Array} async getRecentActions(account_name) // get recent actions
{Array} async getActions(account_name, startPos = 0, offset = 0) // get all actions of an account

{String} async getBalance(account_name, code = "eosio.token") // get balance of specific account

{Tx} async waitTx(txID, maxRound = 12, timeSpanMS = 1009) // check a transaction info, retry once per sec until success

{Tx} async call(code, func, jsonData, ...authorization) // send action to a contract

{Array} async getTable(code, tableName, scope, lower, upper, ...hint) // get all items in a table
{Array} async checkTable(code, tableName, scope, limit = 10, lower_bound = 0, upper_bound = -1, index_position = 1) // check a table
{Array} async checkTableRange(code, tableName, scope, from, length = 1, index_position = 1) // check range in table
{Object} async checkTableItem(code, tableName, scope, key = 0) // check a item in a table

{Object} async updateAuth(account, permission, parent, threshold, keys, accounts, waits) // update auth
```   

## Usage of eosplayer (for broswer)

### Events

```js
ERR_GET_SCATTER_FAILED  
ERR_GET_IDENTITY_FAILED
```

### APIs

```js
{void} eosplayer.switchNetwork(val) // switch network
{void} eosplayer.setNetConf(network_name, conf) // add a network config at runtime    

get {Scatter} eosplayer.scatter // get scatter instance
get {Scatter} async getScatterAsync(maxTry = 100) // get scatter instance

get {string} eosplayer.netName // get current network name
get {string} eosplayer.netConf // get current network config
        
async {Identity} eosplayer.login() // let user allow you using identity
async {void} eosplayer.logout() // return back the identity
```

## Imported libs

```js

window.eosjs = Eos; /** the eosjs lib @see {@url https://www.npmjs.com/package/eosjs} */
window.BigNumber = BigNumber; /** big number library @see {@url https://www.npmjs.com/package/bignumber.js} */
window.env = env; /** {isPc} */
window.idb = idb; /** idb lib for browser storage @see {@url https://www.npmjs.com/package/idb } */
window.eosplayer = new ScatterPlayer(networks);

```

## Usage of eosplayer (for node.js)

1. install eosplayer  
    `npm i eosplayer --save` or `yarn add eosplayer`
2. import eosplayer  
    `import * from 'eosplayer'` or `const Player = require('eosplayer')`
3. extend Player to create the glue layer, implement methods : eosClient and getIdentity
    see [scatterPlayer](https://github.com/bagaking/eosplayer/blob/master/scatterBinder/scatterPlayer.js)
    ```js
    const Player = require('eosplayer')
    const Eos = require('eosjs')
    class MyPlayer extends Player {
            get eosClient() {
                if (!this._eosClient) {
                    this._eosClient = new Eos(myAwsomeConf);
                }
                return this._eosClient;
            }

            async getIdentity() {
                return { name: "myawsomename", authority: "active" }
            }
    }
    ```
4. have fun

---  

## Updates

### 0.3.0

#### add

- Class: kh.js
- Event: ERR_TRANSFER_FAILED
- Event: ERR_TRANSEND_FAILED
- Method: get eosplayer.kh
- Method: chain.getTable
- Method: chain.getActionCount
- Method: chain.getRecentActions
- Method: chain.getActions
- Method: chain.transfer


#### modify

- Method: the checkTableRange methods deals with 'more' now

#### Export

- Scatter: bigNumber

#### Deprecated

- eosplayer.waitTx (eosplayer.chain.waitTx instead)
- eosplayer.checkTable (eosplayer.chain.checkTable instead)
- eosplayer.checkTableRange (eosplayer.chain.checkTableRange instead)
- eosplayer.checkTableItem (eosplayer.chain.checkTableItem instead)


### 0.2.0 (no release)

#### add

- Class: chain.js
- Method: get eosplayer.chain

### 0.1.2

in this version, scatter are split from the Player.

#### add

- Module: scatterBinder
- Class: src/eosProvider
- Class: scatterBinder/scatterPlayer
- Method: void eventHandler.enableEvents(eventKeys)

#### remove

- Player.EventNames

#### modify

- Rename events :
  - ERR_TRANSCAL_FAILED
  - ERR_GET_SCATTER_FAILED
  - ERR_GET_IDENTITY_FAILED

### 0.1.1

#### add

- async eosplayer.transfer(target, quantity, memo)
- async eosplayer.contract(code)

---

## Contact

email : [kinghand@tonarts.org](kinghand@tonarts.org)  
issue : [https://github.com/bagaking/eosplayer/issues](https://github.com/bagaking/eosplayer/issues)

