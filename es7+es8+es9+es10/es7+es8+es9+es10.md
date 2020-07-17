##  ES7新特性

 ES7在ES6的基础上添加了三项内容：**求幂运算符（\**）**、**Array.prototype.includes()**方法、函数作用域中严格模式的变更。 



### 1、求幂运算符 **

```js
Math.pow（4,2）== 4 ** 2 
```



### 2、array 的 includes方法

查找数组里有没有存在某个值，返回为布尔值，入参为两个，第一个参数为要找的值，第二个参数为从index为几开始找

```js
['a', 'b', 'c', 'd'].includes('b') // true
['a', 'b', 'c', 'd'].includes('b', 1) // true
['a', 'b', 'c', 'd'].includes('b', 2) // false
```

类似 indexOf 方法： indexOf 返回当前查找的值在数组中的index，如果不存在返回-1



### 3、函数作用域中严格模式的变更

**下面的为原来严格模式的定义**

添加"use strict" 说明当前函数为严格模式

1.变量必须声明才能使用（在正常模式中，如果一个变量没有声明就赋值，默认是全局变量。严格模式禁止这种写法）

2.禁止使用with语句（因为with语句无法在编译时就确定，属性到底归属于哪个对象，严格模式有利于编译效率提高）

3.创建eval作用域（正常模式下，js有两种变量作用域，全局作用域和局部作用域，正常模式下eval语句作用域取决于它处于全局作用域还是函数作用域，严格模式下eval语句本身就是作用域，不能够生成全局变量，所生成的变量只能用于eval内部）

4.禁止this关键字指向全局对象(严格模式下全局作用域中定义的函数中的this为undefined)

5.禁止在函数内部遍历调用栈( caller:调用当前函数的函数的引用，即外层函数的引用； )

```
function f1(){
    "use strict";
    f1.caller; //报错
    f1.arguments; //报错
}
f1();
```

6.严格模式下无法删除变量。只有conifgurable设置为true的对象属性才能被删除

```
"use strict"

var x ;

delete x; //严格模式下报语法错误

var o = Object.create(null,{'x':{

    value: 1,

    configurable: true

}})

delete o.x; //删除成功
```

7.显示报错（正常模式下对一个对象的只读属性进行赋值，不会报错，只会默默失败。严格模式下将报错）

```
"use strict";

var o = {};

Object.defineProperty(o,"v",{value: 1,writable: false});

o.v = 2; //报错，因为o.v属性是不能被修改的，严格模式会报错，正常模式会失败但不报错
```

8.严格模式下，对禁止扩展的对象添加新属性，会报错

```
"use strict";

var o = {};

Object.preventExtensions(o);//禁止o对象有拓展属性

o.v = 1; //报错
```

9.严格模式下，删除一个不可删除的属性，报错

```
"use strict";
delete Object.prototype; //报错
```

10.对象拥有多个同名属性，严格模式报错。正常模式会默认值为最后一个

11.函数不能有重名的参数，严格模式会报错，正常模式可以通过arguments[i]来获取对应的参数

12.禁止八进制写法，正常情况下整数第一位为0代表八进制，严格模式下整数第一位为0则报错

13.不准对arguments赋值

14.严格模式下的arguments不在追踪参数的变化

```
function fn(a){
    a=2;
    return [a,arguments[0]];
}
fn(1); //正常模式返回值 [2,2]
"use strict"
function fn(a){
    a = 2;
    return [a,arguments[0]];
}
fn(1); //严格模式返回值 [2,1] 参数传进来是多少就是多少，arguments不会变化
```

15.禁止使用arguments.callee（无法在匿名函数内部调用自身了。arguments.callee指向的就是该函数本身）

```
var f = function (){
    return arguments.callee;
}
f(); //报错
```

**总结：**推荐使用严格模式，因为能让代码更规范，也更利于后期的维护和排除错误。更加严谨。





## ES8新特性

### 1、异步函数（async function）

由于js是单线程，所以异步编译就变得比较重要

以前就是嵌套，回调函数解决问题，但是如果操作异步操作比较多的情况下，容易造成地狱回调

解决方法有：

1、promise，把回调函数的嵌套改成了链式调用.then()执行，这边只是回调函数的改进，看起来清楚一点

缺点：代码冗余，一大堆的then

2、异步编程的机制：Generator；两大特征：function与函数名之间有一个*号，函数体内部使用yield表达式，定义不同的内部**状态**（英文：‘产出’）

```js
function* helloWorldGenerator() {
yield 'hello';
yield 'world';
return 'ending';
}

var hw = helloWorldGenerator();
```

调用Generator函数后，该函数并不执行，返回的也不是函数的运行结果，而是一个指向内部状态的指针对象，必须调用遍历器对象的next方法，使得指针移向下一个状态。也就是说每次调用next，内部指针就会向下执行，直到遇到下一个yield或者return暂停，这边可以看出Generator是分段执行的

yield表达式是暂停执行的标志，next是恢复执行

```
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```

缺点：流程管理可能不是很方便，例如何时执行第一部分，何时执行第二部分



es8引入async：Generator的语法糖

就是经常使用的async/await





### 2、Object.entries()和Object.values()

entries：简言之就是object转二维数组

如果一个对象是具有键值对的数据结构，则每一个键值对都将会编译成一个具有两个元素的数组，这些数组最终会放到一个数组中，返回一个二维数组。简言之，该方法会将某个对象的可枚举属性与值按照二维数组的方式返回。若目标对象是数组时，则会将数组的下标作为键值返回。例如： 

```js
Object.entries({ one: 1, two: 2 }) //[['one', 1], ['two', 2]]
Object.entries([1, 2]) //[['0', 1], ['1', 2]]

Object.entries({ [Symbol()]: 1, two: 2 }) //[['two', 2]]
// 键值对中，如果键的值是Symbol，编译时将会被忽略。

Object.entries({ 3: 'a', 4: 'b', 1: 'c' }) //[['1', 'c'], ['3', 'a'], ['4', 'b']]
// 一般情况下返回的顺序与for相同，但是如果key为数字的话，就会按照数字大小进行排序
```



values：返回键值对中value组成的数组

关于顺序跟enties相同

```js
Object.values({ one: 1, two: 2 }) //[1, 2]
Object.values({ 3: 'a', 4: 'b', 1: 'c' }) //['c', 'a', 'b']
```



### 3、字符串填充padStart 、padEnd

目的：保证字符串长度

参数：两个，第一个为目标字符串长度，第二个为如果当前字符串长度不够用什么填充，如果不写第二个参数，默认用‘空’填充

padStart ：头填充

padEnd：尾填充

```js
'Vue'.padStart(10, '_*') //'_*_*_*_Vue'
'React'.padStart(10, 'Hello') //'HelloReact'
'JavaScript'.padStart(10, 'Hi') //'JavaScript'
'JavaScript'.padStart(8, 'Hi') //'JavaScript'
```



### 4、Object.getOwnPropertyDescriptors()

返回目标对象中所有属性的描述符，该属性必须是对象自己定义的，不能从原型链继承来的

参数：两个，第一个参数：目标对象， 第二个参数：目标对象的指定属性，如果不写的话返回所有属性

```js
let obj = {
 id: 1,
 name: 'test',
get gender() {
   console.log('gender')
},
set grade(g) {
   console.log(g)
}
}
Object.getOwnPropertyDescriptors(obj)

//输出结果为：
{
 gender: {
   configurable: true,
   enumerable: true,
get: f gender(),
set: undefined
},
 grade: {
   configurable: true,
   enumerable: true,
get: undefined,
set: f grade(g)
},
 id: {
   configurable: true,
   enumerable: true,
   value: 1,
   writable: true
},
 name: {
   configurable: true,
   enumerable: true,
   value: 'test',
   writable: true
}
}

// 填写第二个参数的情况
let obj = {
 id: 1,
 name: 'test',
get gender() {
   console.log('gender')
},
set grade(g) {
   console.log(g)
}
}
Object.getOwnPropertyDescriptors(obj, 'id')

//输出结果为：
{
 id: {
   configurable: true,
   enumerable: true,
   value: 1,
   writable: true
}
}
```



拷贝：Object.assign() 只能拷贝一个属性的值，不会拷贝其背后的复制方法和取值方法

 Object.getOwnPropertyDescriptors() 作用：为了解决assign无法正确拷贝get、set属性的问题，配合 bject.defineProperties 使用

```js
let obj = {
 id: 1,
 name: 'test',
get gender() {
   console.log('gender')
}
}
let obj1 = {}
Object.defineProperties(obj1, Object.getOwnPropertyDescriptors(obj))
Object.getOwnPropertyDescriptors(obj1)

//输出结果为：
{
 gender: {
   configurable: true,
   enumerable: true,
get: f gender(),
set: undefined
},
 id: {
   configurable: true,
   enumerable: true,
   value: 1,
   writable: true
},
 name: {
   configurable: true,
   enumerable: true,
   value: 'test',
   writable: true
}
}
```





## ES9新特性

### 1、for await of （异步遍历器）

用来遍历异步迭代器，会等待前一位成员状态改变后才会遍历下一位成员

ps：感觉这个还是比较有用的，这样可以及时得到每次遍历的结果

```js
function Gen (time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(time)
    }, time)
  })
}
async function test () {
  let arr = [Gen(2000), Gen(100), Gen(3000)]
  for await (let item of arr) {
    console.log(Date.now(), item)
  }
}
test()
// 1575536194608 2000
// 1575536194608 100
// 1575536195608 3000
```

其他的新特性感觉没什么用



## ES10新特性

### 1、Array.prototype.flat()

作用：数组扁平化

参数：一个，指定要提取嵌套数组的结构深度，默认值为 1，默认就是扁平化一层

```js
const numbers1 = [1, 2, [3, 4, [5, 6]]]
console.log(numbers1.flat())// [1, 2, 3, 4, [5, 6]]
```



### 2、 Array.prototype.flatMap() 

作用：扁平化一层的map方法，感觉没什么用

```js
let arr = [1, 2, 3]
console.log(arr.map(item => [item * 2]).flat()) // [2, 4, 6]
console.log(arr.flatMap(item => [item * 2])) // [2, 4, 6]
```



###  3、Object.fromEntries() 

作用： Object.entries() 相反的方法，二维数组转对象

```js
const object = { x: 23, y:24 };
const entries = Object.entries(object); // [['x', 23], ['y', 24]]
const result = Object.fromEntries(entries); // { x: 23, y: 24 }
```



### 4、String.trimStart 和 String.trimEnd 

作用：清除字符串左右的空白段，

trimStart ：别名trimLeft

trimEnd ： 别名trimRight

trim：清除两边的空白段



### 5、try   catch

作用：就是不需要在catch中传error了，感觉没什么用

```js
// ES10 之前
try {
  // tryCode
} catch (err) {
  // catchCode
}


// ES10
try {
  console.log('Foobar')
} catch {
  console.error('Bar')
}
```

