文档： https://ts.xcatliu.com/ 



## 理解：

js的超集，主要提供类型系统和对es6的支持



有一定的学习成本：需要理解接口（interfaces）、泛型（Generics）、类（Classes）、枚举类型（Enums）等概念



## 1、数据类型

基本数据类型：（原始类型）（值传递）

按值访问的：我们可以操作保存在变量中的实际的值

在内存中占据固定的大小的空间，被保存在栈内存中

boolean、number、undefined、null、string、symbol



引用数据类型：（对象类型）（址转递）

数据保存在堆区、栈区中保存的只是堆区对应的地址

引用数据类型的值可以改变，可以添加属性和方法

function、object、array、data







### 1.1、空值

JavaScript没有空值（void）的概念，在ts中，可以用void表示没有任何返回值的函数

例：

```js
function alertName(): void {
	alert('name')
}
```





### 1.2、null、undefined和void的区别：

undefined和null是所有类型的子类型，也就是说，undefined类型的变量可以赋值给number类型的变量(就是说undefined和null可以赋值给任何类型)

```js
let num: number = undefined
```





### 1.3、任意值：

这里就不做类型要求任意类型都是ok的

如果有未声明类型的变量，默认为任意值

```js
let myData: any = 'string'
myData = 7
myData = false
```







## 2、类型推论

ts会在没有明确指定类型的时候进行类型推论

例如：

```js
let myData = 'string'
myData = 7    //这边会报错
```

原因是：定义变量的时候给其默认值为string类型，那ts类型推论就会认为是string类型，再次赋值number类型就会报错

```js
let myData
myData = 'string'
myData = 7     //这边就不会报错
```

原因是：定义变量的时候没有给其赋初值，类型推论就会认为是any类型，后面赋任何类型的值都不会报错



## 3、联合类型

这边可以理解为设为多种类型，以或（|）的方式展现

例：

```js
let myData: string | number
myData = 'string'
myData = 7   //这边都是ok的
```

注意：这边并不确定myData到底是什么类型，那只能用其类型的公有的属性和方法





## 4、interfaces（对象的类型----接口）

在面向对象的语言中，接口是一个重要的概念

它是==对行为的抽象==

而具体如何行动需要由类（classes）去实现

ts中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对对对象的形状（shape）进行描述     -------------->不懂这句话是什么意思

例：

```js
interface Person {
	name: string,
	age: number
}
let tom: Person  {
	name: 'tom',
	age: 25
}
```

接口规范：一般首字母大写，有的编程语言建议接口的名称加上I前缀

定义的变量的注意点：不允许少属性、不允许多属性



### 4.1、可选属性 ？

希望不完全匹配可以使用

```js
interface Person {
	name: string,
	age?: number
}
let tom: Person = {
	name: 'tom'
}   //这边是ok的，age为可选属性，但这边仍然是不可以添加未定义的属性
```





### 4.2、任意属性 [propName: string]: any

之前都是不可以添加未定义的属性，这边可以为未定义的属性留一个空位

```js
interface Person {
	name: string,
	age?: number,
	[propName: string]: any
}
let tom: Person = {
	name: 'tom',
	gender: 'male'    //上述空出来的位置填上去的东西
}
```



### 4.3、只读属性 readonly

这边的意思就是初始化定义之后就不可以被改变了

例：

```js
interface Person {
	readonly id: number,
	name：string,
	age?: number,
	[propName: string]: any
}

let tom: Person = {
	id: 1111,
	name: 'tom',
	gender: 'male'
}

tom.id = 222 //这边就会报错，id是readonly，只读一旦赋值不可更改
```





## 5、数组的类型

### 5.1、类型+[] 表示法

例：

```
let array: number[] = [1, 2, 3, 5]      //这边的类型是数组每项的类型
```



### 5.2、数组泛型

。。。。。。





## 、泛型（Generics）

指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特征

