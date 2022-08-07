const babel = require("@babel/core");
const scheme = require('./scheme.json')
module.exports = function (content) {
    let callback = this.async()
    let options = this.getOptions(scheme)
    babel.transform(content, options, function (err, result) {
        if (err) callback(err)
        else callback(null, result.code)
    });
}