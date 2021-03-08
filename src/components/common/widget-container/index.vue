<template>
  <Vue3DraggableResizable
    :initW="dragInfo.width"
    :initH="dragInfo.height"
    v-model:x="dragInfo.left"
    v-model:y="dragInfo.top"
    v-model:w="dragInfo.width"
    v-model:h="dragInfo.height"
    v-model:active="isActive"
    :draggable="true"
    :resizable="true"
    :parent="false"
    :prevent-deactivated="true"
    @activated="activated"
    @deactivated="deactivated"
    @drag-start="dragStart"
    @resize-start="resizeStart"
    @dragging="dragging"
    @resizing="resizing"
    @drag-end="dragEnd"
    @resize-end="resizeEnd"
  >
    <component
      :key="widget.id"
      :is="widget.componentName"
      :config="widget"
    ></component>
  </Vue3DraggableResizable>
</template>
<script>
import { computed } from 'vue'
import useDraggableResizable from '../../../hooks/useDraggableResizable'

export default {
  name: 'widget-container',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  provide: {
    mode: 'pc'
  },
  setup (props) {
    const {
      activated,
      deactivated,
      dragStart,
      dragEnd,
      resizeStart,
      resizeEnd,
      dragging,
      resizing,
      isActive
    } = useDraggableResizable(props.item)
    const dragInfo = computed({
      get: () => {
        return props.item.rect
      },
      set: () => {}
    })
    const widget = computed({
      get: () => {
        return props.item
      },
      set: () => {}
    })
    return {
      widget,
      isActive,
      dragInfo,
      activated,
      deactivated,
      dragStart,
      dragEnd,
      resizeStart,
      resizeEnd,
      dragging,
      resizing
    }
  }
}
</script>

<style scoped lang="scss"></style>
