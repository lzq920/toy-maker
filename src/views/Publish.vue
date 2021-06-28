<template>
  <div class="w-full h-full flex justify-center items-center" v-loading.lock="loading"
       element-loading-spinner="el-icon-loading" element-loading-text="获取远程发布源列表">
    <el-scrollbar height="100vh">
      <div class="w-screen">
        <el-steps :active="activeIndex" simple>
          <el-step title="站点尚未构建"></el-step>
          <el-step title="已请求构建"></el-step>
          <el-step title="正在构建中"></el-step>
          <el-step title="构建过程中发生错误"></el-step>
          <el-step title="站点已构建"></el-step>
        </el-steps>
      </div>
      <el-table class="mt-4" :data="activities" border>
        <el-table-column label="哈希" prop="sha"></el-table-column>
        <el-table-column label="类型" prop="type"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="发布时间">
          <template #default="scope">
            {{ formatDate(scope.row.name) }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="danger" @click="handleClick(scope.row)">删除</el-button>
            <el-button type="primary" @click="handleRedirect(scope.row)">访问</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
  </div>
</template>

<script>
import { onMounted, reactive, ref, computed } from 'vue'
import useStorage from '@/hooks/useStorage'
import { Octokit } from '@octokit/rest'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'

export default {
  name: 'Publish',
  setup () {
    const activities = ref([])
    const githubPage = ref({})
    const loading = ref(true)
    const enumStatus = reactive({
      null: 1,
      queued: 2,
      building: 3,
      errored: 4,
      built: 5
    })
    const activeIndex = computed(() => {
      return enumStatus[githubPage.value.status]
    })
    const { storage } = useStorage()
    const accessToken = storage.getItem('accessToken')
    const githubName = storage.getItem('githubName')
    const githubRepo = storage.getItem('githubRepo')
    const octokit = new Octokit({
      auth: accessToken
    })
    const formatDate = (str) => {
      return dayjs(Number(str.slice(5))).format('YYYY-MM-DD HH:mm:ss')
    }
    const getFileList = async () => {
      loading.value = true
      if (!accessToken || !githubName || !githubRepo) {
        loading.value = false
        return ElMessage.error('请在落地页编辑页面完成发布配置信息')
      }
      const { data } = await octokit.repos.getContent({
        repo: githubRepo,
        owner: githubName,
        path: ''
      })
      activities.value = data
      loading.value = false
    }
    const getGithubPage = async () => {
      if (!accessToken || !githubName || !githubRepo) {
        loading.value = false
        return ElMessage.error('请在落地页编辑页面完成发布配置信息')
      }
      const { data } = await octokit.repos.getPages({
        repo: githubRepo,
        owner: githubName
      })
      githubPage.value = data
    }
    const handleClick = async (row) => {
      const { data } = await octokit.repos.getContent({
        repo: githubRepo,
        owner: githubName,
        path: row.path
      })
      for (const datum of data) {
        await octokit.repos.deleteFile({
          repo: githubRepo,
          owner: githubName,
          path: datum.path,
          message: `delete ${datum.name}`,
          sha: datum.sha
        })
      }
      ElMessage.success('删除成功')
      await getFileList()
    }
    const handleRedirect = (row) => {
      window.open(githubPage.value.html_url + row.path)
    }
    onMounted(() => {
      getGithubPage()
      getFileList()
    })
    return {
      activities,
      githubPage,
      activeIndex,
      loading,
      formatDate,
      handleClick,
      handleRedirect
    }
  }
}
</script>

<style scoped>

</style>
