import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
import store from './store'
import blocks from './components/blocks'
import common from './components/common'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Vue3DraggableResizable from '@lzq920/vue3-draggable-resizable'

// 需引入默认样式
import '@lzq920/vue3-draggable-resizable/dist/Vue3DraggableResizable.css'

import './assets/tailwind.css'
import 'animate.css'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(blocks)
app.use(common)
app.use(ElementPlus, { size: 'small' })
app.use(Vue3DraggableResizable)
app.mount('#app')
