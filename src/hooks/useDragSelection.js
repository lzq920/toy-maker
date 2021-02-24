import { useStore } from 'vuex'

/**
 * @description 拖拽选区事件Hook
 * @returns {{dragEnd: (function(*=): Promise<void>)}}
 */
export default function useDragSelection () {
  const store = useStore()
  /**
   * @description 判断组件是否包含在选区内部
   * @returns {Boolean}
   */
  const hasContains = (big, small) => {
    return big.left <= small.left && big.top <= small.top && big.right > small.right && big.bottom >= small.bottom
  }
  /**
   * @description 选区结束事件回调
   */
  const dragEnd = async (params) => {
    const domList = document.querySelectorAll('.vdr-container')
    const includeIds = []
    Array.from(domList).forEach(element => {
      const { left, top, bottom, right } = element.getBoundingClientRect()
      if (hasContains(params, { left, top, bottom, right })) {
        includeIds.push(element.dataset.id)
      }
    })
    const activeItems = store.state.editor.allItems.filter(item => includeIds.includes(item.id))
    await store.dispatch('editor/replaceActiveItem', activeItems)
  }
  return {
    dragEnd
  }
}
