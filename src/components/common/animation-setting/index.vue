<template>
  <div class="mb-4">
    <el-select v-model="animations" multiple collapse-tags @change="onChange">
      <el-option-group v-for="(group,index) in animationOptions" :key="index" :label="group.label">
        <el-option v-for="item in group.children" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-option-group>
    </el-select>
  </div>
  <div class="mb-4">
    <el-button type="primary" @click="previewAnimate">预览动画</el-button>
  </div>
</template>
<script>
import { onMounted, reactive, ref } from 'vue'
import animationsList from '@/enum/animation'
import { runAnimation } from '@/utils'
import { useStore } from 'vuex'

export default {
  name: 'animation-setting',
  props: {
    config: {
      required: true,
      type: Object
    }
  },
  setup (props) {
    const store = useStore()
    const animations = ref([])
    const animationOptions = reactive(animationsList)
    const previewAnimate = async () => {
      await runAnimation(document.querySelector(`#${props.config.id}`), animations.value)
    }
    const onChange = async (value) => {
      await store.dispatch('editor/updateItem', {
        id: props.config.id,
        path: 'animations',
        value: value
      })
    }
    onMounted(() => {
      animations.value = props.config.animations
    })
    return {
      animations,
      animationOptions,
      previewAnimate,
      onChange
    }
  }
}
</script>
