import { useStore } from 'vuex'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

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
  const activated = async () => {
    if (ctrlKey.value) {
      await store.dispatch('editor/addActiveItem', params)
    } else {
      await store.dispatch('editor/replaceActiveItem', [params])
    }
  }
  const deactivated = async () => {
    await nextTick(() => {
      isActive.value = activeItemIds.value.includes(params.id)
    })
    // await store.dispatch('editor/removeActiveItem', params)
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
