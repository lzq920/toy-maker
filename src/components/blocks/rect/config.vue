<template>
  <div class="flex flex-wrap gap-2">
    <el-button
      type="primary"
      v-for="(item, index) in configList"
      :key="index"
      @click="handleClick(item)"
    >
      矩形
    </el-button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import BlocksRect from '../../../widgets/Rect'

export default {
  name: 'blocks-rect-config',
  setup () {
    const store = useStore()
    const configList = ref([
      {
        styles: {
          background: '#cccccc'
        }
      }
    ])
    const handleClick = item => {
      store.dispatch('editor/addItem', new BlocksRect(item))
    }
    return { configList, handleClick }
  }
}
</script>

<style></style>
