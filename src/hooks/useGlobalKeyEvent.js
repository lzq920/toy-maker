import { cloneDeep } from 'lodash'
import { onBeforeUnmount, onMounted } from 'vue'
import useUpdateComponent from '@/hooks/useUpdateComponent'
import { useStore } from 'vuex'
import { generatorUUID } from '@/utils'
import useEditorMethod from '@/hooks/useEditorMethod'
import { useRoute } from 'vue-router'

export default function useGlobalKeyEvent () {
  const { mergeComponent } = useUpdateComponent()
  const { savePageData } = useEditorMethod()
  const store = useStore()
  const route = useRoute()
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
      console.log('Ctrl+Z', '撤销')
      e.preventDefault()
      if (store.getters['editor/canUndo']) {
        await store.dispatch('editor/undoHistory')
      }
    }
    if (e.ctrlKey && e.code === 'KeyY') {
      console.log('Ctrl+Y', '重做')
      e.preventDefault()
      if (store.getters['editor/canRedo']) {
        await store.dispatch('editor/redoHistory')
      }
    }
    if (e.ctrlKey && e.code === 'KeyD') {
      console.log('Ctrl+D', '删除')
      e.preventDefault()
      const removeQueue = cloneDeep(store.state.editor.activeItems).map(item => {
        return store.dispatch('editor/removeItem', item)
      })
      if (removeQueue.length) {
        await Promise.all(removeQueue)
      } else {
        console.log('没有活跃的组件')
      }
    }
    if (e.ctrlKey && e.code === 'KeyC') {
      console.log('Ctrl+C', '复制')
      e.preventDefault()
      await store.dispatch('editor/copyActiveItems')
    }
    if (e.ctrlKey && e.code === 'KeyV') {
      console.log('Ctrl+V', '粘贴')
      e.preventDefault()
      const addQueue = store.state.editor.copyData.map(item => {
        const target = Object.assign({}, item, { id: `blocks-${generatorUUID()}` })
        return store.dispatch('editor/addItem', mergeComponent(target))
      })
      if (addQueue.length) {
        await Promise.all(addQueue)
      } else {
        console.log('没有要粘贴的组件')
      }
    }
    if (e.ctrlKey && e.code === 'KeyS') {
      console.log('Ctrl+S', '保存')
      e.preventDefault()
      await savePageData()
    }
    if (e.ctrlKey && e.code === 'KeyP') {
      console.log('Ctrl+P', '预览')
      e.preventDefault()
      const pageId = route.params.id
      if (pageId) {
        window.open(`${location.origin}/preview.html?id=${pageId}`)
      }
    }
    if (e.altKey && e.code === 'ArrowDown' && !e.shiftKey) {
      console.log('Alt+ArrowDown', '下移')
      e.preventDefault()
      await store.dispatch('editor/moveNext')
    }
    if (e.altKey && e.code === 'ArrowUp' && !e.shiftKey) {
      console.log('Alt+ArrowUp', '上移')
      e.preventDefault()
      await store.dispatch('editor/movePrev')
    }
    if (e.altKey && e.code === 'ArrowDown' && e.shiftKey) {
      console.log('Shift+Alt+ArrowDown', '置底')
      e.preventDefault()
      await store.dispatch('editor/moveLast')
    }
    if (e.altKey && e.code === 'ArrowUp' && e.shiftKey) {
      console.log('Shift+Alt+ArrowUp', '置顶')
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
