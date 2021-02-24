import { computed } from 'vue'
import { useStore } from 'vuex'

/**
 * @description 操作历史记录事件集合Hook
 * @returns {{canUndo: ComputedRef<boolean>, handleRedo: (function(): Promise<void>), handleUndo: (function(): Promise<void>), canRedo: ComputedRef<boolean>}}
 */
export default function useUndoRedo () {
  const store = useStore()
  const canUndo = computed(() => {
    return !store.getters['editor/canUndo']
  })
  const canRedo = computed(() => {
    return !store.getters['editor/canRedo']
  })
  /**
   * @description 撤销事件
   * @returns {Promise<void>}
   */
  const handleUndo = async () => {
    await store.dispatch('editor/undoHistory')
  }
  /**
   * @description 重做事件
   * @returns {Promise<void>}
   */
  const handleRedo = async () => {
    await store.dispatch('editor/redoHistory')
  }
  return {
    canUndo,
    canRedo,
    handleUndo,
    handleRedo
  }
}
