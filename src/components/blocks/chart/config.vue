<template>
  <div class="flex flex-wrap gap-2">
    <el-button
      v-for="(item, index) in configList"
      :key="index"
      type="primary"
      @click="handleClick(item)"
    >
      {{ item.title }}
    </el-button
    >
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import BlocksChart from '../../../widgets/Chart'
import { cloneDeep } from 'lodash'

export default {
  name: 'blocks-chart-config',
  setup () {
    const store = useStore()
    const configList = ref([
      {
        title: '基础折线图',
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
      },
      {
        title: '基础平滑折线图',
        options: {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }]
        }
      },
      {
        title: '基础面积图',
        options: {
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
          }]
        }
      },
      {
        title: '折线图堆叠',
        options: {
          title: {
            text: '折线图堆叠'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '邮件营销',
              type: 'line',
              stack: '总量',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '联盟广告',
              type: 'line',
              stack: '总量',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '视频广告',
              type: 'line',
              stack: '总量',
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: '直接访问',
              type: 'line',
              stack: '总量',
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: '搜索引擎',
              type: 'line',
              stack: '总量',
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        }
      },
      {
        title: '基础柱状图',
        options: {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }]
        }
      },
      {
        title: '基础饼图',
        options: {
          title: {
            text: '某站点用户访问来源',
            subtext: '纯属虚构',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '50%',
              data: [
                {
                  value: 1048,
                  name: '搜索引擎'
                },
                {
                  value: 735,
                  name: '直接访问'
                },
                {
                  value: 580,
                  name: '邮件营销'
                },
                {
                  value: 484,
                  name: '联盟广告'
                },
                {
                  value: 300,
                  name: '视频广告'
                }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      }, {
        title: '南丁格尔图',
        options: {
          legend: {
            top: 'bottom'
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          series: [
            {
              name: '面积模式',
              type: 'pie',
              radius: [50, 250],
              center: ['50%', '50%'],
              roseType: 'area',
              itemStyle: {
                borderRadius: 8
              },
              data: [
                { value: 40, name: 'rose 1' },
                { value: 38, name: 'rose 2' },
                { value: 32, name: 'rose 3' },
                { value: 30, name: 'rose 4' },
                { value: 28, name: 'rose 5' },
                { value: 26, name: 'rose 6' },
                { value: 22, name: 'rose 7' },
                { value: 18, name: 'rose 8' }
              ]
            }
          ]
        }
      }, {
        title: '基础雷达图',
        options: {
          title: {
            text: '基础雷达图'
          },
          tooltip: {},
          legend: {
            data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
          },
          radar: {
            // shape: 'circle',
            name: {
              textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
              }
            },
            indicator: [
              {
                name: '销售（sales）',
                max: 6500
              },
              {
                name: '管理（Administration）',
                max: 16000
              },
              {
                name: '信息技术（Information Techology）',
                max: 30000
              },
              {
                name: '客服（Customer Support）',
                max: 38000
              },
              {
                name: '研发（Development）',
                max: 52000
              },
              {
                name: '市场（Marketing）',
                max: 25000
              }
            ]
          },
          series: [{
            name: '预算 vs 开销（Budget vs spending）',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [
              {
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: '预算分配（Allocated Budget）'
              },
              {
                value: [5000, 14000, 28000, 31000, 42000, 21000],
                name: '实际开销（Actual Spending）'
              }
            ]
          }]
        }
      }, {
        title: '基础漏斗图',
        options: {
          title: {
            text: '漏斗图',
            subtext: '纯属虚构'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}%'
          },
          toolbox: {
            feature: {
              dataView: { readOnly: false },
              restore: {},
              saveAsImage: {}
            }
          },
          legend: {
            data: ['展现', '点击', '访问', '咨询', '订单']
          },

          series: [
            {
              name: '漏斗图',
              type: 'funnel',
              left: '10%',
              top: 60,
              // x2: 80,
              bottom: 60,
              width: '80%',
              // height: {totalHeight} - y - y2,
              min: 0,
              max: 100,
              minSize: '0%',
              maxSize: '100%',
              sort: 'descending',
              gap: 2,
              label: {
                show: true,
                position: 'inside'
              },
              labelLine: {
                length: 10,
                lineStyle: {
                  width: 1,
                  type: 'solid'
                }
              },
              itemStyle: {
                borderColor: '#fff',
                borderWidth: 1
              },
              emphasis: {
                label: {
                  fontSize: 20
                }
              },
              data: [
                {
                  value: 60,
                  name: '访问'
                },
                {
                  value: 40,
                  name: '咨询'
                },
                {
                  value: 20,
                  name: '订单'
                },
                {
                  value: 80,
                  name: '点击'
                },
                {
                  value: 100,
                  name: '展现'
                }
              ]
            }
          ]
        }
      }
    ])
    const handleClick = (item) => {
      const chartItem = cloneDeep(item)
      delete chartItem.title
      store.dispatch('editor/addItem', new BlocksChart(chartItem))
    }
    return {
      configList,
      handleClick
    }
  }
}
</script>

<style></style>
