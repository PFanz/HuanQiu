const path = require('path')
const webpack = require('webpack')

module.exports = {
  // entry: './src/js/index_release.js',
  entry: {
    index: './src/js/index_test.js',
    analytics: './src/js/analytics.js'
  },
  output: {
    path: path.join(__dirname, '/dist/js/'),
    filename: '[name].js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}
