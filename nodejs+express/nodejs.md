## 前言

官方一句话：nodejs是一个基于chrome v8引擎的JavaScript运行时，（在chrome 的v8引擎上跑）

一句话弄懂nodejs是干嘛的、优点及缺点

平常我们会那么说：nodejs是一种通过JavaScript语言开发web服务端的东西

一种JavaScript的运行环境，能够使JavaScript脱离浏览器运行，nodejs包含一些函数库和v8引擎，使得JavaScript脱离浏览器运行的是v8引擎

优点：nodejs有非阻塞、事件驱动I/O等特性



长轮询：是一种利用http模拟系统持续连接的技巧（具体点可以这样说，页面载入了，不管你需不需要服务器给你响应信息，你都会给服务器发送给一个ajax请求，这个请求不同于一般的ajax请求，服务器不会直接给出响应信息，而是等着，直到服务器觉得该给你发消息了，才会给你响应，然后再给服务器发送一个请求，在那候着，这样呢就可以让浏览器一直保持着响应的状态）

ps：这边现在也不怎么这样用了，现在基本上用websocket



事件驱动：服务器只在用户那边有事件发生的时候才会响应，这就是事件驱动

非阻塞：（我感觉就是开子进程的原因）这边可以把非阻塞的服务器想象成一个loop循环，这个loop呢会一直跑下去，当有新的请求来了，他就会接收请求，然后把这个请求分配给其他的进程，并且响应一个回调，然后他就继续跑，继续接收请求，当回调响应了，他就会把结果传回用户的浏览器





## 函数库

### 1、fs模块

该模块主要执行文件操作，均有同步和异步版本

例如：fs.readFile()    fs.readFileSync()

fs.stat  获取文件信息

fs.unink  删除文件

```js
fs.readFile(filename,[.options],callback(err,data))
// err 错误信息
// buu'f'fe'r
```



```js
var fs = require('fs');

fs.readFileSync(src)   // 从源路径读取文件内容
fs.writeFileSync(dst, initFile)   // 将文件内容（initFile）写入目标路径


function copy(src, dst) {
    fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}// 大文件copy 读一点写一点，避免超内存
// createReadStream 只读数据流
// createWriteStream 只写数据流
// pipe方法把两个数据流连接在一起，水就会顺着管道从一个桶流到另一个桶
```



fs内置模块提供的api基本可以分为以下三类

1、文件属性读写：

```js
fs.start

fs.chmod    // 修改文件权限

fs.chown    // 修改文件目录
```





2、文件内容读写

```js
fs.readFile

fs.readdir

fs.writeFile

fs.mkdir    // 新建一个子目录
```





3、底层文件操作

```json
fs.open

fs.read

fs.write

fs.close
```





### 2、http

```js
var http = require('http');

http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text-plain' });
    response.end('Hello World\n');
}).listen(8124);    //作为服务端使用时
```



http模块提供两种使用方式：

1、作为服务端使用时，创建一个http服务器，监听http客户端请求并返回响应

2、作为客户端时，发起一个http客户端请求，获取服务端响应

















###  热启动：

 npm install --global nodemon 

安装好后，启动js文件把node指令改成nodemon指令就行了，保存后自动重启node服务器 







### url输入到页面展示的过程

1、DNS解析：将域名解析成IP地址，

2、TCP连接：TCP三次握手

3、发送HTTP请求

4、服务器处理请求并返回HTTP报文

5、浏览器解析渲染页面

6、断开连接：TCP四次握手



### Cookie

set-Cookie响应头字段是服务器发送到浏览器或者其他客户端的一些信息，一般用于登录成功的情况下返回给客户端的凭证信息，然后下次请求时会带上这个cookie，这样服务器就能知道当前是来自哪个用户了



cookie请求头字段是客户端发送请求到服务端时发送的信息



express-session  获取session信息







进程：系统进行资源分配和调度的基本单位，是线程的容器

线程：操作系统能够进行运算调度的最小单位

孤儿进程：父进程创建子进程后，父进程退出了，但是父进程对应的一个或多个子进程还在运行







mongoDB

文档、集合、数据库

 mongoose.connect （‘path’, function(){}）//连接数据库

mongoose：mongoDB的建模工具