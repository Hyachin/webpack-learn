const scheme = require('./scheme.json')
module.exports = function (content) {
    let options = this.getOptions(scheme)
    let prefix = `
    /*
    * Author:${options.author}
    */
    `
    return prefix + content
}