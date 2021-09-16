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
      </el-collapse>
    </el-tab-pane>
    <el-tab-pane label="事件" name="events">
      <!--      <event-setting :config="config"></event-setting>-->
    </el-tab-pane>
    <el-tab-pane label="动画" name="animations">
      <!--      <animation-setting :config="config"></animation-setting>-->
    </el-tab-pane>
    <el-tab-pane label="配置" name="options">
      <el-button style="margin-left: 16px;" type="primary" @click="drawer = true">
        点我配置
      </el-button>
      <el-drawer
        v-model="drawer"
        :show-close="false"
        :with-header="false"
        destroy-on-close
        direction="rtl"
        title="配置"
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
      store.dispatch('editor/updateItem', {
        id: props.config.id,
        path: 'options',
        value: val
      })
    }
    return {
      activeName,
      codeString,
      drawer,
      onChange
    }
  }
}
</script>

<style lang="scss" scoped></style>
