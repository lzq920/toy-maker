<template>
  <div class="grid grid-cols-2 gap-1">
    <el-input v-model="left" @change="(val)=>handleChange(val,'left')">
      <template #prefix>
        <span class="font-mono">X</span>
      </template>
      <template #suffix>
        <span>px</span>
      </template>
    </el-input>
    <el-input v-model="top" @change="(val)=>handleChange(val,'top')">
      <template #prefix>
        <span class="font-mono">Y</span>
      </template>
      <template #suffix>
        <span>px</span>
      </template>
    </el-input>
    <el-input v-model="width" @change="(val)=>handleChange(val,'width')">
      <template #prefix>
        <span class="font-mono">W</span>
      </template>
      <template #suffix>
        <span>px</span>
      </template>
    </el-input>
    <el-input v-model="height" @change="(val)=>handleChange(val,'height')">
      <template #prefix>
        <span class="font-mono">H</span>
      </template>
      <template #suffix>
        <span>px</span>
      </template>
    </el-input>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'position-setting',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const store = useStore()
    const width = ref(0)
    const height = ref(0)
    const left = ref(0)
    const top = ref(0)
    const rect = computed(() => props.config.rect)
    const handleChange = async (value, position) => {
      await store.dispatch('editor/updateItem', {
        id: props.config.id,
        path: `rect.${position}`,
        value: Number(value)
      })
    }
    watch(rect, (val) => {
      width.value = val.width
      height.value = val.height
      top.value = val.top
      left.value = val.left
    }, {
      deep: true,
      immediate: true
    })
    return {
      width,
      height,
      left,
      top,
      handleChange
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
