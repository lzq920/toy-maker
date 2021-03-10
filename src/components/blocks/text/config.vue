<template>
  <div>
    <el-button
      type="primary"
      v-for="(item, index) in configList"
      :key="index"
      @click="handleClick(item)"
      >文字</el-button
    >
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import BlocksText from '../../../widgets/Text'
export default {
  name: 'blocks-text-config',
  setup () {
    const store = useStore()
    const configList = ref([
      {
        innerText: '#{{id}}'
      }
    ])
    const handleClick = (item) => {
      store.dispatch('editor/addItem', new BlocksText(item))
    }
    return { configList, handleClick }
  }
}
</script>

<style></style>
