# 商户管理系统

## UMI

UMI是一个 - 接受第三方框架插拔的脚手架 (蚂蚁金服)

```
create-umi
    project
    	通用模式：是否启用 TypeScript/umi-plugin-react
    ant-design-pro
    	仅包含 ant-design-pro 布局的脚手架，具体页面可通过 umi block 添加
```

```
重要的目录
	mock                           // mock 文件所在目录，基于 express
    config
        config.js                  // umi 配置，同 .umirc.js，二选一
    src                            // 源码目录，可选
        layouts/index.js           // 全局布局
        pages                      // 页面目录，里面的文件即路由
            404.js                 // 404 页面
            page1.js               // 页面 1，任意命名，导出 react 组件
            page2.js               // 页面 2，任意命名
        global.css                 // 约定的全局样式文件，自动引入，也可以用 global.less
        global.js                  // 可以在这里加入 polyfill
        app.js                     // 运行时配置文件
```

## Ant Design Pro

ADP是管理系统的UI集合 (蚂蚁金服)

```
管理系统中的右侧菜单
    1.在 config.ts 中配置路由
    2.根据路由配置来生成N级UI菜单
```

## React

```
1.得到组件
	JSX语法 <= 嵌套HTML <= 声明变量/函数
	这种语法无法直接在任何现成的 JavaScript 引擎里运行，必须经过转换
定义组件 
    function Welcome(props) { return HTML; }
    class Welcome extends React.Component {
      render() { return HTML; }
    }

```

## TypeScript

```
TypeScript 是 JavaScript 的一个超集，由 Microsoft 开发并开源
除了支持 ES6 的所有功能，还提供了静态类型检查
采用 TypeScript 编写的代码可以被编译成符合 ES5、ES6 标准的 JavaScript。
 TypeScript 的缺点在于语法相对于 JavaScript 更加啰嗦，并且无法直接运行在浏览器或 Node.js 环境下。
```

