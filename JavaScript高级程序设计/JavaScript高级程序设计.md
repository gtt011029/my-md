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

