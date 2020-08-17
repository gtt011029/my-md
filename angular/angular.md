## 一、杂记

### 装饰器详解

试一试push



#### **@input**

用于组件间传递数据

这边就是[]给该组件数据后，子组件那边的ts用input接收数据

### **指令**

#### **1、组件**

拥有模板的指令

#### **2、结构型指令**

通过添加和移除DOM元素改变DOM布局的指令：（angular内置的） NgIf、NgFor、NgSwitch

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
// @input 装饰器往类上添加了一些远数据，从而让hightlightColor能用于绑定

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

自带管道：json、date、uppercase、lowercase、currency、decimal(把数字转化为带小数的字符串)、percent

自定义管道：

1、要把类标记为管道并提供配置元数据，使用@pipe装饰器、管道的命名一般是大驼峰命名法

2、使用PipeTransform接口来执行转换（angular调用transform方法，该方法使用绑定的值作为第一个参数，把其他任何参数都以列表的形式作为第二个参数，并返回转换后的值）

3、变更检测原理：angular会在每次DOM事件（每次按键、鼠标移动、计时器滴答和服务器响应）之后运行的变更检测过程中查找对数据绑定值的更改。

```
ng g pipe /pipe/exponentialStrength
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



### 用户输入

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



### 表单控件

FromControl实例用于追踪单个表单控件的值和验证状态

FormGroup 用于追踪一个表单组的值和状态

FormArray 用于追踪一个表单控件数组的值和状态

建立响应式表单

可以直接在组件中定义表单模型。【formControl】指令会通过内部值访问器来把显示创建的FormControl实例与视图中的特定表单元素联系起来



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

例：<h1 i18n> hello </h1>

添加有用的描述和含义

例：<h1 i18n="An introduction header for this sample">hello</h1>

## **五、父子组件传递数据**

父元素文件。html

<app-child [item] ='sendchildMsg' (childMsg)="getEvent($event)" ></app-child>

子元素文件。ts

import { component, Oninit, Input, output, EventEmitter } from '@angular/core'

Input 装饰器

@Input()  item;  这边的话就可以给子元素使用

@output()  childMsg = new EventEmitter ()    接受父组件的函数

sendMsg() {

this.childMsg.emit(msg: '子组件的消息')

}

## **六、服务**

创建服务：ng g service xx目录

## **cli**

ng generate component xxx路径   //创建组件 ng generate pipe xxx路径     // 创建自定义管道 ng generate directive  xxx路径   // 创建自定义指令