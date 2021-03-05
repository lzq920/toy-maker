<template>
  <div>
    <el-button type="primary" @click="dialog = true">选择视频</el-button>
    <el-dialog :model-value="dialog" center title="视频" @close="dialog = false">
      <video-lib v-if="dialog" @choose="chooseVideo"></video-lib>
    </el-dialog>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
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
      dragInfo,
      addHistory,
      dialog,
      chooseVideo
    }
  }
}
</script>

<style lang="scss" scoped></style>
