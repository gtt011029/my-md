# graphgl

## 简介：

是一种用于API的查询语言。GrapgQL对API中的数据提供了一套易于理解的完整描述，使得客户端能够准确地获得它需要的数据，而且没有任何冗余，也让API更容易地随着时间推移而演进，还能用于构建强大地开发工具。

官网：

https://graphql.org
https://graphql.org.cn



 https://segmentfault.com/a/1190000014131950 



优势：

1、准确地获得自己想要的数据，不多不少

2、获取多个资源，只需要发一个请求

3、描述型的查询语言

4、描述所有可能的系统类型  //加上类型判断

  

## 与restFul的对比

属性状态转移 representational state trasfer

通用的系统架构，不受语言的限制

1、restful一个接口只能返回一个资源，graphql一个接口可以返沪多个资源

2、restful用不同的url来区分资源，grapgql用类型来区分资源





## 基本类型

大多数情况下，你所需要做的只是使用GraphQL schema language 指定你的API需要的类型，然后作为参数传给buildSchema函数

支持的标量类型有 String、Int、Float、Boolean、ID

默认情况下，每个类型都是可以为空的----意味着所有标量类型都可以返回null。使用感叹号可以标记一个类型不可为空，如String！ 表示非空字符串

如果是列表类型，使用方括号将对应数字包起来，如[int]，表示一个整数列表





```js
var schema = buildSchema(`
type Query {
  hello: String,
  welcome: String,
  age: Int,
  tags(accountUuid: String, type: String): [Tag]
}`)    // 使用graphQL schema language 构建一个schema  这里定义查询的语句和类型

type Tag {
  name: String
  uuid: String
  color: String
}
```







```js
extend type Query {
  vms(conditions: [String], pageIndex: Int, pageSize: Int): [Vm]!
}   //这边可以添加参数   conditions: [String], pageIndex: Int, pageSize: Int

type Vm {
  name: String
  uuid: String
  createDate: String
  lastOpDate: String
  state: String,
  vmConsoleMode: String
  vmNics: [VmNic]
  owner(count: Int): Owner
  tags(accountUuid: String, type: String): [Tag],
  capabilities: Capabilities
  host(loginType: LoginType!, licType: LicType!): Host
  mdevDeviceSpecs(licType: LicType!): [MdevDeviceSpec]
  vmCdRoms: [VmCdRom]
  vmCdRomLimit: Int
  numa: Boolean
  cluster: Cluster
}
type VmNic {
  deviceId: Int
}

type Owner {
  name: String
}

type Tag {
  name: String
  uuid: String
  color: String
}

type Capabilities {
  LiveMigration: Boolean,
  MemorySnapshot: Boolean,
  Reimage: Boolean,
  VolumeMigration: Boolean
}

type MdevDeviceSpec {
  uuid: String
  name: String
  specification: String
  type: String
  state: String
  createDate: String
  lastOpDate: String
}

type VmCdRom {
  uuid: String
  name: String
  deviceId: Int
  vmInstanceUuid: String
  createDate: String
  lastOpDate: String
}

```





### 别名（Aliases）

就是起一个别名



### 片段（Fragment）

可复用性单元，可复用的字段的集合，这边可以理解为公有的字段提取出来，组成的obj，提高代码的复用性



### 操作类型和操作名称

操作类型包括：query mutation subscription 用来描述打算做什么类型的操作

操作名称：是指操作的有意义的明确的名称

```js
query HeroNameAndFriends {
  hero {
    name
    friends {
      name
    }
  }
}
```



### 变量（Variables）

就是参数是可变的，这样的话，就不用取别名了，取别名真的是很坑的操作

1. 使用 `$variableName` 替代查询中的静态值。
2. 声明 `$variableName` 为查询接受的变量之一。
3. 将 `variableName: value` 通过传输专用（通常是 JSON）的分离的变量字典中

这边呢，就像普通的传参一样，但是变量的前缀必须为$





### 指令（Directives）

这边呢，就是根据传来的参数，判断需要的字段

例如：主列表页面不需要type字段，但详情页需要type字段，这边呢，就可以给一个参数，表示是需要还是不需要该字段

```js
# { "graphiql": true, "variables": { "episode": "JEDI", "withType": false } }
query Hero($episode: Episode, $withFriends: Boolean!) {
  hero(episode: $episode) {
    name
    type @include(if: $withType) {
      name
    }
  }
}
// 这边的意思就是 if withType = true的情况下，会有 type字段，否则没有type字段
```

==@include==