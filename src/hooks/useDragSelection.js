export default function useDragSelection () {
  /**
   * @description 获取所有可拖拽元素
   * @returns {Element}
   */
  const getVdrContainerList = () => {
    return document.querySelectorAll('.vdr-container')
  }
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
  const dragEnd = params => {
    const domList = getVdrContainerList()
    const includeIds = []
    Array.from(domList).forEach(element => {
      const { left, top, bottom, right } = element.getBoundingClientRect()
      if (hasContains(params, { left, top, bottom, right })) {
        includeIds.push(element.dataset.id)
      }
    })
    console.log(includeIds)
  }
  return {
    dragEnd
  }
}
