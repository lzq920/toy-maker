<template>
  <div class="relative h-full">
    <el-scrollbar>
      <template v-if="vdrList.length === 1">
        <component
          :is="`${item.componentName}-control`"
          v-for="item in vdrList"
          :key="item.id"
          :config="item"
        ></component>
      </template>
      <template v-if="vdrList.length > 1">多个组件操作</template>
    </el-scrollbar>
  </div>
</template>

<script>
import config from '../../blocks/image/config.vue'
import { useStore } from 'vuex'
import { computed, provide, reactive } from 'vue'

export default {
  components: { config },
  name: 'side-right',
  setup () {
    const store = useStore()
    const vdrList = computed(() => {
      return store.state.editor.activeItems
    })
    const provider = reactive({
      mode: 'pc',
      dataSource: computed(() => {
        return store.state.editor.dataSource
      })
    })
    provide('mode', provider.mode)
    provide('dataSource', provider.dataSource)
    return {
      vdrList
    }
  }
}
</script>

<style scoped lang="scss"></style>
