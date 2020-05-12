// webpack.config.js
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
  entry: path.join(__dirname, "/src/index.js"), // 入口文件
  output: {
    path: path.join(__dirname, "/dist"), // 打包后的文件存放的地方 
    filename: "bundle.js" // 打包后输出文件的文件名
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    hot: true,
    port: '8080',
    inline: true,
    open: true,
    overlay: true,
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  devtool: 'source-map', // 会生成对于调试的完整的.map文件，但同时也会减慢打包速度
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'] // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
      },
      {
        test: /\.(sass|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'), // new一个插件的实例，这边是webpack自带的插件，也可以自定义插件require进来就可以了
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/src/index.html") // new一个这个插件的实例，并传入相关的参数
    })
  ]
}