### 一、let & const 

#### 1、let

​	1、只在代码块中有效（在块级作用域中生效）

​	2、不存在变量提升

​	3、存在暂时性死区：只要块级作用域内存在`let`命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

​	4、不允许重复声明



#### 2、块级作用域

let实际上是为JavaScript新增了块级作用域



#### 3、const命令

声明一个只读的常量，一旦声明，常量的值就不能改变

作用域与let相同，只在块级作用域中生效

本质：并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动（保存的只是一个指向实际数据的指针）



### 二、解构赋值

解构：从数组和对象中提取值，对变量进行赋值，称之为解构

解构赋值允许事先定义默认值

```js
let [x, y = 'b'] = ['a']; // x='a', y='b'
```



#### 1、交换变量的值

![1564646316040](img/不申明第三个数，交换两个变量的值)

#### 2、提取json数据

![1564647005172](img/解构，提取json数据)







### 三、字符串的扩展

#### 1、字符串也可以遍历

```js
for (let item of 'abcd') {
  console.error(item)
}
```

#### 2、模板字符串

键盘左上角   

模板字符串中嵌入变量，需要将变量名写在`${}`之中。 

```js
rpc._delete(`accesskeys/${uuid}/backup-storage/${bs}`)
```



#### 3、新增的方法

1、==includes（）==：返回布尔值，表示是否找到了参数字符串

2、==startsWith（）==：返回布尔值，表示字符串是否在原字符串的头部

3、==endsWith（）==：返回布尔值，表示字符串是否在原字符串的尾部

例：‘aaaaa’.includes(‘aaa’)   => true

4、==repeat（）==，返回一个新的字符串，表示将原字符串重复几次

例：’qq‘.repeat(2)   =>‘qqqq’

5、==padStart()  、 padEnd()==  ：头部/尾部补全    es8的特性

例：'x'.padStart(5, 'ab')    => 'ababx'

6、==trimStart()，trimEnd()==  ： 去除头部/尾部空白字符，形成新的字符串，原有的字符串不会改变

例：’       aaa     ‘.trimStart()    => ‘aaa	 ’     es10的特性

7、==matchAll()== ：方法返回一个正则表达式在当前字符串的所有匹配，  es10的特性





### 四、正则的扩展



#### 1、正则对象的方法

test（）：检测指定的字符串是否符合当前的正则、返回布尔

exec（）：找到指定字符串中符合条件的内容，返回数组

例：//



#### 2、String对象的方法

match()、replace()、search()和split()



### 五、数值的扩展

#### 1、常见方法

==Math.trunc()==：方法用于去除一个数的小数部分，返回整数部分；那对于非数值，会先转换为数值

==Math.sign()==：方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。

==Math.cbrt()==：方法用于计算一个数的立方根。

==指数运算符==：注意这边不是平常的左结合，而是右结合

```javascript
2 ** 2 // 4
2 ** 3 // 8
```

#### 2、扩展运算符

```js
console.log(...[1, 2, 3])
// 1 2 3
```



### 六、函数的扩展

#### 1、函数参数添加默认值

可以与解构结合

#### 2、 reset参数 …

多个参数变数组

```js
function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10
```



箭头函数：函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象

箭头函数里面根本没有自己的this，而是引用外层的this

由于箭头函数this的原因，用于解决定时器里this.XXX更改，函数外部不起作用的问题

使用注意点：

（1）函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象。

（2）不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误。

（3）不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

（4）不可以使用`yield`命令，因此箭头函数不能用作 Generator 函数。

```javascript
// ES6
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

// ES5
function foo() {
  var _this = this;

  setTimeout(function () {
    console.log('id:', _this.id);
  }, 100);
}
```

==函数式编程的柯里化的意思是将多个参数的函数转换成单参数的形式==







### 七、数组的扩展



```js
const arrLike = { 0: 'foo', 1: 'bar', 2: 'baz', length: 3 };
const arr = array.from(arrLike)
//array.from()将一个类数组对象转化成一个对象
```



数组是==复合的数据类型==，如果复制的话，只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组

…扩展数组：此时push也可以push数组

```javascript
// ES6的写法
function f(x, y, z) {
  // ...
}
let args = [0, 1, 2];
f(...args);
```

复制数组：

```javascript
const a1 = [1, 2];
// 写法一
const a2 = [...a1];
// 写法二
const [...a2] = a1;

这两种方法是clone
```

合并数组：

```javascript
// ES6 的合并数组
[...arr1, ...arr2, ...arr3]

这种方法是浅拷贝（使用的时候需注意）
```

将字符串转化为数组：

```javascript
[...'hello']
// [ "h", "e", "l", "l", "o" ]
```



### 八、对象的扩展

#### 1、属性名表达式

```javascript
// 方法一
obj.foo = true;

// 方法二
obj['a' + 'bc'] = 123;
```

上面代码的方法一是直接用标识符作为属性名，方法二是用表达式作为属性名，这时要将表达式放在方括号之内。

```
Object.assign(target, ...sources)   //用于将所有可枚举属性的值从一个或多个源对象复制到目标对象，并返回目标对象

target：目标对象
source：源对象
Object.assign可以用来处理数组，但会把数组视为对象
```

#### 2、Object.assign 常见用途

1、为对象添加属性：

```javascript
class Point {
  constructor(x, y) {
    Object.assign(this, {x, y});
  }
}
```

2、为对象添加方法

```javascript
Object.assign(SomeClass.prototype, {
  someMethod(arg1, arg2) {
    ···
  },
  anotherMethod() {
    ···
  }
});

// 等同于下面的写法
SomeClass.prototype.someMethod = function (arg1, arg2) {
  ···
};
SomeClass.prototype.anotherMethod = function () {
  ···
};
```

#### 3、super

指向当前对象的原型对象

#### 4、对象的解构赋值…

从目标对象取值，组合成指定对象

注意这边是浅拷贝，如果对象的某个值是复合类型的值（数组、对象、函数），那么拷贝的是地址，而不是值

```js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }
```

#### 5、对象的扩展运算符…

 用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。 

```js
let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }
```



### 十三、Set 和 Map 数据解构

#### 1、set

新的数据结构，类似于数组，但是成员的值是唯一的，没有重复的值

Set本身是一个构造函数，用来生成Set数据结构

![1564650236329](img/Set)

==去除数组中重复成员的方法：[…new Set(array)]==

==去除重复字符：[…new Set(‘ababas’)].join(‘’)==



==set的属性和方法：==

s = new Set ();

s.add()  //添加成员

s.size()   //成员总数

s.has()  //判断是否存在该成员

s.delete()  //删除成员



Array.from方法可以将Set结构转化为数组

![1564651365210](img/set，数组去重)





可以遍历foreach





#### 2、WeakSet

与set相似，但成员只能是对象



#### 3、Map

相对于object结垢提供的‘字符串---值’，map提供了‘值–---值’

```javascript
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false
```



### 十四、proxy 拦截

在访问、修改目标对象target之前，设置的一个拦截，proxy

基本上都是修改对象的get和set方法

有些对象里的值可以读，有些不可以读，有些可以改，有些不可以改

```js
var  proxyExample = new  Proxy(target, handler);

target：所要拦截的目标对象，原对象
handler：也是一个对象，用来制定拦截行为（get、set）
proxyExample： 生成的proxy的实例，这边写好之后，如果想要使用target对象，就用proxyExample
```



### 十六、promise对象