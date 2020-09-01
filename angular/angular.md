# 简介

angular的口号是“一套框架，多种平台”。同时适用于手机与桌面，即angular是支持开发夸平台的应用。比如web应用、移动web应用、原生移动应用和原生桌面应用等。

为了支持跨平台，通过抽象封装了不同平台的差异，统一了api接口。还定义了一下引用类型；



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

angular提供给我们的装饰器，用于从模板视图获取匹配的元素，需要注意的是，其会在福组件方法的ngAfterViewInit调用之前赋值	

在标识符前加上井号（#）就能声明一个模板引用变量，

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

## **cli命令**

ng generate component xxx路径   //创建组件 ng generate pipe xxx路径     // 创建自定义管道 ng generate directive  xxx路径   // 创建自定义指令