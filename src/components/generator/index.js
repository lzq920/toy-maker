import landing from './landing.vue'
import 'normalize.css'
import './restform.css'
import 'animate.css'
const context = require.context('../blocks', true, /index\.vue$/)
const install = function (app) {
  app.component('landing', landing)
  context.keys().forEach(key => {
    const componentConfig = context(key)
    const ctrl = componentConfig.default || componentConfig
    app.component(ctrl.name, ctrl)
  })
}
export default {
  install
}
