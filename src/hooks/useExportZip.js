import { useStore } from 'vuex'
import nunjucks from 'nunjucks'
import JSZIP from 'jszip'
import FileSaver from 'file-saver'
function loadFile (url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', `${url}?v=${new Date().getTime()}`)
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response)
      }
    }
    xhr.onerror = () => {
      reject(new Error('请求出错'))
    }
    xhr.onprogress = (event) => {
      console.log(`Received ${event.loaded} of ${event.total}`)
    }
    xhr.responseType = 'blob'
    xhr.send()
  })
}
export default function useExportZip () {
  const store = useStore()
  const vdrList = store.state.editor.allItems
  const downloadZip = async () => {
    const pageConfig = {
      title: '下载页面',
      description: '下载页面描述',
      keywords: '关键词',
      landingData: vdrList
    }
    try {
      const renderPage = await nunjucks.render('template.njk', pageConfig)
      const zipFile = new JSZIP()
      zipFile.file('index.html', renderPage)
      const generatorJavascript = await loadFile('generator/generator.umd.min.js')
      const faviconIco = await loadFile('favicon.ico')
      zipFile.file('generator.umd.min.js', generatorJavascript)
      zipFile.file('favicon.ico', faviconIco)
      const zipFileBlob = await zipFile.generateAsync({ type: 'blob' })
      FileSaver.saveAs(zipFileBlob, `${new Date()}.zip`)
    } catch (error) {
      throw new Error(error)
    }
  }
  return {
    downloadZip
  }
}
