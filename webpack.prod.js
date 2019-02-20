const path = require('path')

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
            configFile: 'tsconfig.json'
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'cheap-module-source-map', // inline-source-map eval-source-map cheap-module-source-map
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    path: path.resolve(__dirname, 'web'),
    filename: '[name].bundle.js'
  }

}
