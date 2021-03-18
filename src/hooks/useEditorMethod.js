import useUpdateComponent from '@/hooks/useUpdateComponent'
import { useStore } from 'vuex'
import { ref, toRaw, watch } from 'vue'
import { ElMessage } from 'element-plus'
import domToImage from 'dom-to-image'
import { PageService } from '@/service/pageService'
import { useRoute, useRouter } from 'vue-router'
import { generatorUUID } from '@/utils'

export default function useEditorMethod () {
  const { mergeComponent } = useUpdateComponent()
  const store = useStore()
  const route = useRoute()
  const { params } = route
  const router = useRouter()
  const pageId = ref(params.id)
  const pageStore = new PageService()
  const saveLoading = ref(false)
  const pageLoading = ref(false)
  watch(route, (val) => {
    pageId.value = val.params.id
  })
  const screenshot = async (dom) => {
    return domToImage.toPng(dom, {
      height: 667,
      width: 375
    })
  }
  const getPageData = async () => {
    pageLoading.value = true
    if (pageId.value) {
      const result = await pageStore.getPageById(pageId.value)
      if (result.length > 0) {
        const {
          allItems,
          pageConfig,
          canvasSetting,
          dataSource
        } = result[0]
        debugger
        const items = allItems.map(item => {
          return mergeComponent(item)
        })
        await store.dispatch('editor/setPageConfig', pageConfig)
        await store.dispatch('editor/setCanvas', canvasSetting)
        await store.dispatch('editor/setAllItems', items)
        await store.dispatch('editor/setDataSource', dataSource)
      }
    }
    pageLoading.value = false
  }
  const savePageData = async () => {
    await store.dispatch('editor/clearActiveItem')
    saveLoading.value = true
    const cover = await screenshot(document.querySelector('.editor-area'))
    await store.dispatch('editor/setPageConfig', { cover: cover })
    if (pageId.value) {
      try {
        await pageStore.updatePageById({
          id: pageId.value,
          pageConfig: toRaw(store.state.editor.pageConfig),
          allItems: toRaw(store.state.editor.allItems),
          canvasSetting: toRaw(store.state.editor.canvasSetting),
          dataSource: toRaw(store.state.editor.dataSource)
        })
        ElMessage.success('保存成功')
        saveLoading.value = false
      } catch (error) {
        ElMessage.error(error.message)
        saveLoading.value = false
      }
    } else {
      try {
        const result = await pageStore.addPage({
          id: generatorUUID(),
          pageConfig: toRaw(store.state.editor.pageConfig),
          allItems: toRaw(store.state.editor.allItems),
          canvasSetting: toRaw(store.state.editor.canvasSetting),
          dataSource: toRaw(store.state.editor.dataSource)
        })
        ElMessage.success('新增成功')
        saveLoading.value = false
        await router.replace({
          name: 'Edit',
          params: {
            id: result[0].id
          }
        })
      } catch (error) {
        ElMessage.error(error.message)
        saveLoading.value = false
      }
    }
  }
  return {
    getPageData,
    savePageData,
    saveLoading,
    pageLoading
  }
}
