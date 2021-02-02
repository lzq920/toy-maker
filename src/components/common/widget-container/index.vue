<template>
  <Vue3DraggableResizable
    :initW="dragInfo.width"
    :initH="dragInfo.height"
    v-model:x="dragInfo.left"
    v-model:y="dragInfo.top"
    v-model:w="dragInfo.width"
    v-model:h="dragInfo.height"
    :active="isActive"
    :draggable="true"
    :resizable="true"
    :parent="true"
    @activated="activated"
    @drag-start="dragStart"
    @resize-start="resizeStart"
    @dragging="dragging"
    @resizing="resizing"
    @drag-end="dragEnd"
    @resize-end="resizeEnd"
    @click.right.stop.prevent="deactivated"
  >
    <component
      :key="widget.id"
      :is="widget.componentName"
      :config="widget"
    ></component>
  </Vue3DraggableResizable>
</template>
<script>
import useDraggableResizable from '../../../hooks/useDraggableResizable'
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
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
      resizing
    } = useDraggableResizable(props.item)
    const store = useStore()
    const isActive = computed(() => {
      return store.getters['editor/activeItemIds'].includes(props.item.id)
    })
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
    onMounted(() => {})
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
