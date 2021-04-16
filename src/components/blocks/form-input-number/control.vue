<template>
  <el-form class="p-4" :model="settings" label-width="80px">
    <el-form-item label="字段名称">
      <el-input v-model="settings.name"></el-input>
    </el-form-item>
    <el-form-item label="是否必填">
      <el-switch v-model="settings.required"></el-switch>
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-switch v-model="settings.disabled"></el-switch>
    </el-form-item>
    <el-form-item label="是否只读">
      <el-switch v-model="settings.readonly"></el-switch>
    </el-form-item>
    <el-form-item label="默认提示">
      <el-input v-model="settings.placeholder"></el-input>
    </el-form-item>
    <el-form-item label="最大值">
      <el-input v-model="settings.max"></el-input>
    </el-form-item>
    <el-form-item label="最小值">
      <el-input v-model="settings.min"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'form-input-number-control',
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
