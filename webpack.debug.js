const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    eosplayer: './index.js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/env'
            ],
            plugins: [
              '@babel/plugin-transform-runtime'
            ]
          }
        }
      }, {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.web.json'
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'inline-source-map', //eval-source-map cheap-module-source-map
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    path: path.resolve(__dirname, 'play'),
    filename: '[name].bundle.js'
  },
  devServer: {
    contentBase: './play',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]

}
