https://cloud.tencent.com/developer/chapter/13608

## 1、防抖

无论触发频率多高，一定在事件触发n秒后再执行

这边可以用定时器解决，一般的情况下我就会直接用lodash的debounce

```javascript
function debounce(event, time) {
  let timer = null
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      event.apply(this, args);
    }, time);
  };
}
```





## 2、节流

不管事件触发频率多高，在单位时间内只执行一次

```js
    function throttle(event, time) {
      let pre = 0;
      return function (...args) {
        if (Date.now() - pre > time) {
          pre = Date.now();
          event.apply(this, args);
        }
      }
        
        
        
        
       // 定时器写法
    function throttle(event, time) {
      let timer = null;
      return function (...args) {
        if (!timer) {
          timer = setTimeout(() => {
            timer = null;
            event.apply(this, args);
          }, time);
        }
      }
    }
```



## 3、深拷贝和浅拷贝

浅拷贝

obj.assign()

array.slice()

array.concat

```js
let target=[];
let testArr=[2,3,5,8];
Object.assign(target,testArr);
console.log(target);
testArr.push(8);
console.log("我是原来的"+target+",我是现在的"+testArr);
```



深拷贝

JSON.parse(JSON.stringify(obj))

手动实现深拷贝：就是递归遍历的copy

```js
function deepClone(obj) {
    let result = typeof  obj.splice === "function" ? [] : {};
    if (obj && typeof obj === 'object') {
        for (let key in obj) {
            if (obj[key] && typeof obj[key] === 'object') {
                result[key] = deepClone(obj[key]);//如果对象的属性值为object的时候，递归调用deepClone,即在吧某个值对象复制一份到新的对象的对应值中。
            } else {
                result[key] = obj[key];//如果对象的属性值不为object的时候，直接复制参数对象的每一个键值到新的对象对应的键值对中。
            }

        }
        return result;
    }
    return obj;
}

let testArray = ["a", "b", "c", "d"];
let testRes = deepClone(testArray);
console.log(testRes);
console.log(typeof testRes[1]);

let testObj = {
    name: "weiqiujuan",
    sex: "girl",
    age: 22,
    favorite: "play",
    family: {brother: "son", mother: "haha", father: "heihei"}
};
let testRes2 = deepClone(testObj);
testRes2.family.brother = "weibo";
console.log(testRes2);
```





## 4、伪数组转化为真数组的方法（三种）

```js
const arrLike = { 0: 'foo', 1: 'bar', 2: 'baz', length: 3 }
console.log(Array.from(arrLike))
console.log([].slice.call(arrLike))
console.log([...arrLike]) // 我这了这个地方好像报错
```



## 5、typeof 为什么会把null 判断为Object类型。

null有属于自己的类型Null，而不是Object类型，之所以判断为Object，是因为Js数据类型在底层都是以二进制的形式表示的，二进制的前三位为0会被typeOf判断为对象类型，而null的二进制位恰好是0，因此，null被误判为Object类型



## 6、 apply(), bind(), call()

bind()方法：来实现函数内部this指向问题。会创建一个新函数，称为绑定函数，当调用这个绑定函数时，绑定函数会以创建它时传入的第一个参数作为this，传入bind（）方法的第二个以及以后的参数加上绑定函数运行时本身的参数按照顺序作为原来的参数来调用原函数



apply()、call()都是为了改变某个函数运行时的上下文而存在的，（简单的说就是为了改变函数体内的this指向）

```js
function fruits() {}
 
fruits.prototype = {
    color: "red",
    say: function() {
        console.log("My color is " + this.color);
    }
}
 
var apple = new fruits;
apple.say();    //My color is red


banana = {
    color: "yellow"
}
apple.say.call(banana);     //My color is yellow
apple.say.apply(banana);    //My color is yellow
```

可以看出call、apply是为了动态改变this而出现的，当一个对象object没有莫格方法时（例如banana没有say方法），但是其他的有，我们可以借助call、apply用其他对象的方法来操作

区别：接收参数不同，apply参数可以放在数组里





javaScript 事件【event】

首先了解以下几个概念：事件、事件类型、事件绑定、事件监听、事件处理程序（事件监听器）、事件对象（事件源）、事件流、事件性能优化（事件委托【事件代理】、移除事件程序）、浏览器内核（常见的浏览器兼容问题）等。



什么是事件（event）：

ps：事件是一直存在的，不管有没有绑定或监听，他只是没有事件处理程序而已！

JavaScript事件是浏览器、文档（document）窗口中发生的特定的交互瞬间；而javaScript和HTML之间的交互行为就是通过事件来触发的。

事件处理程序：

我们用户在页面中进行的点击这个动作，鼠标移动的动作，网页页面加载完成的动作等，都可以称之为事件名称

click、mousemove、load等都是事件的名称。响应某个事件的函数则称为事件处理程序，或者叫做事件侦听器。





### 事件类型：

在javaScript中事件大致分为三大类，分别是一般事件、表单事件、页面事件

1、UI事件：

load、unload、error、resize、scroll、select、DOMActive，是用户与页面上的元素交互时触发的。

2、焦点事件：

如blur、DOMFocusIn、DOMFocusOut、focus、focusin、focusout，在元素获得或失去焦点的时候触发。这些事件当中，最为重要的是blus、focus，注意，这一类事件不会发生冒泡

3、鼠标与滚轮事件

click、dbclick、mousedown、mouseenter、mouseleave、mousemove、mouseout、mouseover、mouseup，是当用户通过鼠标在页面执行操作时触发的。

4、文本事件

textInput，在文档中输入文本触发

5、键盘事件

keydown、keyup、keypress，当用户通过键盘在页面中执行操作时触发



### 事件流：

浏览器层次顺序：document、html、body、div父元素、input子元素



什么是事件流：

事件流是描述从页面中接收事件的顺序

从内到外（冒泡）：阻止冒泡：event.stopPropagation()；阻止默认行为：event.preventDefault（）

从外到内（捕获）

w3c采取两种结合的方式：先从顶级节点开始，将事件向下传递至源节点，再从源节点冒泡至定节点





添加、删除监听事件

```typescript
Btn3.addEventListener('click', addFn, false) // false代表冒泡，true代表捕获

Btn3.removeEventLister('mouseover', addFn, false) // 这边的事件名和事件函数名要一一对应。
```





### 事件委托：

使用场景：当一个页面事件处理程序比较多的时候，通常就会用到它

原理：主要利用了事件冒泡，只指定一个事件处理程序，就可以管理一个类型的所有事件。例如为整个页面指定一个onclick事件处理程序

给元素的父级或者祖级，甚至页面绑定事件，然后利用事件冒泡的基本原理，通过事件目标对象（target）进行检测，然后执行相关操作，优点在于大大减少了事件处理程序的数量，在页面中设置事件处理程序的事件就更少了（DOM引用减少）

整个页面占用的内存控件会更少，从而提升了整体的性能



移除事件处理程序

每当将一个事件处理程序制定给一个元素时，子啊运行中的浏览器代码与支持页面交互的javaScript代码之间机会建立一个连接。连接数量也直接影响页面的执行速度，所以当内存中存在着过时的‘空事件处理程序’的时候，就会造成web应用程序的内存和性能问题。





```
clearBtnDisabled
```





## Intl.Collator

Intl.Collator 对象是collators的构造函数，用于启用对语言敏感的字符串比较对象。

语法：new Intl.Collator([locales[, options]])



locales：可选的。一个带有BCP 47语言标签的字符串或这种字符串的数组。

co：某些语言的变体排序规则。可能的值包括：“big5han”，“dict”，“direct”，“ducet”，“gb312”，“phonebk”，“phonetic”，“pinyin”，“reformed”，“searchj1”，“storke”，“trad”，“unihan”

kn：是否应使用数字整理。例如：“1”<"2"<"10"，可能的值true、false

kf：大写还是小写先排。可能的值”upper“，”lower“，”false“





options：可选的，具有以下所有全部虎部分属性的对象{}

localeMatcher：要使用的语言匹配算法。可能的值是”lookup“，”best fit“ 默认是”best fit“

usage：比较是用于排序还是用于搜索的字符串，可能的值为”sort“，”search“，默认”sort“

sensitivity：字符串中的哪些差异应导致非零结果值，可能的值是：

​		”base“：只有基数不同的字符串比较不等。例如：a ≠ b，a = á ， a = A

​		"accent"：只有在只有在基本字母或重音和其他变音符号不同的字符串之间进行比较才是不相等的。例如：a ≠ b，a ≠ á ， a = A

​		”case“：只有基数不同或大小写不同的字符串比较不等。例如：a ≠ b，a = á ， a ≠ A

​		”Variant“：基本字母，重音符号和其他变音符号不同的字符串，或案例比较不等的字符串。其他差异也可能被考虑在内。例如：a ≠ b，a ≠ á ， a ≠ A

ignorePunctuation：是否应该忽略标点符号。true、false

numeric：是否使用数字整理，可kn作用相同。

caseFirst：大写还是小写应该先排序，upper、lower、false



Intl.collator.compare

返回一个getter函数，该函数根据此Collator对象的排序呢顺序比较两个字符串





```ts
const collator = new Intl.Collator();
console.log(collator.compare('a', 'c')); // → a negative value
console.log(collator.compare('c', 'a')); // → a positive value
console.log(collator.compare('a', 'a')); // → 0
```



```ts
objectSort(objectList: ObjectName2Image[]): ObjectName2Image[] {
  const collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
  return objectList.sort((object1, object2) => {
    return collator.compare(object1.name, object2.name);
  });
}
```









# js模块化

简介：模块又称构件，是能够单独命名并独立地完成一定功能的程序语句的集合（即程序代码和数据结构的集合体）

基本特征：

​	1、外部特征：模块跟外部环境联系的结构（即其他模块或程序调用该模块的方式，包括有输入输出参数、引用的全局变量）和模块的功能

​	2、内部特征：模块的内部环境具有的特点（即该模块的局部数据、程序代码）

简而言之，该模块就是一个具有独立作用域，对外暴露特定功能接口的代码集合。







## 模块化规范：

commonJS、AMD、CMD、ES6 Module



1、commonjs

一个单独的文件就是一个模块，

每一个模块都是一个单独的作用域，

必须通过module.exports 导出对外的变量或接口

通过require（）来导入

主要在nodejs中常用到

```js
// 模块定义 add.js
module.eports.add = function(a, b) {
  return a + b;
};

// 模块定义 decrease.js
module.exports.decrease = function(a, b) {
  return a - b;
};

// formula.js,模块使用，利用 require() 方法加载模块,require 导出的即是 module.exports 的内容
var addJs = require("./add.js")
var decreaseJs = require("./decrease.js").decrease
const add = addJs.add;
const decrease = decreaseJs.decrease;
module.exports.square_difference = function(a, b) {
  return add(a, b) * decrease(a, b);
};
```





2、AMD ---- 异步模块加载机制

目前主要有两个javaScript库实现了AMD规范：require.js  、curl.js

采用异步的方式加载模块

模块的加载不影响它后面的语句的运行

所有依赖这个模块的语句都定义在一个回调函数中，等到依赖加载完成之后，这个回调函数才会运行

其诞生主要为了解决两个问题：

1、实现javaScript文件的**异步加载**，避免网页失去响应

2、模块管理之间的依赖性，便于代码的编写和维护

也采用require()语句加载模块，但是不同于commonjs，它要求两个参数

```js
require([module], callback);

// module 是一个数组，里面的成员就是要加载的模块
// 第二个是callback，则是加载成功后的回调函数

require(['math'], function (math) {
    math.add(2, 3)
})
```







3、CMD ---- （Common Module Definition） 通用模块定义

实现该规范的有：SeaJS

需要用到的地方才进行依赖加载

```js
// CMD 在执行以下代码的时候， SeaJS 会首先用正则匹配出代码里面所有的 require 语句，拿到依赖，然后依次加载，加载完成再执行回调函数
define(function(require) {
  let add = require("add");
  let result1 = add(9, 7);
  let add = require("decrease");
  let result2 = decrease(9, 7);
  console.log(result1 * result2);
});
```





4、ES Module

异步加载

设计思想就是在编译的时候就能确定模块的依赖关系，以及输入和输出的变量

export：导出

import：导入

as  起别名



export  *  from "methods"   导出全部



自动开启严格模式（不管在模块的头部有没有加上use strict）

每个模块都有自己的上下文，每隔模块内声明的变量都是局部变量，不会污染全局作用域





# 包装对象

对象是javaScript语言最主要的数据类型，三种原始类型的值----数值、字符串、布尔值，在一定条件下也会自动转为对象，也就是原始类型的“包装对象”（wrapper）



**所谓“包装对象”，指的是与数值、字符串、布尔值分别相对应的Number、String、Boolean三个原生对象。这三个原生对象可以把原始类型的值变成（包装成）对象。**

```javascript
var v1 = new Number(123);
var v2 = new String('abc');
var v3 = new Boolean(true);

typeof v1 // "object"
typeof v2 // "object"
typeof v3 // "object"

v1 === 123 // false
v2 === 'abc' // false
v3 === true // false
```

目的：

​		包装对象的设计目的，首先是是的“对象”这种类型可以覆盖javaScript所有的值，整门语言有一个通用的数据模型，其次是使得原始类型的值也有办法调自己的方法。



自动换成包装对象：

​	某些场合，原始类型的值会自动当做包装对象调用，即调用包装对象的属性和方法，这时javaScript引擎会自动将原始类型的值转为包装对象实例，并在使用后立刻销毁实例

```javascript
'abc'.length 

// 3

typeof 'abc'

// string
```



被包装的对象并不等于真正的对象：

```javascript
var s1 = 'Hello World';
s1.x = 123
s1.x // undefined

typeof s1  // string


var s2 = new String('Hello World')
s2.x = 123
s2.x // 123

typeof s2  // object
```





总结：javaScript的包装对象提供给开发者像操作对象一样操作string、number、boolean值的能力，体现了javaScript是一门面向对象的开发编程







# 函数式编程

函数式编程有一个概念，叫做柯里化（currying），意思是将多参数换成单参数的形式。



```javascript
function currying(fn, total) {
    return function (num) {
        return fn.call(this, num, total)
    }
}

function tail(num, total) {
  if (num===1) return total;
  return tail(num-1, num*total)
}

const factorial = currying(tail,1)

console.log(factorial(5))   // 120



// 解析：发现 const factorial 赋值一个匿名函数，这个匿名函数带一个参数，return 一个函数；

const factorial = function(num) {
    return tail.call(this, num, 1);
}


// 再等于
const factorial = function(num) {
    return tail(num,1)
}

```

























# 推荐JavaScript经典实例学习资料文章

《可视化的 JS：动态图演示 - 事件循环 Event Loop的过程》

《教你如何用动态规划和贪心算法实现前端瀑布流布局「实践」》

《可视化的 js：动态图演示 Promises & Async/Await 的过程》

《原生JS封装拖动验证滑块你会吗？「实践」》

《如何实现高性能的在线 PDF 预览》

《细说使用字体库加密数据-仿58同城》

《Node.js要完了吗？》

《Pug 3.0.0正式发布，不再支持 Node.js 6/8》

《纯JS手写轮播图（代码逻辑清晰，通俗易懂）》

《JavaScript 20 年 中文版之创立标准》

《值得收藏的前端常用60余种工具方法「JS篇」》

《箭头函数和常规函数之间的 5 个区别》

《通过发布/订阅的设计模式搞懂 Node.js 核心模块 Events》

《「前端篇」不再为正则烦恼》

《「速围」Node.js V14.3.0 发布支持顶级 Await 和 REPL 增强功能》

《深入细品浏览器原理「流程图」》

《JavaScript 已进入第三个时代，未来将何去何从？》

《前端上传前预览文件 image、text、json、video、audio「实践」》

《深入细品 EventLoop 和浏览器渲染、帧动画、空闲回调的关系》

《推荐13个有用的JavaScript数组技巧「值得收藏」》

《前端必备基础知识：window.location 详解》

《不要再依赖CommonJS了》

《犀牛书作者：最该忘记的JavaScript特性》

《36个工作中常用的JavaScript函数片段「值得收藏」》

《Node + H5 实现大文件分片上传、断点续传》

《一文了解文件上传全过程（1.8w字深度解析）「前端进阶必备」》

《【实践总结】关于小程序挣脱枷锁实现批量上传》

《手把手教你前端的各种文件上传攻略和大文件断点续传》

《字节跳动面试官：请你实现一个大文件上传和断点续传》

《谈谈前端关于文件上传下载那些事【实践】》

《手把手教你如何编写一个前端图片压缩、方向纠正、预览、上传插件》

《最全的 JavaScript 模块化方案和工具》

《「前端进阶」JS中的内存管理》

《JavaScript正则深入以及10个非常有意思的正则实战》

《前端面试者经常忽视的一道JavaScript 面试题》

《一行JS代码实现一个简单的模板字符串替换「实践」》

《JS代码是如何被压缩的「前端高级进阶」》

《前端开发规范：命名规范、html规范、css规范、js规范》

《【规范篇】前端团队代码规范最佳实践》

《100个原生JavaScript代码片段知识点详细汇总【实践】》

《关于前端174道 JavaScript知识点汇总（一）》

《关于前端174道 JavaScript知识点汇总（二）》

《关于前端174道 JavaScript知识点汇总（三）》

《几个非常有意思的javascript知识点总结【实践】》

《都2020年了，你还不会JavaScript 装饰器？》

《JavaScript实现图片合成下载》

《70个JavaScript知识点详细总结（上）【实践】》

《70个JavaScript知识点详细总结（下）【实践】》

《开源了一个 JavaScript 版敏感词过滤库》

《送你 43 道 JavaScript 面试题》

《3个很棒的小众JavaScript库，你值得拥有》

《手把手教你深入巩固JavaScript知识体系【思维导图】》

《推荐7个很棒的JavaScript产品步骤引导库》

《Echa哥教你彻底弄懂 JavaScript 执行机制》

《一个合格的中级前端工程师需要掌握的 28 个 JavaScript 技巧》

《深入解析高频项目中运用到的知识点汇总【JS篇】》

《JavaScript 工具函数大全【新】》

《从JavaScript中看设计模式(总结)》

《身份证号码的正则表达式及验证详解(JavaScript，Regex)》

《浏览器中实现JavaScript计时器的4种创新方式》

《Three.js 动效方案》

《手把手教你常用的59个JS类方法》

《127个常用的JS代码片段，每段代码花30秒就能看懂-【上】》

《深入浅出讲解 js 深拷贝 vs 浅拷贝》

《手把手教你JS开发H5游戏【消灭星星】》

《深入浅出讲解JS中this/apply/call/bind巧妙用法【实践】》

《手把手教你全方位解读JS中this真正含义【实践】》

《书到用时方恨少，一大波JS开发工具函数来了》

《干货满满!如何优雅简洁地实现时钟翻牌器(支持JS/Vue/React)》

《手把手教你JS 异步编程六种方案【实践】》

《让你减少加班的15条高效JS技巧知识点汇总【实践】》

《手把手教你JS开发H5游戏【黄金矿工】》

《手把手教你JS实现监控浏览器上下左右滚动》

《JS 经典实例知识点整理汇总【实践】》

《2.6万字JS干货分享，带你领略前端魅力【基础篇】》

《2.6万字JS干货分享，带你领略前端魅力【实践篇】》

《简单几步让你的 JS 写得更漂亮》

《恭喜你获得治疗JS this的详细药方》

《谈谈前端关于文件上传下载那些事【实践】》

《面试中教你绕过关于 JavaScript 作用域的 5 个坑》

《Jquery插件（常用的插件库）》

《【JS】如何防止重复发送ajax请求》

《JavaScript+Canvas实现自定义画板》

《Continuation 在 JS 中的应用「前端篇」》







企业级开源项目：

https://blog.csdn.net/Mia_csdn/article/details/105701899