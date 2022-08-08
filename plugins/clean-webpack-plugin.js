class CleanWebpackPlugin {
    apply(compiler) {
        const outputPath = compiler.options.output.path
        const fs = compiler.outputFileSystem
        compiler.hooks.emit.tap("CleanWebpackPlugin", () => {
            this.removeFiles(fs, outputPath)
        })
    }
    removeFiles(fs, filePath) {
        // 获取当前目录下所有资源
        const files = fs.readdirSync(filePath)
        files.forEach((file) => {
            // 判断是文件夹还是文件
            const path = `${filePath}\\${file}`
            const fileStat = fs.statSync(path)
            if (fileStat.isDirectory()) {
                this.removeFiles(fs, path)
            } else {
                fs.unlinkSync(path)
            }
        })
        fs.rmdirSync(filePath)

    }
}
module.exports = CleanWebpackPlugin