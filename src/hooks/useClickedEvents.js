import { onMounted, reactive } from 'vue'
import { runAnimation } from '@/utils'

/**
 * @description 定义组件点击Hooks
 * @param config 组件配置
 * @param mode 运行环境
 * @returns {{handleClick: (function(): undefined)}}
 */
export default function useClickedEvents (config, mode) {
  const eventList = config.events
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
        }
      })
    }
  })
  const handleClick = async () => {
    if (mode === 'pc') {
      return
    }
    if (eventList instanceof Array) {
      for (let i = 0; i <= eventList.length; i++) {
        const element = eventList[i]
        await eventUtils[element.key](element.params)
      }
    }
  }
  const playAnimations = async () => {
    if (mode !== 'pc') {
      await runAnimation(document.querySelector(`#${config.id}`), config.animations)
    }
  }
  onMounted(async () => {
    await playAnimations()
  })
  return {
    handleClick
  }
}
