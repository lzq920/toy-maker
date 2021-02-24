import { cloneDeep } from 'lodash'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import useUpdateComponent from '@/hooks/useUpdateComponent'
import { useStore } from 'vuex'
import { generatorUUID } from '@/utils'

export default function useGlobalKeyEvent () {
  const { mergeComponent } = useUpdateComponent()
  const ctrlKey = ref(false)
  const store = useStore()
  /**
   * @description 监听 Ctrl 按下
   * @param e 事件对象
   * @returns {Promise<void>}
   */
  const globalsKeyDown = async (e) => {
    ctrlKey.value = e.ctrlKey
    if (e.target !== document.body) {
      return
    }
    if (e.ctrlKey && e.code === 'KeyZ') {
      console.log('Ctrl+Z')
      e.preventDefault()
      if (store.getters['editor/canUndo']) {
        await store.dispatch('editor/undoHistory')
      }
    }
    if (e.ctrlKey && e.code === 'KeyY') {
      console.log('Ctrl+Y')
      e.preventDefault()
      if (store.getters['editor/canRedo']) {
        await store.dispatch('editor/redoHistory')
      }
    }
    if (e.ctrlKey && e.code === 'KeyD') {
      console.log('Ctrl+D')
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
      console.log('Ctrl+C')
      e.preventDefault()
      await store.dispatch('editor/copyActiveItems')
    }
    if (e.ctrlKey && e.code === 'KeyV') {
      console.log('Ctrl+V')
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
  }

  onMounted(() => {
    document.addEventListener('keydown', globalsKeyDown)
  })
  onBeforeUnmount(() => {
    document.removeEventListener('keydown', globalsKeyDown)
  })
  return {
    globalsKeyDown
  }
}
