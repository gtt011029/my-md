### 1、HTML页面重绘与重排（回流）

知识前提：浏览器渲染机制

1、构建DOM树：渲染引擎解析HTML文档，首先将标签转换成DOM树的结点（包括js生成的节点）。

2、构建渲染树：解析css样式文件信息，将渲染信息挂载到DOM树上。（不包括:display:node，head节点）。

3、布局渲染树，从根节点递归，计算每个节点元素大小位置。

4、绘制渲染树，遍历渲染树，使用UI绘制。

**重绘**：当前元素的外观属性被改变，如字体颜色改变背景颜色改变。dom节点没有发生改变

**重排**：当盒子的位置大小等改变会触发，当页面第一次加载都会触发。 dom节点发生改变



### 2、Get与Post的区别



区别一:语义上的区别

1、Get向服务器请求数据。依照HTTP协议，get 是用来请求数据。

2、Post向服务器发数据。依照HTTP协议，Post的语义是向服务器添加数据，也就是说按照Post的语义，该操作是会修改服务器上的数据的。

区别二：服务器请求的区别

1、Get请求是可以被缓存的，举个例子，你访问baidu.com，就是向baidu的服务器发了个Get请求，这个请求的返回，也就是baidu的主页页面内容，会被缓存在你浏览器中，短时间再次访问，其实是拿到的浏览器中的缓存内容。另外Get请求只能接收ASCII码的回复

2、Post请求是不可以被缓存的。对于Post方式提交表单，刷新页面浏览器会弹出提示框 “是否重新提交表单”，Post可以接收二进制等各种数据形式，所以如果要上传文件一般用Post请求。

区别三:参数放请求头和请求体的差别

1、Get请求通常没有请求体（当然这也是可以由程序猿心情改变的），在TCP传输中只需传输一次（而不是一个包），所以Get请求效率相对高。

2、Post请求将数据放在请求体中，而实际传输中，会先传输完请求头，再传输请求体，是分为两次传输的（而不是两个包）。Post请求头会比Get更小（一般不带参数），请求头更容易在一个TCP包中完成传输，更何况请求头中有Content-Length的标识，可以更好地保证Http包的完整性。



### 3、Http响应码

五种可能的值
    1xx：指示信息，表示请求已接收，继续处理
    2xx：成功，表示请求已被成功接收、理解、接受
    3xx：重定向，要完成请求必须进行更进一步的操作
    4xx：客户端错误，请求有语法错误或请求无法实现
    5xx：服务器端错误，服务器未能实现合法的请求

常见状态码：
    200 OK：正常返回信息
    400 BAD REQUEST：客户端请求有语法错误，不能被服务器所理解
    401 UNAUTHRIZED：请求未经授权
    403 FORBIDDEN：服务器收到请求，但是拒绝服务
    404 NOT FOUND：请求资源不存在，或者是输入了错误的URL
    500 INTERNAL SERVER ERROR：服务器发生不可预期的错误
    503 SERVER UNAVAILABLE：服务器当前不能处理客户端的请求，一段时间后可能恢复正常



### 4、前端鉴权

1. HTTP Basic Authentication
2. session-cookie
3. Token 验证
4. OAuth(开放授权)

1.HTTP Basic Authentication：用的比较少，平常FTP登录是用的这种方式吗？感觉可以用在内部网系统。 2.session-cookie：这个在老的系统见得多，只适用于web系统。以前用java servlet写服务端时候，都会自动维护session，会在cookie写一个JSESSIONID的值。

 3.Token：现在主流都是用这个，适用于app鉴权，微信开发平台access token也是差不多这种思路。 

4.OAuth：这个是趋势吧，现在想要推广自己的应用都先接入微信 QQ等登录，降低用户使用门槛。特别是微信渠道的手游，都是接入了微信开发授权登录。



### 5、OAuth原理

1. 客户端向资源所有者请求其授权
2. 客户端收到资源所有者的授权许可，这个授权许可是一个代表资源所有者授权的凭据
3. 客户端向授权服务器请求访问令牌，并出示授权许可
4. 授权服务器对客户端身份进行认证，并校验授权许可，如果都是有效的，则发放访问令牌
5. 客户端向资源服务器请求受保护的资源，并出示访问令牌
6. 资源服务器校验访问令牌，如果令牌有效，则提供服务



### 6、通信协议

```
应用层		ftp telnet 	tftp nfs http（自定义也可）		应用程序到应用程序

http：封装数据，解析数据

传输层			tcp			udp				  port		进程到进程

tcp/udp：封装端口，在一台主机上唯一标识一个进程

网络层		icmp 		ip		igmp		  ip		主机到主机

ip：借助ip唯一标识一个主机
ip地址本质：二进制数----->点分十进制

链路层		arp		硬件接口	  rarp			主机		设备到设备

网卡：mac地址，具有有唯一标识。传输方式是一个网卡到另一个网卡
arp协议：通过IP获得目的mac地址
rarp协议：借助mac地址获取IP地址
```



### 7、tcp协议

三次握手四次握手

client																	server

建立链接（三次握手）

1、client发起连接请求，发送SYN标志位携带client数据包号（随机）

2、server接收到包，返回SYN标志位+server数据包号（随机）；ACK应答+（client数据包号+1）

3、client收到包，返回ACK应答+（server数据包号+1）



断开链接（四次握手）

1、client发起连接请求，发送FIN标志位携带client数据包号（随机）

2、server接收到包，发送ACK应答+（client数据包号+1）

2、server发送ACK应答+（server数据包号+1）

3、client收到包，返回ACK应答+（server数据包号+1）



### 8、对称加密、pms、公钥



### 9、响应式布局



### 10、响应式原理



### 11、旋转动画



### 12、dom树cssom树原理



### 13、为什么link在script前



### 14、浏览器不受恶意脚本攻击



### 15、富文本显示脚本怎么办



### 16、promise.resolve.then和setTimeout（有关事件循环event loop）



### 17、async与await的原理，用es5实现



### 18、子承父类（5种方法）



### 19、Vue spa优化

（按需引入，懒加载路由，gzip压缩，关闭一些插件...）



### 20、webpack在项目种优化



### 21、写出markdown转html的函数



### 22、在一个字符串中，找出最大不连续字符串长度



### 23、怎么在项目中做到按需引入



### 24、webpack打包有话具体干啥，为什么这么做

Dllplugin，happypack





### 26、SEO优化



### 28、Vue3.0与Vue2.0的数据绑定





### 30、Vue，React的区别



### 31、Vue如何解析template模板，diff算法两者的不同



### 32、canvas有了解过吗



### 33、解决跨域问题



1、JSONP：

原理是：动态插入script标签，通过script标签引入一个js文件，这个js文件载入成功后会执行我们在url参数中指定的函数，并且会把我们需要的json数据作为参数传入。

由于同源策略的限制，XmlHttpRequest只允许请求当前源（域名、协议、端口）的资源，为了实现跨域请求，可以通过script标签实现跨域请求，然后在服务端输出JSON数据并执行回调函数，从而解决了跨域的数据请求。

优点是兼容性好，简单易用，支持浏览器与服务器双向通信。缺点是只支持GET请求。

2、 服务器端对于CORS的支持，主要就是通过设置Access-Control-Allow-Origin来进行的。如果浏览器检测到相应的设置，就可以允许Ajax进行跨域的访问。 （服务端配置请求头）



3、webpack 配置 deserver 中的proxy进行跨域











## 有封装过组件吗

特性：

1、即使没有任何注释的情况下也易于理解

2、比乱麻般的代码有更好的性能表现

3、更易于进行bug追溯

4、简洁明了，一句顶一万句





## React和vue的区别

 https://www.lagou.com/lgeduarticle/98851.html 

 1.设计思想   

 vue的官网中说它是一款渐进式框架，采用自底向上增量开发的设计。        

react主张函数式编程，所以推崇纯组件，数据不可变，单向数据流，当然需要双向的地方也可以手动实现，    比如借助 onChange 和 setState 来实现一个双向的数据流。 



2.编写语法   

 Vue推荐的做法是webpack+vue-loader的单文件组件格式，vue保留了html、css、js分离的写法        

React的开发者可能知道，react是没有模板的，直接就是一个渲染函数，它中间返回的就是一个虚拟DOM树，    React推荐的做法是  JSX + inline style, 也就是把HTML和CSS全都写进JavaScript了,即'all in  js'。 



3.构建工具    

vue提供了CLI 脚手架，可以帮助你非常容易地构建项目。        

React 在这方面也提供了 create-react-app，但是现在还存在一些局限性，不能配置等等 



4.数据绑定    

vue是实现了双向数据绑定的mvvm框架，当视图改变更新模型层，当模型层改变更新视图层。    

在vue中，使用了双向绑定技术，就是View的变化能实时让Model发生变化，而Model的变化也能实时更新到View。    (这里我们可以继续深入讲解一下双向数据绑定的原理，我之前的文章手写Vue源码可参考)        

react是单向数据流，react中属性是不允许更改的，状态是允许更改的。   

react中组件不允许通过this.state这种方式直接更改组件的状态。自身设置的状态，可以通过setState来进行更改。    (注意：React中setState是异步的，导致获取dom可能拿的还是之前的内容，    所以我们需要在setState第二个参数（回调函数）中获取更新后的新的内容。)        【这里如果你了解深入的话可以尝试描述一下React中setState的异步操作是怎么实现的，Vue中的更新是通过微任务等】 



5.diff算法    

vue中diff算法实现流程：        

1.在内存中构建虚拟dom树        

2.将内存中虚拟dom树渲染成真实dom结构        

3.数据改变的时候，将之前的虚拟dom树结合新的数据生成新的虚拟dom树       

4.将此次生成好的虚拟dom树和上一次的虚拟dom树进行一次比对(diff算法进行比对)，来更新只需要被替换的DOM，        而不是全部重绘。在Diff算法中，只平层的比较前后两棵DOM树的节点，没有进行深度的遍历。        5.会将对比出来的差异进行重新渲染           

 react中diff算法实现流程:        

DOM结构发生改变-----直接卸载并重新create        

DOM结构一样-----不会卸载,但是会update变化的内容        

所有同一层级的子节点.他们都可以通过key来区分-----同时遵循1.2两点       

 (其实这个key的存在与否只会影响diff算法的复杂度,换言之,你不加key的情况下,        

diff算法就会以暴力的方式去根据一二的策略更新,但是你加了key,diff算法会引入一些另外的操作)



 React会逐个对节点进行更新，转换到目标节点。而最后插入新的节点，涉及到的DOM操作非常多。diff总共就是移动、删除、增加三个操作，而如果给每个节点唯一的标识（key），那么React优先采用移动的方式，能够找到正确的位置去插入新的节点。 



 vue会跟踪每一个组件的依赖关系，不需要重新渲染整个组件树。而对于React而言,每当应用的状态被改变时,全部组件都会重新渲染,所以react中会需要shouldComponentUpdate这个生命周期函数方法来进行控制。 





##  Vue 的响应式原理？ 







## 如何画出0.5px的线

# 使用css画一条0.5px的线

[2018-09-28](http://gentlecoder.cn/2018/09/28/使用css画一条0.5px的线/)

> 理论上px的最小单位是1，但是会有几个特例，高清屏的显示就是一个特例。高清屏确实可以画0.5px，在布局方面 ， 0.5px的线看上去就比1px的线看上去要精致很多。



#### 什么是像素？

像素是屏幕显示最小的单位，在一个1080p的屏幕上，它的像素数量是1920 *1080，即横边有1920个像素，而竖边为1080个。一个像素就是一个单位色块，是由rgba四个通道混合而成。对于一个1200万像素的相机镜头来说，它有1200万个感光单元，它能输出的最大图片分辨率大约为3000* 4000。

那么像素本身有大小吗，一个像素有多大？

有的，如果一个像素越小，那么在同样大小的屏幕上，需要的像素点就越多，像素就越密集，如果一英寸有435个像素，那么它的dpi/ppi就达到了435。Macbook Pro 15寸的分辨率为2880 x 1800，15寸是指屏幕的对角线为15寸（具体为15.4），根据长宽比换算一下得到横边为13寸，所以ppi为2880 / 13 = 220 ppi. 像素越密集即ppi(pixel per inch)越高，那么屏幕看起来就越细腻越高清。

#### 如何画一条0.5PX的直线？

1、直接设置0.5px（不同浏览器效果不同，不推荐），代码如下所示：

```
<!DOCTYPE html><html lang="en"><head>    <meta charset="UTF-8">    <meta name="viewport" content="width=device-width, initial-scale=1.0">    <meta http-equiv="X-UA-Compatible" content="ie=edge">    <title>Document</title>    <style>        .hr {            width: 300px;            background-color: #000;        }        .hr.half-px {            height: 0.5px;        }        .hr.one-px {            height: 1px;        }    </style></head><body>    <p>0.5px</p>    <div class="hr half-px"></div>    <p>1px</p>    <div class="hr one-px"></div></body></html>
```

不同的浏览器有不同的表现，其中Chrome把0.5px四舍五入变成了1px，而firefox/safari能够画出半个像素的边，并且Chrome会把小于0.5px的当成0，而Firefox会把不小于0.55px当成1px，Safari是把不小于0.75px当成1px，进一步在手机上观察iOS的Chrome会画出0.5px的边，而安卓(5.0)原生浏览器是不行的。所以直接设置0.5px不同浏览器的差异比较大，并且我们看到不同系统的不同浏览器对小数点的px有不同的处理。所以如果我们把单位设置成小数的px包括宽高等，其实不太可靠，因为不同浏览器表现不一样。

2、使用缩放

```
.hr.half-px {   height: 1px;   transform: scaleY(0.5);}
```

在PC上的不同浏览器上测试，我们发现Chrome/Safari都变虚了，只有Firefox比较完美看起来是实的而且还很细，效果和直接设置0.5px一样。所以通过transform: scale会导致Chrome变虚了，而粗细几乎没有变化，所以这个效果不好。

3、使用渐变

```
.hr.gradient {  height: 1px;  background: linear-gradient(0deg, #fff, #000);}
```

linear-gradient(0deg, #fff, #000)的意思是：渐变的角度从下往上，从白色#fff渐变到黑色#000，而且是线性的，在高清屏上，1px的逻辑像素代表的物理（设备）像素有2px，由于是线性渐变，所以第1个px只能是#fff，而剩下的那个像素只能是#000，这样就达到了画一半的目的。实际效果和使用缩放类似

4、使用box-shadow

```
.hr.boxshadow {  height: 1px;  background: none;  box-shadow: 0 0.5px 0 #000;}
```

设置box-shadow的第二个参数为0.5px，表示阴影垂直方向的偏移为0.5px，这个方法在Chrome和Firefox都非常完美，但是Safari不支持小于1px的boxshadow，所以完全没显示出来了。

5、使用svg

```
<style>.hr.svg {  background: none;  height: 1px;  background: url("data:image/svg+xml;utf-8,<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='1px'><line x1='0' y1='0' x2='100%' y2='0' stroke='black'></line></svg>");}</style><p>svg</p><div class="hr svg"></div>
```

使用svg的line元素画线，stroke表示描边颜色，默认的宽度stroke-width=”1”，由于svg的1px是物理像素的px，相当于高清屏的0.5px，另外还可以使用svg的rect等元素进行绘制。要注意firefox的background-image如果是svg的话只支持命名的颜色，如”black”、”red”等。











### 公司的产品，前端起什么作用，项目框架