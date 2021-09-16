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
    <el-tab-pane label="配置" name="config">
      <ul class="list-none cursor-pointer border">
        <li v-for="(item,index) in formItems" :key="index" class="p-2 border-b">
          <span>{{ `${item.description}(${item.name || ''})` }}</span>
          <span class="absolute right-2">
            <i v-if="item.componentName!=='form-input-submit'" class="el-icon-delete mr-2"
               @click="handleDelete(item)"></i>
            <i class="el-icon-setting" @click="handleConfig(item)"></i>
          </span>
        </li>
        <li class="p-2 flex justify-between items-center">
          <el-select v-model="selectIndex" placeholder="请选择">
            <el-option v-for="(item,index) in formItemsOptions" :key="index" :label="item.title"
                       :value="index"></el-option>
          </el-select>
          <el-button @click="addItem">添加</el-button>
        </li>
      </ul>
      <div class="mt-4 mb-4">
        <el-alert
          v-for="(item,index) in errors"
          :key="index"
          :title="item"
          class="mt-2"
          size="mini"
          type="error"
        >
        </el-alert>
      </div>
      <div class="mt-4">
        <el-button type="primary" @click="checkFormRule">检测表单是否合法</el-button>
      </div>
      <el-drawer v-model="configDrawer" :close-on-press-escape="false" :show-close="false"
                 :size="400" :title="`(${activeItems.description})配置`" destroy-on-close direction="rtl">
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
import { ElMessage } from 'element-plus'

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
      if (selectIndex.value === '') {
        return false
      }
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
          } else if (!/^[a-zA-Z]\w*$/.test(formElement.name)) {
            errors.value.push(`${formElement.description} 字段不符合规范(仅支持字母开头包含数字下划线字符)`)
          }
        }
      }
      if (names.length === 0) {
        errors.value.push('表单内没有输入组件')
      }
      if (uniq(names).length !== names.length) {
        errors.value.push('表单字段名称存在重复')
      }
      if (!errors.value.length) {
        ElMessage.success('表单参数正常')
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
