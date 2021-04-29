<template>
  <div class="absolute left-0 w-40 bottom-0 bg-white p-3 z-10">
    <label for="canvassed1" class="flex-1"><input class="w-10" id="canvassed1" v-model.number.lazy="width" disabled/>px</label>
    <label for="canvassed2" class="flex-1 pl-2"><input class="w-10" id="canvassed2" v-model.number.lazy="height"
                                                       disabled/>px</label>
  </div>
</template>

<script>
import { computed, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'canvas-setting',
  setup () {
    const store = useStore()
    const width = computed({
      get: () => {
        return store.state.editor.canvasSetting.width
      },
      set: () => {

      }
    })
    const height = computed({
      get: () => {
        return store.state.editor.canvasSetting.height
      },
      set: () => {

      }
    })
    const maxHeight = computed(() => {
      return Math.max(...store.state.editor.allItems.map(item => {
        return item.rect.top + item.rect.height
      }))
    })
    watch(maxHeight, (val) => {
      const minHeight = val >= 667 ? val : 667
      store.dispatch('editor/setCanvas', {
        width: width.value,
        height: minHeight
      })
      window.dispatchEvent(new Event('resize'))
    })
    return {
      width,
      height,
      maxHeight
    }
  }
}
</script>

<style scoped>

</style>
