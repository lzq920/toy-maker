import { useStore } from 'vuex'
import { onBeforeUnmount, onMounted } from 'vue'
export default function useDraggableResizable (params) {
  const store = useStore()
  const activated = async () => {
    await store.dispatch('editor/addActiveItem', params)
  }
  const deactivated = async () => {
    await store.dispatch('editor/removeActiveItem', params)
  }
  const dragStart = () => {
  }
  const resizeStart = () => {
  }
  const dragging = () => {
  }
  const resizing = () => {
  }
  const dragEnd = async () => {
    await store.dispatch('editor/addHistory')
  }
  const resizeEnd = async () => {
    await store.dispatch('editor/addHistory')
  }
  const globalsKeyDown = async (e) => {
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
  onMounted(async () => {
    await store.dispatch('editor/clearHistory')
    document.addEventListener('keydown', globalsKeyDown)
  })
  onBeforeUnmount(() => {
    document.removeEventListener('keydown', globalsKeyDown)
  })
  return {
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
