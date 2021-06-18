<template>
  <el-tabs v-model="activeName" class="pl-2 pr-2">
    <el-tab-pane label="属性" name="attrs">
      <el-collapse>
        <el-collapse-item title="位置" name="position">
          <position-setting :config="config"></position-setting>
        </el-collapse-item>
        <el-collapse-item title="盒子模型" name="box-model">
          <box-model-setting :config="config"></box-model-setting>
        </el-collapse-item>
        <el-collapse-item title="链接配置" name="source">
          <el-input @change="chooseAudio"></el-input>
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
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'blocks-audio-control',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const store = useStore()
    const activeName = ref('attrs')
    const sourceUrl = computed({
      get: () => {
        return props.config.src
      },
      set: () => {

      }
    })
    const chooseAudio = async (val) => {
      await store.dispatch('editor/updateItem', {
        id: props.config.id,
        path: 'src',
        value: val.src
      })
    }
    return {
      activeName,
      chooseAudio,
      sourceUrl
    }
  }
}
</script>

<style lang="scss" scoped></style>
