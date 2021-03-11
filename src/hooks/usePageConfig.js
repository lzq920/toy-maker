import { computed, reactive, ref, toRaw, watch } from 'vue'
import { useStore } from 'vuex'
import { isPlainObject } from 'lodash'

export default function usePageConfig () {
  const store = useStore()
  const dialog = ref(false)
  const pageConfig = reactive({
    title: '',
    description: '',
    keywords: ''
  })
  const dataSource = ref('')
  const config = computed(() => {
    return store.state.editor.pageConfig
  })
  const data = computed(() => store.state.editor.dataSource)
  watch(config, (val) => {
    const {
      title,
      description,
      keywords
    } = val
    pageConfig.title = title
    pageConfig.description = description
    pageConfig.keywords = keywords
  }, {
    deep: true
  })
  watch(data, (val) => {
    dataSource.value = JSON.stringify(val)
  }, {
    deep: true
  })
  const setPageConfig = async () => {
    await store.dispatch('editor/setPageConfig', toRaw(pageConfig))
    openDialog(false)
  }
  const changeDataSource = async (val) => {
    try {
      const obj = JSON.parse(val)
      if (!isPlainObject(obj)) {
        return
      }
      await store.dispatch('editor/setDataSource', obj)
    } catch (e) {
      console.log(e.message)
    }
  }
  const openDialog = (value) => {
    dialog.value = value
  }
  return {
    pageConfig,
    openDialog,
    dialog,
    setPageConfig,
    dataSource,
    changeDataSource
  }
}
