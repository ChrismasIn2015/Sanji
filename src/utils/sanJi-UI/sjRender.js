// 这段代码是为了在 Vue 中全局调用组件 SanJi 组件
import Vue from 'vue'

// * 创建实例 并挂载用户确认组件的模板
import sjConfirm from './sjConfirm.vue'
const vm_confirm = new Vue({
  render(createElement) {
    return createElement(sjConfirm)
  },
}).$mount() // 虚拟DOM转为实际DOM结点
document.body.appendChild(vm_confirm.$el) // 挂载
const myConfirm = vm_confirm.$children[0]
export function $sjConfirm(option, next) {
  myConfirm.toShow(option, next)
}

// * 创建实例 并挂载系统信息提示组件的模板
import sjTip from './sjTip.vue'
const vm_tip = new Vue({
  render(createElement) {
    return createElement(sjTip)
  },
}).$mount() // 虚拟DOM转为实际DOM结点
document.body.appendChild(vm_tip.$el) // 挂载
const myTip = vm_tip.$children[0]
export function $sjTip(message) {
  myTip.toShow(message)
}
