const player = require('./player')
const {networks} = require('./conf')

class env {

    static isPc() {
        return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? false : true;
    }
}

window.eosenv = env;
window.eosplayer = new player(networks)