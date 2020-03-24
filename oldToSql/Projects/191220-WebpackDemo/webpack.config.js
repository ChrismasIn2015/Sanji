const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    mode: 'development', // * 打包模式 开发 development 生产 production
    devtool: 'inline-source-map', // * 错误定位
    // * 服务器模式/更新会刷新页面 <= 需要 webpack-dev-server 包
    devServer: {
        port: 8080,
        contentBase: './dist',
        hot: true
    },

    // * 打包路径
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    // * 打包内容
    module: {
        rules: [
            // ** 打包导入的样式
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            // ** 打包导入的图片
            // - url-loader 依赖于 file-loader 用于图片优化/base64
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: '',
                            publicPath: './build'
                        }
                    },
                    {
                        loader: 'url-loader',
                        options: { limit: 8192 } // - base64 <= options.limit(bit) <=  Img // 8192bit = 1024b = 1kb
                    }
                ]
            }
        ]
    },

    // * 插件
    plugins: [
        // ** 打包前清空 dist 目录
        new CleanWebpackPlugin(),
        // ** Html自动化构建
        new HtmlWebpackPlugin({
            title: 'MyLib',
            template: './src/packTemplate.html'
            // favicon: "path/to/yourfile.ico" // Link图标
        }),
        // ** 服务器模式下/局部模块更新/不刷新页面
        new webpack.HotModuleReplacementPlugin()
    ]
}
