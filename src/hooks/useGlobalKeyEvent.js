import { cloneDeep } from 'lodash'
import { onBeforeUnmount, onMounted } from 'vue'
import useUpdateComponent from '@/hooks/useUpdateComponent'
import { useStore } from 'vuex'
import { generatorUUID } from '@/utils'
import useEditorMethod from '@/hooks/useEditorMethod'
import { useRoute } from 'vue-router'
import useConsole from '@/hooks/useConsole'

export default function useGlobalKeyEvent () {
  const { mergeComponent } = useUpdateComponent()
  const { savePageData } = useEditorMethod()
  const store = useStore()
  const route = useRoute()
  const { logger } = useConsole()
  /**
   * @description 监听 Ctrl 按下
   * @param e 事件对象
   * @returns {Promise<void>}
   */
  const globalsKeyDown = async (e) => {
    await store.dispatch('editor/ctrlKeyDown', e.ctrlKey)
    if (e.target !== document.body) {
      return
    }
    if (e.ctrlKey && e.code === 'KeyZ') {
      logger.primary('Ctrl+Z')
      e.preventDefault()
      if (store.getters['editor/canUndo']) {
        await store.dispatch('editor/undoHistory')
      }
    }
    if (e.ctrlKey && e.code === 'KeyY') {
      logger.primary('Ctrl+Y')
      e.preventDefault()
      if (store.getters['editor/canRedo']) {
        await store.dispatch('editor/redoHistory')
      }
    }
    if (e.code === 'Delete' || e.code === 'Backspace') {
      logger.primary(e.code)
      e.preventDefault()
      if (store.state.editor.activeItems.length > 0) {
        await Promise.all(cloneDeep(store.state.editor.activeItems).map(item => {
          return store.dispatch('editor/removeItem', item)
        }))
      } else {
        logger.warning('没有活跃的组件')
      }
    }
    if (e.ctrlKey && e.code === 'KeyC') {
      logger.primary('Ctrl+C')
      e.preventDefault()
      await store.dispatch('editor/copyActiveItems')
    }
    if (e.ctrlKey && e.code === 'KeyV') {
      logger.primary('Ctrl+V')
      e.preventDefault()
      if (store.state.editor.copyData.length > 0) {
        await Promise.all(store.state.editor.copyData.map(item => {
          const target = Object.assign({}, item, { id: generatorUUID() })
          return store.dispatch('editor/addItem', mergeComponent(target))
        }))
      } else {
        logger.warning('没有要粘贴的组件')
      }
    }
    if (e.ctrlKey && e.code === 'KeyS') {
      logger.primary('Ctrl+S')
      e.preventDefault()
      await savePageData()
    }
    if (e.ctrlKey && e.code === 'KeyP') {
      logger.primary('Ctrl+P')
      e.preventDefault()
      const pageId = route.params.id
      if (pageId) {
        window.open(`${location.origin}/preview.html`)
      }
    }
    if (e.altKey && e.code === 'ArrowDown' && !e.shiftKey) {
      logger.primary('Alt+ArrowDown')
      e.preventDefault()
      await store.dispatch('editor/moveNext')
    }
    if (e.altKey && e.code === 'ArrowUp' && !e.shiftKey) {
      logger.primary('Alt+ArrowUp')
      e.preventDefault()
      await store.dispatch('editor/movePrev')
    }
    if (e.altKey && e.code === 'ArrowDown' && e.shiftKey) {
      logger.primary('Shift+Alt+ArrowDown')
      e.preventDefault()
      await store.dispatch('editor/moveLast')
    }
    if (e.altKey && e.code === 'ArrowUp' && e.shiftKey) {
      logger.primary('Shift+Alt+ArrowUp')
      e.preventDefault()
      await store.dispatch('editor/moveFirst')
    }
  }
  const globalsKeyUp = async () => {
    await store.dispatch('editor/ctrlKeyDown', false)
  }
  onMounted(() => {
    document.addEventListener('keydown', globalsKeyDown)
    document.addEventListener('keyup', globalsKeyUp)
  })
  onBeforeUnmount(() => {
    document.removeEventListener('keydown', globalsKeyDown)
    document.removeEventListener('keyup', globalsKeyUp)
  })
  return {
    globalsKeyDown
  }
}
