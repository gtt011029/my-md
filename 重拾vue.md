# 重拾vue

==小提醒：路由的path 首字母不能大写==

### 1、prop

单项数据流：所有的prop都使得其父子之间形成了一个单向下行绑定（父级prop的更新会向下流动到子组件中，但是反过来则不行。这样防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解）

不可以在一个子组件内部改变prop，浏览器会发出警告，（若想改动，可以在本地的data中定义一个属性，将prop的值赋值给他或者使用computed）

​	![1563954056781](D:\zstack\备忘录\zstack整理文件image\prop)

### 2、禁用特性继承

如果不希望组件的根元素继承特性，使用inheritAttrs：false

![1563954905024](D:\zstack\备忘录\zstack整理文件image\禁用特性继承)

### 3、子向父传参

this.$emit(fn, arg)                          fn为父亲的函数     arg为孩子赋的参数      （这样可以用来依据子组件改变父组件里面的值，在zstack中的封装的组件，大多都是使用这种方法）

![1563955864593](D:\zstack\备忘录\zstack整理文件image\子父传值)

![1563957371135](D:\zstack\备忘录\zstack整理文件image\父组件中调用子组件，向它传了一个函数)

![1563957230761](D:\zstack\备忘录\zstack整理文件image\子组件使用父组件传来的方法，更改父组件中的值)

### 4、具名插槽（slot特性）

可以作用在父组件的tenplate上，也可以作用在普通元素上



![1563970282103](D:\zstack\备忘录\zstack整理文件image\具名插槽)

### 5、作用域插槽（带数据的插槽）slot-scope

在slot上绑定数据（而这个数据是子组件提供的）

与单个插槽和具名插槽的区别：单个插槽和具名插槽不绑定数据，所以父组件提供的模板既包括样式又包括内容，而作用域插槽，父组件只需要提供一套样式（在确实用作用域插槽绑定的数据的前提下）



### 6、处理边界情况

##### 1、访问元素组件

在绝大多数的情况下，我们最好不要触达另一个组件实例内部或手动操纵dom元素。不过也确实在一些情况下做这些事情是合适的。

###### 1、访问根实例：$root

![1564140301574](D:\zstack\备忘录\zstack整理文件image\访问跟实例)

###### 2、访问父级组件实例：$parent

$parent属性可以用来从一个子组件访问父组件的实例。它提供了一种机会，可以在后期随时触达父级组件，以代替将数据以prop的方式传入子组件的方式

![1564141537096](D:\zstack\备忘录\zstack整理文件image\访问父级组件实例)

### 7、依赖注入(没有使用成功)

缺陷：使得应用程序中的组件与它们当前的组织方式耦合起来，使得重构变得更加困难

作用：允许一个祖先组件向其所有子孙后代注入一个依赖，不论层次有多深，并在上下游关系成立的时间里始终生效。（有点像react的上下文特性）

[provide / inject](https://cn.vuejs.org/v2/api/#provide-inject)

provide：允许我们指定我们想要提供给后代and子孙的数据和方法

provide： function （）{

​	return {

​	getMap： this.getMap

}

}

inject：后代组件中，可以使用inject选项来接收指定的我们想要添加在这个实例上的属性

inject：['getMap']

created () {

​	console.log (this.getMap())

}



### 8、过渡&动画（transition）

#### 1、单元素/组件的过渡

​	transition的封装组件（v-if、v-show配合使用）

例：

```html
<div id="demo">
  <button v-on:click="show = !show">
    Toggle
  </button>
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
</div>
```

```js
new Vue({
	el: '#demo',
	data: {
		show: true
	}
})
```

```css
.fade-enter-active, .fade-leave-active {
	transition: opacity .5s;
}/进入之后和离开之前的状态/
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
} /进入之前和离开之后的状态/
```



过渡的类名：对于在这些过渡中切换的类名来说，如果使用一个没有名字的transition，则v-为默认前缀，如果有名字，如：<transition name="myName">，则myName-为前缀。

1. v-enter：定义进入过渡的开始状态，在元素被插入之前生效，在元素被插入之后的下一帧移除
2. v-enter-active：进入过渡生效时的状态
3. v-enter-to：进入过渡的结束状态
4. v-leave：离开过渡的开始状态
5. v-leave-active：离开过渡生效时的状态
6. v-leave-to：离开过渡的结束状态



显示的过渡持续时间：

```html
<transition :duration="1000">...</transition>

<transition :duration="{ enter: 500, leave: 800 }">...</transition>
```





javaScript钩子：

>```html
><transition
>v-on:before-enter="beforeEnter"
>v-on:enter="enter"
>v-on:after-enter="afterEnter"
>v-on:enter-cancelled="enterCancelled"
>v-on:before-leave="beforeLeave"
>v-on:leave="leave"
>v-on:after-leave="afterLeave"
>v-on:leave-cancelled="leaveCancelled"
>
>> <!-- ... -->
>> </transition>
>```

==注：引号里面的是在method中定义的函数==

```js
leave: function (el, done) {
	// ...
	done()
},
```

==注：当只用js过渡的时候，在enter和leave中必须使用done进行回调，否则，他们将被同步调用，过渡会立即完成==



#### 2、多个元素的过渡

```html
<transition>
  <button v-if="isEditing" key="save">
    Save
  </button>
  <button v-else key="edit">
    Edit
  </button>
</transition>
```

==注:同名元素切换时，需要通过key特性设置唯一的值来标记以让vue区分它们==



过渡模式：mode

1、in-out：先进后出

2、out-in：先出后进

例：

```html
<transition name="fade" mode="out-in">
<!-- ... the buttons ... -->
</transition>
```





#### 3、多个组件的过渡

```html
<transition name="component-fade" mode="out-in">
	<component v-bind:is="view"></component>
</transition>
```



#### 4、列表过渡 transition-group

简介：

1、不同于transition，它会以一个真实的元素呈现：默认为 span ，可通过 tag 进行更改

2、过渡模式不可用

3、需要唯一的key值

```html
<div id="list-demo" class="demo">
  <button v-on:click="add">Add</button>
  <button v-on:click="remove">Remove</button>
  <transition-group name="list" tag="p">
    <span v-for="item in items" v-bind:key="item" class="list-item">
      {{ item }}
    </span>
  </transition-group>
</div>
```



### 9、混入（mixin）

### 10、vuex：状态管理工具

其状态存储时响应式的

#### 1、`mapState` 辅助函数

==mapstate主要目的==：

​		如果想要获取state中的多个数据，一个一个写computed过于麻烦，就可以写一个mapstate一起获取，简答方便

```js
 import { mapState, mapGetters } from 'vuex'

 computed: {
    ...mapState({
      vm: state => state.vm,
      volume: state => state.volume
    }),
    ...mapGetters({
      getVm: 'vm/get',
      getVolume: 'volume/get'
    })
  },
```



#### 2、state

在根实例中注册了store，该store实例会注入到根组件下的所有组件中，且子组件能通过this.$store访问到

在zstack中的代码，基本上就是computed中写函数获取this.$store中指定的值，和一般的方法一样

![1565320605332](zstack整理文件image/state)



#### 3、Getter

有时候需要从store中派生出一些状态，相当于store的计算属性

例如zstack代码中getter.js文件中的get、getList等函数，

Getter会暴露为store.getters对象，可以已属性的形式访问这些值

==通过方法访问：==

可以通过让getter返回一个函数，来实现给getter传参，在对store里的数据进行查询时非常有用

这边可以看zstack代码中getter.js文件中的get、getList等函数，（这边的参数就是uuidList）

```js
getList: (state, getters, rootState) => (uuidList) => {
    if (!_.isArray(uuidList)) return []
    uuidList = uuidList.filter(uuid => state[uuid])
    return uuidList.map(uuid => {
      let item = state[uuid]
      if (item.pciSpecUuid && rootState.pciDeviceSpecs[item.pciSpecUuid]) {
        item.gpuDescription = rootState.pciDeviceSpecs[item.pciSpecUuid].description
      }
      return item
    })
}
```

  mapGetters辅助函数，仅仅是将getter==映射==到局部计算属性，和mapStates差不多



#### 4、Mutation

![1565318614281](zstack整理文件image/mutation)

==mutation需遵守vue的响应规则==

1：最好提前在store中初始化好所有的所需属性

2：当需要在对象上添加新属性时：使用

​	Vue.set(obj, ‘newProp’, 123) 

 	以新对象代替老对象  state.obj = { ...state.obj, newProp: 123 }



#### 5、Module（单一状态树）

可以将store分割成模块（module）。每个模块拥有自己的state、mutation、action、getter



#### 11、computed、watch

有时候我们想拿store中的数据去渲染页面，可以直接在computed中去监听store中的指定数据

例如：

```javascript
 ospf () {
      let uuid = this.windowData.dataUuid
      return this.$store.state.ospf[uuid] || {}
    }
```



![1565256284953](zstack整理文件image/render)





### 11、路由router

​	注意，路由中不能有大写，只能全部用小写字母





### 12、$refs  && ref

原来曾经在这里看过

$refs：一个对象，持有以注册过ref的所有子组件

ref：被用来给元素或者子组件注册引用信息。引用信息将会注册在父组件的$refs对象上。

如果是用在普通元素上，引用指向的就是DOM元素

如果用在子组件上，引用即使指向组件实例