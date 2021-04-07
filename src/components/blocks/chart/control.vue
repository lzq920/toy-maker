<template>
  <el-tabs v-model="activeName" class="pl-2 pr-2">
    <el-tab-pane label="属性" name="attrs">

    </el-tab-pane>
    <el-tab-pane label="事件" name="events">
      <!--      <event-setting :config="config"></event-setting>-->
    </el-tab-pane>
    <el-tab-pane label="动画" name="animations">
      <!--      <animation-setting :config="config"></animation-setting>-->
    </el-tab-pane>
    <el-tab-pane label="配置" name="options">
      <div class="relative h-screen">
        <monaco-editor :code="codeString" @change="onChange"></monaco-editor>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'blocks-chart-control',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const store = useStore()
    const activeName = ref('attrs')
    const addHistory = async () => {
      await store.dispatch('editor/addHistory')
    }
    const options = computed(() => {
      return props.config.options
    })
    const codeString = ref('')
    watch(options, (val) => {
      codeString.value = JSON.stringify(val, null, '  ')
    }, {
      deep: true,
      immediate: true
    })
    const onChange = (val) => {
      console.log(val)
    }
    return {
      activeName,
      codeString,
      onChange,
      addHistory
    }
  }
}
</script>

<style lang="scss" scoped></style>
