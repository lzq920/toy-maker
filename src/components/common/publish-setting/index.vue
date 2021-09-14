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
        <el-input v-model="githubConfig.accessToken" placeholder="请输入Github授权Token" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <i class="el-icon-info"></i>发布配置仅保存在本地LocalStorage
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { onMounted, reactive, watch } from 'vue'
import useStorage from '@/hooks/useStorage'

export default {
  name: 'publish-setting',
  setup () {
    const { storage } = useStorage()
    const githubConfig = reactive({
      githubName: '',
      githubRepo: '',
      accessToken: ''
    })
    watch(githubConfig, (val) => {
      storage.setItem('accessToken', val.accessToken)
      storage.setItem('githubName', val.githubName)
      storage.setItem('githubRepo', val.githubRepo)
    })
    onMounted(() => {
      githubConfig.accessToken = storage.getItem('accessToken') || ''
      githubConfig.githubName = storage.getItem('githubName') || ''
      githubConfig.githubRepo = storage.getItem('githubRepo') || ''
    })
    return {
      githubConfig
    }
  }
}
</script>

<style scoped>

</style>
