<template>
  <div @mousedown.stop.self="mouseDownEvent">
    <slot></slot>
  </div>
</template>

<script>
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
  setup (props, { emit }) {
    const mouseDownEvent = event => {
      const startX = event.clientX
      const startY = event.clientY
      const lineBox = document.createElement('div')
      lineBox.style.position = 'absolute'
      lineBox.style.border = '1px solid #409EFF'
      lineBox.classList.add('line-box')
      document.body.appendChild(lineBox)
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
          const { left, top, width, height } = lineBox.getBoundingClientRect()
          document.removeEventListener('mousemove', mouseMoveEvent)
          if (width >= 10 && height >= 10) {
            emit('dragEnd', { left, top, width, height })
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
      mouseDownEvent
    }
  }
}
</script>

<style></style>
