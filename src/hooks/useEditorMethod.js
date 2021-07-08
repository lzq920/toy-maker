import useUpdateComponent from '@/hooks/useUpdateComponent'
import { useStore } from 'vuex'
import { ref, toRaw, watch } from 'vue'
import { ElMessage } from 'element-plus'
import domToImage from 'dom-to-image'
import { useRoute, useRouter } from 'vue-router'
import useTencentCloud from '@/hooks/useTencentCloud'

export default function useEditorMethod () {
  const { pageService } = useTencentCloud()
  const { mergeComponent } = useUpdateComponent()
  const store = useStore()
  const route = useRoute()
  const { params } = route
  const router = useRouter()
  const pageId = ref(params.id)
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
      const { data } = await pageService.getPageById(pageId.value)
      if (data.length > 0) {
        const {
          allItems,
          pageConfig,
          canvasSetting,
          dataSource
        } = data[0]
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
    if (saveLoading.value) {
      return
    }
    saveLoading.value = true
    try {
      let cover = ''
      if (store.state.editor.allItems.length > 0) {
        cover = await screenshot(document.querySelector('.editor-area'))
      } else {
        cover = '//via.placeholder.com/375x667/FFFFFF/000000/?text=toy+maker'
      }
      await store.dispatch('editor/setPageConfig', { cover: cover })
    } catch (err) {
      ElMessage.warning('封面保存异常')
    }
    if (pageId.value) {
      try {
        await pageService.updatePageById(pageId.value, {
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
        saveLoading.value = true
        const { id } = await pageService.addPage({
          pageConfig: toRaw(store.state.editor.pageConfig),
          allItems: toRaw(store.state.editor.allItems),
          canvasSetting: toRaw(store.state.editor.canvasSetting),
          dataSource: toRaw(store.state.editor.dataSource)
        })
        saveLoading.value = false
        ElMessage.success('创建成功')
        await router.replace({
          name: 'Edit',
          params: {
            id: id
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
