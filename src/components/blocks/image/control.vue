<template>
  <el-tabs v-model="activeName" class="pl-2 pr-2">
    <el-tab-pane label="属性" name="attrs">
      <position-setting :config="config"></position-setting>
      <el-button type="primary" @click="dialog = true">选择图片</el-button>
      <el-button type="primary" @click="cropDialog = true" :disabled="!config.src">裁剪图片</el-button>
      <el-dialog :model-value="dialog" title="图库" center @close="dialog = false">
        <photo-lib v-if="dialog" @choose="chooseImage"></photo-lib>
      </el-dialog>
      <el-dialog :model-value="cropDialog" title="图片裁剪" center @close="cropDialog = false">
        <image-cropper v-if="cropDialog" :url="getExpression(config.src)" @choose="chooseCropResult"></image-cropper>
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
import useComponentCommon from '@/hooks/useComponentCommon'

export default {
  name: 'blocks-image-control',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const store = useStore()
    const activeName = ref('attrs')
    const {
      getExpression
    } = useComponentCommon(props.config)
    const addHistory = async () => {
      await store.dispatch('editor/addHistory')
    }
    const dialog = ref(false)
    const cropDialog = ref(false)
    const chooseImage = async (val) => {
      dialog.value = false
      await store.dispatch('editor/updateItem', {
        id: props.config.id,
        path: 'src',
        value: val
      })
    }
    const chooseCropResult = async ({ width, height, url }) => {
      cropDialog.value = false
      await store.dispatch('editor/updateItem', {
        id: props.config.id,
        path: 'src',
        value: url
      })
    }
    return {
      activeName,
      addHistory,
      dialog,
      chooseImage,
      cropDialog,
      chooseCropResult,
      getExpression
    }
  }
}
</script>

<style lang="scss" scoped></style>
