const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './client/index.jsx',
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js',

  },
  module: {
    rules: [
      { test: /\.(jsx)$/, use: 'babel-loader' },
      { test: /\.(css)$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|jpe?g|gif)$/i, use: [{ loader: 'file-loader' }] },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
    })
  ]
}