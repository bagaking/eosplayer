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
> eosplayer.help // get and print help info of usage
```

You can use these interfaces to interact with scatter.
> tips: window.eosplayer === eosplayer

``` js
get {string} eosplayer.help // get and print help info of usage

{void} switchNetwork(val) // switch network
{void} setNetConf(network_name, conf) // add a network config to the sandbox

get {string} eosplayer.netName // get current network name
get {string} eosplayer.netConf // get current network config

get {Scatter} eosplayer.scatter // get scatter instance
get {Eos} eosplayer.eosClient // get eos instance

async {Identity} eosplayer.getIdentity() // get identity
async {Identity} eosplayer.login() // let user allow you using identity
async {void} eosplayer.logout() // return back the identity

async {AccountInfo} eosplayer.getAccountInfo(account_name = identity.name) // get account info for any user

async {string} eosplayer.getBalance(account_name = undefined, code = "eosio.token") // get balance string of a account. ex. "1.0000 EOS", null means that the account dosen't have any token,
async {string} eosplayer.getBalanceAsset(account_name = undefined, code = "eosio.token") // get balance structure of a account. ex. {val:1, sym:"EOS", decimal:4}

async {txID} transcal(code, quantity, func, ...args) // send a action of transcal to contract
async {txID} transget(code, symbol, func, ...args) // send a action of trancal (quantity value = 0.0001) to contract

async {txID} call(code, quantity, func, ...args) // send a action to contract
```
