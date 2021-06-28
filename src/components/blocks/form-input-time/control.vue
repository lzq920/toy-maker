<template>
  <el-form class="p-4" :model="settings" label-width="80px">
    <el-form-item label="字段名称">
      <el-input v-model="settings.name"></el-input>
    </el-form-item>
    <el-form-item label="时间类型">
      <el-select v-model="settings.type">
        <el-option v-for="item in dateType" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
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
    <el-form-item label="默认提示">
      <el-input v-model="settings.placeholder"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import { computed, ref } from 'vue'

export default {
  name: 'form-input-time-control',
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
    const dateType = ref([
      {
        label: '输入日期',
        value: 'date'
      },
      {
        label: '输入日期和时间',
        value: 'datetime-local'
      },
      {
        label: '输入年和月',
        value: 'month'
      },
      {
        label: '输入时间',
        value: 'time'
      },
      {
        label: '输入以年和周数',
        value: 'week'
      }
    ])
    return {
      settings,
      dateType
    }
  }
}
</script>

<style scoped>

</style>
