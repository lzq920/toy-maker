import { cloneDeep } from 'lodash'
import useUpdateComponent from '@/hooks/useUpdateComponent'
import { useStore } from 'vuex'
import { generatorUUID } from '@/utils'
import useEditorMethod from '@/hooks/useEditorMethod'
import { useRoute } from 'vue-router'
import useConsole from '@/hooks/useConsole'
import { and, useActiveElement, useMagicKeys, whenever } from '@vueuse/core'
import { computed, ref, watch } from 'vue'

export default function useGlobalKeyEvent () {
  const { mergeComponent } = useUpdateComponent()
  const { savePageData } = useEditorMethod()
  const store = useStore()
  const route = useRoute()
  const { logger } = useConsole()
  const ctrlKey = ref(false)
  const {
    Ctrl,
    // eslint-disable-next-line camelcase
    Ctrl_Z,
    // eslint-disable-next-line camelcase
    Ctrl_Y,
    // eslint-disable-next-line camelcase
    Ctrl_C,
    // eslint-disable-next-line camelcase
    Ctrl_V,
    // eslint-disable-next-line camelcase
    Ctrl_S,
    // eslint-disable-next-line camelcase
    Ctrl_P,
    // eslint-disable-next-line camelcase
    Alt_ArrowUp,
    // eslint-disable-next-line camelcase
    Alt_ArrowDown,
    // eslint-disable-next-line camelcase
    Alt_Shift_ArrowUp,
    // eslint-disable-next-line camelcase
    Alt_Shift_ArrowDown,
    Delete,
    Backspace,
    current
  } = useMagicKeys({
    passive: false,
    onEventFired (e) {
      if (notUsingInput.value) {
        e.preventDefault()
      }
    }
  })
  const activeElement = useActiveElement()
  const notUsingInput = computed(() =>
    activeElement.value?.tagName !== 'INPUT' && activeElement.value?.tagName !== 'TEXTAREA'
  )
  whenever(and(Ctrl_Z, notUsingInput), async () => {
    logger.primary('Ctrl+Z')
    if (store.getters['editor/canUndo']) {
      await store.dispatch('editor/undoHistory')
    }
  })
  whenever(and(Ctrl_Y, notUsingInput), async () => {
    logger.primary('Ctrl+Y')
    if (store.getters['editor/canRedo']) {
      await store.dispatch('editor/redoHistory')
    }
  })
  whenever(and(Delete, notUsingInput), async () => {
    logger.primary('Delete')
    if (store.state.editor.activeItems.length > 0) {
      await Promise.all(cloneDeep(store.state.editor.activeItems).map(item => {
        return store.dispatch('editor/removeItem', item)
      }))
    } else {
      logger.warning('没有活跃的组件')
    }
  })
  whenever(and(Backspace, notUsingInput), async () => {
    logger.primary('Backspace')
    if (store.state.editor.activeItems.length > 0) {
      await Promise.all(cloneDeep(store.state.editor.activeItems).map(item => {
        return store.dispatch('editor/removeItem', item)
      }))
    } else {
      logger.warning('没有活跃的组件')
    }
  })
  whenever(and(Ctrl_C, notUsingInput), async () => {
    logger.primary('Ctrl+C')
    await store.dispatch('editor/copyActiveItems')
  })
  whenever(and(Ctrl_V, notUsingInput), async () => {
    logger.primary('Ctrl+V')
    if (store.state.editor.copyData.length > 0) {
      await Promise.all(store.state.editor.copyData.map(item => {
        const target = Object.assign({}, item, { id: generatorUUID() })
        return store.dispatch('editor/addItem', mergeComponent(target))
      }))
    } else {
      logger.warning('没有要粘贴的组件')
    }
  })
  whenever(and(Ctrl_S, notUsingInput), async () => {
    logger.primary('Ctrl+S')
    await savePageData()
  })
  whenever(and(Ctrl_P, notUsingInput), async () => {
    logger.primary('Ctrl+P')
    const pageId = route.params.id
    if (pageId) {
      window.open(`${location.origin}/preview.html`)
    }
  })
  whenever(and(Alt_Shift_ArrowDown, notUsingInput), async () => {
    if (current.has('ShiftLeft')) {
      logger.primary('Alt+Shift+ArrowDown')
      await store.dispatch('editor/moveLast')
    }
  })
  whenever(and(Alt_Shift_ArrowUp, notUsingInput), async () => {
    if (current.has('ShiftLeft')) {
      logger.primary('Alt+Shift+ArrowUp')
      await store.dispatch('editor/moveFirst')
    }
  })
  whenever(and(Alt_ArrowDown, notUsingInput), async () => {
    if (!current.has('ShiftLeft')) {
      logger.primary('Alt+ArrowDown')
      await store.dispatch('editor/moveNext')
    }
  })
  whenever(and(Alt_ArrowUp, notUsingInput), async () => {
    if (!current.has('ShiftLeft')) {
      logger.primary('Alt+ArrowDown')
      await store.dispatch('editor/movePrev')
    }
  })
  whenever(and(Ctrl, notUsingInput), async () => {
    ctrlKey.value = true
  })
  watch(ctrlKey, async (value) => {
    await store.dispatch('editor/ctrlKeyDown', value)
  })
  watch(Ctrl, (v) => {
    if (!v) {
      ctrlKey.value = false
    }
  })
  return {
    ctrlKey
  }
}
