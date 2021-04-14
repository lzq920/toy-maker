<template>
  <el-container class="w-screen h-screen">
    <el-scrollbar>
      <el-header class="bg-gray-90 flex justify-end items-center shadow-sm z-10">
        <el-image style="height:45px;width:146px;" :src="require('../assets/logo.png')" class="rounded-2xl border mr-auto shadow-sm"></el-image>
        <el-button type="primary" @click="toCreate">新增</el-button>
        <el-button type="danger" @click="logout">退出登录</el-button>
      </el-header>
      <el-main class="bg-white w-screen">
        <el-empty v-if="pageList.length===0" description="暂无数据"></el-empty>
        <div class="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-4">
          <div v-for="item in pageList" :key="item._id"
               class="bg-white rounded-md flex flex-col border border-blue-700 p-2 overflow-hidden">
            <img :src="item.pageConfig.cover" alt="cover" class="border">
            <div class="flex flex-col mt-4">
              <div class="font-bold">{{ item.pageConfig.title || '未命名落地页' }}</div>
              <div class="flex justify-between items-center mt-2">
                <el-button size="mini" type="primary" @click="toEdit(item._id)" icon="el-icon-edit"></el-button>
                <el-button size="mini" type="info" @click="toPreview(item._id)" icon="el-icon-view"></el-button>
                <el-button size="mini" type="warning" @click="toCopy(item)" icon="el-icon-document-copy"></el-button>
                <el-button size="mini" type="danger" @click="handleDelete(item._id)" icon="el-icon-delete"></el-button>
              </div>
            </div>
          </div>
        </div>
      </el-main>
    </el-scrollbar>
    <el-drawer
      title="发布记录"
      v-model="publishLogDrawer"
      direction="rtl"
      destroy-on-close>
      <publish-log :activities="activities"></publish-log>
    </el-drawer>
  </el-container>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { cloneDeep } from 'lodash'
import useTencentCloud from '@/hooks/useTencentCloud'

export default {
  name: 'PageList',
  setup () {
    const { pageService, signOut, userInfo, publishService } = useTencentCloud()
    const pageList = ref([])
    const router = useRouter()
    const loading = ref(false)
    const publishLogDrawer = ref(false)
    const getPageList = async () => {
      try {
        loading.value = true
        const { data } = await pageService.getPageList()
        pageList.value = data
        loading.value = false
      } catch (error) {
        loading.value = false
      }
    }
    const toEdit = (id) => {
      router.push({
        name: 'Edit',
        params: { id }
      })
    }
    const toCreate = () => {
      router.push({
        name: 'Create'
      })
    }
    const toPreview = async (id) => {
      await getPublishLog(id)
    }
    const toCopy = async (item) => {
      try {
        const {
          _id,
          _openid,
          ...items
        } = item
        const newPage = cloneDeep(items)
        await pageService.addPage(newPage)
        await getPageList()
      } catch (error) {
        ElMessage.error(error.message)
      }
    }
    const handleDelete = async (id) => {
      ElMessageBox.confirm('正在删除该落地页，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(async () => {
        try {
          await pageService.removePageById(id)
        } catch (error) {
          ElMessage.error(error.message)
        }
        await getPageList()
      })
    }
    const logout = async () => {
      await signOut()
      ElMessage.success('退出登录')
      await router.replace({
        name: 'Signup'
      })
    }
    const activities = ref([])
    const getPublishLog = async (id) => {
      try {
        const { data } = await publishService.getPublishListByPage(id)
        activities.value = data
        publishLogDrawer.value = true
      } catch (e) {
        ElMessage.error('出错啦')
      }
    }
    onMounted(async () => {
      await getPageList()
    })
    return {
      pageList,
      loading,
      publishLogDrawer,
      activities,
      toEdit,
      toCreate,
      toPreview,
      handleDelete,
      toCopy,
      logout,
      userInfo
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
