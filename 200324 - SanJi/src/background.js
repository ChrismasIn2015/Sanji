// ********************************** 0.主进程常量设置
const isDevelopment = process.env.NODE_ENV !== "production";

// ********************************** 1.使用窗口模块 BrowserWindow 对象
import { BrowserWindow } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";

let SPA_WINDOW;
function createWindow() {
  SPA_WINDOW = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true // 这行代码表示允许使用 node API
    }
  });

  // 根据环境加载SPA
  let devURL = process.env.WEBPACK_DEV_SERVER_URL;
  if (devURL) {
    // localhost:8080
    SPA_WINDOW.loadURL(devURL);
    SPA_WINDOW.webContents.openDevTools();
  } else {
    createProtocol("app");
    SPA_WINDOW.loadURL("app://./index.html");
  }

  SPA_WINDOW.on("closed", () => {
    SPA_WINDOW = null;
  });
}

// ********************************** 2.使用 protocol 模块保证浏览器正确加载本地资源（vue...electron-builder）
import { protocol } from "electron";
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

// ********************************** 3.使用 app 模块管理 electron 应用生命周期
import { app } from "electron";

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});

app.on("ready", async () => {
  createWindow();
});
