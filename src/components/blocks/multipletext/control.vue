<template>
  <el-tabs v-model="activeName" class="pl-2 pr-2">
    <el-tab-pane label="属性" name="attrs">
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
  name: 'blocks-multiple-text-control',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup () {
    const store = useStore()
    const activeName = ref('attrs')
    const addHistory = () => {
      store.dispatch('editor/addHistory')
    }
    return {
      activeName,
      addHistory
    }
  }
}
</script>

<style lang="scss" scoped></style>
