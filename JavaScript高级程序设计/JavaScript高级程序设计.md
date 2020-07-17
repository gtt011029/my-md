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