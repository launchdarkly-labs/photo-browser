const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  watch: true,
  entry: [
    './client.js'
  ],
  output: {
    filename: './dist/client.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'UNSPLASH_APP_ID': JSON.stringify(process.env.UNSPLASH_APP_ID)
      }
    }),
    new ExtractTextPlugin('./dist/styles.css'),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  }
}