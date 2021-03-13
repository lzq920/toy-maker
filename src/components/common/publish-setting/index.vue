<template>
  <div>
    <el-form v-model="githubConfig" label-width="150px">
      <el-form-item label="Github账户名称">
        <el-input v-model="githubConfig.githubName" placeholder="请输入Github账户名称"></el-input>
      </el-form-item>
      <el-form-item label="Github仓库名称">
        <el-input v-model="githubConfig.githubRepo" placeholder="请输入Github仓库名称"></el-input>
      </el-form-item>
      <el-form-item label="Github授权Token">
        <el-input v-model="githubConfig.accessToken" placeholder="请输入Github授权Token"></el-input>
      </el-form-item>
      <el-form-item>
        <i class="el-icon-info"></i>发布配置仅保存在本地LocalStorage
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, watch } from 'vue'

export default {
  name: 'publish-setting',
  setup () {
    const githubConfig = reactive({
      githubName: localStorage.getItem('githubName'),
      githubRepo: localStorage.getItem('githubRepo'),
      accessToken: localStorage.getItem('accessToken')
    })
    watch(githubConfig, (val) => {
      localStorage.setItem('accessToken', val.accessToken)
      localStorage.setItem('githubName', val.githubName)
      localStorage.setItem('githubRepo', val.githubRepo)
    })
    return {
      githubConfig
    }
  }
}
</script>

<style scoped>

</style>
