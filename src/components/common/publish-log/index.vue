<template>
  <el-timeline class="p-10">
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :timestamp="formDate(activity.createTime)">
      {{ activity.url }}
    </el-timeline-item>
  </el-timeline>
</template>

<script>
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
      return new Date(val).toLocaleDateString()
    }
    return {
      formDate
    }
  }
}
</script>

<style scoped>

</style>
