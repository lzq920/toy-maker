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
              <el-button type="primary" @click="toEdit(item.id)">编辑</el-button>
              <el-button type="info" @click="toPreview(item.id)">预览</el-button>
              <el-button type="warning" @click="toCopy(item)">复制</el-button>
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
import { ElMessage, ElMessageBox } from 'element-plus'
import { cloneDeep } from 'lodash'
import { generatorUUID } from '../utils'
export default {
  name: 'PageList',
  setup () {
    const pageStore = new PageService()
    const pageList = ref([])
    const router = useRouter()
    const loading = ref(false)
    const getPageList = async () => {
      try {
        loading.value = true
        pageList.value = await pageStore.getPages()
        loading.value = false
      } catch (error) {
        ElMessage.error(error.message)
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
    const toPreview = (id) => {
      window.open(`${location.origin}/preview.html?id=${id}`)
    }
    const toCopy = async (item) => {
      try {
        const newPage = cloneDeep(item)
        newPage.id = generatorUUID()
        await pageStore.addPage(newPage)
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
          await pageStore.removePage(id)
        } catch (error) {
          ElMessage.error(error.message)
        }
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
      toPreview,
      handleDelete,
      toCopy
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
