export default class Invoker {
  vuePointer = null
  // ============================ 构造函数
  constructor(vuePointer) {
    this.vuePointer = vuePointer
  }

  // ============================ 方法区
  // 打开控制台
  async openDevTool() {
    try {
      let ipc = require('electron').ipcRenderer
      await ipc.send('openDevTool')
    } catch (error) {
      this.vuePointer.$tip(error)
    }
  }
  // 打开浏览器
  async openBrower(url) {
    try {
      let ipc = require('electron').ipcRenderer
      ipc.send('openDefaultBrower', { url: url })
    } catch (error) {
      this.vuePointer.$tip(error.message)
    }
  }
}
