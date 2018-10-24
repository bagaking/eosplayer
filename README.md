# eosplayer

eosplayer is the glue layer of eosjs, which is packaged based on eosjs and provides better usability for the application layer. It can be used on browsers already installed scatter or in Dapp wallets..

## build

`npm run build` or `yarn run build`

## Usage

```
get {string} help // get and print help info of usage

get {string} window.eosplayer.netName // get current network name
get {string} window.eosplayer.netConf // get current network config

get {Scatter} window.eosplayer.scatter // get scatter instance
get {Eos} window.eosplayer.eosClient // get eos instance

async {Identity} window.eosplayer.getIdentity() // get identity
async {Identity} window.eosplayer.login() // let user allow you using identity
async {void} window.eosplayer.logout() // return back the identity

async {AccountInfo} window.eosplayer.getAccountInfo(account_name = identity.name) // get account info for any user

async {string} getBalance(code = "eosio.token", account_name = undefined) // get balance string of a account. ex. "1.0000 EOS"
async {string} getBalanceAsset(code = "eosio.token", account_name = undefined) // get balance structure of a account. ex. {val:1, sym:"EOS", decimal:4}

async transcal(code, quantity, func, ...args) // send a action of transcal to contract
async call(code, quantity, func, ...args) // send a action to contract
```
