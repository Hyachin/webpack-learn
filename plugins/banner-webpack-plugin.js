const webpack = require('webpack')
class BannerWebpackPlugin {
    constructor(options = {}) {
        this.options = options
    }
    apply(compiler) {
        compiler.hooks.make.tap("BannerWebpackPlugin", (compilation) => {
            // debugger;
            compilation.hooks.processAssets.tap({
                name: 'BannerWebpackPlugin',
                stage: webpack.Compilation.PROCESS_ASSETS_STAGE_DEV_TOOLING,
            }, (assets) => {
                // debugger
                const extensions = ['css', 'js']
                const assetPaths = Object.keys(assets).filter((path) => {
                    const splitted = path.split(".");
                    return extensions.includes(splitted[splitted.length - 1]);
                });
                assetPaths.forEach((assetPath) => {
                    const asset = compilation.assets[assetPath];
                    const source = `/*
            * Author: ${this.options.author}
            */\n${asset.source()}`;
                    // 覆盖资源
                    compilation.assets[assetPath] = {
                        // 资源内容
                        source() {
                            return source;
                        },
                        // 资源大小
                        size() {
                            return source.length;
                        },
                    };
                });

            })
        })
    }
}
module.exports = BannerWebpackPlugin