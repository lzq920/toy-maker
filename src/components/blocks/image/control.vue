<template>
  <div>
    <p>w: <input type="text" v-model.number.lazy="dragInfo.width" @change="addHistory"/></p>
    <p>h: <input type="text" v-model.number.lazy="dragInfo.height" @change="addHistory"/></p>
    <p>x: <input type="text" v-model.number.lazy="dragInfo.left" @change="addHistory"/></p>
    <p>y: <input type="text" v-model.number.lazy="dragInfo.top" @change="addHistory"/></p>
    <p>
      <el-button type="primary" @click="dialog = true">选择图片</el-button>
    </p>
    <el-dialog :model-value="dialog" title="图库" center @close="dialog = false">
      <photo-lib v-if="dialog" @choose="chooseImage"></photo-lib>
    </el-dialog>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

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
    const dragInfo = computed({
      get: () => {
        return props.config.rect
      },
      set: () => {

      }
    })
    const addHistory = async () => {
      await store.dispatch('editor/addHistory')
    }
    const dialog = ref(false)
    const chooseImage = async (val) => {
      dialog.value = false
      await store.dispatch('editor/updateItem', {
        id: props.config.id,
        path: 'src',
        value: val
      })
    }
    return {
      dragInfo,
      addHistory,
      dialog,
      chooseImage
    }
  }
}
</script>

<style lang="scss" scoped></style>
