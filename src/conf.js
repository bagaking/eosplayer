module.exports = {
    networks: {
        mainnet: {
            blockchain: 'eos',
            host: 'nodes.get-scatter.com',
            port: 443,
            chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
            protocol: 'https',
            httpEndpoint: 'https://nodes.get-scatter.com:443',
        },
        mainnet2: {
            blockchain: 'eos',
            host: 'api1.eosasia.one',
            port: 443,
            chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
            protocol: 'https',
            httpEndpoint: 'https://api1.eosasia.one:443',
        },
        dev:{
            blockchain: 'eos',
            host: 'eos.toneos.pro',
            port: 7777,
            chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
            protocol: 'http',
            httpEndpoint: 'http://eos.toneos.pro:7777',
        }
    },
};