<template>
  <div class="publish">
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :timestamp="formDate(activity.createTime)">
        {{ activity.url }}
      </el-timeline-item>
    </el-timeline>
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
    const formDate = (val) => {
      return new Date(val).toLocaleDateString()
    }
    onMounted(() => {
      getPublishList()
    })
    return {
      activities,
      formDate
    }
  }
}
</script>

<style scoped>
.publish {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
</style>
