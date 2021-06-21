import useUpdateComponent from '@/hooks/useUpdateComponent'
import { useStore } from 'vuex'

export default function useImportJSON () {
  const { mergeComponent } = useUpdateComponent()
  const store = useStore()
  const fileToJson = (file) => {
    const fileReader = new FileReader()
    fileReader.readAsArrayBuffer(file)
    return new Promise(resolve => {
      fileReader.onload = function () {
        const buffer = this.result
        const textDecoder = new TextDecoder('utf8')
        const result = textDecoder.decode(buffer)
        resolve(result)
      }
    })
  }
  const importFile = async (e) => {
    const file = e.target.files[0]
    const fileResult = await fileToJson(file)
    const pageData = JSON.parse(fileResult)
    const {
      allItems,
      pageConfig,
      canvasSetting,
      dataSource
    } = pageData
    const items = allItems.map(item => {
      return mergeComponent(item)
    })
    await store.dispatch('editor/setPageConfig', pageConfig)
    await store.dispatch('editor/setCanvas', canvasSetting)
    await store.dispatch('editor/setAllItems', items)
    await store.dispatch('editor/setDataSource', dataSource)
  }
  return {
    importFile
  }
}
