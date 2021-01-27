<template>
  <el-container class="w-screen h-screen">
    <el-header class="bg-gray-900 flex justify-end items-center">
      <el-button type="primary">下载</el-button>
    </el-header>
    <el-container class="bg-gray-600 max-h-full">
      <el-aside width="300px" class="bg-white overflow-y-auto">
        <side-left></side-left>
      </el-aside>
      <el-main class="bg-gray-500 relative">
        <div
          class="mx-auto my-0 select-none shadow-sm bg-white relative"
          style="width: 375px; height: 667px"
        >
          <DraggableContainer>
            <widget-container
              v-for="item in vdrList"
              :key="item.id"
              :item="item"
            ></widget-container>
          </DraggableContainer>
        </div>
      </el-main>
      <el-aside width="300px" class="bg-white overflow-y-auto">
        <side-right></side-right>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'Home',
  setup () {
    const store = useStore()
    const vdrList = computed(() => {
      return store.state.editor.allItems
    })
    return {
      vdrList
    }
  }
}
</script>

<style lang="scss" scoped></style>
