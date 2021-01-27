<template>
  <div>
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
import { reactive } from 'vue'
export default {
  name: 'landing',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup (props) {
    const list = reactive(props.data)
    const computedRectStyle = (item) => {
      const style = {
        position: 'absolute'
      }
      for (const iterator in item) {
        style[iterator] = `${(item[iterator] * 2) / 100}rem`
      }
      return style
    }
    const isNumber = (val) => typeof val === 'number'
    const computedComponentStyle = (item) => {
      const style = {}
      for (const iterator in item.styles) {
        style[iterator] = isNumber(item.styles[iterator])
          ? `${(item.styles[iterator] * 2) / 100}rem`
          : `${item.styles[iterator]}`
      }
      return style
    }
    return { list, computedRectStyle, computedComponentStyle }
  }
}
</script>

<style></style>
