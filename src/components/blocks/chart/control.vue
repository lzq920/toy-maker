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
      <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
        点我配置
      </el-button>
      <el-drawer
        title="配置"
        :with-header="false"
        v-model="drawer"
        direction="rtl"
        destroy-on-close
        :show-close="false"
      >
        <monaco-editor :code="codeString" @change="onChange"></monaco-editor>
      </el-drawer>
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
    const drawer = ref(false)
    const codeString = ref('')
    watch(options, (val) => {
      codeString.value = JSON.stringify(val, null, '  ')
    }, {
      deep: true,
      immediate: true
    })
    const onChange = (val) => {
      store.dispatch('editor/updateItem', { id: props.config.id, path: 'options', value: val })
    }
    return {
      activeName,
      codeString,
      drawer,
      onChange,
      addHistory
    }
  }
}
</script>

<style lang="scss" scoped></style>
