<template>
  <div class="help-toolbar fixed z-10 flex justify-center items-center">
    <i class="el-icon-question text-2xl cursor-pointer" @click="showHelp(true)"></i>
  </div>
  <el-dialog v-model="dialog" title="帮助中心" center>
    <div class="grid grid-cols-3 gap-4">
      <div class="flex items-center gap-2">撤销<code>Ctrl</code><code>Z</code></div>
      <div class="flex items-center gap-2">重做<code>Ctrl</code><code>Y</code></div>
      <div class="flex items-center gap-2">删除<code>Backspace</code>OR<code>Delete</code></div>
      <div class="flex items-center gap-2">复制<code>Ctrl</code><code>C</code></div>
      <div class="flex items-center gap-2">粘贴<code>Ctrl</code><code>V</code></div>
      <div class="flex items-center gap-2">保存<code>Ctrl</code><code>S</code></div>
      <div class="flex items-center gap-2">预览<code>Ctrl</code><code>P</code></div>
      <div class="flex items-center gap-2">图层下移<code>Alt</code><code>ArrowDown</code></div>
      <div class="flex items-center gap-2">图层上移<code>Alt</code><code>ArrowUp</code></div>
      <div class="flex items-center gap-2">图层置底<code>Shift</code><code>Alt</code><code>ArrowDown</code></div>
      <div class="flex items-center gap-2">图层置顶<code>Shift</code><code>Alt</code><code>ArrowUp</code></div>
    </div>
    <template #footer>
      <el-button type="primary" @click="showHelp(false)">我知道了</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'help-toolbar',
  setup () {
    const dialog = ref(false)
    const showHelp = (value) => {
      dialog.value = value
    }
    return { showHelp, dialog }
  }
}
</script>

<style lang="scss" scoped>
.help-toolbar {
  width: 36px;
  height: 36px;
  right: 310px;
  top: 60px;
  background: #fff;
}

code {
  border: 1px solid #dddddd;
  padding: 5px;
  min-width: 40px;
  text-align: center;
  border-radius: 4px;
  background: #cccccc;
}
</style>
