<template>
  <el-tabs v-model="activeName" class="pl-2 pr-2">
    <el-tab-pane label="属性" name="attrs">
      <position-setting :config="config"></position-setting>
    </el-tab-pane>
<!--    <el-tab-pane label="事件" name="events">
    </el-tab-pane>
    <el-tab-pane label="动画" name="animations">
    </el-tab-pane>-->
    <el-tab-pane label="配置" name="config">
      <ul class="list-none cursor-pointer border">
        <li v-for="(item,index) in formItems" class="p-2 border-b" :key="index">
          <span>{{`${item.description}(${item.name||""})`}}</span>
          <span class="absolute right-2">
            <i class="el-icon-delete mr-2" v-if="item.componentName!=='form-input-submit'" @click="handleDelete(item)"></i>
            <i class="el-icon-setting" @click="handleConfig(item)"></i>
          </span>
        </li>
        <li class="p-2 flex justify-between items-center">
          <el-select v-model="selectIndex" placeholder="请选择">
            <el-option v-for="(item,index) in formItemsOptions" :key="index" :value="index" :label="item.title"></el-option>
          </el-select>
          <el-button @click="addItem">添加</el-button>
        </li>
      </ul>
      <div class="mt-4 mb-4">
        <el-alert
          v-for="(item,index) in errors"
          :key="index"
          :title="item"
          type="error"
          size="mini"
          class="mt-2"
        >
        </el-alert>
      </div>
      <div class="mt-4">
        <el-button type="primary" @click="checkFormRule">检测表单是否合法</el-button>
      </div>
      <el-drawer v-model="configDrawer" :close-on-press-escape="false" :show-close="false" :title="`(${activeItems.description})配置`" direction="rtl" :size="300" destroy-on-close>
        <component :is="`${activeItems.componentName}-control`" :config="activeItems"></component>
        <div class="flex justify-center">
          <el-button @click="configDrawer = false">取消</el-button>
          <el-button type="primary" @click="handleChange">确定</el-button>
        </div>
      </el-drawer>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import formItemsEnum from '@/enum/formItem'
import { generatorUUID } from '@/utils'
import { uniq } from 'lodash'

export default {
  name: 'blocks-form-control',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const formItemsOptions = computed(() => formItemsEnum.filter(item => item.config.componentName !== 'form-input-submit'))
    const store = useStore()
    const activeName = ref('attrs')
    const formItems = computed(() => props.config.children)
    const activeItems = ref({})
    const configDrawer = ref(false)
    const selectIndex = ref('')
    const errors = ref([])
    const handleDelete = async (active) => {
      const items = formItems.value.filter(item => item.id !== active.id)
      await store.dispatch('editor/updateItem', {
        id: props.config.id,
        path: 'children',
        value: items
      })
    }
    const handleConfig = (item) => {
      activeItems.value = Object.assign({}, item)
      configDrawer.value = true
    }
    const handleChange = async () => {
      const items = formItems.value.map(item => {
        if (item.id === activeItems.value.id) {
          return activeItems.value
        } else {
          return item
        }
      })
      configDrawer.value = false
      await store.dispatch('editor/updateItem', {
        id: props.config.id,
        path: 'children',
        value: items
      })
      activeItems.value = {}
    }
    const addItem = async () => {
      const selectedItem = formItemsOptions.value[selectIndex.value]
      selectedItem.config.id = generatorUUID()
      const items = [...formItems.value]
      items.splice(items.length - 1, 0, selectedItem.config)
      await store.dispatch('editor/updateItem', {
        id: props.config.id,
        path: 'children',
        value: items
      })
      selectIndex.value = ''
    }
    const checkFormRule = () => {
      const names = []
      errors.value = []
      for (const formElement of formItems.value) {
        if (formElement.componentName !== 'form-input-submit') {
          names.push(formElement.name)
          if (!formElement.name.trim()) {
            errors.value.push(`${formElement.description} 字段名称为空`)
          }
        }
      }
      if (names.length === 0) {
        errors.value.push('表单内没有输入组件')
      }
      if (uniq(names).length !== names.length) {
        errors.value.push('表单字段名称存在重复')
      }
    }
    return {
      activeName,
      formItems,
      activeItems,
      configDrawer,
      formItemsOptions,
      selectIndex,
      handleDelete,
      handleConfig,
      handleChange,
      addItem,
      checkFormRule,
      errors
    }
  }
}
</script>

<style lang="scss" scoped></style>
