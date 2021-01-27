<template>
  <div>
    <el-button
      type="primary"
      v-for="(item, index) in configList"
      :key="index"
      @click="handleClick(item)"
      >图片</el-button
    >
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import BlocksImage from '../../../widgets/Image'
export default {
  name: 'blocks-image-config',
  setup () {
    const store = useStore()
    const configList = ref([
      {
        src: 'https://via.placeholder.com/375x200'
      }
    ])
    const handleClick = (item) => {
      store.dispatch('editor/addItem', new BlocksImage(item))
    }
    return { configList, handleClick }
  }
}
</script>

<style></style>
