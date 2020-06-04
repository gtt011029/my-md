关于apollographql客户端

 https://www.apollographql.com/blog/apollo-client-now-with-react-hooks-676d116eeae2 

中文文档：

 https://apollographqlcn.github.io/react-docs-cn/ 



ui-4.0张矗github：

 http://gitlab.zstack.io/chu.zhang/zstack-ui 

 uri: 'http://localhost:3000/graphql',

## 简介

apllo client 是一个完整的javaScript应用程序状态管理库。只需要写一个graphql查询，apollo client将负责请求和缓存数据，以及更新UI





## 一、read & write

两组命令式api

readQuery

writeQuery

readFragment

writeFragment



### apollo client 三大钩子

useQuery    ： 获取数据

useLazyQuery

useMuation ： mutation对应的就是graphql里面的mutation中的一系列api

useSubscription





基本查询

使用graphql容器，只需要使用gql模板字符串解析我们的查询，然后将其作为第一个参数传递给graphql容器

这边之后的过程是这样的：

查询从apollo客户端数据store中加载的，如果数据不在store中，就会向服务端请求



ui-4.0是传递给useQuery

