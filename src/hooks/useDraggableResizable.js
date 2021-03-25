import { useStore } from 'vuex'
import { computed, nextTick, ref, watch } from 'vue'

/**
 * @description 拖拽组件事件集合Hook
 * @param {Object} params 拖拽组件参数对象
 * @returns {{dragging: dragging, dragStart: dragStart, resizeEnd: (function(): Promise<void>), resizing: resizing, dragEnd: (function(): Promise<void>), resizeStart: resizeStart, isActive: Ref<UnwrapRef<boolean>>, deactivated: (function(): Promise<void>), activated: (function(): Promise<void>)}}
 */
export default function useDraggableResizable (params) {
  const store = useStore()
  const isActive = ref(false)
  const activeItemIds = computed(() => {
    return store.getters['editor/activeItemIds']
  })
  // const ctrlKey = computed(() => {
  //   return store.state.editor.globalsKeyEvent.ctrlKey
  // })
  watch(activeItemIds, (value) => {
    isActive.value = value.includes(params.id)
  })
  /**
   * @description 组件活跃状态监听
   * @returns {Promise<void>}
   */
  const activated = async () => {
    await store.dispatch('editor/replaceActiveItem', [params])
  }
  /**
   * @description 组件非活跃状态监听
   * @returns {Promise<void>}
   */
  const deactivated = async () => {
    await nextTick(() => {
      isActive.value = activeItemIds.value.includes(params.id)
    })
    // await store.dispatch('editor/removeActiveItem', params)
  }
  /**
   * @description 位置改变开始事件回调
   */
  const dragStart = () => {
  }
  /**
   * @description 大小改变开始事件回调
   */
  const resizeStart = () => {
  }
  /**
   * @description 位置改变事件回调
   */
  const dragging = () => {
  }
  /**
   * @description 大小改变事件回调
   */
  const resizing = () => {
  }
  /**
   * @description 位置移动结束事件回调
   * @returns {Promise<void>}
   */
  const dragEnd = async () => {
    await store.dispatch('editor/addHistory')
  }
  /**
   * @description 大小改变结束事件回调
   * @returns {Promise<void>}
   */
  const resizeEnd = async () => {
    await store.dispatch('editor/addHistory')
  }
  return {
    isActive,
    activated,
    deactivated,
    dragStart,
    dragEnd,
    resizeStart,
    resizeEnd,
    resizing,
    dragging
  }
}
