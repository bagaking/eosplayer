const path = require('path');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    entry: {
        eosplayer : './scatterBinder/index.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    devtool: 'cheap-module-source-map', // inline-source-map eval-source-map cheap-module-source-map
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    }
};