import { computed, reactive, ref, toRaw, watch } from 'vue'
import { useStore } from 'vuex'

export default function usePageConfig () {
  const store = useStore()
  const dialog = ref(false)
  const pageConfig = reactive({
    title: '',
    description: '',
    keywords: ''
  })
  const config = computed(() => {
    return store.state.editor.pageConfig
  })
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
  const setPageConfig = async () => {
    await store.dispatch('editor/setPageConfig', toRaw(pageConfig))
    openDialog(false)
  }
  const openDialog = (value) => {
    dialog.value = value
  }
  return {
    pageConfig,
    openDialog,
    dialog,
    setPageConfig
  }
}
