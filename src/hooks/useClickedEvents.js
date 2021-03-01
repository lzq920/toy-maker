import { reactive } from 'vue'

/**
 * @description 定义组件点击Hooks
 * @param params
 * @param mode
 * @returns {{eventsList: UnwrapNestedRefs<({name: string, event: UnwrapRef<function(*=): void>, key: string, url: string}|{name: string, event: UnwrapRef<function(*=): void>, message: string, key: string})[]>, handleClick: handleClick}}
 */
export default function useClickedEvents (params, mode) {
  const events = reactive({
    redirect (url) {
      if (url) {
        location.href = url
      }
    },
    alert (message) {
      if (message) {
        alert(message)
      }
    }
  })
  const eventsList = reactive([
    {
      key: 'redirect',
      name: '页面跳转',
      url: ''
    },
    {
      key: 'alert',
      name: '系统弹窗',
      message: ''
    }
  ])
  const handleClick = () => {
    if (mode === 'pc') {
      return
    }
    if (params instanceof Array) {
      Object.keys(params).forEach((event) => {
        switch (params[event].key) {
          case 'alert':
            events.alert(params[event].message)
            break
          case 'redirect':
            events.redirect(params[event].url)
            break
        }
      })
    }
  }
  return {
    eventsList,
    handleClick
  }
}
