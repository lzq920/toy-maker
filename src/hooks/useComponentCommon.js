import { inject, onMounted, reactive } from 'vue'
import { runAnimation, transferStyleMode } from '@/utils'
import { get } from 'lodash'

/**
 * @description 定义组件公共事件处理Hooks
 * @param config 组件配置
 */
export default function useComponentCommon (config) {
  const eventUtils = reactive({
    redirect (str) {
      return new Promise((resolve, reject) => {
        if (str) {
          location.href = str
          resolve()
        }
      })
    },
    alert (str) {
      return new Promise((resolve, reject) => {
        if (str) {
          alert(str)
          resolve()
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
  const isExpression = (value) => {
    return /^#\{\{.*\}\}$/.test(value)
  }
  /**
   * @description 获取插值表达式结果
   * @param value String
   * @returns {string}
   */
  const getExpression = (value) => {
    if (isExpression(value)) {
      const path = value.slice(3, -2)
      return get(dataSource.value, path, '')
    } else {
      return value
    }
  }
  /**
   * @description 点击事件处理
   * @returns {Promise<void>}
   */
  const handleClick = async () => {
    if (mode.value === 'pc') {
      return
    }
    const eventList = config.events
    if (Array.isArray(eventList) && eventList.length > 0) {
      for (let i = 0; i < eventList.length; i++) {
        const element = eventList[i]
        await eventUtils[element.key](element.params)
      }
    }
  }
  /**
   * @description 动画处理
   * @returns {Promise<void>}
   */
  const playAnimations = async () => {
    if (mode !== 'pc') {
      await runAnimation(document.querySelector(`#${config.id}`), config.animations)
    }
  }
  /**
   * @description 计算不同环境下的样式
   * @returns {Object}
   */
  const computedStyle = () => {
    return transferStyleMode(config, mode.value)
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
