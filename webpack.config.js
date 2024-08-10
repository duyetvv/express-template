const path = require('path');
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),

  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },

  target: "node",

  node: {
    __filename: true,
    __dirname: true,
  },

  externals: [nodeExternals()],
  
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
}
