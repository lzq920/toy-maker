import { computed, reactive, ref, toRaw, watch } from 'vue'
import { useStore } from 'vuex'

export default function usePageConfig () {
  const store = useStore()
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
    dataSource.value = JSON.stringify(val, null, ' ')
  }, {
    deep: true
  })
  const setPageConfig = async (val) => {
    await store.dispatch('editor/setPageConfig', toRaw(val))
  }
  const changeDataSource = async (val) => {
    await store.dispatch('editor/setDataSource', val)
  }

  return {
    pageConfig,
    setPageConfig,
    dataSource,
    changeDataSource
  }
}
