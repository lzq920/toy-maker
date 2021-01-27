import landing from './landing.vue'
import blocksImage from '../blocks/image/index.vue'
import blocksText from '../blocks/text/index.vue'
const install = function (app) {
  app.component('landing', landing)
  app.component('blocks-text', blocksText)
  app.component('blocks-image', blocksImage)
}
export default {
  install
}
