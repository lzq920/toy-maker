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
import { computed, provide, reactive } from 'vue'
import { transferStyleMode } from '@/utils'

export default {
  name: 'landing',
  props: {
    data: {
      type: Array,
      required: true
    },
    source: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const provider = reactive({
      mode: 'mobile',
      dataSource: computed(() => props.source)
    })
    provide('mode', provider.mode)
    provide('dataSource', provider.dataSource)
    const list = reactive(props.data)
    const computedRectStyle = item => {
      const style = {
        position: 'absolute'
      }
      for (const iterator in item) {
        style[iterator] = `${parseFloat((item[iterator] * 2 / 100).toFixed(2))}rem`
      }
      return style
    }
    const computedComponentStyle = item => {
      return transferStyleMode(item, provider.mode)
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
