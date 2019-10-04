# 1.React

```
React元素
	1.变量可以嵌入标签中 或者标签的属性中
	2.Babel 把JSX语法转译为 React.createElement()
	3.React元素本质上是一个JS对象，在渲染后变成DOM
	4.已渲染的元素是不可变的 更新UI需要传入全新元素 ReactDOM只更新局部元素
	
	# 通常JSX元素
		1.HTML标签 const com = <HTML> {value} </HTML>
		2.自定义标签 const com = <Me> {value} </Me>
	# 渲染React元素到DOM中
		ReactDOM.render( 组件, document.getElementById('root') )
		
===================================================================
React组件
	1.返回JSX元素集合
	2.在实际应用<Welcome name='me'/>时候
		会将属性封装为对象 { name:'me' } 通过 props 传递给原组件函数
		最终通过函数创建组件
	3.ES6 Class 中 this.props 与函数组件 props 一致
	
	# 函数式组件
		function Welcome(props) { return JSX }
	# ES6组件 (推荐)
		class Welcome extends React.Component { // this.props
			render() { return JSX } }
			
===================================================================
组件状态
	1.在 class 内部添加 class构造函数
	2.componentDidMount() 方法会在组件已经被渲染到 DOM 中后运行
	3.componentWillUnmount() 方法会在组件被删除后运行
	4.通过 this.setState( newState ) 来更新组件状态
		- setState 是异步的, 不能依赖旧state的值
		- setState((state(旧), props(新)) => { }) 是同步的
	5.组件只能向子组件传递 state => props
	
	# ES6组件 (推荐)
		class Welcome extends React.Component { // this.props
			constructor( props ) {
                super(props);
                this.state = { ? };
              }
			render() { return JSX } }
			
===================================================================	
技巧
	1.条件渲染 
		- 声明变量 通过if语句进行选择渲染
		- && 运算符之后的JSX根据运算符之前的变量进行渲染
	2.通过返回null阻止渲染
	3.列表渲染 - array.map((val) => JSX) // 需要设置key
	4.双向绑定/受控组件 - 使表单value与state绑定/onChange时间更新state
	5.状态提升 - 共享的state放置到父组件中
===================================================================	
脚手架 Create React App
```

# 2.TypeScript

## 基础

```
1.npm install -g typescript
2.由微软开发的JS超集 - 浏览器/Node无法直接运行(Webpack - ts-loader)
3.简单的编译步骤 app.ts => tsc app.ts => app.js
4.以 .d.ts 为声明文件
```

## 特点

```
1.限定变量类型 let name: string = "myName"
2.函数
	- 可以限定函数返回值类型 function getName(): string[] { return string[] }
	- 可以定义可选参数 (need?: number) => { (need)?1:0 }
	- 可以定义默认参数 (need: number = 50) => { }
	- 可以定义剩余参数 (...need: number[]) => { } // 本质上是数组
3.数组/同类型
	- 数组解构: let [x,y] = myArray // 将数组的值赋值给对应的变量
	- 可以声明泛型数组 Array<Number> 使得在编写代码时就能发现错误而不是编译时
	- 元组/不同类型
4.联合类型
	- 允许多类型的变量类型 Type1 | Type2 | Type3 
5.接口/继承/类
	- interface/extends
	- class Me 'implements' interface
```



# 3.Ant Design Pro

```
管理系统中的右侧菜单
    1.在 config.ts 中配置路由
    2.根据路由配置来生成N级UI菜单
```

## UMI

```
UMI是一个 - 接受第三方框架插拔的脚手架 (蚂蚁金服)
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

## 