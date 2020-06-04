官网：

https://midwayjs.org
https://midwayjs.org/zh-cn

随着typescript的成熟，nodejs里面也出现了类似spring的框架：miaway、nestjs

web全栈应用开发框架，基于nodejs的全栈开发解决方案，阿里开发

这边可以简单的理解为nodejs的框架



一、目录结构

1、以往的app等都迁移至/src/app下，作为web层

2、传统的业务逻辑，移动到/service

3、src/controller/** 用于解析用户的输入，处理后返回相应的结果



midway针对web请求，提供了和koa-router对应的方法装饰器

- @get
- @post
- @del
- @put
- @patch
- @options
- @head
- @all