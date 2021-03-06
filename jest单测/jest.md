文档链接： https://jestjs.io/zh-Hans/ 



## 普通匹配器

1、expect() 返回一个期望的对象

2、.toBe() ：当jest运行时，它会跟踪所有失败的匹配器，以便它可以打印出很好的错误消息。用来测试精准相等

​	可以添加上not     .not.toBe()     .mot.toEqual

3、toEqual() ：可用来测试对象是否相等

4、toBeCalled()   被调用到

```js
test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
});
```



```js
.toBeNull()            //匹配null

.toBeUndefined()         //匹配undefined

.toBeDefined()             // 匹配defined

.toBeTruthy()                 //匹配if 语句为真

.toBeFalsy()					//匹配if语句为假

//这边也是可以和not连接使用的
```





### 数字

```
toBeGreaterThan()
toBeGreaterOrEqual()
toBeLessThan()
toBeLessOrEqual()
toBeCloseTo()   //当两个浮点数相加的时候，可以使用这个，因为toBeEqual()会四射五入，导致报错
```



### 字符串

.toMatch()匹配正则表达式

```js
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});
```





### 数组

.toContain()

检查数组是否包含某个特定项

ps：有点像array.includes()



### 抛出错误

如果想要抛出错误用 toThrow ()

```

```





## 异步测试

直接.then就好了

async 、await也可以

```js
test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});
```



## 为多次测试重复设置的工作

如果有一些要为多次测试重复设置的工作，可以使用beforeEach、afterEach

```js
import Methods from 'src/windows/Eip/Methods'

beforeEach(() => {
  jest.resetModules()
  jest.clearAllMocks()
})

jest.mock('src/utils/rpc', () => ({
  _delete: jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve({})
    })
  })
}))

import rpc from 'src/utils/rpc'

let self = {
  createEvent: jest.fn(),
  incEventSuccess: jest.fn(),
  incEventFail: jest.fn(),
  dbData: {
    eip: {
      uuid: {
        name: '',
        vipUuid: ''
      }
    }
  }
}

let uuidList = ['uuid']

let Delete = Methods.methods.delete.bind(self)

describe('Eip.Methods.delete', () => {
  test('Success', async () => {
    await Delete(uuidList, false)
    expect(self.createEvent).toBeCalled()
    expect(rpc._delete).toBeCalled()
    expect(self.incEventSuccess).toBeCalled()
    expect(self.incEventFail).not.toBeCalled()
  })
  test('SuccessWithDeleteVip', async () => {
    await Delete(uuidList, true)
    expect(self.createEvent).toBeCalled()
    expect(rpc._delete).toBeCalled()
    expect(self.incEventSuccess).toBeCalled()
    expect(self.incEventFail).not.toBeCalled()
  })
  test('Failed', async () => {
    rpc._delete = jest.fn(() => {
      return new Promise((resolve, reject) => {
        reject({})
      })
    })
    await Delete(uuidList, false)
    expect(self.createEvent).toBeCalled()
    expect(rpc._delete).toBeCalled()
    expect(self.incEventSuccess).not.toBeCalled()
    expect(self.incEventFail).toBeCalled()
  })
})

```



## Mock Function

Mock函数支持测试代码之间的连接

实现方式：擦除函数的实际实现、捕获对函数的调用（以及在这些调用中传递的参数）

所有的mock函数都有一个特殊的.mock属性，它保存了关于此函数如何被调用、调用时的返回值的信息，还追踪每次调用时this的值

例如：

```js
function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}




const mockCallback = jest.fn(x => 42 + x);
forEach([0,1], mockCallback);

expect(mockCallback.mock.calls.length).toBe(2)    // 此mock函数被调用了两次
expect(mockCallback.mock.calls[0][0]).toBe(0)     //第一次调用函数时第一个参数是0
expect(mockCallback.mock.calls[1][0]).toBe(1)      // 第二次调用函数第一个参数是1
expect(mockCallback.mock.result[0].value).toBe(42)  //第一次函数调用的返回值是42
```







## 模拟模块

假定有个从api获取数据的类，现在为了测试该方法而不实际调用api，可以使用jest.mock(…)函数自动模拟axios模块

在测试中调用api的缺点：使测试缓慢与脆弱





## 快照测试

toMatchSnapshot()

```js
import React from 'react';
import Link from '../Link.react';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<Link page="http://www.facebook.com">Facebook</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
```



第一次运行此测试文件，jest创建一个快照文件，如下

```js
exports[`renders correctly 1`] = `
<a
  className="normal"
  href="http://www.facebook.com"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}
>
  Facebook
</a>
`;
```

快照文件应与代码更改一起提交，并在代码检查过程中进行检查。jest使用pretty-format使得在代码检查期间易于阅读。在随后的测试运行中，jest会将渲染的输出与先前的快照进行比较。如果它们匹配，则测试通过。如果它们不匹配，则测试运行器在代码中发现了错误，应给予修复，或者实现更改，并且更新快照