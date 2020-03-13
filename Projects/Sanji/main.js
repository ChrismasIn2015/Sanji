/*
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

// 1.使用窗口模块 BrowserWindow 对象 **********************************
const { BrowserWindow } = require("electron");
function createWindow() {
  const win = new BrowserWindow({
    width: 1360,
    height: 768,
    webPreferences: {
      nodeIntegration: true // !!! 这行代码表示允许使用node代码 !!!
    }
  });
  win.loadFile("./dist/index.html");
  // 控制台
  win.webContents.openDevTools();
}

// 2.使用 app 模块管理 electron 应用生命周期 **********************************
const { app } = require("electron");

// 2.1 在app准备完毕后创建窗口
app.on("ready", createWindow);

// 2.2 在窗口全部关闭后退出应用
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

/* 其他 app 事件
 * before-quit 关闭窗口之前
 * will-quit 所有窗口关闭 程序退出之前
 * quit 程序退出时
 */

/* 其他常用 electron API (主进程)
 * 文件系统 const fs = require('fs')
 * 内嵌第三方 <webview src/> 或不常见的 browersView
 * 弹出第三方窗口（网页）window.open(url, title)
 * 有限控制第三方窗口 BrowserWindowProProxy 对象
 * 系统对话 dialog
 */
