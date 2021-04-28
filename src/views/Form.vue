<template>
  <div class="w-full h-full" v-loading.lock="loading" element-loading-spinner="el-icon-loading" element-loading-text="表单数据加载中">
    <el-page-header @back="backHome" content="表单数据" class="mb-4 mt-4" title="返回">
    </el-page-header>
    <el-table :data="formList" border>
      <el-table-column type="expand" label="#">
        <template #default="props">
          <el-form label-position="left" inline v-for="(item,index) in props.row.formList" :key="index"
                   class="demo-table-expand">
            <el-form-item v-for="(v,k,i) in item" :key="i" :label="k">
              <span>{{ v }}</span>
            </el-form-item>
            <el-divider></el-divider>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="落地页名称" prop="pageConfig.title"></el-table-column>
      <el-table-column label="落地页描述" prop="pageConfig.description"></el-table-column>
      <el-table-column label="落地页关键字" prop="pageConfig.keywords"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import useTencentCloud from '@/hooks/useTencentCloud'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'FormList',
  setup () {
    const { formService } = useTencentCloud()
    const router = useRouter()
    const formList = ref([])
    const loading = ref(false)
    const getFormList = async () => {
      loading.value = true
      const response = await formService.getFormList()
      const { result } = response
      formList.value = result.map(item => {
        item.formList = item.formList.map(child => {
          delete child._id
          delete child.pageId
          return child
        })
        return item
      })
      loading.value = false
    }
    const backHome = () => {
      router.push({
        name: 'List'
      })
    }
    onMounted(async () => {
      await getFormList()
    })
    return {
      loading,
      formList,
      backHome
    }
  }
}
</script>

<style lang="scss" scoped>
.demo-table-expand {
  & > .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 25%;
  }
}
</style>
