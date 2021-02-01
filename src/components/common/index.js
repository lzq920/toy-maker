import rotateResize from './rotate-resize/index.vue'
import sideLeft from './side-left/index.vue'
import sideRight from './side-right/index.vue'
import widgetContainer from './widget-container/index.vue'
import dragSelection from './drag-selection/index.vue'
const install = function (app) {
  app.component('rotate-resize', rotateResize)
  app.component('side-left', sideLeft)
  app.component('side-right', sideRight)
  app.component('widget-container', widgetContainer)
  app.component('drag-selection', dragSelection)
}
export default {
  install
}
