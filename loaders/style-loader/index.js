module.exports = function () {

}
module.exports.pitch = function (remainingRequest) {
    // remainingRequest 剩下还需要处理的loader
    const relativePath = remainingRequest.split('!').map((absolutePath) =>
        // this.context 当前运行loader的目录,
        this.utils.contextify(this.context, absolutePath)
    ).join('!')
    // 1.将remainingRequest中绝对路径改成相对路径
    // 2.引入css-loader处理后的资源
    // 3.创建style，将内容插入页面中生效
    const script = `
    import style from "!!${relativePath}"
    const styleEle = document.createElement('style')
    styleEle.innerHTML = style
    document.head.appendChild(styleEle);
    `
    return script


}