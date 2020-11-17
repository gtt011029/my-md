# 简介

https://zhuanlan.zhihu.com/p/24000979   开源的angular项目

angular的口号是“一套框架，多种平台”。同时适用于手机与桌面，即angular是支持开发夸平台的应用。比如web应用、移动web应用、原生移动应用和原生桌面应用等。

为了支持跨平台，通过抽象封装了不同平台的差异，统一了api接口。还定义了一下引用类型；

## 架构概览：

​		angular是一个用HTML、TypeScript构建的客户端应用的平台与框架。angular本身就是用TypeScript写成的。它将核心功能和可选功能作为一组ts库进行实现，可以把它们导入应用中。

angular的基本构造块NgModule（用于配置注入器和编辑器，并帮你把那些相关的东西组织在一起），它为组件提供了编译上下文的环境。angular应用就是由一组NgModule定义出的。应用至少有一个用于引导的根模块，通常还会有很多特性模块。这项技术还能让你获得**惰性加载**(按需加载)的优点，可尽可能减小启动时按需加载的代码体积。

1. 组件定义**视图**。视图是一组可见的屏幕元素，angular可以根据你的程序逻辑和数据来选择和修改它们
2. 组件使用**服务**(services)。服务会提供那些与视图**不直接相关的功能**。服务提供者可以作为依赖被注入到组件中，会让你的代码更加模块化、提高可复用性，更加高效

*（ps：一般这边cli 生成一个组件的时候，会自动注入，所以这边的关注点会比较少，但是这边核心思想要懂，不然脑中对angualr很难形成一个大的整体概念）。*



模块、组件、服务都是使用装饰器的类，这装饰器会标出它们你的类型并提供元数据，以告知angular该如何使用他们

- 组件：组件类的元数据将组件类和一个用来定义视图的**模板**关联起来。模板把普通的HTML和Angular指令与绑定标记(markup)组合起来，这样Angular就可以在渲染HTML之前修改这些HTML
- 服务：服务类的元数据提供了一些信息，Angular要用这些信息来让组件可以通过依赖注入(DI)使用该服务







1. ElementRef => 在应用层直接操作dom，会造成应用层、渲染层之间强耦合，导致我们的应用无法运行在不同环境。通过ElementRef我们就可以封装不同平台下视图层中的native元素（在浏览器环境中，native元素通常是指DOM元素），最后借助angular提供的强大的依赖注入特性（ps：觉得这angular强大的一来注入特性既是优点也是缺点），我们就可以轻松地访问到native元素。
2. TenplateRef;
3. ViewRef;
4. ComponentRef;
5. ViewContainerRef;







## 一、杂记

### 装饰器详解

试一试push



#### **@input**

用于组件间传递数据

这边就是[]给该组件数据后，子组件那边的ts用input接收数据

#### @ViewChild、@ViewChildren

属性装饰器，用于配置一个视图查询。变更检测会在视图的DOM中查找能匹配的上该选择器的第一个元素或指令。如果视图的dom发生了改变，出现了匹配该选择器的新的子节点，该属性就会被更新

angular提供给我们的装饰器，用于从模板视图获取匹配的元素，需要注意的是，其会在父组件方法的ngAfterViewInit调用之前赋值	

在标识符前加上井号（#）就能声明一个模板引用变量，ps：光记下来根本没用，不用的话，过两天就忘了。

支持下列选择器：

1. 任何带有@component或@Directive装饰器的类
2. 字符串形式的末班引用变量（比如可以使用@ViewChild(‘cmp’)）来查询<my-component #cmp></my-component>
3. 组件树中任何当前组件的子组件所定义的提供商（比如@ViewChild(SomeService) someService: SomeService）
4. 任何通过字符串令牌定义的提供商（比如@ViewChild('someToken') someTokenVal: any）
5. TemplateRef （比如可以用@ViewChild(Template) Template; 来查询<ng-template></ng-template>）











### **指令**

#### **1、组件**

拥有模板的指令

#### **2、结构型指令**

通过添加和移除DOM元素改变DOM布局的指令：（angular内置的） NgIf、NgFor、NgSwitch

```html
<div *ngFor="let item of list; index as i">检查ngfor: {{item}} {{i}}</div>
```

这边也可以自定义结构型指令

TemplateRef和ViewContainerRef

简单结构型指令会从angular生成的<ng-template>元素中创建一个内嵌的视图，并把这个视图插入到视图容器中，紧挨着本指令原来的宿主元素。

可以使用templateRef取得<ng-template>的内容，并通过ViewContainerRef来访问这个试图容器



#### **3、属性型指令**

**改变当前DOM的某些属性**

改变一个元素的外观或行为：NgStyle（angular内置的属性型指令）、NgClass

这边还可以自定义属性型指令

带有@[Directive](https://angular.cn/api/core/Directive) 指令装饰器：该装饰器指定了一个用于标志属性的选择器，控制器类实现了指令需要的指令行为

```html
<p [ngStyle]="styleJson">attribute works!</p>

<p appHighlight highlightColor="yellow">Highlight me (yellow) !</p>

<p appHighlight [highlightColor]="color">Highlight me (red) !</p>
```

```ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.css']
})
export class AttributeComponent implements OnInit {

  public styleJson: object;
  constructor() { }

  ngOnInit() {
    this.styleJson = {
      color: 'red'
    };
  }

}
```

```
ng generate directive directives/highlight
```

该指令文件

```ts
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
// 响应用户引发事件HostLister，使用这个装饰器添加两个事件处理器
// @input 装饰器往类上添加了一些原数据，从而让hightlightColor能用于绑定

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() highlightColor: string;

  constructor(private el: ElementRef) {
    // console.log(el); // 这边可以拿到该元素的所有属性
    // el.nativeElement.style.backgroundColor = 'yellow';
    // ElementRef通过其nativeElement属性给你了直接访问宿主元素的能力
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
```

1、组件与模板

显示数据： 插值表达式

<h4>{{recommended}}</h4>

<img [src]="itemImageUrl2">



### **管道**

**用来对显示的数据做某些转换的。**

目的：用来对字符串、货币金额、日期和其他显示数据进行转换和格式化。管道是一些简单的函数

自带管道：json、date、uppercase、lowercase、currency、decimal(把数字转化为带小数的字符串)、percent



#### 使用参数和管道链：

在使用管道的时候，如果需要参数，就在{{xxx: PipeName:  args1:args2}} ，管道名字后面添加冒号（：）加上参数，用冒号分割这些值，后续在管道内，这些参数就会放在一个args数组里

也可以串行使用

```html
<p>view-child works!</p>
<div #myViewChild>
  <span>hahaha</span>
  <h1>{{0.8 | percent:1000: 2000: 3000 | percents}}</h1>
</div>

```



#### 自定义管道：

这边要使用到@pipe这个装饰器

1、要把类标记为管道并提供配置元数据，使用@pipe装饰器、管道的命名一般是大驼峰命名法，对应的名字是小驼峰

2、使用PipeTransform接口来执行转换（angular调用transform方法，该方法使用绑定的值作为第一个参数，把其他任何参数都以列表的形式作为第二个参数，并返回转换后的值）

3、变更检测原理：angular会在每次DOM事件（每次按键、鼠标移动、计时器滴答和服务器响应）之后运行的变更检测过程中查找对数据绑定值的更改。

```
ng generate pipe /pipe/exponentialStrength
```

```html
<p>pipe works!</p>
<p>百分比管道： {{ 0.8 | percent }}</p>
<p>指数指数指数： {{ 2 | exponentialStrength: 2: 2: 3 }}</p>
// 参数以：的形式添加
```

添加服务：

组件不应该直接获取或保存数据，它们不应该了解是否展示假数据。它们应该聚焦于展示数据，而把数据访问的职责委托给某个服务

依靠angular的依赖注入机制把它注入到HeroesComponent的构造函数中

















### 组件交互

子组件的ts

```ts
import { Component, OnInit, Input, OnChanges } from '@angular/core';
interface ParamsData {
    value: string;
}

@Component({
  selector: 'app-first-child',
  templateUrl: './first-child.component.html',
  styleUrls: ['./first-child.component.css']
})

export class FirstChildComponent implements OnInit, OnChanges {
  // @Input()
  // params: {
  //   value: string;
  // };
  // 如果这边这样写的话，就只在初始化的时候赋值，后面父组件传过来的值有任何变化的话，这边也不会改变；
  // 可以用ngOnChange监听，但是如果传过来的是对象，父组件只是更新对象的内容，这边依旧监听不到
  @Input()
  set params(params: ParamsData) {  // 可以使用setter截听输入属性值的变化，并采取行动；这边set后根据需要进行处理也可以不处理
  // 不处理的话也可以接收到变化后的数据
    console.log(params);
    console.log('hahhah');
    this.pparams = params;
  }
  get params(): ParamsData {
    return this.pparams;
  }

  public parent: string;
  public pparams: ParamsData;
  constructor() { }

  ngOnInit() {
    this.parent = this.pparams.value;
  }
  ngOnChanges() {
    // this.parent = this.params.value;
    // 这边如果传入的值为对象的话，就检查不到它的；里面key、value的改变
    // 因为地址没有发生变化
  }
}
```

装饰器：

@Component： 组件装饰器

@HostListener：事件监听

@pipe： 自定义管道

@Injectable：会把类标记为依赖注入系统的参与者之一。服务类将会提供一个可注入的服务，并且它还可以拥有自己的待注入的依赖

提供（provide），要注册一个服务提供者，来让HeroService在依赖注入系统中可用（所谓服务提供者就是某种可用来创建或交付一个服务的东西）

注入HeroService：就是在添加在构造器中

constructor(private heroService: HeroService) {}

这边同时做了两件事，1、声明了一个私有的heroService属性，2、把它标记为HeroService的注入点，当angular创建组件的时候，依赖注入系统就会把这个heroService参数设置为HeroService的单例对象

angular的状态管理工具：service

angular的路由：在app-routing.module.ts中

从服务端获取数据：借助HttpClient来添加一些数据持久化特性

我的git的token：859365454995d535496cde6fb14203759d9c3496

UI官网：https://material.angular.cn/components/categories

extends和implements的区别：类中是有代码实现的，而接口无程序实现，只可以预定义方法



### 组件样式：（视频看）

特殊选择器：

：host  用来选择宿主元素中的元素

要把宿主样式作为条件，就要像函数一样把其他选择器放在：host后面的括号中

：host-content



### 动态加载组件

组件的末班不会永远是固定的。应用可能要在运行期间加载一些动态组件

使用ComponentFactoryResolver来动态添加组件



### 表单与用户输入

#### 用户输入#

在标识符前加上井号（#）就能声明一个模板引用变量

```html
、
<button (click)="onClickMe()">Click me </button>    // 绑定click

2、
<input (keyup)="onkey($event)">    //通过$event对象取得用户输入

3、
<input #student placeholder="please input your name" (keyup)="0">  
<p>{{ student.value }}</p>
//使用angular的模板引用变量。这些变量提供了从模板中直接访问元素的能力，
// 在标识符前加上井号（#）就能声明一个模板引用变量
// 注意：这边必须绑定一个事件，不然无法完成工作。只有在应用做了些异步事件（如：击键），angular才更新绑定
```



#### 响应式表单

响应式表单提供了一种模型驱动的方式来处理表单输入，其中的值会对着时间而变化

FromControl实例用于追踪单个表单控件的值和验证状态







FormGroup 用于追踪一个表单组的值和状态（两个更改数据的方法，一个是setValue()会严格的遵循表单组的结构，并整体替换控件的值；patchValue()方法可以用于对象中所定义的任何属性模型进行替换）与FormControlName搭配使用







FormBuilder：当需要与多个表单打交道时，手动创建多个表达控件会非常繁琐。FormBuilder服务提供了一些便捷的方法来生成表单控件（FormBuilder是一个可注入的服务提供者，它是由ReactiveFormModule提供的。只要把它添加到组件的构造函数中就可可以注入这个依赖）。

有三种方法：control、group、array。这些方法都是工厂方法，用于在组件类中分别生成FormControl、FormGroup、FormArray

与formControlName搭配使用



FormArray 用于追踪一个表单控件数组的值和状态

建立响应式表单

可以直接在组件中定义表单模型。【formControl】指令会通过内部值访问器来把显示创建的FormControl实例与视图中的特定表单元素联系起来

```html
<p>form-control works!</p>
<div>
  <label> Name:</label>
  <input type="text" [formControl]="name">
  <button (click)="getCurrentName()">查看当前name</button>
</div>

```



```typescript
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css']
})
export class FormControlComponent implements OnInit {
  name = new FormControl('Tina');

  constructor() { }

  ngOnInit() {
  }
  getCurrentName() {
    alert(this.name.value);
  }

}

```



##### 表单验证：

input自带属性（required， minlength， maxlength，required， pattern）

每当表单控件中的值发生变化时，angular就会进行验证，并生成一个验证错误的列表（对应着INVALID状态）或者null（对应着VALID状态）

验证器（Validator）函数：可以是同步的也可以是异步的

同步验证器：这些同步函数接受一个控件实例，然后返回一组验证错误或null，可以在实例化FormControl时作为构造函数的第二个参数传进去

异步验证器：这些异步函数接受一个控件实例并返回一个Promise或Observable，它稍后会发出一组验证错误或null。在实例化FormControl时，可以把它们作为第三个参数传入。

注意： 出于性能方面的考虑，只有在所有同步验证器都通过之后，angular才会运行异步验证器。当每一个异步验证器都执行完之后，才会设置这些验证错误

可使用内置验证器，或者自己编写验证函数



### Observable（可观察对象）：

Rxjs库里面的一个对象，可以用来处理异步事件，例如HTTP请求（事实上，在angular中，所有的HTTP请求返回的都是Observable），和promise本质相同，但其实还是有很大区别的：Observable可以发送**任意多值**，并且在**订阅之前**，是**不会被执行**的。这是promise不具备的特点。（简单点说就是有人订阅才会发布）

主要用于发送方和接收方之间传送消息。

在创建Observable对象时，需要传入一个函数作为构造函数的参数，这个函数叫做订阅者函数，这个函数就是生产者向消费者推送消息的地方

在被消费者subscribe（订阅）之前，订阅者函数不会被执行，直到subscribe函数被调用，该函数返回一个subscription对象，里面有个unsubscribe（）函数，消费者可以随时拒绝消息的接收。



#### 回顾promise：

这边可以先回顾一下promise的基本用法

三大状态pending（进行中）、fulfilled（已成功）、rejected（已失败），只有异步操作的结果可以决定当前是哪种状态，状态一旦设定无法更改。

```ts
let promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('ok')   // 将这个promise设置为成功状态（fulfilled），会触发成功的回调，resolve中是要返回的数据
    }, 1000)
})
promise1.then((resp) => {
    console.log(resp) // 这边一会儿会打印’ok‘
}, () => {
    console.log('error') // reject的时候会执行这里
})
```



#### 定义观察者：

observer对象定义了一些回调函数（处理可观察对象可能会发来的三种通知）：

next： 必要的。用来处理每个送达者。在开始执行后可能执行0次或多次

error：可选。用来处理错误通知。错误会中断这个可观察对象实例执行过程（这边就会调用 unsubscribe ）。

complete：可选。用来处理执行完毕（complete）通知。当执行完毕后。这些值就会继续传给下一个处理器（听不太懂）

```typescript
  testObservable() {
    const testObservableFn = new Observable((observer) => {
      setTimeout(() => {
        if (this.observableNumberValue === 10) {
          observer.error('error msg');
        }
        observer.next(this.observableNumberValue);
      }, 1000);
      return {
        unsubscribe() {
          console.log('return unsubscribe 取消订阅');
        }
      };
    });
    testObservableFn.subscribe((resp) => {
      console.log(resp);
    }, (error) => {
      console.log(error, '');
    });
  }
```

```typescript
testObservable2() {
    const sequence = new Observable((observer) => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.complete();
      return {
        unsubscribe() {
          console.log('取消订阅');
        }
      };
    });
    sequence.subscribe((resp) => {
      console.log('next返回的东西： ', resp);
    }, () => {
      console.log('第二个函数，返回error的msg');
    }, () => {
      console.log('第三个函数：这边是执行处理完毕的通知');
    });
  }


// next返回的东西：  1
// observable.component.ts:50 next返回的东西：  2
// observable.component.ts:50 next返回的东西：  3
// observable.component.ts:54 第三个函数：这边是执行处理完毕的通知
// observable.component.ts:45 取消订阅
```



## 服务与依赖注入

对于一些与特定视图无关的，并希望跨组件共享的数据或逻辑，可以创建服务类。

服务类的定义通常紧跟在“@Injectable()”，装饰器之后。

该装饰器提供的元数据可以让你的服务作为依赖被注入到客户组件中





## RxJS库

响应式编程是一种面向数据流和变更传播的异步编程范式。RxJS（响应式扩展的JavaScript版）是一个使用可观察对象进行响应式编程的库



Angular中的可观察对象



## **二、angular路由**

位置：app-routing.module、在route数组中定义路由

路由跳转：routeLink

<a routerLink="/first-component" routerLinkActive="active">First Component</a>

这边以app.component.html为基准，SPA单页面都是渲染在这个里面的

注意：通配符放在最后

重定向：redirectTo

嵌套路由：嵌套在children中

可以使用相对路径

### **路由参数：**

ps：感觉三大框架都差不多

1、{ path: 'herp/:id', component: xxx }



## **三、angular生命周期**

每一个接口都有唯一一个钩子方法，它们的名字是由接口名再加上ng前缀构成的

**1、ngOnChanges()** 

当angular设置或重新设置绑定的输入属性响应。在ngOnInit之前以及所绑定的一个或多个属性的值发生变化时会调用

ps: 这边课可以理解为当传入组件的数据发生改变时，会响应该生命周期，但是一般情况下如果传入的是对象，父组件只是改变该对象里面的某些数据，没有改变该对象的地址（生成新的对象），子组件就不会触发该生命周期，因为这边被理解为数据没有改变，因为这边被传入的是该对象的地址。

**2、ngOnit（）**

在angular第一次显示数据绑定和设置指令、组件的输入属性后，初始化，只调用一次

**3、ngDoCheck（）**

检测，并在发生angular无法或者不愿意自己检测的变化时做出反应。在ngOnChanges和首次执行ngOnit后调用

ps:感觉这边就是帮忙处理一些ngOnChanges没有检测到变化的数据如果变化了该执行的操作

**4、ngAfterContentIinit（）**

当angular把外部内容投影到组件视图或者指令所在试图之后调用。在第一次ngDoCheck之后调用

**5、ngAfterContentChecked（）**

每当angular检查完被投影到组件或指令中的内容之后调用。在每次ngAfterContentIinit和ngDoCheck之后调用

**6、ngAfterViewInit（）**

当angular初始化完组件及其子视图或包含该指令的视图之后调用。第一次ngafterContentChecked之后调用，只调用一次

**7、ngAfterViewChecked（）**

执行完变更检测之后调用

**8、ngOnDestroy（）**

销毁前

## **四、国际化（i18n）**

标签上添加i18n

例：

```html
<h1 i18n> hello </h1>
```

添加有用的描述和含义

例：

```html
<h1 i18n="An introduction header for this sample">hello</h1>
```



标记要翻译的属性

i18n-属性名

```html
<img [src]="logo" i18n-title title="Angular logo" />
```





## **五、父子组件传递数据**

父元素文件。html

```html
<app-child [item] ='sendchildMsg' (childMsg)="getEvent($event)" ></app-child>
```

子元素文件。ts

```typescript
import { component, Oninit, Input, output, EventEmitter } from '@angular/core'

Input 装饰器

@Input()  item;  // 这边的话就可以给子元素使用
@output()  childMsg = new EventEmitter ()   // 接受父组件的函数

sendMsg() {
	this.childMsg.emit(msg: '子组件的消息')
}
```



### 父组件监听子组件的事件

子组件暴露一个EvenEmitter属性，当事件发生时，子组件利用该属性emits（向上弹射）事件。父组件绑定到这个事件属性，并在事件发生时做出相应。

```html
// 父组件
<app-first-child [param]="data" (ok)="childOk($event)" ></app-first-child>


// 子组件
<p>first-child works!</p>
<div>
  <ul>
    <li *ngFor="let item of param">
      <span>name: {{item.name}}</span><br>
      <span>age: {{item.age}}</span>
    </li>
    <button (click)="ok.emit('hahha')">点击ok按钮</button>
  </ul>
</div>



```

```typescript
// 子组件ts
import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-first-child',
  templateUrl: './first-child.component.html',
  styleUrls: ['./first-child.component.css']
})
export class FirstChildComponent implements OnInit, AfterViewInit {
  @Input() param: object[]; // 接收父组件传来的数据
  @Output() ok = new EventEmitter<string>();  //  接收父组件的方法，使用的时候要发射emit

  constructor() { }

  ngOnInit() {
    console.log(this.param);
  }
  ngAfterViewInit() {
    // console.log(this.param);
  }

}

```



## **六、服务**

创建服务：ng g service xx目录



## NgModules

用于配置注入器和编译器，并帮你把那些相关的东西组织在一起

NgModules是一个带有@NgModule装饰器的类。@NgModule的参数是一个元数据对象，这些对象呢是用于描述如何编译组件的模板，以及如何在运行时创建注入器。它会标出该模块自己的组件、指令、管道。通过exports属性公开其中的一部分，以便外部组件使用它们。NgMOdule还能把一些服务提供者添加到应用的依赖注入器中。

NgModule的元数据会做这些：

1. declarations：声明某些组件、指令、管道属于这个模块
2. imports：导入其他带有组件、指令和管道的模块，这些模块的元件都是本模块所需的
3. providers：提供一些供应用中的其他组件使用的服务。

```typescript
// imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// @NgModule decorator with its metadata
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

// 每个angular应用都至少有一个模块，也就是根模块
```





## 动画

angular的动画系统是基于css功能构建的。

意味着，你可以‘动’浏览器认为可动的任何属性。包括位置、大小、变形、颜色、边框等

module中导入 ‘BrowserAnimationsModule’



### 转场与触发器

```typescript
import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate, transition
} from '@angular/animations';

@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.css'],
  animations: [
    trigger('openClose', [   // 动画需要触发器，方便知道何时触发。trigger函数会把一些状态和转场组合在一起
      state('open', style({
        height: '500px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      state('duration', style({
        height: '300px',
        opacity: 0.8,
        backgroundColor: 'pink'
      })),
      transition('open <=> closed, open <=> duration, closed <=> duration', [   // <=> 表示双向转场 , 这边可包括多个状态对
        animate('1s 0.1s ease-in-out', )
      ])
    ])
  ] // 添加动画的元数据属性，可以把用来定义动画的触发器放进animation元数据属性中
  // 这边是两个状态之间添加简单的转场动画。
  // transition 的 stateChangeExpr竟然是有作用的，表示是由哪个状态到哪个状态过渡时的动画
})
export class AnnotationComponent implements OnInit {
  public isOPen = true;
  public state = 'open';

  constructor() { }

  ngOnInit() {
  }
  toggle() {
    console.log(this.state);
  }

}

```



```html

<p>annotation works!</p>
<button (click)="toggle()">get state</button>
<select name="" id="" [(ngModel)]="state">
  <option value="open">open</option>
  <option value="duration">duration</option>
  <option value="closed">closed</option>
</select>
<div [@openClose]="state" class="open-close-container">
    // 把定义好的触发器附加到组件模板的元素上，【】中是触发器的名字，值为你想要当前state的名字，想要当前是什么状态
  <p>the box is now {{ isOPen ? 'Open': 'Closed' }}</p>
</div>


```

总结：

trigger（）：开始动画，充当所有其他动画的容器

state（）：定义不同的状态，供每次转场结束时调用，两个参数：name和style样式（小驼峰）

transition（）：转场，两个参数：‘一个表达式’，定义两个转场状态之间的方向，一个或者多个animate的数组；注意：转场状态可以有多个

animate（‘duration持续时间， delay延迟时间， easing运动曲线’）：就是css的动画



### 复杂序列

控制复杂动画序列的函数：

| function name | desc                                                         |      |
| ------------- | ------------------------------------------------------------ | ---- |
| query（）     | 用于查找一个或多个内部HTML元素；允许你查找正在播放动画的元素的内部的元素。                                                                                            此函数会针对父组件中特定的HTML元素，并把动画单独应用于其中的每个元素。                                                                                           angular会智能化地处理初始化、收尾、清理工作，因为它负责协调页面中的这些元素 |      |
| stagger（）   | 用于为多个元素动画应用级联延迟                               |      |
| group（）     | 用于执行多个动画步骤                                         |      |
| sequence（）  | 用于逐个顺序执行多个动画                                     |      |



## **cli命令**

ng generate component xxx路径   //创建组件 ng generate pipe xxx路径     // 创建自定义管道 ng generate directive  xxx路径   // 创建自定义指令







## css作用域问题

https://blog.csdn.net/qq_17165949/article/details/91854822









## 奇怪的操作

### 通过get方式赋值变量

```ts
get showFullLogo() {
    return true
}
// 这边就有一个值为true的showFullLogo变量
```

```html
<span i18n>Updated {minutes, plural, =0 {just now} =1 {one minute ago} other {{{minutes}} minutes ago}}</span>
```



### 使用i18n翻译插值表达式

奇怪的操作又增加了。

https://www.366service.com/zh-tw/qa/22e1751ba5c4e9997800f6eacacb6550









注意：app module中如果要插入新的组件的话，要重新编译，不然不会渲染。









## UI组件

material



icon集合

https://material.io/resources/icons/?icon=sd_storage&style=baseline









## 显示pdf文件

https://blog.csdn.net/weixin_44917045/article/details/107595662











