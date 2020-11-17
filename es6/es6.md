### 一、let & const 

全局作用域、函数作用域、块级作用域(let、有大括号{}的区域 没有大括号的话js引擎认为不存在块级作用域)

外层作用域拿不到内层let定义的数据，反之可以。

注意：ES5规定：函数作用域不能在块级作用域之中声明，只能在顶层作用域和函数作用域之中声明

但是浏览器没有遵守这个规定，还是支持的。

ES6规定是可以的，定义类似let，作用域外不可使用。



ES6在附录B里规定，浏览器的实现可以不遵守上面的规定，有自己的行为

***1、允许在块级作用域内声明函数***

***2、函数的声明类似于var，即会提升到全局作用域或函数作用域的头部***（ps：类似于var的意思就是，头部声明var fn = undefined；后面在赋值的地方赋值）

***3、同时，函数声明还会提升到所在的块级作用域的头部***

#### 1、let

​	1、只在代码块中有效（在块级作用域中生效）

​	2、不存在变量提升

​	3、存在暂时性死区：只要块级作用域内存在`let`命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

​	4、不允许重复声明



#### 2、块级作用域

let实际上是为JavaScript新增了块级作用域



#### 3、const命令

声明一个只读的常量，一旦声明，常量的值就不能改变

（但是如果赋值的是对象的话，对象里面的值是可以改变的。因为这个地方限制不变的是对象的地址，只要地址不变就行）。

**作用域与let相同，只在块级作用域中生效**

与let相同，声明并不提升，同样存在暂时性死区







####  4、函数声明的提升

```ts
fn(1);    // error: Uncaught TypeError: fn is not a function
fnTest(1)  // 函数声明： 1
var fn = function (value) {
  console.log('函数表达式： ', value);
}
function fnTest (value) {
  console.log('函数声明： ', value)
}
```



```ts
// 上面的代码相当于下面的代码
function fnTest (value) {
  console.log('函数声明： ', value)
}
var fn;
fn(1);
fnTest(1);
fn = function (value) {
   console.log('函数表达式： ', value); 
}
```



#### 5、6种声明变量的方法

var 、

function、

let

const、

import、

class



#### 6、顶层对象属性

在浏览器环境中指的是：window对象

node中： global对象

es5中：顶层对象的属性和全局变量是等价的

顶层对象的属性与全局变量挂钩，是javaScript设计的最大败笔之一

ES6为改变这一点且又保证兼容性，规定，var、function命令声明的全局变量，依旧是顶层对象的属性。

但let、const、class声明的全局变量不属于顶层对象的属性。也就是说从ES6开始，全局变量将逐步与顶层变量脱钩



```javascript
var a = 'a'
console.log(window.a)    // a

let b = 'b'
console.log(window.b)  // undefined
```





### 二、解构赋值

**解构：从数组和对象中提取值，对变量进行赋值，称之为解构**





#### 数组的解构赋值

解构赋值允许事先定义默认值

事实上，只要某种数据具有iterator接口，都可以采用数组形式的解构赋值。

本质上，这种写法属于“模式匹配”

```js
let [x, y = 'b'] = ['a']; // x='a', y='b'
```



##### 解构不成功与不完全解构

```javascript
let [a, b, c] = [1, 2]    // 解构不成功,但是可以成功

let [d, e, f] = [4, 5, 6, 7]  // 不完全解构，但是可以成功

console.log(a, b, c, d, e, f)  // 1, 2, undefined, 4, 5, 6

let [foo] = 1   // 这边就会报错，（简单的说，右边只要是不可遍历的结构，就会报错）


let [x, y, z] = new Set(['a', 'b', 'c'])  //对于set结构，也可以使用数组的解构赋值
```



##### 交换变量的值

![1564646316040](img/不申明第三个数，交换两个变量的值)







#### 对象的解构赋值

解构不仅可以用于数组，还可以用于对象

变量名与对象中的key必须匹配才可以进行赋值，如果不一样的话，必须这样

```javascript
let obj = {first: 'helllo', last: 'world'}
let {first: f, last: l} = obj
console.log(f, l)   // hello world
```

由此可以发现对象赋值的原理：
	先找到同名属性，然后再赋值给对应的变量。真正被赋值的是后者，而不是前者



注意点：

（1）如果将一个已经声明的变量用于解构赋值，必须非常小心

```javascript
let x;
{x} = {x: 1}   //  这边会报错，因为javaScript引擎会将{x}理解成一个代码块，从而产生语法错误。只有不将大括号写在首行，避免javaScript将其解释为代码块，才能解决这个问题。


//正确的写法
let x;
({x} = {x: 1})
```





#### 提取json数据

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
const arrLike = { 0: 'foo', 1: 'bar', 2: 'baz', length: 3 }
console.log(Array.from(arrLike))
console.log([].slice.call(arrLike)) /// slice会把通过索引位置获取的新的数组，该方法不会修改原数组，只是返回一个新的子数组.call会把this的指向改为传进去的obj
console.log([...arrLike]) // 我这了这个地方好像报错  三点运算符
//array.from()将一个类数组对象转化成数组   
// ["foo","bar","baz"]
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

新的**数据结构**，类似于数组，但是成员的值是唯一的，没有重复的值

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

与set相似，也是不重复的，但成员只能是对象，其中的对象都是弱引用（即垃圾回收机制不会考虑它，如果该函对象在其他地方不在引用了，就会被回收，不管weakSet是否引用，所以这边规定weakSet不可遍历）

```js
const ws = new WeakSet([[1,2], [3,4]])
console.log(ws)
// index 为key  value为value
```



#### 3、Map

类似于对象，也是键值对的集合，但是‘键’的范围不限于字符串，各种类型的值（包括对象）都可以当作键，也就是说object结构提供了‘字符串----值’的对应，map提供了‘值----值’的对应

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

手写promise

 https://www.jianshu.com/p/c633a22f9e8c 





### 十七、装饰器(@decorator )

解释：起源于python，主要作用是给一些已有的类和方法扩展一些新的行为，而不是去修改其本身

用来修改类的行为

是一个对类进行处理的函数（可以作用于类，也可以作用于类的属性）

```js
@decorator
class A {

}
// 等同于
class A {}
A= decorator(A)
```

装饰器在JavaScript中仅仅可以修饰类和属性，不能修饰函数（原因：存在函数的提升）

装饰器对类的行为的改变，是代表编译时发生的，而不是在运行时

装饰器能在编译阶段运行代码

装饰器是经典的AOP模式（设计模式----代理模式）的一种实现方式







### 十八、class

基本上，es6的class可以看作只是一个语法糖，它的绝大部分功能，es5都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已

构造函数的prototype属性，在es6的‘类’上面继续存在。事实上，类的所有方法都可以定义在类的prototype属性上面

取值函数（getter）和存值函数（setter）

与es5一样，在‘类’的内部可以使用get、set关键字，对某个属性设置存取函数和取值函数，拦截该属性的存取行为



class可以通过extends关键字实现继承，这比ES5的通过修改原型链实现继承，要清晰和方便很多

```
class Point {

}
class ColorPoint extends Point {

}
```

es5继承的实质：

先创建子类的实例对象this，然后再将父亲的方法添加到this上面（Parent.apply(this)）

es6的继承机制：

和es5完全不同，实质是将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this

```js
class ColorPoint extends Point {
    p() {
        return 2
    }
}

// 等同于
class ColorPoint extends Point {
  constructor(...args) {
    super(...args); // 作为函数调用，代表父类的构造函数，只能用在子类的构造函数中，es6要求，子类的构造函数必须执行一次super函数，注意其虽然代表父类的构造函数，但是返回的是子类的实例，即super内部的this指的是子类的实例，相当于   父类.prototype.constructor.call(this)
    console.log(super.p())   // 2
      // 作为对象时，在普通方法中指向父类的原型，在静态方法中，指向父类
  }
}
```

```js
class Point {
  p() {
    return 11
  }
}

class PointColor extends Point {
  constructor() {
    super()    // 作为方法， 代表父类的构造函数
    console.log(super.p)   // 最为对象，指向父类的原型
  }
  pp() {
    return 33
  }
}

const pointColor = new PointColor
console.log(pointColor)
```



### 十九、async

generator函数的语法糖

就是将generator函数的*替换成async，yield替换成await