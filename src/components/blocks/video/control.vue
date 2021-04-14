<template>
  <el-tabs v-model="activeName" class="pl-2 pr-2">
    <el-tab-pane label="属性" name="attrs">
      <el-button type="primary" @click="dialog = true">选择视频</el-button>
      <el-dialog :model-value="dialog" center title="视频" @close="dialog = false">
        <video-lib v-if="dialog" @choose="chooseVideo"></video-lib>
      </el-dialog>
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
import { useStore } from 'vuex'

export default {
  name: 'blocks-video-control',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const store = useStore()
    const activeName = ref('attrs')
    const dialog = ref(false)
    const chooseVideo = async (val) => {
      dialog.value = false
      await store.dispatch('editor/updateItem', {
        id: props.config.id,
        path: 'src',
        value: val.src
      })
      await store.dispatch('editor/updateItem', {
        id: props.config.id,
        path: 'poster',
        value: val.poster
      })
    }
    return {
      activeName,
      dialog,
      chooseVideo
    }
  }
}
</script>

<style lang="scss" scoped></style>
