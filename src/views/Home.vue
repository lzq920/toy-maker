<template>
  <el-container class="w-screen h-screen overflow-hidden">
    <el-header class="bg-gray-90 flex justify-end items-center shadow-sm z-10">
      <el-button type="primary" @click="downloadZip">下载</el-button>
    </el-header>
    <el-container class="bg-gray-600 max-h-full">
      <el-aside width="300px" class="bg-white">
        <side-left></side-left>
      </el-aside>
      <el-main class="bg-gray-50 relative p-0">
        <el-scrollbar>
          <drag-selection @dragEnd="dragEnd" :autoClose="1000" class="absolute left-0 top-0 right-0 bottom-0">
            <div
              class="mx-auto my-10 select-none shadow-sm bg-white relative"
              style="width: 375px; height: 667px"
            >
              <DraggableContainer>
                <widget-container
                  v-for="item in vdrList"
                  :key="item.id"
                  :item="item"
                  :data-id="item.id"
                ></widget-container>
              </DraggableContainer>
            </div>
          </drag-selection>
        </el-scrollbar>
      </el-main>
      <el-aside width="300px" class="bg-white">
        <side-right></side-right>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import useExportZip from '../hooks/useExportZip'
import useDragSelection from '../hooks/useDragSelection'

export default {
  name: 'Home',
  setup () {
    const store = useStore()
    const vdrList = computed(() => {
      return store.state.editor.allItems
    })
    const { downloadZip } = useExportZip()
    const { dragEnd } = useDragSelection()
    return {
      vdrList,
      downloadZip,
      dragEnd
    }
  }
}
</script>

<style lang="scss" scoped></style>
