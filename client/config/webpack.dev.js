const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: '../public/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, '../public'),
    hot: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    proxy: {
      '/api': 'http://localhost:3000'
    },
    overlay: true
  },
  devtool: 'source-map',
});
