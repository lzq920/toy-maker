import useUpdateComponent from '@/hooks/useUpdateComponent'
import GoDB from 'godb'
import { useStore } from 'vuex'
import { computed, ref, toRaw } from 'vue'
import { ElMessage } from 'element-plus'

export default function useEditorMethod () {
  const { mergeComponent } = useUpdateComponent()
  const schema = {
    page: {
      pageConfigId: String,
      pageConfigTitle: String,
      canvasSetting: Object,
      allItems: Array
    }
  }
  const pageId = ref(1)
  const tokMakerDB = new GoDB('tokMakerDB', schema)
  const pageTable = tokMakerDB.table('page')
  const store = useStore()
  const vdrList = computed(() => {
    return store.state.editor.allItems
  })
  const saveLoading = ref(false)
  const pageLoading = ref(false)
  const getPageData = async () => {
    pageLoading.value = true
    const result = await pageTable.get(pageId.value)
    if (result) {
      const {
        allItems,
        pageConfig,
        canvasSetting
      } = result
      const items = allItems.map(item => {
        return mergeComponent(item)
      })
      await store.dispatch('editor/setPageConfig', pageConfig)
      await store.dispatch('editor/setCanvas', canvasSetting)
      await store.dispatch('editor/setAllItems', items)
    }
    pageLoading.value = false
  }
  const savePageData = async () => {
    saveLoading.value = true
    await pageTable.put({
      id: pageId.value,
      pageConfig: toRaw(store.state.editor.pageConfig),
      canvasSetting: toRaw(store.state.editor.canvasSetting),
      allItems: toRaw(vdrList.value)
    })
    ElMessage.success('保存成功')
    saveLoading.value = false
  }

  return {
    getPageData,
    savePageData,
    saveLoading,
    pageLoading
  }
}
