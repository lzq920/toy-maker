<template>
  <div class="flex flex-wrap gap-2">
    <el-button
      v-for="(item, index) in configList"
      :key="index"
      type="primary"
      @click="handleClick(item)"
    >
      多行文字
    </el-button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import BlocksMultipleText from '@/widgets/MultipleText'

export default {
  name: 'blocks-multiple-text-config',
  setup () {
    const store = useStore()
    const configList = ref([
      {
        innerText: '#{{defaultMultipleText}}',
        styles: {
          color: 'rgba(0,0,0,1)',
          fontSize: 20,
          backgroundColor: 'rgba(255,255,255,1)'
        },
        rect: {
          height: 60
        },
        lineClamp: 2
      }, {
        innerText: '#{{defaultMultipleText}}',
        rect: {
          height: 88
        },
        styles: {
          color: 'rgba(0,0,0,1)',
          fontSize: 20,
          backgroundColor: 'rgba(255,255,255,1)',
          borderRadius: 10
        },
        lineClamp: 3
      }
    ])
    const handleClick = (item) => {
      store.dispatch('editor/addItem', new BlocksMultipleText(item))
    }
    return {
      configList,
      handleClick
    }
  }
}
</script>

<style></style>
