class AnalyzeWebpackPlugin {
    apply(compiler) {
        compiler.hooks.emit.tap('AnalyzeWebpackPlugin', (compilation) => {
            const assets = Object.entries(compilation.assets)
            let source = ` | 资源名称 | 大小 |\n|---|---|\n`
            assets.forEach(([filename, file]) => {
                source += `| ${filename} | ${Math.ceil(file.size() / 1024)
                    }KB |\n`
            })
            compilation.assets['analyze.md'] = {
                source() {
                    return source
                },
                size() {
                    return source.length
                }
            }
        })
    }
}
module.exports = AnalyzeWebpackPlugin