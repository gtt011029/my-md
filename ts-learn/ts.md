文档： https://ts.xcatliu.com/ 

深入理解ts： https://jkchao.github.io/typescript-book-chinese/typings/enums.html    感觉这本书不错

快速介绍： [https://midwayjs.org/midway/ts_start.html#%E5%BA%94%E7%94%A8%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84](https://midwayjs.org/midway/ts_start.html#应用目录结构) 



## 理解：

js的超集，主要提供类型系统和对es6的支持，提供静态类型系统

增加代码的可读性和可维护性，类型系统是最好的文档

有一定的学习成本：需要理解接口（interfaces）、泛型（Generics）、类（Classes）、枚举类型（Enums）等概念



## 关于导入和导出：

直接export就可以

```js
// js 写法
function alert() {
}
exports.alert = alert;
exports.config = { a: 1 };




// ts 写法
export function alert() {
}

export const config = { a: 1 };
```



## 1、数据类型（原始类型）

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



### 1.3、任意值：any

这里就不做类型要求任意类型都是ok的，这边就好像ts开的一个后门，关闭ts，这边的类型可以随便定义

如果有未声明类型的变量，默认为任意值

```tsx
let myData: any = 'string'
myData = 7
myData = false
```



## 2、类型推论

ts会在没有明确指定类型的时候进行类型推论

例如：

```tsx
let myData = 'string'
myData = 7    //这边会报错  这边给推论成string类型
```

原因是：定义变量的时候给其默认值为string类型，那ts类型推论就会认为是string类型，再次赋值number类型就会报错

```tsx
let myData
myData = 'string'
myData = 7     //这边就不会报错  这边默认any了
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

在面向对象的语言中，接口是一个重要的概念，它是==对行为的抽象==

解释为对对象形状的描述：ps：描述这个对象，里面有什么字段，每个字段是什么类型，就是一个对象的文档

**注意：接口的命名必须首字母大写**

而具体如何行动需要由类（classes）去实现

能合并众多类型声明至一个类型声明

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

希望不完全匹配可以使用，加问号（？）

这边呢，就是可以有，也可以没有

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

用法：Array<eleType>

```tsx
let fibonacci: Array<number> = [1, 1, 2, 3, 5];
```



## 6、函数类型

### 6.1、函数声明

一个函数中有输入和输出要把两个地方都考虑到，输入参数的个数和类型，输出数值的类型

例：

```js
function sum (x: number, y: number): number {
	reutrn x + y
}

sum(3, 6)  //注意：这边多参和少参都是不被允许的
```



### 6.2、函数表达式

错误的例子：

```js
let sum = function (x: number, y: number): number {
	return x + y
}
// 这边这样虽然可以编译，但其实是对匿名函数进行了函数定义，sum还是会根据赋值进行类型推论
```



正确的例子：

```
let sum (x: number, y: number) => number = function (x: number, y: number): number {
	return x + y
}
```

==ts中的=>==

在ts中=>用来表示函数的定义，左边是输入类型，右边是输出类型



### 6.3、用接口定义函数的形状

```tsx
interface SearchFunc {
    (source: string, subString: string): boolean
}
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1
}

// 就是把上面函数表达式的那一段提出来，感觉这样写比较干净明了，可读性较高
```







### 6.4、重载

重载允许一个函数接受不同数量或类型的参数时，做出不同的处理

ps：自我感觉并不是什么大的新的概念，感觉就是声明合并

```js
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```



## 7、类型断言

类型断言（Type Assertion） 可以用来==指定一个值的类型==

语法：值 as 类型      或     <类型>值

类型断言只能够欺骗ts编译器，无法避免运行时的错误

注意：这边切不可滥用，我感觉最好不用

这边就不想看了

```js
interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}

function isFish(animal: Cat | Fish) {
    if (typeof (animal as Fish).swim === 'function') {
        return true;
    }
    return false;
}
```



## 8、类型别名

用来给类型起一个别名，我们使用type创建一个类型别名，

```js
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}


type sex = 'man' | 'woman'
function getGender(gender: sex) {
    return gender
}
```



## 9、字符串字面量类型

用来约束取值只能是某几个字符产中的一个，

ps：我擦勒，就在这，我还给忘记了

```js
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}

handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
handleEvent(document.getElementById('world'), 'dbclick'); // 报错，event 不能为 'dbclick'
```



## 10、元组

数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象

ps：感觉规定有点死呢，每一项必须是指定的类型

```js
let tom: [string, number];
tom[0] = 'Tom'
tom[1] = 25    //赋值一个已知索引的元素时，这边并不是必须要赋值的，也可以只赋值一项
```

```js
let tom: [string, number]
tom = ['Tom']   //对元素变量进行初始化赋值的时候必须复制满 不然会报错
tom = ['Tom', 25]  //这边才是正确的
```

### 10.1越界元素

当添加越界元素时，它的类型被限制为元组中类型的联合类型

-----当添加比指定多的元素时，多出的元素的类型必须为指定类型中的一种

```js
let tom: [string, number]
tom = ['tom', 25]
tom.push('male')
tom.push(true) //这边就会报错，true为boolean类型，不属于 string、number中的任何一种
```



## ==11、枚举 enum（得加深了解）==

ps：感觉脑袋里不怎么有枚举的概念呀，这边和字符串字面量类型有什么区别呢

枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只有七天，颜色限定为红绿蓝等

是组织收集有关联变量的一种方式

ps：感觉默认为数字枚举，但好像平常中大多用字符串枚举

例：

```js
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat}
// 枚举成员会被赋值为数字，0、1、2、3这样按顺序赋值
console.log(Days['Sum'] === 0)   // true
console.log(Day['Tue'] === 2)    // true

console.log(Day[0] === 'Sum')    //true
console.log(Day[2] === 'Tue')    //true
```

### 11.1、手动赋值

这边也是可以手动赋值的

```js
enum Days {Sun = 7, Mon = 2, Tue, Wed, Thu, Fri, Sat}
console.log(Day['Sun'] === 7)   //手动赋值 true
console.log(Day['Mon'] === 2)   //手动赋值 true
console.log(Day['Tue'] === 3)   //会跟着上一个数进行递增  true
console.log(Day['Wed'] === 4)   //会跟着上一个数进行递增  true
console.log(Day['Thu'] === 5)	//会跟着上一个数进行递增  true
console.log(Day['Fri'] === 6)	//会跟着上一个数进行递增  true
console.log(Day['Sat'] === 7)	//会跟着上一个数进行递增  且即使重合ts也察觉不到 true
// 这边Day[7]的值首先是Sun 后来又被Sat覆盖了
// ps: 觉得还是不要手动赋值的好
```

==注意：手动赋值可以不是数字，使用类型断言让tsc无视类型检查即可，且手动赋值也可以为小数或者负数，递增速度依旧为1==

```
enum Days {Sun = 7, Mon = 2, Tue, Wed, Thu, Fri, Sat = <any>"S"}
```

上述所说的都是普通枚举

### 11.2、常数枚举

常数枚举是使用const enum 定义的枚举类型

```js
const enum Directions {
	Up,
	Down,
	Left,
	Right
}
let direction = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]
```

注意：常量枚举和普通枚举的区别是，==他会在编译阶段被删除，并且不能包含计算成员==

上述代码会被编译成

```js
let direction = [0, 1, 2, 3]
```

```js
const enum Direction {
	Up,
	Down,
	Left,
	Right = 'Right'.length   //这边就会报错，不能包含计算成员
}
```



### 11.3、外部枚举

外部枚举是使用declare enum定义的枚举类型

```js
declare enum Directions {
	Up,
	Down,
	Left,
	Right
}
let direction = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]
```

==declare定义只会用于编译时的检查，编译结果中会被删除==

上述代码编译结果为：

```js
var directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```



外部枚举与声明语句一样，常出现在声明文件中

同时使用declare和const也是可以的，效果等于const结果

```js
declare const enum Directions {
	Up,
	Down,
	Left,
	Right
}
let direction = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]
```





## 12、类（class）

类（class）：定义了一件事物的抽象特点，包含它的属性和方法

对象（object）：类的实例，通过new生成

抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类的抽象方法必须在子类中被实现

接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现。一个类只能继承另一个类，但是可以实现多个接口



### 12.1、es6中类的用法

这边是仿照面向对象语言的class的方法

#### 12.1.1、属性和方法

使用class 定义类、constructor定义构造函数，一个类如果没有给其定义构造函数，系统会默认一个空的构造函数

这边通过new生成实例的时候，会自动调用构造函数

```js
class Animal {
  constructor (name) {
    this.name = name
  }
  sayHi () {
    return 'hi ' + this.name
  }
}

let dog = new Animal('dog')
console.log(dog.sayHi())
```



#### 12.1.2、类的继承（extends）

使用extends继承，子类中==使用super关键字来调用父类的构造函数和方法==

```js
class Animal {
  constructor (name) {
    this.name = name
  }
  sayHi () {
    return 'hi ' + this.name
  }
}

class cat extends Animal {
  constructor(name) {
    super(name)   //调用父类的constructor
    console.log(this.name)
  }
  sayHi() {
    return super.sayHi()
  }
}
let newCat = new cat('cat')    // cat
console.log(newCat.sayHi())		// hi cat
```



#### 12.1.3、存取器

这边呢就是可以通过get 、set 方法改变属性的赋值和读取行为，感觉这边可以当校验和拦截器使用

```js
class Animal {
  constructor (name) {
    this.name = name
  }
  get name () {
    return 'Tack'
  }
  set name (value) {
    console.log('set ' + value)   //set dog 这边是你想要存进去的名字
  }
  sayHi () {
    return 'hi ' + this.name
  }
}

let dog = new Animal('dog')
console.log(dog.sayHi())   // hi jack 这边获取名字的时候get改变了名字（得到的最终结果的名字）
```

注意：这边的get、set方法必须同时使用，不可只有get没有set



#### 11.1.3、静态方法（static）

使用static修饰符的方法称为静态方法，这边不需要实例化，直接通过类来调用即可

```js
 class Animal {
  constructor (name) {
    this.name = name
  }
  static isAnimal (a) {
    return a instanceof Animal
  }
  get name () {
    return 'Tack'
  }
  set name (value) {
    console.log('set ' + value)
  }
  sayHi () {
    return 'hi ' + this.name
  }
}

let dog = new Animal('dog')
console.log(Animal.isAnimal(dog))   //true   类直接调用静态方法
console.log(dog.sayHi())
```



### 12.2、ts中类的用法

ps：感觉和C++对于类的定义是一样的，这边没什么好看的，和类型系统基本上没有太大的关系，给类（class）加上类型系统和接口类似

#### 12.2.1、访问修饰符

public、private、protected

public：共有的，类的外部可访问

private：私有的，类的外部不可访问，子类也不可使用

protected：被保护的，类的外部不可访问，子类内部可以使用



#### 12.2.2、参数属性

readonly（只读）

即除了初次赋值的时候，其他地方不可更改值



#### 12.2.3、抽象类（abstract）

1、不允许被实例化  不能够new 它实例化

2、抽象类可以被其他类继承，但是抽象类的方法必须被子类实现      //这边可以理解为，抽象类是多个类共有的属性和方法的组合

```tsx
abstract class Animal {
  public name;
  public constructor (name) {
    this.name = name
  }
  public abstract sayHi ();
}

class cat extends Animal {
  public sayHi () {
    return 'hi ' + this.name
  }
}
let newCat = new cat('cat')
console.log(newCat.sayHi())
```



#### 12.2.4、类的类型

实例的类型，就是它所new的类

```tsx
class Animal {
  name: string
  constructor (name: string) {
    this.name = name
  }
  sayHi (): string {
    return 'hi ' + this.name
  }
}
let cat: Animal = new Animal('cat')
console.log(cat.sayHi())

```



## 13、类（class）与接口（interface）

这边主要描述，对类的一部分行为进行描述

把不同的类之间的共同特性提取成接口，用inplements关键字来实现，大大提高了面向对象的灵活性

ps：感觉接口就是公有方法（name）的集合，但是这个方法实例是什么样的由每个类决定

### 13.1、类实现接口

==一个类可以实现多个接口==

例：门是一个类，防盗门是门的子类，这边如果想要把防盗门加上报警器的功能，那车子呢也有报警器的功能，那就可以把报警器的功能提取出来成为一个接口

```tsx
interface Alarm {
  alert()
}
interface Light {
  lightOn()
  lightOff()
}
class Door {
  public name;
  constructor(name) {
    this.name = name
  }
}

class ProtectedDoor extends Door implements Alarm {
  alert() {
    console.log('this id ProtectedDoor')
  }
}

class Car implements Alarm, Light {   //一个类可以实现多个接口，但必须实现接口中每个方法
  alert() {
    console.log('this is car')
  }
  lightOn() {
    console.log('this car light On')
  }
  lightOff() {
    console.log('this car light off')
  }
}

let newCar = new Car
newCar.alert()
```



### 13.2、接口继承接口

接口是可以继承接口的

```tsx
interface Light {
  lightOn(): void;
  lightOff(): void;
}
interface LightHigh extends Light{   //接口继承接口
  LightHigh(): void
}
class Car implements Alarm, LightHigh {
  alert() {
    console.log('this is car')
  }
  lightOn() {
    console.log('this car light On')
  }
  lightOff() {
    console.log('this car light off')
  }
  LightHigh() {
    console.log('LightHigh')
  }
}
```



### 13.3、接口继承类（厉害！）

==常见的面向对象语言，接口是不能继承类的，但是ts这边可以==

```ts
class Point {
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
    this.x = x,
    this.y = y
  }
}
interface Point3d extends Point {
  z: number
}

let point3d: Point3d = {x:1, y: 2, z: 3}
```

解析：ts之所以能继承class，是因为我们在声明class 类的同时会生成一个同名的类型，通过new 实例的类型就是这个类型，所以这边我们可以将point当作类型来使用。这边既可以回想之前看过的对象的类型interfaces

```tsx
class Point {
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
    this.x = x,
    this.y = y
  }
}
interface PointInstanceType {
  x: number;
  y: number
}
//interface Point3d extends PointInstanceType  等价
interface Point3d extends Point {
  z: number
}

let point3d: Point3d = {x:1, y: 2, z: 3}
```





## 14、泛型（Generics）

### 14.1、泛型

指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特征

例：

```tsx
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray<string>(3, 'x'); // ['x', 'x', 'x']

```

在函数名称后面加<T>，T指代任意输入的类型，在后面value：T 和Array<T>中即可使用了，当然这边也可定义多个



### 14.2、泛型约束

由于实现不知道其类型，所以不能随意操作它的属性和方法。只能操作所有类型共有的属性和方法

```tsx
function createArray<T, N>(length: N, value: T): Array<T> {
  let result: T[] = [];
    //这边就会报错，因为这边并不知道length的类型为number，比较大小只可在数值之间比较
   for (let i = 0; i < length; i++) {
     result[i] = value;
   }
   return result;
}
console.log(createArray(3, 'x'))



// 可以进行泛型约束，只允许这个函数传入那些包括length属性的变量，使用extends约束了泛型T
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

```



### ==14.3、泛型接口 （得加深了解）==

```tsx
interface CreateArrayFunc {
  <T>(length: number, value: T): Array<T>;
}
let createArray: CreateArrayFunc;  // 指定createArray的类型 之前时会用=>表明函数的类型
createArray = function<T>(length: number, value: T): Array<T> { //这边是匿名函数的类型
  let result: T[] = [];
  if (typeof length === 'number' ) {
    for (let i = 0; i < length; i++) {
      result[i] = value;
    }
    return result;
  }
}
console.log(createArray(3, 'x'))
```

也可以把泛型接口提前到接口名上

```tsx
interface CreateArrayFunc<T> {  // 把泛型接口提前到接口名上
  (length: number, value: T): Array<T>;
}
let createArray: CreateArrayFunc<any>; //提前确定类型
createArray = function<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  if (typeof length === 'number' ) {
    for (let i = 0; i < length; i++) {
      result[i] = value;
    }
    return result;
  }
}
console.log(createArray(3, 'x'))
```



### 14.4、泛型类

泛型也可以用于类的类型定义中

```tsx
class GenericsNumber<T> { //这是一个泛型类
  zeroValue: T;
  add: (x: T, y: T) => T
}
let genericsNumber = new GenericsNumber<number>()
genericsNumber.zeroValue = 0
genericsNumber.add = function (x, y) {
  return x + y
}
console.log(genericsNumber.add(2, 4))

```



### 14.5、泛型参数的默认类型

ts 2.3之后可以给其加上默认类型

当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用

```tsx
function createArray <T = string>(length: number, value: T): Array<T> {
  let result: T[] = [];
  if (typeof length === 'number' ) {
    for (let i = 0; i < length; i++) {
      result[i] = value;
    }
    return result;
  }
}
console.log(createArray(3, 'x'))
console.log(createArray(3, 6)) //像这样是不会报错的，先后级别依次是，赋值类型 > 类型推论 > 默认参数
```



## 15、声明合并

如果定义了名称相同的函数、接口、类，则会被合并，

ps：这个这个这个。。属于代码写的不规范吧，为什么使用相同的名字，一种类型声明对应一个名字，项目代码种应该避免这种情况

### 15.1、函数的合并

```tsx
function aa(name: string, age: number): any[];
function aa(name: string, age: string): any[];
function aa(name: string, age: number | string): any[] {
  if (typeof age === 'number') {
    return [name, age]
  } else if (typeof age === 'string') {
    return [name, age]
  }
}
```

### 15.2、接口的合并

```tsx
interface Alarm {
  alter(): void;
  hot: string;
}
interface Alarm {
  alter(): void;
  high: number;
  hot: number;   //这个地方就会报错，因为两者不一致
}
interface Alarm {   //结果
  alter(): void;
  high: number;
}
```

ps：其实合并就是把其合并成一个，如果有不同的，统统放进去，如果有相同的且类型也相同，也放进去，如果类型不同机会报错

