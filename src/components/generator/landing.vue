<template>
  <div class="landing">
    <div
      v-for="item in list"
      :key="item.id"
      :style="computedRectStyle(item.rect)"
    >
      <component
        :is="item.componentName"
        :config="item"
        :style="computedComponentStyle(item)"
      ></component>
    </div>
  </div>
</template>

<script>
import { provide, ref, reactive, readonly } from 'vue'

export default {
  name: 'landing',
  props: {
    data: {
      type: Array,
      required: true
    },
    source: {
      type: Object
    }
  },
  setup (props) {
    const mode = ref('mobile')
    const dataSource = ref(props.source)
    provide('mode', readonly(mode))
    provide('dataSource', readonly(dataSource))
    const list = reactive(props.data)
    const computedRectStyle = item => {
      const style = {
        position: 'absolute'
      }
      for (const iterator in item) {
        style[iterator] = `${(item[iterator] * 2) / 100}rem`
      }
      return style
    }
    const isNumber = val => typeof val === 'number'
    const computedComponentStyle = item => {
      const style = {}
      for (const iterator in item.styles) {
        style[iterator] = isNumber(item.styles[iterator])
          ? `${(item.styles[iterator] * 2) / 100}rem`
          : `${item.styles[iterator]}`
      }
      return style
    }
    return {
      list,
      computedRectStyle,
      computedComponentStyle
    }
  }
}
</script>

<style scoped>
.landing {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
