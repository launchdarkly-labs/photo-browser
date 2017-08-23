require('dotenv').config();

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    './src/styles.css',
    './client.js'
  ],
  output: {
    filename: './dist/client.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'UNSPLASH_APP_ID': JSON.stringify(process.env.UNSPLASH_APP_ID),
        'LAUNCHDARKLY_SDK_KEY': JSON.stringify(process.env.LAUNCHDARKLY_SDK_KEY),
        'LAUNCHDARKLY_CLIENTSIDE_ID': JSON.stringify(process.env.LAUNCHDARKLY_CLIENTSIDE_ID),
        'EXAMPLE_USER_KEY': JSON.stringify(process.env.EXAMPLE_USER_KEY)
      }
    }),
    new ExtractTextPlugin('./dist/styles.css'),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: [
              'babel-preset-es2015',
              'babel-preset-react',
              'babel-preset-stage-0',
            ].map(require.resolve),
          }
        }
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