<template>
  <div class="flex flex-wrap gap-2">
    <el-button
      v-for="(item, index) in configList"
      :key="index"
      type="primary"
      @click="handleClick(item)"
    >音频
    </el-button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import BlocksAudio from '../../../widgets/Audio'

export default {
  name: 'blocks-audio-config',
  setup () {
    const store = useStore()
    const configList = ref([
      {
        src: 'https://www.runoob.com/try/demo_source/horse.ogg'
      }
    ])
    const handleClick = (item) => {
      store.dispatch('editor/addItem', new BlocksAudio(item))
    }
    return {
      configList,
      handleClick
    }
  }
}
</script>

<style></style>
