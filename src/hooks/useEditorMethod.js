import useUpdateComponent from '@/hooks/useUpdateComponent'
import { useStore } from 'vuex'
import { ref, toRaw, onBeforeMount } from 'vue'
import { ElMessage } from 'element-plus'
import domToImage from 'dom-to-image'
import { PageService } from '@/service/pageService'
import { initJsStore } from '@/service/idbConfig'
import { useRoute } from 'vue-router'
export default function useEditorMethod () {
  const { mergeComponent } = useUpdateComponent()
  const store = useStore()
  const route = useRoute()
  const { params } = route
  const pageId = ref(params.id)
  const pageStore = new PageService()
  const saveLoading = ref(false)
  const pageLoading = ref(false)
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
      if (result.length) {
        const {
          allItems,
          pageConfig,
          canvasSetting
        } = result[0]
        const items = allItems.map(item => {
          return mergeComponent(item)
        })
        await store.dispatch('editor/setPageConfig', pageConfig)
        await store.dispatch('editor/setCanvas', canvasSetting)
        await store.dispatch('editor/setAllItems', items)
      }
    }
    pageLoading.value = false
  }
  const savePageData = async () => {
    await store.dispatch('editor/clearActiveItem')
    saveLoading.value = true
    store.state.editor.pageConfig.cover = await screenshot(document.querySelector('.editor-area'))
    if (pageId.value) {
      await pageStore.updatePageById({
        id: pageId.value,
        pageConfig: toRaw(store.state.editor.pageConfig),
        allItems: toRaw(store.state.editor.allItems),
        canvasSetting: toRaw(store.state.editor.canvasSetting)
      })
      ElMessage.success('保存成功')
      saveLoading.value = false
    } else {
      await pageStore.addPage({
        id: '0',
        pageConfig: toRaw(store.state.editor.pageConfig),
        allItems: toRaw(store.state.editor.allItems),
        canvasSetting: toRaw(store.state.editor.canvasSetting)
      })
      ElMessage.success('新增成功')
      saveLoading.value = false
    }
  }
  onBeforeMount(async () => {
    try {
      const isDbCreated = await initJsStore()
      if (isDbCreated) {
        console.log('db created')
      } else {
        console.log('db opened')
      }
    } catch (ex) {
      console.error(ex)
    }
  })
  return {
    getPageData,
    savePageData,
    saveLoading,
    pageLoading
  }
}
