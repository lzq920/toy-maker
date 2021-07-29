<template>
  <div class="flex flex-wrap gap-2">
    <el-button
      v-for="(item, index) in configList"
      :key="index"
      type="primary"
      @click="handleClick(item)"
    >
      二维码
    </el-button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import BlocksQrCode from '../../../widgets/Qrcode'

export default {
  name: 'blocks-qrcode-config',
  setup () {
    const store = useStore()
    const configList = ref([
      {
        text: 'https://baidu.com'
      }
    ])
    const handleClick = (item) => {
      store.dispatch('editor/addItem', new BlocksQrCode(item))
    }
    return {
      configList,
      handleClick
    }
  }
}
</script>

<style></style>
