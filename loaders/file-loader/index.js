const loaderUtils = require('loader-utils')
// https://github.com/webpack/loader-utils#interpolatename
module.exports = function (content) {
    // 根据文件内容生成hash
    let interpolatedName = loaderUtils.interpolateName(
        this,
        '[hash].[ext]',
        {
            content
        }
    );
    interpolatedName = 'images/' + interpolatedName
    // 输出
    this.emitFile(interpolatedName, content)
    // 返回文件路径
    return `module.exports = '${interpolatedName}'`
}
// 二进制格式
module.exports.raw = true

