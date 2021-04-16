<template>
  <div class="flex flex-wrap gap-2">
    <el-button
      type="primary"
      v-for="(item, index) in configList"
      :key="index"
      @click="handleClick(item)"
    >文字
    </el-button
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
        innerText: '#{{defaultText}}',
        styles: {
          width: '100%',
          height: '100%',
          color: 'rgba(0,0,0,1)',
          fontSize: 20,
          backgroundColor: 'rgba(255,255,255,1)'
        }
      }, {
        innerText: '#{{defaultText}}',
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
      store.dispatch('editor/addItem', new BlocksText(item))
    }
    return {
      configList,
      handleClick
    }
  }
}
</script>

<style></style>
