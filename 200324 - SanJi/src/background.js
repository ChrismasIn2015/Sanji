// ********************************** 0.导入自己的主进程代码
// const isDevelopment = process.env.NODE_ENV !== "production";

// ********************************** 1.使用窗口模块 BrowserWindow 对象
import { BrowserWindow } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";

let spa_window;
function createWindow() {
    spa_window = new BrowserWindow({
        width: 1300,
        height: 900,
        webPreferences: {
            nodeIntegration: true // 这行代码表示允许使用 node API
        }
    });

    // 根据环境加载SPA
    let devURL = process.env.WEBPACK_DEV_SERVER_URL;
    if (devURL) {
        // localhost:8080
        spa_window.loadURL(devURL);
        spa_window.webContents.openDevTools();
    } else {
        createProtocol("app");
        spa_window.loadURL("app://./index.html");
        spa_window.webContents.openDevTools();
    }

    spa_window.on("closed", () => {
        spa_window = null;
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

const isDevelopment = process.env.NODE_ENV !== "production";
if (isDevelopment) {
    if (process.platform === "win32") {
        process.on("message", data => {
            if (data === "graceful-exit") {
                app.quit();
            }
        });
    } else {
        process.on("SIGTERM", () => {
            app.quit();
        });
    }
}
