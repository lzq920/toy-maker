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
        <el-collapse-item name="src" title="资源">
          <el-button type="primary" @click="dialog = true">选择图片</el-button>
          <el-button :disabled="!config.src" type="primary" @click="cropDialog = true">裁剪图片</el-button>
          <el-dialog :model-value="dialog" center title="图库" @close="dialog = false">
            <photo-lib v-if="dialog" @choose="chooseImage"></photo-lib>
          </el-dialog>
          <el-dialog :model-value="cropDialog" center title="图片裁剪" @close="cropDialog = false">
            <image-cropper v-if="cropDialog" :url="getExpression(config.src)"
                           @choose="chooseCropResult"></image-cropper>
          </el-dialog>
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
    const chooseCropResult = async ({
      width,
      height,
      result
    }) => {
      cropDialog.value = false
      await store.dispatch('editor/updateItem', {
        id: props.config.id,
        path: 'src',
        value: result
      })
    }
    return {
      activeName,
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
