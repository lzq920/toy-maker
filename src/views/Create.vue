<template>
  <el-container v-loading.fullscreen.lock="pageLoading" element-loading-spinner="el-icon-loading"
                element-loading-text="组件数据加载中" class="w-screen h-screen overflow-hidden">
    <el-header class="bg-gray-90 flex justify-end items-center shadow-sm z-10">
      <el-image style="height:45px;width:146px;" :src="require('../assets/logo.png')"
                class="rounded-2xl border mr-auto shadow-sm"></el-image>
      <el-button type="danger" @click="clearCanvas">清空画布</el-button>
      <el-button type="info" @click="handleUpload">
        <input ref="psd" type="file" class="hidden" @change="uploadFile" accept=".psd">
        上传PSD
      </el-button>
      <el-button :disabled="canUndo" @click="handleUndo">撤销</el-button>
      <el-button :disabled="canRedo" @click="handleRedo">重做</el-button>
      <el-button :loading="saveLoading" type="success" @click="savePageData">保存</el-button>
      <el-button type="primary" @click="handleExportZip">下载</el-button>
      <el-button type="primary" @click="exportFile">导出JSON</el-button>
      <el-button type="primary" @click="handleImportFile">
        <input ref="jsonRef" type="file" class="hidden" @change="importFile" accept="application/json">
        导入JSON
      </el-button>
      <el-button :loading="publishLoading" type="primary" @click="publish($route.params.id)">
        {{ publishLoading ? '发布中' : '发布' }}
      </el-button>
    </el-header>
    <el-container class="bg-gray-600 max-h-full">
      <el-aside width="300px" class="bg-white">
        <side-left></side-left>
      </el-aside>
      <el-main class="bg-gray-50 relative p-0">
        <div class="absolute left-0 top-0 right-0 bottom-0">
          <el-scrollbar>
            <el-tabs v-model="tabActive" type="card">
              <el-tab-pane name="editor-area" label="编辑">
                <div
                  class="mx-auto my-10 select-none shadow-sm bg-white relative transition-all"
                  :style="canvasStyle"
                >
                  <el-empty v-if="vdrList.length===0" description="暂无组件数据"></el-empty>
                  <DraggableContainer class="editor-area">
                    <widget-container
                      v-for="item in vdrList"
                      :key="item.id"
                      :item="item"
                      :data-id="item.id"
                    ></widget-container>
                  </DraggableContainer>
                </div>
              </el-tab-pane>
              <el-tab-pane name="page-config-area" label="页面配置">
                <page-config :config="pageConfig" @change="setPageConfig"></page-config>
              </el-tab-pane>
              <el-tab-pane name="data-source-area" label="数据源配置">
                <div class="w-full" style="height:600px" v-if="tabActive==='data-source-area'">
                  <monaco-editor :code="dataSource" @change="changeDataSource"></monaco-editor>
                </div>
              </el-tab-pane>
              <el-tab-pane name="publish-config-area" label="发布配置">
                <publish-setting></publish-setting>
              </el-tab-pane>
            </el-tabs>
          </el-scrollbar>
          <canvas-setting></canvas-setting>
        </div>
      </el-main>
      <el-aside width="300px" class="bg-white">
        <side-right></side-right>
      </el-aside>
    </el-container>
    <help-toolbar></help-toolbar>
  </el-container>
</template>

<script>
import { useStore } from 'vuex'
import { ElMessageBox } from 'element-plus'
import { computed, onMounted, ref, watch } from 'vue'
import useExportZip from '../hooks/useExportZip'
import useUndoRedo from '../hooks/useUndoRedo'
import useGlobalKeyEvent from '@/hooks/useGlobalKeyEvent'
import useEditorMethod from '@/hooks/useEditorMethod'
import usePsdParse from '@/hooks/usePsdParse'
import usePageConfig from '@/hooks/usePageConfig'
import usePublishRemote from '@/hooks/usePublishRemote'
import { useRoute } from 'vue-router'
import PageConfig from '@/components/common/page-config'
import useImportJSON from '@/hooks/useImportJSON'
import useExportJSON from '@/hooks/useExportJSON'

export default {
  name: 'PageCreate',
  components: { PageConfig },
  setup () {
    const store = useStore()
    const route = useRoute()
    const vdrList = computed(() => {
      return store.state.editor.allItems
    })
    const { downloadZip } = useExportZip()
    const { uploadFile } = usePsdParse()
    const { importFile } = useImportJSON()
    const { exportFile } = useExportJSON()
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
    const { ctrlKey } = useGlobalKeyEvent()
    const {
      pageConfig,
      setPageConfig,
      dataSource,
      changeDataSource
    } = usePageConfig()
    const {
      publish,
      publishLoading
    } = usePublishRemote()
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
    const initPageConfig = async () => {
      await store.dispatch('editor/initPageConfig')
    }
    const psd = ref()
    const handleUpload = () => {
      psd.value.click()
    }
    const jsonRef = ref()
    const handleImportFile = () => {
      jsonRef.value.click()
    }
    const tabActive = ref('editor-area')
    const clearCanvas = async () => {
      await store.dispatch('editor/clearActiveItem')
      await store.dispatch('editor/setAllItems', [])
    }
    watch(route, async () => {
      await initPageConfig()
      await getPageData()
      await store.dispatch('editor/clearHistory')
    })
    onMounted(async () => {
      await initPageConfig()
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
      ctrlKey,
      savePageData,
      saveLoading,
      pageLoading,
      uploadFile,
      psd,
      jsonRef,
      handleUpload,
      clearCanvas,
      pageConfig,
      setPageConfig,
      tabActive,
      dataSource,
      changeDataSource,
      publish,
      publishLoading,
      exportFile,
      importFile,
      handleImportFile
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
