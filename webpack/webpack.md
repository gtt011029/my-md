## 一、官网图片

![1589008433758](image/1589008433758.png)

从图片上就可以看出webpack的主要作用，就是把多个文件分类打包成一个文件



## 二、概念

本质：是一个现代javascript应用程序的静态模块打包工具。当webpack处理应用程序时，它会在内部构建一个==依赖图==，此依赖图会映射项目所需的每个模块，并生成一个或者多个bundle

名词解释:

1、 映射：给一个对象（变量、物体）等，起一个唯一的别名 。例如java中的Map就是一问个表达映射的类. Map names = new HashMap(); names.put("编号9527","唐伯虎"); 这个例子就是把答编号9527映射到唐伯虎上,只需要告诉程版序你要找编号9527,程序就能权找到唐伯虎.这就是映射 

2、bundle：是由不同的模块生成，bundles包含了早已经过加载和编译的最终源文件版本

bundle分离：这个流程提供了一个优化build的方法，允许webpack为应用程序生成多个bundle。最终效果是，当其他某些bundle改动时，彼此独立的另一些bundle都可以不受影响，减少重新发布的代码量，因此由客户端重新下载并利用浏览器缓存

3、依赖图：一个文件依赖另一个文件，webpack就把此视为文件之间有依赖关系。这边就可以使得webpack可以接收非代码资源，（例如：图片、字体什么的），并且作为依赖提供给应用程序



## 三、入口（entry）

这边呢，就是告诉webpack，以哪个模块作为构建内部依赖图的开始

这边一般都是src/index.js

```js
entry: path.join(__dirname, "/src/index.js"), // 入口文件
```



## 四、出口（output）

这边就是告诉webpack，它所创建的bundle，存在哪，一般是./dist文件夹中

```js
output: {
    path: path.join(__dirname, "/dist"), // 打包后的文件存放的地方 
    filename: "bundle.js" // 打包后输出文件的文件名
  },
```



## 五、loader

webpack只能理解JavaScript和json的文件。loader让webpack能够处理其他的文件。

loader一般有两个属性

test：用于被标识哪个文件要用到该loader进行转换，这边这边用正则匹配其后缀

use：进行转换时应该用哪个loader

```js
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
```



## 六、插件（plugin）

loader呢，是用来转换某些类型的模块，而插件的作用更为广泛，可以：打包优化、资源管理、注入环境变量

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
.
.
.
plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'), // new一个插件的实例，这边是webpack自带的插件，也可以自定义插件require进来就可以了
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/src/index.html") // new一个这个插件的实例，并传入相关的参数, 为应用程序生成一个HTML文件按，并且注入所有生成的bundle
    })
  ]
```

更多插件链接： https://webpack.docschina.org/plugins 



## 七、模式（mode）

表明当前是开发环境还是生产环境，一般情况下，感觉看不见这个字段，这边启用webpack的时候默认为production环境

```js
module.exports = {
  mode: 'production'
};
```

 

| 选项        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| development | 会将definePlugin中process.env.NODE_ENV的值1设置为development。启用NamedChunksPlugin和NamedModulesPlugin |
| production  | 会将 `DefinePlugin` 中 `process.env.NODE_ENV` 的值设置为 `production`。启用 `FlagDependencyUsagePlugin`, `FlagIncludedChunksPlugin`, `ModuleConcatenationPlugin`, `NoEmitOnErrorsPlugin`, `OccurrenceOrderPlugin`, `SideEffectsFlagPlugin` 和 `TerserPlugin`。 |
| none        | 退出任何默认优选项                                           |

记住，设置 NODE_ENV 并不会自动地设置 mode。



## 八、开发中server（devServer）

```js
devServer: {
    contentBase: path.join(__dirname, "dist"),
    hot: true,
    port: '8080',
    inline: true,
    open: true,
    overlay: true,
    proxy: {
      '/api': {
        target: '',   //服务端端口
        changeOrigin: true,   //解决跨域问题
        pathRewrite: {
          '^/api': ''   //忽略api
        }
      }
    }
  },
```

