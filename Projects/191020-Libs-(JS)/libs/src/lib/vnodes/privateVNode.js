/*
	背景: 
		现在有这样一个场景，进入页面，展示出了列表，
		点击某列表项目的时候弹出 Modal ， 通过 Modal 上的组件更新/添加这个列表项目
		现在希望根据自定义的数据动态生成 Modal 上的组件
	实现:
		1.准备一个数组用于渲染 Modal 上的组件 => [ {组件1名称, 组件1需要的属性集合}, ...]
		2.把数组传入这个文件的 getComponentsTrees => 返回对应的Vue构造器
		3.在 Modal 中根据返回的构造器创建挂载Vue实例
	# 这个库只实现步骤2
*/
import Vue from 'vue'

export default function getComponentNodeTrees(nodeMapArray) {
	// 返回根构造器
	return Vue.extend({
		render: (createElement) => {
			// 1.构建构造器子集
			let childrens = []
			nodeMapArray.forEach(element => {
				let vnode = createElement( 
					element.key, // 标签名称/组件名
					{ 
						attrs: element.sAttrs, // 普通属性
						on: element.sOn, // v-on
						props: element.sProps, // v-bind
					},
					[element.text] // innerHTML
				)
				childrens.push(vnode)
			})
			// 2.返回根构造器
			return createElement( 'div', {}, childrens )
		}
	})
}