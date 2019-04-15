const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
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
