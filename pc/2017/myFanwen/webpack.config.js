const path = require('path')
const webpack = require('webpack')

module.exports = {
  // entry: './src/js/index.js',
  output: {
    path: path.join(__dirname, '/dist/js/'),
    chunkFilename: '[name].js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // })
  ]
}

console.log(module.exports.entry)
