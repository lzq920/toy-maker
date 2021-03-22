import cloudbase from '@cloudbase/js-sdk'
import { ElMessage } from 'element-plus'
import { computed, reactive } from 'vue'

export default function useTencentCloud () {
  /**
   * @description 云Base实例
   * @type {cloudbase.app.App}
   */
  const app = cloudbase.init({
    env: 'cloud-dev-1gokvxnv79e12706'
  })
  /**
   * @description 授权方法
   * @type {cloudbase.auth.App}
   */
  const auth = app.auth({
    persistence: 'local' // 用户显式退出或更改密码之前的30天一直有效
  })
  /**
   * @description 数据连接DB
   * @type {cloudbase.database.App}
   */
  const db = app.database()
  const pageCollection = db.collection('toy-maker-pages')
  const publishCollection = db.collection('toy-maker-publish')
  /**
   * @description 返回当前登录状态
   */
  const loginState = () => {
    return auth.hasLoginState()
  }
  /**
   * @description 当前登录用户信息
   * @type {ComputedRef<cloudbase.auth.IUser>}
   */
  const userInfo = computed(() => {
    return auth.currentUser
  })
  /**
   * @description 用户登录
   * @param email {String} 邮箱
   * @param password {String} 密码
   */
  const signIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
  }
  /**
   * @description 用户注册
   * @param email {String} 邮箱
   * @param password {String} 密码
   */
  const signUp = (email, password) => {
    return auth.signUpWithEmailAndPassword(email, password)
  }
  /**
   * @description 退出登录
   */
  const signOut = () => {
    auth.signOut().then(() => {
      ElMessage.success('退出登录')
    })
  }
  /**
   * @description 页面Service
   * @type {UnwrapNestedRefs<{getPageList(): void, updatePageById(*=): void, getPageById(*=): void, removePageById(*=): void}>}
   */
  const pageService = reactive({
    /**
     * @description 获取所有页面
     */
    getPageList () {
      return pageCollection.get()
    },
    /**
     * @description 获取单个页面
     * @param id {String} 页面ID
     */
    getPageById (id) {
      return pageCollection.doc(id).get()
    },
    /**
     * @description 删除单个页面
     * @param id {String} 页面ID
     */
    removePageById (id) {
      return pageCollection.doc(id).remove()
    },
    /**
     * @description 更新单个页面
     * @param page {Object} 页面数据
     */
    updatePageById (page) {
      return pageCollection.doc(page._id).set(page)
    },
    /**
     * @description 添加页面
     * @param page {Object} 页面数据
     * @returns {Promise<Pick<cloudbase.database.SetRes, "code" | "message">>}
     */
    addPage (page) {
      return pageCollection.add(page)
    }
  })
  /**
   * @description 发布Service
   * @type {UnwrapNestedRefs<{getPublishList(): void, updatePublishById(*=): void}>}
   */
  const publishService = reactive({
    /**
     * @description 添加发布记录
     */
    addPublish (log) {
      return publishCollection.add(log)
    },
    /**
     * @description 获取所有发布记录
     */
    getPublishList () {
      return publishCollection.get()
    }
  })
  return {
    signIn,
    signUp,
    signOut,
    loginState,
    userInfo,
    pageService,
    publishService
  }
}