# Vue

```
主要优点
	- 响应式数据绑定
	- 组件化开发
***********************************************************************************
传统MVC开发模式
	后台 M：model：含数据的CRUD操作：根据输入返回数据
	后台 C：controller：负责业务逻辑，根据输入调用M给予输出
	前端 V：view：负责视图的操作：根据输入变换视图
		# Vue使用了MVVM开发模式
		M：单纯的数据
		V：图形化代码：HTML
		VM：分割了M和V，Vue通过VM组合不同的M和V，提供了双向绑定
		# VM 就是视图和数据的控制台，能自动更新DOM
```

## 基础

```
    data: {msg...},
    methods: {fun},
    computed: {fun对}: 计算属性(本质是返回复杂return会产生复用缓存),
    watch: { "data.msg":fun } : 监听data，路由$route.path...
***********************************************************************************
    v-bind/:class="i"/{style:boolean}
    v-on/@click.prevent="fun"
        //阻止(点击a刷新页面)默认行为.prevent//阻止冒泡.stop
    v-if/v-show="i(boolean)"
    v-model="i"(双向数据绑定)
***********************************************************************************
    v-for="i in data/methods/整数"
    v-for="(value,index) in item/数组"
    v-for="(value,key,index) in item/对象"
	# 使用:key="a.id" 保证数据唯一性
	
# 在vm实例中想获取data/methods等其他模块必须通过this.a/$data.a来进行访问
# 可以通过vm.$refs.name获取DOM元素(绑定了ref属性),也可以获得其中的数据/方法
***********************************************************************************
v-model 自动更新原理
	# 工具: 为target对象设置访问器对象属性(里面保存了仅访问器使用的数据)
		Object.defineProperty(target, name, {get:fun,set(val):fun})
		# 赋值 target.name="" 就是调用set方法(赋的值是参数)
		# get/set的this指向target对象
	# 工具: 劫持DOM
		DocumentFragment.append(dom)
		当DOM.appendChild(DocumentFragment)时,会删除原来的DOM
		我们只需要获取含有'v-model'的结点就可以了
	2.初始化
		- 创建Vue对象,初始化VM.data
			# 为VM设置访问器/将data设置为访问器属性
		- 遍历DOM,遍历出所有v-model子节点,进行劫持返回新DOM
		- v-model子节点.value = VM.data(触发了访问器get方法)
	3.视图更新(事件触发)-data更新
		- 遍历DOM,遍历出所有v-model子节点,进行劫持返回新DOM
		# 劫持时绑定事件
		# 触发事件：VM.data = v-model子节点.value(触发了访问器set方法)
			- set方法 1.更新data 2.作为发布者通知更新
	4.发布者通知更新
		- 遍历DOM,遍历出所有v-model子节点,进行劫持返回新DOM
		# 劫持时初始化一个订阅者对象
			- 在构造方法中从VM.data获取数据(触发了访问器get方法)
			- 在构造方法中有更新方法通过.nodeValue更新视图
			# 触发get方法时把这个订阅者放入订阅者队列
			# 触发set方法时触发订阅者队列中所有订阅者的更新方法
```

## 组件 - component

```
VM生命周期
        1.创建一个Vue实例
        2.初始化一个空对象/默认事件/函数 
    → beforeCreate 启动
        3.初始化我们的data/methods
    → created 启动
        4.开始编译模板<template>放到内存中(虚拟DOM)
    → beforeMount 启动
        5.把内存中编译好的模板<template>中(虚拟DOM)替换到浏览器中(需要el:'#id')
    → mounted 页面渲染完毕
    → beforeUpdate 启动
        6.数据更新:页面根据data已经进行了变换(不一定要v-model)
    → update 启动
    → destory 启动
***********************************************************************************
VUE虚拟DOM
    原生JS或JQ操作DOM时，浏览器会从构建DOM树开始从头到尾执行一遍流程。
    用JS对象模拟DOM节点的好处是，页面的更新可以先全部反映在JS对象(虚拟DOM)上，
    操作内存中的JS对象的速度显然要更快，
    等更新完成后，再将最终的JS对象映射成真实的DOM，交由浏览器去绘制。
***********************************************************************************
1.创建模板
	<template id="#"><div>只能有一个根结点</div></template>
2.新建组件对象
	# var name = {template:"#id"}
	# export default {}
3.注册组件
    全局: Vue.component("nameX",name)
	局部: import name/component:{ "nameX":name, ...}
4.使用组件
	<name-X></name-X>
***********************************************************************************
# 使用父组件数据
    1.子组件对象中添加 props:["中间变量"]
    实际<name-x v-bind:中间变量=父数据>
    2.子组件改变父组件数据
        <template v-on:click="子方法">
        methods:{子方法:function(){this.$emit("中间变量"，参数1...);}}
        实际<name-x v-on:"中间变量"=父方法>
# 使用子组件数据
	1.父组件直接使用 this.$refs.name.fun/data + 实际<name-x ref='name'>
# 兄弟组件：创建一个新Vue的实例，让各个兄弟共用同一个事件机制
	创建空模板：export default new Vue()
    接收数据:
    	import emptyVue
    	mounted(){//数据渲染完毕
            emptyVue.$on("中间变量",(参数)=>{回调})}//注册事件
	发送数据：
    	import emptyVue
        <template v-on:click="子方法">
        methods:{子方法:function(){emptyVue.$emit("中间变量"，参数...);}}//触发事件
```

## 函数组件 - render

```
# 通常使用HTML语言来创建模板语法
# 函数式模板-render函数通过传入函数,返回一个createElement函数的调用结果,创建虚拟DOM
var vm = new Vue({
    el:"#app",
    render:function(cE){
    	return cE('tag',tag属性集合{ class:..,style:..,});
    }
    # 返回一个虚拟DOM树替换VM
    # 简写:render: c => c(...);
});
```

## 路由 - router

```
# 路由能根据路径的不同而在VM机中展示不同的组件
1.导入 
	npm i vue-router
2.创建路由对象
	Vue.use(VueRouter);
	var rou = new VueRouter({
		routes:[
			规则1	{
				path:'/'',redirect:"/index",component:组件,
				children:[{path:'a1', component:目标组件}, ...]},
				# children会被渲染到/index的router-view中
			规则2	{path:'/', component:?},
			规则3	{path:'/', component:?}]})
3.APP注册: router:路由对象,
4.使用路由
	JS访问: 
		<router-link :to="{ name:'user', params:{userId: 123} }">
		this.$router.push({ name:'user', params:{userId: 123} });
	获得参数: 
		this.$router.query.id/name
		this.$router.params.id/name
		this.$route.params.name //当前路由
***********************************************************************************
```

## 状态管理 - vuex

```
npm install vuex --save
1.创建仓库入口 /store/index.js
	Vue.use(Vuex)
	export default Vuex.Store({ modules: {} })
2.
```

# Vue-cli

## 基础

```
安装 Node.exe
全局安装
	vue i @vue/cli -g
	依赖 @vue/cli-service 进行配置/拓展
传统生成项目
	1.vue create name
	2.public/index.html 文件是一个会被 html-webpack-plugin 处理的模板
	
	# 调整 webpack 配置最简单的方式就是在 vue.config.js 中的 configureWebpack 选项提供一个对象：
	// vue.config.js
    module.exports = {
      configureWebpack: {
        plugins: [
          new MyAwesomeWebpackPlugin()]}}
项目本地测试
	npm run serve (vue-cli-service serve)
	命令会启动一个开发服务器 (基于 webpack-dev-server) 
	可以使用 vue.config.js 里的 devServer 字段配置开发服务器。
项目打包
	npm run serve (vue-cli-service build)
	会在 dist/ 目录产生一个可用于生产环境的包，带有 JS/CSS/HTML 的压缩，
```

# 