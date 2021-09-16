<template>
  <div class="flex flex-wrap gap-2">
    <el-button
      v-for="(item, index) in configList"
      :key="index"
      type="primary"
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
          backgroundColor: '#cccccc'
        }
      }
    ])
    const handleClick = item => {
      store.dispatch('editor/addItem', new BlocksRect(item))
    }
    return {
      configList,
      handleClick
    }
  }
}
</script>

<style></style>
