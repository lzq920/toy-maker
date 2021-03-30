<template>
  <div>
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

export default {
  name: 'blocks-form-config',
  setup () {
    const store = useStore()
    const configList = ref([
      {
        styles: {
          background: '#cccccc'
        },
        configs: [{
          fieldset: 'input-tel',
          type: 'tel',
          required: true,
          disabled: false,
          readonly: false,
          name: 'tel',
          maxlength: 11,
          pattern: '^1[3-9]\\d{9}',
          placeholder: '请输入手机号'
        }, {
          fieldset: 'input-submit'
        }]
      }
    ])
    const handleClick = item => {
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
