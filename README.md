# eosplayer

eosplayer is the glue layer of eosjs, which is packaged based on eosjs and provides better usability for the application layer. It can be used on browsers already installed scatter or in Dapp wallets..

## build

`npm run build` or `yarn run build`

## Usage

### Inserted libs

``` js
window.eosjs = Eos; /** the eosjs lib @see {@url https://www.npmjs.com/package/eosjs} */
window.env = env; /** {isPc} */
window.idb = idb; /** idb lib for browser storage @see {@url https://www.npmjs.com/package/idb } */
window.eosplayer = new Player(networks);
```

### eosplayer

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

{void} eosplayer.switchNetwork(val) // switch network
{void} eosplayer.setNetConf(network_name, conf) // add a network config at runtime

get {string} eosplayer.netName // get current network name
get {string} eosplayer.netConf // get current network config

get {Scatter} eosplayer.scatter // get scatter instance
get {Eos} eosplayer.eosClient // get eos instance

async {Identity} eosplayer.getIdentity() // get identity
async {Identity} eosplayer.login() // let user allow you using identity
async {void} eosplayer.logout() // return back the identity

async {AccountInfo} eosplayer.getAccountInfo(account_name = identity.name)
    // get account info for any user

async {string} eosplayer.getBalance(account_name = undefined, code = "eosio.token")
    // get balance string of a account. ex. "1.0000 EOS", null means that the account dosen't have any token,

async {string} eosplayer.getBalanceAsset(account_name = undefined, code = "eosio.token")
    // get balance structure of a account. ex. {val:1, sym:"EOS", decimal:4}

async {tx} eosplayer.transcal(code, quantity, func, ...args)
    // send a action of transcal to contract

async {tx} eosplayer.transget(code, symbol, func, ...args)
    // send a action of trancal (quantity value = 0.0001) to contract

async {tx} eosplayer.call(code, quantity, func, ...args)
    // send a action to contract

async {tx} eosplayer.waitTx(txID, maxRound = 12, timeSpanMS = 1009)
    // check a transaction info, retry once per sec until success

async {table} checkTable(code, tableName, scope, limit = 10, lower_bound = 0, upper_bound = -1, index_position = 1)
    // check all items in a table

async {item[]} checkTableRange(code, tableName, scope, from, length = 1, index_position = 1)
    // check a range of items in a table

async {item} checkTableItem(code, tableName, scope, key = 0, index_position = 1)
    // check a specific item in a table
```
