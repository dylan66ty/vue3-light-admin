// CommonJS
const fs = require('fs')
const path = require('path')

const scopes = fs.readdirSync(path.resolve(__dirname, 'src'))

module.exports = {
  extends: ['@dylan66ty/commitlint-config'],
  prompt: {
    // 范围设置
    scopes: [...scopes],
    // 范围是否可以多选
    enableMultipleScopes: true,
    // 多选范围后用标识符隔开
    scopeEnumSeparator: ',',
    //  设置 选择范围 中 为空选项(empty) 和 自定义选项(custom) 的 位置
    customScopesAlign: 'top'
  }
}
