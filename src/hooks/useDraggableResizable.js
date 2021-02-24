import { useStore } from 'vuex'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

/**
 * @description 拖拽组件事件集合Hook
 * @param {Object} params 拖拽组件参数对象
 * @returns {{dragging: dragging, dragStart: dragStart, resizeEnd: (function(): Promise<void>), resizing: resizing, dragEnd: (function(): Promise<void>), resizeStart: resizeStart, isActive: Ref<UnwrapRef<boolean>>, deactivated: (function(): Promise<void>), activated: (function(): Promise<void>)}}
 */
export default function useDraggableResizable (params) {
  const store = useStore()
  const isActive = ref(false)
  const ctrlKey = ref(false)
  const activeItemIds = computed(() => {
    return store.getters['editor/activeItemIds']
  })
  watch(activeItemIds, (value) => {
    isActive.value = value.includes(params.id)
  })
  /**
   * @description 组件活跃状态监听
   * @returns {Promise<void>}
   */
  const activated = async () => {
    if (ctrlKey.value) {
      await store.dispatch('editor/addActiveItem', params)
    } else {
      await store.dispatch('editor/replaceActiveItem', [params])
    }
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
  /**
   * @description 监听 Ctrl 或 Command 按下
   * @param e 事件对象
   * @returns {Promise<void>}
   */
  const globalsKeyDown = async (e) => {
    ctrlKey.value = e.ctrlKey || e.metaKey
    if (e.ctrlKey && e.code === 'KeyZ') {
      e.preventDefault()
      if (store.getters['editor/canUndo']) {
        await store.dispatch('editor/undoHistory')
      }
    }
    if (e.ctrlKey && e.code === 'KeyY') {
      e.preventDefault()
      if (store.getters['editor/canRedo']) {
        await store.dispatch('editor/redoHistory')
      }
    }
  }
  onMounted(() => {
    document.addEventListener('keydown', globalsKeyDown)
  })
  onBeforeUnmount(() => {
    document.removeEventListener('keydown', globalsKeyDown)
  })
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
