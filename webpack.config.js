const path = require('path');

module.exports = {
  entry: './client/src/index.js',
  output: {
    path: path.join(`${__dirname}/client/dist`),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(`${__dirname}/client/dist`)
  }
};