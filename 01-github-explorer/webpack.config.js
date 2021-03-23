const { resolve } = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: resolve(__dirname, 'src', 'index.jsx'),
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: resolve(__dirname, 'public')
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: resolve(__dirname, 'public', 'index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      }
    ],
  }
}