<template>
  <div class="relative h-full">
    <div v-if="vdrList.length === 1">
      <component
        v-for="item in vdrList"
        :key="item.id"
        :is="`${item.componentName}-control`"
        :config="item"
      ></component>
    </div>
    <div v-if="vdrList.length > 1">多个组件操作</div>
  </div>
</template>

<script>
import config from '../../blocks/image/config.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  components: { config },
  name: 'side-right',
  setup () {
    const store = useStore()
    const vdrList = computed(() => {
      return store.state.editor.activeItems
    })
    return {
      vdrList
    }
  }
}
</script>

<style scoped lang="scss"></style>
