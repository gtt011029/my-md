## 虚拟DOM

什么是虚拟DOM，深入了解虚拟DOM

看了一篇关于虚拟DOM的分析，觉得挺好，简单易懂，现总结如下





### 一、原始的生成步骤

1、state数据

2、jsx模板

3、数据+模板 结合，生成真实的DOM，替换原来的DOM

**ps：这边有个特别明显的缺点，就是直接拿新的DOM替换旧的DOM非常的消耗性能**



### 二、改进步骤

1、state 数据

2、jsx 模板

3、数据+模板结合，生成真实的DOM，显示出来

4、当state发生了改变

5、数据+模板，生成新的DOM，但这个时候并没有直接替换

6、新的DOM与原有DOM进行比较，找出差异，替换差异（遍历所有的DOM进行对比，找差异时，相当损耗性能）

7、用新的DOM中的元素，替换老的DOM中的元素

**ps：相比较第一种直接替换的方法，可以减少性能消耗，但是并不明显**



### 三、react DOM

1、state 数据

2、jsx模板

3、数据+模板结合，生成真实的DOM，显示出来

```html
<div id="abc"><span>hello world !</span></div>
```

4、同时生成虚拟DOM

==这边的虚拟DOM的本质就是一个js对象==

用它来描述真实的DOM（损耗性能）

```json
['DIV',{ id : 'abc'},['span',{},'bye bye']]
```

5、当state发生改变时

6、数据+模板 生成新的虚拟DOM

```json
['DIV',{ id : 'abc'},['span',{},'bye bye']]
```

7、新的虚拟DOM与原来的虚拟DOM进行比较

因为是虚拟DOM间比较，js比较js，不太消耗性能

8、找出差异，这边例子的区别是span中的内容发生改变

9、直接操作Dom，改变span中的内容

**ps：性能提升明显**





### 四、虚拟DOM 的diff算法

传统的diff算法，需要跨级比较两个树之间的不同，时间复杂度O(n^3)，这样的对比是无法接受的

react就提出了一个简单粗暴的diff算法，值对比同级元素，这样的话时间复杂度就变成了O(n)了。

其对比过程是这样的，

1、新建create：新的vd中有这个节点，旧的没有，

2、删除remove：新的vd上没有，旧的上有，

3、替换replace：新的vd上的tagName和旧的上面的不同

4、更新updata： 除了上面三点外的不同，具体是比较attributes先，然后再比较children 



总结：因为是比较同级，会找到很多的不同，更新替换新建删除的过程较多，代价也还算是蛮大的

，但这样的话时间复杂度就变成了O(n)，算是相对平衡的算法







## HOOK官方解释

Hook是一些可以让你在函数组件里‘钩入’react state 及声明周期等特性的函数。hook不能在class组件中使用----这使得你不使用class也能使用react



## HOOK使用规则

Hook就是js函数，但是有两个额外的规则：

1、只能在函数**最外层**调用hook，不要在循环、条件判断、或者子函数中调用

2、只能在react函数组件中调用Hook



## react-hook速览

### 1、useState

 state hook

用于生成当前页面的state

可多次使用，可赋初始值

使用方法：

```js
 const [count, setCount] = useState(0);     // 0为初始值，setCount为修改这个state的方法
```







### 2、useEffect

effect  hook  副作用（数据获取、订阅、手动修改DOM）

等同于：componentDidMount、componentDidUpdate、componentWillUnmount的联合的作用，只不过这里被合并成了一个api

使用方法：

```js
// 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
  });
```

#### 1、由于是在组件内声明的，所以可以访问组件内的prop、state







#### **2、默认情况下每次渲染后都会调用副作用函数，包括第一次渲染**









#### **3、可以通过返回一个函数来指定如何清除副作用** 

​		如果是需要清除的话，有些副作用是不需要清除的，例如：只是想在dom更新之后运行一些额外的代码。比如发送网络请求、手动变更DOM，记录日志，这些都是常见的无需清除的操作。

这边如果和class对比return的函数会在componentWillUnmount中执行

react会在组件卸载的时候执行清除操作

​	使用方法：

```js
useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });    // 取消订阅来清除操作
```



#### 4、可以通过跳过effect进行性能分析

使用方法：

```js
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
```



## 自定义HOOK

为了复用，而抽取一些可重用的逻辑，组成一个自定义hook，供需要的地方使用



## 其他Hook

#### 1、useContext

用处：不使用组件就可以订阅react context（上下文），函数组件中父子组件传值的东西

接收一个context对象（react.createContext的返回值）并返回该context的当前值。当前的context值由上层组件中距离当前组件最近的<MyContext.Provider>的value  prop决定

当其更新时，该Hook会触发重新渲染

ps：就是被MyContext.Provider包着的组件可以获取到其值，不如用全局变量来的省事

```js
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);  // 容器组件

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />     // 这个组件及其子组件就可以获取到themeContext的值
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);    //获取到的是离得最近的ThemeContext的值
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```





#### 2、useReducer

用处：通过reducer来管理组件本地的复杂的state   这边和redux的用法相似

useState的提代方案

有时候，state逻辑较复杂且包含多个子值，或者下一个state依赖原来的state

这种情况用useReducer就比较方便

const [state, dispatch] = useReducer(reducer, 初始值)

```js
const initialState = {count: 0};

// dispatch调用的reducer方法  action就是一个对象dispatch的参数
function reducer(state, action) {   
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState); 
  // 使用useReducer  initialState为初始值，state为自定义变量、dispatch改变这个变量，
  // reducer：dipatch调用的方法
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>   
// 更改state中的数据
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```



##### 惰性初始化

就是使用useReducer增加第三个参数，作为初始化state的函数，第二个参数为这个函数的参数

使用方法：

```js
function init(initialCount) {    // 初始化的函数，initialCount为useReducer的第二个参数
  return {count: initialCount};
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}

```



#### 3、useCallback

作用：避免组件重复渲染，提高性能（useMemo）

可以控制组件什么时候更新

也由缓存机制，但缓存的是个函数，是个函数就可以执行

**返回一个memoized回调函数**

例：

```js
let callback = useCallback(fn, desp)   相当于  useMemo(() => fn, desp)
```

fn：为回调函数

desp： 依赖项数组

该回调函数仅在某个依赖项改变时才会更新



#### 4、useMemo

返回一个memoized值

为了解决性能问题，用的是memoization来提高性能，

memoization是JavaScript中的一种缓存技术

如果我们有cpu密集型操作，我们可以通过将初始操作的结果存储在缓存中来优化使用，如果操作必然会再次执行，我们将不再麻烦再次使用我们的cpu，因为相同的结果存储在某个地方，我们只是简单的返回结果--------（以空间换速度，所以最好确当一下是否值得那么做，有些场景很有必要）



‘shouldComponentUpdate’类似作用，在渲染过程中避免重复渲染的问题

当状态或者父组件按传来的属性发生变化时，更新组件

```js
useMemo(() => fn, desp)   
// fn 函数、desp 参数数组  desp中的依赖参数如果改变了的话，就会执行那个函数
```



**useMemo和useEffect执行的时间不同，useEffect是在componentDidMount以后执行的，而useMemo是在组件渲染过程中执行的，useMemo比较靠前出来**

如果resp不填的话，那就是每次都会执行，如果填了的话，那就是当依赖参数更新了的时候才会执行















#### 5、useRef

作用：1、获取DOM元素；2、存取变量

useRef返回一个可变的ref对象，其.current属性被初始化为传入的参数

使用方法：感觉平常在input身上使用，自我感觉在子组件上使用也是可以的

这边感觉和ref差不多

```js
function TextInputWithFocusButton() {
  // 这个地方感觉就是定义了一下，指明身份其是一个ref，给其ref的公有属性，是谁的还不知道
  const inputEl = useRef(null);  // 接收useRef，null 为初始值，这边可以赋init value
  const save = useRef({value: '123'})  // 赋值 123
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();   // inputEl.current 就是当前DOM元素
    console.log(inputEl.current.value)  // 获取里面的值
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

注意：当ref对象的内容发生改变是useRef并不会通知你，变更.current属性不会引发组件重新渲染，如果想要在React绑定或解绑DOM节点的ref时运行某些代码，则需要使用回调Ref来实现





#### 6、useImperativeHandle

作用：可以让你在使用ref时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用ref这样的命令式代码。useImperativeHandle应当与forwardRef 一起

总结来说就是子组件暴露给父组件想暴露的，第二个回调函数中想传啥传啥

第三个参数，和其他的hook相同，就是改变的时候才会去执行函数

```js
useImperativeHandle(ref(传递来的), ()=>{}, [])
```





forwardRef ：

```js
import { forwardRef, useRef } from 'react'

const Forward = forwardRef((props, ref) => {
    return (
        <>
        <h3 ref={ref}>123</h3>
        <h4>456</h4>
        </>
    )
})

export default () => {
    const h3El = useRef(null);
    return (
    <>
      <Forward ref={h3El} />    //这边的ref拿到的只有h3的DOM
    </>
    )
}
```



```js
import { forwardRef, useRef, useImperativeHandle } from 'react'

const Imperative = forwardRef((props, refa) => {
    useImperativeHandle(refa, () => {
        name: 'zhangsan',
        focus: () => {
            
        }
    })
    return (
        <>
        <input type="text" />
        </>
    )
})

export default () => {
    const el = useRef(null);
    return (
    <>
      <Imperative ref={el} />    //这边的ref拿到的就是useImperativeHandle给的
    </>
    )
}
```





#### 7、useLayoutEffect

作用：和useEffect一样

区别：执行时间不同，useEffect是在componentDidMount以后执行的，useLayoutEffect在浏览器执行绘制之前执行（会阻塞组件挂载，慎用）





#### 8、自定义Hook

**注意：以use开头**

感觉就像new了一个对象