<template>
  <div class="absolute left-0 top-0 bottom-12 w-40 z-10 border border-blue-400">
    <p class="text-center text-xl bg-white border-b border-blue-400 title">组件树</p>
    <el-scrollbar class="list">
      <ul class="list-none cursor-pointer bg-white">
        <li v-for="item in tree" :key="item.id" class="p-2 text-sm"
            :class="{'bg-blue-600':activeItemIds.includes(item.id),'text-white':activeItemIds.includes(item.id)}"
            @click="handleClick(item)">
          {{ item.description }}
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'tree-wrapper',
  setup () {
    const store = useStore()
    const tree = computed(() => {
      return store.state.editor.allItems
    })
    const activeItemIds = computed(() => {
      return store.getters['editor/activeItemIds']
    })
    const handleClick = async (item) => {
      await store.dispatch('editor/clearActiveItem')
      await store.dispatch('editor/addActiveItem', item)
    }
    return {
      tree,
      activeItemIds,
      handleClick
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  height: 30px;
}

.list {
  height: calc(100% - 30px)
}
</style>
