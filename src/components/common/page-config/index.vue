<template>
  <el-form v-model="pageConfig" label-width="80px">
    <el-form-item label="标题">
      <el-input v-model="pageConfig.title" placeholder="请输入页面标题" maxlength="20"
                show-word-limit></el-input>
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="pageConfig.description" placeholder="请输入页面描述" maxlength="50"
                show-word-limit></el-input>
    </el-form-item>
    <el-form-item label="关键词">
      <el-input v-model="pageConfig.keywords" placeholder="请输入页面关键词" maxlength="50"
                show-word-limit></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, watch } from 'vue'

export default {
  name: 'page-config',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  emits: ['change'],
  setup (props, { emit }) {
    const pageConfig = reactive(props.config)
    watch(pageConfig, (value, oldValue) => {
      emit('change', value)
    }, {
      deep: true
    })
    return {
      pageConfig
    }
  }
}
</script>

<style scoped>

</style>
