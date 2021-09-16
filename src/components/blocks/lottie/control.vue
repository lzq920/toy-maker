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
        <el-collapse-item name="animation-config" title="动画配置">
          <el-form :model="lottieConfig" label-width="100px">
            <el-form-item label="循环播放">
              <el-switch v-model="lottieConfig.loop"></el-switch>
            </el-form-item>
            <el-form-item label="渲染方式">
              <el-radio-group v-model="lottieConfig.renderer">
                <el-radio label="svg">svg</el-radio>
                <el-radio label="canvas">canvas</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="自动播放">
              <el-switch v-model="lottieConfig.autoplay"></el-switch>
            </el-form-item>
            <el-form-item label="动画文件路径">
              <el-input v-model="lottieConfig.path"></el-input>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'blocks-lottie-control',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const store = useStore()
    const lottieConfig = computed({
      get: () => {
        return props.config.lottieConfig
      },
      set: () => {
      }
    })
    watch(lottieConfig, (newVal, oldVal) => {
      store.dispatch('editor/updateItem', {
        id: props.config.id,
        path: 'lottieConfig',
        value: newVal
      })
    }, {
      deep: true
    })
    const activeName = ref('attrs')
    return {
      activeName,
      lottieConfig
    }
  }
}
</script>

<style lang="scss" scoped></style>
