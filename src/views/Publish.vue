<template>
  <div class="w-full h-full flex justify-center items-center" v-loading.lock="loading" element-loading-spinner="el-icon-loading" element-loading-text="发布记录加载中">
    <publish-log :activities="activities"></publish-log>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import useTencentCloud from '@/hooks/useTencentCloud'

export default {
  name: 'Publish',
  setup () {
    const activities = ref([])
    const loading = ref(false)
    const { publishService } = useTencentCloud()
    const getPublishList = async () => {
      try {
        loading.value = true
        const { data } = await publishService.getPublishList()
        activities.value = data
        loading.value = false
      } catch (e) {
        loading.value = false
        ElMessage.error('出错啦')
      }
    }
    onMounted(() => {
      getPublishList()
    })
    return {
      activities
    }
  }
}
</script>

<style scoped>

</style>
