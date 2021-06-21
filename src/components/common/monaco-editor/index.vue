<template>
  <div id="monaco-editor" class="w-full h-full">
  </div>
  <div class="absolute bottom-0 left-0 text-sm text-red-600">{{ errorTip }}</div>
</template>

<script>
import * as monaco from 'monaco-editor'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { isPlainObject } from 'lodash'

export default {
  name: 'monaco-editor',
  props: {
    code: {
      type: String,
      required: true
    }
  },
  emits: ['change'],
  setup (props, { emit }) {
    let editorInstance
    const errorTip = ref('')
    const isValidJSON = str => {
      try {
        JSON.parse(str)
        return true
      } catch (e) {
        return false
      }
    }
    onMounted(() => {
      editorInstance = monaco.editor.create(document.querySelector('#monaco-editor'), {
        value: '',
        language: 'json',
        theme: 'vs-dark',
        formatOnPaste: true,
        fontSize: 18,
        automaticLayout: true
      })
      editorInstance.setValue(props.code)
      editorInstance.onDidChangeModelContent(() => {
        if (isValidJSON(editorInstance.getValue())) {
          const result = JSON.parse(editorInstance.getValue())
          if (!isPlainObject(result)) {
            errorTip.value = '数据源不是Object对象'
          } else {
            errorTip.value = ''
            emit('change', result)
          }
        } else {
          errorTip.value = '格式不正确'
        }
      })
    })
    onBeforeUnmount(() => {
      editorInstance.dispose()
    })
    return {
      errorTip
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
