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
      if (str) {
        location.href = str
      }
    },
    alert (str) {
      if (str) {
        alert(str)
      }
    }
  })
  const handleClick = () => {
    if (mode === 'pc') {
      return
    }
    if (eventList instanceof Array) {
      Object.keys(eventList).forEach((event) => {
        switch (eventList[event].key) {
          case 'alert':
            eventUtils.alert(eventList[event].params)
            break
          case 'redirect':
            eventUtils.redirect(eventList[event].params)
            break
        }
      })
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
