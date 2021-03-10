import { useStore } from 'vuex'
import nunjucks from 'nunjucks'
import JSZIP from 'jszip'
import FileSaver from 'file-saver'

/**
 * @description 获取远程地址文件流
 * @param url
 * @returns {Promise<unknown>}
 */
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

/**
 * @description 导出Zip打包文件
 * @returns {{downloadZip: (function(): Promise<void>)}}
 */
export default function useExportZip () {
  const store = useStore()
  /**
   * @description 下载Zip包文件
   * @returns {Promise<void>}
   */
  const downloadZip = async () => {
    const pageConfig = {
      title: store.state.editor.pageConfig.title,
      description: store.state.editor.pageConfig.description,
      keywords: store.state.editor.pageConfig.keywords,
      landingData: store.state.editor.allItems,
      dataSource: store.state.editor.dataSource
    }
    try {
      const renderPage = await nunjucks.render('template.njk', pageConfig)
      const zipFile = new JSZIP()
      zipFile.file('index.html', renderPage)
      const generatorJavascript = await loadFile('generator/generator.umd.min.js')
      const generatorCss = await loadFile('generator/generator.css')
      const faviconIco = await loadFile('favicon.ico')
      const animateCss = await loadFile('style/animate.css')
      zipFile.file('generator.umd.min.js', generatorJavascript)
      zipFile.file('favicon.ico', faviconIco)
      zipFile.file('generator.css', generatorCss)
      zipFile.file('animate.css', animateCss)
      const zipFileBlob = await zipFile.generateAsync({ type: 'blob' })
      FileSaver.saveAs(zipFileBlob, `${store.state.editor.pageConfig.title}.zip`)
    } catch (error) {
      throw new Error(error)
    }
  }
  return {
    downloadZip
  }
}
