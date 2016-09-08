var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports= {
  entry: {
    app: path.resolve(APP_PATH, 'app.js')
  },
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  //enable dev source map
  devtool: 'eval-source-map',
  //enable dev server
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  },
  //babel重要的loader在这里
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: APP_PATH,
        query: {
          //添加两个presents 使用这两种presets处理js或者jsx文件
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192' // 这里的 limit=8192 表示用 base64 编码 <= ８K 的图像
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Huan Qiu'
    })
  ]
}