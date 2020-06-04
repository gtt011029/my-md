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



## useIntl 

可以获取formatMessage等api来进行具体的值的绑定

