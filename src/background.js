// ********************************** 0.导入自己的主进程代码
// const isDevelopment = process.env.NODE_ENV !== "production";

// ********************************** 1.使用窗口模块 BrowserWindow 对象
import { BrowserWindow, Menu } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

let mainWindow = null
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    resizable: false,
    webPreferences: {
      nodeIntegration: true, // 这行代码表示允许使用 node API
    },
  })
  Menu.setApplicationMenu(null) // 关闭顶部窗口

  // 根据环境加载SPA
  let devURL = process.env.WEBPACK_DEV_SERVER_URL
  if (devURL) {
    // localhost:8080
    mainWindow.loadURL(devURL)
  } else {
    createProtocol('app')
    mainWindow.loadURL('app://./index.html')
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// ********************************** 2.使用 protocol 模块保证浏览器正确加载本地资源（vue...electron-builder）
import { protocol } from 'electron'
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

// ********************************** #.添加主进程监听，监听来自渲染进程的事件
import { ipcMain } from 'electron'
const ipc = ipcMain
// Node 打开Chromium控制台
ipc.on('openDevTool', (sys, params) => {
  console.log('ipc start openDevTool')
  mainWindow.webContents.openDevTools()
})
// Node 发送HTTP请求取得股票数据
ipc.on('getStockById', (sys, params) => {
  console.log('ipc start getStockById', params.next)
})

// ********************************** 3.使用 app 模块管理 electron 应用生命周期
import { app } from 'electron'

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', async () => {
  createWindow()
})
