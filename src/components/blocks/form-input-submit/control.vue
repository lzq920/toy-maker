<template>
  <el-form class="p-4" :model="settings" label-width="80px">
    <el-form-item label="按钮文本">
      <el-input v-model="settings.innerText"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'form-input-submit-control',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const settings = computed({
      get: () => {
        return props.config
      },
      set: () => {

      }
    })
    return {
      settings
    }
  }
}
</script>

<style scoped>

</style>
