# 1.React

## 基础

```
ReactDOM.render( JSX-Tree, document.getElementById('root') )
	- 渲染React元素到DOM中, 通常只渲染一次 
	- 调用后DOM不可改变, 除非重新使用 render, 只更新变更的部分

===================================================================
React元素
	0.元素通常由 JSX表达式 构成
    	- 可以通过单括号{}插入变量/函数/注释
    	- JSX ==(Babel)=> React.createElement('HTML'): 本质上是一个JS对象
    1.组件-元素集合
    	- 函数式 function Welcome(props) { return JSX }
    	- ES6 class Welcome extends React.Component { render() { return JSX } }
    	# 在class中需要使用this.props
    	1.1 使用组件<UI>
    		- ReactDOM.render 解析 <Welcome name='me'/>
    		- 把 { name:'me' } 封装进props(只读) 再调用原函数 Welcome 返回 HTML
    		- 最后 ReactDOM.render 进行DOM渲染
    	1.2 组件的生命周期
            - componentDidMount(){} 方法会在组件已经被渲染到 DOM 中后运行
            - componentWillUnmount(){} 方法会在组件被删除后运行
    		
			
===================================================================
组件状态
	1.在 class 内部添加构造函数
		constructor(props) {
			super(props);
			this.state = {date: new Date()};
		}
	2.通过 this.setState( newState ) 来更新组件状态
		- this.setState 直接更改 satae 可能是异步的, 通过函数 return newState 是同步的
		- state 的更新会被合并
	3.父组件只能向子组件传递状态 state => props
			
===================================================================
0.事件绑定 
	- 绑定事件最好为 onClick={this.callBack()}
	- 如果为 onClick={this.callBack} 必须在构造函数中对 回调函数绑定 .bind(this)
1.条件渲染
    - render前 声明变量 通过if语句进行选择渲染
    - render中 && 运算符之后的JSX根据运算符之前的变量进行渲染 / 三元表达式
	- 通过返回null阻止渲染
2.列表渲染
	- let array; array.map((value) => JSX) // 元素上需要设置key属性
4.受控组件
5.状态提升
	- 将共享的state放置到父组件中
===================================================================	
脚手架 Create React App
```

## Redux

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



# 3.后台管理系统

```
管理系统中的右侧菜单
    1.在 config.ts 中配置路由
    2.根据路由配置来生成N级UI菜单
```

## UMI

```
通过 UMI 来快速搭建 React 应用脚手架 (蚂蚁金服)
    npm create umi
    ant design pro: 企业级中后台前端/设计解决方案
    - 使用了 Dva 进行状态管理
```

## Dva

```
dva 首先是一个基于 redux 和 redux-saga 的数据流方案，
然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，
所以也可以理解为一个轻量级的应用框架。

============================================================
1.定义路由-组件页
2.编写 UI component
3.编写 Models
	- 包含同步更新state的 reducers / 函数式更改state
	- 处理异步逻辑的 effects
4.在路由-组件页中添加 Connect

============================================================
dva 在组件内部更改 state
    通过 dispatch 函数调用一个 action
        dispatch({ 
            type: 'add', // 调用Models内的 reducers / effects
            payload: {} // 需要传递的信息
        })

============================================================
Dva
	数据的改变发生通常是通过用户交互行为或者浏览器行为（如路由跳转等）触发的，
	当此类行为会改变数据的时候可以通过 dispatch 发起一个 action
	如果是同步行为会直接通过 Reducers 改变 State
	如果是异步行为（副作用）会先触发 Effects 然后流向 Reducers 最终改变 State
```

## 我的步骤

```
    1.git clone https://github.com/ant-design/ant-design-pro.git
    2.安装依赖 npm install
进入了Demo展示界面
============================================================
```

