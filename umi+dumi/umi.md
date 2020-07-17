感觉像是一个高级的react脚手架

但是还是有些区别的

区别：create-react-app 是基于webpack的打包层方案，包含build、dev、lint等，他在打包层把体验做到了极致，但是不包含路由，不是框架，也不支持配置，所以如果想要基于它修改部分配置，或者希望在打包层之外也做到收敛时，就会遇到困难

umi这边很多地方参考了nextjs



```
.
├── package.json
├── .umirc.ts
├── .env
├── dist
├── mock
├── public
└── src
    ├── .umi
    ├── layouts/index.tsx
    ├── pages
        ├── index.less
        └── index.tsx
    └── app.ts
```

umi还有一些钩子（hook）可供使用

## useIntl 

可以获取formatMessage等api来进行具体的值的绑定



路由：

1、在配置文件中通过router进行配置

2、约定式路由，又叫文件路由，不需要手写配置，通过目录和文件及其命名分析出路由配置。如果没有routes配置，umi会进入约定式路由模式，然后分析src/pages目录拿到路由配置

注意：以下不会被注册为路由

1. 以.或_开头的文件或目录
2. 以d.ts、spec.ts、e2e.ts结尾的测试文件
3. componments、componment目录
4. utils、util目录
5. 文件内容不包含jsx元素







使用约定式路由：根据目录结构自动生成路由



