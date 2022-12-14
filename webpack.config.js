const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const TestPlugin = require('./plugins/test-plugin')
const BannerWebpackPlugin = require('./plugins/banner-webpack-plugin')
const CleanWebpackPlugin = require('./plugins/clean-webpack-plugin')
const AnalyzeWebpackPlugin = require('./plugins/analyze-webpack-plugin')
const InlineChunkHtmlPlugin = require('./plugins/inline-chunk-webpack-plugin')
module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        // clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    "./loaders/clean-log-loader",
                    // {
                    //     loader: './loaders/banner-loader',
                    //     options: {
                    //         author: 'Hyachin'
                    //     }
                    // },
                    {
                        loader: "./loaders/babel-loader",
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: './loaders/file-loader',
                type: "javascript/auto", // 解决图片重复打包问题
            },
            {
                test: /\.css$/,
                use: ['./loaders/style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        }),
        // new TestPlugin()
        new BannerWebpackPlugin({
            author: 'Hyachin'
        }),
        new CleanWebpackPlugin(),
        new AnalyzeWebpackPlugin(),
        new InlineChunkHtmlPlugin([/runtime/])
    ],

    optimization: {
        splitChunks: {
            chunks: "all"
        },
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}`
        }
    },
    mode: 'production'
}