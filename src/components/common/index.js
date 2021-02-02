const context = require.context('./', true, /index\.vue$/)
const install = function (app) {
  context.keys().forEach(key => {
    const componentConfig = context(key)
    const ctrl = componentConfig.default || componentConfig
    app.component(ctrl.name, ctrl)
  })
}
export default {
  install
}
