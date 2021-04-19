<template>
  <div class="flex flex-wrap gap-2">
    <el-button
      v-for="(item, index) in configList"
      :key="index"
      type="primary"
      @click="handleClick(item)"
    >
      表单
    </el-button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import BlocksForm from '../../../widgets/Form'
import { generatorUUID } from '@/utils'

export default {
  name: 'blocks-form-config',
  setup () {
    const store = useStore()
    const configList = ref([
      {
        rect: {
          height: 380,
          width: 375,
          left: 0,
          top: 0
        },
        styles: {
          background: '#e5e5e5'
        },
        children: [
          {
            componentName: 'form-input-tel',
            description: '手机号输入组件',
            required: true,
            disabled: false,
            readonly: false,
            name: 'mobile',
            maxlength: 11,
            pattern: '^1[3-9]\\d{9}',
            placeholder: '请输入手机号',
            styles: {
              width: '100%',
              height: 50,
              paddingLeft: 10,
              paddingRight: 10,
              fontSize: 20,
              border: '1px solid #ccc'
            }
          },
          {
            componentName: 'form-input-text',
            description: '文本输入组件',
            required: true,
            disabled: false,
            readonly: false,
            name: 'name',
            maxlength: 10,
            minlength: 0,
            placeholder: '请输入姓名',
            styles: {
              width: '100%',
              height: 50,
              paddingLeft: 10,
              paddingRight: 10,
              fontSize: 20,
              border: '1px solid #ccc'
            }
          },
          {
            componentName: 'form-input-email',
            description: '邮箱输入组件',
            required: true,
            disabled: false,
            readonly: false,
            name: 'email',
            placeholder: '请输入邮箱地址',
            styles: {
              width: '100%',
              height: 50,
              paddingLeft: 10,
              paddingRight: 10,
              fontSize: 20,
              border: '1px solid #ccc'
            }
          },
          {
            componentName: 'form-input-number',
            description: '数字输入组件',
            required: true,
            disabled: false,
            readonly: false,
            name: 'age',
            placeholder: '请输入年龄',
            max: 99,
            min: 18,
            styles: {
              width: '100%',
              height: 50,
              paddingLeft: 10,
              paddingRight: 10,
              fontSize: 20,
              border: '1px solid #ccc'
            }
          },
          {
            componentName: 'form-input-submit',
            description: '提交按钮组件',
            innerText: '提交',
            styles: {
              width: '100%',
              height: 50,
              backgroundColor: 'green',
              color: 'white',
              fontSize: 20
            }
          }
        ]
      }
    ])
    const handleClick = item => {
      const temp = item.children.map(child => {
        child.id = generatorUUID()
        return child
      })
      item.children = temp
      store.dispatch('editor/addItem', new BlocksForm(item))
    }
    return {
      configList,
      handleClick
    }
  }
}
</script>

<style></style>
