<template>
  <div @mousedown.stop.self="mouseDownEvent" ref="selection">
    <slot></slot>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'drag-selection',
  props: {
    autoClose: {
      type: Number,
      default: 1000,
      validator: function (val) {
        return val >= 0
      }
    }
  },
  emits: ['dragEnd'],
  setup (props, { emit }) {
    const store = useStore()
    const selection = ref(null)
    const mouseDownEvent = event => {
      store.dispatch('editor/clearActiveItem')
      const startX = event.clientX
      const startY = event.clientY
      const lineBox = document.createElement('div')
      lineBox.style.position = 'absolute'
      lineBox.style.border = '1px solid #409EFF'
      lineBox.style.backgroundColor = '#409EFF'
      lineBox.style.opacity = '0.3'
      lineBox.classList.add('line-box')
      document.body.appendChild(lineBox)
      selection.value.parentNode.classList.add('overflow-hidden')
      const mouseMoveEvent = e => {
        const disX = Math.abs(e.clientX - startX)
        const disY = Math.abs(e.clientY - startY)
        lineBox.style.left = `${Math.min(e.clientX, startX)}px`
        lineBox.style.top = `${Math.min(e.clientY, startY)}px`
        lineBox.style.height = `${disY}px`
        lineBox.style.width = `${disX}px`
      }
      document.addEventListener('mousemove', mouseMoveEvent)
      document.addEventListener(
        'mouseup',
        () => {
          const { left, top, width, height, right, bottom } = lineBox.getBoundingClientRect()
          document.removeEventListener('mousemove', mouseMoveEvent)
          selection.value.parentNode.classList.remove('overflow-hidden')
          if (width >= 10 && height >= 10) {
            emit('dragEnd', { left, top, width, height, right, bottom })
            setTimeout(() => {
              lineBox.remove()
            }, props.autoClose)
          } else {
            lineBox.remove()
          }
        },
        {
          once: true
        }
      )
    }
    return {
      mouseDownEvent,
      selection
    }
  }
}
</script>

<style></style>
