<template>
  <el-container class="w-screen h-screen overflow-hidden">
    <el-header class="bg-gray-90 flex justify-end items-center shadow-sm z-10">
      <el-button :disabled="canUndo" @click="handleUndo">撤销</el-button>
      <el-button :disabled="canRedo" @click="handleRedo">重做</el-button>
      <el-button type="primary" @click="downloadZip">下载</el-button>
    </el-header>
    <el-container class="bg-gray-600 max-h-full">
      <el-aside width="300px" class="bg-white">
        <side-left></side-left>
      </el-aside>
      <el-main class="bg-gray-50 relative p-0">
        <div class="absolute left-0 top-0 right-0 bottom-0">
          <el-scrollbar>
            <div
              class="mx-auto my-10 select-none shadow-sm bg-white relative transition-all"
              :style="canvasStyle"
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
          </el-scrollbar>
          <canvas-setting></canvas-setting>
        </div>
      </el-main>
      <el-aside width="300px" class="bg-white">
        <side-right></side-right>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'
import useExportZip from '../hooks/useExportZip'
import useUpdateComponent from '../hooks/useUpdateComponent'
import useUndoRedo from '../hooks/useUndoRedo'
import CanvasSetting from '@/components/common/canvas-setting'
import useGlobalKeyEvent from '@/hooks/useGlobalKeyEvent'

export default {
  name: 'Home',
  components: { CanvasSetting },
  setup () {
    const store = useStore()
    const vdrList = computed(() => {
      return store.state.editor.allItems
    })
    const { downloadZip } = useExportZip()
    const { mergeComponent } = useUpdateComponent()
    const {
      canRedo,
      canUndo,
      handleRedo,
      handleUndo
    } = useUndoRedo()
    const { globalsKeyDown } = useGlobalKeyEvent()
    const defaultList = [{
      id: 'blocks-4bc8d34c-e3ca-4a89-a839-940232359579',
      componentName: 'blocks-text',
      rect: {
        height: 50,
        width: 375,
        left: 0,
        top: 89
      },
      styles: {
        width: '100%',
        height: '100%',
        color: 'rgba(0,0,0,1)',
        fontSize: 12
      },
      innerText: '文本'
    }]
    const getAllItems = async () => {
      const result = defaultList.map(item => {
        return mergeComponent(item)
      })
      await store.dispatch('editor/setAllItems', result)
    }
    const activeItemIds = computed(() => {
      return store.getters['editor/activeItemIds']
    })
    const canvasStyle = computed(() => {
      return {
        width: store.state.editor.canvasSetting.width + 'px',
        height: store.state.editor.canvasSetting.height + 'px'
      }
    })
    onMounted(async () => {
      await store.dispatch('editor/clearHistory')
      await getAllItems()
    })
    return {
      vdrList,
      activeItemIds,
      canUndo,
      canRedo,
      downloadZip,
      handleUndo,
      handleRedo,
      canvasStyle,
      globalsKeyDown
    }
  }
}
</script>

<style lang="scss" scoped></style>
