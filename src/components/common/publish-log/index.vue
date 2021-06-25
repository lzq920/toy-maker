<template>
  <el-scrollbar>
    <el-timeline class="p-10">
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        type="success">
        <el-card>
          <div class="flex">
            <div class="flex-auto">
              <h3>标题：{{ activity.title || '未命名标题' }}</h3>
              <p>描述：{{ activity.title || '未填写' }}</p>
              <p>关键词：{{ activity.keywords || '未填写' }}</p>
              <p>发布于：{{ formatTime(activity.createTime) }}</p>
            </div>
            <div>
              <el-link :href="activity.url" target="_blank">
                <el-image :src="`https://vercel-runtimes-api.vercel.app/api/qrcode?url=${activity.url}`"></el-image>
              </el-link>
            </div>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </el-scrollbar>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'publish-log',
  props: {
    activities: {
      type: Array,
      required: true
    }
  },
  setup () {
    const formatDate = (val) => {
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
    }
    const formatTime = (val) => {
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
    }
    return {
      formatDate,
      formatTime
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
