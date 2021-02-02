import { useStore } from 'vuex'
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
  const dragEnd = () => {
  }
  const resizeEnd = () => {
  }
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
