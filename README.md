# eosplayer

eosplayer is the glue layer of eosjs, which is packaged based on eosjs and provides better usability for the application layer. It can be used on browsers already installed scatter or in Dapp wallets..

license : [https://github.com/bagaking/eosplayer/blob/master/LICENSE](https://github.com/bagaking/eosplayer/blob/master/LICENSE)

frontd releases : [https://github.com/bagaking/eosplayer/releases](https://github.com/bagaking/eosplayer/releases)

## build (for broswer)

`npm run build` or `yarn run build`

## Play

1. clone the repo  
1. cd into the folder  
1. install hserve : `npm i -g hserve`
1. serve the play folder : `hserve play`
1. open the test site in your chrome : `http://localhost:3000` by default 
1. test it in your chrome console

## api documents : 

[http://doc.eosplayer.pro](https://doc.eosplayer.pro)

---

## Usage of eosplayer

### Events

```js
ERR_TRANSCAL_FAILED
```

### APIs

you can using `help` commond to show api documents on chrome console :

```js
> eosplayer.help // get the help info of usage
> eosplayer.version // get the version info of usage
```

You can use these interfaces to interact with scatter.
> tips: window.eosplayer === eosplayer

``` js

get {string} help // get help info of usage
get {string} version // get the version info

{void} eosplayer.event.setEvent(event, fnCallback, context) //listen to a event

get {Eos} eosplayer.eosClient // get eos instance
async {Identity} eosplayer.getIdentity() // get identity

async {AccountInfo} eosplayer.getAccountInfo(account_name = identity.name)
    // get account info for any user

async {string} eosplayer.getBalance(account_name = undefined, code = "eosio.token")
    // get balance string of a account. ex. "1.0000 EOS", null means that the account dosen't have any token,

async {string} eosplayer.getBalanceAsset(account_name = undefined, code = "eosio.token")
    // get balance structure of a account. ex. {val:1, sym:"EOS", decimal:4}

async {tx} eosplayer.transfer(target, quantity, memo = "")
    // transfer tokens to target

async {tx} eosplayer.transcal(code, quantity, func, ...args)
    // send a action of transcal to contract

async {tx} eosplayer.transget(code, symbol, func, ...args)
    // send a action of trancal (quantity value = 0.0001) to contract

async {Contract} eosplayer.contract(code)
    // get contract object

async {tx} eosplayer.call(code, func, jsonData)
    // send a action to contract

async {tx} eosplayer.waitTx(txID, maxRound = 12, timeSpanMS = 1009);
    // check a transaction info, retry once per sec until success

async {table} eosplayer.checkTable(code, tableName, scope, limit = 10, lower_bound = 0, upper_bound = -1, index_position = 1)
    // check all items in a table

async {item[]} eosplayer.checkTableRange(code, tableName, scope, from, length = 1, index_position = 1)
    // check a range of items in a table

async {item} eosplayer.checkTableItem(code, tableName, scope, key = 0, index_position = 1)
    // check a specific item in a table
```

#### chain APIs

```js

//todo

```

## Usage of eosplayer (for broswer)

### Events

```js
ERR_GET_SCATTER_FAILED  
ERR_GET_IDENTITY_FAILED
```

### APIs

``` js

{void} eosplayer.switchNetwork(val) // switch network
{void} eosplayer.setNetConf(network_name, conf) // add a network config at runtime

get {Scatter} eosplayer.scatter // get scatter instance

get {string} eosplayer.netName // get current network name
get {string} eosplayer.netConf // get current network config

async {Identity} eosplayer.login() // let user allow you using identity
async {void} eosplayer.logout() // return back the identity

```

## Imported libs

``` js

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

- Method: chain.getTable
- Method: chain.getActionCount
- Method: chain.getRecentActions
- Method: chain.getActions

#### modify

- Method: the checkTableRange methods deals with 'more' now

#### Export

- Scatter: bigNumber

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

