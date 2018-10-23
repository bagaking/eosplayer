const path = require('path');

module.exports = {
    entry: {
        eosglue : './src/index.js'
    },
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    }
};