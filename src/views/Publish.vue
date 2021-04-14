<template>
  <div class="w-full h-full flex justify-center items-center">
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
    const { publishService } = useTencentCloud()
    const getPublishList = async () => {
      try {
        const { data } = await publishService.getPublishList()
        activities.value = data
      } catch (e) {
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
