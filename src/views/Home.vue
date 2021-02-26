<template>
  <el-container v-loading="pageLoading" class="w-screen h-screen overflow-hidden"
                element-loading-spinner="el-icon-loading" element-loading-text="加载中">
    <el-header class="bg-gray-90 flex justify-end items-center shadow-sm z-10">
      <el-button :disabled="canUndo" @click="handleUndo">撤销</el-button>
      <el-button :disabled="canRedo" @click="handleRedo">重做</el-button>
      <el-button :loading="saveLoading" type="success" @click="savePageData">保存</el-button>
      <el-button type="primary" @click="handleExportZip">下载</el-button>
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
              <el-empty v-if="vdrList.length===0" description="暂无组件数据"></el-empty>
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
import { ElMessageBox } from 'element-plus'
import { computed, onMounted } from 'vue'
import useExportZip from '../hooks/useExportZip'
import useUndoRedo from '../hooks/useUndoRedo'
import useGlobalKeyEvent from '@/hooks/useGlobalKeyEvent'
import useEditorMethod from '@/hooks/useEditorMethod'

export default {
  name: 'Home',
  setup () {
    const store = useStore()
    const vdrList = computed(() => {
      return store.state.editor.allItems
    })
    const { downloadZip } = useExportZip()
    const {
      getPageData,
      savePageData,
      saveLoading,
      pageLoading
    } = useEditorMethod()
    const {
      canRedo,
      canUndo,
      handleRedo,
      handleUndo
    } = useUndoRedo()
    const { globalsKeyDown } = useGlobalKeyEvent()
    const activeItemIds = computed(() => {
      return store.getters['editor/activeItemIds']
    })
    const canvasStyle = computed(() => {
      return {
        width: store.state.editor.canvasSetting.width + 'px',
        height: store.state.editor.canvasSetting.height + 'px'
      }
    })
    const handleExportZip = () => {
      ElMessageBox.confirm('是否导出单独部署的Zip压缩包？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        downloadZip()
      })
    }
    onMounted(async () => {
      await getPageData()
      await store.dispatch('editor/clearHistory')
    })
    return {
      vdrList,
      activeItemIds,
      canUndo,
      canRedo,
      handleExportZip,
      handleUndo,
      handleRedo,
      canvasStyle,
      globalsKeyDown,
      savePageData,
      saveLoading,
      pageLoading
    }
  }
}
</script>

<style lang="scss" scoped></style>
