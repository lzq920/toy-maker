<template>
  <el-container class="w-screen h-screen">
    <el-header class="bg-gray-90 flex justify-end items-center shadow-sm z-10">
      <el-button type="primary" @click="toCreate">新增</el-button>
    </el-header>
    <el-main class="bg-white max-h-full">
      <el-empty v-if="pageList.length===0" description="暂无数据"></el-empty>
      <div class="grid grid-cols-4 gap-4">
        <div v-for="item in pageList" :key="item.id"
             class="bg-white rounded-md flex flex-col border-2 border-blue-700 p-4 overflow-hidden">
          <img :src="item.pageConfig.cover" alt="cover" class="border-2">
          <div class="flex flex-col mt-4">
            <div class="font-bold">{{ item.pageConfig.title || '未命名落地页' }}</div>
            <div class="flex justify-between items-center">
              <span>{{ new Date().toLocaleDateString() }}</span>
              <el-button type="primary" @click="toEdit(item.id)">编辑</el-button>
              <el-button type="danger" @click="handleDelete(item.id)">刪除</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { PageService } from '@/service/pageService'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
export default {
  name: 'PageList',
  setup () {
    const pageStore = new PageService()
    const pageList = ref([])
    const router = useRouter()
    const loading = ref(false)
    const getPageList = async () => {
      loading.value = true
      pageList.value = await pageStore.getPages()
      loading.value = false
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
    const handleDelete = async (id) => {
      ElMessageBox.confirm('正在删除该落地页，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(async () => {
        await pageStore.removePage(id)
        await getPageList()
      })
    }
    onMounted(async () => {
      await getPageList()
    })
    return {
      pageList,
      loading,
      toEdit,
      toCreate,
      handleDelete
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
