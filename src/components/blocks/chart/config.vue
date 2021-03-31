<template>
  <div>
    <el-button
      v-for="(item, index) in configList"
      :key="index"
      type="primary"
      @click="handleClick(item)"
    >基础折线图
    </el-button
    >
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import BlocksChart from '../../../widgets/Chart'

export default {
  name: 'blocks-chart-config',
  setup () {
    const store = useStore()
    const configList = ref([
      {
        options: {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }]
        }
      }
    ])
    const handleClick = (item) => {
      store.dispatch('editor/addItem', new BlocksChart(item))
    }
    return {
      configList,
      handleClick
    }
  }
}
</script>

<style></style>
