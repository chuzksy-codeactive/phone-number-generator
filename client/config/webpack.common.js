/* eslint-disable prop-types */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        loader: 'file-loader?name=images/[name].[ext]'
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, '../public'),
    publicPath: '/',
    filename: 'js/bundle.js',
  },
  node: {
    dns: 'empty',
    net: 'empty',
    fs: 'empty'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
