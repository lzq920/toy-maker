<template>
  <div class="flex flex-wrap gap-2">
    <el-button
      type="primary"
      v-for="(item, index) in configList"
      :key="index"
      @click="handleClick(item)"
    >
      动画
    </el-button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import BlocksLottie from '../../../widgets/Lottie'

export default {
  name: 'blocks-lottie-config',
  setup () {
    const store = useStore()
    const configList = ref([
      {
        lottieConfig: {
          loop: true,
          renderer: 'svg',
          autoplay: true,
          path: 'https://labs.nearpod.com/bodymovin/demo/markus/isometric/markus2.json'
        }
      }
    ])
    const handleClick = item => {
      store.dispatch('editor/addItem', new BlocksLottie(item))
    }
    return {
      configList,
      handleClick
    }
  }
}
</script>

<style></style>
