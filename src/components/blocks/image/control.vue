<template>
  <div>
    <p>w: <input type="text" v-model.number="dragInfo.width" /></p>
    <p>h: <input type="text" v-model.number="dragInfo.height" /></p>
    <p>x: <input type="text" v-model.number="dragInfo.left" /></p>
    <p>y: <input type="text" v-model.number="dragInfo.top" /></p>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'blocks-image-control',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const dragInfo = computed({
      get: () => {
        return props.config.rect
      },
      set: () => {}
    })
    return { dragInfo }
  }
}
</script>

<style lang="scss" scoped></style>
