<template>
  <div class="help-toolbar fixed z-10 flex justify-center items-center">
    <i class="el-icon-question text-2xl cursor-pointer" @click="showHelp(true)"></i>
  </div>
  <el-dialog v-model="dialog" title="帮助中心" center>
    <div class="grid grid-cols-3">
      <div><code>Ctrl Z</code> 撤销</div>
      <div><code>Ctrl Y</code> 重做</div>
      <div><code>Ctrl D</code> 删除</div>
      <div><code>Ctrl C</code> 复制</div>
      <div><code>Ctrl V</code> 粘贴</div>
      <div><code>Ctrl S</code> 保存</div>
      <div><code>Ctrl P</code> 预览</div>
      <div><code>Alt ArrowDown</code> 图层下移</div>
      <div><code>Alt ArrowUp</code> 图层上移</div>
      <div><code>Shift Alt ArrowDown</code> 图层置底</div>
      <div><code>Shift Alt ArrowUp</code> 图层置顶</div>
    </div>
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

<style scoped>
.help-toolbar {
  width: 36px;
  height: 36px;
  right: 310px;
  top: 60px;
  background: #fff;
}
</style>
