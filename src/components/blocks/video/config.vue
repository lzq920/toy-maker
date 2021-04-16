<template>
  <div class="flex flex-wrap gap-2">
    <el-button
      v-for="(item, index) in configList"
      :key="index"
      type="primary"
      @click="handleClick(item)"
    >视频
    </el-button
    >
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import BlocksVideo from '../../../widgets/Video'

export default {
  name: 'blocks-video-config',
  setup () {
    const store = useStore()
    const configList = ref([
      {
        src: '',
        poster: ''
      }
    ])
    const handleClick = (item) => {
      store.dispatch('editor/addItem', new BlocksVideo(item))
    }
    return {
      configList,
      handleClick
    }
  }
}
</script>

<style></style>
