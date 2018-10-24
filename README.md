# eosplayer

eosplayer is the glue layer of eosjs, which is packaged based on eosjs and provides better usability for the application layer. It can be used on browsers already installed scatter or in Dapp wallets..

## build

`npm run build` or `yarn run build`

## Imported libs

window.eosjs = Eos; /** the eosjs lib @see {@url https://www.npmjs.com/package/eosjs} */
window.env = env; /** {isPc} */
window.idb = idb; /** idb lib for browser storage @see {@url https://www.npmjs.com/package/idb } */
window.eosplayer = new Player(networks);

## Usage

```
{void} switchNetwork(val) // switch network
{void} setNetConf(network_name, conf) // add a network config to the sandbox

get {string} help // get and print help info of usage

get {string} window.eosplayer.netName // get current network name
get {string} window.eosplayer.netConf // get current network config

get {Scatter} window.eosplayer.scatter // get scatter instance
get {Eos} window.eosplayer.eosClient // get eos instance

async {Identity} window.eosplayer.getIdentity() // get identity
async {Identity} window.eosplayer.login() // let user allow you using identity
async {void} window.eosplayer.logout() // return back the identity

async {AccountInfo} window.eosplayer.getAccountInfo(account_name = identity.name) // get account info for any user

async {string} window.eosplayer.getBalance(account_name = undefined, code = "eosio.token") // get balance string of a account. ex. "1.0000 EOS", null means that the account dosen't have any token,
async {string} window.eosplayer.getBalanceAsset(account_name = undefined, code = "eosio.token") // get balance structure of a account. ex. {val:1, sym:"EOS", decimal:4}

async {void} transcal(code, quantity, func, ...args) // send a action of transcal to contract
async {void} call(code, quantity, func, ...args) // send a action to contract
```
