import { useStore } from 'vuex'

export default function useDragSelection () {
  const store = useStore()
  /**
   * @description 判断是否包含
   * @returns {Boolean}
   */
  const hasContains = (big, small) => {
    return big.left <= small.left && big.top <= small.top && big.right > small.right && big.bottom >= small.bottom
  }
  /**
   * @description 选区位置回调
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
