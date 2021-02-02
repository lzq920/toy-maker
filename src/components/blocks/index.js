import blocksText from './text/index.vue'
import blocksTextConfig from './text/config.vue'
import blocksTextControl from './text/control.vue'
import blocksImage from './image/index.vue'
import blocksImageConfig from './image/config.vue'
import blocksImageControl from './image/control.vue'
import blocksRect from './rect/index.vue'
import blocksRectConfig from './rect/config.vue'
import blocksRectControl from './rect/control.vue'
const install = function (app) {
  app.component('blocks-text', blocksText)
  app.component('blocks-image', blocksImage)
  app.component('blocks-text-config', blocksTextConfig)
  app.component('blocks-image-config', blocksImageConfig)
  app.component('blocks-text-control', blocksTextControl)
  app.component('blocks-image-control', blocksImageControl)
  app.component('blocks-rect', blocksRect)
  app.component('blocks-rect-config', blocksRectConfig)
  app.component('blocks-rect-control', blocksRectControl)
}
export default {
  install
}
