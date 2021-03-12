const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
module.exports = {
  lintOnSave: true,
  configureWebpack: {
    output: {
      libraryExport: 'default'
    },
    plugins: [new MonacoWebpackPlugin({
      languages: ['json']
    })]
  }
}
