import { Octokit } from '@octokit/rest'
import { useStore } from 'vuex'
import nunjucks from 'nunjucks'
import { loadFile } from '@/utils'
import { Base64 } from 'js-base64'
import { ElMessage, ElNotification } from 'element-plus'
import { ref } from 'vue'
import { PublishService } from '@/service/publishService'

/**
 * @description 远程发布Hook
 * @returns {{publish: (function(*=): Promise<IMessageHandle|undefined>), publishLoading: Ref<UnwrapRef<boolean>>}}
 */
export default function usePublishRemote () {
  const store = useStore()
  let accessToken = localStorage.getItem('accessToken')
  let githubName = localStorage.getItem('githubName')
  let githubRepo = localStorage.getItem('githubRepo')
  const publishStore = new PublishService()
  const publishLoading = ref(false)
  const publish = async (pageId) => {
    accessToken = localStorage.getItem('accessToken')
    githubName = localStorage.getItem('githubName')
    githubRepo = localStorage.getItem('githubRepo')
    if (!pageId) return ElMessage.error('发布前请先保存页面')
    if (!accessToken || !githubName || !githubRepo) return ElMessage.error('请完善发布配置信息')
    const tempPath = `page-${new Date().getTime()}`
    const pageConfig = {
      title: store.state.editor.pageConfig.title,
      description: store.state.editor.pageConfig.description,
      keywords: store.state.editor.pageConfig.keywords,
      landingData: store.state.editor.allItems,
      dataSource: store.state.editor.dataSource
    }
    publishLoading.value = true
    const indexPage = await nunjucks.render('template.njk', pageConfig)
    const generatorJavascript = await loadFile('generator/generator.umd.min.js', 'text')
    const generatorCss = await loadFile('generator/generator.css', 'text')
    const animateCss = await loadFile('style/animate.css', 'text')
    const fileList = [{
      path: `${tempPath}/index.html`,
      content: Base64.encode(indexPage)
    }, {
      path: `${tempPath}/generator.umd.min.js`,
      content: Base64.encode(generatorJavascript)
    }, {
      path: `${tempPath}/generator.css`,
      content: Base64.encode(generatorCss)
    }, {
      path: `${tempPath}/animate.css`,
      content: Base64.encode(animateCss)
    }]
    for (let index = 0; index < fileList.length; index++) {
      const element = fileList[index]
      try {
        await uploadQueue(element.path, element.content)
      } catch (e) {
        publishLoading.value = false
        ElMessage.error(e.message)
      }
    }
    await publishStore.addPublish({
      pageId: pageId,
      url: `https://${githubName}.github.io/${githubRepo}/${tempPath}`
    })
    publishLoading.value = false
    ElNotification({
      title: '发布成功',
      dangerouslyUseHTMLString: true,
      message: `<a href="https://${githubName}.github.io/${githubRepo}/${tempPath}" target="_blank">查看</a>`
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
    const octokit = new Octokit({
      auth: accessToken
    })
    await octokit.repos.createOrUpdateFileContents({
      owner: githubName,
      repo: githubRepo,
      path: path,
      message: `update ${path}`,
      content: content
    })
  }
  return {
    publish,
    publishLoading
  }
}
