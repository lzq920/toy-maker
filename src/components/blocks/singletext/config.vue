<template>
  <div class="flex flex-wrap gap-2">
    <el-button
      v-for="(item, index) in configList"
      :key="index"
      type="primary"
      @click="handleClick(item)"
    >
      单行文字
    </el-button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import BlocksSingleTextText from '../../../widgets/SingleText'

export default {
  name: 'blocks-single-text-config',
  setup () {
    const store = useStore()
    const configList = ref([
      {
        innerText: '#{{defaultSingleText}}',
        styles: {
          width: '100%',
          height: '100%',
          color: 'rgba(0,0,0,1)',
          fontSize: 20,
          backgroundColor: 'rgba(255,255,255,1)'
        }
      }, {
        innerText: '#{{defaultSingleText}}',
        styles: {
          width: '100%',
          height: '100%',
          color: 'rgba(0,0,0,1)',
          fontSize: 20,
          backgroundColor: 'rgba(255,255,255,1)',
          borderRadius: 10
        }
      }
    ])
    const handleClick = (item) => {
      store.dispatch('editor/addItem', new BlocksSingleTextText(item))
    }
    return {
      configList,
      handleClick
    }
  }
}
</script>

<style></style>
