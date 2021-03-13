import { Octokit } from '@octokit/rest'
import { useStore } from 'vuex'
import nunjucks from 'nunjucks'
import { loadFile } from '@/utils'
import { Base64 } from 'js-base64'
import { ElMessage, ElNotification } from 'element-plus'

export default function usePublishRemote () {
  const store = useStore()
  const octokit = new Octokit({
    auth: process.env.accessToken
  })
  const publish = async (pageId) => {
    if (!pageId) return ElMessage.error('发布前请先保存页面')
    const tempPath = new Date().getTime()
    const pageConfig = {
      title: store.state.editor.pageConfig.title,
      description: store.state.editor.pageConfig.description,
      keywords: store.state.editor.pageConfig.keywords,
      landingData: store.state.editor.allItems,
      dataSource: store.state.editor.dataSource
    }
    const indexPage = await nunjucks.render('template.njk', pageConfig)
    const generatorJavascript = await loadFile('generator/generator.umd.min.js', 'text')
    const generatorCss = await loadFile('generator/generator.css', 'text')
    const animateCss = await loadFile('style/animate.css', 'text')
    const fileList = [{
      path: `${tempPath}/generator.umd.min.js`,
      content: Base64.encode(generatorJavascript)
    }, {
      path: `${tempPath}/generator.css`,
      content: Base64.encode(generatorCss)
    }, {
      path: `${tempPath}/animate.css`,
      content: Base64.encode(animateCss)
    }, {
      path: `${tempPath}/index.html`,
      content: Base64.encode(indexPage)
    }]
    for (let index = 0; index < fileList.length; index++) {
      const element = fileList[index]
      await uploadQueue(element.path, element.content)
    }
    ElMessage.success('发布成功')
    ElNotification({
      title: '发布成功',
      dangerouslyUseHTMLString: true,
      message: `<a href="https://toy-maker-website.vercel.app/${tempPath}">查看</a>`
    })
  }
  /**
   * @description 上传队列
   * @param path {String} 上传路径
   * @param content {String} base64内容
   * @returns {Promise<void>}
   */
  const uploadQueue = async (
    path, content
  ) => {
    await octokit.repos.createOrUpdateFileContents({
      owner: 'lzq920',
      repo: 'toy-maker-publish',
      path: path,
      message: `update ${path}`,
      content: content
    })
  }
  return {
    publish
  }
}
