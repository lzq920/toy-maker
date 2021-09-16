<template>
  <el-tabs v-model="activeName" class="pl-2 pr-2">
    <el-tab-pane label="属性" name="attrs">
      <el-collapse>
        <el-collapse-item name="position" title="位置">
          <position-setting :config="config"></position-setting>
        </el-collapse-item>
        <el-collapse-item name="box-model" title="盒子模型">
          <box-model-setting :config="config"></box-model-setting>
        </el-collapse-item>
        <el-collapse-item name="style-setting" title="样式设置">
          <style-setting :config="config"></style-setting>
        </el-collapse-item>
      </el-collapse>
    </el-tab-pane>
    <el-tab-pane label="事件" name="events">
      <event-setting :config="config"></event-setting>
    </el-tab-pane>
    <el-tab-pane label="动画" name="animations">
      <animation-setting :config="config"></animation-setting>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'blocks-rect-control',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup () {
    const activeName = ref('attrs')
    return {
      activeName
    }
  }
}
</script>

<style lang="scss" scoped></style>
