import { useStore } from 'vuex'
export default function useDraggableResizable (params) {
  const store = useStore()
  const activated = () => {
    store.dispatch('editor/addActiveItem', params)
  }
  const deactivated = () => {
  }
  const dragStart = (str) => {
    console.log(str)
  }
  const resizeStart = (str) => {
    console.log(str)
  }
  const dragging = (str) => {
    console.log(str)
  }
  const resizing = (str) => {
    console.log(str)
  }
  const dragEnd = (str) => {
    console.log(str)
  }
  const resizeEnd = (str) => {
    console.log(str)
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
