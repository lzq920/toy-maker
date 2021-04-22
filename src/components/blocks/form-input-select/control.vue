<template>
  <el-form class="p-4" :model="settings" label-width="80px">
    <el-form-item label="字段名称">
      <el-input v-model="settings.name"></el-input>
    </el-form-item>
    <el-form-item label="是否必填">
      <el-switch v-model="settings.required"></el-switch>
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-switch v-model="settings.disabled"></el-switch>
    </el-form-item>
    <el-form-item label="是否只读">
      <el-switch v-model="settings.readonly"></el-switch>
    </el-form-item>
    <el-form-item label="是否多选">
      <el-switch v-model="settings.multiple"></el-switch>
    </el-form-item>
    <el-form-item label="选项配置">
      <el-table :data="settings.options" style="width: 100%">
        <el-table-column prop="label" label="键"></el-table-column>
        <el-table-column prop="value" label="值"></el-table-column>
        <el-table-column>
          <template #header>
            <el-popover
            placement="top"
            :width="300"
            v-model:visible="visible"
            >
            <el-form :data="options">
              <el-form-item label="键">
                <el-input v-model="options.label" placeholder="请输入选项的键"></el-input>
              </el-form-item>
              <el-form-item label="值">
                <el-input v-model="options.value" placeholder="请输入选项的值"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="addOptions">添加</el-button>
              </el-form-item>
            </el-form>
            <template #reference>
              <el-button @click="visible = true">新增</el-button>
            </template>
            </el-popover>
          </template>
          <template #default="scope">
            <i class="el-icon-delete" @click="handleDelete(scope.$index)"></i>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
  </el-form>
</template>

<script>
import { computed, reactive, ref } from 'vue'

export default {
  name: 'form-input-select-control',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const settings = computed({
      get: () => {
        return props.config
      },
      set: () => {

      }
    })
    const options = reactive({
      label: '',
      value: ''
    })
    const visible = ref(false)
    const addOptions = () => {
      settings.value.options.push({
        label: options.label,
        value: options.value
      })
      options.label = ''
      options.value = ''
    }
    const handleDelete = (index) => {
      settings.value.options.splice(index, 1)
    }
    return {
      settings,
      options,
      addOptions,
      handleDelete,
      visible
    }
  }
}
</script>

<style scoped>

</style>
