<template>
<div class="grid grid-cols-2 gap-1">
  <el-input v-model="rect.left">
    <template #prefix>
      <span>X</span>
    </template>
  </el-input>
  <el-input v-model="rect.top">
    <template #prefix>
      <span>Y</span>
    </template>
  </el-input>
  <el-input v-model="rect.width">
    <template #prefix>
      <span>W</span>
    </template>
  </el-input>
  <el-input v-model="rect.height">
    <template #prefix>
      <span>H</span>
    </template>
  </el-input>
</div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'position-setting',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const store = useStore()
    const rect = computed({
      get () {
        return props.config.rect
      },
      set (value) {
        store.dispatch('editor/updateItem', {
          id: props.config.id,
          path: 'rect',
          value: Number(value)
        })
      }
    })
    return {
      rect
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
