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
***********************************************************************************
# 创建一个Vue应用
	var vm = new Vue({
		el: '#app' // 绑定DOM结点作为这个Vue根实例(特有)
		templete: "HTML" // 绑定模板作为组件
		data / computed / methods
	})
# 已为 #app 绑定Vue实例, 可以在其HTML中使用 Vue 语法

***********************************************************************************
VM生命周期
	Vue实例 -> 初始化一个空对象/默认事件/函数 → beforeCreate
    data/methods → created
    编译<template> → beforeMount
    <template>替换到浏览器中 → mounted 页面渲染完毕
    → beforeUpdate 数据更新:页面根据data已经进行了变换
    → update 启动 
    → destory 启动
```

## 组件 - component

```
***********************************************************************************
组件是可以复用的 Vue 实例
	1. 组件控制模板字符串"<templete>"/单vue文件
	2. 注册
		全局: Vue.component('component', {..详见基础..})
		局部: components: { 'component': {..详见基础..} } （常用）
	3. 动态组件
		3.1 <component :is="currentTabComponent"></component>
		3.2 ('component', {
			render: (createElement) => { return createElement(...) }
		})
	# createElement(
		'HTML/Component-Name', // 必填
		{ data / computed / methods  }, // 可选
		['String', 'createElement(...)'] // 可选
	)
	
	
	
	
# 通常使用HTML语言来创建模板语法
# 函数式模板-render函数通过传入函数,返回一个createElement函数的调用结果,创建虚拟DOM
var vm = new Vue({
    el:"#app",
    render:function(cE){
    	return cE('tag',tag属性集合{ class:..,style:..,});
    }
    # 返回一个虚拟DOM树替换VM
    # 简写:render: c => c(...);
})

***********************************************************************************
# 使用父组件
    1.数据
    	父: <name-x :中间变量=父数据>
    	子: props:["中间变量"]
    2.方法
        父: <name-x v-on:"中间变量"=父方法>
        子: <template v-on:click="子方法">
        this.$emit("中间变量"，参数1...)
        
# 使用子组件数据
	数据/方法
		父: <name-x ref='name'>
		this.$refs.name.fun/data
		
# 兄弟组件：
	创建一个新Vue的实例，让各个兄弟共用同一个事件机制
	创建空模板：export default new Vue()
	注册: mounted() => emptyVue.$on("中间变量",(参数)=>{回调})}//注册事件
	触发: emptyVue.$emit("中间变量"，参数...)
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