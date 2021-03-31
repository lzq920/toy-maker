<template>
  <div class="w-full list">
    <el-scrollbar>
      <ul class="list-none cursor-pointer bg-white">
        <li v-for="item in tree" :key="item.id" class="p-2 text-sm"
            :class="{'bg-blue-400':activeItemIds.includes(item.id),'text-white':activeItemIds.includes(item.id)}"
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
.list {
  height: calc(100vh - 60px)
}
</style>
