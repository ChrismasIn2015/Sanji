// ********************************** #.添加主进程监听，监听来自渲染进程的事件
import { ipcMain } from 'electron'
const ipc = ipcMain
// Node 打开Chromium控制台
// let ipc = require("electron").ipcRenderer;
// ipc.send("openDevTool");
ipc.on('openDevTool', (event, arg) => {
  return new Promise((resolve, reject) => {
    event.sender.webContents.openDevTools()
    resolve(true)
  })
})

// Node 发送HTTP请求取得相关数据
ipc.on('getStockById', (event, arg) => {
  return new Promise((resolve, reject) => {
    console.log('ipc start getStockById', arg.next)
    resolve(true)
  })
})

// Node 打开OS默认浏览器
ipc.on('openDefaultBrower', (event, arg) => {
  return new Promise((resolve, reject) => {
    var exec = require('child_process').exec
    console.log(process.platform)
    switch (process.platform) {
      case 'darwin':
        exec('open ' + arg.url)
        break
      case 'win32':
        exec('start ' + arg.url)
        break
      default:
        exec('xdg-open', [arg.url])
    }
    console.log('ipc start openDefaultBrower', arg.url)
    resolve(true)
  })
})
