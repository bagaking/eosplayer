# eosplayer

eosplayer is the glue layer of eosjs, which is packaged based on eosjs and provides better usability for the application layer. It can be used on browsers already installed scatter or in Dapp wallets..

## build

`npm run build` or `yarn run build`

## Usage

window.eosplayer.login()
window.eosplayer.logout()

window.eosplayer.getBalance("eosio.token") // return asset string like "1.0000 EOS"
window.eosplayer.getBalanceAsset("eosio.token") // return asset structure like {val:1.0000, sym:"EOS", decimal:4}


