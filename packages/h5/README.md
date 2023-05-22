# 前端 H5 模版

## 运行+打包

```js
// run
npm i
npm run dev
// build
npm run build:test
npm run build
```

## 目录详解

- **api** api
- **assets** 资源目录
- **common** 全局公用组件
- **components** 个别页面公用组件
- **composables** 全局 hooks
- **router** 路由文件
- **store** pinia 数据管理
- **style** 公共样式
- **utils** 工具函数
- **views** 页面

## npm包使用

- [vant](https://vant-ui.gitee.io/) h5组件库
- [vueuse](https://vueuse.org/guide/) vue hooks
- [@peeeng](https://github.com/LiJiaPeng001?tab=repositories) utils + css + eslint-config 工具函数，预置css以及eslint规范

## 注意事项

- router/routes、store、composables 文件夹下创建文件 **export** 即可全局使用

## 提交规范

具体详见 ./commitlint.config.js
