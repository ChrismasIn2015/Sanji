/*
 * 安装 electron 可能会有网络卡慢现象，需要指定国内镜像下载地址
 *    $ npm config edit 唤出npm配置文件，添加下方配置
 *    electron_mirror=https://npm.taobao.org/mirrors/electron/
 * 调试主进程
 *    使用调试模式启动 "start": "electron --inspect:5858 ."
 *    进入浏览器设备配置界面 inspect/#/devices 输入对应 url 进行连接
 *
 * 主进程 main.js
 *    是 electron（本质上是node应用）的应用入口
 *      => package.json: "start": "electron ." 这个点就是 main 指定的文件（Node 默认 index.js）
 *      => package.json: "main": "main.js"
 *    同时也是该 electron应用 的主进程
 * 渲染进程
 *    electron应用使用了 Chromium 来展示 web 页面, 每个 Electron 中的 web 页面运行在它自己的渲染进程中。
 *    所有Electron的模块都被指派给一种进程类型, 因此许多模块只能被用于主进程或渲染进程中
 *
 * 初始化 package.json 的时候
 * 1.需要设置启动方式 "start": "electron ."
 * 2.electron 功能均来自 const ? = require("electron") 模块
 */

// ********************************** 1.使用窗口模块 BrowserWindow 对象
const { BrowserWindow } = require("electron");
function createWindow() {
  const win = new BrowserWindow({
    width: 1360,
    height: 768,
    webPreferences: {
      nodeIntegration: true // !!! 这行代码表示允许使用node代码使用非浏览器API !!!
    }
  });
  win.loadFile("./dist/index.html");
  win.webContents.openDevTools(); // 需要打开控制台
}

// ********************************** 2.使用 app 模块管理 electron 应用生命周期
const { app } = require("electron");

// 2.1 在app准备完毕后创建窗口
app.on("ready", createWindow);
// 2.2 在窗口全部关闭后退出应用
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
/*
 * 2.3 在窗口全部关闭后退出应用
 * 其他 app 事件
 * before-quit 关闭窗口之前
 * will-quit 所有窗口关闭 程序退出之前
 * quit 程序退出时
 */

/* ********************************** 其他常用 electron API
 * 文件系统 const fs = require('fs')
 * 系统对话 const { dialog } = require('electron').remote
 * 监听键盘 const { globalShortcut } = require('electron')
 * 事件菜单(右键) const { Menu, MenuItem } = require('electron').remote
 * 网络模块：
 *    使用 Chromium 自带的网络模块 （而非 Node-Http/Https）
 *    const { net } = require('electron')
 *    const request = net.request(option) // option: ClientRequest
 *    request.on("response", callback)
 *      => callback request.on('data'/'end')
 *    request.end()
 *    // 建议使用 axios
 * 进程通信
 *    主进程：win.webContents.send(channel, message)
 *    主进程：const { ipcMain } = require('electron');
 *    2 => ipcMain.on(channel, callback to channel in ipcRender)
 *    渲染进程：const { ipcRender } = require('electron');
 *    1 => ipcRender.send(channel in ipcMain, callback)
 *    3 => ipcRender.on(channel, callback)
 *    ---------------------------------------------------
 */
