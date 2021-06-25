import { Octokit } from '@octokit/rest'
import { useStore } from 'vuex'
import nunjucks from 'nunjucks'
import { fire, loadFile } from '@/utils'
import { Base64 } from 'js-base64'
import { ElMessage, ElNotification } from 'element-plus'
import { ref } from 'vue'
import useTencentCloud from '@/hooks/useTencentCloud'
import useStorage from '@/hooks/useStorage'
import { useRoute } from 'vue-router'

/**
 * @description 远程发布Hook
 * @returns {{publish: (function(*=): Promise<IMessageHandle|undefined>), publishLoading: Ref<UnwrapRef<boolean>>}}
 */
export default function usePublishRemote () {
  const store = useStore()
  const route = useRoute()
  const { storage } = useStorage()
  let accessToken = storage.getItem('accessToken')
  let githubName = storage.getItem('githubName')
  let githubRepo = storage.getItem('githubRepo')
  const { publishService } = useTencentCloud()
  const publishLoading = ref(false)
  const publish = async (pageId) => {
    accessToken = storage.getItem('accessToken')
    githubName = storage.getItem('githubName')
    githubRepo = storage.getItem('githubRepo')
    if (!pageId) return ElMessage.error('发布前请先保存页面')
    if (!accessToken || !githubName || !githubRepo) return ElMessage.error('请完善发布配置信息')
    const tempPath = `page-${new Date().getTime()}`
    const githubCDN = `https://cdn.jsdelivr.net/gh/${githubName}/${githubRepo}/${tempPath}/`
    const pageConfig = {
      pageId: route.params.id,
      title: store.state.editor.pageConfig.title,
      description: store.state.editor.pageConfig.description,
      keywords: store.state.editor.pageConfig.keywords,
      landingData: store.state.editor.allItems,
      dataSource: store.state.editor.dataSource,
      javascriptList: ['//unpkg.com/vue@next', `${githubCDN}generator.umd.min.js`],
      styleList: [`${githubCDN}generator.css`]
    }
    publishLoading.value = true
    const indexPage = await nunjucks.render('template.njk', pageConfig)
    const generatorJavascript = await loadFile('generator/generator.umd.min.js', 'text')
    const generatorCss = await loadFile('generator/generator.css', 'text')
    const fileList = [{
      path: `${tempPath}/index.html`,
      content: Base64.encode(indexPage)
    }, {
      path: `${tempPath}/generator.umd.min.js`,
      content: Base64.encode(generatorJavascript)
    }, {
      path: `${tempPath}/generator.css`,
      content: Base64.encode(generatorCss)
    }]
    for (let index = 0; index < fileList.length; index++) {
      const element = fileList[index]
      try {
        await uploadQueue(element.path, element.content, tempPath)
      } catch (e) {
        publishLoading.value = false
        ElMessage.error(e.message)
      }
    }
    await publishService.addPublish({
      pageId: pageId,
      createTime: new Date().getTime(),
      title: pageConfig.title,
      description: pageConfig.description,
      keywords: pageConfig.keywords,
      url: `https://${githubName}.github.io/${githubRepo}/${tempPath}/`
    })
    publishLoading.value = false
    ElNotification({
      title: '发布成功',
      dangerouslyUseHTMLString: true,
      message: `<a href="https://${githubName}.github.io/${githubRepo}/${tempPath}/" target="_blank">查看</a>`
    })
    fire()
  }
  /**
   * @description 上传队列
   * @param path {String} 上传路径
   * @param content {String} base64内容
   * @param tempPath {String} 上传地址
   * @returns {Promise<void>}
   */
  const uploadQueue = async (
    path, content, tempPath
  ) => {
    const octokit = new Octokit({
      auth: accessToken
    })
    await octokit.repos.createOrUpdateFileContents({
      owner: githubName,
      repo: githubRepo,
      path: path,
      message: `publish ${tempPath}`,
      content: content
    })
  }
  return {
    publish,
    publishLoading
  }
}
