# 1.前端的发展

## 开发工具

### == Vue ==

```javascript
# 特点
	传统：DOM增删改查(JQuery)
	MVVM：虚拟DOM高效更新 / 数据绑定 / 组件化开发
	
# 版本
	普通版本 npm i vue -g
	脚手架 npm i @vue/cli
	安装说明书：https://cn.vuejs.org/v2/guide/installation.html
	
# VM实例
	## 生命周期
		beforeCreate => 初始化事件/生命周期
		created 
			=> 根据el:#app调用 vm.$mount("#app")
			=> 根据template编译到 vm.render 中
		beforeMount => vm.$el = DOM
		mounted => beforeUpdate <=> update => vm.$destroy()
		destroyed
```

### 安装说明

```
* 编译器C：
	C/R版本可以处理 挂载模板字符串 场景
	R版本需要通过 webpack/vue-loader 预编译成JS
	因为R版本相比C/R完整版体积要小大约 30%，所以应该尽可能R版本。
```

|      |        UMD         |        CommonJS        |    ES Module 1     |        ES Module 2        |
| :--: | :----------------: | :--------------------: | :----------------: | :-----------------------: |
|      |    *** script**    | *** 配合老的打包工具** | *** 配合打包工具** | **script&type="module" ** |
|      |     （未压缩）     |       （未压缩）       |     （未压缩）     |        （未压缩）         |
| C/R  |       vue.js       |     vue.common.js      |     vue.esm.js     |    vue.esm.browser.js     |
|  R   |   vue.runtime.js   | vue.runtime.common.js  | vue.runtime.esm.js |                           |
|      |     （已压缩）     |    （打包工具压缩）    |  （打包工具压缩）  |        （已压缩）         |
| C/R  |     vue.min.js     |                        |                    |  vue.esm.browser.min.js   |
|  R   | vue.runtime.min.js |                        |                    |                           |

### 手动脚手架

```
1.lib/vue.min.js
2.npm -save-dev/webpack
```



## 浏览器的限制

```
# 介绍
    目前的浏览器(内嵌渲染引擎/JS引擎)只支持 HTML/CSS/JavaScript 为基础的页面
    - JS引擎有语法标准(ECMAScript)，而高级语法需要转译
    * 模块化需求
    	原生HTML通过直接引用CSS/图片/JS代码形式无法适应大规模开发
    	于是通过模块化把一个复杂的系统分解到多个模块以方便编码
        1.CommonJS规范 - require同步加载/modules.exports暴露接口
        2.AMD规范 - 需要第三方库requireJS
        3.ES6 / import/export 目前无法直接运行在大部分 JavaScript 运行环境下
    	目前的模块化方案都需要工具转译为 HTML/CSS/JavaScript
    * 框架语法需要转译
        React JSX 语法需要转译
        Vue 组件系统包含大量新语法 需要转译
    * 新语言需要转译
    	TypeScript/SCSS 无法直接执行
```

### == Webpack ==

```javascript
# 介绍
    不断出现的 模块化/新语言/新框架 需求
    我们需要构建工具，在编写完代码后生成能在线上运行的代码

# 目标
    模块合并：通过构建功能一次HTTP请求完所有需要的图片/等资源(bundle.js)
    代码转换：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等。
    文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等。
    代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载。
    自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器。
    代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过。
    自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统。

# /dist/index.html( <= bundle script) # Step 3 后不需要
# /src/index.js
# webpack-config.js
# package.json
	"start": "webpack-dev-server --open"
	"build": "webpack" 或 "webpack --config webpack-config.js"
```

### 使用流程

```javascript
# Step 1 基础功能 =============================================================
    	npm init 
		npm install webpack -save-dev
		npm install webpack-cli -save-dev
		需要设置项目目录 
        	package.json
        	/dist/index.html( <= bundle script) # Step 3 后不需要
        	/src/index.js
# Step 2 加载样式/图片 =========================================================
	需要加载样式 npm install style-loader css-loader -save-dev
	需要加载图片 npm install
# Step 3 自动生成 dist/Html 入口文件 ============================================
	需要自动生成创建html入口文件
	为html文件中引入的外部资源每次compile后的hash，防止引用缓存的外部文件问题
    npm install html-webpack-plugin -save-dev
# Step 4 打包前清空 dist 目录 ===================================================
	npm install clean-webpack-plugin --save-dev
# Step 5 服务器模式 ======================================================
	能够重新进行build加载（刷新了页面）npm install --save-dev webpack-dev-server
	能够进行热更新（不刷新页面）
    	/src/index.js（入口文件）：if (module.hot) { module.hot.accept(); }
```

### webpack.config.js

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); # Step 3
const CleanWebpackPlugin = require("clean-webpack-plugin"); # Step 4

module.exports = {
    # Step 1 基础功能 ======================================================
    # 补充
    mode: "development", // * 打包模式
    devtool: "inline-source-map", // * 错误定位
    # 打包路径
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    # Step 5 服务器模式：能够重新进行build加载（刷新了页面）
    devServer: {
    	contentBase: { "./dist" },
        port: 8080,
        hot: true, // * 局部刷新时需要开起
    },
    # 打包内容
    module: {
        rules: [
            # Step 2 加载样式/图片 ==========================================
            # 打包导入的样式
            { test: /\.css$/, use: ["style-loader", "css-loader"] },
            # 打包导入的图片
            // - url-loader 依赖于 file-loader 用于图片优化/base64
            // - base64 <= options.limit(bit) <=  Img // 8192bit = 1024b = 1kb
            {
                test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        { loader: "file-loader" },
                        { loader: "url-loader", options: { limit: 8192 } }
                    ]
            }
		]
	},
    # 外部插件
    plugins: [
        # Step 3 自动生成 dist/Html 入口文件 ==================================
        new HtmlWebpackPlugin({
            title: "MyLib",
            template: "./src/packTemplate.html" // 导出的模板
            // favicon: "path/to/yourfile.ico" // Link图标
        }),
        # Step 4 打包前清空 dist 目录 =========================================
        new CleanWebpackPlugin()
    ]
};
```

# 2.Js跨平台

## NodeJS

```
NodeJS 是一个基于 V8 JS编译器的 JS 运行环境，使得JS能在不同平台运行
==========================================================================
- 通用
    1.基于事件循环实现异步编程
    2.支持回调函数作为参数/实现异步操作同步化
    3.RESTful API
    4.多进程模式
==========================================================================
- 模块系统
==========================================================================
- 文件系统
==========================================================================
- 服务器模块
- Express
==========================================================================
- 数据库服务
	1.MySQL
	2.MongoDB
	3.Sqlite
```

## = npm

```
淘宝镜像
	$ npm install -g cnpm --registry=https://registry.npm.taobao.org

初始化包管理文件
	$ npm init -y // 产生 package.json
	
搜索模块
	$ npm search
	
安装
	$ npm install moduleName 命令
        1. 安装模块到项目node_modules目录下。
        2. 不会将模块依赖写入devDependencies或dependencies 节点。
        3. 运行 npm install 初始化项目时不会下载模块。
        
    $ npm install -g moduleName 命令
        1. 安装模块到全局，不会在项目node_modules目录中保存模块包。
        2. 不会将模块依赖写入devDependencies或dependencies 节点。
        3. 运行 npm install 初始化项目时不会下载模块。
        
    $ npm install -save moduleName 命令
        1. 安装模块到项目node_modules目录下。
        2. 会将模块依赖写入dependencies 节点。
        3. 运行 npm install 初始化项目时，会将模块下载到项目目录下。
        4. 运行npm install --production
        或者注明NODE_ENV变量值为production时，会自动下载模块到node_modules目录中。
        
    $ npm install -save-dev moduleName 命令
        1. 安装模块到项目node_modules目录下。
        2. 会将模块依赖写入devDependencies 节点。
        3. 运行 npm install 初始化项目时，会将模块下载到项目目录下。
        4. 运行npm install --production
        或者注明NODE_ENV变量值为production时，不会自动下载模块到node_modules目录中。
        
删除包
	$ npm uninstall/remove name
	
当导入一个包时：require('vue')
    1.找到对应的 node_modules
    2.找到require的包文件夹
    3.根据package.json找到需要的JS库文件
```



## Electron

```
# 介绍
	Electron基于Node使用JS调用丰富的原生(操作系统)API来创造桌面应用 
	本质上是Node应用程序 可以使用Node.js API
	=>
        const fs = require('fs')
        const root = fs.readdirSync('/')
        console.log(root)
        
# 安装
	npm init -y
	npm install electron -g
	package.json 
		=> "main": main.js
		=> "start": "electron ."
		
# 项目结构
	- package.json :设置main为入口JS
	- main.js
	- index.html
	
# 运行原理
	Electron使用了Chromium来展示web页面,使用了其多进程架构
	主进程
		=> package.json /main.js
	渲染进程
		=> 每个web页面/BrowserWindow对象
		
# 与Vue一同开发
	- 对于Electron本质上是页面，运行在渲染进程中
```

## 基础

```
# 主进程: main.js
        => 引用Node/Electron模块
            const electron = require('electron')
            const { app, BrowserWindow } = require('electron')
            * 在命令行中进行打印 console.log()
            * 窗口对象实例对应多窗口，通常存储在自定义数组中
            * 窗口关闭时最好回收对应的实例内存 
                ** win.on('closed', () => { win = null })
                ** app.on('window-all-closed', () => { 
                        process.platform !== 'darwin' ? app.quit():"" 
                    })
        => 创建浏览器窗口
            function createWindow () {
                let win = new BrowserWindow({ 
                    width: 800, height: 600, 
                    webPreferences: { nodeIntegration: true } 
                })
                win.loadFile('index.html')
            }
            * 打开win渲染进程控制台 win.webContents.openDevTools()
        => 在应用上注册事件
            app.on('ready', createWindow)
 
 # 渲染进程: src/js/... 
```



# 3.版本控制

## Git

```
1.在代码托管区创建远程仓库
    - 局域网: GitLab
    - 外网: Github/码云
    
2.获取
	- 创建本地仓库
		$ git init
	- 通过远程仓库提供的 URL 克隆代码
        - HTTPS: 需要手动输入服务器账号密码
        - SSH: 需要本地生成/服务器设置SSH keys
		$ git clone [url]
    - 查看这个项目对应的远程仓库
        $ git remote -v
	- 获取最新代码
		$ git pull
		- git fetch: 获取远程代码
		- git merge: 和本地库合并
	
3.本地更改
	- 工作区 → 暂存区
    $ git add readme.txt
    - 暂存区 → 本地库
    $ git commit -m "description"
    
4.查看本地版本
	- 查看工作区及暂存区的状态
        $ git status
            on branch master
            no commits yet
	- 想知道历史提交 /空格翻页/b向上/q退出
        $ git log
        $ git log -pretty=oneline 或 git reflog // 获取索引值
    - 本地回退版本
        通过对 HEAD 指针来决定本地版本
        $ git reflog // 获取索引值
        $ git reset --hard 'key' // 设置 HEAD 指针
    - 比较
        git 以ROW为比较单位
        $ git diff [(或)文件名/版本] // 查看明细
        
==========================================================================
    生成本地 SSH keys 用于提供远程仓库访问权限
        1.生成本地SSH目录
            $ ssh-keygen -t rsa -C '邮箱/账号'
        2.查看生成的SSH keys
            $ cat id_rsa.pub
        3.在托管服务器上设置
            添加 SSH keys 
==========================================================================
	# 外包
        $ git fork 关联复制
        $ pull request 分支发起请求
        $ merge 同意请求并合并
==========================================================================
    配置签名
        - 提交时用于标识开发人员身份/与服务器账号密码无关
        - 项目级别
            $ git config user.name
            $ git config user.email
        - 系统级别
            $ git config --global user.name "Your Name"
            $ git config --global user.email "email@example.com"
        - 这些信息会保存到 .git/config 中
```



