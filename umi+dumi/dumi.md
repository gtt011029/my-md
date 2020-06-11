文档： https://d.umijs.org/ 

一句话介绍

基于umi，为组件开发场景而生的文档工具

ps：现在感觉，如果不参与配置的话，没有什么技术点



正常写法：

直接在index.md中写demo，类似这样，dumi会将jsx/tsx代码当作React Component进行渲染然后放在demo包裹器中

~~~ts
```tsx
import React from 'react'
import { State } from '@zstack/components'

export default () => {
  return (
    <>
    <div>
        <State type="running" icon="hahaa" value="运行中" />
    </div>
    <div>
        <State type="other" icon="heihei" value="暂停" />
    </div>
    </>
  )
}

```
~~~



外部引入：

目的：为了使得重型Demo也能够利于编写和维护，dumi支持从外部引入一个React Component作为Demo进行渲染，只需利用code标签即可实现

而且这样写比较易于维护

```
<code src="/path/to/Demo.tsx" />
```

