import { inject, onMounted, reactive } from 'vue'
import { copyToClipboard, runAnimation, scrollToTop, transferStyleMode } from '@/utils'
import { get } from 'lodash'
import { useShare } from '@vueuse/core'
import useConsole from '@/hooks/useConsole'

/**
 * @description 定义组件公共事件处理Hooks
 * @param config 组件配置
 */
export default function useComponentCommon (config) {
  const {
    share,
    isSupported
  } = useShare()
  const { logger } = useConsole()
  const eventUtils = reactive({
    redirect (str) {
      return new Promise((resolve, reject) => {
        if (str) {
          window.open(str)
          resolve()
        } else {
          reject(new Error('跳转地址不能为空'))
        }
      })
    },
    alert (str) {
      return new Promise((resolve, reject) => {
        if (str) {
          alert(str)
          resolve()
        } else {
          reject(new Error('弹窗内容不能为空'))
        }
      })
    },
    copyToClipboard (str) {
      return new Promise((resolve, reject) => {
        if (str) {
          copyToClipboard(str)
          resolve()
        } else {
          reject(new Error('复制文本不能为空'))
        }
      })
    },
    backToTop () {
      return new Promise((resolve, reject) => {
        scrollToTop()
        resolve()
      })
    },
    systemShare (str) {
      return new Promise((resolve, reject) => {
        if (str) {
          if (isSupported) {
            share({
              title: document.title,
              text: str,
              url: location.href
            })
              .then(() => {
              })
              .catch(e => {
              })
          }
          resolve()
        } else {
          reject(new Error('分享内容不能为空'))
        }
      })
    }
  })
  const mode = inject('mode')
  const dataSource = inject('dataSource')
  /**
   * @description 判断是否是插值表达式
   * @param value String
   * @returns {boolean}
   */
  const isExpression = value => {
    return /^#\{\{.*\}\}$/.test(value)
  }
  /**
   * @description 获取插值表达式结果
   * @param value String
   * @returns {string}
   */
  const getExpression = value => {
    if (isExpression(value)) {
      const path = value.slice(3, -2)
      return get(dataSource, path, '')
    } else {
      return value
    }
  }
  /**
   * @description 点击事件处理
   * @returns {Promise<void>}
   */
  const handleClick = async () => {
    if (mode !== 'pc') {
      const eventList = config.events
      if (Array.isArray(eventList) && eventList.length > 0) {
        for (let i = 0; i < eventList.length; i++) {
          const element = eventList[i]
          await eventUtils[element.key](element.params)
            .then(res => logger.primary(res))
            .catch(e => logger.error(e))
        }
      }
    }
  }
  /**
   * @description 动画处理
   * @returns {Promise<void>}
   */
  const playAnimations = async () => {
    if (mode !== 'pc') {
      await runAnimation(
        document.querySelector(`#${config.id}`),
        config.animations
      )
    }
  }
  const computedStyle = component => {
    return transferStyleMode(component, mode)
  }
  onMounted(async () => {
    await playAnimations()
  })
  return {
    handleClick,
    computedStyle,
    getExpression,
    mode,
    dataSource
  }
}
