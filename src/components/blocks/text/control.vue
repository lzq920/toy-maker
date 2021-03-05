<template>
<div></div>
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
