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
import { PublishService } from '@/service/publishService'
import { ElMessage } from 'element-plus'

export default {
  name: 'Publish',
  setup () {
    const activities = ref([])
    const publishStore = new PublishService()
    const getPublishList = async () => {
      try {
        activities.value = await publishStore.getPublish()
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
