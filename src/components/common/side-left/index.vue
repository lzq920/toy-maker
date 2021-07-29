<template>
  <div class="relative h-full">
    <el-tabs v-model="activeTab" :tab-position="tabPosition" class="h-full">
      <el-tab-pane name="list">
        <template #label>
          组件列表
        </template>
        <el-collapse accordion>
          <el-collapse-item v-for="item in configList" :key="item.component"
                            :name="item.component">
            <template #title>
              {{ item.tipText }}
            </template>
            <component :is="item.component"></component>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane name="tree">
        <template #label>
          组件树
        </template>
        <tree-wrapper></tree-wrapper>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'

export default {
  name: 'side-left',
  setup () {
    const tabPosition = ref('left')
    const activeTab = ref('list')
    const configList = reactive([
      {
        tipText: '文本组件',
        component: 'blocks-text-config'
      },
      {
        tipText: '单行文本组件',
        component: 'blocks-single-text-config'
      },
      {
        tipText: '多行文本组件',
        component: 'blocks-multiple-text-config'
      },
      {
        tipText: '图片组件',
        component: 'blocks-image-config'
      },
      {
        tipText: '二维码组件',
        component: 'blocks-qrcode-config'
      },
      {
        tipText: '矩形框组件',
        component: 'blocks-rect-config'
      },
      {
        tipText: '视频组件',
        component: 'blocks-video-config'
      },
      {
        tipText: '音频组件',
        component: 'blocks-audio-config'
      },
      {
        tipText: '表单组件',
        component: 'blocks-form-config'
      },
      {
        tipText: '图表组件',
        component: 'blocks-chart-config'
      },
      {
        tipText: '动画组件',
        component: 'blocks-lottie-config'
      }
    ])
    return {
      tabPosition,
      configList,
      activeTab
    }
  }
}
</script>

<style lang="scss" scoped></style>
