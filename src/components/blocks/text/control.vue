<template>
  <div>
    <p>w: <input type="text" v-model.number.lazy="dragInfo.width" @change="addHistory"/></p>
    <p>h: <input type="text" v-model.number.lazy="dragInfo.height" @change="addHistory"/></p>
    <p>x: <input type="text" v-model.number.lazy="dragInfo.left" @change="addHistory"/></p>
    <p>y: <input type="text" v-model.number.lazy="dragInfo.top" @change="addHistory"/></p>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'blocks-text-control',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const store = useStore()
    const dragInfo = computed({
      get: () => {
        return props.config.rect
      },
      set: () => {
      }
    })
    const addHistory = () => {
      store.dispatch('editor/addHistory')
    }
    return { dragInfo, addHistory }
  }
}
</script>

<style lang="scss" scoped></style>
