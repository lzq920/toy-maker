<template>
  <el-timeline class="p-10">
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      type="success"
      :timestamp="formDate(activity.createTime)">
      <el-link :href="activity.url">{{activity.url}}</el-link>
    </el-timeline-item>
  </el-timeline>
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
    const formDate = (val) => {
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
    }
    return {
      formDate
    }
  }
}
</script>

<style scoped>

</style>
