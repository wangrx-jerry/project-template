# YL

### 启动dev
```
npm run serve
```

### Lints and fixes files
```
npm run lint
```

### node 生成组件文件
```
npm run new:comp
```

### node 生成页面组件（待优化）
```
npm run new:views
```

### 配置参考
See [Configuration Reference](https://cli.vuejs.org/config/).

### 建议node版本 <= 12.14.0

## 注意
> 1. 文件结构说明：
- .vue
    - views: 放视图组件，根据 模块 建立文件夹
    - components：放共享组件
- .css
    - variable.css：变量级的css
    - common.css：全局通用样式
    - reset.css：更改组件样式
- .js
    - 旧版系统的Helper 更改为 util

> 2. 依赖
- 为了减少压缩包体积，部分第三方库引用cdn，因此注意开发需要网络连接
- 旧系统的部分依赖已迁移，有其他依赖再通知进行引入

> 3. 路由
- viwes的的模块在router也对应一个模块文件，文件中存index.js
- 新增的模块 无需 引入router/index.js（自动会引入）
- /* webpackChunkName: "bomFlow" */ ：定义打包后的文件名

> 4. 代码规范
- 采用Standard config， 已修改了部分配置，如果有语法和格式问题，请参考报错自行修改

## TODO
[] sass动态生成变量级 css
[] 自定义主题