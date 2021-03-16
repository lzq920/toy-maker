<template>
  <div class="relative h-full">
    <el-tabs :tab-position="tabPosition" class="h-full">
      <el-tab-pane v-for="(item, index) in configList" :key="index">
        <template #label>
          <el-tooltip :content="item.tipText" placement="right">
            <i class="font-bold" :class="item.icon"></i>
          </el-tooltip>
        </template>
        <component :is="item.component"></component>
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
    const configList = reactive([
      {
        tipText: '文本',
        icon: 'el-icon-document',
        component: 'blocks-text-config'
      },
      {
        tipText: '单行文本',
        icon: 'el-icon-document',
        component: 'blocks-single-text-config'
      },
      {
        tipText: '多文本',
        icon: 'el-icon-document',
        component: 'blocks-multiple-text-config'
      },
      {
        tipText: '图片',
        icon: 'el-icon-picture-outline',
        component: 'blocks-image-config'
      },
      {
        tipText: '矩形框',
        icon: 'el-icon-receiving',
        component: 'blocks-rect-config'
      },
      {
        tipText: '视频',
        icon: 'el-icon-video-camera-solid',
        component: 'blocks-video-config'
      }
    ])
    return {
      tabPosition,
      configList
    }
  }
}
</script>

<style lang="scss" scoped></style>
