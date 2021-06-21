import { useStore } from 'vuex'
import FileSaver from 'file-saver'

export default function useExportJSON () {
  const store = useStore()
  const exportFile = () => {
    const pageData = {
      allItems: store.state.editor.allItems,
      dataSource: store.state.editor.dataSource,
      canvasSetting: store.state.editor.canvasSetting,
      pageConfig: store.state.editor.pageConfig
    }
    const pageDataBlob = new Blob([JSON.stringify(pageData)], { type: 'application/json' })
    FileSaver(pageDataBlob, `${pageData.pageConfig.title}.json`)
  }
  return {
    exportFile
  }
}
